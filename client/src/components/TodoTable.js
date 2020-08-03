import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import EditButton from "./EditTodo";

export default function TodoTable() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    try {
      fetch("/todos", {
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((res) => {
          setTodos(res);
        });
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const handleDone = (id) => {
    try {
      fetch(`/todos/${id}`, {
        headers: { "Content-Type": "application/json" },
        method: "DELETE",
      });
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = (id, newDesc) => {
    try {
      fetch(`/todos/${id}`, {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify({ desc: newDesc }),
      });
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Todo</th>
          <th>Edit</th>
          <th>Done</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo, i) => {
          return (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{todo.desc}</td>
              <td>
                <EditButton
                  desc={todo.desc}
                  id={todo.todo_id}
                  handleEdit={handleEdit}
                />
              </td>
              <td>
                <Button
                  variant="success"
                  onClick={() => {
                    handleDone(todo.todo_id);
                  }}
                >
                  Done
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
