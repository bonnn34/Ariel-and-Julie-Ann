# Easy Component Visibility Guide

This guide shows you how to hide or show parts of the wedding website.

It uses a simple layout:

- **Status** — whether the component is currently shown.
- **Open this file** — the exact file to edit.
- **Find this line** — the exact line or setting.
- **To hide it** — the change you need to make.
- **To show it** — how to restore it.
- **Also affects** — anything else you should check.

The source code was checked on **October 31, 2026**.

> If a line number moves after future edits, search for the component or setting name shown in this guide.

## Status Symbols

- 🟢 **Shown** — currently visible.
- 🔴 **Hidden** — currently disabled or commented out.
- 🟡 **Conditional** — appears only on certain routes, screen sizes, user actions, or when data exists.

## Read This First

Most full website sections are listed together in:

**File:** <code>components/invitation-page.tsx</code>  
**Lines:** 237-299

The easiest safe method is to comment out one component line.

### Example: hide the Gallery

Currently shown:

~~~tsx
<Gallery />
~~~

Change it to:

~~~tsx
{/* <Gallery /> */}
~~~

### Show the Gallery again

Remove the comment symbols:

~~~tsx
<Gallery />
~~~

The symbols are:

~~~text
{/*     */}
~~~

Do not delete the import at the top of the file. Keeping it makes the section easy to restore.

---

# A. Main Website Sections

## 1. Opening Loading Screen

**Status:** 🟢 Shown on a fresh visit

**Open this file:** <code>components/invitation-page.tsx</code>

**Important lines:**

- Initial page state: lines 104-113
- Loading-screen condition: lines 118-120
- Loading-screen component: lines 178-183

The current fresh-visit setting is:

~~~tsx
return AppState.LOADING
~~~

### To skip the loading screen and envelope

At line 112, change it to:

~~~tsx
return AppState.DETAILS
~~~

This opens the main invitation immediately.

### To show the loading screen again

Restore:

~~~tsx
return AppState.LOADING
~~~

**Also affects:** The invitation envelope is part of the same opening sequence. Do not remove only the <code>LoadingScreen</code> component because the page can remain locked or show a blank transition.

**Special behavior:** Returning from the full Gallery already skips the opening sequence. That logic is at lines 101-110.

---

## 2. Loading-Screen Photos

**Status:** 🔴 Photo backdrop hidden because the website uses plain mode

**Open this file:** <code>content/site.ts</code>

**Find line 312:**

~~~ts
const DISPLAY_MODE = "plain" as "photos" | "plain"
~~~

### To keep loading photos hidden

Use:

~~~ts
const DISPLAY_MODE = "plain" as "photos" | "plain"
~~~

### To show loading photos

Use:

~~~ts
const DISPLAY_MODE = "photos" as "photos" | "plain"
~~~

**Also affects:** This changes photo/plain designs inside the loader, envelope, hero, love story, and Snap & Share. It does not hide those entire sections.

The condition is used at <code>components/invitation-page.tsx:115, 169-176</code>.

---

## 3. Invitation Envelope

**Status:** 🟢 Shown after the loading screen

**Open this file:** <code>components/invitation-page.tsx</code>

**Find lines 185-192:**

~~~tsx
{(loadingOverlayVisible || showInvitation) && (
  <InvitationHero
    onOpen={handleOpenInvitation}
    onTransitionStart={handleTransitionStart}
    enterFromLoading={heroEnterFromLoading}
    visible={showInvitation}
  />
)}
~~~

There is no separate safe true/false setting for only the envelope.

### To hide the complete opening experience

Use <code>AppState.DETAILS</code> as explained in “Opening Loading Screen.”

### To show it again

Restore <code>AppState.LOADING</code>.

**Also affects:** Page scrolling, loading transitions, and the button that opens the invitation.

---

## 4. Header and Navigation

**Status:** 🟡 Shown only after the invitation is opened

**Open this file:** <code>components/invitation-page.tsx</code>

**Find lines 237-248.**

The Navbar is rendered at line 244:

~~~tsx
<Navbar />
~~~

The empty spacer below it is at line 248:

~~~tsx
{appState === AppState.DETAILS && <div className="h-12 sm:h-14 md:h-16" aria-hidden />}
~~~

### To hide the navigation

Comment out the entire Navbar block at lines 237-246 **and** the spacer at line 248.

~~~tsx
{/*
{appState === AppState.DETAILS && (
  <motion.div>
    <Navbar />
  </motion.div>
)}

{appState === AppState.DETAILS && (
  <div className="h-12 sm:h-14 md:h-16" aria-hidden />
)}
*/}
~~~

