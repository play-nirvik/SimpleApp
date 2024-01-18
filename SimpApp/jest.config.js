module.exports = {
  preset: 'react-native',
  setupFiles: [
    '<rootDir>/bin/jest.setup.js',
    './node_modules/react-native-gesture-handler/jestSetup.js',
  ],
  testPathIgnorePatterns: ['/node_modules/'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@microsoft|@react-native|@react-native-async-storage|@react-navigation|@react-native-community|@notifee|react-native-gesture-handler)',
  ],
};
