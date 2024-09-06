import { useRef, useEffect } from 'react'
import * as d3 from 'd3'

const Chart = ({data, labels}) => {
  const svgRef = useRef()

  useEffect(() => {
    if(!data || !labels) return

    console.log('starting plot')
    const margin = { top: 20, right: 30, bottom: 50, left: 50 };
    const width = 800 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    // Clear previous SVG elements
    d3.select(svgRef.current).selectAll("*").remove();

    // Set up scales for X and Y axes
    const xScale = d3.scaleLinear()
      .domain([d3.min(data, d => d[0]), d3.max(data, d => d[0])])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([d3.min(data, d => d[1]), d3.max(data, d => d[1])])
      .range([height, 0]);

    // Set up color scale for clusters
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    // Create an SVG element
    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Add X axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

    // Add Y axis
    svg.append('g')
      .call(d3.axisLeft(yScale));

    // Add circles for each data point
    svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d[0]))
      .attr('cy', d => yScale(d[1]))
      .attr('r', 5)
      .attr('fill', (_, i) => colorScale(labels[i]));

  }, [data, labels])

  return (
    <svg ref={svgRef}></svg>
  )
}
export default Chart