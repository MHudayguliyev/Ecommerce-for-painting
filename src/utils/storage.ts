export const getFromStorage = () => {
    if(localStorage.getItem('storage') !== null)
        return JSON.parse(localStorage.getItem('storage')!)
    else return {
        
    }
}