import  React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { sendMessage } from '../../actions';
import { joinGroup } from '../../actions';

function GroupChat(props) {
    const { chat, 
        currentUser, 
        dispatch } = props;
    const [inputMsgVal, setValue] = useState('')
    
    function handleChange(event){
        setValue(event.target.value);
    }

    function handleJoinGroup(){
        const groupNames = [];
        chat[0].members.map(member => (
            groupNames.push(member.username)
        ))
        if(groupNames.includes(currentUser.username) === false) {
            dispatch(joinGroup(chat[0].name, currentUser))
            alert(currentUser.username + " is a member of " + chat[0].name)
        } else {
            alert("You are already a meber of this group!")
        }
    }

    const new_msg = {
        body: inputMsgVal,
        sender: currentUser
    }
    function handleSubmit(event){
        event.preventDefault()
        const groupNames = [];
        chat[0].members.map(member => (
            groupNames.push(member.username)
        ))
        if(groupNames.includes(currentUser.username) === false){
            alert(
            "You are not a member of this group, Click the Join Group Button")
        } else {
            dispatch(sendMessage(chat[0].name, new_msg))
            console.log(chat[0].members)
        }
        
    }
    return (
        <div>
            <Link to="/">Home</Link>
            <button
            onClick={handleJoinGroup}>
                Join Group
            </button>
            <h1>Group Chat</h1>
            {
                chat.length !== 0 ?
                chat[0].msgs.map(msg => (
                    <div key={msg}>
                        {
                            chat[0].msgs.length !== 0 ?
                            <p>
                                <span>{msg.sender.username} :</span>
                                {msg.body}
                            </p>:
                            <p>
                                No Messages Yet
                            </p>
                        }
                    </div>
                )):
                <div>
                    No Messages Yet
                </div>
            }
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    value={inputMsgVal}
                    onChange={handleChange} 
                    placeholder="Type Message here" 
                />
                <button 
                    type="submit"
                >
                    Send
                </button>
            </form>
        </div>
    )
}

function mapStateToProps(state, ownProps){
    const group_name = ownProps.match.params.group_name
    const chats = state.userReducers.chats
    const mychats = chats.filter(chat => (
        chat.name === group_name
    ))
    return {
        chat: mychats,
        currentUser: state.userReducers.currentUser,
    }
}

export default connect(mapStateToProps)(GroupChat)