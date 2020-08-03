import React, { useState } from "react";
import { Button, Modal, FormControl } from "react-bootstrap";

export default function Edit(props) {
  const [show, setShow] = useState(false);
  const [todo, setTodo] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl
            as="textarea"
            onChange={(e) => {
              setTodo(e.target.value);
            }}
          >
            {props.desc}
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              props.handleEdit(props.id, todo);
              handleClose();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
