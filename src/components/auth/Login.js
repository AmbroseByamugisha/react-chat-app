import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom'
import { loginUser } from '../../actions';

function Login(props){
    const { 
        contacts, 
        loginUser,
        isLoggedIn } = props

    if(!isLoggedIn){
    return (
        <div>
            <Link to="/">Home</Link>
            <h1>Login</h1>
            {
                contacts.map(contact =>(
                    <div key={contact.username}>
                        <p
                            onClick={ () => 
                            loginUser(contact) }
                            id="contact_item">
                                {contact.username}
                        </p>
                    </div>
                ))
            }
        </div>
    )} 
    return <Redirect to="/" />
}


function mapDispatchToProps(dispatch) {
    return {
        loginUser: (user) => {
            dispatch(loginUser(user))
        }
    }
}

function mapStateToProps(state) {
    return {
        contacts: state.userReducers.contacts,
        isLoggedIn: state.userReducers.isLoggedIn
    } 
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)