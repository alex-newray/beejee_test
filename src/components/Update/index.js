import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Form, Message } from 'semantic-ui-react';

import {
  hideUpdateTaskModal, showUpdateTaskModal,
  updateUpdateFormField, updateTask,
} from '../../actions/update';

class UpdateModal extends Component {

  render(){
    const {
      update,
      hide, show, updateField, send,
    } = this.props;
    const {
      open, loading, message,
      text, status, 
    } = update;
    const options = [
      { key: '0', text: 'Opened', value: 0 },
      { key: '1', text: 'Opened, Edited', value: 1 },
      { key: '10', text: 'Completed', value: 10 },
      { key: '11', text: 'Completed, Edited', value: 11 },
    ]
    return(
      <Modal
        onClose={() => hide()}
        onOpen={() => show({})}
        open={open}
      >
        <Modal.Header>Update Task</Modal.Header>
        <Modal.Content>
          <Form onSubmit={ (e)=>{
            e.preventDefault();
            send();
          }}
          error={
            message.text!==undefined ||
            message.status!==undefined ||
            message.id!==undefined
          }
          >
            <Message
              error
              content={message.id}
            />
            <Form.Input
              label='text'
              value={text}
              onChange = {(e, {value})=>{ updateField('text', value) }}
            /> 
            <Message
              error
              content={message.text}
            />
            <Form.Select
              fluid
              label='Status'
              options={options}
              value={status}
              onChange = {(e, {value})=>{ updateField('status', value) }}
            />
            <Message
              error
              content={message.status}
            />
            <Button
              type='submit'
              loading={loading}
            >Update</Button>
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
    update:state.update,
  }),
  (dispatch)=>({
    hide:()=>{ dispatch(hideUpdateTaskModal()); },
    show:()=>{ dispatch(showUpdateTaskModal()); },
    updateField:(key, value)=>{ dispatch(updateUpdateFormField(key, value)); },
    send:()=> { dispatch(updateTask()); },
  })
)(UpdateModal);

