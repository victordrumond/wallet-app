import React, { useEffect } from 'react';
import * as d3 from 'd3';

function PieChart({ plotData, type, id, ...props }) {

    let dataToPlot = [];

    for (let i = 0; i < plotData.length; i++) {

        if (plotData[i]["Type"] === type) {

            let obj = { label: plotData[i]["Category"], value: plotData[i]["Value"] }

            if (dataToPlot.filter(item => item.label === plotData[i]["Category"]).length > 0) {
                let prevValue = dataToPlot.filter(item => item.label === plotData[i]["Category"])[0].value;
                let newValue = plotData[i]["Value"];
                let indexToChange = dataToPlot.findIndex(item => item.label === plotData[i]["Category"]);
                dataToPlot[indexToChange].value = (parseFloat(prevValue) + parseFloat(newValue)).toFixed(2);
            } else {
                dataToPlot.push(obj);
            };
        };
    };
    
    const { 
        data = dataToPlot, 
        outerRadius = 120, 
        innerRadius = 0
    } = props;
    
    const margin = { top: 10, right: 40, bottom: 10, left: 40 }; 
    const width = 2 * outerRadius + margin.left + margin.right;
    const height = 2 * outerRadius + margin.top + margin.bottom;

    useEffect(() => {
        drawChart();
    });

    function drawChart() {

        // Draw the chart 
        const colorScale = d3
            .scaleSequential()
            .interpolator(d3.interpolateCool)
            .domain([0, data.length])
        ;

        // Remove the old svg
        d3.select('#' + id + '-graphic')
            .select('svg')
            .remove()
        ;

        // Create new svg
        const svg = d3
            .select('#' + id + '-graphic')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr("class", "svg-style")
            .append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`)
        ;
        const arcGenerator = d3
            .arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
        ;
        const pieGenerator = d3
            .pie()
            .padAngle(0)
            .value((d) => d.value)
        ;
        const arc = svg
            .selectAll()
            .data(pieGenerator(data))
            .enter()
        ;

        // Append sectors
        arc
            .append('path')
            .attr('d', arcGenerator)
            .style('fill', (_, i) => colorScale(i))
            .style('stroke', '#ffffff')
            .style('stroke-width', 0)
        ;

        // Append text labels
        arc
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('alignment-baseline', 'middle')
            .text(d => d.data.label)
            .style('fill', '#ffffff')
            .attr('transform', (d) => {
                const [x, y] = arcGenerator.centroid(d);
                return `translate(${x}, ${y})`;
            })
        ;
    };

    return <div id={id + '-graphic'}/>;
};

export default PieChart;