import React from "react";
import AddTodo from "./components/AddTodo";
import TodoTable from "./components/TodoTable";

export default function App() {
  return (
    <div>
      <AddTodo />
      <TodoTable />
    </div>
  );
}
