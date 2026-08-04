"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, CalendarDays, LayoutDashboard, MessageSquare, Settings,
  Camera, Save, ShieldCheck, Zap, Globe, Smartphone, Check, ArrowUpRight, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  const [success, setSuccess] = useState(false);

  // 設定項目のステート（初期値）
  const [schoolName, setSchoolName] = useState("S 教室");
  const [teacherName, setTeacherName] = useState("花月 士宝菊");
  const [tagline, setTagline] = useState("20代・30代が8割。SNS世代のための日本舞踊。");
  const [price, setPrice] = useState("15,000円");
  const [features, setFeatures] = useState("20代〜30代の生徒が多数在籍。若手講師が伝統の所作を分かりやすく指導します。");
  const [tags, setTags] = useState("20代30代中心, 初心者特化");

  // 初回読み込み時に保存済みデータをセット
  useEffect(() => {
    const saved = localStorage.getItem('maibazu_school_1');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.name) setSchoolName(data.name);
        if (data.teacher) setTeacherName(data.teacher);
        if (data.tagline) setTagline(data.tagline);
        if (data.price) setPrice(data.price);
        if (data.desc) setFeatures(data.desc);
        if (data.tags) setTags(data.tags.join(', '));
      } catch (e) {}
    }
  }, []);

  // 保存処理（ローカルストレージへ保存）
  const handleSave = () => {
    const customData = {
      name: schoolName,
      teacher: teacherName,
      tagline: tagline,
      price: price,
      desc: features,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean)
    };
    localStorage.setItem('maibazu_school_1', JSON.stringify(customData));
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* サイドバー */}
      <aside className="w-64 bg-[#1D3557] text-white hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-[#E63946] p-1 rounded grow-0"><img src="/logo.png" alt="logo" className="w-6 h-6 invert brightness-0" /></div>
            <span className="font-black text-xl tracking-tighter text-white">舞バズ Admin</span>
          </Link>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1">
          <Link href="/dashboard"><NavItem icon={<LayoutDashboard size={20}/>} label="ダッシュボード" active={false} /></Link>
          <Link href="/schedule"><NavItem icon={<CalendarDays size={20}/>} label="お稽古スケジュール" active={false} /></Link>
          <Link href="/students"><NavItem icon={<Users size={20}/>} label="生徒名簿（CRM）" active={false} /></Link>
          <Link href="/sns"><NavItem icon={<MessageSquare size={20}/>} label="SNS投稿サポート" active={false} /></Link>
          <Link href="/settings"><NavItem icon={<Settings size={20}/>} label="教室設定" active={true} /></Link>
        </nav>
      </aside>

      {/* メイン */}
      <main className="flex-1 overflow-y-auto text-black font-sans">
        <header className="bg-white border-b h-16 flex items-center justify-between px-8 sticky top-0 z-10">
          <h2 className="font-extrabold text-xl text-slate-800">教室設定</h2>
          <div className="flex items-center gap-4">
            <Link href="/search/1" target="_blank">
              <Button size="sm" variant="outline" className="text-xs gap-1 border-slate-200 text-slate-600 font-bold">
                公開ページを確認 <ArrowUpRight size={14} />
              </Button>
            </Link>
            <Button onClick={handleSave} className="bg-[#E63946] hover:bg-[#D62839] gap-2 rounded-xl px-6 font-bold text-white shadow-lg shadow-red-100">
              <Save size={18} /> {success ? "保存して公開ページへ反映しました！" : "設定を保存して反映"}
            </Button>
          </div>
        </header>

        <div className="p-8 max-w-4xl mx-auto space-y-10">
          <section className="space-y-4">
            <div className="flex items-center gap-2 px-2">
              <Zap className="text-[#E63946]" size={18} />
              <h3 className="font-black text-slate-400 text-xs uppercase tracking-[0.2em]">教室プロフィール編集</h3>
            </div>
            <Card className="border-none shadow-sm rounded-3xl bg-white">
              <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">教室名</label>
                    <Input value={schoolName} onChange={e => setSchoolName(e.target.value)} className="bg-slate-50 border-none h-12 text-black font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">講師名</label>
                    <Input value={teacherName} onChange={e => setTeacherName(e.target.value)} className="bg-slate-50 border-none h-12 text-black font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">1日体験コース料金</label>
                    <Input value={price} onChange={e => setPrice(e.target.value)} className="bg-slate-50 border-none h-12 text-black font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">タグ（カンマ区切り）</label>
                    <Input value={tags} onChange={e => setTags(e.target.value)} className="bg-slate-50 border-none h-12 text-black font-bold" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">キャッチコピー</label>
                    <Input value={tagline} onChange={e => setTagline(e.target.value)} className="bg-slate-50 border-none h-12 text-black font-bold" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">教室の特徴・アピールポイント（公開ページに反映）</label>
                    <textarea 
                      value={features} 
                      onChange={e => setFeatures(e.target.value)} 
                      rows={4}
                      className="w-full bg-slate-50 border-none p-4 rounded-2xl text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-[#E63946]" 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2 px-2">
              <ShieldCheck className="text-[#E63946]" size={18} />
              <h3 className="font-black text-slate-400 text-xs uppercase tracking-[0.2em]">舞バズ認定ポリシー</h3>
            </div>
            <Card className="border-none shadow-sm rounded-3xl bg-[#1D3557] text-white">
              <CardContent className="p-8 space-y-3">
                <SettingToggle label="完全明朗会計（後からの追加請求なし）" checked />
                <SettingToggle label="手ぶら・衣装レンタル完全無料" checked />
                <SettingToggle label="初心者向け短尺邦楽（本格派）での稽古" checked />
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false }: any) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-[#E63946] text-white shadow-lg' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}>
      <span className={active ? "text-white" : "text-white/40"}>{icon}</span>
      <span className="text-sm font-bold">{label}</span>
    </div>
  );
}

function SettingToggle({ label, checked = false }: any) {
  const [val, setVal] = useState(checked);
  return (
    <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 cursor-pointer" onClick={() => setVal(!val)}>
      <span className="text-sm font-medium opacity-80">{label}</span>
      <div className={`w-10 h-6 rounded-full transition-colors relative ${val ? 'bg-[#E63946]' : 'bg-slate-700'}`}>
        <div className={`absolute top-1 size-4 bg-white rounded-full transition-all ${val ? 'left-5' : 'left-1'}`}></div>
      </div>
    </div>
  );
}