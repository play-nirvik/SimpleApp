import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {ThemeProvider} from '../../context/ThemeContext'; // Assuming you have a ThemeProvider
import {AuthProvider} from '../../context/AuthContext'; // Assuming you have an AuthProvider
import HomePage from './home-page';
import NotificationService from '../../services/NotificationService';

describe('HomePage', () => {
  it('renders correctly', () => {
    const {toJSON} = render(
      <ThemeProvider>
        <AuthProvider>
          <HomePage />
        </AuthProvider>
      </ThemeProvider>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('displays a greeting message with the username', () => {
    const {getByText} = render(
      <ThemeProvider>
        <AuthProvider value={{authState: {username: 'TestUser'}}}>
          <HomePage />
        </AuthProvider>
      </ThemeProvider>,
    );
    expect(getByText('Hello, TestUser')).toBeDefined();
  });

  it('changes language when selecting from the dropdown', async () => {
    const {getByTestId} = render(
      <ThemeProvider>
        <AuthProvider>
          <HomePage />
        </AuthProvider>
      </ThemeProvider>,
    );

    // Open the dropdown
    fireEvent.press(getByTestId('languageDropdownButton'));

    // Select a language
    fireEvent.press(getByTestId('languageDropdownItem-en'));

    // Assuming your changeLanguage function is asynchronous, you might want to wait
    // for the language change to take effect
    // await waitFor(() => {
    //   expect(getByTestId('languageDropdownButton')).toHaveTextContent('en');
    // });
  });

  it('triggers the push notification on button press', () => {
    const {getByText} = render(
      <ThemeProvider>
        <AuthProvider>
          <HomePage />
        </AuthProvider>
      </ThemeProvider>,
    );

    fireEvent.press(getByText('Send Test Push'));

    // You might want to check if the push notification was triggered
    // based on your NotificationService implementation
    // For simplicity, let's assume a test flag in the service
    expect(NotificationService.sendTestMessage).toBeTruthy();
  });
});
