import { immerable } from "immer";

class Task {

  constructor() {
    this[immerable] = true;

    this.description = "";
    this.checked = false;
  }

  static fromJson(json) {
    const task = new Task();

    task.id = json.id;
    task.description = json.description;
    task.checked = json.checked;
    task.creationDate = new Date(json.creationDate);

    return task;
  }

}

export default Task;
