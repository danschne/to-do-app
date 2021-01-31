import produce from "immer";
import Task from "../entities/task";
import { generateRandomId } from "./util";

/*
 * This service simulates a corresponding back-end service that would normally
 * be communicated to via REST or something similar. It also incorporates the
 * storage of tasks in the local storage of the browser.
 */
const taskService = function() {

  const TASKS_KEY = "tasksToDoAppSynnotech";

  const tasks = getTasksFromLocalStorage();

  function createTask(task) {
    const taskToSave = produce(task, draft => {
      draft.id = generateRandomId();
      draft.creationDate = new Date();
    });

    tasks.push(taskToSave);
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));

    return taskToSave;
  }

  function getTasks() {
    return [...tasks];
  }

  function updateTask(task) {
    const index = tasks.findIndex(elem => elem.id === task.id);

    tasks.splice(index, 1, task);
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));

    return task;
  }

  function getTasksFromLocalStorage() {
    const tasksJson = localStorage.getItem(TASKS_KEY);

    if (tasksJson === null) {
      return [];
    }
    return JSON.parse(tasksJson).map(elem => Task.fromJson(elem));
  }

  return {
    createTask: createTask,
    getTasks: getTasks,
    updateTask: updateTask,
  }

}();

export default taskService;
