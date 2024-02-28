class LocalStorageService {
  getItem<T>(key: string): T | undefined {
    const serializedValue = localStorage.getItem(key);
    return serializedValue ? JSON.parse(serializedValue) : undefined;
  }

  setItem(key: string, value: unknown): void {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}

export const localStorageService = new LocalStorageService();
