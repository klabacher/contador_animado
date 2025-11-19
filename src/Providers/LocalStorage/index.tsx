// Logic for messing around with local storage for persistence
class LocalStorageProvider {
  static setItem(key: string, value: string) {
    localStorage.setItem(key, value)
  }

  static getItem(key: string): string | null {
    return localStorage.getItem(key)
  }

  static removeItem(key: string) {
    localStorage.removeItem(key)
  }

  static clear() {
    localStorage.clear()
  }
}

export default LocalStorageProvider
export { LocalStorageProvider }
