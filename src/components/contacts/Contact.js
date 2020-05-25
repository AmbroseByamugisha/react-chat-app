import React from 'react';
import { connect } from 'react-redux';
import { addToGroup } from '../../actions';

function Contact (props) {
    const { contact, showButton, addToGroup } = props

    return (
        <div id="contact-name">
            <p>
                {contact.username}
            </p>
            { !showButton && contact.IsGrouped? 
                <button
                    onClick={ () => 
                        addToGroup(contact.username, contact) }>
                    Remove
                </button>: 
                <button
                    onClick={ () => 
                        addToGroup(contact.username, contact) }>
                    Add
                </button>
            }

        </div>
    )
}


function mapDispatchToProps(dispatch) {
    return {
        addToGroup: (usrName) => {
            dispatch(addToGroup(usrName))
        }
    }
}

function mapStateToProps(state){
    return {
        showButton: state.userReducers.showButton
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact) 