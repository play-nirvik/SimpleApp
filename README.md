# Simple Application

This repository contains cross-platform applications which allows the user to create a profile and login. It also has localization and notification features.

It uses **React Native**, **React JS** and **Node JS** as the primary tech stack to acheive all the functionality.

## 📋 Contents

- [Getting Started](#start)
- [Running Apps](#app)
- [Application](#dev)
- [Troubleshoot](#trouble)

## <a name="start">🏁 Getting Started</a>

### General Information

This Github repository contains 3 applications:

1. **React JS** Web application - `simp-web`
2. **React Native** Mobile application - `SimpApp`
3. **Node JS** mock backend server for authentication - `SimpApp/server`

### Features

- User Registration/Sign up
- User Login/Sign in
- Native/Web Push notifications
- Localization support
- Secured data storage
- Theming based on logged in user country

### Prerequisites

- **Node** Version 18+
- **Yarn** should be installed globally
- **Java** version 17+
- **React Native** app targets iOS 11.0 and Android 5.0 (API 21) or newer. You may use Windows, macOS, or Linux as your development operating system, though building and running iOS apps is limited to macOS.

**Note:** Running the app in Android is recommended as it is tested widely.

## <a name="app">⏯️ Running App</a>

**Setup dependencies for Web App**

```bash
cd simp-web
yarn
```

**Setup dependencies for Mobile App**

```bash
cd SimpApp
yarn
```

**Setup dependencies for Node Backend**

Rename `.env.example` to `.env` located inside the `SimpApp` folder

```bash
cd SimpApp/server
yarn
```

**Run Mock Node server**

```bash
cd SimpApp
yarn server:start
```

Server should start running at `localhost:5000`

**Run Mobile application**

```bash
cd SimpApp
yarn start
yarn android
```

Mobile app should run at emulator or device which is connected.

**Run Web application**

```bash
cd simp-web
yarn dev
```

Web Application should start running at `localhost:5173`

**Note: All of the above instructions is based on the assumption that you are in the root project directory**

## <a name="dev">🧑‍💻 Application</a>

### File Structure

```
|
├── simp-web/
├── README.md/
├── SimpApp/
│   ├── server/
├── .gitignore
│
```

### Translations

- Translation files are managed in `./src/i18n/translations/*.json`.
- Always import texts from translation files using `t('path.to.string')`.
- English is being set as the default language.

### Push/Web Notifications

Push and Web notifications have been implemented in the application using Firebase. There is no need of configuring any credentials for this because the functionality is mocked via the backend NodeJS server.

**Testing Notification from App**

1. Create an user account
2. Login using the correct credentials
3. On the home page for both Web and Mobile app, you will find a button to Test Push Notifications.
4. Clicking on this button will invoke a Backend API call and it will display a predefined notification.

**Testing background Notification**

1. Run Postman/HTTP Client
2. Make a `GET` HTTP call to `localhost:5000/sendpush`
3. If `Push message triggered` is returned as the response, it means the notification was triggered from the Backend API
4. You should see the notification on all the registered devices. (Note: The API triggers a broadcast message to all users.)

## <a name="trouble">🔎 Troubleshoot</a>

There maybe some edge case sceanarios where the application may not behave as expected. **THIS IS NOT A PRODUCTION READY APPLICATION**.

If you are getting some trouble related to logging in to the application, this maybe because of the `datastore.json` file being corrupted. This file is used as a temporary datastore to store user credentials and mocks a DB.

1. Locate the file `SimpApp/datastore.json`
2. Either delete its content OR replace content with `[]`
3. Restart the node server using `yarn start:server`
