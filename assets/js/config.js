/* ==========================================================================
   THE WEEKEND FILM SCHOOL — COMMUNITY GATEWAY CONFIG
   --------------------------------------------------------------------------
   This is the ONLY file you edit to run the joining page.
   Nothing here touches layout, so you cannot break the design from in here.

   THE FIVE-MINUTE VERSION
   1. Open a WhatsApp group, tap the group name, then Invite via link, Copy.
   2. Paste it into `communityLinks` below, over the REPLACE-ME placeholder.
   3. Save. The button and the QR code both update. Nothing to re-export.

   RULES
   - `name` must match the real WhatsApp group name, exactly. People check.
   - `status: "soon"`   the room shows but says it is not open yet, no QR.
     `status: "closed"` the room shows but says it is closed for now, no QR.
     `status: "open"`   normal. This is the default if you leave it out.
   - `badge: "New"`     small tag beside the name. Delete the line to remove.
   - `featured: true`   pulls the room out of the list and gives it the top
                        slot. One per section, or the emphasis stops working.
   - Delete a room to remove it. Add one by copying a block. Order in the
     array is the order on the page.
   - Never invent a group here that does not exist in WhatsApp. An empty room
     is worse than no room.
   ========================================================================== */

window.WFS_GATEWAY = {

  /* ---------------------------------------------------------------- BRAND */
  brand: {
    name: 'The Weekend Film School',
    city: 'Hyderabad',
    parent: 'The Nobody Club',
    /* Printed top-right of every sheet, like a real document serial. */
    serial: 'WFS/COMMUNITY'
  },

  /* ------------------------------------------------------ OUTBOUND LINKS
     Leave any of these as "" and the link disappears from the footer
     instead of going nowhere.                                            */
  links: {
    site: 'https://www.thenobodyclub.com/filmschool/',
    instagram: 'https://instagram.com/theweekendfilmschool',
    nobodyClub: 'https://www.thenobodyclub.com'
  },

  /* =========================================================================
     COMMUNITY LINKS — the part you actually maintain.
     Every value is a WhatsApp invite link. Replace the placeholders.
     Leave a value as "" and that room shows as not open yet.
     ========================================================================= */
  communityLinks: {

    creators: {
      creators:           'https://chat.whatsapp.com/REPLACE-ME-CREATORS',
      actors:             'https://chat.whatsapp.com/REPLACE-ME-ACTORS',
      comedians:          'https://chat.whatsapp.com/REPLACE-ME-COMEDIANS',
      dance:              'https://chat.whatsapp.com/REPLACE-ME-DANCE',
      directors:          'https://chat.whatsapp.com/REPLACE-ME-DIRECTORS',
      cinematographers:   'https://chat.whatsapp.com/REPLACE-ME-CINEMATOGRAPHERS',
      editors:            'https://chat.whatsapp.com/REPLACE-ME-EDITORS',
      writers:            'https://chat.whatsapp.com/REPLACE-ME-WRITERS',
      sound:              'https://chat.whatsapp.com/REPLACE-ME-SOUND',
      filmCrew:           'https://chat.whatsapp.com/REPLACE-ME-FILM-CREW',
      artProduction:      '',
      weekendNightsCrew:  'https://chat.whatsapp.com/REPLACE-ME-NIGHTS-CREW'
    },

    consumers: {
      announcements:      'https://chat.whatsapp.com/REPLACE-ME-ANNOUNCEMENTS',
      community:          'https://chat.whatsapp.com/REPLACE-ME-COMMUNITY',
      saturday:           'https://chat.whatsapp.com/REPLACE-ME-SATURDAY',
      sunday:             'https://chat.whatsapp.com/REPLACE-ME-SUNDAY',
      weekendNights:      'https://chat.whatsapp.com/REPLACE-ME-WEEKEND-NIGHTS'
    }
  },

  /* -------------------------------------------------------------------- QR
     ecc: "L" | "M" | "Q" | "H". Higher survives more damage and makes a
     denser code. M is right for a screen. Use Q if these get printed onto
     posters that will live outdoors.                                      */
  qr: { ecc: 'M' },

  /* =========================================================================
     THE TWO SIDES.
     The wording on the two front-page doors lives in index.html, the same way
     page copy does on the main site. What is here is what the rest of the
     page needs to know about each side: the document label printed on the
     masthead and on every chit, and which paper stock it is issued on.
     ========================================================================= */
  paths: [
    { id: 'creators', docLabel: 'Crew list', serial: 'CREW',     stock: 'green' },
    { id: 'audience', docLabel: 'Schedule',  serial: 'SCHEDULE', stock: 'blue'  }
  ],

  /* =========================================================================
     SIDE A — CREW LIST
     Departments are how a real call sheet groups people. Keep it that way.
     ========================================================================= */
  creators: {
    featured: {
      link: 'creators',
      name: 'WFS Creators',
      label: 'WFS Creators',
      blurb: 'The main room. Everyone who makes something with us is in here.',
      about: 'The wider creator community: open calls, who needs what, and the conversations that turn into projects.',
      reason: 'Start here if you are still working out where you fit.'
    },

    departments: [
      {
        title: 'On camera, on stage',
        rooms: [
          {
            link: 'actors',
            name: 'WFS Actors',
            label: 'Actors',
            blurb: 'Casting calls, read-throughs, rehearsals.',
            about: 'For people who want to be in front of a camera or on a stage, whether or not you have done it before.',
            reason: 'Casting for Saturday films and Weekend Nights goes out here first.'
          },
          {
            link: 'comedians',
            name: 'WFS Comedians',
            label: 'Comedians',
            blurb: 'Stand-up, sketch, improv, trying material out.',
            about: 'For anyone writing or performing comedy, from a first five minutes to a tight half hour.',
            reason: 'Weekend Nights slots and practice rooms get shared here.'
          },
          {
            link: 'dance',
            name: 'WFS Dance & Movement',
            label: 'Dance & Movement',
            blurb: 'Choreography, movement, physical performance.',
            about: 'For dancers, choreographers and movement directors working on stage pieces, music videos and performance nights.',
            reason: 'Directors come looking here when a scene needs bodies that know what they are doing.'
          }
        ]
      },
      {
        title: 'Behind the camera',
        rooms: [
          {
            link: 'directors',
            name: 'WFS Directors',
            label: 'Directors',
            blurb: 'People holding the whole thing together.',
            about: 'For anyone directing a short, a scene or a stage piece, at any level of experience.',
            reason: 'Bring a rough idea and find the people to shoot it with.'
          },
          {
            link: 'cinematographers',
            name: 'WFS Cinematographers',
            label: 'Cinematographers',
            blurb: 'Light, lenses, and whatever camera you have.',
            about: 'Phones, borrowed bodies, proper rigs. Setups get shared here and gear gets found here.',
            reason: 'Shoots that need an eye ask in this room.'
          },
          {
            link: 'editors',
            name: 'WFS Editors',
            label: 'Editors',
            blurb: 'Cuts, timelines, colour, sound sync.',
            about: 'For the people who finish things. Software questions, workflow, and footage looking for a cut.',
            reason: 'Saturday footage gets passed around here on Sunday morning.'
          },
          {
            link: 'writers',
            name: 'WFS Writers',
            label: 'Writers',
            blurb: 'Scripts, sketches, scenes, monologues.',
            about: 'For anyone writing something that ends up performed. Post pages, ask for notes, read other people closely.',
            reason: 'Directors come here when they need material.'
          },
          {
            link: 'sound',
            name: 'WFS Sound & Music',
            label: 'Sound & Music',
            blurb: 'Recording, mixing, scoring, live sets.',
            about: 'For musicians, sound recordists, mixers and composers.',
            reason: 'Films need sound and Weekend Nights need players.'
          }
        ]
      },
      {
        title: 'On the floor',
        rooms: [
          {
            link: 'filmCrew',
            name: 'WFS Film Crew',
            label: 'Film Crew',
            blurb: 'Everything a set needs to actually run.',
            about: 'Assistant directors, gaffers, grips, continuity, runners. The people who make a shoot day work.',
            reason: 'The fastest way onto a set with no reel and no contacts.'
          },
          {
            link: 'weekendNightsCrew',
            name: 'WFS Weekend Nights Cast & Crew',
            label: 'Weekend Nights Cast & Crew',
            blurb: 'The people who put the evenings on.',
            about: 'Performers and crew for the recurring 7 to 9 PM nights. Rehearsal calls, run sheets, load-in and load-out.',
            reason: 'If you want stage time rather than screen time, this is the room.'
          },
          {
            link: 'artProduction',
            name: 'Art & Production',
            label: 'Art & Production',
            status: 'soon',
            blurb: 'Sets, props, costume, production design.',
            about: 'For production designers, art assistants, prop makers and costume.',
            reason: 'This room is being set up. Join WFS Creators and we will bring you across.'
          }
        ]
      }
    ]
  },

  /* =========================================================================
     SIDE B — SCHEDULE
     `when` is the big marker. Keep it short: it is read at a glance.
     ========================================================================= */
  audience: {
    scheduled: [
      {
        link: 'weekendNights',
        name: 'WFS Weekend Nights',
        label: 'Weekend Nights',
        when: '7 to 9 PM',
        featured: true,
        blurb: 'Theatre, comedy, music, screenings, and things that do not have a name yet.',
        about: 'Two hours in a room with people performing. Plays, stand-up, live music, screenings and experiments, then everybody stays and talks about it.',
        reason: 'Line-ups, venues and doors-open times land here before anywhere else.'
      },
      {
        link: 'saturday',
        name: 'WFS Saturday Film Making',
        label: 'Saturday Film Making',
        when: 'Saturday',
        blurb: 'Make a short with a phone, and AI where it helps.',
        about: 'A full day of actually making something, from the first idea to a finished cut you watch on a screen the same evening.',
        reason: 'For people who would rather understand the whole process than one part of it.'
      },
      {
        link: 'sunday',
        name: 'WFS Sunday Workshops',
        label: 'Sunday Workshops',
        when: 'Sunday',
        blurb: 'One craft, one working professional, one afternoon.',
        about: 'Each Sunday sits with a single craft and somebody who does it for a living: acting, editing, writing, directing, camera, sound, comedy.',
        reason: 'Subjects and teachers get announced here, and they fill fast.'
      }
    ],

    /* Not tied to a day. These two stay open all week. */
    alwaysOpen: [
      {
        link: 'announcements',
        name: 'Announcements',
        label: 'Announcements',
        blurb: 'Dates, line-ups, and everything you need to turn up.',
        about: 'A quiet room. Only official updates: what is on, when, and where. Nobody can reply, so nothing gets buried.',
        reason: 'Turn notifications on for this one and off for everything else.'
      },
      {
        link: 'community',
        name: 'WFS Community',
        label: 'WFS Community',
        blurb: 'Film talk, recommendations, and the people you met last weekend.',
        about: 'The open room. Recommendations, arguments about films, half-formed ideas, and finding somebody to go to things with.',
        reason: 'This is where the weekend keeps going on a Wednesday.'
      }
    ]
  },

  /* -------------------------------------------------------------- ANALYTICS
     Called on every route change and every join. Wire it to whatever you
     end up using, or leave it alone and nothing happens.

       name  "view"  | "room:open" | "room:join" | "room:copy"
       data  { id, label, path }

     Example, once you have an analytics tag installed:
       onEvent: function (name, data) { gtag('event', name, data); }        */
  onEvent: function (name, data) {
    if (window.console && window.location.hostname === 'localhost') {
      console.debug('[gateway]', name, data);
    }
  }
};
