class LocalStorageService {
  getItem<T>(key: string): T | undefined {
    try {
      const serializedValue = localStorage.getItem(key);
      return serializedValue ? JSON.parse(serializedValue) : undefined;
    } catch (error) {
      throw error;
    }
  }

  setItem(key: string, value: any): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      throw error;
    }
  }

  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      throw error;
    }
  }
}

export const localStorageService = new LocalStorageService();
