import axios from "axios";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useRef } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

var dataSource = {
    datasets: [
        {
            data: [],
            backgroundColor: [
                '#8ab17d',
                '#588b8b',
                '#ffd5c2',
                '#f28f3b',
                '#c8553d',
                '#2d3047',
                '#93b7be',
            ],
        }
    ],
    labels: []
};

const MyChart = () => {
    axios.get('/budget.json')
    .then(res => {
        console.log(res)
        for (var i = 0; i < res.data.myBudget.length; i++) {
            dataSource.datasets[0].data[i] = res.data.myBudget[i].budget;
            dataSource.labels[i] = res.data.myBudget[i].title;
        }
    })
    .catch(err =>{
        console.log(err);
    });

    const chartStatus=useRef();
    if (chartStatus?.current) {
        chartStatus.current.chartInstance.destroy();
    } else {
        return(
            <>
                <Pie data={dataSource}/>
            </>
        )
    }
}


export default MyChart