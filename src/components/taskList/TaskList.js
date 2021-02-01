import React from "react";
import PropTypes from 'prop-types';
import Task from "../../entities/task";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TaskTile from "../taskTile/TaskTile";

function TaskList({ tasks, updateTask, setActive }) {

  return (
    <Row>
      <Col>
        {
          tasks.map(task => 
            <TaskTile key={task.id} task={task} updateTask={updateTask} active={task.active}
                      setActive={setActive} />
          )
        }
      </Col>
    </Row>
  );

}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.instanceOf(Task)).isRequired,
  updateTask: PropTypes.func.isRequired,
  setActive: PropTypes.func.isRequired,
};

export default TaskList;
