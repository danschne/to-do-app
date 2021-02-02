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

  function deleteTask(task) {
    const deletedTask = taskService.deleteTask(task);

    setTasks(produce(draft => {
      const index = draft.findIndex(elem => elem.id === deletedTask.id);
      draft.splice(index, 1);
    }));
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

  function reorderTask(source, destination) {
    const task = tasks[source];

    setTasks(produce(draft => {
      draft.splice(source, 1);
      draft.splice(destination, 0, task);
      /*
       * Macht immer hier eigentlich irgendwelche Magie, sodass der Tausch
       * in der Art und Weise funktioniert? Eigentlich verkürzt sich ja das
       * Feld erst um 1, wodurch der Zielindex beim Wiedereinfügen um 1
       * verschoben sein müsste.
       */
    }));
    setTaskActive(task);
  }

  return (
    <>
      <Container fluid className="pt-2">
        <Row>
          <Col lg={{ offset: 4, span: 4 }}>
            <Row>
              <Button onClick={showCreateTaskModal} block>
                Neuen Task anlegen
              </Button>
            </Row>
            <Row>
              <Col>
                <TaskList tasks={tasks} updateTask={updateTask} setActive={setTaskActive}
                          deleteTask={deleteTask} reorderTask={reorderTask} />
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
