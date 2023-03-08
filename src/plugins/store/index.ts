export interface Store {
  theme: string
  plugins: (
    | null
    | {}
  )[]
  datasources: (
    | null
    | {
      me: string[]
    }
  )[]
}

const defaultStore: Store = {
  theme: 'light',
  plugins: [],
  datasources: []
}

export function getData(key: string): Store {
  const o = JSON.parse(localStorage.getItem(key) ?? '{}')
  return Object.assign(o, defaultStore)
}

export function setData(key: string, s: Store) {
  localStorage.setItem(key, JSON.stringify(s))
}
