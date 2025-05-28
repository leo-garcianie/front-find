import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

const CompatibilityChart = ({ lan, blog, spa, mpa, dash, ecom }) => {
  const data = [
    { name: 'Landing', compatibilidad: lan },
    { name: 'Blog', compatibilidad: blog },
    { name: 'SPA', compatibilidad: spa },
    { name: 'MPA', compatibilidad: mpa },
    { name: 'Dashboard', compatibilidad: dash },
    { name: 'E-Commerce', compatibilidad: ecom },
  ]

  return (
    <BarChart
      width={550}
      height={150}
      data={data}
      margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
    >
      <CartesianGrid strokeDasharray="6 10" />
      <XAxis dataKey="name" />
      {/* <YAxis /> */}
      <Tooltip />
      <Bar dataKey="compatibilidad" fill="#E6FF79" />
    </BarChart>
  )
}

export default CompatibilityChart
