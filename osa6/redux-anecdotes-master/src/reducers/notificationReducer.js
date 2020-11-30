
const notificationReducer = (state = [], action) => {
    switch (action.type) {
        case "DISPLAY":
           
            return action.message
        case "HIDE":
            return []
        default:
            return state

    }
}
export const hideNotification = ()=>{
    return {
        type : 'HIDE'
    }
}
export const displayNotificaton = (message)=>{
    return{
        
        type: 'DISPLAY',
        message
    }
}

export default notificationReducer