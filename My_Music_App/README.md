# MyMusicApp Overview

Welcome to my music platform powered by Angular. This app seamlessly integrates with the Spotify API to bring you the latest album releases, preview tracks, and explore artists' discography. Additionally, you can save your favorites and conveniently access them on the favorites page.

## Installation and Development server

Run `npm install` to download all necessary packages.

## Development server

You need three environment variables in the .env file.

1. Your user authorization Node API. See https://github.com/DolmaBhuti/AuthUser_API

- Your API needs to have a MongoDB database connected, as well as a Redis server and JWT secrets.

2. Your Spotify Web App's ClientID.
3. Your Spotify Web App's ClientSecret.

   Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Technologies Used

1. @ng-bootstrap/ng-bootstrap ^16.0.0-rc.2
2. bootstrap ^5.3.2
3. bootstrap-icons ^1.11.1

## API Documentation ():

Spotify API:

1.  Follow the tutorial on https://developer.spotify.com/documentation/web-api/tutorials/getting-started to get set up.
2.  Grab The client secret and client id and fill them in the .env file as stated above.
3.  Code to get the access token is in the file named "spotify-token.service.ts"
4.  All other code uses this access token for requests.
    Here are some useful endpoints:

- `https://api.spotify.com/v1/browse/new-releases`
- `https://api.spotify.com/v1/artists/${artistId}`
- `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single&limit=50`
- `https://api.spotify.com/v1/albums/${albumId}`
- `https://api.spotify.com/v1/search?q=${searchString}&type=artist&limit=50`

User Authorization API:

1.  Add, Get Remove your favourite tracks

- PUT(Add one): `${this.userAPIBase}/favourites/:id`
- GET(Get all): `${this.userAPIBase}/favourites`
- DELETE(Remove one): `${this.userAPIBase}/favourites/:id`

2. login

- POST(`${this.userAPIBase}/login`)

3. Register

- POST(`${this.userAPIBase}/register`)

4. logout

- Send in refresh token as body. Just call it with httpClient.delete() method.
- DELETE(`${this.userAPIBase}/logout`)

5. Refresh Token route

- Send in refresh token as body
- POST(`${this.userAPIBase}/refresh-token`)

## Features

1. Register user
2. Login
3. Browse newly released albums.
4. Search artists
5. View artist's discography.
6. Favourite a track from an album. (Also, remove a track)
7. View album information and tracks

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
