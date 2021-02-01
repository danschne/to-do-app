import React from "react";
import PropTypes from 'prop-types';
import Task from "../../entities/task";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import produce from "immer";

function TaskTile({ task, updateTask, active, setActive }) {

  function setTileAsActive() {
    setActive(task);
  }

  function handleCheckChange(event) {
    updateTask(produce(task, draft => {
      draft.checked = event.target.checked;
    }));
  }

  return (
    <Row onClick={setTileAsActive} className={active ? "border border-primary" : ""}>
      <Col lg="1">
        <Form.Check type="checkbox" checked={task.checked} onChange={handleCheckChange} />
      </Col>
      <Col>
        {task.description}
      </Col>
      {
        active &&
        <Col lg="1">
          pen and can icons
        </Col>
      }
    </Row>
  );

}

TaskTile.propTypes = {
  task: PropTypes.instanceOf(Task).isRequired,
  updateTask: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
};

export default TaskTile;
