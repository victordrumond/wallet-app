import './assets/css/Statistics.css';
import PieChart from './PieChart.js';

function Statistics({ data, listName }) {

    const calcTotal = (arg) => {

        let total = 0;
        let entries = [];

        if (arg === "income") {
            entries = data.filter(item => item["Type"] === "income");
        } else if (arg === "expense") {
            entries = data.filter(item => item["Type"] === "expense");
        };

        entries.forEach(item => total += parseFloat(item["Value"]));
        return total.toFixed(2);
    };

    const calcPercentage = () => {

        let totalIncome = parseFloat(calcTotal("income"));
        let totalExpenses = parseFloat(calcTotal("expense"));
        let result = (totalExpenses*100/totalIncome);

        return result.toFixed(0);
    };

    return (
        <div id="statistics-wrapper">
            <h4 id="stats-title">Statistics</h4>
            <p>The total income is $ {calcTotal("income")} and the total expenses are $ {calcTotal("expense")}.</p>
            {calcPercentage() !== "Infinity" &&
                <p>Expenses represent {calcPercentage()}% of the income.</p>
            }
            <div id="chart-box" className="d-flex justify-content-between">
                <div>
                    <p>Income distribution</p>
                    <PieChart
                        plotData={data}
                        type="income"
                        id={listName + "-income"}
                    />
                </div>
                <div>
                    <p>Expenses distribution</p>
                    <PieChart
                        plotData={data}
                        type="expense"
                        id={listName + "-expense"}
                    />
                </div>
            </div>
        </div>
    );
};

export default Statistics;