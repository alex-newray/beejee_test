import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Form, Message } from 'semantic-ui-react';

import {
  hideLoginModal, showLoginModal,
  updateLoginField, sendLoginForm,
} from '../../actions/login';

class LoginModal extends Component {

  render(){
    const {
      login,
      hide, show, update, send,
    } = this.props;
    const { open, username, password, loading, message } = login;
    return(
      <Modal
        onClose={() => hide()}
        onOpen={() => show()}
        open={open}
      >
        <Modal.Header>Login</Modal.Header>
        <Modal.Content>
          <Form onSubmit={ (e)=>{
            e.preventDefault();
            send();
          }}
          error={ message.username!==undefined || message.password!==undefined }
          >
            <Form.Input
              label='Username'
              value={username}
              onChange = {(e, {value})=>{ update('username', value) }}
            /> 
            <Message
              error
              content={message.username}
            />
            <Form.Input
              label='Password'
              type='password'
              value={password}
              onChange = {(e, {value})=>{ update('password', value) }}
            />
            <Message
              error
              content={message.password}
            />
            <Button
              type='submit'
              loading={loading}
            >Login</Button>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={hide}>Close</Button>
        </Modal.Actions>
      </Modal>
    )
  }

}

export default connect(
  (state)=>({
    login:state.login,
  }),
  (dispatch)=>({
    hide:()=>{ dispatch(hideLoginModal()); },
    show:()=>{ dispatch(showLoginModal()); },
    update:(key, value)=>{ dispatch(updateLoginField(key, value)); },
    send:()=> { dispatch(sendLoginForm()); },
  })
)(LoginModal);

