import { Settings, Activity, Wifi, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardHeaderProps {
  connected: boolean;
  onSettingsClick: () => void;
}

const DashboardHeader = ({ connected, onSettingsClick }: DashboardHeaderProps) => {
  const todayLabel = new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });

  return (
    <header className="bg-header border-b px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Activity className="h-5 w-5 text-primary" />
        <div className="flex items-baseline gap-2">
          <h1 className="text-lg font-semibold tracking-tight">Commodity Terminal</h1>
          <span className="text-xs text-muted-foreground font-mono bg-secondary px-2 py-0.5 rounded">
            {todayLabel}
          </span>
        </div>
        <span className="text-xs text-muted-foreground font-mono bg-secondary px-2 py-0.5 rounded">
          FUTURES & OPTIONS
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-xs font-mono">
          {connected ? (
            <>
              <Wifi className="h-3.5 w-3.5 text-gain" />
              <span className="text-gain">CONNECTED</span>
            </>
          ) : (
            <>
              <WifiOff className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-muted-foreground">DEMO MODE</span>
            </>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onSettingsClick}
          className="h-8 w-8 p-0"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
