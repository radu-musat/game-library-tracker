# Game Library Tracker

> **Work in progress (WIP)** — This project is still being developed. Features and implementation details may change.

A small purchase tracker that started as a way to keep track of video game purchases. It can also be used to record other types of purchases.

## Features

- Create, edit, and delete purchase records.
- Add multiple items to a single purchase record.
- Browse purchases in a timeline grouped by date.
- Enter platforms or categories as free text.
- Track a monthly budget and spending.
- Export records and budget data to a JSON backup.
- Import data from a JSON backup.
- Persist data locally in the browser using Local Storage.

## Tech stack

- Vue 3
- TypeScript
- Vite
- Vue Router
- Pinia
- Tailwind CSS
- daisyUI
- vee-validate and Yup
- Lucide icons

## Getting started

Install dependencies:

```sh
pnpm install

Start the development server:
pnpm dev


Build the project:
pnpm build


Preview the production build:
pnpm preview


Project status
The application currently stores its data in the browser's Local Storage. JSON import and export are available for backing up and restoring records.

Supabase integration is a work in progress. Cloud persistence and backend functionality are not yet part of the current application.

Because data is stored locally, clearing the browser's Local Storage will remove the locally saved records. Export a JSON backup regularly if you want to keep a separate copy of your data.
