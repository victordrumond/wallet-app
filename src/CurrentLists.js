import './assets/css/CurrentLists.css';
import List from './List.js'
import Accordion from 'react-bootstrap/Accordion'

function CurrentLists({ data }) {

    return (
        <div>
            {data.map((item) => (
                <Accordion defaultActiveKey="0" key={item}>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>{item}</Accordion.Header>
                        <Accordion.Body>
                            <List name={item.replace(/\s/g, "-")}/>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            ))}
        </div>
    );
};

export default CurrentLists;