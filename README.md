# iotinabox-nodejs-react-example-app
This example app presents all the companies, locations, and sensors associated with an IoTinABox account.

API Credentials
===============
This example code requires Client API credentials in order to work.
Please solicit these credentials by sending an email to [support@iotinabox.com](mailto:support@iotinabox.com)


Requirements:
=============
* A web browser such as [Google Chrome](https://www.google.com/chrome/) or [Firefox](https://www.mozilla.org/en-US/firefox/new/)
* [Node.js 10.16.0](https://nodejs.org/en/download/) or newer

Installation:
=============
This app can be installed with git:

    git clone git@github.com:myDevicesIoT/iotinabox-react-example-app.git

Required node modules can be installed by running the following command in the repository folder:

    npm install

Setup:
=============
Obtain your IoTInABox credentials (ClientID and Client Secret) from your account.

Input your client ID and client Secret in the secrets.json under the example-next folder.

To run the example app, cd to this repository in a terminal and run the command:

    npm run dev

After running the script, open a web browser and go to

    localhost:3000

It will prompt you to a login page. Click login and sign in using your IoTInABox credentials.

After signing in, you will be able to navigate through your companies, their locations, and the different sensors within those locations.
