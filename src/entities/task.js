import { immerable } from "immer";

class Task {

  constructor() {
    this[immerable] = true;
    this.description = "";
    this.checked = false;
  }

}

export default Task;
