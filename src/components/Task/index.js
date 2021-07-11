import React, { Component, Fragment } from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';

class Status extends Component {
  render(){
    const statusView = this.props.status < 10 ? (
      <Icon
        name="play"
      />
    ) : (
      <Icon
        name="check"
        color="green"
      />
    )
    return(
      <Fragment>
        {statusView}
      </Fragment>
    )
  }
}

class Edit extends Component {
  render(){
    const statusView = this.props.status % 2 === 1 ? (
      <Icon
        name="pencil"
      />
    ) : null
    return(
      <Fragment>
        {statusView}
      </Fragment>
    )
  }
}

class Task extends Component{ 
  render() {
    const {
      id, username, email, text, status,
      onEdit,
    } = this.props;
    return(
      <Table.Row>
        <Table.Cell>{id}</Table.Cell>
        <Table.Cell>{username}</Table.Cell>
        <Table.Cell>{email}</Table.Cell>
        <Table.Cell>{text}</Table.Cell>
        <Table.Cell>
          <Status status={status} />
          <Edit status={status} />
        </Table.Cell>
        <Table.Cell>
          <Button icon onClick={onEdit}>
            <Icon name='edit'/>
          </Button>
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default Task;