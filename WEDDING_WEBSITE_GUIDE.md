# Wedding Website Customization and Deployment Guide

This guide explains, in beginner-friendly steps, how to prepare this website for a new wedding client. It is based on the actual project files as audited on **October 31, 2026**.

> **The safest starting point:** Most client-specific content is in **content/site.ts**. Edit the constants near the top of that file first. Values such as the couple's names, date, venue, and RSVP deadline are reused throughout the website.

> **Line-number note:** The line numbers below are exact for the audited version. If the source file is changed later, a line can move. Search for the listed variable or property name when that happens.

## Start Here: The Simple New-Client Workflow

For a normal client update, work in this order:

1. Make a new Git branch or a separate copy of the project.
2. Update the **QUICK SETUP** values in <code>content/site.ts</code>, lines 69-379.
3. Update the section wording in <code>content/site.ts</code>, lines 425-1835.
4. Replace the files inside <code>public/</code> and update their paths or photo counts.
5. Create or copy the client's Google Sheet, Forms, and Apps Script deployments.
6. Replace every URL in <code>siteConfig.googleAPI</code>, lines 410-423.
7. update the website URL and social preview image at lines 301-304.
8. Run the website locally, test desktop and mobile, and test every form.
9. Build the project before pushing it.
10. Push to GitHub and verify the production deployment.

### Important beginner rules

- A path such as <code>/Details/photo.jpg</code> means the real file is <code>public/Details/photo.jpg</code>.
- Keep the leading slash in image paths.
- File names are case-sensitive after deployment. <code>Photo.jpg</code> and <code>photo.jpg</code> can be different files on Vercel.
- Do not paste a Google Sheet's private edit link into guest-facing text.
- Never commit passwords, access tokens, API keys, or private credentials.
- Do not edit generated folders such as <code>.next/</code> or dependency folders such as <code>node_modules/</code>.
- The old root-level <code>dressCode</code> and <code>narratives</code> blocks at <code>content/site.ts:1554-1621</code> are legacy content. The active attire and love-story settings are documented below.

## Quick-Edit Reference

Use this section when you already know what you want to change. Each entry tells you which file to open, what setting to find, and what to replace.

### Names, date, venues, and RSVP

- **Bride's full name** — Open <code>content/site.ts</code>, line 70. Find <code>COUPLE.bride</code>. Replace only the text inside the quotes.
- **Bride's nickname** — Same file, line 71. Find <code>COUPLE.brideNickname</code>. This short name appears in labels, signatures, and placeholders.
- **Groom's full name** — Same file, line 72. Find <code>COUPLE.groom</code>. Replace only the text inside the quotes.
- **Groom's nickname** — Same file, line 73. Find <code>COUPLE.groomNickname</code>. This short name appears in labels, signatures, and placeholders.
- **Wedding date and day** — Same file, lines 77-78. Change <code>WEDDING_DATE</code> and <code>WEDDING_DAY</code>. Make sure the weekday matches the date.
- **Wedding times** — Same file, lines 79-84. Change the four values inside <code>TIMES</code>.
- **Ceremony** — Same file, lines 88-93. Change <code>CEREMONY_VENUE</code>: name, address, Google Maps link, and photo paths.
- **Reception** — Same file, lines 94-99. Change <code>RECEPTION_VENUE</code>: name, address, Google Maps link, and photo paths.
- **One venue or two venues** — Same file, lines 110-139. Find <code>VENUE_CARDS.layout</code>. Use <code>"combined"</code> for one shared venue or <code>"separate"</code> for two venues.
- **RSVP deadline and contact** — Same file, lines 142-146. Change the values inside <code>RSVP</code>.
- **Wedding hashtag** — Same file, line 147. Replace every value inside <code>HASHTAGS</code>.

### Design, photos, and media

- **Dress-code colors** — Open <code>content/site.ts</code>, lines 166-171. Change the names and HEX values inside <code>DRESS_CODE_PALETTE</code>.
- **Attire cards and instructions** — Same file, lines 179-296. Use <code>ATTIRE.show</code> to choose the visible groups, then update their text, illustrations, and palettes.
- **Website address** — Same file, line 301. Change <code>SITE_URL</code> to the final HTTPS address. Keep the trailing slash.
- **Social sharing picture** — Same file, line 304. Change <code>LINK_PREVIEW_IMAGE</code>. Use a 1200 × 630 image saved inside <code>public/</code>.
- **Photo or plain design** — Same file, line 312. Set <code>DISPLAY_MODE</code> to <code>"photos"</code> or <code>"plain"</code>.
- **Monogram, seal, and music** — Same file, lines 315-320. Change the paths inside <code>BRAND</code>.
- **Main couple photos** — Same file, lines 324-348. Check <code>COUPLE_PHOTOS</code>, <code>COUPLE_PORTRAITS</code>, and both photo counts.
- **Floral decorations and ornaments** — Same file, lines 353-379. Change the shared paths inside <code>DECOR</code>.
- **Video** — Same file, lines 512-526. Change <code>coupleVideo</code>: local path or YouTube ID, plus the thumbnail.
- **Favicon** — Open <code>app/layout.tsx</code>, lines 120-132. Replace the matching files in <code>public/favicon_io/</code>, or update <code>metadata.icons</code> and <code>manifest</code>.
- **Actual website colors** — Open <code>app/globals.css</code>, lines 172-529. Change the relevant <code>--color-motif-*</code>, <code>--color-welcome-*</code>, or <code>--color-dash-*</code> variable carefully. See <code>COLOR_CHEATSHEET.md</code> first.

### Wording and page sections

