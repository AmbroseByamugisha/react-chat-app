import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function AllContacts(props){
    const { mycontacts } = props
    return(
        <div>
        <Link to="/">Home</Link>
            <h1>Contacts</h1>
            {
                mycontacts.map(mycontact => (
                    <div key={mycontact.username}>
                        <Link to={"/chat_detail/" + mycontact.username}>
                            <p
                            id="contact_item">
                                {mycontact.username}
                            </p>
                        </Link>
                    </div>
                ))
            }
        </div>
    )
}

function mapStateToProps(state){
    const contacts = state.userReducers.contacts
    const currentUser = state.userReducers.currentUser
    const mycontacts = contacts.filter(contact => (
        contact.username !== currentUser.username
        )
    )
    return {
        mycontacts: mycontacts
    }
}

export default connect(mapStateToProps)(AllContacts)