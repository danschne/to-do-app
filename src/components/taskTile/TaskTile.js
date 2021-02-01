import React from "react";
import PropTypes from 'prop-types';
import Task from "../../entities/task";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import produce from "immer";
import { Trash2 } from 'react-bootstrap-icons';

function TaskTile({ task, updateTask, active, setActive, deleteTask }) {

  function setTileAsActive() {
    setActive(task);
  }

  function handleCheckChange(event) {
    updateTask(produce(task, draft => {
      draft.checked = event.target.checked;
    }));
  }

  function handleDelete() {
    deleteTask(task);
  }

  return (
    <Row onClick={setTileAsActive}
         className={`mt-2 p-2 ${active ? "border border-primary" : ""}`}>
      <Col lg="1">
        <Form.Check type="checkbox" checked={task.checked} onChange={handleCheckChange} />
      </Col>
      <Col>
        {task.description}
      </Col>
      {
        active &&
        <Col lg="2">
          <button onClick={handleDelete} className="bg-white border-0">
            <Trash2 size={24} />
          </button>
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
  deleteTask: PropTypes.func.isRequired,
};

export default TaskTile;