- **Theme and motif wording** — Open <code>content/site.ts</code>, lines 425-432. Change <code>siteConfig.wedding.theme</code> and <code>motif</code>. These labels do not recolor the website.
- **Countdown wording** — Same file, lines 450-454. Change only the countdown phrases. The date comes from <code>WEDDING_DATE</code>.
- **Love story** — Same file, lines 528-618. Change <code>loveStory</code> and <code>chapters</code>, including dates, photos, and paragraphs.
- **Gallery wording and captions** — Same file, lines 621-654. Change <code>gallery</code>.
- **Instructions and reminders** — Same file, lines 659-779. Review every value inside <code>eventDetails</code>.
- **Wedding-day schedule** — Same file, lines 782-913. Edit or reorder <code>weddingTimeline.events</code>.
- **Entourage headings** — Same file, lines 917-959. Change <code>entourage.headingLabels</code>. The actual names come from Google Sheets.
- **RSVP wording** — Same file, lines 964-1072. Change the text inside <code>rsvp</code>.
- **FAQ** — Same file, lines 1130-1212. Review every item inside <code>faq.items</code>.
- **Gift information and QR codes** — Same file, lines 1215-1263. Change <code>registry</code> carefully.
- **Contact details** — Same file, lines 1507-1511. Replace the phone numbers and email inside <code>contact</code>.
- **Spotify playlist** — Same file, lines 1627-1645. Replace both <code>playlist.embedUrl</code> and <code>spotifyUrl</code>.
- **Footer and social links** — Same file, lines 1678-1745. Review all values inside <code>footer</code>.
- **Guest photo upload** — Same file, lines 1748-1827. Change <code>snapShare</code>: Drive folder, QR image, hashtag, wording, and optional images.
- **Accommodation** — Same file, line 1828 onward. Change the coordinator and hotel information inside <code>accommodation</code>.

### Google and dashboard settings

- **All Google connections** — Open <code>content/site.ts</code>, lines 400-423. Replace the client-specific values in <code>SPONSORS_API</code> and <code>siteConfig.googleAPI</code>.
- **Shared Google Sheet** — Same file, line 421. Replace <code>googleAPI.googleShare</code> with the new client's Sheet URL.
- **Guest-list Apps Script** — Same file, line 413. Replace the complete <code>googleAPI.guestList</code> Web App URL.
- **Dashboard password** — Open <code>app/dashboard/page.tsx</code>, line 78. Find <code>DASHBOARD_PASSWORD</code>. Its sensitive value is intentionally not copied into this guide. The password is stored in browser-delivered code and is not strong authentication.

## 1. Couple and Wedding Information

### Couple names

Edit <code>content/site.ts:69-74</code>:

~~~ts
const COUPLE = {
  bride: "Client Bride Full Name",
  brideNickname: "Bride",
  groom: "Client Groom Full Name",
  groomNickname: "Groom",
}
~~~

The full names are used where formal names are needed. Nicknames are used in compact headings, the footer, signatures, metadata, and placeholders such as <code>{groom}</code> and <code>{bride}</code>.

### Date, day, time, and countdown

Edit <code>content/site.ts:77-84</code>:

~~~ts
const WEDDING_DATE = "June 5, 2027"
const WEDDING_DAY = "Saturday"
const TIMES = {
  entourageCall: "1:00 PM",
  guestArrival: "2:00 PM",
  ceremony: "2:30 PM",
  reception: "5:00 PM",
}
~~~

The opening countdown uses <code>WEDDING_DATE</code> automatically. Its phrases are at <code>content/site.ts:450-454</code>. There is no separate countdown date to edit.

**Check carefully:** The current audited value at line 81 says <code>11:30 PM</code> for guest arrival while the ceremony is at 12:15 PM. Verify whether that should be AM or PM for this client.

### Ceremony and reception

Edit <code>CEREMONY_VENUE</code> at <code>content/site.ts:88-93</code> and <code>RECEPTION_VENUE</code> at <code>content/site.ts:94-99</code>.

~~~ts
const CEREMONY_VENUE = {
  name: "Church Name",
  address: "Complete address",
  map: "https://maps.app.goo.gl/...",
  photos: ["/Details/church-1.jpg", "/Details/church-2.jpg"],
}
~~~

Use a normal browser to open each Maps link before launch. If both events use one venue, set <code>VENUE_CARDS.layout</code> to <code>"combined"</code> at line 111. Otherwise, keep <code>"separate"</code>.

Derived ceremony and reception objects are at <code>content/site.ts:1534-1552</code>. They already read the quick-setup constants, so beginners should not duplicate edits there.

### RSVP deadline and contact

Edit <code>content/site.ts:142-146</code>:

~~~ts
const RSVP = {
  deadline: "May 1, 2027",
  coordinator: "{groom} / {bride}",
  phone: "+63 9XX XXX XXXX",
}
~~~

The deadline is reused by the RSVP section and footer. The coordinator supports <code>{groom}</code> and <code>{bride}</code>. General contact fields are also at <code>content/site.ts:1507-1511</code>.

### Hashtag

Edit <code>HASHTAGS</code> at <code>content/site.ts:147</code>:

~~~ts
const HASHTAGS = ["#BrideAndGroom2027"]
~~~

You may add more quoted values separated by commas. The current value, <code>#TrizhaFoundHerWei</code>, appears to belong to a previous couple and must be reviewed.

### Love story and chapter photos

The active love-story content is <code>siteConfig.loveStory</code> at <code>content/site.ts:528-618</code>.

- Section title, subtitle, and introduction: lines 529-539.
- Closing quote controls: lines 544-549.
- Chapter list: lines 562-618.
- Each chapter supports <code>date</code>, <code>title</code>, <code>image</code>, <code>imageAlt</code>, <code>imagePosition</code>, and <code>paragraphs</code>.

