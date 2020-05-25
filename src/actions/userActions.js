export const toggleAddToGroup = () => {
    return {
        type: "TOGGLE_ADD_TO_GROUP"
    }
}

export const addToGroup = (usrname, contact) => {
    return {
        type: "ADD_TO_GROUP",
        payload: usrname,
        contact: contact
    }
}

export const createChat = (new_chat) => {
    return {
        type: "CREATE_CHAT",
        payload: new_chat
    }
}

export const sendMessage = (group_name, new_msg) => {
    return {
        type: "SEND_MESSAGE",
        payload: {
            group_name,
            new_msg
        }
    }
}

export const loginUser = (user) => {
    return {
        type: "LOGIN_USER",
        payload: user
    }
}

export const logoutUser = () => {
    return {
        type: "LOGOUT_USER"
    }
}

export const joinGroup = (group_name, new_member) => {
    return {
        type: "JOIN_GROUP",
        payload: {
            group_name,
            new_member
        }
    }
}

export const createChatForTwo = (new_chat) => {
    return {
        type: "CREATE_CHAT_FOR_TWO",
        payload: new_chat
    }
}

export const sendMessageForTwo = (chat_id, new_msg) => {
    return {
        type: "SEND_MESSAGE_FOR_TWO",
        payload: {
            chat_id,
            new_msg
        }
    }
}