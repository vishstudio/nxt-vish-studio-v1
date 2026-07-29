# Book Free Call Google Meet Setup

This project is statically exported, so Google Calendar and Google Meet creation must run in trusted backend code. The current website implementation creates a Firestore booking request only; the Google Meet is created manually from `vishstudio.ltd@gmail.com` and the link can be added from Firebase or the client portal. A future Firebase Cloud Function can automate the calendar event, Google Meet link, invite, and booking document update.

## Target Flow

1. Visitor opens `/book-call`.
2. Visitor chooses an available date and 30-minute slot.
3. Visitor enters their name and email.
4. The site writes a `bookings` document with contact details, selected slot data, status, and empty Meet/calendar fields.
5. Current manual path: an admin creates the Google Meet/calendar invite and can update the booking document or client portal record with the link.
6. Future automated path: a Firebase Cloud Function triggers on `bookings/{bookingId}` creation for `status: "pending"` records.
7. The function creates a Google Calendar event as the host account, requests a Google Meet conference, adds the visitor as attendee, sends calendar updates, and updates the Firestore document with `status: "confirmed"`, `calendarEventId`, and `meetLink`.

## Booking Rules

- Public email: `hello@vish.studio`
- Current Google host account: `vishstudio.ltd@gmail.com`
- Timezone: `Indian/Mauritius`
- Duration: book 30-minute slots and display the call as 20-30 minutes
- Morning slots: `09:30`, `10:00`, `10:30`
- Afternoon slots: `13:00`, `13:30`, `14:00`, `14:30`, `15:00`, `15:30`
- Weekend policy: currently shows weekday suggestions; the direct date field can be adjusted if weekend booking should be allowed or blocked strictly.

## Firestore Collection

Collection: `bookings`

```ts
{
  name: string;
  email: string;
  company: string;
  selectedDate: string; // YYYY-MM-DD
  selectedTime: string; // HH:mm
  startAt: Date; // selected slot start, stored as Firestore timestamp
  endAt: Date; // 30 minutes after startAt, stored as Firestore timestamp
  durationMinutes: 30;
  timezone: "Indian/Mauritius";
  status: "pending" | "confirmed" | "cancelled" | "failed";
  source: "vish.studio/book-call";
  hostEmail: "vishstudio.ltd@gmail.com";
  publicEmail: "hello@vish.studio";
  meetLink: string;
  calendarEventId: string;
  notes: string;
  createdAt: serverTimestamp;
  updatedAt: serverTimestamp;
  submittedAt: string; // ISO string from the client
  errorMessage?: string;
}
```

The public Firestore rules should allow only validated `create` operations for website-created `bookings`. Updates that add Google Calendar fields should be performed by the Cloud Function, Firebase console, or client portal admin code through trusted credentials, not by public client code.

## Google Workspace Setup

Use this path if `hello@vish.studio` is a Google Workspace account.

1. In the Google Cloud project connected to Firebase, enable the Google Calendar API.
2. Create a service account for calendar booking automation.
3. Enable domain-wide delegation on the service account.
4. Copy the service account OAuth client ID.
5. In Google Admin Console, open `Security > Access and data control > API Controls > Domain-wide delegation`.
6. Add the service account client ID with this OAuth scope:

```text
https://www.googleapis.com/auth/calendar
```

7. Store the service account credentials as a Firebase Functions secret, not in browser code or committed files.
8. The function should impersonate `hello@vish.studio` when creating the event.

## Non-Workspace OAuth Setup

Use this path if `hello@vish.studio` is a normal Google account.

1. Enable the Google Calendar API in the Firebase-connected Google Cloud project.
2. Create an OAuth client for a local/server authorization flow.
3. Authorize `hello@vish.studio` once with the calendar scope:

```text
https://www.googleapis.com/auth/calendar
```

4. Store the OAuth refresh token and client credentials as Firebase Functions secrets.
5. The function should use the refresh token to create calendar events on the host calendar.

## Calendar Event Requirements

The backend event insert request must:

- Create the event on the host calendar, normally `hello@vish.studio` or `primary` while impersonating that user.
- Set `sendUpdates: "all"` so the visitor receives the invite.
- Set `conferenceDataVersion=1`.
- Include `conferenceData.createRequest` with `conferenceSolutionKey.type: "hangoutsMeet"` and a unique `requestId`.
- Include attendees for both the host and visitor when appropriate.

## Required Confirmation Before Automation

1. Whether the final host account should remain `vishstudio.ltd@gmail.com`.
2. Whether the existing client portal already has a Firebase Function for calendar event or Google Meet creation.
3. Whether confirmed bookings should also be mirrored into the client portal `calendar` collection after the Meet link is created.
4. Whether bookings should strictly block weekends in both the suggested dates and manual date input.
