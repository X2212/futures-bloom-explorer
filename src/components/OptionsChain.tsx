import { useMemo } from 'react';
import { OptionContract } from '@/data/mockData';

interface OptionsChainProps {
  options: OptionContract[];
  underlyingPrice: number;
}

const OptionsChain = ({ options, underlyingPrice }: OptionsChainProps) => {
  const { calls, puts, strikes } = useMemo(() => {
    const callMap = new Map<number, OptionContract>();
    const putMap = new Map<number, OptionContract>();
    options.forEach(o => {
      if (o.type === 'call') callMap.set(o.strike, o);
      else putMap.set(o.strike, o);
    });
    const allStrikes = [...new Set(options.map(o => o.strike))].sort((a, b) => a - b);
    return { calls: callMap, puts: putMap, strikes: allStrikes };
  }, [options]);

  const fmt = (n: number, d = 2) => n.toFixed(d);
  const fmtVol = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n);

  const ColHeader = ({ children, align = 'right' }: { children: React.ReactNode; align?: string }) => (
    <th className={`px-1.5 py-1.5 text-[10px] font-medium text-muted-foreground uppercase tracking-wider ${align === 'right' ? 'text-right' : 'text-left'}`}>
      {children}
    </th>
  );

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2 border-b flex items-center justify-between">
        <span className="text-xs font-medium">Options Chain</span>
        <span className="font-mono text-xs text-muted-foreground">
          Underlying: <span className="text-foreground font-semibold">{fmt(underlyingPrice)}</span>
        </span>
      </div>
      <div className="flex-1 overflow-auto scrollbar-thin">
        <table className="w-full text-[11px]">
          <thead className="sticky top-0 bg-header z-10">
            <tr className="border-b">
              <th colSpan={8} className="px-2 py-1 text-center text-[10px] font-semibold text-gain uppercase tracking-widest border-r">
                Calls
              </th>
              <ColHeader align="center">Strike</ColHeader>
              <th colSpan={8} className="px-2 py-1 text-center text-[10px] font-semibold text-loss uppercase tracking-widest border-l">
                Puts
              </th>
            </tr>
            <tr className="border-b">
              <ColHeader>IV</ColHeader>
              <ColHeader>Delta</ColHeader>
              <ColHeader>Gamma</ColHeader>
              <ColHeader>Theta</ColHeader>
              <ColHeader>Vega</ColHeader>
              <ColHeader>Bid</ColHeader>
              <ColHeader>Ask</ColHeader>
              <ColHeader>Vol</ColHeader>
              <th className="px-2 py-1.5 text-center text-[10px] font-bold text-accent">Strike</th>
              <ColHeader align="left">Bid</ColHeader>
              <ColHeader align="left">Ask</ColHeader>
              <ColHeader align="left">Vol</ColHeader>
              <ColHeader align="left">IV</ColHeader>
              <ColHeader align="left">Delta</ColHeader>
              <ColHeader align="left">Gamma</ColHeader>
              <ColHeader align="left">Theta</ColHeader>
              <ColHeader align="left">Vega</ColHeader>
            </tr>
          </thead>
          <tbody>
            {strikes.map(strike => {
              const call = calls.get(strike);
              const put = puts.get(strike);
              const itm = strike < underlyingPrice;
              const itmPut = strike > underlyingPrice;
              const atm = Math.abs(strike - underlyingPrice) / underlyingPrice < 0.01;

              return (
                <tr
                  key={strike}
                  className={`border-b border-border/30 hover:bg-secondary/30 transition-colors ${atm ? 'bg-accent/5' : ''}`}
                >
                  {call ? (
                    <>
                      <td className={`px-1.5 py-1 text-right font-mono ${itm ? 'bg-gain/10' : ''}`}>{fmt(call.iv, 1)}%</td>
                      <td className={`px-1.5 py-1 text-right font-mono ${itm ? 'bg-gain/10' : ''}`}>{fmt(call.delta, 3)}</td>
                      <td className={`px-1.5 py-1 text-right font-mono ${itm ? 'bg-gain/10' : ''}`}>{fmt(call.gamma, 4)}</td>
                      <td className={`px-1.5 py-1 text-right font-mono ${itm ? 'bg-gain/10' : ''}`}>{fmt(call.theta, 4)}</td>
                      <td className={`px-1.5 py-1 text-right font-mono ${itm ? 'bg-gain/10' : ''}`}>{fmt(call.vega, 4)}</td>
                      <td className={`px-1.5 py-1 text-right font-mono ${itm ? 'bg-gain/10' : ''}`}>{fmt(call.bid)}</td>
                      <td className={`px-1.5 py-1 text-right font-mono ${itm ? 'bg-gain/10' : ''}`}>{fmt(call.ask)}</td>
                      <td className={`px-1.5 py-1 text-right font-mono text-muted-foreground ${itm ? 'bg-gain/10' : ''} border-r`}>{fmtVol(call.volume)}</td>
                    </>
                  ) : (
                    <td colSpan={8} className="border-r" />
                  )}
                  <td className={`px-2 py-1 text-center font-mono font-bold ${atm ? 'text-accent' : 'text-foreground'}`}>
                    {fmt(strike)}
                  </td>
                  {put ? (
                    <>
                      <td className={`px-1.5 py-1 text-right font-mono border-l ${itmPut ? 'bg-loss/10' : ''}`}>{fmt(put.bid)}</td>
                      <td className={`px-1.5 py-1 text-right font-mono ${itmPut ? 'bg-loss/10' : ''}`}>{fmt(put.ask)}</td>
                      <td className={`px-1.5 py-1 text-right font-mono text-muted-foreground ${itmPut ? 'bg-loss/10' : ''}`}>{fmtVol(put.volume)}</td>
                      <td className={`px-1.5 py-1 text-right font-mono ${itmPut ? 'bg-loss/10' : ''}`}>{fmt(put.iv, 1)}%</td>
                      <td className={`px-1.5 py-1 text-right font-mono ${itmPut ? 'bg-loss/10' : ''}`}>{fmt(put.delta, 3)}</td>
                      <td className={`px-1.5 py-1 text-right font-mono ${itmPut ? 'bg-loss/10' : ''}`}>{fmt(put.gamma, 4)}</td>
                      <td className={`px-1.5 py-1 text-right font-mono ${itmPut ? 'bg-loss/10' : ''}`}>{fmt(put.theta, 4)}</td>
                      <td className={`px-1.5 py-1 text-right font-mono ${itmPut ? 'bg-loss/10' : ''}`}>{fmt(put.vega, 4)}</td>
                    </>
                  ) : (
                    <td colSpan={8} className="border-l" />
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OptionsChain;
