import { AiFillDelete } from "react-icons/ai";
import { FaPencilAlt } from "react-icons/fa";
import { useState } from "react";

const Itemtodolist = ({ todo, todolist, setEditTodolist, setRefresh }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedTask, setEditedTask] = useState(todo.task);

  const updateTodo = () => {
    todo.complete = !todo.complete;

    fetch("http://localhost:3000/todolist/" + todo.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    }).then(() => {
      console.log("todo updated.");
      setRefresh(true);
    });
  };

  const deleteTodo = () => {
    fetch("http://localhost:3000/todolist/" + todo.id, {
      method: "DELETE",
    }).then(() => {
      console.log("todo deleted.");
      setRefresh(true);
    });
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const saveEditedTodo = () => {
    todo.task = editedTask;

    fetch("http://localhost:3000/todolist/" + todo.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    }).then(() => {
      console.log("edited todo saved.");
      setRefresh(true);
      setEditMode(false);
    });
  };

  return (
    <div className="todo-item">
      <li className={`${todo.complete ? "checked" : ""} form-control`}>
        {editMode ? (
          <>
            <input
              type="text"
              value={editedTask}
              onChange={(e) => setEditedTask(e.target.value)}
            />
            <button
              className="btn btn-sm btn-primary rounded-sm shadow border-0 me-2"
              onClick={saveEditedTodo}
            >
              Edit
            </button>
          </>
        ) : (
          <>
            {todo.task}
            <span>
              <input
                type="checkbox"
                checked={todo.complete}
                onChange={updateTodo}
              />
              <button
                className="btn btn-sm btn-primary rounded-sm shadow border-0 me-2"
                onClick={handleEdit}
              >
                <FaPencilAlt />
              </button>
              <AiFillDelete
                className="list-item-icons"
                id="delete"
                onClick={deleteTodo}
              />
            </span>
          </>
        )}
      </li>
    </div>
  );
};

export default Itemtodolist;
