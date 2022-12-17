import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { Radar } from 'react-chartjs-2'

ChartJS.defaults.borderColor = 'white'
ChartJS.defaults.scale.ticks.backdropColor = 'black'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

export default function FeaturesChart({ features }) {
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
    },
  }

  return (
    <Radar
      options={options}
      data={{
        labels: Object.keys(features),
        datasets: [
          {
            data: Object.values(features),
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
          },
        ],
      }}
    />
  )
}
