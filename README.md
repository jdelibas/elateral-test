### Contacts


#### Getting Started

Yarn:
```
yarn install
yarn start
```

Docker:

```
docker-compose up
```

#### Documentation

```
localhost:8080/documentation
```

#### Scripts

`npm run start`
Start the server

`npm run lint`
Run linter (standardjs)

`npm run lint:fix`
Run linter and fix (standardjs)

`npm run test`
Run unit tests

`npm run coverage`
Run coverage report

`npm run watch:start`
Run start in watch mode, restart on changes

`npm run watch:test`
Run watch in watch mode, restart on changes

`npm run watch:coverage`
Run coverage watch mode, restart on changes


#### Docker file
Based on alpine image (note docker image size)
Install yarn and and dependencies

#### Api Notes
Very basic contact schmea assumed.
Phone number and profile info
Can enter non unique numbers (duplicates)
When updating full info is required again (no PATCH updates)

#### Tests
Mostly covered unit tests (time)
Ava and Nyc used