import './assets/css/Statement.css';
import Table from "react-bootstrap/Table";

function Statement({ data }) {

    return (
        <div id="statement-wrapper">
            <p id="table-title">Statement</p>
            <Table id="table-content">
                <tbody>
                    <tr>
                        {Object.keys(data[0]).map((key, i) => {
                            if (key !== "Type") {
                                return (
                                    <th key={i}>
                                        {key}
                                    </th>
                                );
                            } else {
                                return null;
                            };
                        })}
                    </tr>
                    {data.map((item, i) => (
                        <tr key={i} className={item["Type"]}>
                            <td>{item["#"]}</td>
                            <td>{item["Description"]}</td>
                            <td>{item["Value"]}</td>
                            <td>{item["Date"]}</td>
                            <td>{item["Category"]}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Statement;