~~~ts
{
  date: "2024",
  title: "How We Met",
  image: "/LoveStory/how-we-met.webp",
  imageAlt: "Bride and Groom on their first trip",
  imagePosition: "center 30%",
  paragraphs: [
    "Write the first short paragraph here.",
    "Write the second short paragraph here.",
  ],
},
~~~

Use a truthful <code>imageAlt</code> description. The older <code>narratives</code> block at lines 1599-1621 contains stale names and is not the active chapter-based story.

### Wedding theme and colors

There are three different kinds of “theme” settings. Choose the one that matches what you want to change:

1. **Change the written theme or motif name:** Open <code>content/site.ts</code>, lines 430-431. These are descriptive words only; they do not recolor the website.
2. **Change the dress-code swatches:** Open <code>content/site.ts</code>, lines 166-171, 186-191, 216-220, and 246-251. These colors appear in the attire cards.
3. **Change the actual website colors:** Open <code>app/globals.css</code>, lines 172-529. These CSS variables control the public website and dashboard.

The main public palette variables begin at <code>app/globals.css:172</code>:

- <code>--color-motif-*</code>: lines 172-202.
- <code>--color-welcome-*</code>: lines 209-249.
- Page/button/ink variables: lines 368-461.
- Dashboard variables: lines 469-529.

Example:

~~~css
--color-motif-accent: #739ACD;
--color-motif-deep: #172C4C;
--color-motif-medium: #9AADE0;
--color-welcome-bg: #FAF6EE;
~~~

Change a shared CSS variable only when you intend to update every component that uses it. See <code>COLOR_CHEATSHEET.md</code> for the detailed color inventory.

### Dress code and attire

The active attire configuration is <code>ATTIRE</code> at <code>content/site.ts:179-296</code>.

- Visible cards and their order: <code>ATTIRE.show</code>, line 180.
- Entourage: lines 182-210.
- Family: lines 212-240.
- Principal sponsors: lines 242-270.
- Guests: lines 272-296.
- Section labels and introductory instructions: lines 685-700.

Example:

~~~ts
show: ["sponsors", "entourage", "guests"] as AttireGroupId[],
~~~

Use an empty array to hide the entire attire guide. Leaving a group out hides that card without deleting its settings.

### Entourage and principal sponsors

The live names and roles do **not** come from a hardcoded list in <code>content/site.ts</code>.

- Entourage names and roles come from the Apps Script in <code>googleAPI.entourage</code>, configured at <code>content/site.ts:415</code>, using the worksheet named <code>Entourage</code>.
- Principal sponsors come from <code>googleAPI.sponsors</code>, <code>sponsorsInviteOne</code>, and <code>sponsorsInviteTwo</code> at lines 416-419, using the worksheet named <code>PrincipalSponsors</code>.
- Display headings can be renamed in <code>content/site.ts:940-959</code>.

For a new client, update the rows in the copied Google Sheet and deploy the copied Apps Script. Do not type guest names into the old legacy attire block.

### Other messages that must be reviewed

Client-specific wording is spread across these active sections in <code>content/site.ts</code>:

- **Opening headline, invitation, and loading messages:** lines 448-477.
- **Video heading:** lines 512-526.
- **Gallery wording:** lines 621-654.
- **Event details and reminders:** lines 659-779.
- **Timeline wording and schedule:** lines 782-913.
- **RSVP form and request messages:** lines 964-1072.
- **Book of Guests and message wording:** lines 1074-1120.
- **FAQ:** lines 1130-1212.
- **Gift guide:** lines 1215-1263.
- **Closing section:** lines 1650-1675.
- **Footer, links, and credits:** lines 1678-1745.
- **Snap & Share:** lines 1748-1827.
- **Accommodation:** line 1828 onward.

## 2. Images, Photos, and Media

### Asset-folder map

Open the folder that matches the item you want to replace:

- **Mobile or portrait couple photos:** Put them in <code>public/mobile-background/</code>. Their paths and count are configured in <code>content/site.ts:324-343</code>.
- **Desktop or landscape couple photos:** Put them in <code>public/desktop-background/</code>. Their paths and count are configured in <code>content/site.ts:344-348</code>.
- **Venue, attire, link-preview, and couple artwork:** Put them in <code>public/Details/</code>. Check <code>content/site.ts:88-99, 184, 214, 244, 274, 304, 317</code>.
- **Love-story photos:** The current paths use <code>public/mobile-background/</code>. The chapter paths are at <code>content/site.ts:562-618</code>. A <code>public/LoveStory/</code> folder does not currently exist, but a future client setup may create one and point the chapter paths to it.
- **Monogram and seal:** Put them in <code>public/monogram/</code>. Their paths are at <code>content/site.ts:316, 318</code>.
- **Floral corners and ornaments:** Put them in <code>public/deco/</code>. Their paths are at <code>content/site.ts:353-379</code>.
- **Reminder-card images:** Put them in <code>public/box/</code>. Their paths are at <code>content/site.ts:704-710</code>.
- **Wedding timeline illustrations:** Put them in <code>public/weddingtimeline/</code>. Keep the lowercase <code>t</code> because it matches the active paths at <code>content/site.ts:813-913</code>.
- **Payment and album QR images:** Put them in <code>public/QR/</code>. Their paths are at <code>content/site.ts:1257-1260, 1751</code>.
- **Background music:** Put it in <code>public/background_music/</code>. Its path is at <code>content/site.ts:319</code>.
- **Browser icons:** Put them in <code>public/favicon_io/</code>. Their metadata paths are in <code>app/layout.tsx:120-132</code>.

