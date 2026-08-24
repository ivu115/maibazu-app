// app/admin/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { initialBooths, Booth } from '@/lib/data';
import { ArrowLeft, Save, ShieldAlert, Zap, Layers } from 'lucide-react';

export default function AdminPage() {
  const router = useRouter();
  const [booths, setBooths] = useState<Record<string, Booth>>(initialBooths);
  const [selectedBooth, setSelectedBooth] = useState<string>('frankfurt');
  const [savedAlert, setSavedAlert] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('fes_booths_data');
    if (saved) setBooths(JSON.parse(saved));
  }, []);

  const handleSave = () => {
    localStorage.setItem('fes_booths_data', JSON.stringify(booths));
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 2000);
  };

  const current = booths[selectedBooth];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 max-w-xl mx-auto pb-16">
      {/* 管理者ヘッダー */}
      <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 p-4 flex items-center justify-between sticky top-0 z-10">
        <button onClick={() => router.push('/')} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-cyan-400" />
          <h1 className="font-black text-base text-white">総務部 設定・全体管理</h1>
        </div>
        <button
          onClick={handleSave}
          className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 text-xs font-black px-3.5 py-2 rounded-lg flex items-center gap-1.5 shadow-md active:scale-95 transition"
        >
          <Save className="w-3.5 h-3.5" />
          保存
        </button>
      </header>

      {savedAlert && (
        <div className="bg-cyan-500 text-slate-950 text-center py-2 text-xs font-black">
          ✓ 設定を保存し、現場画面に反映しました！
        </div>
      )}

      {/* 出店選択 */}
      <div className="p-4">
        <label className="text-xs font-bold text-slate-400 flex items-center gap-1.5 mb-2.5">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          編集する出店を選択
        </label>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {Object.values(booths).map((b) => (
            <button
              key={b.id}
              onClick={() => setSelectedBooth(b.id)}
              className={`py-2.5 px-1 text-xs font-bold rounded-2xl border text-center transition ${
                selectedBooth === b.id
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-950'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <span className="text-base block mb-0.5">{b.icon}</span>
              {b.name}
            </button>
          ))}
        </div>

        {/* 編集フォーム */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-xl space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h2 className="font-black text-sm text-white flex items-center gap-2">
              <span>{current.icon}</span>
              {current.name} の設定編集
            </h2>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              電力(W):
              <input
                type="number"
                value={current.powerWatt}
                onChange={(e) => {
                  setBooths({
                    ...booths,
                    [selectedBooth]: { ...current, powerWatt: Number(e.target.value) }
                  });
                }}
                className="w-16 bg-slate-950 border border-slate-700 text-cyan-300 rounded p-1 text-center font-mono"
              />
            </div>
          </div>

          {/* 品質こだわりポイント */}
          <div>
            <label className="block text-xs font-bold text-cyan-300 mb-1.5">
              ★ 品質こだわり基準（改行区切り）
            </label>
            <textarea
              rows={3}
              value={current.qualityPoints.join('\n')}
              onChange={(e) => {
                setBooths({
                  ...booths,
                  [selectedBooth]: {
                    ...current,
                    qualityPoints: e.target.value.split('\n')
                  }
                });
              }}
              className="w-full text-xs bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:border-cyan-400 outline-none leading-relaxed"
            />
          </div>

          {/* 調理手順 */}
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1.5">
              調理・提供手順（改行区切り）
            </label>
            <textarea
              rows={3}
              value={current.cookingSteps.join('\n')}
              onChange={(e) => {
                setBooths({
                  ...booths,
                  [selectedBooth]: {
                    ...current,
                    cookingSteps: e.target.value.split('\n')
                  }
                });
              }}
              className="w-full text-xs bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:border-cyan-400 outline-none leading-relaxed"
            />
          </div>

          {/* 衛生ルール */}
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1.5">
              衛生・安全ルール（改行区切り）
            </label>
            <textarea
              rows={2}
              value={current.hygieneRules.join('\n')}
              onChange={(e) => {
                setBooths({
                  ...booths,
                  [selectedBooth]: {
                    ...current,
                    hygieneRules: e.target.value.split('\n')
                  }
                });
              }}
              className="w-full text-xs bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:border-cyan-400 outline-none leading-relaxed"
            />
          </div>
        </div>
      </div>
    </div>
  );
}