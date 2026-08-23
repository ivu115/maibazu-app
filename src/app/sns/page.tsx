"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Users, CalendarDays, LayoutDashboard, MessageSquare, Settings,
  Sparkles, Copy, Check, Loader2, Home, ArrowUpRight, Building2, Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// 提携教室リスト
const STUDIOS = [
  { id: "1", name: "S 教室（大阪・吹田）", tone: "20代・初心者向け ポップ＆親しみやすいトーン" },
  { id: "2", name: "H 教室（兵庫・伊丹）", tone: "30代・大人の教養向け 落ち着いた上質なトーン" },
  { id: "3", name: "K 教室（東京・世田谷）", tone: "インバウンド・夜間対応 エレガントなトーン" },
];

export default function SnsSupportPage() {
  const [selectedStudio, setSelectedStudio] = useState("1");
  const [inputText, setInputText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState("ここに舞バズAIが生成した教室別Instagram広報文が表示されます");
  const [copied, setCopied] = useState(false);

  const currentStudioInfo = STUDIOS.find(s => s.id === selectedStudio);

  const handleGenerate = () => {
    if (!inputText) return;
    setIsGenerating(true);

    setTimeout(() => {
      let result = "";
      if (selectedStudio === "1") {
        // S教室（20代初心者ポップ）
        result = `【${currentStudioInfo?.name} 稽古日記🌸】\n\n${inputText}についてお稽古しました！\n日本舞踊って敷居が高いと思われがちですが、舞バズなら浴衣レンタルも込みで手ぶらでOK✨\n同世代の仲間と一緒に、姿勢スッキリ＆自分磨き始めてみませんか？\n\nご予約はプロフィールのリンクからタップ1つでOKです！予約枠残りわずかです！\n\n#舞バズ #日本舞踊 #大阪習い事 #吹田 #姿勢改善 #自分磨き`;
      } else if (selectedStudio === "2") {
        // H教室（落ち着いた大人向け）
        result = `【${currentStudioInfo?.name} 稽古のひととき🍵】\n\n本日のお稽古キーワードは「${inputText}」。\n無駄な動きを削ぎ落とした「引き算の美」に触れ、日々の忙しさを忘れる上質な時間をお届けしています。\n手ぶらで気軽に体験いただけますので、大人の教養として日本伝統の美しさを体感してみませんか？\n\n#舞バズ #日本舞踊 #伊丹 #大人の習い事 #和の心 #丁寧な暮らし`;
      } else {
        // K教室（インバウンド・夜間）
        result = `【${currentStudioInfo?.name} Japanese Dance Experience👘】\n\nToday's practice theme: ${inputText}.\nDiscover the beauty of Japanese traditional dance in Tokyo! Hands-free trial available with full kimono rental.\n\n#Maibazu #JapaneseDance #Setagaya #TokyoTravel #JapanCulture`;
      }
      setGeneratedText(result);
      setIsGenerating(false);
    }, 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] pb-24 md:pb-0 text-black font-sans">
      {/* PC用サイドバー */}
      <aside className="w-64 bg-[#1D3557] text-white hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="bg-[#E63946] p-1 rounded grow-0"><img src="/logo.png" alt="logo" className="w-6 h-6 invert brightness-0" /></div>
            <span className="font-black text-xl tracking-tighter text-white">舞バズ BPO Admin</span>
          </Link>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1">
          <Link href="/dashboard"><NavItem icon={<LayoutDashboard size={20}/>} label="統合ダッシュボード" active={false} /></Link>
          <Link href="/schedule"><NavItem icon={<CalendarDays size={20}/>} label="お稽古枠 代理設定" active={false} /></Link>
          <Link href="/students"><NavItem icon={<Users size={20}/>} label="生徒名簿・属性データ" active={false} /></Link>
          <Link href="/sns"><NavItem icon={<MessageSquare size={20}/>} label="SNS投稿代行AI" active={true} /></Link>
          <Link href="/settings"><NavItem icon={<Settings size={20}/>} label="提携教室・手数料設定" active={false} /></Link>
        </nav>
        <div className="p-4 border-t border-white/10 opacity-70 text-[11px] font-bold text-white flex items-center gap-1.5">
          <Building2 size={14} className="text-[#E63946]" /> 担当: 舞バズ 事務局
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto text-black">
        <header className="bg-white border-b h-16 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="flex items-center gap-1 text-slate-400 hover:text-[#E63946] text-xs font-bold transition-colors">
              <Home size={16} /> ホームへ
            </Link>
            <h2 className="font-extrabold text-base md:text-xl text-slate-800">SNS広報 投稿代行AI</h2>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-xl text-xs font-bold text-[#1D3557]">
            <Building2 size={16} className="text-[#E63946]" />
            <select 
              value={selectedStudio} 
              onChange={(e) => setSelectedStudio(e.target.value)}
              className="bg-transparent font-bold focus:outline-none cursor-pointer text-[#1D3557]"
            >
              {STUDIOS.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <div className="space-y-6">
            <Card className="border-none shadow-sm rounded-3xl bg-white p-6 space-y-4">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-[#1D3557]">投稿代行のキーメモを入力</h3>
                <p className="text-xs text-slate-400 font-bold">対象トーン: <span className="text-[#E63946]">{currentStudioInfo?.tone}</span></p>
              </div>

              <textarea 
                className="w-full h-32 p-3 bg-slate-50 rounded-2xl border-none text-xs font-bold outline-none focus:ring-2 focus:ring-[#E63946]"
                placeholder="例：今日はすり足と扇子の扱いを指導。生徒さんはPosture（姿勢）の伸びに感動していました。"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />

              <Button 
                onClick={handleGenerate} 
                disabled={isGenerating || !inputText}
                className="w-full bg-[#1D3557] hover:bg-[#2A4A7A] py-6 rounded-2xl font-bold gap-2 text-white text-xs shadow-md"
              >
                {isGenerating ? <><Loader2 className="animate-spin" size={16}/> 教室トーンに合わせ広報文を生成中...</> : <><Sparkles className="text-[#E63946]" size={16}/> {currentStudioInfo?.name} 用のInstagram本文を生成</>}
              </Button>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden bg-white">
              <div className="bg-slate-50 py-3.5 px-6 border-b text-[10px] font-black text-slate-400 uppercase flex justify-between items-center">
                <span>Instagram Post Preview</span>
                <span className="text-[#E63946] font-bold">{currentStudioInfo?.name} 代行</span>
              </div>
              <CardContent className="p-6 space-y-4">
                <p className={`text-xs md:text-sm text-slate-700 leading-relaxed min-h-[140px] whitespace-pre-wrap break-words font-medium ${isGenerating ? 'opacity-20' : 'opacity-100'}`}>
                  {generatedText}
                </p>
                <Button 
                  onClick={handleCopy}
                  className={`w-full py-5 rounded-xl font-bold text-xs text-white shadow-md ${copied ? 'bg-emerald-500' : 'bg-[#E63946] hover:bg-[#D62839]'}`}
                >
                  {copied ? <><Check size={16} className="mr-1" /> コピー完了！Instagramへ代行投稿準備OK</> : <><Copy size={16} className="mr-1" /> 広報本文をコピーして代行投稿</>}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* スマホボトムバー */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1D3557] text-white border-t border-white/10 z-50 p-2 shadow-2xl">
        <div className="grid grid-cols-5 gap-1 text-center">
          <Link href="/dashboard" className="flex flex-col items-center py-2 rounded-xl text-white/60"><LayoutDashboard size={20} /><span className="text-[10px] mt-1 font-extrabold">ホーム</span></Link>
          <Link href="/schedule" className="flex flex-col items-center py-2 rounded-xl text-white/60"><CalendarDays size={20} /><span className="text-[10px] mt-1 font-extrabold">予定代行</span></Link>
          <Link href="/students" className="flex flex-col items-center py-2 rounded-xl text-white/60"><Users size={20} /><span className="text-[10px] mt-1 font-extrabold">生徒</span></Link>
          <Link href="/sns" className="flex flex-col items-center py-2 rounded-xl bg-[#E63946] font-bold text-white shadow-sm"><MessageSquare size={20} /><span className="text-[10px] mt-1 font-extrabold">SNS代行</span></Link>
          <Link href="/settings" className="flex flex-col items-center py-2 rounded-xl text-white/60"><Settings size={20} /><span className="text-[10px] mt-1 font-extrabold">設定</span></Link>
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