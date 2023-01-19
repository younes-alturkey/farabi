import * as API from 'app/api'
import * as TYPES from 'app/types'

export function setLocalStorage(vals: TYPES.LocalStorage): Promise<void> {
    return new Promise(resolve => {
        chrome.storage.local.set(vals, () => {
            resolve()
        })
    })
}

export function getLocalStorage(key): Promise<any> {
    const keys: TYPES.LocalStorageKeys[] = [key]
    return new Promise(resolve => {
        chrome.storage.local.get(keys, (res: TYPES.LocalStorage) => {
            resolve(res[key] ?? null)
        })
    })
}

export function setStoredOptions(
    options: TYPES.LocalStorageOptions
): Promise<void> {
    const vals: TYPES.LocalStorage = {
        options,
    }
    return new Promise(resolve => {
        chrome.storage.local.set(vals, () => {
            resolve()
        })
    })
}

export function getStoredOptions(): Promise<TYPES.LocalStorageOptions> {
    const keys: TYPES.LocalStorageKeys[] = ['options']
    return new Promise(resolve => {
        chrome.storage.local.get(keys, (res: TYPES.LocalStorage) => {
            resolve(res.options)
        })
    })
}