### Bride, groom, hero, mobile, and desktop photos

The current naming convention is:

- <code>public/mobile-background/couple (1).webp</code> through <code>couple (15).webp</code>.
- <code>public/desktop-background/couple (1).webp</code> through <code>couple (19).webp</code>.

The main portrait assignments are at <code>content/site.ts:330-334</code>:

~~~ts
const COUPLE_PORTRAITS = {
  groom: "/mobile-background/couple (14).webp",
  bride: "/mobile-background/couple (15).webp",
  cover: "/mobile-background/couple (11).webp",
}
~~~

The mobile and desktop photo-marquee counts are at lines 339 and 344. If a folder has 12 sequentially named photos, set its count to 12. A wrong count creates missing-image requests.

The display mode is at line 312:

- <code>"plain"</code>: botanical/solid styling; photo-only blocks are hidden.
- <code>"photos"</code>: enables photo backgrounds and photo-only blocks.

### Gallery and prenup photos

The full gallery automatically scans:

- <code>public/desktop-background/</code>
- <code>public/mobile-background/</code>

This is implemented in <code>lib/fetch-gallery-images.ts:106-134</code>. Supported gallery file extensions are defined at line 4: <code>.webp</code>, <code>.jpg</code>, <code>.jpeg</code>, <code>.png</code>, and <code>.gif</code>. Files are naturally sorted by name.

The invitation's gallery preview uses <code>COUPLE_PHOTOS</code> at <code>content/site.ts:651-653</code>. Its current caption still says “Cid and Jas”; replace that text for the new client.

### Monogram, couple lettering, seal, and decorations

Shared brand paths are at <code>content/site.ts:315-320</code>:

~~~ts
const BRAND = {
  monogram: "/monogram/new-monogram.png",
  coupleNameImage: "/Details/client-couple-names.png",
  seal: "/monogram/new-seal.png",
  backgroundMusic: "/background_music/client-song.mp3",
}
~~~

Shared decorations are at <code>content/site.ts:353-364</code>. Change a path there to update every section that reuses that decoration. Use a transparent PNG or WebP for ornaments and floral corners.

### Attire illustrations

The active illustration paths are:

- Entourage: <code>content/site.ts:184</code>.
- Family: <code>content/site.ts:214</code>.
- Principal sponsors: <code>content/site.ts:244</code>.
- Guests: <code>content/site.ts:274</code>.

Only the groups named in <code>ATTIRE.show</code> at line 180 are displayed.

### Favicon and app icons

Replace these files while keeping the same names, or update <code>app/layout.tsx:120-132</code>:

- <code>public/favicon_io/favicon-16x16.png</code>
- <code>public/favicon_io/favicon-32x32.png</code>
- <code>public/favicon_io/favicon.ico</code>
- <code>public/favicon_io/apple-touch-icon.png</code>
- <code>public/favicon_io/android-chrome-192x192.png</code>
- <code>public/favicon_io/android-chrome-512x512.png</code>
- <code>public/favicon_io/site.webmanifest</code>

Also open <code>site.webmanifest</code> and verify that its icon paths still match the actual <code>/favicon_io/</code> locations.

### Social media preview image

Set <code>LINK_PREVIEW_IMAGE</code> at <code>content/site.ts:304</code>. The project expects a **1200 × 630** image. The current path is <code>/Details/linkprev.png</code>.

Use a new file name when the image changes, for example:

~~~ts
const LINK_PREVIEW_IMAGE = "/Details/ariel-julie-preview-v2.jpg"
~~~

Facebook and messaging apps cache preview images by URL, so replacing a file without renaming it may continue showing the old image.

### Background music and video

- Background music: <code>BRAND.backgroundMusic</code> at <code>content/site.ts:319</code>. Current files are under <code>public/background_music/</code>. MP3 is the proven project format.
- Local video: put an MP4 file under <code>public/video/</code> and set <code>coupleVideo.videoSrc</code> at line 519.
- YouTube video: leave <code>videoSrc</code> empty and set only the video ID at line 521, not the full YouTube URL.
- Video thumbnail: line 523.

~~~ts
videoSrc: "/video/our-story.mp4",
youtubeId: "",
thumbnail: "/Details/video-cover.webp",
~~~

### Safely replacing an image

You have two safe choices:

1. **Keep the exact old file name.** Replace the file with the new image. No source path changes are needed.
2. **Use a new descriptive file name.** Add it under <code>public/</code>, then update every matching path in <code>content/site.ts</code>.

After either method:

1. Search the entire project for the old file name.
2. Check that the new path begins with <code>/</code> and does not include <code>public</code>.
3. Confirm spelling, spaces, parentheses, capitalization, and extension.
4. Run the site and inspect both phone and desktop layouts.
5. Run <code>pnpm build</code> before deployment.

### Referenced assets that currently need verification

The audit found these configured paths without matching files in <code>public/</code>. For each item, either add the missing file or update the source path to a real file:

- **Couple-name artwork** — Path: <code>/Details/newcoupelNames.png</code>. Source: <code>content/site.ts:317</code>. The file name may contain a spelling mistake.
- **Shared footer vine** — Path: <code>/deco/footerVine.png</code>. Source: <code>content/site.ts:361</code>.
- **Love-story left decoration** — Path: <code>/deco/lovestorydeco/Elegant-Eucalyptus-Left.png</code>. Source: <code>content/site.ts:362</code>.
- **Love-story right decoration** — Path: <code>/deco/lovestorydeco/Elegant-Eucalyptus-Right.png</code>. Source: <code>content/site.ts:363</code>.
- **Video thumbnail** — Path: <code>/desktop-background/couples (20).webp</code>. Source: <code>content/site.ts:523</code>. The configured name says <code>couples</code>, but the existing folder pattern uses <code>couple</code>.
- **Snap & Share album QR** — Path: <code>/QR/AlbumQR.png</code>. Source: <code>content/site.ts:1751</code>.