### To show it again

Restore both blocks.

**Also affects:** If you leave the spacer visible, a blank strip remains above the Hero.

### Navigation links update automatically

The link list is in <code>components/navbar.tsx:24-41</code>.

At lines 68-116, the Navbar checks which section IDs exist. When you hide a whole section, its navigation link normally disappears automatically.

---

## 5. Main Hero and Couple Information

**Status:** 🟢 Shown

**Open this file:** <code>components/invitation-page.tsx</code>

**Find line 255:**

~~~tsx
<MainHero />
~~~

### To hide it

~~~tsx
{/* <MainHero /> */}
~~~

### To show it

~~~tsx
<MainHero />
~~~

**Component file:** <code>components/sections/hero.tsx</code>  
**Section ID:** <code>#home</code> at line 264

**Also affects:** The couple's main cover, names, date, and the Home navigation link.

---

## 6. Welcome Section

**Status:** 🟢 Shown

**Open this file:** <code>components/invitation-page.tsx</code>

**Find line 263:**

~~~tsx
<Welcome />
~~~

### To hide it

~~~tsx
{/* <Welcome /> */}
~~~

### To show it

~~~tsx
<Welcome />
~~~

**Component file:** <code>components/sections/welcome.tsx</code>  
**Section ID:** <code>#welcome</code> at line 93

---

## 7. Couple Video

**Status:** 🔴 Already hidden

**Open this file:** <code>components/invitation-page.tsx</code>

**Find line 267:**

~~~tsx
{/* <CoupleVideo skyBackdrop={false} /> */}
~~~

### To show it

Remove the comment symbols:

~~~tsx
<CoupleVideo skyBackdrop={false} />
~~~

### To hide it again

~~~tsx
{/* <CoupleVideo skyBackdrop={false} /> */}
~~~

**Video settings:** <code>content/site.ts:512-526</code>

Before showing it, check:

- <code>videoSrc</code>
- <code>youtubeId</code>
- <code>thumbnail</code>

---

## 8. Love Story / With Gratitude

**Status:** 🟢 Shown

**Open this file:** <code>components/invitation-page.tsx</code>

**Find line 268:**

~~~tsx
<LoveStory skyBackdrop={false} />
~~~

### To hide it

~~~tsx
{/* <LoveStory skyBackdrop={false} /> */}
~~~

### To show it

~~~tsx
<LoveStory skyBackdrop={false} />
~~~

**Component file:** <code>components/sections/love-story.tsx</code>  
**Section ID:** <code>#love-story</code> at line 154

**Important:** Love Story and Couple Video share the wrapper at <code>components/invitation-page.tsx:265-269</code>. If both are hidden, comment out that complete wrapper so it does not leave an empty decorative area.

### Smaller Love Story switches

Open <code>content/site.ts</code>.

Show or hide chapter numbers at line 541:

~~~ts
showChapterNumbers: false,
~~~

- <code>false</code> = hide numbers
- <code>true</code> = show numbers

Show or hide chapter dividers at line 543:

~~~ts
showChapterDividers: true,
~~~

Show or hide the frame at line 553:

~~~ts
showFrame: true,
~~~

The frame appears only in plain display mode.

---

## 9. Wedding Countdown

**Status:** 🟢 Shown

**Open this file:** <code>components/invitation-page.tsx</code>

**Find line 270:**

~~~tsx
<Countdown />
~~~

### To hide it

~~~tsx
{/* <Countdown /> */}
~~~

### To show it

~~~tsx
<Countdown />
~~~

**Component file:** <code>components/sections/countdown.tsx</code>  
**Section ID:** <code>#countdown</code> at line 247

**Also affects:** The Countdown link disappears from navigation. The wedding date remains available to the other sections.

---

## 10. Photo Gallery Preview

**Status:** 🟢 Shown

**Open this file:** <code>components/invitation-page.tsx</code>

**Find line 271:**

~~~tsx
<Gallery />
~~~

### To hide it

~~~tsx
{/* <Gallery /> */}
~~~

### To show it

~~~tsx
<Gallery />
~~~

**Component file:** <code>components/sections/gallery.tsx</code>  
**Section ID:** <code>#gallery</code> at line 412

**Important:** Hiding this section does not disable the separate <code>/gallery</code> page.

### Hide only the decorative frame

Open <code>content/site.ts</code>, line 639:

~~~ts
showFrame: false,
~~~

Use <code>true</code> to show the frame again.

---

## 11. Message Video

