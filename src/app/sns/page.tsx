"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  CalendarDays, 
  LayoutDashboard, 
  MessageSquare, 
  Settings,
  Sparkles,
  Camera,
  Copy,
  Check,
  Video,
  Loader2,
  Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SnsSupportPage() {
  const [inputText, setInputText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState("ここにAIが生成した文章が表示されます");
  const [copied, setCopied] = useState(false);

  // ─── 擬似AIの生成ロジック ───
  const handleGenerate = () => {
    if (!inputText) return;
    setIsGenerating(true);

    setTimeout(() => {
      let result = "";
      if (inputText.includes("すり足")) {
        result = "日本舞踊の基本『すり足』。西洋のダンスが重心を上げるのに対し、日舞は極限まで重心を下げて地面を踏みしめます。この地味な動きが、実は体幹を鍛え、日常の歩き姿を上品に変えてくれるんです。あなたも『静の美』を体験しませんか？✨ #舞バズ #日本舞踊 #姿勢改善";
      } else if (inputText.includes("扇子")) {
        result = "扇子一本で、桜が舞い散る様子やしとしと降る雨を表現する。日本舞踊は、無駄を削ぎ落とす『引き算の美学』の世界です。難しいルールは抜きにして、まずは指先の美しさから始めてみましょう🌸 #舞バズ #和の心 #丁寧な暮らし";
      } else if (inputText.includes("J-POP") || inputText.includes("YOASOBI") || inputText.includes("アイドル")) {
        result = "今日はYOASOBIの曲に合わせてお稽古！「伝統＝古い」をアップデート。自分がいつも聴いている音楽で、日本古来の美しい所作を身につける。舞バズなら、日本舞踊をもっと身近に、もっと楽しく始められます🎧 #舞バズ #推し活 #日本舞踊体験";
      } else {
        result = `${inputText}についてお稽古しました！日本舞踊って、意外とハードだけど終わった後のスッキリ感が最高です。20代・30代の仲間と一緒に、新しい自分を見つけてみませんか？まずは手ぶらで3回体験からどうぞ！🍵 #舞バズ #趣味探し #自分磨き`;
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
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* 🏰 サイドバー（共通ナビゲーション） */}
      <aside className="w-64 bg-[#1D3557] text-white hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-[#E63946] p-1 rounded">
               <img src="/logo.png" alt="logo" className="w-6 h-6 invert brightness-0" />
            </div>
            <span className="font-black text-xl tracking-tighter">舞バズ Admin</span>
          </Link>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1">
          <Link href="/dashboard"><NavItem icon={<LayoutDashboard size={20}/>} label="ダッシュボード" active={false} /></Link>
          <Link href="/schedule"><NavItem icon={<CalendarDays size={20}/>} label="お稽古スケジュール" active={false} /></Link>
          <Link href="/students"><NavItem icon={<Users size={20}/>} label="生徒名簿（CRM）" active={false} /></Link>
          <Link href="/sns"><NavItem icon={<MessageSquare size={20}/>} label="SNS投稿サポート" active={true} /></Link>
          <Link href="/settings"><NavItem icon={<Settings size={20}/>} label="教室設定" active={false} /></Link>
        </nav>
        <div className="p-4 border-t border-white/10 opacity-50 text-[10px] font-bold">
           講師：花月 士宝菊 先生
        </div>
      </aside>

      {/* 📱 メインコンテンツ */}
      <main className="flex-1 overflow-y-auto text-black">
        <header className="bg-white border-b h-16 flex items-center px-8 sticky top-0 z-10">
          <h2 className="font-extrabold text-xl text-slate-800">SNS投稿サポート AI</h2>
        </header>

        <div className="p-8 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 font-sans">
          {/* 左：入力 */}
          <div className="space-y-6">
            <Card className="border-none shadow-sm rounded-3xl bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-bold">今日の稽古のポイントを入力</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-[10px] text-[#E63946] font-black uppercase bg-red-50 px-2 py-1 rounded w-fit">ヒント：すり足、扇子、J-POP</p>
                <textarea 
                  className="w-full h-32 p-4 bg-slate-50 rounded-2xl border-none text-sm focus:ring-2 focus:ring-[#E63946] outline-none"
                  placeholder="例：今日はすり足を重点的に稽古しました。"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
                <Button 
                  onClick={handleGenerate} 
                  disabled={isGenerating || !inputText}
                  className="w-full bg-[#1D3557] hover:bg-[#2A4A7A] py-7 rounded-2xl font-bold gap-2 text-white"
                >
                  {isGenerating ? <><Loader2 className="animate-spin" /> 生成中...</> : <><Sparkles className="text-[#E63946]" /> 20代に刺さる文章に変換</>}
                </Button>
              </CardContent>
            </Card>

            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
               <p className="font-bold text-sm text-[#1D3557] mb-2 flex items-center gap-2">
                 <Sparkles size={16} className="text-[#E63946]" /> AI翻訳のこだわり
               </p>
               <p className="text-xs text-slate-500 leading-relaxed font-medium">
                 「重心の違い」や「引き算の美学」といった日本舞踊ならではの魅力を、若者のライフサイクルに合わせた言葉で再定義して発信します。
               </p>
            </div>
          </div>

          {/* 右：プレビュー */}
          <div className="space-y-6">
            <Card className="border-none shadow-xl rounded-[3rem] overflow-hidden bg-white">
              <CardHeader className="bg-slate-50 py-3 px-6 border-b border-slate-100">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Instagram Preview</span>
              </CardHeader>
              <CardContent className="p-0">
                <div className="aspect-square bg-slate-100 relative">
                  <img src="/group.jpg" alt="preview" className="w-full h-full object-cover" />
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="size-6 rounded-full overflow-hidden border">
                      <img src="/logo.png" alt="icon" />
                    </div>
                    <span className="text-[10px] font-black italic">maibazu_official</span>
                  </div>
                  <p className={`text-sm text-slate-600 leading-relaxed min-h-[100px] ${isGenerating ? 'opacity-20' : 'opacity-100'} transition-opacity`}>
                    {generatedText}
                  </p>
                  <Button 
                    onClick={handleCopy}
                    className={`w-full py-6 rounded-xl font-bold transition-all text-white ${copied ? 'bg-green-500' : 'bg-[#E63946] hover:bg-[#D62839]'}`}
                  >
                    {copied ? <><Check size={18} className="mr-2" /> コピー完了</> : <><Copy size={18} className="mr-2" /> 本文をコピーする</>}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false }: any) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-[#E63946] text-white shadow-lg' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}>
      {icon}
      <span className="text-sm font-bold">{label}</span>
    </div>
  );
}