import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import TaskModal from '../taskModal/TaskModal';
import produce from 'immer';

function App() {
  
  const [tasks, setTasks] = useState([]);
  const [createTaskModalVisible, setCreateTaskModalVisible] = useState(false);
  const showCreateTaskModal = () => setCreateTaskModalVisible(true);
  const hideCreateTaskModal = () => setCreateTaskModalVisible(false);

  function createTask(task) {
    // put into database (local storage)
    setTasks(produce(draft => {
      draft.push(task);
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
                { tasks.length === 0
                  ? <p>Keine Tasks vorhanden</p>
                  : <p>task list</p>
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
