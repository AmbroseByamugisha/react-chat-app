import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createChatForTwo, sendMessageForTwo } from '../../actions';

function ChatDetail(props){
    const {
        mycontact,
        currentUser,
        mychat, 
        chats,
        dispatch
    } = props
    const [ inputMsgVal, setValue ] = useState('');
    function handleChange(event){
        setValue(event.target.value);
    }
    function genId(){
        const id = chats.length + 1;
        return id;
    }
    const receiverUser = mycontact[0];
    const new_chat = {
        id: genId(),
        name: "ChatForTwo",
        members: [currentUser, receiverUser],
        msgs: [inputMsgVal]
    }
    function handleSubmit(event){
        event.preventDefault();
        if(mychat.length === 0){
            dispatch(createChatForTwo(new_chat))
        }
        else {
            dispatch(sendMessageForTwo(mychat[0].id, inputMsgVal))
        }
    }
    return (
        <div>
            <Link to="/">Home</Link>
            <h1>Chat for Two</h1>
            {
                mychat.length !== 0 ?
                mychat[0].msgs.map(msg => (
                    <p
                    key={msg}>
                        {msg}
                    </p>
                )):
                <p>
                    No Messages Yet
                </p>
            }
            <form onSubmit={handleSubmit}>
                <input 
                type="text"
                value={inputMsgVal}
                onChange={handleChange}
                placeholder="Type Message here" />
                <button
                type="submit">
                    Send
                </button>
            </form>
        </div>
    )
}

function mapStateToProps(state, ownProps){
    const user_name = ownProps.match.params.user_name;
    const currentUser = state.userReducers.currentUser;
    const contacts = state.userReducers.contacts;
    const mycontact = contacts.filter(contact => (
        contact.username === user_name
    ))
    const chats = state.userReducers.chats;
    const mychat = chats.filter(chat => (
        
        (chat.name === "ChatForTwo") &&
        ( 
            (chat.members[0].username === mycontact[0].username) ||
            (chat.members[0].username === currentUser.username)
        ) &&
        ( 
            (chat.members[1].username === mycontact[0].username) ||
            (chat.members[1].username === currentUser.username)
        ) 
    ))

    return {
        mycontact: mycontact,
        currentUser: currentUser,
        mychat: mychat,
        chats: chats
    }
}

export default connect(mapStateToProps)(ChatDetail)