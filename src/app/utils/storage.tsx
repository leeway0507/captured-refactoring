export const saveToLocal = (name: string, obj: Object | undefined) =>
    obj && localStorage.setItem(name, JSON.stringify(obj))

export const loadFromLocal = <T,>(name: string): T | undefined => {
    const data = localStorage.getItem(name)
    return data ? JSON.parse(data) : undefined
}
