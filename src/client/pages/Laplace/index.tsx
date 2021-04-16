import React from 'react'
import styled from 'styled-components'
import ReactECharts from 'echarts-for-react'
import laplaceData from 'src/util/laplace-data'

interface LaplaceProps {

}

const Container = styled.div`
  
`

const Laplace = ({ }: LaplaceProps) => {
  const { data: laplaceInnerData, index } = laplaceData
  const { dimensions, measures } = laplaceInnerData
  dimensions.shift()
  const hours = dimensions
  const days = index
  const dataTemp = []

  measures[0].forEach((arr, row) => arr.forEach((val, col) => col !== 0 && dataTemp.push([measures[0].length - 1 - row, col - 1, val])))

  const data = dataTemp.map(function (item) {
    return [item[1], item[0], item[2] || '-']
  })

  const option = {
    tooltip: {
      position: 'top',
    },
    grid: {
      height: '50%',
      top: '10%',
      tooltip: {
        formatter: ({ data }) => `Retention: ${data[2]}% Cohort User Count: ${measures[1][measures[1].length - 1 - data[1]][data[0]]} User Count: ${measures[2][data[0]][data[1]]} Relative Retention: ${measures[2][data[0]][data[1]]}% Sales: ${measures[2][data[0]][data[1]]}`,
      },
    },
    xAxis: {
      type: 'category',
      data: hours,
      splitArea: {
        show: true,
      },
    },
    yAxis: {
      type: 'category',
      data: days,
      splitArea: {
        show: true,
      },
    },
    visualMap: {
      min: 0,
      max: 32,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '15%',
      inRange: {
        color: ['#fff', '#5555FF'],
      },
    },
    series: [{
      name: 'Punch Card',
      type: 'heatmap',
      data: data,
      label: {
        show: true,
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    }],
  }

  return <ReactECharts option={option} />
}

export default Laplace
