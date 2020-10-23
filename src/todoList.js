import React, { useState } from "react";
import classes from "./todoList.module.css";

const TodoList = (props) => {
  const [editText, setText] = useState("");

  let list = null;
  if (props.items.length > 0) {
    if (editText !== "" && !props.editField) setText("");
    list = props.items.map((item) => {
      return (
        <li key={item.id} className={classes.todoList}>
          {!item.edit ? (
            <div className={classes.view}>
              <input
                className={classes.toggleAll}
                type="checkbox"
                onClick={() => props.taskCompleteHandler(item.id)}
              />
              <label
                style={{
                  textDecoration: item.active === 0 ? "line-through" : "none",
                }}
                onDoubleClick={() => props.editFlagHandler(item.id)}
              >
                {" "}
                {item.text}
              </label>
              <button onClick={() => props.deleteHandler(item.id)}>
                Delete
              </button>
            </div>
          ) : (
            <input
              type="text"
              value={editText}
              onChange={(event) => setText(event.target.value)}
              onKeyDown={(event) => props.editHandler(event, item.id, editText)}
            />
          )}
        </li>
      );
    });
  }
  return <ul className={classes.theList}>{list}</ul>;
};

export default TodoList;
