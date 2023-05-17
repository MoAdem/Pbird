import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Label,
} from "recharts";

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData("00:00", 0),
  createData("03:00", 300),
  createData("06:00", 600),
  createData("09:00", 800),
  createData("12:00", 1500),
  createData("15:00", 2000),
  createData("18:00", 2400),
  createData("21:00", 2400),
];

export default function LinearChart(props) {
  const theme = useTheme();
  const { color = theme.palette.primary.main } = props;

  return (
    <ResponsiveContainer>
      <LineChart
        data={data}
        margin={{
          top: 16,
          right: 0,
          bottom: 0,
          left: -15,
        }}
      >
        <XAxis
          dataKey="time"
          stroke={theme.palette.text.secondary}
          style={theme.typography.body2}
        />
        <YAxis
          stroke={theme.palette.text.secondary}
          style={theme.typography.body2}
        >
          {/* <Label
            angle={270}
            position="left"
            style={{
              textAnchor: "middle",
              fill: theme.palette.text.primary,
              ...theme.typography.body1,
            }}
          >
            Sales ($)
          </Label> */}
        </YAxis>
        <Line
          isAnimationActive={true}
          type="monotone"
          dataKey="amount"
          stroke={color}
          dot={true}
        />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
}
