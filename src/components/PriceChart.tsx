import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { generatePriceHistory } from '@/data/mockData';

interface PriceChartProps {
  symbol: string;
  name: string;
  basePrice: number;
}

const PriceChart = ({ symbol, name, basePrice }: PriceChartProps) => {
  const data = useMemo(() => generatePriceHistory(basePrice, 90), [basePrice]);

  const first = data[0]?.close ?? 0;
  const last = data[data.length - 1]?.close ?? 0;
  const change = last - first;
  const changePct = first ? (change / first) * 100 : 0;
  const isPositive = change >= 0;

  const minPrice = Math.min(...data.map(d => d.low));
  const maxPrice = Math.max(...data.map(d => d.high));
  const padding = (maxPrice - minPrice) * 0.05;

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm font-bold text-accent">{symbol}</span>
          <span className="text-xs text-muted-foreground">{name}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm font-bold">{last.toFixed(2)}</span>
          <span className={`font-mono text-xs px-1.5 py-0.5 rounded ${isPositive ? 'text-gain bg-gain/10' : 'text-loss bg-loss/10'}`}>
            {isPositive ? '+' : ''}{change.toFixed(2)} ({isPositive ? '+' : ''}{changePct.toFixed(2)}%)
          </span>
        </div>
      </div>
      <div className="flex-1 p-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <defs>
              <linearGradient id={`gradient-${symbol}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={isPositive ? 'hsl(160, 60%, 45%)' : 'hsl(0, 70%, 55%)'} stopOpacity={0.3} />
                <stop offset="100%" stopColor={isPositive ? 'hsl(160, 60%, 45%)' : 'hsl(0, 70%, 55%)'} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 18%)" />
            <XAxis
              dataKey="date"
              tick={{ fill: 'hsl(215, 12%, 50%)', fontSize: 10, fontFamily: 'var(--font-mono)' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v: string) => {
                const d = new Date(v);
                return `${d.getMonth() + 1}/${d.getDate()}`;
              }}
              interval={Math.floor(data.length / 6)}
            />
            <YAxis
              domain={[minPrice - padding, maxPrice + padding]}
              tick={{ fill: 'hsl(215, 12%, 50%)', fontSize: 10, fontFamily: 'var(--font-mono)' }}
              tickLine={false}
              axisLine={false}
              width={55}
              tickFormatter={(v: number) => v.toFixed(2)}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(220, 18%, 12%)',
                border: '1px solid hsl(220, 15%, 18%)',
                borderRadius: '6px',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
              }}
              labelStyle={{ color: 'hsl(210, 20%, 90%)' }}
              itemStyle={{ color: isPositive ? 'hsl(160, 60%, 45%)' : 'hsl(0, 70%, 55%)' }}
            />
            <Area
              type="monotone"
              dataKey="close"
              stroke={isPositive ? 'hsl(160, 60%, 45%)' : 'hsl(0, 70%, 55%)'}
              strokeWidth={1.5}
              fill={`url(#gradient-${symbol})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PriceChart;
