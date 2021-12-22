import './assets/css/RemoveListButton.css';
import { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function RemoveListButton({ removeCurrentList, lists, ...props }) {

    const [listName, setListName] = useState("");
    const [error, setError] = useState(false);
    const [errorLog, setErrorLog] = useState("teste");

    const cannotRemove = () => {

        setError(true);

        if (listName === "") {
            setErrorLog("Enter list name");
        } else {
            setErrorLog("List doesn't exist");
        };
    };

    if (lists.length === 0) {
        return (
            <div id="remove-list-button">
                <Modal {...props} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">Remove List</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-danger">You don't have any lists yet!</Modal.Body>
                    <Modal.Footer>
                        <Button onClick={props.onHide}>OK</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    } else {
        return (
            <div id="remove-list-button">
                <Modal {...props} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">Remove List</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="text-start" controlId="exampleForm.ControlInput1">
                            <Form.Control
                                type="text"
                                placeholder="Enter List to Remove"
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
                            (listName!=="" && lists.indexOf(listName) !== -1)
                            ? () => {
                                props.onHide();
                                removeCurrentList(listName);
                                setError(false);
                                setListName("");
                            }
                            : () => cannotRemove()
                        }>Remove
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    };
};

export default RemoveListButton;