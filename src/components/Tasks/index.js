import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Header, Pagination, Table } from 'semantic-ui-react';

import Task from '../Task';
import { setPage, setSorting } from '../../actions/tasks';
import { showUpdateTaskModal } from '../../actions/update';

const getDirectionName = (name) => {
  const dict = {
    asc: 'ascending',
    desc: 'descending',
  }
  return dict[name]
}

class Tasks extends Component {
  render(){
    const {tasks, setPage, setSorting, update} = this.props;
    const { records, page, pages, sortDirection, sortField } = tasks;
    const tasksView = records.map((el, i)=>{ 
      return(
        <Task
          username={el.username}
          email={el.email}
          text={el.text}
          status={el.status}
          id={el.id}
          key={el.id}
          onEdit={()=>{ update(el) }}  
        />
      )
    })
    return(
      <Fragment>
        <Header as='h1'>Tasks</Header>
        <Table celled sortable> 
          <Table.Header>
            <Table.Row>
            <Table.HeaderCell
                sorted={sortField === 'id' ? getDirectionName(sortDirection) : null}
                onClick={ ()=>{ setSorting('id') } }
              >
                Id
              </Table.HeaderCell>

              <Table.HeaderCell
                sorted={sortField === 'username' ? getDirectionName(sortDirection) : null}
                onClick={ ()=>{ setSorting('username') } }
              >
                Username
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={sortField === 'email' ? getDirectionName(sortDirection) : null}
                onClick={ ()=>{ setSorting('email') } }
              >
                Email
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={sortField === 'text' ? getDirectionName(sortDirection) : null}
                onClick={ ()=>{ setSorting('text') } }
              >
                Text
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={sortField === 'status' ? getDirectionName(sortDirection) : null}
                onClick={ ()=>{ setSorting('status') } }
              >
                Status
              </Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {tasksView}
          </Table.Body>
        </Table>
        <Pagination
          onPageChange={ (e,{activePage})=>{ setPage(activePage) } }
          activePage={page}
          totalPages={pages}
          />
      </Fragment>
    )
  }
}

export default connect(
  (state)=>({
    tasks:state.tasks,
  }),
  (dispatch)=>({
    setPage: (page) => { dispatch(setPage(page)); },
    setSorting: (field) => { dispatch(setSorting(field)); },
    update: (task)=> { dispatch(showUpdateTaskModal(task)); },
  })
)(Tasks);