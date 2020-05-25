const initialState = {
    currentUser: {username: "Ambrose"},
    contacts:[
        { username: "Ambrose", IsGrouped: false},
        { username: "masiko", IsGrouped: false },
        { username: "Dee", IsGrouped: false },
        { username: "loja", IsGrouped: false }
    ],
    chats: [],
    showButton: false,
    isLoggedIn: false
};

export default (state=initialState, action) => {
    switch(action.type){
        case "TOGGLE_ADD_TO_GROUP":
            return {
                ...state,
                showButton: !state.showButton
            }
        case "ADD_TO_GROUP":
            return {
                ...state,
                contacts: state.contacts.map(contact => (
                    contact.username === action.payload ?
                    { ...contact, IsGrouped: !contact.IsGrouped }:
                    contact
                ))
            }
        case "CREATE_CHAT":
            return {
                ...state,
                chats: state.chats.concat([action.payload])
            }
        case "SEND_MESSAGE":
            return {
                ...state,
                chats: state.chats.map(chat => (
                    chat.name === action.payload.group_name ?
                    { ...chat, msgs: chat.msgs.concat([action.payload.new_msg]) }:
                    chat
                ))
            }
        case "LOGIN_USER":
            return {
                ...state,
                currentUser: action.payload,
                isLoggedIn: true
            }
        case "LOGOUT_USER":
            return {
                ...state,
                currentUser: {},
                isLoggedIn: false
            }
        case "JOIN_GROUP":
            return {
                ...state,
                chats: state.chats.map(chat => (
                    chat.name === action.payload.group_name ?
                    { ...chat, members: chat.members.concat([action.payload.new_member]) }:
                    chat
                ))
            }
        case "CREATE_CHAT_FOR_TWO":
            return {
                ...state,
                chats: state.chats.concat([action.payload])
            }
        case "SEND_MESSAGE_FOR_TWO":
            return {
                ...state,
                chats: state.chats.map(chat => (
                    chat.id === action.payload.chat_id ?
                    { ...chat, msgs: chat.msgs.concat([action.payload.new_msg]) }:
                    chat
                ))
            }
        default:
            return state;
    }
}