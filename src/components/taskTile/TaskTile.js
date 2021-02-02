import React, { useState } from "react";
import PropTypes from 'prop-types';
import Task from "../../entities/task";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import produce from "immer";
import { Trash2, Pencil, GripVertical } from 'react-bootstrap-icons';
import TaskModal from "../taskModal/TaskModal";
import { Draggable } from "react-beautiful-dnd";
import "./TaskTile.css";

function TaskTile({ task, updateTask, active, setActive, deleteTask, index }) {

  const [editTaskModalVisible, setEditTaskModalVisible] = useState(false);
  const showEditTaskModal = () => setEditTaskModalVisible(true);
  const hideEditTaskModal = () => setEditTaskModalVisible(false);

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
    <Draggable draggableId={task.id.toString()} index={index}>
      {  
        provided =>
        <Row onClick={setTileAsActive}
             className={`mt-2 p-2 rounded ${active ? "border border-md border-primary" : ""} ${task.checked ? "bg-green" : "bg-gray"} align-items-center`}
             {...provided.draggableProps} ref={provided.innerRef}>
          <Col lg="1" className="d-flex justify-content-center">
            <span {...provided.dragHandleProps}>
              <GripVertical size={24} />
            </span>
          </Col>
          <Col lg="1" className="text-center">
            <Form.Check type="checkbox" checked={task.checked} onChange={handleCheckChange} />
          </Col>
          <Col>
            {task.description}
          </Col>
          {
              active &&
              <>
                <Col lg="1" className="d-flex justify-content-center">
                  <button onClick={showEditTaskModal} className="bg-transparent border-0 rounded">
                    <Pencil size={24} />
                  </button>

                  <TaskModal visible={editTaskModalVisible} hide={hideEditTaskModal}
                             title="Task bearbeiten" task={task}
                             submit={{ title: "Task speichern", action: updateTask }} />
                </Col>
                <Col lg="1" className="d-flex justify-content-center">
                  <button onClick={handleDelete} className="bg-transparent border-0 rounded">
                    <Trash2 size={24} />
                  </button>
                </Col>
              </>
          }
        </Row>
      }
    </Draggable>
  );

}

TaskTile.propTypes = {
  task: PropTypes.instanceOf(Task).isRequired,
  updateTask: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default TaskTile;
