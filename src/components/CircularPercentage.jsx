import React from 'react'
import { PieChart, Pie, Cell, Tooltip } from 'recharts'

const CircularPercentage = ({ percentage }) => {
  const data = [
    { name: 'Accuracy', value: percentage },
    { name: 'Not-Accuracy', value: 100 - percentage },
  ]

  const COLORS = ['#E6FF79', 'rgba(255, 255, 255, 0.8)']

  return (
    <PieChart width={170} height={170}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        startAngle={90}
        endAngle={-270}
        paddingAngle={2}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  )
}

export default CircularPercentage
