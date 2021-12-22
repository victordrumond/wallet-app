import './assets/css/NewEntryOnList.css';
import { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


function NewEntryOnList({ addButton, type, ...props }) {

    const [description, setDescription] = useState("");
    const [value, setValue] = useState("");
    const [date, setDate] = useState("");
    const [category, setCategory] = useState("");
    const [error, setError] = useState(false);
    const [errorLog, setErrorLog] = useState("teste");

    const incomeDatalist = ["Salary", "Investments", "Property", "Extra", "Present", "Other"];
    const expenseDatalist = ["Housing", "Food", "Health", "Transportation", "Education", "Clothing", "Leisure", "Other"];

    const cannotCreate = () => {

        setError(true);

        if (description === "") {
            setErrorLog("Enter " + type + " description");
        } else {
            setErrorLog("Enter " + type + " value");
        };
    };

    return (
        <div id="new-entry-buttons">
            <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        New {type}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                className="form-input"
                                type="text"
                                placeholder="Enter description"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <div id="value-date-box" className="d-flex">
                            <Form.Group id="value-input" className="text-start" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Value</Form.Label>
                                <Form.Control
                                    className="form-input"
                                    placeholder="Enter value"
                                    type="number"
                                    step="0.01"
                                    value={value}
                                    onChange={e => setValue(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group id="date-input" className="text-start" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                    className="form-input"
                                    type="date"
                                    value={date}
                                    onChange={e => setDate(e.target.value)}
                                />
                            </Form.Group>
                        </div>
                        <Form.Group className="text-start" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                className="form-input"
                                placeholder="Enter category"
                                type="text"
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                                list="categories"
                            />
                            <datalist id="categories">
                                {type === "income"
                                ? incomeDatalist.map(item => <option key={item}>{item}</option>)
                                : expenseDatalist.map(item => <option key={item}>{item}</option>)}
                            </datalist>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {error && 
                        <p className="text-danger">{errorLog}</p>
                    }
                    <Button onClick={
                        (description!== "" && value!== "")
                        ? () => {
                            props.onHide();
                            addButton(description, value, date, category, type)
                            setError(false);
                        }
                        : () => cannotCreate()
                    }>Add {type}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default NewEntryOnList;