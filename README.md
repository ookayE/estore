Working with layout
Creating constants: /lib/constants/index.ts.
Check public app name from .env first - if not, default to what's written
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'EStore'

Using a constants file to house reusable code throughout application -- define sensitive variables in .env file, create variables in constants file reference .env file, then import those constant variables throughout app.

ex.
.env:
APP_NAME=my app

@lib/constants/index.ts:
export const APP_NAME = process.env.APP_NAME
