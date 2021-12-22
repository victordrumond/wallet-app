import './assets/css/AddListButton.css';
import { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function AddListButton({ createNewList, lists, ...props }) {

    const [listName, setListName] = useState("");
    const [error, setError] = useState(false);
    const [errorLog, setErrorLog] = useState("teste");

    const cannotCreate = () => {

        setError(true);

        if (listName === "") {
            setErrorLog("Enter list name");
        } else {
            setErrorLog("List already exists");
        };
    };

    return (
        <div id="new-list-button">
            <Modal {...props} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add List
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="text-start" controlId="exampleForm.ControlInput1">
                        <Form.Control
                            type="text"
                            placeholder="Enter New List Name"
                            value={listName}
                            onChange={e => setListName(e.target.value)}
                            required
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    {error && 
                        <p className="text-danger">{errorLog}</p>
                    }
                    <Button onClick={
                        (listName!=="" && lists.indexOf(listName) === -1)
                        ? () => {
                            props.onHide();
                            createNewList(listName);
                            setError(false);
                            setListName("");
                        }
                        : () => cannotCreate()
                    }>Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AddListButton;