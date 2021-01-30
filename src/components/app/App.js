import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import EditTaskModal from '../editTaskModal/EditTaskModal';

function App() {
  
  const tasks = [];
  const [createTaskModalVisible, setCreateTaskModalVisible] = useState(false);
  const showCreateTaskModal = () => setCreateTaskModalVisible(true);
  const hideCreateTaskModal = () => setCreateTaskModalVisible(false);

  return (
    <>
      <Container fluid id="in-dev">
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
                  : <p>content</p>
                }
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <EditTaskModal visible={createTaskModalVisible} hide={hideCreateTaskModal} />
    </>
  );

}

export default App;
