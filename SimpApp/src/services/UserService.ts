import EncryptedStorage from 'react-native-encrypted-storage';

/**
 * Stores user information
 * @param {UserInfo} data - The user information to be stored.
 * @returns {Promise<void>} A Promise that resolves when the user information is successfully stored.
 * @throws {Error} If there is an issue storing the user information.
 */
const storeUserInfo = async (data: UserInfo): Promise<void> => {
  try {
    await EncryptedStorage.setItem('user_session', JSON.stringify(data));
  } catch (error) {
    console.error('storeUserInfo error: ', error);
  }
};

/**
 * Retrieves user information
 * @returns {Promise<UserInfo | undefined>} A Promise that resolves with the user information if available, or null if not found.
 * @throws {Error} If there is an issue retrieving the user information.
 */
const retrieveUserInfo = async (): Promise<UserInfo | undefined> => {
  try {
    const userInfo: string | null = await EncryptedStorage.getItem(
      'user_session',
    );

    if (userInfo !== undefined) {
      return userInfo ? JSON.parse(userInfo) : undefined;
    }

    return undefined;
  } catch (error) {
    console.error('retrieveUserInfo error: ', error);
  }
};

/**
 * Removes stored user information
 * @returns {Promise<void>} A Promise that resolves when the user information is successfully removed.
 * @throws {Error} If there is an issue removing the user information.
 */
const removeUserInfo = async (): Promise<void> => {
  try {
    await EncryptedStorage.removeItem('user_session');
  } catch (error) {
    console.error('removeUserInfo error: ', error);
  }
};

/**
 * UserService provides methods for storing, retrieving, and removing user information securely.
 * @property {Function} set - Stores user information
 * @property {Function} get - Retrieves user information
 * @property {Function} delete - Removes stored user information
 */
const UserService = {
  set: storeUserInfo,
  get: retrieveUserInfo,
  delete: removeUserInfo,
};

export default UserService;
