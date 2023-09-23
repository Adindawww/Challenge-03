import { useState } from "react";
const Header = ({ setRefresh }) => {
  const [task, setTask] = useState("");
  const addTodo = () => {
    const newTodo = { task, complete: false };
    fetch("http://localhost:3000/todolist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    }).then(() => {
      setTask("");
      setRefresh(true);
      setTimeout(() => {
        alert("new todo added.");
      }, 500);
    });
  };

  return (
    <>
      <div className="header">
        <div
          className="todo-input"
          style={{ position: "center", fontSize: "20px", marginLeft: "10px" }}
        >
          <h3>TODO SEARCH</h3>
          <form className="form-group">
            <input
              type="text"
              placeholder="Enter New To Do List"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              style={{ height: "25px", width: "500px", borderRadius: "5px" }}
            />
            <button
              onClick={addTodo}
              style={{
                height: "30px",
                width: "150px",
                backgroundColor: "#c76dca",
                fontSize: "15px",
              }}
            >
              Add New Task
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Header;
