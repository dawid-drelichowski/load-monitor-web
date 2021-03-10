# Load Monitor Web

Web application for an average CPU load monitoring, developed in [Angular](https://angular.io/).  
Demo version available on [http://server937162.nazwa.pl/](http://server937162.nazwa.pl/).  
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version `11.2.1`.

## Requirements

- [Node.js](https://nodejs.org) (tested with version `14.15.5`) or [Deno](https://deno.land/)
- [NPM](https://www.npmjs.com/) (tested with version `7.6.0`) or [Yarn](https://yarnpkg.com/), [PNPM](https://pnpm.js.org/)
- [Load monitor WebSocket server](https://github.com/dawid-drelichowski/load-monitor-socket) running

## Installation

Installation is needed for development or unit tests running. If you would like to run production package, skip this section.
Run following commands in project directory:

```commandline
npm i -g @angular/cli
npm i
```

## Configuration

Configuration options can be found in [src/environments/environment/environment.ts](src/environments/environment.ts) (for dev environment) or [src/environments/environment/environment.prod.ts](src/environments/environment.prod.ts) for production.
Options are described in comments in dev environment config file.

## Run production version

The production package is included in the [dist/](dist) directory.
You can simply serve it with (-p option sets port):

```commandline
npx http-server dist/ -p 8081
```

More server configuration options can be found [here](https://www.npmjs.com/package/http-server#available-options).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the [dist/](dist) directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Jest](https://jestjs.io/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
To get help with not Angular related topics - contact me or create an issue.

## Improvements

This is a very basic implementation of monitor, it should be improved a bit.
What is missing?

- [ ] Better error handling
- [ ] Re-connection to server in case of disconnection 
- [ ] Design improvements, responsiveness
- [ ] Implementation of missing unit tests
- [ ] E2E tests
- [ ] Security audit or audit tool(s) usage
- [ ] Migration to [ESLint](https://eslint.org/)
- [ ] Addition of [Prettier](https://prettier.io/)
- [ ] Git hooks for linting, formatting, etc.