**Status:** 🔴 Already hidden

**Open this file:** <code>components/invitation-page.tsx</code>

**Find line 272:**

~~~tsx
{/* <MessageVideo /> */}
~~~

### To show it

~~~tsx
<MessageVideo />
~~~

### To hide it again

~~~tsx
{/* <MessageVideo /> */}
~~~

**Component file:** <code>components/sections/message-video.tsx</code>

---

## 12. Wishes and Messages

**Status:** 🟢 Shown

This section contains the message form and message wall.

**Open this file:** <code>components/invitation-page.tsx</code>

**Find line 273:**

~~~tsx
<Messages />
~~~

### To hide it

~~~tsx
{/* <Messages /> */}
~~~

### To show it

~~~tsx
<Messages />
~~~

**Component file:** <code>components/sections/messages.tsx</code>  
**Section ID:** <code>#messages</code> at line 443

**Also affects:** Hiding it stops this component's message loading and submission UI from mounting.

---

## 13. Wedding Details

**Status:** 🟢 Shown

This section contains:

- Ceremony venue
- Reception venue
- Dress code
- Attire cards
- Reminders

**Open this file:** <code>components/invitation-page.tsx</code>

**Find line 274:**

~~~tsx
<Details />
~~~

### To hide the complete section

~~~tsx
{/* <Details /> */}
~~~

### To show it again

~~~tsx
<Details />
~~~

**Component file:** <code>components/sections/details.tsx</code>  
**Section ID:** <code>#details</code> at line 844

### Hide only the ceremony venue card

Open <code>content/site.ts</code>, line 126:

~~~ts
show: false,
~~~

Restore <code>true</code> to show it.

### Hide only the reception venue card

Open <code>content/site.ts</code>, line 133:

~~~ts
show: false,
~~~

Restore <code>true</code> to show it.

These two switches work when <code>VENUE_CARDS.layout</code> is <code>"separate"</code>.

### Use one combined venue card

Open <code>content/site.ts</code>, line 111:

~~~ts
layout: "combined" as "separate" | "combined",
~~~

Use <code>"separate"</code> to return to two cards.

### Hide the date or arrival row

The venue-card switches are at <code>content/site.ts:113-138</code>:

~~~ts
showDate: false,
showArrival: false,
showReceptionTime: false,
~~~

Change a value to <code>true</code> to show that detail.

### Hide the complete Dress Code / Attire guide

Open <code>content/site.ts</code>, line 180.

Current setting:

~~~ts
show: ["guests"] as AttireGroupId[],
~~~

Hide all attire cards:

~~~ts
show: [] as AttireGroupId[],
~~~

Show selected cards:

~~~ts
show: ["sponsors", "entourage", "family", "guests"] as AttireGroupId[],
~~~

Valid names:

- <code>"sponsors"</code>
- <code>"entourage"</code>
- <code>"family"</code>
- <code>"guests"</code>

### Reminder card

The reminder card has no existing true/false setting.

**Source block:** <code>components/sections/details.tsx:1044-1105</code>

To hide the whole reminder card, comment out that complete JSX block. Individual reminder text items are at <code>content/site.ts:712-778</code>.

---

## 14. Wedding Timeline

**Status:** 🟢 Shown

**Open this file:** <code>components/invitation-page.tsx</code>

**Find line 275:**

~~~tsx
<WeddingTimeline />
~~~

### To hide the complete timeline

~~~tsx
{/* <WeddingTimeline /> */}
~~~

### To show it again

~~~tsx
<WeddingTimeline />
~~~

**Component file:** <code>components/sections/wedding-timeline.tsx</code>  
**Section ID:** <code>#wedding-timeline</code> at line 210

### Hide only one timeline event

Open <code>content/site.ts</code>.

Events are at lines 813-913. Every event has a <code>show</code> value.

Shown:

~~~ts
{
  show: true,
  time: "3:00 PM",
  title: "Photo Session",
}
~~~

Hidden:

~~~ts
{
  show: false,
  time: "3:00 PM",
  title: "Photo Session",
}
~~~

Keep the rest of the event information untouched.

---

## 15. Entourage and Principal Sponsors

**Status:** 🟡 Depends on the invitation route

- Visible on <code>/</code>
- Visible on <code>/inviteone</code>
- Visible on <code>/invitetwo</code>
- Hidden on <code>/inviteguest</code>

This is the only full main section that already has a proper visibility property.

**Control file:** <code>components/invitation-page.tsx</code>

- Property definition: lines 93-98
- Default value: line 100
- Render condition: line 276

