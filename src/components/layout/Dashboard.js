import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Contacts from '../contacts/Contacts';
import { toggleAddToGroup } from '../../actions';
import { logoutUser } from '../../actions';

function Dashboard(props) {

    const { currentUser, dispatch } = props

    function showAddToGroupBtn(){
        dispatch(toggleAddToGroup())
    }

    function handleLogoutUser() {
        dispatch(logoutUser())
    }

    if(currentUser.username){
    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/all_contacts">Contacts</Link>
            {
                currentUser.username ?
                <button onClick={handleLogoutUser}>
                    Logout
                </button>:
                null
            }
            
            <h1>Tsup</h1>
            <p>{currentUser.username}</p>
            <button
            onClick={showAddToGroupBtn} 
            id="group-btn">
                Create Group
            </button>
            <Contacts />
        </div>
    )}
    return <Redirect to ="/login" />
}

function mapStateToProps(state){
    return {
        currentUser: state.userReducers.currentUser,
        contacts: state.userReducers.contacts
    }
}

export default connect(mapStateToProps)(Dashboard)