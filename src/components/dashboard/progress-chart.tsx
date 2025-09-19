
'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const data = [
  {
    name: 'Jan',
    total: Math.floor(Math.random() * 5) + 1,
  },
  {
    name: 'Feb',
    total: Math.floor(Math.random() * 5) + 1,
  },
  {
    name: 'Mar',
    total: Math.floor(Math.random() * 5) + 1,
  },
  {
    name: 'Apr',
    total: Math.floor(Math.random() * 5) + 1,
  },
  {
    name: 'May',
    total: Math.floor(Math.random() * 5) + 1,
  },
  {
    name: 'Jun',
    total: Math.floor(Math.random() * 5) + 1,
  },
  {
    name: 'Jul',
    total: Math.floor(Math.random() * 5) + 1,
  },
  {
    name: 'Aug',
    total: Math.floor(Math.random() * 5) + 1,
  },
  {
    name: 'Sep',
    total: Math.floor(Math.random() * 5) + 1,
  },
  {
    name: 'Oct',
    total: Math.floor(Math.random() * 5) + 1,
  },
  {
    name: 'Nov',
    total: Math.floor(Math.random() * 5) + 1,
  },
  {
    name: 'Dec',
    total: Math.floor(Math.random() * 5) + 1,
  },
];

export function ProgressChart() {
  return (
    <Card>
        <CardHeader>
            <CardTitle>Lessons Completed</CardTitle>
            <CardDescription>Your learning activity over the past year.</CardDescription>
        </CardHeader>
        <CardContent>
            <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <XAxis
                dataKey="name"
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
                tickFormatter={(value) => `${value}`}
                />
                <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
  );
}