These are conditional or currently hidden but also need checking before enabling:

- <code>/frontboxes/couple (1).webp</code> through <code>(3).webp</code>, lines 457-460, used by photo display mode.
- <code>/Details/Family.png</code>, line 214, used if the Family attire card is enabled.

## 3. Google Forms, Sheets, and Apps Script

### How the Google integrations fit together

The browser calls the website's internal API routes. Those routes call the configured Apps Script Web App URLs, and the scripts read or update Google Sheets.

~~~text
Guest's browser
    -> /api/guests, /api/messages, /api/entourage, ...
    -> Google Apps Script Web App URL
    -> worksheet in a Google Spreadsheet
~~~

The active client configuration is in <code>content/site.ts:400-423</code>. For a new client, replace the **entire URL**, not only part of it.

### Actual integration inventory

The following values are copied from the project exactly. For a new client, replace the complete URL in the stated setting. Do not edit only the middle of an old URL.

#### 1. Guest message Google Form

- **Purpose:** Sends a guest's name and message to a Google Form.
- **Open:** <code>content/site.ts</code>, line 411.
- **Endpoint:** <code>https://docs.google.com/forms/d/e/1FAIpQLSdzrPCtDDo88GCbufuJuzylw6nMx81kMQbK4QL-d9ehxujwKQ/formResponse</code>
- **Form ID:** <code>1FAIpQLSdzrPCtDDo88GCbufuJuzylw6nMx81kMQbK4QL-d9ehxujwKQ</code>
- **Form fields:** <code>entry.405401269</code> is the name and <code>entry.893740636</code> is the message. They are used at <code>components/sections/messages.tsx:202-203</code>.
- **Needs verification:** The public view URL and the Form's response destination are not confirmed in the repository.

#### 2. Messages Apps Script

- **Purpose:** Reads the Book of Guests and performs message operations.
- **Open:** <code>content/site.ts</code>, line 412.
- **Web App URL:** <code>https://script.google.com/macros/s/AKfycby8lR4ASvKUFfd75yl1k6okrRq29HxH_sP4Ml6vNNkzZPPgqMZkF-xtMqFkAWaUv3MOMQ/exec</code>
- **Deployment ID:** <code>AKfycby8lR4ASvKUFfd75yl1k6okrRq29HxH_sP4Ml6vNNkzZPPgqMZkF-xtMqFkAWaUv3MOMQ</code>
- **Project Script ID:** Not configured in this repository.
- **Website route:** <code>app/api/messages/route.ts:5-121</code>.
- **Expected worksheet:** <code>Messages</code>.
- **Needs verification:** The exact spreadsheet bound to this deployment.

#### 3. Guest list and live RSVP Apps Script

- **Purpose:** Searches the guest list and saves RSVP answers.
- **Open:** <code>content/site.ts</code>, line 413.
- **Web App URL:** <code>https://script.google.com/macros/s/AKfycbxllHXj_GkXMTdkSmuOOJndZT6V-AjUxnoQErHsQiriLCONTo_4KvXa5gUvbCr07AzjZg/exec</code>
- **Deployment ID:** <code>AKfycbxllHXj_GkXMTdkSmuOOJndZT6V-AjUxnoQErHsQiriLCONTo_4KvXa5gUvbCr07AzjZg</code>
- **Project Script ID:** Not configured in this repository.
- **Website code:** <code>app/api/guests/route.ts:14</code>. The live RSVP submits from <code>components/sections/guest-list.tsx:468</code>.
- **Worksheet:** <code>Guests</code>, confirmed at <code>google-apps-script/guest-management.js:33, 82, 355</code>.
- **Needs verification:** The exact spreadsheet bound to this deployment.

#### 4. Guest join-request Apps Script

- **Purpose:** Saves requests from people who cannot find their name in the guest list.
- **Open:** <code>content/site.ts</code>, line 414.
- **Web App URL:** <code>https://script.google.com/macros/s/AKfycbwmAd__RLWq2RGBeO7i-OQ-XZ1CMxzkX2L8Jm96SoouaN0Rq7EQUG3DCK5iCw1dg8DELQ/exec</code>
- **Deployment ID:** <code>AKfycbwmAd__RLWq2RGBeO7i-OQ-XZ1CMxzkX2L8Jm96SoouaN0Rq7EQUG3DCK5iCw1dg8DELQ</code>
- **Project Script ID:** Not configured in this repository.
- **Website code:** <code>app/api/guest-requests/route.ts:5</code>. The form submits at <code>components/sections/guest-list.tsx:572</code>.
- **Worksheet:** <code>WishGuest</code>, confirmed at <code>GUEST_WISH_SETUP.md:33</code>.
- **Needs verification:** The exact spreadsheet bound to this deployment.

#### 5. Entourage Apps Script

- **Purpose:** Loads entourage names and roles.
- **Open:** <code>content/site.ts</code>, line 415.
- **Web App URL:** <code>https://script.google.com/macros/s/AKfycbzDxAyNflBLfk9xPERRC_NB9c9hg3eHf5TOjgUKiNT6RSLkKq35PMaPYdiYbcBjeQofQw/exec</code>
- **Deployment ID:** <code>AKfycbzDxAyNflBLfk9xPERRC_NB9c9hg3eHf5TOjgUKiNT6RSLkKq35PMaPYdiYbcBjeQofQw</code>
- **Project Script ID:** Not configured in this repository.
- **Website route:** <code>app/api/entourage/route.ts:14</code>.
- **Worksheet:** <code>Entourage</code>. The route can also read this worksheet using <code>googleAPI.googleShare</code>.

