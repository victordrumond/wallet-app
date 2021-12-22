import './assets/css/List.css';
import { useState } from 'react';
import { formatMoney, formatDate } from './globalDeclarations.js'
import ListContent from './ListContent.js'
import NewEntryOnList from './NewEntryOnList.js'
import RemoveEntryOnList from './RemoveEntryOnList.js'
import { BiDollarCircle } from 'react-icons/bi';
import { MdAddCircleOutline, MdRemoveCircleOutline } from 'react-icons/md'
import { RiCloseCircleLine } from 'react-icons/ri';

function List({ name }) {

    const [balance, setBalance] = useState(0);
    const [showBalance, setShowBalance] = useState(true);
    const [newEntry, setNewEntry] = useState(false);
    const [removeEntry, setRemoveEntry] = useState(false);
    const [statementItems, setStatementItems] = useState([]);

    const submitItem = (description, value, date, category, type) => {

        setNewEntry(false);
        setStatementItems([...statementItems, {"#": (statementItems.length + 1).toFixed(0), "Description": description, "Value": formatMoney(value), "Date": formatDate(date), "Category": category, "Type": type}]);

        if (type === "income") {
            setBalance(balance + parseFloat(formatMoney(value)));
        };
        if (type === "expense") {
            setBalance(balance - parseFloat(formatMoney(value)));
        };
    };

    const removeItem = (index) => {

        setRemoveEntry(false);

        let currentState = statementItems;
        let newState = currentState.filter(item => item["#"] !== index);
        newState.map((item, i) => item["#"] = (i + 1).toFixed(0));

        setStatementItems(newState);

        let newBalance = 0;
        newState.forEach(item => {
            if (item["Type"] === "income") {
                newBalance += parseFloat(item["Value"]);
            } else if (item["Type"] === "expense") {
                newBalance -= parseFloat(item["Value"]);
            };
        });

        setBalance(newBalance);
    };

    return (
        <div>
            <div id="display-container" className="d-flex justify-content-between">
                <div id="display-balance" className="d-flex">
                    <p>Balance: </p>
                    <BiDollarCircle className="display-icon" onClick={() => setShowBalance(!showBalance)}/>
                    {showBalance && <h2>{balance.toFixed(2)}</h2>}
                </div>
                <div id="display-buttons" className="d-flex">
                    <div className="d-flex">
                        <p>New: </p>
                        <MdAddCircleOutline className="display-icon" onClick={() => setNewEntry("income")}/>
                        <MdRemoveCircleOutline className="display-icon" onClick={() => setNewEntry("expense")}/>
                    </div>
                    <div className="d-flex">
                        <p>Remove: </p>
                        <RiCloseCircleLine className="display-icon" onClick={() => setRemoveEntry(true)}/>
                    </div>
                </div>
            </div>
            <div id="list-content">
                {statementItems.length > 0 &&
                    <ListContent
                        data={statementItems}
                        listName={name}
                    />
                }
            </div>
            <div>
                <NewEntryOnList
                    show={newEntry}
                    onHide={() => setNewEntry(false)}
                    addButton={submitItem}
                    type={newEntry}
                />
                <RemoveEntryOnList
                    show={removeEntry}
                    onHide={() => setRemoveEntry(false)}
                    removeButton={removeItem}
                    data={statementItems}
                />
            </div>
        </div>
    );
};

export default List;