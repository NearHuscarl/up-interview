> ⚠️ This repo is automatically generated and is readonly. Please do not create a PR for this.

<!-- https://github.com/restuwahyu13/express-rest-api-clean-architecture?tab=readme-ov-file#controllers
https://github.com/alan2207/bulletproof-react/blob/master/docs/api-layer.md -->

# Weather forecast

To perform well in this interview, please read this document carefully before diving into the source code.

## Interview Process

- The candidate will spend the first 20 minutes reviewing the codebase independently to identify potential issues or
  areas for improvement.
- During this time, external resources (e.g. Google...) might be used.
  - Note: Large Language Models (e.g., ChatGPT, Claude...) are not allowed.
- After the first 20 minutes, we'll discuss your assessment and suggested improvements. You are not allowed to use any
  external resources from this point onward.
- The codebase is intentionally larger than what's needed for this interview. To help focus your review, please ignore
  the following:
  - Styling or CSS-related concerns:
    - `libs/shared/ui-base/*`: Auto-generated UI components. Do not edit directly.
    - `apps/weather-forecast-web/features/**/components`: Stateless Tailwind UI components for a specific feature.
    - Global styles, tailwind.config.js, postcss.config.js
  - NX Monorepo Wiring: project.json, nx.json - internal configuration.
  - Project Configuration: ESLint, tsconfig, Prettier, etc.

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
  - Available on `localhost:4200`. See the [application flow](#application-flow) for more details.
- `weather-forecast-api`: ExpressJS backend to serve the APIs for the `weather-forecast-web`.
  - Visit `localhost:3000/docs` to explore and interact with the available endpoints via the OpenAPI documentation.

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

## Application Flow

### Services

```
[openmeteo service] -> [weather-forecast-api] -> [weather-forecast-web]
```

<!-- Bookmarked locations:

```
[openmeteo service] --\
[weather-forecast-db] -> [weather-forecast-api] -> [weather-forecast-web]
``` -->

## Mark Close
