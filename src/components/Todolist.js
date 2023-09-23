import { useEffect, useState } from "react";
import Itemtodolist from "./Itemtodolis";

const Todolist = ({ isRefresh, setRefresh }) => {
  const [todos, setTodos] = useState([]);
  const [records, setRecords] = useState(todos);

  useEffect(() => {
    if (isRefresh) {
      fetch("http://localhost:3000/todolist")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setRefresh(false);

          setTodos(data);
          setRecords(data);
        })
        .catch((err) => {
          setRefresh(false);
          if (err.name === "AbortError") {
            console.log("fetch aborted.");
          }
        });
    }
  }, [isRefresh, setRefresh]);

  const Filter = (event) => {
    setRecords(
      todos.filter((f) => f.task.toLowerCase().includes(event.target.value))
    );
  };

  const [filter, setFilter] = useState("all");
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };
  const handleDeleteDoneTasks = () => {
    const updatedTodos = todos.filter((todo) => !todo.complete);
    setTodos(updatedTodos);
    setRecords(updatedTodos);
  };
  const handleDeleteAllTasks = () => {
    setTodos([]);
    setRecords([]);
  };

  return (
    <>
      <div className="todo-container">
        <div className="todo-search">
          <form>
            <input
              type="text"
              placeholder="Search Todo"
              onChange={Filter}
              className="input-search"
              style={{
                height: "25px",
                width: "660px",
                borderRadius: "5px",
                marginLeft: "10px",
              }}
            />
          </form>
        </div>
        <div
          className="todojudul2"
          style={{ position: "center", fontSize: "20px", marginLeft: "10px" }}
        >
          <h3>To Do List</h3>
        </div>
        <div className="filter-todo">
          <button
            onClick={() => handleFilterChange("all")}
            style={{
              height: "30px",
              width: "150px",
              backgroundColor: "#c76dca",
              fontSize: "15px",
              marginLeft: "2px",
              marginRight: "20px",
            }}
          >
            All
          </button>
          <button
            onClick={() => handleFilterChange("completed")}
            style={{
              height: "30px",
              width: "150px",
              backgroundColor: "#c76dca",
              fontSize: "15px",
              marginRight: "20px",
            }}
          >
            Done
          </button>
          <button
            onClick={() => handleFilterChange("incomplete")}
            style={{
              height: "30px",
              width: "150px",
              backgroundColor: "#c76dca",
              fontSize: "15px",
              marginLeft: "10px",
            }}
          >
            Todo
          </button>
        </div>
      </div>
      <div className="DeleteAkhir">
        <button
          onClick={handleDeleteDoneTasks}
          style={{
            height: "30px",
            width: "150px",
            backgroundColor: "#c76dca",
            fontSize: "15px",
            marginTop: "20px",
          }}
        >
          Delete Done Tasks
        </button>
        <button
          onClick={handleDeleteAllTasks}
          style={{
            height: "30px",
            width: "150px",
            backgroundColor: "#c76dca",
            fontSize: "15px",
            marginTop: "20px",
          }}
        >
          Delete All Tasks
        </button>
      </div>

      <ul id="todo-list">
        {records
          .filter((todo) => {
            if (filter === "completed" && !todo.complete) return false;
            if (filter === "incomplete" && todo.complete) return false;
            return true;
          })
          .map((todo) => (
            <Itemtodolist todo={todo} key={todo.id} setRefresh={setRefresh} />
          ))}
      </ul>
    </>
  );
};

export default Todolist;
