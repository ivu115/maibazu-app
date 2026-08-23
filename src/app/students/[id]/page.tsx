"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  Users, CalendarDays, LayoutDashboard, MessageSquare, Settings,
  ChevronLeft, MessageCircle, CheckCircle2, CreditCard, Music, Save, Heart, Home, Building2, Send, Video
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// 提携教室ごとの生徒詳細BPOデータ
const STUDENT_DATA: Record<string, any> = {
  "1": {
    studio: "S 教室（大阪・吹田）", instructor: "〇〇 先生",
    name: "田中 美咲", age: 22, course: "手ぶら1日体験パッケージ", joinDate: "2026年8月20日",
    paymentStatus: "事前決済完了", paymentDetail: "3,980円 (Stripeクレカ一括 / 利益: +1,990円)", song: "さくらさくら", progress: 100,
    videoWatched: true,
    note: "先日はありがとうございました！浴衣も貸していただけて手ぶらで楽しめました！すり足で姿勢がピシッと伸びてスッキリしました！", noteDate: "2026/08/20"
  },
  "2": {
    studio: "H 教室（兵庫・伊丹）", instructor: "△△ 先生",
    name: "佐藤 健太", age: 28, course: "手ぶら1日体験パッケージ", joinDate: "2026年8月22日",
    paymentStatus: "事前決済完了", paymentDetail: "4,500円 (Stripeクレカ一括 / 利益: +1,350円)", song: "黒髪", progress: 100,
    videoWatched: false,
    note: "丁寧な指導ありがとうございました。腰を入れる感覚が少しずつ分かってきました！", noteDate: "2026/08/22"
  },
  "3": {
    studio: "K 教室（東京・世田谷）", instructor: "◇◇ 先生",
    name: "Emily Watson", age: 25, course: "インバウンド手ぶら体験", joinDate: "2026年8月28日",
    paymentStatus: "事前決済完了", paymentDetail: "4,980円 (Stripeクレカ一括 / 利益: +2,490円)", song: "元禄花見踊り", progress: 50,
    videoWatched: true,
    note: "It was an amazing experience! How can I hold the fan correctly when turning?", noteDate: "2026/08/28"
  },
  "4": {
    studio: "S 教室（大阪・吹田）", instructor: "〇〇 先生",
    name: "鈴木 舞", age: 34, course: "手ぶら1日体験パッケージ", joinDate: "2026年8月25日",
    paymentStatus: "事前決済完了", paymentDetail: "3,980円 (Stripeクレカ一括 / 利益: +1,990円)", song: "藤娘", progress: 30,
    videoWatched: true,
    note: "お仕事帰りに参加予定です。当日の着付けよろしくお願いいたします！", noteDate: "2026/08/25"
  }
};

