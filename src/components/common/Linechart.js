import React, { Component } from 'react'
import { Line } from "react-chartjs-2";

export class Linechart extends Component {
    render() {
        const { innerWidth: width } = window;
        
        let data = {
            labels: this.props.dayList,
            datasets: [
              {
                label: "Todo completed",//ourstat
                data: this.props.graph_data,
                fill: false,
                backgroundColor: "#6f42c1",
                borderColor: "#c09eff",
                lineTension: 0.5,
              }
            ],
          };
          
          const options = {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          };

        return (
            <div className="p-4 border mb-3 container-fluid mx-auto">
                <div className="row">
                    <div className="col-12 lineChart">
                        <Line className='' data={data} options={options} width='40px' height={ width <= 600 ? ('45vh') : ('20vh')} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Linechart