Current render condition:

~~~tsx
{showEntourage && <Entourage sponsorsList={sponsorsList} />}
~~~

### Hide it on a route

For example, in <code>app/page.tsx:6</code>:

~~~tsx
return <InvitationPage showEntourage={false} />
~~~

### Show it on a route

~~~tsx
return <InvitationPage />
~~~

Or:

~~~tsx
return <InvitationPage showEntourage={true} />
~~~

**Existing hidden example:** <code>app/inviteguest/page.tsx:7</code>

**Also affects:** Entourage data prefetching at <code>components/invitation-page.tsx:163-165</code> and the Entourage navigation link.

### Hide only the Entourage frame

Open <code>content/site.ts</code>, line 939:

~~~ts
showFrame: false,
~~~

This hides only the border, not the names.

---

## 16. RSVP Form and Guest Search

**Status:** 🟢 Shown

**Open this file:** <code>components/invitation-page.tsx</code>

**Find line 277:**

~~~tsx
<GuestList />
~~~

### To hide RSVP completely

~~~tsx
{/* <GuestList /> */}
~~~

### To show RSVP again

~~~tsx
<GuestList />
~~~

**Component file:** <code>components/sections/guest-list.tsx</code>  
**Section ID:** <code>#guest-list</code> at line 621

This one component contains:

- Guest-name search
- RSVP form
- Companion form
- Join-request form
- Success messages
- Phone-number warning

The dialogs open only after a guest clicks a button:

- Search dialog state: lines 216-219
- Search dialog UI: line 709 onward
- RSVP dialog UI: line 967 onward
- Join-request dialog UI: line 1649 onward

They are not separate client visibility switches.

---

## 17. Book of Guests / Confirmed Guest List

**Status:** 🟡 Section shown; cards depend on confirmed guest data

**Open this file:** <code>components/invitation-page.tsx</code>

**Find line 285:**

~~~tsx
<BookOfGuests background={false} />
~~~

### To hide it

~~~tsx
{/* <BookOfGuests background={false} /> */}
~~~

### To show it

~~~tsx
<BookOfGuests background={false} />
~~~

**Component file:** <code>components/sections/book-of-guests.tsx</code>  
**Section ID:** <code>#guests</code> at line 335

Guest cards appear only when confirmed guests exist. The check is at line 498. An empty state appears at line 714.

**Important:** Book of Guests and FAQ share the wrapper at <code>components/invitation-page.tsx:279-287</code>. If both are hidden, comment out the entire wrapper.

---

## 18. Frequently Asked Questions

**Status:** 🟢 Shown

**Open this file:** <code>components/invitation-page.tsx</code>

**Find line 286:**

~~~tsx
<FAQ background={false} />
~~~

### To hide it

~~~tsx
{/* <FAQ background={false} /> */}
~~~

### To show it

~~~tsx
<FAQ background={false} />
~~~

**Component file:** <code>components/sections/faq.tsx</code>  
**Section ID:** <code>#faq</code> at line 233

Questions are stored at <code>content/site.ts:1148-1212</code>. Remove one object from that list to hide only that question.

The open/closed answer behavior is user interaction controlled by <code>openIndex</code> at <code>components/sections/faq.tsx:206, 299-363</code>.

---

## 19. Gifts and Contributions

**Status:** 🟢 Shown

**Open this file:** <code>components/invitation-page.tsx</code>

**Find line 288:**

~~~tsx
<Registry />
~~~

### To hide the entire Gifts section

~~~tsx
{/* <Registry /> */}
~~~

### To show it again

~~~tsx
<Registry />
~~~

**Component file:** <code>components/sections/registry.tsx</code>  
**Section ID:** <code>#registry</code> at line 153

### Hide only the payment-account block

Open <code>content/site.ts</code>, line 1249:

~~~ts
showAccounts: false,
~~~

Show it again:

~~~ts
showAccounts: true,
~~~

### Hide only one payment account

Each account is at <code>content/site.ts:1258-1259</code>.

~~~ts
{ show: false, label: "GCash", accountName: "...", accountNumber: "...", qr: "..." }
~~~

Change <code>false</code> back to <code>true</code> to show the account.

**Dependency:** A visible account also needs an account number or QR path.

---

## 20. Wedding Playlist

**Status:** 🟢 Shown

**Open this file:** <code>components/invitation-page.tsx</code>

**Find line 289:**

~~~tsx
<WeddingPlaylist />
~~~

### To hide it

~~~tsx
{/* <WeddingPlaylist /> */}
~~~

### To show it

