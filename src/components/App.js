import "../styles/App.css";
import React from "react";
import TaskBoards from "./Boards";

const App = () => {
  return (
    <div className="TaskManagerApp">
      <div className="AppHeader">Task Manager</div>
      <TaskBoards />
    </div>
  );
};

export default App;
