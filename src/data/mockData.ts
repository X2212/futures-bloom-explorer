export type CommodityCategory = 'energy' | 'metals' | 'agriculture';

export interface FuturesContract {
  symbol: string;
  name: string;
  category: CommodityCategory;
  exchange: string;
  expiry: string;
  lastPrice: number;
  change: number;
  changePercent: number;
  bid: number;
  ask: number;
  volume: number;
  openInterest: number;
  high: number;
  low: number;
  open: number;
  prevClose: number;
}

export interface OptionContract {
  symbol: string;
  underlying: string;
  type: 'call' | 'put';
  strike: number;
  expiry: string;
  lastPrice: number;
  bid: number;
  ask: number;
  volume: number;
  openInterest: number;
  iv: number;
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
}

export interface PricePoint {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export const futuresData: FuturesContract[] = [
  { symbol: 'CLZ5', name: 'WTI Crude Oil', category: 'energy', exchange: 'NYMEX', expiry: '2025-12-19', lastPrice: 72.45, change: 1.23, changePercent: 1.73, bid: 72.44, ask: 72.46, volume: 342891, openInterest: 289432, high: 73.10, low: 71.05, open: 71.22, prevClose: 71.22 },
  { symbol: 'NGZ5', name: 'Natural Gas', category: 'energy', exchange: 'NYMEX', expiry: '2025-12-29', lastPrice: 3.245, change: -0.087, changePercent: -2.61, bid: 3.244, ask: 3.246, volume: 198234, openInterest: 156789, high: 3.350, low: 3.210, open: 3.332, prevClose: 3.332 },
  { symbol: 'BZZ5', name: 'Brent Crude', category: 'energy', exchange: 'NYMEX', expiry: '2025-11-28', lastPrice: 76.82, change: 0.95, changePercent: 1.25, bid: 76.81, ask: 76.83, volume: 234567, openInterest: 198765, high: 77.30, low: 75.80, open: 75.87, prevClose: 75.87 },
  { symbol: 'HOZ5', name: 'Heating Oil', category: 'energy', exchange: 'NYMEX', expiry: '2025-11-28', lastPrice: 2.3456, change: 0.0234, changePercent: 1.01, bid: 2.3454, ask: 2.3458, volume: 87654, openInterest: 67890, high: 2.3600, low: 2.3100, open: 2.3222, prevClose: 2.3222 },
  { symbol: 'RBZ5', name: 'RBOB Gasoline', category: 'energy', exchange: 'NYMEX', expiry: '2025-11-28', lastPrice: 2.1234, change: -0.0156, changePercent: -0.73, bid: 2.1232, ask: 2.1236, volume: 65432, openInterest: 54321, high: 2.1500, low: 2.1100, open: 2.1390, prevClose: 2.1390 },
  { symbol: 'GCZ5', name: 'Gold', category: 'metals', exchange: 'COMEX', expiry: '2025-12-29', lastPrice: 2645.30, change: 18.50, changePercent: 0.70, bid: 2645.20, ask: 2645.40, volume: 178923, openInterest: 432156, high: 2658.00, low: 2622.00, open: 2626.80, prevClose: 2626.80 },
  { symbol: 'SIZ5', name: 'Silver', category: 'metals', exchange: 'COMEX', expiry: '2025-12-29', lastPrice: 31.245, change: 0.435, changePercent: 1.41, bid: 31.240, ask: 31.250, volume: 89234, openInterest: 134567, high: 31.500, low: 30.750, open: 30.810, prevClose: 30.810 },
  { symbol: 'HGZ5', name: 'Copper', category: 'metals', exchange: 'COMEX', expiry: '2025-12-29', lastPrice: 4.2345, change: -0.0567, changePercent: -1.32, bid: 4.2340, ask: 4.2350, volume: 56789, openInterest: 98765, high: 4.3000, low: 4.2100, open: 4.2912, prevClose: 4.2912 },
  { symbol: 'PLF6', name: 'Platinum', category: 'metals', exchange: 'NYMEX', expiry: '2026-01-28', lastPrice: 985.40, change: 12.30, changePercent: 1.26, bid: 985.20, ask: 985.60, volume: 23456, openInterest: 45678, high: 990.00, low: 970.00, open: 973.10, prevClose: 973.10 },
  { symbol: 'PAH6', name: 'Palladium', category: 'metals', exchange: 'NYMEX', expiry: '2026-03-27', lastPrice: 1023.50, change: -8.70, changePercent: -0.84, bid: 1023.00, ask: 1024.00, volume: 12345, openInterest: 23456, high: 1040.00, low: 1018.00, open: 1032.20, prevClose: 1032.20 },
  { symbol: 'ZCZ5', name: 'Corn', category: 'agriculture', exchange: 'CBOT', expiry: '2025-12-14', lastPrice: 485.25, change: 3.75, changePercent: 0.78, bid: 485.00, ask: 485.50, volume: 234567, openInterest: 567890, high: 489.00, low: 480.00, open: 481.50, prevClose: 481.50 },
  { symbol: 'ZWZ5', name: 'Wheat', category: 'agriculture', exchange: 'CBOT', expiry: '2025-12-14', lastPrice: 612.50, change: -5.25, changePercent: -0.85, bid: 612.25, ask: 612.75, volume: 145678, openInterest: 345678, high: 620.00, low: 608.00, open: 617.75, prevClose: 617.75 },
  { symbol: 'ZSF6', name: 'Soybeans', category: 'agriculture', exchange: 'CBOT', expiry: '2026-01-14', lastPrice: 1324.75, change: 8.50, changePercent: 0.65, bid: 1324.50, ask: 1325.00, volume: 167890, openInterest: 289012, high: 1330.00, low: 1312.00, open: 1316.25, prevClose: 1316.25 },
  { symbol: 'SBH6', name: 'Sugar #11', category: 'agriculture', exchange: 'ICE', expiry: '2026-02-28', lastPrice: 22.45, change: -0.32, changePercent: -1.41, bid: 22.44, ask: 22.46, volume: 98765, openInterest: 178901, high: 22.90, low: 22.30, open: 22.77, prevClose: 22.77 },
  { symbol: 'KCH6', name: 'Coffee C', category: 'agriculture', exchange: 'ICE', expiry: '2026-03-20', lastPrice: 245.35, change: 4.85, changePercent: 2.02, bid: 245.30, ask: 245.40, volume: 45678, openInterest: 123456, high: 248.00, low: 239.00, open: 240.50, prevClose: 240.50 },
  { symbol: 'CTH6', name: 'Cotton #2', category: 'agriculture', exchange: 'ICE', expiry: '2026-03-06', lastPrice: 78.92, change: -0.45, changePercent: -0.57, bid: 78.90, ask: 78.94, volume: 34567, openInterest: 89012, high: 79.80, low: 78.50, open: 79.37, prevClose: 79.37 },
];

export function generateOptionsChain(underlying: string, basePrice: number): OptionContract[] {
  const strikes = [];
  const step = basePrice > 1000 ? 25 : basePrice > 100 ? 5 : basePrice > 10 ? 1 : 0.25;
  const center = Math.round(basePrice / step) * step;
  for (let i = -6; i <= 6; i++) {
    strikes.push(+(center + i * step).toFixed(2));
  }
  
  const expiry = '2025-12-19';
  const options: OptionContract[] = [];

  strikes.forEach(strike => {
    const moneyness = (basePrice - strike) / basePrice;
    const baseIV = 0.25 + Math.abs(moneyness) * 0.15 + Math.random() * 0.05;
    
    // Call
    const callIntrinsic = Math.max(0, basePrice - strike);
    const callTimeValue = basePrice * baseIV * 0.1 * Math.max(0.1, 1 - Math.abs(moneyness) * 3);
    const callPrice = +(callIntrinsic + callTimeValue).toFixed(2);
    const callDelta = +(0.5 + 0.5 * Math.tanh(moneyness * 8)).toFixed(4);

    options.push({
      symbol: `${underlying} C${strike}`,
      underlying,
      type: 'call',
      strike,
      expiry,
      lastPrice: callPrice,
      bid: +(callPrice - step * 0.02).toFixed(2),
      ask: +(callPrice + step * 0.02).toFixed(2),
      volume: Math.floor(Math.random() * 5000) + 100,
      openInterest: Math.floor(Math.random() * 20000) + 500,
      iv: +(baseIV * 100).toFixed(1),
      delta: callDelta,
      gamma: +(0.01 * Math.exp(-moneyness * moneyness * 20)).toFixed(4),
      theta: +(-(basePrice * baseIV * 0.002) * Math.exp(-moneyness * moneyness * 10)).toFixed(4),
      vega: +(basePrice * 0.01 * Math.exp(-moneyness * moneyness * 10)).toFixed(4),
    });

    // Put
    const putIntrinsic = Math.max(0, strike - basePrice);
    const putTimeValue = basePrice * baseIV * 0.1 * Math.max(0.1, 1 - Math.abs(moneyness) * 3);
    const putPrice = +(putIntrinsic + putTimeValue).toFixed(2);
    const putDelta = +(callDelta - 1).toFixed(4);

    options.push({
      symbol: `${underlying} P${strike}`,
      underlying,
      type: 'put',
      strike,
      expiry,
      lastPrice: putPrice,
      bid: +(putPrice - step * 0.02).toFixed(2),
      ask: +(putPrice + step * 0.02).toFixed(2),
      volume: Math.floor(Math.random() * 4000) + 80,
      openInterest: Math.floor(Math.random() * 18000) + 400,
      iv: +(baseIV * 100 + Math.random() * 2).toFixed(1),
      delta: putDelta,
      gamma: +(0.01 * Math.exp(-moneyness * moneyness * 20)).toFixed(4),
      theta: +(-(basePrice * baseIV * 0.002) * Math.exp(-moneyness * moneyness * 10)).toFixed(4),
      vega: +(basePrice * 0.01 * Math.exp(-moneyness * moneyness * 10)).toFixed(4),
    });
  });

  return options;
}

export function generatePriceHistory(basePrice: number, days: number = 90): PricePoint[] {
  const data: PricePoint[] = [];
  let price = basePrice * 0.92;
  const now = new Date();

  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    if (date.getDay() === 0 || date.getDay() === 6) continue;

    const volatility = 0.02;
    const change = (Math.random() - 0.48) * volatility * price;
    const open = price;
    const close = +(price + change).toFixed(2);
    const high = +(Math.max(open, close) + Math.random() * volatility * price * 0.5).toFixed(2);
    const low = +(Math.min(open, close) - Math.random() * volatility * price * 0.5).toFixed(2);
    price = close;

    data.push({
      date: date.toISOString().split('T')[0],
      open: +open.toFixed(2),
      high,
      low,
      close,
      volume: Math.floor(Math.random() * 200000) + 50000,
    });
  }
  return data;
}

export const categoryLabels: Record<CommodityCategory, string> = {
  energy: 'Energy',
  metals: 'Metals',
  agriculture: 'Agriculture',
};

export const categoryIcons: Record<CommodityCategory, string> = {
  energy: '⚡',
  metals: '🔩',
  agriculture: '🌾',
};
