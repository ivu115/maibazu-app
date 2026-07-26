"use client";

import React, { useState } from 'react';
import Link from 'next/link'; // 👈 移動に必須
import { 
  Users, 
  CalendarDays, 
  LayoutDashboard, 
  MessageSquare, 
  Settings,
  Camera,
  Save,
  ShieldCheck,
  Zap,
  Globe,
  Smartphone,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  const [success, setSuccess] = useState(false);

  const handleSave = () => {
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* 🏰 サイドバー（共通ナビゲーション） */}
      <aside className="w-64 bg-[#1D3557] text-white hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-[#E63946] p-1 rounded grow-0">
               <img src="/logo.png" alt="logo" className="w-6 h-6 invert brightness-0" />
            </div>
            <span className="font-black text-xl tracking-tighter">舞バズ Admin</span>
          </Link>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1">
          <Link href="/dashboard"><NavItem icon={<LayoutDashboard size={20}/>} label="ダッシュボード" active={false} /></Link>
          <Link href="/schedule"><NavItem icon={<CalendarDays size={20}/>} label="お稽古スケジュール" active={false} /></Link>
          <Link href="/students"><NavItem icon={<Users size={20}/>} label="生徒名簿（CRM）" active={false} /></Link>
          <Link href="/sns"><NavItem icon={<MessageSquare size={20}/>} label="SNS投稿サポート" active={false} /></Link>
          <Link href="/settings"><NavItem icon={<Settings size={20}/>} label="教室設定" active={true} /></Link>
        </nav>
        <div className="p-4 border-t border-white/10 opacity-50 text-[10px] font-bold">
           講師：花月 士宝菊 先生
        </div>
      </aside>

      {/* ⚙️ メインコンテンツ */}
      <main className="flex-1 overflow-y-auto text-black font-sans">
        <header className="bg-white border-b h-16 flex items-center justify-between px-8 sticky top-0 z-10">
          <h2 className="font-extrabold text-xl text-slate-800">教室設定</h2>
          <Button onClick={handleSave} className="bg-[#E63946] hover:bg-[#D62839] gap-2 rounded-xl px-6 font-bold shadow-lg shadow-red-100 transition-all text-white">
            {success ? <><Check size={18} /> 保存しました</> : <><Save size={18} /> 設定を保存</>}
          </Button>
        </header>

        <div className="p-8 max-w-4xl mx-auto space-y-10">
          
          {/* 1. 基本プロフィール */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 px-2">
              <Zap className="text-[#E63946]" size={18} />
              <h3 className="font-black text-slate-400 text-xs uppercase tracking-[0.2em]">Profile</h3>
            </div>
            <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
              <CardContent className="p-8 space-y-8">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex flex-col items-center gap-4">
                    <div className="size-24 rounded-[2rem] bg-slate-50 flex items-center justify-center text-slate-300 border-2 border-dashed border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors group relative overflow-hidden">
                      <img src="/logo.png" alt="Profile" className="w-full h-full object-contain p-4 opacity-40 group-hover:opacity-10" />
                      <Camera size={24} className="absolute opacity-0 group-hover:opacity-100 transition-opacity text-[#E63946]" />
                    </div>
                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Update Logo</p>
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    <div className="space-y-2 text-black">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">教室名</label>
                      <Input defaultValue="S 教室" className="bg-slate-50 border-none h-12 text-black" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">講師名</label>
                      <Input defaultValue="花月 士宝菊" className="bg-slate-50 border-none h-12 text-black" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">公式キャッチコピー</label>
                      <Input defaultValue="20代・30代が8割。SNS世代のための日本舞踊。" className="bg-slate-50 border-none h-12 text-black" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* 2. 舞バズ認定・基準設定（ブランドの核） */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 px-2">
              <ShieldCheck className="text-[#E63946]" size={18} />
              <h3 className="font-black text-slate-400 text-xs uppercase tracking-[0.2em]">Maibazu Policy</h3>
            </div>
            <Card className="border-none shadow-sm rounded-3xl bg-[#1D3557] text-white">
              <CardHeader className="px-8 pt-8">
                <CardTitle className="text-lg font-bold">認定条件の公開設定</CardTitle>
                <p className="text-xs opacity-50">ポータルサイトで「安心の証」としてバッジ表示されます。</p>
              </CardHeader>
              <CardContent className="p-8 pt-4 space-y-3">
                <SettingToggle label="完全明朗会計（一律 15,000円）" checked />
                <SettingToggle label="手ぶら・衣装レンタル完全無料" checked />
                <SettingToggle label="J-POP、最新ヒット曲での稽古対応" checked />
                <SettingToggle label="稽古中のSNS動画撮影・投稿OK" checked />
              </CardContent>
            </Card>
          </section>

          {/* 3. 外部連携 */}
          <section className="space-y-4 text-black">
            <div className="flex items-center gap-2 px-2 text-black">
              <Globe className="text-[#E63946]" size={18} />
              <h3 className="font-black text-slate-400 text-xs uppercase tracking-[0.2em]">Integrations</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <Card className="border-none shadow-sm rounded-2xl p-6 flex flex-row items-center justify-between group cursor-pointer hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                  <div className="flex items-center gap-4">
                     <div className="p-3 bg-slate-50 text-slate-400 rounded-xl group-hover:bg-[#E63946] group-hover:text-white transition-colors">
                        <Camera size={20} />
                     </div>
                     <div>
                        <p className="font-bold text-sm">Instagram</p>
                        <p className="text-[10px] text-slate-400">@maibazu_official</p>
                     </div>
                  </div>
                  <span className="text-[9px] font-black text-green-500 bg-green-50 px-2 py-0.5 rounded uppercase">Connected</span>
               </Card>

               <Card className="border-none shadow-sm rounded-2xl p-6 flex flex-row items-center justify-between group cursor-pointer hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 text-black">
                  <div className="flex items-center gap-4 text-black">
                     <div className="p-3 bg-slate-50 text-slate-400 rounded-xl group-hover:bg-green-500 group-hover:text-white transition-colors text-black">
                        <Smartphone size={20} />
                     </div>
                     <div className="text-black">
                        <p className="font-bold text-sm">LINE Official</p>
                        <p className="text-[10px] text-slate-400">Not connected</p>
                     </div>
                  </div>
                  <span className="text-[9px] font-black text-[#E63946] bg-red-50 px-2 py-0.5 rounded uppercase font-bold">Unset</span>
               </Card>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

// ─── コンポーネント ───

function NavItem({ icon, label, active = false }: any) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-[#E63946] text-white shadow-lg shadow-red-500/20' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}>
      <span className={active ? "text-white" : "text-white/40"}>{icon}</span>
      <span className="text-sm font-bold">{label}</span>
    </div>
  );
}

function SettingToggle({ label, checked = false }: any) {
  const [val, setVal] = useState(checked);
  return (
    <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer" onClick={() => setVal(!val)}>
      <span className="text-sm font-medium opacity-80">{label}</span>
      <div className={`w-10 h-6 rounded-full transition-colors relative ${val ? 'bg-[#E63946]' : 'bg-slate-700'}`}>
        <div className={`absolute top-1 size-4 bg-white rounded-full transition-all ${val ? 'left-5' : 'left-1'}`}></div>
      </div>
    </div>
  );
}