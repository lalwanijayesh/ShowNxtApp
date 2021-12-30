# ShowNxtApp

ShowNxt is a video sharing social media app turning passion into opportunity, bridging the gaps in college sports recruiting. The application follows a 3-tier architecture - Frontend, Backend and Database. This repository contains the frontend code of this cross-platform mobile app.

## Technologies

- React Native for building user interfaces and component-based layouts
- Expo to build, deploy and quickly iterate on the mobile app
- Interacts with Firebase for user authentication and cloud storage/retrieval
- Acts as Apollo Client to make GraphQL calls to backend

## Features

1. Login and Registration for Athlete/Coach
2. Dynamically rendered dropdowns for schools, sports and positions
3. Athlete - create profiles, search for schools, apply to openings
4. Coach - post openings, view athlete profiles, evaluate application

## Components

- The fronted repository is split into multiple screens and the root of the application is *App.js.*
- *App.js* bootstraps the app as an apollo client, using the server URL provided through the *.env* file lying in the source directory. It also creates a navigation stack with all the screens and corresponding React components.
- *src/constants* contains dedicated files for any constant string or numeric literals used application-wide as a best practice.
- src/firebase contains the firebase app configuration and is required to be changed as per the development or production enviornment.
- *src/AppContext.js* sets up the application context which ideally contains logged-in user details and other session properties.
- *src/screens* has the *Welcome.js* screen which is the starting point of the application to either Login or Register. Register takes you to *AthleteCoachSelection.js* asking for type of user and linking to the respective registration flow. And Login asks for email/password to find out the user type and redirect to respective homepage.
- The rest of the screens are divided into 4 categories - Athlete Registration, Coach Registration, Athlete Application and Coach Evaluation

## How to run

- Install Node.js ([https://nodejs.org/en/](https://nodejs.org/en/)). Recommended is Version 14 LTS.
- Next we will setup our workspace by cloning using the [ShowNxtApp](https://github.com/lalwanijayesh/ShowNxtApp) repository on GitHub. This assumes that you have Git configured in your system. If not, please follow instructions in [this guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) depending upon your operating system. If you do not have access to the repository, you can unzip the source code file provided to you.

```bash
git clone https://github.com/lalwanijayesh/ShowNxtApp.git
```

- Since we already installed Node, we must able to use *npm* (Node Package Manager). Run the following Terminal command in project directory to install Expo CLI and other dependencies.

```bash
npm install
```

- Finally, run the below command to start the development server.

```bash
npm start
```

- You should now see the Expo client with options to run your app in multiple ways like in the web browser or on your device or using a simulator. Expo has some great [documentation](https://docs.expo.dev/guides/) that you must check out.

- In order to interact with firebase and database, we need to change *.env* and *firebase.js* files with specific properties. Once the backend server is up and running, use that IP address and server port in the .*env* file. For Firebase, create or use an existing account from [Firebase Console](https://console.firebase.google.com/) and make sure to enable auth with sign-in method as email/password. Also enable storage option in Firebase account.
