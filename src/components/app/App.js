import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import TaskModal from '../taskModal/TaskModal';
import produce from 'immer';
import taskService from '../../util/taskService';
import TaskList from '../taskList/TaskList';

function App() {
  
  const [tasks, setTasks] = useState(taskService.getTasks());
  const [createTaskModalVisible, setCreateTaskModalVisible] = useState(false);
  const showCreateTaskModal = () => setCreateTaskModalVisible(true);
  const hideCreateTaskModal = () => setCreateTaskModalVisible(false);

  function createTask(task) {
    const createdTask = taskService.createTask(task);
    
    setTasks(produce(draft => {
      draft.push(createdTask);
    }));
    setTaskActive(createdTask);
  }

  function updateTask(task) {
    const updatedTask = taskService.updateTask(task);

    setTasks(produce(draft => {
      const index = draft.findIndex(elem => elem.id === updatedTask.id);
      draft.splice(index, 1, updatedTask);
    }));
    setTaskActive(updatedTask);
  }

  function setTaskActive(task) {
    const indexCurrentActive = tasks.findIndex(elem => elem.active === true);
    
    if (tasks[indexCurrentActive]?.id === task.id) {
      return;
    }
    setTasks(produce(draft => {
      if (indexCurrentActive !== -1) {
        draft[indexCurrentActive].active = false;
      }
      const indexNewActive = draft.findIndex(elem => elem.id === task.id);
      draft[indexNewActive].active = true;
    }));
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col lg={{ offset: 4, span: 4 }}>
            <Row>
              <Col>
                <Button onClick={showCreateTaskModal} block className="text-left">
                  Neuen Task anlegen
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                {
                  tasks.length === 0
                  ? <p>Keine Tasks vorhanden</p>
                  : <TaskList tasks={tasks} updateTask={updateTask} setActive={setTaskActive} />
                }
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <TaskModal visible={createTaskModalVisible} hide={hideCreateTaskModal}
                 title="Neuen Task anlegen" submit={{ title: "Task anlegen", action: createTask }} />
    </>
  );

}

export default App;
