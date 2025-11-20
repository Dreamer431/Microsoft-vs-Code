
import React, { useState, useEffect, useRef } from 'react';
import GameEngine from './components/GameEngine';
import { GameState, GameStats, SidebarView } from './types';
import { ENEMY_TYPES, POWER_UPS, MAX_AMMO } from './constants';

interface IconProps {
    active: boolean;
    onClick: () => void;
    title: string;
}

const SidebarIcon = ({ active, onClick, children, title }: IconProps & { children: React.ReactNode }) => (
    <div className="relative group w-full flex justify-center mb-4">
        <div 
            className={`cursor-pointer p-2 transition-colors ${active ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            onClick={onClick}
        >
            {children}
        </div>
        {active && <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-white"></div>}
        
        {/* Tooltip */}
        <div className="absolute left-12 top-2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 border border-[#454545] shadow-lg transition-opacity delay-75">
            {title}
        </div>
    </div>
);

// Use user provided image, with a fallback to CDN just in case
const VscLogo = ({ className }: { className?: string }) => (
    <img 
        src="./vscode.png" 
        className={className} 
        alt="VS Code"
        style={{ objectFit: 'contain' }}
        onError={(e) => {
            console.warn("Local vscode.png not found, falling back to CDN");
            e.currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg";
        }}
    />
);

const FilesIcon = () => <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const SearchIcon = () => <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const GitIcon = () => <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>;
const BugIcon = () => <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const ExtensionsIcon = () => <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>;

const SettingsIcon = () => (
    <div className="relative group w-full flex justify-center mt-auto mb-4">
        <svg className="w-7 h-7 text-gray-400 hover:text-white cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        <div className="absolute left-12 top-1 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 border border-[#454545] shadow-lg">
            Manage
        </div>
    </div>
);

export default function App() {
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [sidebarView, setSidebarView] = useState<SidebarView>('EXPLORER');
  const [stats, setStats] = useState<GameStats>({ 
      score: 0, bugsFixed: 0, linesOfCode: 0, wave: 1, fps: 60, lastLog: '', levelProgress: 0, levelTarget: 10, bossActive: false, combo: 0, comboTimer: 0, maxCombo: 0,
      weaponLevel: 1, ammo: MAX_AMMO, maxAmmo: MAX_AMMO, specialCharge: 0, shieldActive: false
  });
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (stats.lastLog) {
        setTerminalLogs(prev => {
            if (prev[prev.length-1] === stats.lastLog) return prev;
            return [...prev.slice(-5), stats.lastLog];
        });
    }
  }, [stats.lastLog]);
  
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalLogs]);

  const formatNumber = (num: number) => num.toLocaleString();

  // --- Sidebar Renderers ---

  const renderExplorer = () => (
    <>
      <div className="px-2">
          <div className="flex items-center px-2 py-1 bg-[#37373d] text-white text-xs font-bold cursor-pointer">
             <span className="mr-2">▼</span> VSCODE-GAME
          </div>
          <div className="pl-4 mt-1 text-sm font-mono text-[#569cd6]">
            <div className="py-1 flex items-center hover:bg-[#2a2d2e] cursor-pointer"><span className="text-[#cca700] mr-2">TS</span> GameEngine.tsx</div>
            <div className="py-1 flex items-center hover:bg-[#2a2d2e] cursor-pointer"><span className="text-[#cca700] mr-2">TS</span> Enemies.ts</div>
            <div className="py-1 flex items-center hover:bg-[#2a2d2e] cursor-pointer"><span className="text-[#e06c75] mr-2">JSON</span> metadata.json</div>
          </div>
          
          <div className="px-4 py-2 mt-6 text-xs font-bold uppercase tracking-wider text-gray-500">Run & Debug</div>
          <div className="pl-4 mt-2 text-xs font-mono space-y-2">
             <div className="flex justify-between mb-1"><span>SCORE:</span> <span className="text-[#ce9178]">{formatNumber(stats.score)}</span></div>
             <div className="flex justify-between mb-1"><span>BUGS:</span> <span className="text-[#f14c4c]">{stats.bugsFixed}</span></div>
             <div className="flex justify-between mb-1"><span>WAVE:</span> <span className="text-[#dcdcaa]">v{stats.wave}.0</span></div>
             
             {/* COMBO METER */}
             {stats.combo > 1 && (
                 <div className="mt-4 border border-[#dcdcaa] bg-[#dcdcaa]/10 p-2 rounded animate-pulse">
                    <div className="text-[#dcdcaa] font-bold text-center text-lg">{stats.combo}x COMBO</div>
                    <div className="w-full bg-[#3c3c3c] h-1 mt-1">
                        <div className="bg-[#dcdcaa] h-full transition-all duration-75" style={{ width: `${(stats.comboTimer / 120) * 100}%` }} />
                    </div>
                 </div>
             )}

             {/* RELEASE PROGRESS BAR */}
             <div className="mt-4">
                 <div className="flex justify-between text-xs mb-1">
                     <span>RELEASE PROGRESS</span>
                     <span>{stats.bossActive ? 'BLOCKED' : `${Math.round((stats.levelProgress / stats.levelTarget) * 100)}%`}</span>
                 </div>
                 <div className="w-full bg-[#3c3c3c] h-2 rounded-full overflow-hidden">
                     <div 
                        className={`h-full ${stats.bossActive ? 'bg-red-500 animate-pulse' : 'bg-[#4ec9b0]'}`} 
                        style={{ width: stats.bossActive ? '100%' : `${Math.min(100, (stats.levelProgress / stats.levelTarget) * 100)}%` }}
                     />
                 </div>
                 {stats.bossActive && <div className="text-red-400 text-[10px] mt-1 font-bold">⚠ LEGACY CODEBLOCK BLOCKING DEPLOYMENT</div>}
             </div>
          </div>
      </div>
    </>
  );

  const renderSearch = () => (
    <div className="px-4 py-2">
        <div className="text-xs font-bold uppercase text-gray-500 mb-4">ENEMY DATABASE</div>
        <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2 scrollbar-thin">
            {ENEMY_TYPES.map((e) => (
                <div key={e.type} className="border border-[#3c3c3c] p-2 rounded hover:bg-[#2a2d2e]">
                    <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm" style={{color: e.color}}>{e.type}</span>
                        <span className="text-lg font-mono">{e.text}</span>
                    </div>
                    <div className="text-xs text-gray-400 mb-1">HP: {e.hp} | PTS: {e.score}</div>
                    <div className="text-[10px] text-gray-500">{(e as any).desc || 'Unknown Entity'}</div>
                </div>
            ))}
        </div>
    </div>
  );

  const renderGit = () => (
      <div className="px-4 py-2">
          <div className="text-xs font-bold uppercase text-gray-500 mb-4">COMMIT HISTORY</div>
          <div className="space-y-2">
              <div className="flex items-center text-xs">
                  <span className="text-[#dcdcaa] mr-2">●</span>
                  <span className="text-gray-300">Initial Commit</span>
              </div>
              {Array.from({length: stats.wave - 1}).map((_, i) => (
                  <div key={i} className="flex items-start text-xs border-l border-gray-600 ml-1 pl-3 py-2">
                      <div>
                        <div className="text-white mb-1">v{i+1}.0 Release</div>
                        <div className="text-gray-500">Refactored {100 + i * 50} lines</div>
                      </div>
                  </div>
              ))}
              <div className="flex items-start text-xs border-l border-dashed border-gray-500 ml-1 pl-3 py-2">
                  <div className="text-[#cca700]">Currently working on v{stats.wave}.0...</div>
              </div>
          </div>
      </div>
  );

  const renderDebug = () => (
      <div className="px-4 py-2">
          <div className="text-xs font-bold uppercase text-gray-500 mb-4">DEBUG CONSOLE</div>
          <div className="font-mono text-xs space-y-2 text-green-400">
              <div>Hardware Acceleration: <span className="text-white">ENABLED</span></div>
              <div>Frame Time: <span className="text-white">{(1000/stats.fps).toFixed(2)}ms</span></div>
              <div>Heap Usage: <span className="text-white">{Math.floor(Math.random() * 50 + 50)} MB</span></div>
              <div className="h-px bg-gray-700 my-2"></div>
              <div>Max Combo: <span className="text-[#cca700]">{stats.maxCombo}</span></div>
              <div>Lines Written: <span className="text-[#ce9178]">{stats.linesOfCode}</span></div>
          </div>
      </div>
  );

  const renderExtensions = () => (
      <div className="px-4 py-2">
          <div className="text-xs font-bold uppercase text-gray-500 mb-4">INSTALLED EXTENSIONS</div>
          <div className="space-y-3">
             {/* Weapon */}
             <div className="flex items-start p-2 bg-[#333] rounded hover:bg-[#3c3c3c]">
                <div className="w-8 h-8 bg-[#007acc] flex items-center justify-center text-white rounded mr-3 mt-1">TS</div>
                <div>
                   <div className="text-sm font-bold text-white">TypeScript Compiler</div>
                   <div className="text-xs text-gray-400">v{stats.weaponLevel}.0.0</div>
                   <div className="text-[10px] text-gray-500 mt-1">Provides type-safe projectile emission.</div>
                </div>
             </div>

             {/* Ammo */}
             <div className="flex items-start p-2 bg-[#333] rounded hover:bg-[#3c3c3c]">
                <div className="w-8 h-8 bg-[#e06c75] flex items-center justify-center text-white rounded mr-3 mt-1">GC</div>
                <div>
                   <div className="text-sm font-bold text-white">Garbage Collector</div>
                   <div className="text-xs text-gray-400">Heap: {Math.round(stats.ammo)}/{stats.maxAmmo}</div>
                   <div className="text-[10px] text-gray-500 mt-1">Auto-cleans unused memory blocks.</div>
                </div>
             </div>

             {/* Shield */}
             <div className="flex items-start p-2 bg-[#333] rounded hover:bg-[#3c3c3c]">
                <div className="w-8 h-8 bg-[#0db7ed] flex items-center justify-center text-white rounded mr-3 mt-1">
                   <span className="text-lg">🐳</span>
                </div>
                <div>
                   <div className="text-sm font-bold text-white">Docker Container</div>
                   <div className="text-xs text-gray-400">{stats.shieldActive ? 'Running' : 'Stopped'}</div>
                   <div className="text-[10px] text-gray-500 mt-1">Isolates process from fatal errors.</div>
                </div>
             </div>
             
             {/* Refactor */}
             <div className="flex items-start p-2 bg-[#333] rounded hover:bg-[#3c3c3c]">
                <div className="w-8 h-8 bg-[#C586C0] flex items-center justify-center text-white rounded mr-3 mt-1">R</div>
                <div>
                   <div className="text-sm font-bold text-white">Refactor CLI</div>
                   <div className="text-xs text-gray-400">Charge: {stats.specialCharge}%</div>
                   <div className="text-[10px] text-gray-500 mt-1">Press 'R' to optimize all code instantly.</div>
                </div>
             </div>
          </div>
      </div>
  );

  return (
    <div className="flex h-screen w-screen text-[#cccccc] overflow-hidden select-none font-['Fira_Code']">
      {/* Activity Bar (Left) */}
      <div className="w-14 bg-[#333333] flex flex-col items-center py-2 border-r border-[#252526] z-10 shrink-0">
        <VscLogo className="w-10 h-10 mb-6 mt-2" />
        <SidebarIcon active={sidebarView === 'EXPLORER'} onClick={() => setSidebarView('EXPLORER')} title="Explorer (Ctrl+Shift+E)">
            <FilesIcon />
        </SidebarIcon>
        <SidebarIcon active={sidebarView === 'SEARCH'} onClick={() => setSidebarView('SEARCH')} title="Enemy Database (Ctrl+Shift+F)">
            <SearchIcon />
        </SidebarIcon>
        <SidebarIcon active={sidebarView === 'GIT'} onClick={() => setSidebarView('GIT')} title="Source Control (Ctrl+Shift+G)">
            <GitIcon />
        </SidebarIcon>
        <SidebarIcon active={sidebarView === 'DEBUG'} onClick={() => setSidebarView('DEBUG')} title="Run & Debug (Ctrl+Shift+D)">
            <BugIcon />
        </SidebarIcon>
        <SidebarIcon active={sidebarView === 'EXTENSIONS'} onClick={() => setSidebarView('EXTENSIONS')} title="Extensions (Ctrl+Shift+X)">
            <ExtensionsIcon />
        </SidebarIcon>
        <SettingsIcon />
      </div>

      {/* Sidebar */}
      <div className="w-64 bg-[#252526] flex flex-col border-r border-[#1e1e1e] hidden md:flex shrink-0">
        <div className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-500 flex justify-between items-center">
            <span>{sidebarView}</span>
            <span className="text-lg leading-3 cursor-pointer hover:text-white">...</span>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#424242]">
            {sidebarView === 'EXPLORER' && renderExplorer()}
            {sidebarView === 'SEARCH' && renderSearch()}
            {sidebarView === 'GIT' && renderGit()}
            {sidebarView === 'DEBUG' && renderDebug()}
            {sidebarView === 'EXTENSIONS' && renderExtensions()}
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col bg-[#1e1e1e] relative min-w-0">
        {/* Tabs */}
        <div className="h-9 bg-[#252526] flex items-center overflow-x-auto border-b border-[#1e1e1e] shrink-0">
          <div className="px-4 h-full bg-[#1e1e1e] flex items-center text-sm border-t border-[#007acc] text-white min-w-fit pr-8 relative group">
            <span className="text-[#cca700] mr-2">TS</span> game_loop.ts <span className="ml-3 text-gray-400 hover:text-white cursor-pointer opacity-0 group-hover:opacity-100">×</span>
          </div>
          <div className="px-4 h-full bg-[#2d2d2d] flex items-center text-sm text-gray-400 min-w-fit pr-8 border-r border-[#1e1e1e] hover:bg-[#2a2d2e] cursor-pointer">
            <span className="text-[#e06c75] mr-2">JSON</span> enemies.json
          </div>
        </div>

        {/* Breadcrumbs */}
        <div className="h-6 flex items-center px-4 text-xs text-gray-500 bg-[#1e1e1e] border-b border-[#1e1e1e] shrink-0">
          src &gt; components &gt; game &gt; <span className="ml-1 text-[#dcdcaa] flex items-center"><span className="text-purple-400 mr-1">def</span> render()</span>
        </div>

        {/* Game Canvas Container */}
        <div className="flex-1 relative flex justify-center items-center bg-[#1e1e1e] overflow-hidden min-h-0">
            <GameEngine gameState={gameState} setGameState={setGameState} onStatsUpdate={setStats} />
            
            {/* Start Screen Overlay */}
            {gameState === GameState.START && (
              <div className="absolute inset-0 bg-[#1e1e1e]/95 flex flex-col items-center justify-center z-50">
                 <div className="mb-8 transform hover:scale-110 transition-transform duration-500">
                    <VscLogo className="w-24 h-24" />
                 </div>
                 <h1 className="text-4xl font-bold text-[#007acc] mb-2 tracking-tight font-sans">VS CODE: THE GAME</h1>
                 <p className="text-[#ce9178] mb-8 font-mono text-sm">Version 3.2.0 (Insiders Edition)</p>
                 
                 <div className="grid grid-cols-2 gap-12 mb-8 text-sm text-gray-400 max-w-2xl">
                    <div className="text-right border-r border-gray-600 pr-8">
                        <h3 className="font-bold text-white mb-2 text-lg">CONTROLS</h3>
                        <p className="mb-1"><span className="text-[#569cd6]">WASD</span> : Move</p>
                        <p className="mb-1"><span className="text-[#569cd6]">SPACE</span> : Shoot</p>
                        <p className="mb-1"><span className="text-[#4ec9b0]">SHIFT / R</span> : Refactor (Ult)</p>
                        <p className="mb-1"><span className="text-gray-500">ESC</span> : Pause</p>
                    </div>
                    <div className="pl-4">
                        <h3 className="font-bold text-white mb-2 text-lg">NEW FEATURES</h3>
                        <p className="mb-1">🧩 <span className="text-[#dcdcaa]">Extensions</span>: View stats in sidebar</p>
                        <p className="mb-1">🗺️ <span className="text-[#ce9178]">Minimap</span>: Tactical overview</p>
                        <p className="mb-1">⚡ <span className="text-[#007acc]">Combos</span>: Chain kills for score</p>
                    </div>
                 </div>

                 <button 
                   onClick={() => {
                       setGameState(GameState.PLAYING);
                       setTerminalLogs(['> npm run dev', '> Build started...', '> Compiling TypeScript...', '> Ready on http://localhost:3000']);
                   }}
                   className="px-8 py-3 bg-[#0e639c] hover:bg-[#1177bb] text-white font-semibold rounded-sm shadow-lg transition-colors"
                 >
                   F5 Start Debugging
                 </button>
              </div>
            )}

            {/* Game Over Overlay */}
            {gameState === GameState.GAME_OVER && (
              <div className="absolute inset-0 bg-[#750e0e]/95 flex flex-col items-center justify-center z-50 animate-in fade-in duration-300">
                 <h1 className="text-6xl font-bold text-white mb-2">BUILD FAILED</h1>
                 <p className="text-red-200 mb-8 font-mono text-xl">
                    <span className="text-gray-400">Exit code:</span> 1
                 </p>
                 
                 <div className="bg-[#1e1e1e] p-6 rounded-md border border-red-500 font-mono text-xs mb-8 w-3/4 max-w-2xl shadow-2xl">
                    <p className="text-red-400 mb-2">Error: Uncaught Exception at Version {stats.wave}.0</p>
                    <p className="text-gray-400 pl-4">at Player.collision (GameEngine.tsx:404)</p>
                    <p className="text-gray-400 pl-4">at Entity.die (Entity.ts:23)</p>
                    <div className="mt-4 border-t border-gray-700 pt-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="text-right text-gray-400">Final Score:</div>
                            <div className="text-[#ce9178] font-bold">{formatNumber(stats.score)}</div>
                            
                            <div className="text-right text-gray-400">Max Combo:</div>
                            <div className="text-[#dcdcaa] font-bold">{stats.maxCombo}x</div>
                            
                            <div className="text-right text-gray-400">Bugs Fixed:</div>
                            <div className="text-[#b5cea8] font-bold">{stats.bugsFixed}</div>
                        </div>
                    </div>
                 </div>

                 <button 
                   onClick={() => setGameState(GameState.PLAYING)}
                   className="px-6 py-3 bg-[#28a745] hover:bg-[#2fb950] text-white font-semibold rounded-sm shadow-lg"
                 >
                   Rebuild & Restart
                 </button>
              </div>
            )}
        </div>

        {/* Terminal / Bottom Panel */}
        <div className="h-40 bg-[#1e1e1e] border-t border-[#414141] flex flex-col shrink-0">
          <div className="flex text-xs px-4 py-2 border-b border-[#414141] bg-[#1e1e1e]">
            <span className="mr-6 cursor-pointer hover:text-white uppercase text-[10px] tracking-wide">Problems <span className="bg-[#252526] rounded-full px-2 py-0.5 text-[10px] ml-1">{Math.max(0, 10 - stats.bugsFixed)}</span></span>
            <span className="mr-6 cursor-pointer hover:text-white text-[#007acc] border-b border-[#007acc] pb-2 -mb-2 uppercase text-[10px] tracking-wide">Terminal</span>
            <span className="mr-6 cursor-pointer hover:text-white uppercase text-[10px] tracking-wide">Debug Console</span>
            <span className="mr-6 cursor-pointer hover:text-white uppercase text-[10px] tracking-wide">Output</span>
          </div>
          <div className="flex-1 p-2 font-mono text-xs overflow-y-auto text-gray-300 scrollbar-thin scrollbar-thumb-gray-700">
             {terminalLogs.map((log, i) => (
                 <div key={i} className="mb-0.5">
                     <span className="text-green-500 mr-2">➜</span>
                     <span className="opacity-80">{log}</span>
                 </div>
             ))}
             <div ref={logsEndRef} />
             <div className="mt-1 animate-pulse text-[#007acc]">▍</div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-6 bg-[#007acc] text-white flex items-center text-xs px-3 justify-between z-50 cursor-default">
        <div className="flex items-center gap-4">
          <span className="flex items-center hover:bg-white/20 px-1 rounded"><span className="mr-1">⊗</span> 0</span>
          <span className="flex items-center hover:bg-white/20 px-1 rounded"><span className="mr-1">⚠</span> 0</span>
          <span className="hover:bg-white/20 px-1 rounded flex items-center"><span className="mr-1 text-[10px]"></span> main*</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hover:bg-white/20 px-1 rounded">Ln {stats.linesOfCode}, Col {stats.bugsFixed}</span>
          <span className="hover:bg-white/20 px-1 rounded">Heap: {Math.floor(100)}MB</span>
          <span className="hover:bg-white/20 px-1 rounded">UTF-8</span>
          <span className="hover:bg-white/20 px-1 rounded">{stats.fps} FPS</span>
          <span className="flex items-center hover:bg-white/20 px-1 cursor-pointer">
             <span className="mr-1">🔔</span>
          </span>
        </div>
      </div>
    </div>
  );
}
