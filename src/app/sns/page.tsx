"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Users, CalendarDays, LayoutDashboard, MessageSquare, Settings,
  Sparkles, Copy, Check, Loader2, Home, ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SnsSupportPage() {
  const [inputText, setInputText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState("ここにAIが生成した文章が表示されます");
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    if (!inputText) return;
    setIsGenerating(true);

    setTimeout(() => {
      let result = "";
      if (inputText.includes("すり足")) {
        result = "日本舞踊の基本『すり足』。西洋のダンスが重心を上げるのに対し、日舞は極限まで重心を下げて地面を踏みしめます。この地味な動きが、実は体幹を鍛え、日常の歩き姿を上品に変えてくれるんです。あなたも『静の美』を体験しませんか？✨ #舞バズ #日本舞踊 #姿勢改善";
      } else if (inputText.includes("扇子")) {
        result = "扇子一本で、桜が舞い散る様子やしとしと降る雨を表現する。日本舞踊は、無駄を削ぎ落とする『引き算の美学』の世界です。難しいルールは抜きにして、まずは指先の美しさから始めてみましょう🌸 #舞バズ #和の心 #丁寧な暮らし";
      } else {
        result = `${inputText}についてお稽古しました！日本舞踊って、意外とハードだけど終わった後のスッキリ感が最高です。20代・30代の仲間と一緒に、新しい自分を見つけてみませんか？まずは手ぶらでオンデマンド予習からどうぞ！🍵 #舞バズ #趣味探し #自分磨き`;
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
          <Link href="/sns"><NavItem icon={<MessageSquare size={20}/>} label="SNS投稿サポート" active={true} /></Link>
          <Link href="/settings"><NavItem icon={<Settings size={20}/>} label="教室設定" active={false} /></Link>
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto text-black font-sans">
        <header className="bg-white border-b h-16 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="flex items-center gap-1 text-slate-400 hover:text-[#E63946] text-xs font-bold transition-colors">
              <Home size={16} /> ホームへ
            </Link>
            <h2 className="font-extrabold text-base md:text-xl text-slate-800">SNS投稿サポート AI</h2>
          </div>
          <Link href="/search/1" target="_blank">
            <Button size="sm" variant="outline" className="text-xs gap-1 border-slate-200 text-slate-600 font-bold">
              公開画面 <ArrowUpRight size={14} />
            </Button>
          </Link>
        </header>

        <div className="p-4 md:p-8 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <div className="space-y-6">
            <Card className="border-none shadow-sm rounded-3xl bg-white p-6 space-y-4">
              <h3 className="text-base font-bold">今日の稽古キーワードを入力</h3>
              <p className="text-[10px] text-[#E63946] font-black uppercase bg-red-50 px-2 py-1 rounded w-fit">ヒント：すり足、扇子など</p>
              <textarea 
                className="w-full h-28 p-3 bg-slate-50 rounded-2xl border-none text-xs outline-none focus:ring-2 focus:ring-[#E63946]"
                placeholder="例：今日はすり足を重点的に稽古しました。"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <Button 
                onClick={handleGenerate} 
                disabled={isGenerating || !inputText}
                className="w-full bg-[#1D3557] hover:bg-[#2A4A7A] py-6 rounded-2xl font-bold gap-2 text-white text-xs"
              >
                {isGenerating ? <><Loader2 className="animate-spin" size={16}/> 生成中...</> : <><Sparkles className="text-[#E63946]" size={16}/> 20代に刺さる文章に変換</>}
              </Button>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden bg-white">
              <div className="bg-slate-50 py-3 px-6 border-b text-[10px] font-black text-slate-400 uppercase">
                Instagram Preview
              </div>
              <CardContent className="p-6 space-y-4">
                <p className={`text-xs md:text-sm text-slate-600 leading-relaxed min-h-[100px] break-words ${isGenerating ? 'opacity-20' : 'opacity-100'}`}>
                  {generatedText}
                </p>
                <Button 
                  onClick={handleCopy}
                  className={`w-full py-5 rounded-xl font-bold text-xs text-white ${copied ? 'bg-green-500' : 'bg-[#E63946]'}`}
                >
                  {copied ? <><Check size={16} className="mr-1" /> コピー完了</> : <><Copy size={16} className="mr-1" /> 本文をコピーする</>}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1D3557] text-white border-t border-white/10 z-50 p-2 shadow-2xl">
        <div className="grid grid-cols-5 gap-1 text-center">
          <Link href="/dashboard" className="flex flex-col items-center py-2 rounded-xl text-white/60"><LayoutDashboard size={20} /><span className="text-[10px] mt-1 font-extrabold">ホーム</span></Link>
          <Link href="/schedule" className="flex flex-col items-center py-2 rounded-xl text-white/60"><CalendarDays size={20} /><span className="text-[10px] mt-1 font-extrabold">予定</span></Link>
          <Link href="/students" className="flex flex-col items-center py-2 rounded-xl text-white/60"><Users size={20} /><span className="text-[10px] mt-1 font-extrabold">生徒</span></Link>
          <Link href="/sns" className="flex flex-col items-center py-2 rounded-xl bg-[#E63946] font-bold text-white shadow-sm"><MessageSquare size={20} /><span className="text-[10px] mt-1 font-extrabold">AI文章</span></Link>
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