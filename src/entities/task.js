import generateRandomId from "../util/util";

class Task {

  Task() {
    this.id = generateRandomId();
    this.description = "";
    this.checked = false;
  }

}

export default Task;
