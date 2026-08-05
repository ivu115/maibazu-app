"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, CalendarDays, LayoutDashboard, MessageSquare, Settings,
  Save, ShieldCheck, Zap, Globe, Smartphone, Check, Home, ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  const [success, setSuccess] = useState(false);

  const [schoolName, setSchoolName] = useState("S 教室");
  const [teacherName, setTeacherName] = useState("佐藤 太郎");
  const [tagline, setTagline] = useState("20代・30代が8割。SNS世代のための日本舞踊。");
  const [price, setPrice] = useState("15,000円");
  const [features, setFeatures] = useState("20代〜30代の生徒が多数在籍。若手講師が伝統の所作を分かりやすく指導します。");
  const [tags, setTags] = useState("20代30代中心, 初心者特化");

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
    <div className="flex min-h-screen bg-[#F8FAFC] pb-24 md:pb-0">
      <aside className="w-64 bg-[#1D3557] text-white hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-3">
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

      <main className="flex-1 overflow-y-auto text-black font-sans">
        <header className="bg-white border-b h-16 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="flex items-center gap-1 text-slate-400 hover:text-[#E63946] text-xs font-bold transition-colors">
              <Home size={16} /> ホームへ
            </Link>
            <h2 className="font-extrabold text-base md:text-xl text-slate-800">教室設定</h2>
          </div>
          <Button onClick={handleSave} className="bg-[#E63946] hover:bg-[#D62839] text-white gap-2 rounded-xl px-4 md:px-6 font-bold text-xs shadow-md">
            <Save size={16} /> {success ? "保存完了！" : "設定を保存"}
          </Button>
        </header>

        <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8">
          <section className="space-y-3">
            <div className="flex items-center gap-2 px-2">
              <Zap className="text-[#E63946]" size={18} />
              <h3 className="font-black text-slate-400 text-xs uppercase tracking-widest">教室プロフィール編集</h3>
            </div>
            <Card className="border-none shadow-sm rounded-3xl bg-white p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold">
                <div>
                  <label className="text-slate-400 block mb-1">教室名</label>
                  <Input value={schoolName} onChange={e => setSchoolName(e.target.value)} className="bg-slate-50 border-none h-11 text-black font-bold" />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">講師名</label>
                  <Input value={teacherName} onChange={e => setTeacherName(e.target.value)} className="bg-slate-50 border-none h-11 text-black font-bold" />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">1日体験コース料金</label>
                  <Input value={price} onChange={e => setPrice(e.target.value)} className="bg-slate-50 border-none h-11 text-black font-bold" />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">タグ（カンマ区切り）</label>
                  <Input value={tags} onChange={e => setTags(e.target.value)} className="bg-slate-50 border-none h-11 text-black font-bold" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-slate-400 block mb-1">キャッチコピー</label>
                  <Input value={tagline} onChange={e => setTagline(e.target.value)} className="bg-slate-50 border-none h-11 text-black font-bold" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-slate-400 block mb-1">教室の特徴・メッセージ</label>
                  <textarea value={features} onChange={e => setFeatures(e.target.value)} rows={3} className="w-full bg-slate-50 border-none p-3 rounded-xl text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-[#E63946]" />
                </div>
              </div>
            </Card>
          </section>
        </div>
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1D3557] text-white border-t border-white/10 z-50 p-2 shadow-2xl">
        <div className="grid grid-cols-5 gap-1 text-center">
          <Link href="/dashboard" className="flex flex-col items-center py-2 rounded-xl text-white/60"><LayoutDashboard size={20} /><span className="text-[10px] mt-1 font-extrabold">ホーム</span></Link>
          <Link href="/schedule" className="flex flex-col items-center py-2 rounded-xl text-white/60"><CalendarDays size={20} /><span className="text-[10px] mt-1 font-extrabold">予定</span></Link>
          <Link href="/students" className="flex flex-col items-center py-2 rounded-xl text-white/60"><Users size={20} /><span className="text-[10px] mt-1 font-extrabold">生徒</span></Link>
          <Link href="/sns" className="flex flex-col items-center py-2 rounded-xl text-white/60"><MessageSquare size={20} /><span className="text-[10px] mt-1 font-extrabold">AI文章</span></Link>
          <Link href="/settings" className="flex flex-col items-center py-2 rounded-xl bg-[#E63946] font-bold text-white shadow-sm"><Settings size={20} /><span className="text-[10px] mt-1 font-extrabold">設定</span></Link>
        </div>
      </nav>
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