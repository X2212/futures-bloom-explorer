import { useState } from 'react';
import { X, Server, Globe, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SettingsPanelProps {
  open: boolean;
  onClose: () => void;
}

type ApiMode = 'web' | 'tws';

const SettingsPanel = ({ open, onClose }: SettingsPanelProps) => {
  const [apiMode, setApiMode] = useState<ApiMode>('web');
  const [webHost, setWebHost] = useState('localhost');
  const [webPort, setWebPort] = useState('5000');
  const [twsHost, setTwsHost] = useState('localhost');
  const [twsPort, setTwsPort] = useState('7497');
  const [proxyUrl, setProxyUrl] = useState('');

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative ml-auto w-full max-w-md bg-card border-l shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-sm font-semibold">API Settings</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-7 w-7 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-auto p-4 space-y-6">
          {/* API Mode Selection */}
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground uppercase tracking-wider">Connection Mode</Label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setApiMode('web')}
                className={`flex items-center gap-2 p-3 rounded border text-xs font-medium transition-colors ${
                  apiMode === 'web'
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground hover:border-foreground/30'
                }`}
              >
                <Globe className="h-4 w-4" />
                <div className="text-left">
                  <div className="font-semibold">Web API</div>
                  <div className="text-[10px] opacity-70">Client Portal Gateway</div>
                </div>
              </button>
              <button
                onClick={() => setApiMode('tws')}
                className={`flex items-center gap-2 p-3 rounded border text-xs font-medium transition-colors ${
                  apiMode === 'tws'
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground hover:border-foreground/30'
                }`}
              >
                <Server className="h-4 w-4" />
                <div className="text-left">
                  <div className="font-semibold">TWS API</div>
                  <div className="text-[10px] opacity-70">Via Proxy Server</div>
                </div>
              </button>
            </div>
          </div>

          {apiMode === 'web' ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Shield className="h-3.5 w-3.5" />
                <span>IB Client Portal Gateway (REST API)</span>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Gateway Host</Label>
                <Input value={webHost} onChange={e => setWebHost(e.target.value)} className="h-8 text-xs font-mono bg-secondary" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Gateway Port</Label>
                <Input value={webPort} onChange={e => setWebPort(e.target.value)} className="h-8 text-xs font-mono bg-secondary" />
              </div>
              <div className="rounded border border-border/50 bg-muted/50 p-3 text-[11px] text-muted-foreground space-y-1">
                <p className="font-medium text-foreground">Setup Instructions:</p>
                <ol className="list-decimal list-inside space-y-0.5">
                  <li>Download IB Client Portal Gateway</li>
                  <li>Run <code className="font-mono bg-secondary px-1 rounded">bin/run.sh root/conf.yaml</code></li>
                  <li>Authenticate at <code className="font-mono bg-secondary px-1 rounded">https://localhost:5000</code></li>
                  <li>Accept the SSL certificate</li>
                </ol>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Server className="h-3.5 w-3.5" />
                <span>TWS API via Backend Proxy</span>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">TWS Host</Label>
                <Input value={twsHost} onChange={e => setTwsHost(e.target.value)} className="h-8 text-xs font-mono bg-secondary" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">TWS Port</Label>
                <Input value={twsPort} onChange={e => setTwsPort(e.target.value)} className="h-8 text-xs font-mono bg-secondary" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Proxy Server URL</Label>
                <Input value={proxyUrl} onChange={e => setProxyUrl(e.target.value)} placeholder="https://your-proxy.com" className="h-8 text-xs font-mono bg-secondary" />
              </div>
              <div className="rounded border border-border/50 bg-muted/50 p-3 text-[11px] text-muted-foreground space-y-1">
                <p className="font-medium text-foreground">Setup Instructions:</p>
                <ol className="list-decimal list-inside space-y-0.5">
                  <li>Run IB TWS or IB Gateway</li>
                  <li>Enable API connections in TWS settings</li>
                  <li>Deploy a proxy server (Node.js/Python)</li>
                  <li>Set the proxy URL above</li>
                </ol>
              </div>
            </div>
          )}

          <Button className="w-full" size="sm">
            Test Connection
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
