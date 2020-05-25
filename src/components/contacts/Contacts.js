import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Contact from './Contact';
import { createChat } from '../../actions';

function Contacts (props){
    const { 
        contacts, 
        newGroupContacts, 
        mychats,
        currentUser, 
        dispatch } = props;

    const [inputGroupNameVal, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    function genId(){
        const id = mychats.length + 1;
        return id;
      }
    const newGroup = {
        id: genId(),
        name: inputGroupNameVal,
        members: newGroupContacts.concat([currentUser]),
        msgs: []
    };


    function handleSubmit(event){
        event.preventDefault();
        const groupNames = [];
        mychats.map(mychat => (
            groupNames.push(mychat.name)
        ))
        if(groupNames.includes(inputGroupNameVal) === true){
            alert("group name already exists, Choose another name")
        }
        else if(inputGroupNameVal.length === 0) {
            alert("Please name your group! ")
        
        }
        else if(newGroupContacts.length < 2){
            alert("Group must have atleast 3 members")
        } 
        else {
            dispatch(createChat(newGroup))
            console.log(newGroup)
        }
        
    }

    return (
        <div>
            {contacts.map(contact => (
                <Contact contact={contact} key={contact.username} />
            ))}
            <h1>New Group</h1>
            {newGroupContacts.map(newGroupContact => (
                <Contact contact={newGroupContact} key={newGroupContact.username} />
            ))}
            {
                newGroupContacts.length === 0 ?
                null :
                <div>
                    <form onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        value={inputGroupNameVal}
                        onChange={handleChange} 
                        placeholder="Enter Group Name" 
                    />
                    <button>
                        Register Group
                    </button>
                    </form>
                </div>
            }
            {
                mychats.length === 0 ?
                null:
                <div>
                    <h1>Groups</h1>
                    {
                        mychats.map(chat => (
                            <div key={chat.name}>
                                <Link to={"/group_chat/" + chat.name}>
                                    {chat.name}
                                </Link>
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    )
}

function mapStateToProps(state){
    const contacts = state.userReducers.contacts
    const currentUser = state.userReducers.currentUser
    const mycontacts = contacts.filter(contact => (
        contact.username !== currentUser.username
    ) && (contact.IsGrouped === false))
    const newGroupContacts = contacts.filter(contact => (
        contact.IsGrouped === true
    ))
    const chats = state.userReducers.chats
    const mychats = chats.filter(chat => (
        chat.name !== "ChatForTwo"
    ))
    return {
       contacts: mycontacts,
       newGroupContacts: newGroupContacts,
       mychats: mychats,
       currentUser: state.userReducers.currentUser
    }
}

export default connect(mapStateToProps)(Contacts)