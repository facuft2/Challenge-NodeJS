# NodeJS Challenge API

This is a Node.js API project for the challenge.

## Requirements

[Node.js](https://nodejs.org/) (16.20.0 or higher) and [npm](https://www.npmjs.com/) are required.

## Installation

1. Clone the repository:

   ```sh
   git clone git@github.com:facuft2/Challenge-NodeJS.git
   ```

2. Install dependencies:

   ```sh
    npm install
   ```

3. Modify the .env.example file with the corresponding values and rename it to .env

## Environment Configuration

The following environment variables are required for the application to function properly:

- `PORT`: The port number on which the server will run. Choose an available port number for your development environment.
- `SECRET_KEY`: A secret key used for encrypting JWT tokens. It should be a strong and unique string.
- `API_TMDB_KEY`: An API key for accessing The Movie Database (TMDB) API. You can obtain this key by signing up on the TMDB website.

## Running the app

```bash
# development
$ npm run dev

# production mode
$ npm run start
```

## Test

```bash
# unit tests
$ npm run test
```

## API Documentation

The documentation for the API endpoints can be found in the Postman collection located in the `postman` folder of this repository. The collection provides detailed information about each endpoint, including the request format, parameters, and example responses.

To access the API documentation:

1. Open Postman.
2. Import the collection file from the `postman` folder in this repository.
3. The collection contains detailed descriptions and examples for each endpoint, allowing you to understand how to interact with the API effectively.

Please refer to the Postman collection for comprehensive API documentation and usage examples.




