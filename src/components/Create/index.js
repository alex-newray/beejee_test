import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Form, Message } from 'semantic-ui-react';

import {
  hideCreateTaskModal, showCreateTaskModal,
  updateCreateFormField, createTask,
} from '../../actions/create';

class CreateModal extends Component {

  render(){
    const {
      create,
      hide, show, update, send,
    } = this.props;
    const {
      open, loading, message,
      username, email, text, 
    } = create;
    return(
      <Modal
        onClose={() => hide()}
        onOpen={() => show()}
        open={open}
      >
        <Modal.Header>Create Task</Modal.Header>
        <Modal.Content>
          <Form onSubmit={ (e)=>{
            e.preventDefault();
            send();
          }}
          error={
            message.username!==undefined ||
            message.email!==undefined ||
            message.text!==undefined
          }
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
              label='Email'
              value={email}
              onChange = {(e, {value})=>{ update('email', value) }}
            /> 
            <Message
              error
              content={message.email}
            />
            <Form.Input
              label='text'
              value={text}
              onChange = {(e, {value})=>{ update('text', value) }}
            /> 
            <Message
              error
              content={message.text}
            />
            <Button
              type='submit'
              loading={loading}
            >Create</Button>
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
    create:state.create,
  }),
  (dispatch)=>({
    hide:()=>{ dispatch(hideCreateTaskModal()); },
    show:()=>{ dispatch(showCreateTaskModal()); },
    update:(key, value)=>{ dispatch(updateCreateFormField(key, value)); },
    send:()=> { dispatch(createTask()); },
  })
)(CreateModal);

