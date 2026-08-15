/* ==========================================================================
   THE WEEKEND FILM SCHOOL — COMMUNITY GATEWAY CONFIG
   --------------------------------------------------------------------------
   This is the ONLY file you edit to run the joining page.
   Nothing here touches layout, so you cannot break the design from in here.

   THE FIVE-MINUTE VERSION
   1. Open a WhatsApp group or community, tap the name, then Invite via
      link, Copy.
   2. Paste it into `communityLinks` below, over the REPLACE-ME placeholder.
   3. Save. The button and the QR code both update. Nothing to re-export.

   HOW THIS PAGE IS SHAPED
   There are three doors on the front sheet:
     - The Weekend Film Crew   → a list of specialities. Pick one and join
                                  just that group.
     - The Weekend Film School → one community. Tapping it opens the join
                                  chit straight away, no list in between.
     - The Nobody Club         → same as above, its own community.
   Only the Crew door leads to a list. The other two are one tap to a QR.

   RULES
   - `name` must match the real WhatsApp group name, exactly. People check.
   - `status: "soon"`   the room shows but says it is not open yet, no QR.
     `status: "closed"` the room shows but says it is closed for now, no QR.
     `status: "open"`   normal. This is the default if you leave it out.
   - `badge: "New"`     small tag beside the name. Delete the line to remove.
   - Delete a room to remove it. Add one by copying a block. Order in the
     array is the order on the page.
   - Never invent a group here that does not exist in WhatsApp. An empty room
     is worse than no room.
   - The WFS Crew group itself is deliberately not listed as a speciality —
     it is the community's own general room, not something to pick between.
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

    /* One invite link per speciality group inside The Weekend Film Crew.

       The Weekend Film Crew community also has its own invite link —
       https://chat.whatsapp.com/KXw6v5TYQWSKHg8swjQQoO — kept here for the
       record only. It is deliberately not wired to a room: the Crew door
       goes straight to the specialities below instead of one shared join. */
    crew: {
      actors:            'https://chat.whatsapp.com/JfiuUBA5s97G70B4w5F6od',
      comedians:         'https://chat.whatsapp.com/GYtE9YPhKEM48TJusNtLrc',
      dancers:           'https://chat.whatsapp.com/He6UgDbhQbx9bVnqVZ0xOK',
      directors:         'https://chat.whatsapp.com/HGRmLUfksf3G5M8xSAR3Zu',
      cinematographers:  'https://chat.whatsapp.com/HtD3xG5OCwREloa1kQ2697',
      editors:           'https://chat.whatsapp.com/CI3zg59AYLYGM9cEoaKBMs',
      writers:           'https://chat.whatsapp.com/GaEbFLHmZnZ2i9CpuZ2Rj9',
      musicians:         'https://chat.whatsapp.com/E4D3ZtBTMe1Bql4fNm6Zsj',
      aiFilmMaking:      'https://chat.whatsapp.com/HlWQFxd8eipC1GNdtyJImo',
      gearFilmMaking:    'https://chat.whatsapp.com/KipeNYUgUk31qtG53UXrrI',
      mobileFilmMaking:  'https://chat.whatsapp.com/HM8CfVqJB7W4uDMtRStB9k',
      others:            'https://chat.whatsapp.com/CVfFrigSj51GrVW0pabEQE'
    },

    /* One whole-community invite link each. WhatsApp lets people choose
       their own groups once they are inside, so no list needed here. */
    communities: {
      weekendFilmSchool: 'https://chat.whatsapp.com/GbTJUZzTQF5Fo7aFQytjQA',
      nobodyClub:        'https://chat.whatsapp.com/ISJTtZ9i4y9JzCoryZU0If'
    }
  },

  /* -------------------------------------------------------------------- QR
     ecc: "L" | "M" | "Q" | "H". Higher survives more damage and makes a
     denser code. M is right for a screen. Use Q if these get printed onto
     posters that will live outdoors.                                      */
  qr: { ecc: 'M' },

  /* =========================================================================
     THE CREW DOOR.
     The wording on the front-page doors themselves lives in index.html, the
     same way page copy does on the main site. What is here is what the rest
     of the page needs to know about the crew list: the document label
     printed on the masthead and on every chit, and its paper stock.
     ========================================================================= */
  paths: [
    { id: 'crew', docLabel: 'Crew list', serial: 'CREW', stock: 'green' }
  ],

  /* =========================================================================
     THE OTHER TWO DOORS — WHOLE COMMUNITIES.
     No list, no departments. Tapping the door opens the join chit directly,
     with the community's own QR code on it.
     ========================================================================= */
  home: {
    weekendFilmSchool: {
      link: 'weekendFilmSchool',
      name: 'The Weekend Film School',
      label: 'The Weekend Film School',
      doc: 'Community',
      stock: 'blue',
      about: 'The main community for The Weekend Film School: schedules, announcements and the people who turn up.',
      reason: 'Start here if you come for the classes, screenings and weekend workshops.'
    },
    nobodyClub: {
      link: 'nobodyClub',
      name: 'The Nobody Club',
      label: 'The Nobody Club',
      doc: 'Community',
      stock: 'goldenrod',
      about: 'The wider community The Weekend Film School belongs to: stand-up comedy, theatre and screening nights.',
      reason: 'Join here if stand-up, theatre or screenings are more your thing.'
    }
  },

  /* =========================================================================
     THE CREW LIST.
     Departments are how a real call sheet groups people. Keep it that way.
     ========================================================================= */
  crew: {
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
            link: 'dancers',
            name: 'WFS Dancers',
            label: 'Dancers',
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
            link: 'musicians',
            name: 'WFS Musicians',
            label: 'Musicians',
            blurb: 'Recording, mixing, scoring, live sets.',
            about: 'For musicians, sound recordists, mixers and composers.',
            reason: 'Films need sound and Weekend Nights need players.'
          }
        ]
      },
      {
        title: 'How you shoot',
        rooms: [
          {
            link: 'aiFilmMaking',
            name: 'WFS AI Film Making',
            label: 'AI Film Making',
            blurb: 'Tools, prompts, workflows, what actually works.',
            about: 'For anyone using AI anywhere in the process, from a first idea to a finished shot.',
            reason: 'Saturdays lean on this room whenever a scene needs something a camera cannot get.'
          },
          {
            link: 'gearFilmMaking',
            name: 'WFS Gear Film Making',
            label: 'Gear Film Making',
            blurb: 'Proper kit, borrowed kit, what to rent and from where.',
            about: 'For people shooting on real cameras and rigs. Gear lists, hires, and who has what spare.',
            reason: 'Ask here before you buy or hire anything.'
          },
          {
            link: 'mobileFilmMaking',
            name: 'WFS Mobile Film Making',
            label: 'Mobile Film Making',
            blurb: 'Shooting the whole thing on a phone.',
            about: 'For people making films with nothing but a phone. Apps, rigs, tricks that make a phone look like more than a phone.',
            reason: 'Most Saturday shorts start here.'
          }
        ]
      },
      {
        title: 'Everyone else',
        rooms: [
          {
            link: 'others',
            name: 'Others',
            label: 'Others',
            blurb: 'Do not see your thing above? Start here.',
            about: 'For anyone who makes something that does not fit the rooms above yet.',
            reason: 'Tell us what you do and we will point you to the right room, or open a new one.'
          }
        ]
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
