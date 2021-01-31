import produce from "immer";

const taskReducer = produce((draft, action) => {
  const { type, payload } = action;
  const { value, valid } = payload;

  switch (type) {
      case "description":
          draft.description = value;
          break;
      case "reset":
          return payload;
  }

  draft.valid = valid;
});

export default taskReducer;
