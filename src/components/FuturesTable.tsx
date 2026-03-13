import { useState, useMemo } from 'react';
import { ArrowUpDown, ChevronUp, ChevronDown } from 'lucide-react';
import { FuturesContract, CommodityCategory, categoryLabels, categoryIcons } from '@/data/mockData';
import { Button } from '@/components/ui/button';

interface FuturesTableProps {
  data: FuturesContract[];
  onSelect: (contract: FuturesContract) => void;
  selected?: string;
}

type SortKey = keyof FuturesContract;

const FuturesTable = ({ data, onSelect, selected }: FuturesTableProps) => {
  const [category, setCategory] = useState<CommodityCategory | 'all'>('all');
  const [sortKey, setSortKey] = useState<SortKey>('symbol');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let result = data;
    if (category !== 'all') result = result.filter(c => c.category === category);
    if (search) result = result.filter(c =>
      c.symbol.toLowerCase().includes(search.toLowerCase()) ||
      c.name.toLowerCase().includes(search.toLowerCase())
    );
    result.sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey];
      if (typeof av === 'number' && typeof bv === 'number') return sortDir === 'asc' ? av - bv : bv - av;
      return sortDir === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
    });
    return result;
  }, [data, category, search, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ArrowUpDown className="h-3 w-3 opacity-30" />;
    return sortDir === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />;
  };

  const categories: (CommodityCategory | 'all')[] = ['all', 'energy', 'metals', 'agriculture'];

  const formatNum = (n: number, decimals = 2) => n.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  const formatVol = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 px-3 py-2 border-b">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
              category === cat
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            }`}
          >
            {cat === 'all' ? '📊 All' : `${categoryIcons[cat]} ${categoryLabels[cat]}`}
          </button>
        ))}
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="ml-auto text-xs bg-secondary border border-border rounded px-2 py-1 w-36 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
        />
      </div>
      <div className="flex-1 overflow-auto scrollbar-thin">
        <table className="w-full text-xs">
          <thead className="sticky top-0 bg-header z-10">
            <tr className="border-b">
              {[
                { key: 'symbol' as SortKey, label: 'Symbol' },
                { key: 'name' as SortKey, label: 'Name' },
                { key: 'lastPrice' as SortKey, label: 'Last' },
                { key: 'change' as SortKey, label: 'Chg' },
                { key: 'changePercent' as SortKey, label: 'Chg%' },
                { key: 'bid' as SortKey, label: 'Bid' },
                { key: 'ask' as SortKey, label: 'Ask' },
                { key: 'volume' as SortKey, label: 'Vol' },
                { key: 'openInterest' as SortKey, label: 'OI' },
                { key: 'high' as SortKey, label: 'High' },
                { key: 'low' as SortKey, label: 'Low' },
              ].map(({ key, label }) => (
                <th key={key} className="px-2 py-2 text-left font-medium text-muted-foreground">
                  <button onClick={() => toggleSort(key)} className="flex items-center gap-1 hover:text-foreground">
                    {label} <SortIcon col={key} />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(contract => (
              <tr
                key={contract.symbol}
                onClick={() => onSelect(contract)}
                className={`border-b border-border/50 cursor-pointer transition-colors hover:bg-secondary/50 ${
                  selected === contract.symbol ? 'bg-primary/10' : ''
                }`}
              >
                <td className="px-2 py-1.5 font-mono font-semibold text-accent">{contract.symbol}</td>
                <td className="px-2 py-1.5">{contract.name}</td>
                <td className="px-2 py-1.5 font-mono font-medium">{formatNum(contract.lastPrice)}</td>
                <td className={`px-2 py-1.5 font-mono ${contract.change >= 0 ? 'text-gain' : 'text-loss'}`}>
                  {contract.change >= 0 ? '+' : ''}{formatNum(contract.change)}
                </td>
                <td className={`px-2 py-1.5 font-mono ${contract.changePercent >= 0 ? 'text-gain' : 'text-loss'}`}>
                  <span className={`px-1 py-0.5 rounded text-[10px] ${contract.changePercent >= 0 ? 'bg-gain/10' : 'bg-loss/10'}`}>
                    {contract.changePercent >= 0 ? '+' : ''}{formatNum(contract.changePercent)}%
                  </span>
                </td>
                <td className="px-2 py-1.5 font-mono text-muted-foreground">{formatNum(contract.bid)}</td>
                <td className="px-2 py-1.5 font-mono text-muted-foreground">{formatNum(contract.ask)}</td>
                <td className="px-2 py-1.5 font-mono text-muted-foreground">{formatVol(contract.volume)}</td>
                <td className="px-2 py-1.5 font-mono text-muted-foreground">{formatVol(contract.openInterest)}</td>
                <td className="px-2 py-1.5 font-mono text-muted-foreground">{formatNum(contract.high)}</td>
                <td className="px-2 py-1.5 font-mono text-muted-foreground">{formatNum(contract.low)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FuturesTable;
