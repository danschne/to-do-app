import React, { useEffect, useReducer } from "react";
import Modal from "react-bootstrap/Modal";
import PropTypes from 'prop-types';
import Button from "react-bootstrap/Button";
import Task from "../../entities/task";
import Form from "react-bootstrap/Form";
import taskReducer from "../../util/taskReducer";
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function TaskModal({ visible, hide, title, task, submit }) {

  const [editableTask, dispatchEditableTask] = useReducer(taskReducer, task ?? new Task());
  const taskWasEdited = detectChanges();

  /*
   * This effect is necessary to adjust to the new value of "editableTask"
   * after resetting the dialog with the old one when the form is submitted.
   */
  /*
   * Persönliche Anmerkung:
   * Ich würde vermuten/hoffen, dass man sich durch einen geschickten Effekt
   * den dispatch in handleClose() sparen kann und der Dialog dann nur in
   * einem Effekt zentral vorbereitet wird. Dann müsste man nicht nach dem
   * Dialog resetten und trotzdem in manchen Fällen beim Neuaufruf des Dialogs
   * nochmal zusätzlich eingreifen. Leider fällt mir im Moment keine
   * geschicktere Lösung ein :-)
   */
  useEffect(() => {
    dispatchEditableTask({
      type: "reset",
      payload: task ?? new Task(),
    });
  }, [task]);

  /*
   * This handler function for the whole form in combination with the task reducer
   * synchronizes the task state with the fields of the form. It includes field
   * validation and is open to modifications of the task entity.
   */
  function handleChange(event) {
    const { name, value } = event.target;
    const valid = event.currentTarget.checkValidity();

    dispatchEditableTask({
      type: name,
      payload: {
        value: value,
        valid: valid,
      },
    });
  }

  /*
   * Reset the dialog.
   */
  function handleClose() {
    hide();
    dispatchEditableTask({
      type: "reset",
      payload: task ?? new Task(),
    });
  }

  function detectChanges() {
    return editableTask.description !== (task?.description ?? "");
  }

  /*
   * Handles the enter key.
   */
  function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    submitTask();
  }

  /*
   * Handles the button click.
   */
  function submitTask() {
    submit.action(editableTask);
    handleClose();
  }

  return (
    <Modal show={visible} onHide={handleClose}>
      <Modal.Header closeButton>{title}</Modal.Header>
      <Modal.Body>
        <Container>
          <Form validated={taskWasEdited} onChange={handleChange} onSubmit={handleSubmit}>
            <Row>
              <Form.Group as={Col} controlId="formTaskDescription">
                <Form.Label>Beschreibung</Form.Label>
                <Form.Control type="text" name="description" required
                              defaultValue={editableTask.description} />
              </Form.Group>
            </Row>
          </Form>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={submitTask} disabled={!taskWasEdited || !editableTask.valid}>
          {submit.title}
        </Button>
        <Button onClick={handleClose} variant="secondary">
          Abbrechen
        </Button>
      </Modal.Footer>
    </Modal>
  );

}

TaskModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  task: PropTypes.instanceOf(Task),
  submit: PropTypes.exact({
    title: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
  }).isRequired,
};

export default TaskModal;