export default function StudentDetailPage() {
  const params = useParams();
  const id = (params?.id as string) || "1";
  const student = STUDENT_DATA[id] || STUDENT_DATA["1"];

  const [songName, setSongName] = useState(student.song);
  const [progressVal, setProgressVal] = useState(student.progress);
  const [isSaved, setIsSaved] = useState(false);

  const [selectedStamp, setSelectedStamp] = useState("💮 花丸");
  const [replyMessage, setReplyMessage] = useState("");
  const [replySent, setReplySent] = useState(false);

  const handleSaveProgress = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleSendReply = () => {
    if (!selectedStamp && !replyMessage) return;
    setReplySent(true);
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
          <Link href="/students"><NavItem icon={<Users size={20}/>} label="生徒名簿・属性データ" active={true} /></Link>
          <Link href="/sns"><NavItem icon={<MessageSquare size={20}/>} label="SNS投稿代行AI" active={false} /></Link>
          <Link href="/settings"><NavItem icon={<Settings size={20}/>} label="提携教室・手数料設定" active={false} /></Link>
        </nav>
        <div className="p-4 border-t border-white/10 opacity-70 text-[11px] font-bold text-white flex items-center gap-1.5">
          <Building2 size={14} className="text-[#E63946]" /> 担当: 舞バズ 事務局
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto text-black">
        <header className="bg-white border-b h-16 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="flex items-center text-slate-400 font-bold hover:text-[#E63946] text-xs transition-colors">
              <Home size={16} /> ホームへ
            </Link>
            <Link href="/students" className="flex items-center text-slate-400 font-bold hover:text-[#E63946] text-xs transition-colors">
              <ChevronLeft size={16} /> 名簿へ
            </Link>
          </div>
          <h2 className="font-extrabold text-base md:text-xl text-slate-800">BPO 代行生徒カルテ</h2>
        </header>

        <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6 md:space-y-8">
          {/* 基本情報 ＆ 所属教室 */}
          <Card className="border-none shadow-sm rounded-3xl p-6 md:p-8 bg-white flex flex-col md:flex-row items-center gap-6">
            <div className="size-16 md:size-20 rounded-2xl bg-[#1D3557] text-white flex items-center justify-center font-black text-xl md:text-2xl shrink-0 shadow-md">
              {student.name.charAt(0)}
            </div>
            <div className="flex-1 text-center md:text-left space-y-1">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                <span className="bg-[#1D3557] text-white text-xs font-black px-3 py-1 rounded-full">{student.studio}</span>
                <span className="text-xs text-slate-400 font-bold">担当: {student.instructor}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <h1 className="text-xl md:text-2xl font-black text-[#1D3557]">{student.name} 様</h1>
                <span className="text-[10px] md:text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                  {student.paymentStatus}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-bold">{student.age}歳 / {student.course}</p>
            </div>
          </Card>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="md:col-span-2 space-y-6">
              {/* 決済 ＆ 進捗 */}
              <Card className="border-none shadow-sm rounded-3xl bg-white p-6 space-y-6">
                <div className="flex items-center justify-between border-b pb-4">
                  <h3 className="font-bold text-sm md:text-base flex items-center gap-2 text-[#1D3557]">
                    <Music className="text-[#E63946]" size={18} /> 体験演目 ＆ 進捗（代理設定）
                  </h3>
                  <Button onClick={handleSaveProgress} size="sm" className="bg-[#1D3557] text-white text-xs rounded-xl font-bold gap-1">
                    <Save size={14} /> {isSaved ? "保存完了！" : "更新を保存"}
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold">
                  <div>
                    <label className="text-slate-400 block mb-1">体験演目 / 曲名</label>
                    <Input value={songName} onChange={(e) => setSongName(e.target.value)} className="bg-slate-50 border-none h-11 text-slate-800 font-bold" />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">体験達成度 ({progressVal}%)</label>
                    <input type="range" min="0" max="100" value={progressVal} onChange={(e) => setProgressVal(Number(e.target.value))} className="w-full accent-[#E63946] cursor-pointer mt-2" />
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between text-xs border border-slate-100">
                  <span className="text-slate-400 font-bold flex items-center gap-2"><CreditCard size={16} className="text-blue-500"/> Stripe決済明細</span>
                  <span className="font-extrabold text-[#1D3557]">{student.paymentDetail}</span>
                </div>
              </Card>

              {/* 生徒ノート ＆ BPO返信代行 */}
              <Card className="border-none shadow-sm rounded-3xl bg-white p-6 space-y-6">
                <h3 className="font-bold text-sm md:text-base flex items-center gap-2 text-[#1D3557]">
                  <MessageCircle className="text-[#E63946]" size={18} /> 生徒からの振り返りノート（BPO代行返信）
                </h3>
                
                <div className="bg-slate-50 p-5 md:p-6 rounded-2xl space-y-4 border border-slate-100">
                  <div className="flex justify-between items-center text-xs text-slate-400 font-bold">
                    <span>投稿日: {student.noteDate}</span>
                    <span className="text-[#E63946] bg-red-50 px-2 py-0.5 rounded font-black">BPO対応待ち</span>
                  </div>
                  <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium break-words">“{student.note}”</p>

                  <div className="pt-4 border-t border-slate-200 space-y-4">
                    <p className="text-xs font-bold text-slate-500">① スタンプを選択（代理送信）</p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {["💮 花丸", "🌸 大変よくできました", "⭐ グッド", "👍 バッチリ"].map((stamp) => (
                        <button key={stamp} onClick={() => setSelectedStamp(stamp)} className={`px-3 py-2 rounded-xl border font-bold transition-all ${selectedStamp === stamp ? 'bg-red-50 border-[#E63946] text-[#E63946]' : 'bg-white border-slate-200 text-slate-600'}`}>
                          {stamp}
                        </button>
                      ))}
                    </div>

                    <p className="text-xs font-bold text-slate-500 pt-1">② 舞バズ事務局コメント代理入力</p>
                    <textarea value={replyMessage} onChange={(e) => setReplyMessage(e.target.value)} placeholder="例：〇〇先生から『次回も楽しみにしています』とお言葉をいただいております！" className="w-full h-20 p-3 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-[#E63946]" />

                    {!replySent ? (
                      <Button onClick={handleSendReply} className="w-full bg-[#E63946] text-white text-xs font-bold py-5 rounded-xl gap-2 shadow-sm">
                        「{selectedStamp}」とメッセージを代理送信
                      </Button>
                    ) : (
                      <div className="bg-emerald-50 text-emerald-700 p-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border border-emerald-200">
                        <CheckCircle2 size={16} /> 生徒へ代理送信＆先生へLINE通知を送信しました！
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </div>

            {/* お稽古・事前動画ログ */}
            <div className="space-y-6">
              <Card className="border-none shadow-sm rounded-3xl bg-white p-6 space-y-4">
                <h3 className="font-bold text-xs text-slate-400 uppercase tracking-widest">BPO 予約・受講ステータス</h3>
                <div className="space-y-2 text-xs font-bold">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl text-slate-600">
                    <span className="flex items-center gap-1.5"><Video size={14} className="text-blue-500"/> 事前解説動画</span>
                    <span className={student.videoWatched ? "text-emerald-600" : "text-slate-300"}>
                      {student.videoWatched ? "視聴完了" : "未視聴"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl text-slate-600">
                    <span className="flex items-center gap-1.5"><CreditCard size={14} className="text-[#E63946]"/> Stripe事前決済</span>
                    <span className="text-emerald-600">決済済</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl text-slate-600">
                    <span className="flex items-center gap-1.5"><Send size={14} className="text-purple-500"/> 先生へのLINE通知</span>
                    <span className="text-emerald-600">送信済</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* スマホボトムバー */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1D3557] text-white border-t border-white/10 z-50 p-2 shadow-2xl">
        <div className="grid grid-cols-5 gap-1 text-center">
          <Link href="/dashboard" className="flex flex-col items-center py-2 rounded-xl text-white/60"><LayoutDashboard size={20} /><span className="text-[10px] mt-1 font-extrabold">ホーム</span></Link>
          <Link href="/schedule" className="flex flex-col items-center py-2 rounded-xl text-white/60"><CalendarDays size={20} /><span className="text-[10px] mt-1 font-extrabold">予定代行</span></Link>
          <Link href="/students" className="flex flex-col items-center py-2 rounded-xl bg-[#E63946] font-bold text-white shadow-sm"><Users size={20} /><span className="text-[10px] mt-1 font-extrabold">生徒</span></Link>
          <Link href="/sns" className="flex flex-col items-center py-2 rounded-xl text-white/60"><MessageSquare size={20} /><span className="text-[10px] mt-1 font-extrabold">SNS代行</span></Link>
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