~~~tsx
<WeddingPlaylist />
~~~

**Component file:** <code>components/sections/wedding-playlist.tsx</code>  
**Section ID:** <code>#playlist</code> at line 309

### Hide only its decorative frame

Open <code>content/site.ts</code>, line 1640:

~~~ts
showFrame: false,
~~~

Restore <code>true</code> to show the frame.

---

## 21. Snap & Share

**Status:** 🟢 Shown

**Open this file:** <code>components/invitation-page.tsx</code>

**Find line 290:**

~~~tsx
<SnapShare />
~~~

### To hide the complete section

~~~tsx
{/* <SnapShare /> */}
~~~

### To show it again

~~~tsx
<SnapShare />
~~~

**Component file:** <code>components/sections/snap-share.tsx</code>  
**Section ID:** <code>#snap-share</code> at line 604

### Smaller Snap & Share switches

All these settings are in <code>content/site.ts</code>.

#### Favorite Moments card

**Lines:** 1759-1764  
**Current source setting:** <code>show: true</code>  
**Current result:** Hidden because the website is in plain mode

To hide it in every display mode:

~~~ts
show: false,
~~~

To show it, use <code>show: true</code>, set <code>DISPLAY_MODE = "photos"</code>, and provide images.

#### Website QR card

**Lines:** 1766-1773

~~~ts
show: false,
~~~

Change to <code>true</code> to show it.

#### Hashtag card

**Lines:** 1774-1781

~~~ts
show: false,
~~~

Change to <code>true</code> and provide at least one hashtag.

#### Social-sharing card

**Lines:** 1782-1789

~~~ts
show: false,
~~~

Change to <code>true</code> and keep at least one platform.

#### Guest photo-upload card

**Drive-link location:** lines 1749-1750

Hide it by using an empty value:

~~~ts
googleDriveLink: "",
~~~

Show it by adding a valid Drive folder link.

#### Bible verse panel

**Lines:** 1812-1826

~~~ts
show: false,
~~~

Use <code>true</code> and provide both images and quotes.

### Important unused setting

<code>snapShare.puhon.show</code> at <code>content/site.ts:1804</code> currently has no visible effect.

The <code>PuhonClosing</code> component reads it at <code>components/puhon-closing.tsx:126-129</code>, but that component is not added to the invitation page.

---

## 22. See You There

**Status:** 🟢 Shown

**Open this file:** <code>components/invitation-page.tsx</code>

**Find line 292:**

~~~tsx
<SeeYouThere />
~~~

### To hide it

~~~tsx
{/* <SeeYouThere /> */}
~~~

### To show it

~~~tsx
<SeeYouThere />
~~~

**Component file:** <code>components/sections/see-you-there.tsx</code>  
**Section ID:** <code>#see-you-there</code> at line 94

**Also affects:** Its navigation link and the photo closing experience.

---

## 23. Footer

**Status:** 🟢 Shown

**Open this file:** <code>components/invitation-page.tsx</code>

The Footer is at line 298 inside a shared decorative wrapper at lines 294-299.

### To hide the Footer

Comment out the complete wrapper:

~~~tsx
{/*
<div className="relative isolate">
  <PlainBubbles bands={3} />
  <SectionBackdrop />
  {siteConfig.seeYouThere.plain.showFrame && <div className="deco-frame" aria-hidden="true" />}
  <Footer background={false} />
</div>
*/}
~~~

### To show it again

Restore the complete wrapper.

Do not hide only <code>&lt;Footer /&gt;</code>, because its decorative background may leave an empty area.

### Footer switches

Open <code>content/site.ts</code>.

#### Monogram

**Line 1679**

~~~ts
showMonogram: true,
~~~

- <code>false</code> = hide monogram
- <code>true</code> = show monogram

#### Footer information cards

**Line 1681**

~~~ts
showCards: false,
~~~

The card row is currently hidden.

Set it to <code>true</code> to show:

- Venue summary
- RSVP deadline card
- Social links
- Quick links

#### Venue summary

**Line 1685**

~~~ts
show: true,
~~~

This still remains hidden while <code>showCards</code> is false.

#### RSVP card

**Line 1696**

~~~ts
show: true,
~~~

This also needs <code>showCards: true</code>.

#### Social links

**Lines:** 1709-1716

Each social link has its own <code>show</code> setting:

~~~ts
{ show: false, platform: "facebook", href: "..." }
~~~

Use <code>true</code>, a valid link, and <code>showCards: true</code> to display it.

#### Developer credit

**Line 1734**

~~~ts
show: true,
~~~

