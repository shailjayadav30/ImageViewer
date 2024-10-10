import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface StatisticsChartProps {
  data: {
    category: string;
    count: number;
    percentage: number;
  }[];
}

const StatisticsChart: React.FC<StatisticsChartProps> = ({ data }) => (
  <ResponsiveContainer width="100%" height={200}>
    <BarChart data={data}>
      <XAxis dataKey="category" angle={-45} textAnchor="end" height={70} />
      <YAxis />
      <Tooltip />
      <Bar dataKey="percentage" fill="#4f46e5" />
    </BarChart>
  </ResponsiveContainer>
);

export default StatisticsChart;
