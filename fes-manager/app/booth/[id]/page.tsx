// app/booth/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { initialBooths, Booth } from '@/lib/data';
import { ArrowLeft, CheckCircle2, Circle, AlertTriangle, BookOpen, Clock, ShieldCheck, Zap } from 'lucide-react';

export default function BoothStaffPage() {
  const params = useParams();
  const router = useRouter();
  const boothId = params.id as string;
  
  const [booth, setBooth] = useState<Booth | null>(null);
  const [tab, setTab] = useState<'schedule' | 'manual' | 'checklist' | 'sos'>('schedule');
  const [sosSent, setSosSent] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('fes_booths_data');
    if (saved) {
      const parsed = JSON.parse(saved);
      setBooth(parsed[boothId] || initialBooths[boothId]);
    } else {
      setBooth(initialBooths[boothId] || null);
    }
  }, [boothId]);

  if (!booth) return <div className="p-8 text-center text-slate-500">読み込み中...</div>;

  const toggleSchedule = (id: string) => {
    const updated = {
      ...booth,
      schedule: booth.schedule.map(s => s.id === id ? { ...s, done: !s.done } : s)
    };
    setBooth(updated);
    saveData(updated);
  };

  const toggleChecklist = (id: string) => {
    const updated = {
      ...booth,
      checklists: booth.checklists.map(c => c.id === id ? { ...c, done: !c.done } : c)
    };
    setBooth(updated);
    saveData(updated);
  };

  const saveData = (updatedBooth: Booth) => {
    const saved = localStorage.getItem('fes_booths_data');
    const all = saved ? JSON.parse(saved) : initialBooths;
    all[boothId] = updatedBooth;
    localStorage.setItem('fes_booths_data', JSON.stringify(all));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 max-w-md mx-auto pb-20">
      {/* BDSヘッダーバー */}
      <header className="bg-slate-900 text-white p-4 flex items-center justify-between sticky top-0 z-10 border-b border-slate-800 shadow-md">
        <button onClick={() => router.push('/')} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center space-x-2">
          <span className="text-xl">{booth.icon}</span>
          <h1 className="font-black text-base tracking-tight">{booth.name}</h1>
          <span className="text-[10px] px-2 py-0.5 bg-cyan-500/20 text-cyan-300 rounded-full font-bold border border-cyan-500/30">現場画面</span>
        </div>
        <div className="text-xs bg-slate-800 text-cyan-300 font-mono font-bold px-2.5 py-1 rounded-lg border border-slate-700 flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          {booth.powerWatt}W
        </div>
      </header>

      {/* BDSスタイルのタブ */}
      <div className="flex bg-white border-b border-slate-200 text-xs font-bold text-slate-500 sticky top-[57px] z-10 shadow-sm">
        <button onClick={() => setTab('schedule')} className={`flex-1 py-3 text-center border-b-2 transition ${tab === 'schedule' ? 'border-cyan-500 text-cyan-700 bg-cyan-50/50' : 'border-transparent hover:text-slate-700'}`}>
          <Clock className="w-4 h-4 mx-auto mb-1" />
          予定
        </button>
        <button onClick={() => setTab('manual')} className={`flex-1 py-3 text-center border-b-2 transition ${tab === 'manual' ? 'border-cyan-500 text-cyan-700 bg-cyan-50/50' : 'border-transparent hover:text-slate-700'}`}>
          <BookOpen className="w-4 h-4 mx-auto mb-1" />
          品質基準
        </button>
        <button onClick={() => setTab('checklist')} className={`flex-1 py-3 text-center border-b-2 transition ${tab === 'checklist' ? 'border-cyan-500 text-cyan-700 bg-cyan-50/50' : 'border-transparent hover:text-slate-700'}`}>
          <ShieldCheck className="w-4 h-4 mx-auto mb-1" />
          衛生点検
        </button>
        <button onClick={() => setTab('sos')} className={`flex-1 py-3 text-center border-b-2 transition ${tab === 'sos' ? 'border-rose-500 text-rose-600 bg-rose-50/50' : 'border-transparent hover:text-slate-700'}`}>
          <AlertTriangle className="w-4 h-4 mx-auto mb-1" />
          SOS
        </button>
      </div>

      {/* コンテンツ */}
      <div className="p-4">
        {/* ① 予定・To Do */}
        {tab === 'schedule' && (
          <div className="space-y-2.5">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">タイムライン＆搬入手順</h2>
            {booth.schedule.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleSchedule(item.id)}
                className={`flex items-center p-3.5 bg-white rounded-2xl border transition cursor-pointer shadow-sm ${item.done ? 'bg-slate-100/80 border-slate-200 opacity-60' : 'border-slate-200 hover:border-cyan-300'}`}
              >
                {item.done ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-300 mr-3 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <span className="text-xs font-bold text-cyan-700 bg-cyan-50 border border-cyan-200 px-2 py-0.5 rounded-md mr-2 font-mono">{item.time}</span>
                  <span className={`text-sm font-semibold ${item.done ? 'line-through text-slate-400' : 'text-slate-800'}`}>{item.task}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ② 品質マニュアル */}
        {tab === 'manual' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-cyan-900 to-slate-900 text-white rounded-2xl p-4 border border-cyan-500/30 shadow-md">
              <h3 className="text-xs font-black text-cyan-300 flex items-center gap-1.5 mb-2.5">
                ★ 体験の質を担保するポイント
              </h3>
              <ul className="text-xs text-slate-200 space-y-2 list-disc list-inside font-medium leading-relaxed">
                {booth.qualityPoints.map((qp, i) => (
                  <li key={i}>{qp}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
              <h3 className="text-xs font-bold text-slate-500 mb-2">調理・提供手順</h3>
              <ol className="text-xs text-slate-700 space-y-2 list-decimal list-inside font-medium leading-relaxed">
                {booth.cookingSteps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
              <h3 className="text-xs font-bold text-slate-500 mb-2">衛生・安全ルール</h3>
              <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside font-medium leading-relaxed">
                {booth.hygieneRules.map((rule, i) => (
                  <li key={i}>{rule}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* ③ 衛生点検 */}
        {tab === 'checklist' && (
          <div className="space-y-3">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">開店前＆定時衛生チェック</h2>
            {booth.checklists.map((check) => (
              <div
                key={check.id}
                onClick={() => toggleChecklist(check.id)}
                className={`flex items-center p-3.5 bg-white rounded-2xl border transition cursor-pointer shadow-sm ${check.done ? 'bg-cyan-50/60 border-cyan-300' : 'border-slate-200 hover:border-slate-300'}`}
              >
                {check.done ? (
                  <CheckCircle2 className="w-5 h-5 text-cyan-600 mr-3 flex-shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-300 mr-3 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mr-2 ${check.type === 'pre' ? 'bg-indigo-100 text-indigo-700' : 'bg-cyan-100 text-cyan-700'}`}>
                    {check.type === 'pre' ? '開店前' : '毎時点検'}
                  </span>
                  <span className={`text-xs font-bold ${check.done ? 'text-cyan-900' : 'text-slate-800'}`}>{check.text}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ④ SOS・ヘルプ要請 */}
        {tab === 'sos' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-rose-50 to-orange-50 border border-rose-200 rounded-2xl p-5 text-center shadow-sm">
              <AlertTriangle className="w-8 h-8 text-rose-500 mx-auto mb-2" />
              <h3 className="font-black text-sm text-rose-950">総務部へヘルプ要請</h3>
              <p className="text-xs text-rose-800 mt-1 mb-4 leading-relaxed">氷・食材・カップ不足、または現場トラブル時に要請を送信</p>
              
              <button
                onClick={() => {
                  setSosSent(true);
                  setTimeout(() => setSosSent(false), 3000);
                }}
                className={`w-full py-3.5 rounded-xl font-black text-sm text-white shadow-md transition ${sosSent ? 'bg-emerald-600 shadow-emerald-200' : 'bg-rose-600 hover:bg-rose-500 active:scale-[0.98] shadow-rose-200'}`}
              >
                {sosSent ? '✓ 総務部に送信完了！' : '🚨 SOSを送信する'}
              </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 text-xs space-y-2 shadow-sm">
              <h4 className="font-bold text-slate-900">緊急時初動マニュアル</h4>
              <p>・<strong>ブレーカー落ち</strong>：使用器具のプラグを抜き、総務部へ連絡</p>
              <p>・<strong>怪我・体調不良</strong>：救護スペース（本部）へ誘導</p>
              <p>・<strong>酒類提供確認</strong>：白リストバンド装着者のみ提供（青/赤は厳禁）</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}