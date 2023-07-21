<template>
    <div ref="chartContainer">
        <h3 class="my-0">{{ occupancyType }} Occupancy:</h3>
        <h4 class="my-0 text-center">12 PM: Somewhat busy</h4>
        <Bar :data="chartData" :options="options" />
    </div>
</template>
  
<script>
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default {
    name: 'App',
    components: {
        Bar
    },
    props: {
        occupancyType: String
    },
    data() {
        return {
            chartData: {
                labels: ['8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5am', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm', '12am'],
                datasets: [{
                    data: [2, 3, 6, 11, 12, 11, 11, 11, 14, 15, 16, 10, 8, 9, 4, 3, 2],
                    backgroundColor: "#506FA9",
                    borderRadius: 3,
                    borderSkipped: false,
                }],

            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        }
    }
}
</script>