Set it to <code>false</code> to hide the credit.

---

## 24. Background Music

**Status:** 🟡 Audio is active, but the audio element is visually hidden

The music is added globally. It can continue across different pages.

**Open this file:** <code>components/client-layout.tsx</code>

**Find line 17:**

~~~tsx
<BackgroundMusic />
~~~

### To disable background music

~~~tsx
{/* <BackgroundMusic /> */}
~~~

### To enable it again

~~~tsx
<BackgroundMusic />
~~~

Do not remove:

- <code>AudioProvider</code>
- <code>SiteConfigProvider</code>

The audio element uses <code>display: "none"</code> at <code>components/background-music.tsx:49-60</code>. That only hides the audio controls; it does not stop playback.

---

## 25. Silk Decorative Background

**Status:** 🟢 Enabled unless an environment variable says otherwise

**Control location:** <code>components/invitation-page.tsx:116, 212-234</code>

### To disable it

Set this environment variable:

~~~env
NEXT_PUBLIC_ENABLE_DECOR=false
~~~

### To enable it

Remove the variable or use:

~~~env
NEXT_PUBLIC_ENABLE_DECOR=true
~~~

**Important:** This controls the Silk background only. It does not hide every flower, frame, bubble, or ornament.

---

# B. Decorations and Optional Images

Many decorations can be hidden by replacing their image path with an empty string.

## Example

Shown:

~~~ts
headerOrnament: "/deco/middle-ornament.png",
~~~

Hidden:

~~~ts
headerOrnament: "",
~~~

Common decoration paths are in:

- <code>content/site.ts:353-364</code> — shared decorations
- <code>content/site.ts:489</code> — envelope flowers
- <code>content/site.ts:545-549</code> — Love Story closing text
- <code>content/site.ts:798-803</code> — Timeline corners

Use an empty string only for optional pictures or text. Do not use it to disable a form or data feature.

---

# C. Components That Exist but Are Not Being Used

These files exist, but they are not currently added to the main invitation.

## Accommodation

**Status:** 🔴 Not used

**File:** <code>components/sections/accommodation.tsx</code>

It has no active visibility switch because it is not imported or rendered by <code>InvitationPage</code>.

## Recommended Hotel

**Status:** 🔴 Not used

**File:** <code>components/sections/recommended-hotel.tsx</code>

## Narrative

**Status:** 🔴 Not used

**File:** <code>components/sections/narrative.tsx</code>

## Old RSVP Component

**Status:** 🔴 Not used

**File:** <code>components/sections/rsvp.tsx</code>

The live RSVP uses <code>GuestList</code>. Do not enable the old component without checking its old Google Form.

## Puhon Closing

**Status:** 🔴 Not used

**File:** <code>components/puhon-closing.tsx</code>

Changing its <code>show</code> value will not display it until the component is added to the render tree.

---

# D. Separate Public Pages

Hiding a button or invitation section does not disable these URLs.

## Full Gallery Page

**URL:** <code>/gallery</code>  
**File:** <code>app/gallery/page.tsx:104-197</code>  
**Status:** 🟢 Public

There is no existing route-level visibility switch.

## Table Finder

**URL:** <code>/table</code>  
**File:** <code>app/table/page.tsx:1-5</code>  
**Status:** 🟢 Public

There is no existing route-level visibility switch.

## Proposal Pages

**URL:** <code>/will-you-be-proposal/[roleId]</code>  
**File:** <code>app/will-you-be-proposal/[roleId]/page.tsx:25-34</code>  
**Status:** 🟡 Shown only for a valid role ID

Invalid role IDs call <code>notFound()</code>.

## Dashboard

**URL:** <code>/dashboard</code>  
**File:** <code>app/dashboard/page.tsx</code>  
**Status:** 🟡 Login screen shown until authenticated

There is no route-disable switch.

---

# E. Dashboard Visibility

## 1. Dashboard Login

**Status:** 🟡 Login screen visible until authenticated

**Open this file:** <code>app/dashboard/page.tsx</code>

Important locations:

- Authentication state: line 49
- Saved session check: lines 80-91
- Login-screen condition: lines 442-498
- Main dashboard begins: line 500

The condition is:

~~~tsx
if (!isAuthenticated) {
  return (
    // Login screen
  )
}
~~~

Do not remove this condition just to hide the login screen.

> This is client-side UI protection, not confirmed server-side authorization.

## 2. Dashboard Tabs

Dashboard tabs use <code>activeTab</code> at <code>app/dashboard/page.tsx:56</code>.

