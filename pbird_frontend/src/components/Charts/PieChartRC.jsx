import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { ResponsiveContainer, PieChart, Pie, Tooltip } from "recharts";

const data02 = [
  {
    name: "Group A",
    value: 2400,
  },
  {
    name: "Group B",
    value: 4567,
  },
  {
    name: "Group C",
    value: 1398,
  },
  {
    name: "Group D",
    value: 9800,
  },
  {
    name: "Group E",
    value: 3908,
  },
  {
    name: "Group F",
    value: 4800,
  },
];

export default function PieChart2(props) {
  const theme = useTheme();
  const { color = theme.palette.primary.main } = props;

  return (
    <ResponsiveContainer>
      <PieChart width={730} height={250}>
        <Pie
          data={data02}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill={color}
          label
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
