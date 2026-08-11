/* ==========================================================================
   THE WEEKEND FILM SCHOOL — COMMUNITY GATEWAY
   Router, sheet rendering, and the chit.

   Reads window.WFS_GATEWAY (config.js) and window.QR (qr.js). Nothing here
   needs editing to run the page: change config.js instead.

   Routes, so the phone back button and deep links both behave:
     #/                      the front sheet
     #/creators              the crew list
     #/audience              the schedule
     #/creators/actors       the crew list with the Actors chit open
     #/audience/saturday     the schedule with the Saturday chit open
   ========================================================================== */

(function () {
  'use strict';

  var cfg = window.WFS_GATEWAY;
  if (!cfg) return;

  var $ = function (id) { return document.getElementById(id); };

  var SIDES = { creators: 'creators', audience: 'audience' };

  var views = {
    home: $('view-home'),
    creators: $('view-creators'),
    audience: $('view-audience')
  };

  var headings = {
    home: $('front-h'),
    creators: $('creators-h'),
    audience: $('audience-h')
  };

  var docLabel = $('doc-label');
  var serial = $('serial');

  var chit = $('chit');
  var els = {
    doc: $('chit-doc'),
    title: $('chit-title'),
    group: $('chit-group'),
    about: $('chit-about'),
    reason: $('chit-reason'),
    reasonText: $('chit-reason-text'),
    go: $('chit-go'),
    placeholder: $('chit-placeholder'),
    state: $('chit-state'),
    qr: $('chit-qr'),
    qrCode: $('chit-qr-code'),
    copy: $('chit-copy'),
    close: $('chit-close')
  };

  var rooms = {};        /* link key -> room record, flattened across sides */
  var pathMeta = {};     /* side id  -> { docLabel, serial, stock } */
  var currentRoom = null;
  var pushedChit = false;
  var hasRouted = false;
  var qrTimer = null;
  var copyTimer = null;

  function emit(name, data) {
    if (typeof cfg.onEvent === 'function') {
      try { cfg.onEvent(name, data); } catch (e) { /* analytics must never break the page */ }
    }
  }

  function isPlaceholder(url) { return /REPLACE-ME/i.test(url); }

  /* --- Build the room index --------------------------------------------- */

  (cfg.paths || []).forEach(function (p) { pathMeta[p.id] = p; });

  function register(room, side, linkGroup) {
    var url = (cfg.communityLinks[linkGroup] || {})[room.link] || '';
    var status = room.status || (url ? 'open' : 'soon');
    rooms[room.link] = {
      key: room.link,
      side: side,
      name: room.name,
      label: room.label,
      blurb: room.blurb,
      about: room.about,
      reason: room.reason,
      badge: room.badge,
      when: room.when,
      featured: !!room.featured,
      url: url,
      status: status
    };
    return rooms[room.link];
  }

  var creators = cfg.creators || {};
  var audience = cfg.audience || {};

  if (creators.featured) register(creators.featured, 'creators', 'creators');
  (creators.departments || []).forEach(function (dept) {
    (dept.rooms || []).forEach(function (r) { register(r, 'creators', 'creators'); });
  });
  (audience.scheduled || []).forEach(function (r) { register(r, 'audience', 'consumers'); });
  (audience.alwaysOpen || []).forEach(function (r) { register(r, 'audience', 'consumers'); });

  /* --- Rendering --------------------------------------------------------- */

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function statusTag(room) {
    if (room.status === 'closed') return { text: 'Closed for now', cls: 'tag tag--closed' };
    if (room.status === 'soon') return { text: 'Opening soon', cls: 'tag tag--closed' };
    if (room.badge) return { text: room.badge, cls: 'tag' };
    return null;
  }

  function labelWithTag(room) {
    var wrap = el('span', 'room__label');
    wrap.appendChild(document.createTextNode(room.label));
    var tag = statusTag(room);
    if (tag) {
      var t = el('span', tag.cls, tag.text);
      wrap.appendChild(t);
    }
    return wrap;
  }

  function roomRow(room) {
    var btn = el('button', 'room');
    btn.type = 'button';
    btn.dataset.key = room.key;
    btn.dataset.status = room.status;
    btn.setAttribute('aria-haspopup', 'dialog');

    var main = el('span', 'room__main');
    main.appendChild(labelWithTag(room));
    main.appendChild(el('span', 'room__blurb', room.blurb));

    var cue = el('span', 'room__cue', '→');
    cue.setAttribute('aria-hidden', 'true');

    btn.appendChild(main);
    btn.appendChild(cue);
    return btn;
  }

  function featuredSlip(room, docText) {
    var btn = el('button', 'feature');
    btn.type = 'button';
    btn.dataset.key = room.key;
    btn.setAttribute('aria-haspopup', 'dialog');

    var main = el('span');
    main.appendChild(el('span', 'feature__doc', docText));
    var label = el('span', 'feature__label');
    label.appendChild(document.createTextNode(room.label));
    var tag = statusTag(room);
    if (tag) label.appendChild(el('span', tag.cls, tag.text));
    main.appendChild(label);
    main.appendChild(el('span', 'feature__blurb', room.blurb));

    var cue = el('span', 'feature__cue', '→');
    cue.setAttribute('aria-hidden', 'true');

    btn.appendChild(main);
    btn.appendChild(cue);
    return btn;
  }

  function scheduleSlot(room) {
    var btn = el('button', 'slot' + (room.featured ? ' slot--wide' : ''));
    btn.type = 'button';
    btn.dataset.key = room.key;
    btn.setAttribute('aria-haspopup', 'dialog');

    if (room.when) btn.appendChild(el('span', 'slot__when', room.when));

    var name = el('span', 'slot__name');
    name.appendChild(document.createTextNode(room.label));
    var tag = statusTag(room);
    if (tag) name.appendChild(el('span', tag.cls, tag.text));
    btn.appendChild(name);

    btn.appendChild(el('span', 'slot__blurb', room.blurb));

    var cue = el('span', 'slot__cue', '→');
    cue.setAttribute('aria-hidden', 'true');
    btn.appendChild(cue);
    return btn;
  }

  /* Stagger index, capped so the last block never feels like it is waiting. */
  var step = 2;
  function stagger(node) {
    node.classList.add('stagger');
    node.style.setProperty('--i', Math.min(step++, 7));
    return node;
  }

  function renderCreators() {
    var host = $('creators-body');
    if (!host) return;
    step = 2;

    if (creators.featured && rooms[creators.featured.link]) {
      host.appendChild(stagger(featuredSlip(rooms[creators.featured.link], 'The main room')));
    }

    (creators.departments || []).forEach(function (dept) {
      var section = el('section', 'dept');
      section.appendChild(el('h2', 'dept__title', dept.title));
      var list = el('div', 'rooms');
      (dept.rooms || []).forEach(function (r) {
        if (rooms[r.link]) list.appendChild(roomRow(rooms[r.link]));
      });
      section.appendChild(list);
      host.appendChild(stagger(section));
    });
  }

  function renderAudience() {
    var host = $('audience-body');
    if (!host) return;
    step = 2;

    var sched = el('div', 'sched');
    (audience.scheduled || []).forEach(function (r) {
      if (rooms[r.link]) sched.appendChild(scheduleSlot(rooms[r.link]));
    });
    host.appendChild(stagger(sched));

    var always = el('section', 'always');
    always.appendChild(el('h2', 'dept__title', 'Open all week'));
    var list = el('div', 'rooms');
    (audience.alwaysOpen || []).forEach(function (r) {
      if (rooms[r.link]) list.appendChild(roomRow(rooms[r.link]));
    });
    always.appendChild(list);
    host.appendChild(stagger(always));
  }

  function renderFooter() {
    var nav = $('foot-nav');
    if (!nav) return;
    var links = cfg.links || {};
    [
      ['site', 'Main site'],
      ['instagram', 'Instagram'],
      ['nobodyClub', 'The Nobody Club']
    ].forEach(function (pair) {
      var href = links[pair[0]];
      if (!href) return;                       /* an empty link disappears */
      var a = el('a', null, pair[1]);
      a.href = href;
      a.rel = 'noopener';
      nav.appendChild(a);
    });
  }

  /* --- The chit ---------------------------------------------------------- */

  function drawQr(room) {
    els.qrCode.textContent = '';
    els.qr.removeAttribute('data-revealed');
    if (!window.QR) { els.qr.hidden = true; return; }
    try {
      els.qrCode.innerHTML = window.QR.toSvg(room.url, {
        ecc: (cfg.qr && cfg.qr.ecc) || 'M',
        label: 'QR code that opens the ' + room.name + ' group on WhatsApp'
      });
      els.qr.hidden = false;
    } catch (e) {
      /* A code we cannot draw is worse than no code. Leave the button. */
      els.qr.hidden = true;
    }
  }

  function openChit(room) {
    if (currentRoom && currentRoom.key === room.key && chit.open) return;
    currentRoom = room;

    var meta = pathMeta[room.side] || {};
    var open = room.status === 'open' && !!room.url;

    chit.dataset.stock = meta.stock || 'white';
    els.doc.textContent = meta.docLabel || '';
    els.title.textContent = room.label;
    els.group.textContent = 'WhatsApp group · ' + room.name;
    els.about.textContent = room.about;
    els.reasonText.textContent = room.reason || '';
    els.reason.hidden = !room.reason;

    els.go.hidden = !open;
    els.copy.hidden = !open || !navigator.clipboard;
    els.copy.textContent = 'Copy the link';

    if (open) {
      els.go.href = room.url;
      els.go.target = '_blank';
      els.go.setAttribute('aria-label', 'Open the ' + room.name + ' group on WhatsApp');
      els.state.hidden = true;
      els.placeholder.hidden = !isPlaceholder(room.url);
      els.placeholder.textContent = 'Placeholder link · replace it in config.js';
      drawQr(room);
    } else {
      els.qr.hidden = true;
      els.placeholder.hidden = true;
      els.state.hidden = false;
      els.state.textContent = room.status === 'closed'
        ? 'This room is closed for now. Join the main room and we will bring you back when it reopens.'
        : 'This room is not open yet.';
    }

    if (!chit.open) chit.showModal();

    /* Let the chit land first, then feed the code out. */
    clearTimeout(qrTimer);
    if (open && !els.qr.hidden) {
      qrTimer = setTimeout(function () { els.qr.setAttribute('data-revealed', ''); }, 140);
    }

    emit('room:open', { id: room.key, label: room.label, path: room.side });
  }

  /* Closed by the router, because the route already moved on. */
  function closeChit() {
    pushedChit = false;
    if (chit.open) chit.close();
  }

  /* Closed by the person, so unwind the route the way they arrived. The URL
     moves now rather than when the exit transition ends, otherwise a quick
     back tap lands on the room they just left. */
  function dismiss() {
    if (!chit.open) return;
    var side = currentRoom ? currentRoom.side : 'creators';
    currentRoom = null;
    chit.close();
    if (pushedChit) {
      pushedChit = false;
      history.back();
    } else {
      location.replace('#/' + side);
    }
  }

  chit.addEventListener('close', function () {
    clearTimeout(qrTimer);
    els.qr.removeAttribute('data-revealed');
  });

  chit.addEventListener('cancel', function (e) { e.preventDefault(); dismiss(); });
  els.close.addEventListener('click', dismiss);

  /* Tapping the paper outside the chit dismisses it, the way a sheet should. */
  chit.addEventListener('click', function (e) {
    if (e.target === chit) dismiss();
  });

  els.go.addEventListener('click', function () {
    if (currentRoom) emit('room:join', { id: currentRoom.key, label: currentRoom.label, path: currentRoom.side });
  });

  els.copy.addEventListener('click', function () {
    if (!currentRoom || !navigator.clipboard) return;
    navigator.clipboard.writeText(currentRoom.url).then(function () {
      els.copy.textContent = 'Link copied';
      clearTimeout(copyTimer);
      copyTimer = setTimeout(function () { els.copy.textContent = 'Copy the link'; }, 1800);
      emit('room:copy', { id: currentRoom.key, label: currentRoom.label, path: currentRoom.side });
    }).catch(function () {
      els.copy.textContent = 'Could not copy';
    });
  });

  /* --- Routing ----------------------------------------------------------- */

  /* Returns null for a plain in-page anchor such as the skip link's #main, so
     jumping down the page never counts as changing sheet. */
  function parseHash() {
    var raw = location.hash || '';
    if (raw && raw.charAt(1) !== '/') return null;
    var parts = raw.replace(/^#\/?/, '').split('/').filter(Boolean);
    var side = SIDES[parts[0]] || 'home';
    return { side: side, room: side === 'home' ? null : (parts[1] || null) };
  }

  function showView(side) {
    if (document.body.dataset.view === side) return false;

    Object.keys(views).forEach(function (k) {
      if (views[k]) views[k].hidden = (k !== side);
    });
    document.body.dataset.view = side;

    var meta = pathMeta[side];
    docLabel.textContent = meta ? meta.docLabel : 'Joining sheet';
    serial.textContent = (cfg.brand.serial || 'WFS/COMMUNITY') + '/' + (meta ? meta.serial : 'JOIN');

    window.scrollTo(0, 0);
    return true;
  }

  function route() {
    var r = parseHash();
    if (!r) return;
    var changed = showView(r.side);
    if (changed || !hasRouted) emit('view', { id: r.side, path: r.side });

    var room = r.room ? rooms[r.room] : null;
    if (room && room.side === r.side) {
      openChit(room);
    } else {
      closeChit();
      currentRoom = null;
    }

    /* Move focus into the new sheet, but never steal it on first paint. */
    if (changed && hasRouted && !chit.open) {
      var h = headings[r.side];
      if (h) h.focus({ preventScroll: true });
    }
    hasRouted = true;
  }

  document.addEventListener('click', function (e) {
    if (!e.target || !e.target.closest) return;
    var btn = e.target.closest('.room, .feature, .slot');
    if (!btn || !btn.dataset.key) return;
    var room = rooms[btn.dataset.key];
    if (!room) return;
    pushedChit = true;
    location.hash = '#/' + room.side + '/' + room.key;
  });

  window.addEventListener('hashchange', route);

  /* --- Go ---------------------------------------------------------------- */

  renderCreators();
  renderAudience();
  renderFooter();
  route();
})();
