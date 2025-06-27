> ⚠️ This repo is automatically generated and is readonly. Please do not create a PR for this.

# Weather forecast

<!-- https://github.com/restuwahyu13/express-rest-api-clean-architecture?tab=readme-ov-file#controllers
https://github.com/alan2207/bulletproof-react/blob/master/docs/api-layer.md -->

## Getting Started

With docker:

```bash
# start dev servers for development in a container
node docker/run-docker.mjs
```

Without docker:

```bash
# install dependencies
yarn
# start dev servers for development
yarn start
```

## Testing

```bash
nx run weather-forecast-web:test
```

## Projects

- `weather-forecast-web`: Web application for weather forecast in React
- `weather-forecast-api`: ExpressJS backend to serve the APIs for the `weather-forecast-web`.

## Business rules

- User can enter a place to view the weather forecast
- In development environment, when searching for locations
  - Enter the `error` to get a simulated error state in the web app.
  - Enter the `error-express` to get a 500 error on the server.
- Forecast detail page, show the forecast of the location based on longitude and latitude.
  - Forecast start from today and last at most 16 days ([API limitation](https://open-meteo.com/en/docs))
    - Note: Number of day to forecast is not implemented
  - Display hourly temperature for the next 5 days.
  - Display daily average rain & shower forecast for the next 5 days.

## Diagram

Weather forecast:

```
[openmeteo service] -> [weather-forecast-api] -> [weather-forecast-web]
```

<!-- Bookmarked locations:

```
[openmeteo service] --\
[weather-forecast-db] -> [weather-forecast-api] -> [weather-forecast-web]
``` -->

## Interview notes

There are a lot of code to cover in this interview. Things are not really important so candidates don't waste time on:

- Styling, responsiveness, anything related to CSS is not important
  - `libs/shared/ui-base/*`: These UI components are automatically generated, do not edit them directly.
  - `apps/weather-forecast-web/features/**/components`: Stateless tailwind components for a particular feature.
  - Global styles, tailwind.config.js, postcss.config.js
- NX: How the project is wired up in a monorepo using `project.json` and `nx.json`.
- Configurations: eslint, tsconfig, prettierrc...

## Mark Close
