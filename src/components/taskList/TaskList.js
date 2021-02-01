import React, { useRef } from "react";
import PropTypes from 'prop-types';
import Task from "../../entities/task";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TaskTile from "../taskTile/TaskTile";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

function TaskList({ tasks, updateTask, setActive, deleteTask, reorderTask }) {

  const taskListContainer = useRef(null);

  function handleDragEnd(result) {
		const { destination, source } = result;

		if (!destination) {
			return;
		}
		if (destination.index === source.index) {
			return;
		}
		reorderTask(source.index, destination.index);
	}

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="toDoListDroppable">
        {
          provided => 
          <Row ref={provided.innerRef} {...provided.droppableProps}>
            <Col ref={taskListContainer}>
            {
              tasks.map((task, index) => 
                <TaskTile key={task.id} task={task} updateTask={updateTask} active={task.active}
                          setActive={setActive} deleteTask={deleteTask} index={index} />
              )
            }
            { provided.placeholder }
            </Col>
          </Row>
        }
      </Droppable>
    </DragDropContext>
      
  );

}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.instanceOf(Task)).isRequired,
  updateTask: PropTypes.func.isRequired,
  setActive: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  reorderTask: PropTypes.func.isRequired,
};

export default TaskList;
