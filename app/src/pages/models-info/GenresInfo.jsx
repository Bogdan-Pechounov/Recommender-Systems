import React, { useEffect, useState } from 'react'
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
import recommender from 'api/recommender'

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

export default function GenresInfo({ genresInfo }) {
  if (!genresInfo) return

  function getData(genre, features) {
    const labels = Object.keys(features).map((k) => `Feature ${k}`)
    return {
      labels,
      datasets: [
        {
          label: genre,
          data: Object.values(features),
          backgroundColor: 'rgb(1, 160, 249)',
        },
      ],
    }
  }
  return (
    <>
      <div className='chart-container'>
        {Object.entries(genresInfo).map(([genre, { count, features }]) => (
          <div key={genre}>
            <div>
              <h1 style={{ textAlign: 'center' }}>{`${genre} (${count})`}</h1>
              <Bar options={options} data={getData(genre, features)} />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
