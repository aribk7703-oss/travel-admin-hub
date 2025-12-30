import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Calendar } from "lucide-react";

const data = [
  { date: "12/28", revenue: 0, earning: 0 },
  { date: "12/29", revenue: 0, earning: 0 },
  { date: "12/30", revenue: 0, earning: 0 },
];

export const EarningChart = () => {
  return (
    <Card className="shadow-card hover:shadow-card-hover transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold text-foreground">
          Earning Statistics
        </CardTitle>
        <Button variant="outline" size="sm" className="gap-2 text-sm">
          <Calendar className="h-4 w-4" />
          <span className="hidden sm:inline">December 28, 2025 - December 30, 2025</span>
          <span className="sm:hidden">Select Date</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="date"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `₹${value}`}
                domain={[0, 1]}
                ticks={[0, 0.2, 0.4, 0.6, 0.8, 1.0]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Legend
                verticalAlign="top"
                height={36}
                formatter={(value) => (
                  <span className="text-sm text-muted-foreground">{value}</span>
                )}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                name="Total Revenue"
                stroke="hsl(var(--stat-teal))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--stat-teal))", strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="earning"
                name="Total Earning"
                stroke="hsl(var(--stat-pink))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--stat-pink))", strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {data.every((d) => d.revenue === 0 && d.earning === 0) && (
          <p className="text-center text-sm text-muted-foreground mt-2">
            No earnings data available for the selected period
          </p>
        )}
      </CardContent>
    </Card>
  );
};
