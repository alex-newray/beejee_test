import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Button, Icon, Modal } from 'semantic-ui-react'

import { hideNotificationModal } from '../../actions/notification';

class Notification extends Component {
  render(){
    const {
      open, message,
      hide,
    } = this.props;
    return(
      <Modal
        onClose={() => hide()}
        open={open}
        size='mini'
      >
        <Modal.Content>
          {message}
        </Modal.Content>
        <Modal.Actions>
          <Button
            color='green'
            inverted
            onClick={hide}>
            <Icon name='checkmark' /> Ok
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default connect(
  (state)=>({
    open:state.notification.open,
    message:state.notification.message,
  }),
  (dispatch)=>({
    hide:()=>{ dispatch(hideNotificationModal()); },
  })
)(Notification);