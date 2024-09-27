import React from 'react'
import { BarChart, LineChart, CartesianGrid, XAxis, Bar, Line, TooltipProps } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart' // Adjust the import path as needed

// Define the shape of our data
interface ChartData {
  month: string
  desktop: number
}

// Define the props for both chart components
interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: ChartData[]
}

const BarchartChart: React.FC<ChartProps> = ({ data, ...props }) => {
  return (
    <div {...props}>
      <ChartContainer
        config={{
          desktop: {
            label: 'Desktop',
            color: 'hsl(var(--chart-1))',
          },
        }}
        className="min-h-[300px]"
      >
        <BarChart
          accessibilityLayer
          data={
            data || [
              { month: 'January', desktop: 186 },
              { month: 'February', desktop: 305 },
              { month: 'March', desktop: 237 },
              { month: 'April', desktop: 73 },
              { month: 'May', desktop: 209 },
              { month: 'June', desktop: 214 },
            ]
          }
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value: string) => value.slice(0, 3)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}

const LinechartChart: React.FC<ChartProps> = ({ data, ...props }) => {
  return (
    <div {...props}>
      <ChartContainer
        config={{
          desktop: {
            label: 'Desktop',
            color: 'hsl(var(--chart-1))',
          },
        }}
      >
        <LineChart
          accessibilityLayer
          data={
            data || [
              { month: 'January', desktop: 186 },
              { month: 'February', desktop: 305 },
              { month: 'March', desktop: 237 },
              { month: 'April', desktop: 73 },
              { month: 'May', desktop: 209 },
              { month: 'June', desktop: 214 },
            ]
          }
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value: string) => value.slice(0, 3)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Line
            dataKey="desktop"
            type="natural"
            stroke="var(--color-desktop)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  )
}

export { BarchartChart, LinechartChart }
