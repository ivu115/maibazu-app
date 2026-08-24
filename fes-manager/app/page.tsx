// app/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, ChevronRight, Lock, Sparkles } from 'lucide-react';
import { initialBooths } from '@/lib/data';

export default function HomePage() {
  const router = useRouter();
  const [pinModal, setPinModal] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '8888') {
      router.push('/admin');
    } else {
      setError(true);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-slate-100 p-4 max-w-md mx-auto flex flex-col justify-between">
      <div>
        {/* BDSフェス風 ヘッダー */}
        <div className="text-center my-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1 bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 rounded-full mb-3 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            関西大学 BDS学部 吹田みらいキャンパス
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white">
            キャンパス祭 <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">運営管理</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1.5">担当する出店・企画を選択してください</p>
        </div>

        {/* 現場スタッフ用 ブース選択カード */}
        <div className="space-y-3">
          {Object.values(initialBooths).map((booth) => (
            <Link
              key={booth.id}
              href={`/booth/${booth.id}`}
              className="flex items-center justify-between p-4 bg-slate-800/80 hover:bg-slate-800 rounded-2xl border border-slate-700/80 shadow-lg backdrop-blur-md active:scale-[0.98] transition group"
            >
              <div className="flex items-center space-x-3.5">
                <div className="w-12 h-12 rounded-xl bg-slate-700/50 flex items-center justify-center text-2xl border border-slate-600/40 group-hover:scale-105 transition">
                  {booth.icon}
                </div>
                <div>
                  <h2 className="font-bold text-base text-white group-hover:text-cyan-300 transition">
                    {booth.name} 担当
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">{booth.location}</p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-700/40 flex items-center justify-center group-hover:bg-cyan-500/20 transition">
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 総務部専用エリアへのリンク */}
      <div className="mt-8 mb-4">
        <button
          onClick={() => setPinModal(true)}
          className="w-full flex items-center justify-center space-x-2 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black rounded-xl text-sm shadow-lg shadow-cyan-950/50 active:scale-[0.99] transition"
        >
          <Lock className="w-4 h-4" />
          <span>総務部 設定・全体統括画面へ</span>
        </button>
      </div>

      {/* PINコード入力モーダル */}
      {pinModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-xs shadow-2xl text-white">
            <h3 className="font-bold text-base flex items-center gap-2 text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
              総務部 認証
            </h3>
            <p className="text-xs text-slate-400 mt-1">暗証番号（初期値: 8888）を入力</p>
            
            <form onSubmit={handleAdminLogin} className="mt-4">
              <input
                type="password"
                inputMode="numeric"
                maxLength={4}
                value={pin}
                onChange={(e) => { setPin(e.target.value); setError(false); }}
                placeholder="••••"
                className="w-full text-center text-2xl tracking-widest font-mono bg-slate-800 border border-slate-600 rounded-xl p-2.5 text-white focus:ring-2 focus:ring-cyan-400 outline-none"
                autoFocus
              />
              {error && <p className="text-xs text-rose-400 mt-1.5 text-center font-medium">PINが正しくありません</p>}
              
              <div className="flex gap-2 mt-5">
                <button
                  type="button"
                  onClick={() => setPinModal(false)}
                  className="flex-1 py-2.5 text-xs font-bold text-slate-300 bg-slate-800 rounded-xl hover:bg-slate-700 transition"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 text-xs font-black text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition"
                >
                  ログイン
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}