import Statement from './Statement.js'
import Statistics from './Statistics.js'

function ListContent({ data, listName }) {

    return (
        <div>
            <div id="statement-container" className="d-flex flex-column">
                <Statement data={data}/>
            </div>
            <div id="statistics-container" className="d-flex flex-column">
                <Statistics
                    data={data}
                    listName={listName}
                />
            </div>

        </div>
    );
};

export default ListContent;