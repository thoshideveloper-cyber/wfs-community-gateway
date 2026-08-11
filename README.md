# The Weekend Film School — community gateway

The page behind the QR code on posters, flyers and at events. It does one job:
somebody scans, recognises themselves, and lands in the right WhatsApp room.

It is not the main website. No bookings, no payments, no pricing. Those live on
`product source code/`.

```
gateway/
  index.html                 the sheet, and all page copy
  assets/css/gateway.css     one stylesheet, no build step
  assets/js/config.js        the only file you edit day to day
  assets/js/qr.js            QR encoder, no dependencies
  assets/js/gateway.js       router, rendering, the chit
  assets/img/                favicons, copied from brand/favicon/
```

Static files. No framework, no bundler, no npm install. Copy the folder onto any
host and it works.

---

## Changing a WhatsApp link

1. Open the group in WhatsApp, tap the group name, **Invite via link**, **Copy link**.
2. Open `assets/js/config.js`, find the key under `communityLinks`, paste over the
   `REPLACE-ME` placeholder.
3. Save.

The button and the QR code both update. There is nothing to re-export, because
the QR is drawn in the browser from whatever URL is in the config.

While a link is still a placeholder, its chit shows a small line saying so. That
line disappears on its own once you paste a real link.

## Other things you can do from config.js

| You want to | Do this |
|---|---|
| Take a room down for a while | `status: 'closed'` on the room |
| Show a room before it opens | `status: 'soon'`, or leave its link as `''` |
| Flag something new | `badge: 'New'` |
| Add a creator role | Copy a room block into a department, add its link key |
| Remove a room | Delete the block and its link |
| Reorder | Move blocks. Array order is page order. |
| Change a description | Edit `blurb` (the list) or `about` (the chit) |
| Denser QR for outdoor print | `qr: { ecc: 'Q' }` |
| Track which route people take | Fill in `onEvent` |

`name` must match the real WhatsApp group name exactly. People check.

Page copy that is not about a specific room (the headline, the two doors, the
intros) lives in `index.html`, the same way it does on the main site.

## Routes

The page uses the hash so the phone back button and deep links both behave.

| URL | Shows |
|---|---|
| `/` | the front sheet |
| `/#/creators` | the crew list |
| `/#/audience` | the schedule |
| `/#/creators/actors` | the crew list with the Actors chit open |
| `/#/audience/weekendNights` | the schedule with the Weekend Nights chit open |

The room segment is the config key, so you can point a poster QR straight at one
room. Closing that chit drops the visitor onto the side it belongs to rather
than throwing them off the site.

## Analytics

`config.onEvent(name, data)` fires on `view`, `room:open`, `room:join` and
`room:copy`. It is a no-op until you wire it to something. Nothing else in the
page depends on it, and an exception inside it cannot break the page.

## Local preview

```bash
node scripts/serve-gateway.js
```

Then open `http://localhost:5173`. Opening `index.html` straight off disk mostly
works, but "Copy the link" needs a real origin.

---

## Design notes

The identity is production paperwork, so this is a two-sided sheet: a front with
the distribution question, a **crew list** on one side and a **schedule** on the
other, and every room hands you a **chit** with a QR printed on it.

Following `brand/BRAND_GUIDE.md`:

- **Paper stocks carry meaning, so they do the routing.** Green stock is crew
  lists, so the creators door and every creators chit are green. Blue stock is
  the schedule, so the audience side is blue. Cherry marks a room that is closed.
  The colour is information, not decoration.
- **Green is the green light.** It appears in exactly two places: the rule that
  wipes in under whatever you are about to open, and the button that opens it.
  Plus the one asterisk in each chit, marking the line worth reading.
- **Weekend Nights is printed on ink**, because ink is the screening stock and it
  is the one thing on that side that happens in a dark room.
- Archivo 900 at `wdth 112` for display, Archivo 400 to 600 for text, IBM Plex
  Mono uppercase for anything checkable: times, group names, serials.
- Zero radius, zero shadow, zero gradient, no stock photos, no emoji. Hover and
  press are expressed by rules getting heavier, not by things floating.
- Paper grain at 5.5%, on a fixed non-interactive layer so it never repaints
  while scrolling.

Motion is four things and nothing else: blocks deal out in reading order on
arrival, the rule under a choice wipes in from the left on hover and focus, the
chit rises from the bottom on a phone and scales up on a desktop, and the QR
feeds out of the top of its frame like paper leaving a printer. Exits are faster
than entrances. All of it collapses under `prefers-reduced-motion`.

Dark is `--surface-screening`, the brand's own ink surface. The stock panels stay
paper in both schemes, which is the point: slips on a desk, in either light.

## The QR encoder

`qr.js` is about 9 KB, has no dependencies, and draws to SVG so the codes stay
crisp at poster size. Byte mode, versions 1 to 40, error correction L/M/Q/H,
full mask selection. It was verified by re-reading its own output: format
information and both its copies, unmasking, the zigzag, de-interleaving, a
zero-syndrome Reed-Solomon check on every block, and decoding the payload back
to the original string, across all four correction levels.

**Scan one with a real phone before you print anything.** Verification against a
spec is not the same as verification against the camera app people actually use.

## Still to do

- `og:image` currently points at the 512px square avatar. A proper 1200x630 card
  would preview better when the link gets shared.
- Fonts load from Google Fonts, matching the main site. Self-hosting the two
  files from `brand/fonts/` as woff2 would remove the third-party request.
- The mark in the masthead is `brand/logo/wfs-mark-mono-ink.svg` inlined, with
  its fills changed to `currentColor` so one copy serves both surfaces. The
  geometry is untouched. If the mark is ever rebuilt from
  `social/_source/wfs_build.py`, re-copy it and redo that one substitution.
