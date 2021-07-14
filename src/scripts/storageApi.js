export function getStorage(key){
    if(localStorage.getItem(key) !== null) {
        return JSON.parse(localStorage.getItem(key))
    } return []
}

export function setStorage(key, data){
    localStorage.setItem(key, JSON.stringify(data))
}