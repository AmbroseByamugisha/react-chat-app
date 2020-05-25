import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './components/layout/Dashboard';
import GroupChat from './components/chats/GroupChat';
import Login from './components/auth/Login';
import AllContacts from './components/contacts/AllContacts';
import ChatDetail from './components/chats/ChatDetail';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/group_chat/:group_name" component={GroupChat} />
        <Route path="/login" component={Login} />
        <Route path="/all_contacts" component={AllContacts} />
        <Route path="/chat_detail/:user_name" component={ChatDetail} />
      </Switch>
    </div>
  );
}

export default App;