To completely hide a tab, you must update three places:

1. Remove its sidebar button.
2. Remove its content block.
3. Remove its Dashboard Overview guide card.

### Dashboard Overview

**Status:** 🟢 Shown first

**Sidebar item:** <code>components/dashboard-sidebar.tsx:78-84</code>  
**Content:** <code>app/dashboard/page.tsx:582-600</code>

If you remove it, change the default <code>activeTab</code> at line 56 to another valid tab.

### Guest List

**Status:** 🟢 Available

**Sidebar item:** <code>components/dashboard-sidebar.tsx:85-91</code>  
**Content:** <code>app/dashboard/page.tsx:602-614</code>  
**Overview guide object:** <code>components/dashboard-overview.tsx:50-60</code>

Comment out all three locations to remove it from the dashboard.

### Join Requests

**Status:** 🟢 Available

**Sidebar item:** <code>components/dashboard-sidebar.tsx:92-98</code>  
**Content:** <code>app/dashboard/page.tsx:616-623</code>  
**Overview guide object:** <code>components/dashboard-overview.tsx:61-71</code>

### Guest Messages

**Status:** 🟢 Available

**Sidebar item:** <code>components/dashboard-sidebar.tsx:99-105</code>  
**Content:** <code>app/dashboard/page.tsx:625-627</code>  
**Overview guide object:** <code>components/dashboard-overview.tsx:72-82</code>

### Entourage and Sponsors

**Status:** 🟢 Available

**Sidebar item:** <code>components/dashboard-sidebar.tsx:106-112</code>  
**Content:** <code>app/dashboard/page.tsx:629-639</code>  
**Overview guide object:** <code>components/dashboard-overview.tsx:83-93</code>

### Proposal Invites

**Status:** 🟢 Available

**Sidebar item:** <code>components/dashboard-sidebar.tsx:113-119</code>  
**Content:** <code>app/dashboard/page.tsx:641</code>  
**Overview guide object:** <code>components/dashboard-overview.tsx:94-104</code>

## Example: Hide Guest Messages From the Dashboard

### Step 1: Hide its sidebar button

Open <code>components/dashboard-sidebar.tsx</code>.

Comment out lines 99-105:

~~~tsx
/*
{
  id: "messages" as const,
  group: "Guests",
  label: "Guest Messages",
  icon: MessageSquare,
  badge: messageCount,
},
*/
~~~

### Step 2: Hide its dashboard content

Open <code>app/dashboard/page.tsx</code>.

Comment out lines 625-627:

~~~tsx
{/*
{activeTab === "messages" && (
  <GuestMessages
    messages={messages}
    onRefresh={fetchMessages}
    isLoading={isMessagesLoading}
  />
)}
*/}
~~~

### Step 3: Remove its Overview guide card

Open <code>components/dashboard-overview.tsx</code>.

Comment out the <code>messages</code> object at lines 72-82.

To show Guest Messages again, restore all three blocks.

## 3. Dashboard Overview Parts

These parts do not have true/false settings.

### RSVP Progress

**Status:** 🟢 Shown  
**File:** <code>components/dashboard-overview.tsx:135-160</code>

Comment out that complete block to hide it.

### Statistics Tiles

**Status:** 🟢 Shown  
**File:** <code>components/dashboard-overview.tsx:162-172</code>

Comment out one <code>StatTile</code> line to hide one tile, or comment out the complete grid.

### Table Finder QR

**Status:** 🟢 Shown  
**File:** <code>components/dashboard-overview.tsx:174</code>

Hide:

~~~tsx
{/* <TableFinderQrCard /> */}
~~~

Show:

~~~tsx
<TableFinderQrCard />
~~~

### Dashboard Guide Cards

**Status:** 🟢 Shown  
**File:** <code>components/dashboard-overview.tsx:176-219</code>

Comment out the complete section to hide all guide cards.

## 4. Dashboard Alerts

Success alert:

- <code>app/dashboard/page.tsx:561-569</code>
- Appears only when <code>successMessage</code> contains text.

Error alert:

- <code>app/dashboard/page.tsx:571-579</code>
- Appears only when <code>error</code> contains text.

These are temporary status messages. Do not hide them permanently with CSS because users need to know whether an action succeeded or failed.

---

# F. Mobile and Desktop Visibility

These components change automatically based on screen width.

## Public Navigation

**File:** <code>components/navbar.tsx:171-215</code>

- Below 1280 px: hamburger menu is shown.
- From 1280 px: desktop links are shown.
- Some wide links appear in the desktop bar only from 1536 px.
- Wide links still appear in the phone menu.