#### 6. Principal sponsors Apps Script

- **Purpose:** Loads principal sponsors for the main page, <code>/inviteone</code>, and <code>/invitetwo</code>.
- **Open:** <code>content/site.ts</code>, lines 400, 416, and 418-419.
- **Web App URL:** <code>https://script.google.com/macros/s/AKfycbx3EBkMjYidXvPynfVmHMTc4BJs_9dlD4CJQh0ZRrsVB2NcrlE3mHGAPMp3K93P-A51Kw/exec</code>
- **Deployment ID:** <code>AKfycbx3EBkMjYidXvPynfVmHMTc4BJs_9dlD4CJQh0ZRrsVB2NcrlE3mHGAPMp3K93P-A51Kw</code>
- **Project Script ID:** Not configured in this repository.
- **Website route:** <code>app/api/principal-sponsor/route.ts:13, 23-24</code>.
- **Worksheet:** <code>PrincipalSponsors</code>.
- **Needs verification:** The exact spreadsheet bound to this deployment.

#### 7. Shared Google Spreadsheet

- **Purpose:** Opens the Sheet from the dashboard and provides a direct-read fallback for the entourage.
- **Open:** <code>content/site.ts</code>, line 421.
- **Spreadsheet URL:** <code>https://docs.google.com/spreadsheets/d/1gGX9P2l3yLuay38Sqa9iOcVWjfWuHbqN8LloboZxk7Y/edit?usp=sharing</code>
- **Spreadsheet ID:** <code>1gGX9P2l3yLuay38Sqa9iOcVWjfWuHbqN8LloboZxk7Y</code>
- **Website route:** The fallback is used at <code>app/api/entourage/route.ts:15, 51</code>.
- **Confirmed direct worksheet:** <code>Entourage</code>.
- **Needs verification:** Whether every Apps Script deployment above uses this same spreadsheet.

#### 8. Video-message Google Form

- **Open:** <code>content/site.ts</code>, lines 422-423.
- **Form URL:** <code>https://docs.google.com/forms/d/e/1FAIpQLSfeGlEl4CMXWefdvCw6AOPHFS1ROku_rs-Gbofa2LkVJ0sLGQ/viewform</code>
- **Form ID:** <code>1FAIpQLSfeGlEl4CMXWefdvCw6AOPHFS1ROku_rs-Gbofa2LkVJ0sLGQ</code>
- **Needs verification:** No active part of the website was found using this value during the audit.

#### 9. WeddingDetails API

- **Current status:** Not configured.
- **Expected setting:** <code>googleAPI.weddingDetails</code>, but this property is missing from <code>content/site.ts</code>.
- **Code expecting it:** <code>app/api/wedding-details/route.ts:9</code> and <code>lib/site-config.ts:104</code>.
- **Worksheet supported by the Apps Script source:** <code>WeddingDetails</code>.
- **Web App URL, deployment ID, and Script ID:** Not configured.

#### 10. Guest photo-upload folder

- **Purpose:** Stores Snap & Share uploads in Google Drive.
- **Open:** <code>content/site.ts</code>, lines 1749-1750.
- **Drive folder ID:** <code>1nKNjPjQ7F_HLQZmJgw4hzFHIDJ-k52jC</code>
- **Needs verification:** Check the folder's sharing and upload permissions manually in Google Drive.

### Worksheet names used by the project

- <code>Guests</code> — guest list, RSVP status, companions, table number, and attendance.
- <code>WishGuest</code> — requests from people who cannot find their name.
- <code>Entourage</code> — entourage names, roles, and proposal responses.
- <code>PrincipalSponsors</code> — principal-sponsor names, roles, and responses.
- <code>Messages</code> — expected Book of Guests and wishes storage. Verify the deployed script.
- <code>WeddingDetails</code> — supported by repository script code, but no active endpoint is configured.

### New-client Google setup

1. Copy the correct Google Spreadsheet for the new client.
2. Preserve the worksheet names and header structure expected by the scripts.
3. Copy each Apps Script project or bind the appropriate code to the new Sheet.
4. In Apps Script, choose **Deploy → New deployment → Web app**.
5. Set the deployment's execution and access permissions required by the website.
6. Copy the final URL ending in <code>/exec</code>.
7. Replace the matching property in <code>content/site.ts:410-423</code>.
8. Put the new Sheet URL in <code>googleAPI.googleShare</code>.
9. If using a new Google Form, inspect its field entry IDs and update <code>components/sections/messages.tsx:202-203</code>. This is a source-code change and should be performed only during a planned client setup.
10. Test reading and writing with non-sensitive test records before importing the real guest list.

> **Apps Script ID versus deployment ID:** The long value in the <code>/s/.../exec</code> URL is the deployment ID. The Apps Script project's Script ID is a different value found under **Project Settings** in Apps Script. Project Script IDs are not stored in this repository.

> **Deployment warning:** Editing Apps Script code does not always update an existing deployment automatically. Create a new deployment version, then verify whether the Web App URL remained the same.

### Active RSVP versus old RSVP code

The active RSVP is <code>components/sections/guest-list.tsx</code>, which calls <code>/api/guests</code> and stores data through the <code>Guests</code> Apps Script.

An older component at <code>components/sections/rsvp.tsx</code> contains a different Google Form ID. Do not update that old form unless you first confirm the component is used by a route. The <code>/api/rsvp</code> implementation is also not the persistent live guest-list system.

### Google integration test checklist

