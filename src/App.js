import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/App.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import AddListButton from './AddListButton.js'
import RemoveListButton from './RemoveListButton.js'
import CurrentLists from './CurrentLists.js'

function App() {

    const [addList, setAddList] = useState(false);
    const [removeList, setRemoveList] = useState(false);
    const [myLists, setMyLists] = useState([]);

    const createNewList = (newListName) => {
        setMyLists([...myLists, newListName]);
    };

    const removeCurrentList = (removeListName) => {
        setMyLists(myLists.filter(item => item !== removeListName));
    };

    return (
        <div id="background">
            <div id="main-container" className="container-fluid">
                <div id="nav-container" className="d-flex justify-content-between">
                    <div id="nav-title">
                        <h1>Wallet App</h1>
                    </div>
                    <div id="nav-buttons">
                        <Button variant="primary" type="button" className="nav-button" onClick={() => setAddList(true)}>
                            Add List
                        </Button>
                        <Button variant="primary" type="button" className="nav-button" onClick={() => setRemoveList(true)}>
                            Remove List
                        </Button>
                    </div>
                </div>
                <div id="nav-windows">
                    <AddListButton
                        show={addList}
                        onHide={() => setAddList(false)}
                        createNewList={createNewList}
                        lists={myLists}
                    />
                    <RemoveListButton
                        show={removeList}
                        onHide={() => setRemoveList(false)}
                        removeCurrentList={removeCurrentList}
                        lists={myLists}
                    />
                </div>
                <div id="lists-container">
                    {myLists.length > 0 &&
                        <CurrentLists
                            data={myLists}
                        />
                    }
                </div>
            </div>
            <div id="footer-container" className="d-flex align-items-center justify-content-center">
                <p>&#169; 2021 Wallet App | A project by Victor</p>
            </div>
        </div>
    );
};

export default App;