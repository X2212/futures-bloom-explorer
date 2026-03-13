import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, Grid3X3, TrendingUp } from 'lucide-react';
import DashboardHeader from '@/components/DashboardHeader';
import FuturesTable from '@/components/FuturesTable';
import OptionsChain from '@/components/OptionsChain';
import PriceChart from '@/components/PriceChart';
import SettingsPanel from '@/components/SettingsPanel';
import { futuresData, generateOptionsChain, FuturesContract } from '@/data/mockData';

const Index = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState<FuturesContract>(futuresData[0]);
  const [activeTab, setActiveTab] = useState('futures');

  const options = useMemo(
    () => generateOptionsChain(selectedContract.symbol, selectedContract.lastPrice),
    [selectedContract]
  );

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <DashboardHeader connected={false} onSettingsClick={() => setSettingsOpen(true)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Contract info bar */}
        <div className="bg-surface-elevated border-b px-4 py-1.5 flex items-center gap-4">
          <span className="font-mono text-sm font-bold text-accent">{selectedContract.symbol}</span>
          <span className="text-xs text-muted-foreground">{selectedContract.name}</span>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground">{selectedContract.exchange}</span>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="font-mono text-sm font-semibold">{selectedContract.lastPrice.toFixed(2)}</span>
          <span className={`font-mono text-xs px-1.5 py-0.5 rounded ${
            selectedContract.change >= 0 ? 'text-gain bg-gain/10' : 'text-loss bg-loss/10'
          }`}>
            {selectedContract.change >= 0 ? '+' : ''}{selectedContract.change.toFixed(2)} ({selectedContract.changePercent >= 0 ? '+' : ''}{selectedContract.changePercent.toFixed(2)}%)
          </span>
          <div className="ml-auto flex items-center gap-3 text-[10px] text-muted-foreground font-mono">
            <span>H: {selectedContract.high.toFixed(2)}</span>
            <span>L: {selectedContract.low.toFixed(2)}</span>
            <span>V: {selectedContract.volume.toLocaleString()}</span>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent px-2 h-9">
            <TabsTrigger value="futures" className="text-xs gap-1.5 data-[state=active]:bg-secondary rounded-sm">
              <BarChart3 className="h-3.5 w-3.5" />
              Futures
            </TabsTrigger>
            <TabsTrigger value="options" className="text-xs gap-1.5 data-[state=active]:bg-secondary rounded-sm">
              <Grid3X3 className="h-3.5 w-3.5" />
              Options Chain
            </TabsTrigger>
            <TabsTrigger value="chart" className="text-xs gap-1.5 data-[state=active]:bg-secondary rounded-sm">
              <TrendingUp className="h-3.5 w-3.5" />
              Price Chart
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <TabsContent value="futures" className="h-full m-0 data-[state=inactive]:hidden">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full"
                >
                  <FuturesTable
                    data={futuresData}
                    onSelect={setSelectedContract}
                    selected={selectedContract.symbol}
                  />
                </motion.div>
              </TabsContent>

              <TabsContent value="options" className="h-full m-0 data-[state=inactive]:hidden">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full"
                >
                  <OptionsChain options={options} underlyingPrice={selectedContract.lastPrice} />
                </motion.div>
              </TabsContent>

              <TabsContent value="chart" className="h-full m-0 data-[state=inactive]:hidden">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full"
                >
                  <PriceChart
                    symbol={selectedContract.symbol}
                    name={selectedContract.name}
                    basePrice={selectedContract.lastPrice}
                  />
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </div>
        </Tabs>
      </div>

      <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
};

export default Index;
