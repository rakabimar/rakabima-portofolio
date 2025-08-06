declare global {
  interface Window {
    restoreWindow?: { [key: string]: () => void }
  }
}

export {}
