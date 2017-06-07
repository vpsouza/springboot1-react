# SpringBoot1-React Frontend App

## Prerequisities

1 - NodeJS: sudo apt-get install nodejs
2 - npm: sudo apt-get install npm
3 - A local instance of the xy-inc nodejs backend service running on your machine

## Running the frontend app

### `npm start`

Runs the app in the development mode.<br>
Automaically Open your browser at the following url: [http://localhost:3000](http://localhost:3000).

## Running the tests

### `npm test`

Launches the test runner in the interactive watch mode.

## Preparing for deployment

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `npm run firebase-init`

Authenticate to your Firebase Account and choose Hosting option pointing to your app and the firebase-cli will be ready to deploy your app to the web.<br>

Don' forget to choose "Single Page Application" option to true and don't let the firebase-cli override your index.html at ./build folder.<br>

### `npm run deploy`

Firebase will do the magic for you and will upload your app and will give a fresh url to access when the deployment process finish.
