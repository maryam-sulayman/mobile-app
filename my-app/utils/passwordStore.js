import * as SecureStore from 'expo-secure-store';

export const saveAdminPassword = async (password) => {
  try {
    await SecureStore.setItemAsync('adminPassword', password);
    console.log('Admin password saved securely.');
  } catch (error) {
    console.error('Error saving admin password:', error);
  }
};
export const getAdminPassword = async () => {
    try {
      const password = await SecureStore.getItemAsync('adminPassword');
      if (!password) {
        throw new Error('Admin password not found in secure storage.');
      }
      return password;
    } catch (error) {
      console.error('Error retrieving admin password:', error);
      throw error;
    }
  };
  