- [ ] Search for an existing guest.
- [ ] Submit an attending RSVP with the allowed number of companions.
- [ ] Submit a declined RSVP.
- [ ] Confirm the correct row changed in <code>Guests</code>.
- [ ] Submit a “name not found” request and confirm it appears in <code>WishGuest</code>.
- [ ] Confirm entourage and principal-sponsor names load.
- [ ] Submit a guest message and confirm it appears in the Book of Guests.
- [ ] Confirm dashboard actions affect only the new client's spreadsheet.
- [ ] Remove all test rows before launch.

## 4. Website Deployment and Hosting

### Audited deployment information

- **GitHub repository:** <code>https://github.com/bonnn34/Ariel-and-Julie-Ann.git</code>
- **Repository name:** <code>Ariel-and-Julie-Ann</code>
- **Current branch:** <code>main</code>
- **Vercel project name:** Needs verification. The repository does not contain <code>.vercel/project.json</code>.
- **Vercel deployment URL:** <code>https://ariel-and-julie-ann.vercel.app/</code>, from <code>content/site.ts:301</code>.
- **Production website URL:** <code>https://ariel-and-julie-ann.vercel.app/</code>, unless <code>NEXT_PUBLIC_SITE_URL</code> overrides it.
- **Custom domain:** Not configured in the repository. Check the Vercel dashboard.
- **Package manager:** pnpm, confirmed by <code>pnpm-lock.yaml</code> and <code>pnpm-workspace.yaml</code>.
- **Framework:** Next.js 15, from <code>package.json:60</code>.

The package's internal name is <code>my-v0-project</code> at <code>package.json:2</code>. This is not proof of the Vercel project name.

### Environment variables

No committed <code>.env</code> file was found. These variables are read by the source:

#### <code>NEXT_PUBLIC_SITE_URL</code>

- **Location:** <code>content/site.ts:307</code>.
- **Required:** No; it is optional.
- **Purpose:** Overrides <code>SITE_URL</code>. If used, set it to the final HTTPS production address instead of a preview URL.

#### <code>NEXT_PUBLIC_ENABLE_DECOR</code>

- **Location:** <code>components/invitation-page.tsx:116</code>.
- **Required:** No; it is optional.
- **Purpose:** Decorations are enabled unless the value is exactly <code>false</code>.

#### <code>NEXT_PUBLIC_WEDDING_API_URL</code>

- **Location:** <code>lib/wedding-api.ts:6</code>.
- **Required:** No; it is optional and appears to be legacy support.
- **Purpose:** Alternative WeddingDetails API. The active URL is currently empty and not configured.

#### <code>ANALYZE</code>

- **Location:** <code>next.config.mjs:3</code>.
- **Required:** No; it is an optional local build tool.
- **Purpose:** Enables bundle analysis when set to <code>true</code>.

#### <code>NODE_ENV</code>

- **Location:** <code>next.config.mjs:55</code>.
- **Required:** Set automatically by Next.js and Vercel.
- **Warning:** Do not override it manually for normal deployments.

Some older documentation mentions <code>NEXT_PUBLIC_DASHBOARD_PASSWORD</code>, but the live dashboard does not read it. The current dashboard password is hardcoded at <code>app/dashboard/page.tsx:78</code>. Because code sent to the browser cannot securely hide a client-side password, do not treat it as strong authentication.

### Local install, run, and build

~~~powershell
pnpm install
pnpm dev
~~~

Open <code>http://localhost:3000</code>. Stop the server with **Ctrl+C**.

Before deployment:

~~~powershell
pnpm lint
pnpm exec tsc --noEmit
pnpm build
~~~

The available scripts are defined in <code>package.json:5-16</code>. Note that <code>next.config.mjs:7-12</code> allows the production build to ignore ESLint and TypeScript build errors, so run lint and type checking separately.

### Simple Git workflow

First confirm you are working in the correct client repository:

~~~powershell
git remote -v
git branch --show-current
git status
~~~

For a new client, create a branch:

~~~powershell
git switch -c client/couple-name
~~~

After editing and testing:

~~~powershell
git status
git diff
git add content public
git commit -m "Customize invitation for Couple Name"
git push -u origin client/couple-name
~~~

If the project is intentionally deployed directly from <code>main</code>, merge the reviewed branch and push <code>main</code>. Do not force-push.

### Vercel deployment

This repository does not include the local Vercel project-link file, so the exact Vercel project and Git integration must be checked in the Vercel dashboard.

Typical connected-repository flow:

1. Push the approved commit to the branch Vercel uses for production.
2. Open the Vercel project dashboard.
3. Confirm the deployment uses the expected Git commit.
4. Wait for the deployment status to become **Ready**.
5. Open the production domain, not only the preview URL.

If Vercel is not connected to Git, deployment steps are **Needs verification**. Do not create a new project or deployment without the account owner's approval.

### Verify that the latest version is live

1. Compare the commit shown in Vercel with <code>git rev-parse HEAD</code>.
2. Open the production URL in a private/incognito window.
3. Hard-refresh the page.
4. Verify names, date, venue, photos, favicon, and link-preview metadata.
5. Test on a narrow phone screen and desktop.
6. Test RSVP, guest request, messages, entourage, table finder, Maps links, music, video, and photo upload.
7. Check the browser console and Network tab for 404 or 500 errors.
8. Test the social preview with the platform's sharing debugger when available.

## 5. New Client Setup Checklist

### Create a safe client copy

- [ ] Confirm the correct repository and Git remote.
- [ ] Create a client branch or a separate client repository.
- [ ] Never reuse production Google data accidentally.
- [ ] Keep secrets and private guest data out of Git.

