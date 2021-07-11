import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Button } from 'semantic-ui-react';
import logo from './logo.svg';

import { showLoginModal, logout } from '../../actions/login';
import { showCreateTaskModal } from '../../actions/create';

class Header extends Component {
    
  render() {
    const { showLogin, showCreatetask, token, logout } = this.props;
    const authBtn = token===null ? (
      <Button
        primary
        onClick={showLogin}
      >LogIn</Button>
    ) : (
      <Button
        primary
        onClick={logout}
      >LogOut</Button>
    )
    return (
      <Menu stackable>
        <Menu.Item>
          <img src={logo} alt=''  />
        </Menu.Item>
        <Menu.Item>
          <Button
            primary
            onClick={showCreatetask}
          >Create Task</Button>
        </Menu.Item>

        <Menu.Menu position='right'>
          <Menu.Item>
            {authBtn}
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

export default connect(
  (state)=>({
    token:state.login.token,
  }),
  (dispatch)=>({
    showLogin:()=>{ dispatch(showLoginModal()); },
    showCreatetask:()=>{ dispatch(showCreateTaskModal()); },
    logout:() => { dispatch(logout()); },
  })
)(Header);