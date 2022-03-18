# Tenancy App POC

The app is live and demoable at [fly.io](https://crimson-voice-4148.fly.dev/).

## Development

For first time set up, run `npm install`
then `npx prisma db push` and finally `node --require esbuild-register prisma/seed.ts`. This will set up the database (
read more about that in the Remix section).

To start the app in development mode, type in the terminal:

```
npm run dev
```

The app should be available at http://192.168.0.14:3000 or similar. It rebuilds assets on file changes and has
hot-module replacement, no reloads are necessary.

## Decisions & Trade-offs

* There's no "save" buttons in the app, all data updates are immediately persisted when leaving an input. This saves a
  click & makes sure the user don't lose unsaved data, but could be potentially be confusing and is more taxing on the
  server. Would also be best paired with robust roll-back functionality in case of accidental changes. Likewise, when
  creating a new Tenancy, it is persisted immediately, with empty, erroneous data, which isn't ideal.

The app has generally been built and architected as the proof-of-concept it is, rather than an enterprise app. There are
certainly parts of it that won't scale:

* The app consist essentially of just one page, where one both views tenancies and edits them. This should eventually be
  split into multiple pages, a datatable and an editable tenancy, as the amount of data and tenancy fields increases.

## Possible Future Work

* Pagination
* Tenancy datatable
* Error Handling & error boundaries
* Autocomplete address search
* Optimistic UI (aka changes in the back-end to data success, rollback if it doesn't)
* Loaders
* Prettier UI, more harmonious colors, etc
* Input validation, size should be a number, etc.

-  [ ] Display a Google "street view" photo for each address in the list

- [x] Make it possible to add additional metadata per address (e.g. size, rooms, utilities, tenant information, etc.)

-  [x] Store and retrieve application data somehow

-  [ ] Add support for multiple languages (localization)

-  [ ] Make it possible to sort/filter tenancies

## Tooling

I've tried to isolate the most vanilla-ish React code within Portfolio.tsx and TenancyDetails.tsx, ignore most the rest
of the project if you're not interested in plumping related to the ones below.

### Remix

A very new, but promising React/Node framework. As a fullstack framework it's somewhat overkill for a front-end project,
but having recently worked with it, it allowed me a quick, quick persistence layer and deployment template by following
the [Jokes app example](https://remix.run/docs/en/v1.3.0-pre.1/tutorials/jokes). It does a bit of plumbing and weird
files to the project, but I've tried to isolate most of the most vanilla-ish React code within Portfolio.tsx, stick to
that if you're not interested in remix workings. Plus, experimenting with bleeding-edge tech is fun.

### Prisma

Node ORM, and recommended by the Remix people. Again a bit out of scope for front-end, but took very little effort and
enables persistence. Notably it generates types for the tenancies

### NextUI

Not to be confused with NEXT.js, the React Server Side Rendering framework, which Remix already handles. NextUI is a
component library, and is used as quick way to give the app a bit of UI razzle dazzle without spending a ton of time on
it. Plus, experimenting with bleeding-edge tech is fun. NextUI was specifically chosen because it supports CSS-in-JS. I
might have regretted this choice when I noticed they didn't have an autocomplete or table component.