### Couple and wedding details

- [ ] Replace full names and nicknames at <code>content/site.ts:69-74</code>.
- [ ] Replace wedding date, day, and every time at lines 77-84.
- [ ] Replace ceremony name, address, Maps link, and photos at lines 88-93.
- [ ] Replace reception name, address, Maps link, and photos at lines 94-99.
- [ ] Select combined or separate venue cards at lines 110-139.
- [ ] Replace RSVP deadline and contact at lines 142-146 and 1507-1511.
- [ ] Replace every hashtag at line 147.
- [ ] Review the theme label and motif at lines 430-431.
- [ ] Review all reminders, FAQ answers, footer links, and accommodation details.

### Story, attire, and people

- [ ] Rewrite every active love-story chapter at lines 528-618.
- [ ] Replace chapter photos and alt text.
- [ ] Select attire groups at line 180.
- [ ] Update attire instructions, illustrations, and swatches at lines 182-296.
- [ ] Import entourage names into the <code>Entourage</code> worksheet.
- [ ] Import principal sponsors into the <code>PrincipalSponsors</code> worksheet.
- [ ] Review entourage headings at lines 940-959.
- [ ] Update the complete timeline at lines 813-913.

### Images and media

- [ ] Replace mobile portraits in <code>public/mobile-background/</code>.
- [ ] Replace desktop images in <code>public/desktop-background/</code>.
- [ ] Update mobile and desktop photo counts at lines 339 and 344.
- [ ] Assign bride, groom, and cover photos at lines 330-334.
- [ ] Replace venue and attire images under <code>public/Details/</code>.
- [ ] Replace monogram and seal under <code>public/monogram/</code>.
- [ ] Replace decorations under <code>public/deco/</code>.
- [ ] Replace favicon files under <code>public/favicon_io/</code>.
- [ ] Create a new 1200 × 630 social-preview image and update line 304.
- [ ] Replace background music at line 319.
- [ ] Replace local/YouTube video and thumbnail at lines 519-523.
- [ ] Check every path in the “Referenced assets that currently need verification” table.

### Google systems

- [ ] Copy the client spreadsheet and preserve required worksheet names.
- [ ] Copy/reconfigure Google Forms.
- [ ] Confirm new Form entry IDs.
- [ ] Deploy each required Apps Script as a Web App.
- [ ] Replace all URLs at <code>content/site.ts:400-423</code>.
- [ ] Confirm the shared Spreadsheet URL and ID.
- [ ] Confirm the Apps Script projects are bound to the intended spreadsheet.
- [ ] Test guest search, RSVP updates, join requests, entourage, sponsors, and messages.
- [ ] Remove test data.

### Branding, domain, and deployment

- [ ] Update actual CSS palette variables in <code>app/globals.css:172-529</code>.
- [ ] Update <code>SITE_URL</code> at <code>content/site.ts:301</code>.
- [ ] Set <code>NEXT_PUBLIC_SITE_URL</code> in Vercel if an environment override is desired.
- [ ] Verify the Vercel project name and production branch.
- [ ] Add/verify the custom domain in Vercel, if applicable.
- [ ] Run lint, TypeScript check, and production build.
- [ ] Commit and push the reviewed changes.
- [ ] Confirm the deployed Git commit and production URL.
- [ ] Perform final desktop, mobile, form, link, and social-preview tests.

## 6. Final Pre-Launch Warnings From the Current Audit

Resolve or deliberately confirm each item before reusing this project:

- The current hashtag at <code>content/site.ts:147</code> appears to belong to another couple.
- The gallery preview caption at <code>content/site.ts:653</code> says “Cid and Jas.”
- The FAQ answer at <code>content/site.ts:1151</code> says the ceremony and reception use the same venue, while <code>VENUE_CARDS.layout</code> is currently <code>"separate"</code> and two different venues are configured.
- Guest arrival at <code>content/site.ts:81</code> is 11:30 PM; verify the intended AM/PM.
- Several configured image paths are missing, as listed in the asset-verification table.
- <code>googleAPI.weddingDetails</code> is expected by code but is not configured.
- The video-message Form is configured but no active use was found.
- The Apps Script project Script IDs and exact bound spreadsheets are not stored in this repository and must be verified in Google Apps Script.
- Vercel project name, Git connection, production branch, and custom-domain status must be verified in Vercel.
- The dashboard password is client-side and should not be considered secure authentication.
- Older setup documents and legacy blocks contain stale values. For active client content, use the locations in this guide and verify them in the running website.

## 7. Troubleshooting

### An image does not appear

Check the path, capitalization, extension, and actual file under <code>public/</code>. Open the direct URL locally, such as <code>http://localhost:3000/Details/photo.jpg</code>. A 404 means the path and file do not match.

### The countdown is wrong

Check <code>WEDDING_DATE</code> at <code>content/site.ts:77</code>. Use a full English date that JavaScript can parse, and check the result around midnight in the Philippines time zone.

### RSVP cannot find guests

Confirm <code>googleAPI.guestList</code>, the Web App permissions, the <code>Guests</code> worksheet name, required columns, and that the deployment is the latest version.

### Entourage does not load

Confirm both <code>googleAPI.entourage</code> and <code>googleAPI.googleShare</code>. Check that the Sheet is accessible as expected and the worksheet is exactly named <code>Entourage</code>.

### Social sharing shows an old image

Give the preview image a new file name, update <code>LINK_PREVIEW_IMAGE</code>, redeploy, and use the social platform's cache/debug tool.

### Local changes do not appear in production

Compare the local commit with the deployment commit, confirm the production branch, check the Vercel deployment logs, and hard-refresh or use an incognito window.

