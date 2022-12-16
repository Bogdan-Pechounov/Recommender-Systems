import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import PageHeader from 'components/page-header/PageHeader'

ChartJS.defaults.color = 'white'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
}

const json = {
  0: 248.9572264931668,
  1: 248.9731168205435,
  2: 184.42888609578768,
  3: -125.81226693620192,
  4: -244.8049265455229,
  5: 205.90662792755757,
  6: 312.53913794450546,
  7: 535.0746113526402,
  8: -135.32167092624877,
  9: -313.07304921665127,
}
const labels = Object.keys(json).map((k) => `Feature ${k}`)

export const data = {
  labels,
  datasets: [
    {
      label: 'Adventure',
      data: Object.values(json),
      backgroundColor: 'rgb(1, 160, 249)',
    },
  ],
}

export default function GenresPage() {
  return (
    <>
      <PageHeader />
      <h1 style={{ textAlign: 'center' }}>Adventure</h1>
      <Bar options={options} data={data} />
    </>
  )
}