## Gallery

**File:** <code>components/sections/gallery.tsx</code>

- Below 640 px: swipe carousel at line 208.
- From 640 px: photo grid at line 483.
- Mobile lightbox hint is at line 707.

Both versions use the same gallery data.

## See You There

**File:** <code>components/sections/see-you-there.tsx:104-148</code>

- Below 768 px: one cross-fading photo.
- From 768 px: multi-panel photos.
- Mobile slideshow dots are at lines 200-213.

## Wedding Playlist Button

**File:** <code>components/sections/wedding-playlist.tsx</code>

- Mobile button: lines 460-465.
- Larger-screen button: lines 409-414.

## Dashboard Sidebar

**File:** <code>components/dashboard-sidebar.tsx:275-302</code>

- Below 1024 px: slide-in drawer.
- From 1024 px: fixed sidebar.

The mobile menu button is at <code>app/dashboard/page.tsx:518-525</code>.

## Dashboard Lists

Guest List:

- Mobile cards: <code>components/improved-guest-list.tsx:390</code>
- Desktop table: line 454

Join Requests:

- Mobile cards: <code>components/guest-requests.tsx:369</code>
- Desktop table: line 426

Entourage:

- Mobile cards: <code>components/entourage-sponsors.tsx:727</code>
- Desktop table: line 761

Do not delete only the phone or desktop version unless you want that feature unavailable on those devices.

---

# G. Which Visibility Method Should I Use?

## To hide a complete website section

Comment out its component in <code>components/invitation-page.tsx</code>.

~~~tsx
{/* <Countdown /> */}
~~~

## To hide an item that already has a show setting

Change:

~~~ts
show: true,
~~~

to:

~~~ts
show: false,
~~~

## To hide all Attire cards

Use:

~~~ts
show: [],
~~~

## To hide an optional image or decoration

Use an empty path:

~~~ts
headerOrnament: "",
~~~

## To hide a dashboard tab

Remove or comment:

1. Sidebar item
2. Content condition
3. Overview guide object

## Do not use CSS opacity to disable features

Opacity can make something invisible while its:

- Buttons still exist
- Form still works
- Audio still plays
- Network requests still run

Use conditional rendering instead.

---

# H. Recommended Easier System for the Future

The project does not have one central list for hiding complete sections.

A future improvement could add this to <code>content/site.ts</code>:

~~~ts
visibility: {
  showLoader: true,
  showNavbar: true,
  showHero: true,
  showWelcome: true,
  showCoupleVideo: false,
  showLoveStory: true,
  showCountdown: true,
  showGallery: true,
  showMessages: true,
  showDetails: true,
  showTimeline: true,
  showEntourage: true,
  showRSVP: true,
  showBookOfGuests: true,
  showFAQ: true,
  showRegistry: true,
  showPlaylist: true,
  showSnapShare: true,
  showSeeYouThere: true,
  showFooter: true,
  enableBackgroundMusic: true,
}
~~~

The page could then use:

~~~tsx
{siteConfig.visibility.showGallery && <Gallery />}
~~~

This is only a recommendation. It has not been added to the website.

---

# I. Final Checklist

Before saving:

- [ ] Confirm you opened the correct file.
- [ ] Search for the exact component or setting name.
- [ ] Change only the line described in this guide.
- [ ] Keep imports and component files when temporarily hiding a section.
- [ ] Hide shared wrappers when all their child sections are hidden.
- [ ] Check Footer links that may point to hidden sections.
- [ ] Check all invitation routes: <code>/</code>, <code>/inviteone</code>, <code>/invitetwo</code>, and <code>/inviteguest</code>.
- [ ] Check phone, tablet, and desktop layouts.
- [ ] Check that no empty decorative space remains.
- [ ] Remember that hiding a link does not disable a separate public route.
- [ ] Run <code>pnpm lint</code>.
- [ ] Run <code>pnpm exec tsc --noEmit</code>.
- [ ] Run <code>pnpm build</code>.

## Common Mistakes

- <code>showFrame: false</code> hides only a border.
- Plain display mode does not hide the full Hero or Loader.
- Hiding Gallery does not disable <code>/gallery</code>.
- Hiding a dashboard sidebar button does not remove its content.
- Footer child cards remain hidden while <code>showCards</code> is false.
- Snap & Share Moments remains hidden in plain mode.
- <code>snapShare.puhon.show</code> currently does nothing because its component is not mounted.
- The background music player is invisible by design but can still play.
- Animation values named <code>hidden</code> are not feature switches.

