import { useState } from "react";
import Header from "./components/Header";
import Todolist from "./components/Todolist";

export default function App() {
  const [isRefresh, setIsRefresh] = useState(true);

  const setRefresh = (status) => {
    setIsRefresh(status);
  };

  return (
    <>
      <div className="App">
        <div className="content">
          <Header setRefresh={setRefresh} />
          <Todolist setRefresh={setRefresh} isRefresh={isRefresh} />
        </div>
      </div>
    </>
  );
}
