


const addToLocalStorage = (key:string , value:any ):void => {
  window.localStorage.setItem(key, JSON.stringify(value))
}


const removeFromLocalStorage = (key:string):void => {
  window.localStorage.removeItem(key)
}


const getFromLocalStorage  = (key:string) => {
  const item  = JSON.stringify(window.localStorage.getItem(key))
  return item
}


export { 
  getFromLocalStorage,
  addToLocalStorage,
  removeFromLocalStorage
}