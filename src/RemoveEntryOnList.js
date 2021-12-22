import './assets/css/RemoveEntryOnList.css';
import { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function RemoveEntryOnList({ removeButton, data, ...props }) {

    const [itemIndex, setItemIndex] = useState("");
    const [error, setError] = useState(false);
    const [errorLog, setErrorLog] = useState("teste");

    const cannotCreate = () => {

        setError(true);

        if (itemIndex === "") {
            setErrorLog("Enter item index");
        } else {
            setErrorLog("Item doesn't exist");
        };
    };

    if (data.length === 0) {
        return (
            <div id="remove-list-button">
                <Modal {...props} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">Remove item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-danger">You don't have any items yet</Modal.Body>
                    <Modal.Footer>
                        <Button onClick={props.onHide}>OK</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    } else {
        return (
            <div id="new-list-button">
                <Modal {...props} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Remove item
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="text-start" controlId="exampleForm.ControlInput1">
                            <Form.Control
                                type="number"
                                step="1"
                                placeholder="Enter Index To Remove"
                                value={itemIndex}
                                onChange={e => setItemIndex(e.target.value)}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        {error && 
                            <p className="text-danger">{errorLog}</p>
                        }
                        <Button onClick={
                            (itemIndex!=="" && data.some(item => item["#"] === itemIndex))
                            ? () => {
                                props.onHide();
                                removeButton(itemIndex);
                                setError(false);
                                setItemIndex("");
                            }
                            : () => cannotCreate()
                        }>Remove
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
};

export default RemoveEntryOnList;