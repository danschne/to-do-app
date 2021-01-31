import React from "react";
import PropTypes from 'prop-types';
import Task from "../../entities/task";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import produce from "immer";

function TaskTile({ task, updateTask }) {

  function handleCheckChange(event) {
    updateTask(produce(task, draft => {
      draft.checked = event.target.checked;
    }));
  }

  return (
    <Row>
      <Col lg="1">
        <Form.Check type="checkbox" checked={task.checked} onChange={handleCheckChange} />
      </Col>
      <Col>
        {task.description}
      </Col>
      <Col lg="2">
        pen can
      </Col>
    </Row>
  );

}

TaskTile.propTypes = {
  task: PropTypes.instanceOf(Task).isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default TaskTile;
