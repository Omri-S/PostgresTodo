import React, { useState } from "react";
import { Container, Form, Button, Col } from "react-bootstrap";

export default function AddTodo() {
  const [todo, setTodo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("/todos", {
        body: JSON.stringify({ desc: todo }),
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Row className="align-items-center">
          <Col className="my-1">
            <Form.Control
              onChange={(e) => {
                setTodo(e.target.value);
              }}
              id="inlineFormInputName"
              placeholder="Todo..."
            />
          </Col>
          <Col xs="auto" className="my-1">
            <Button type="submit">Submit</Button>
          </Col>
        </Form.Row>
      </Form>
    </Container>
  );
}
