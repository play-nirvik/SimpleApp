# Simple App - React Native

## 📋 Contents

- [Getting Started](#start)
- [Running Apps](#app)
- [Development](#dev)

## <a name="start">🏁 Getting Started</a>

### Prerequisites

React Native apps may target iOS 11.0 and Android 5.0 (API 21) or newer. You may use Windows, macOS, or Linux as your development operating system, though building and running iOS apps is limited to macOS.

To work with React Native, you will need to have an understanding of JavaScript fundamentals. Typescript is used to assure code quality and support developers while writing code.

**Are you an Apple user?** The following script will check and install the tools when needed.

```bash
./bin/setup
```

**Note:** Running the app in Android is recommended as it is tested widely.

## <a name="app">⏯️ Running App</a>

Setup dependencies

```bash
yarn
```

Run Mock Node server

```bash
yarn server:start
```

Run application

```bash
yarn ios
yarn android
```

## <a name="dev">🧑‍💻 Development</a>

### File Structure

components holds our React components
contests holds our custom React Contexts
services holds stateful business logic services
i18n holds localization details

```
.
├── ios/
├── android/
├── bin/
├── src/
│   ├── config/
│   ├── contexts/
│   ├── i18n/
│   ├── components/
│   │   ├── common/
│   │   ├── Login/
│   │   └── Register/
│   ├── services/
│   ├── utils
├── package.json
├── README.md
├── ...
│
```

### Translations

- Translation files are managed in `./src/i18n/translations/*.json`.
- Always import texts from translation files using `t('path.to.string')`.
- English is being set as the default language.
