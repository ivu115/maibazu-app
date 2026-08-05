"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  Users, CalendarDays, LayoutDashboard, MessageSquare, Settings,
  ChevronLeft, MessageCircle, CheckCircle2, CreditCard, Music, Save, Heart, Home
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const STUDENT_DATA: Record<string, any> = {
  "1": {
    name: "田中 美咲", age: 22, course: "ハイブリッド体験コース", joinDate: "2026年7月20日",
    paymentStatus: "決済完了", paymentDetail: "15,000円 (クレジットカード一括)", song: "さくらさくら", progress: 70,
    note: "昨日はありがとうございました！すり足が難しかったですが、自分の姿勢がピンと伸びる感覚があってすごくスッキリしました！自宅で復習する時のコツはありますか？", noteDate: "2026/07/20"
  },
  "2": {
    name: "佐藤 健太", age: 28, course: "初級月謝コース", joinDate: "2026年2月15日",
    paymentStatus: "決済完了", paymentDetail: "8,000円/月 (自動引き落とし)", song: "黒髪", progress: 40,
    note: "いつも丁寧な指導ありがとうございます。腰を入れる感覚が少しずつ分かってきました。次回もよろしくお願いします！", noteDate: "2026/07/22"
  },
  "3": {
    name: "Emily Watson", age: 25, course: "インバウンド体験コース", joinDate: "2026年7月25日",
    paymentStatus: "決済完了", paymentDetail: "18,000円 (クレジットカード一括)", song: "元禄花見踊り", progress: 30,
    note: "It was an amazing experience! How can I hold the fan correctly when turning?", noteDate: "2026/07/25"
  },
  "4": {
    name: "鈴木 花子", age: 34, course: "中級月謝コース", joinDate: "2024年4月10日",
    paymentStatus: "未納あり（確認中）", paymentDetail: "8,000円/月 (振り込み待ち)", song: "藤娘", progress: 85,
    note: "最近仕事が忙しくなかなか伺えずすみません！来週の土曜日はお稽古に伺えそうです。", noteDate: "2026/07/15"
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
    <div className="flex min-h-screen bg-[#F8FAFC]">
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
          <Link href="/students"><NavItem icon={<Users size={20}/>} label="生徒名簿（CRM）" active={true} /></Link>
          <Link href="/sns"><NavItem icon={<MessageSquare size={20}/>} label="SNS投稿サポート" active={false} /></Link>
          <Link href="/settings"><NavItem icon={<Settings size={20}/>} label="教室設定" active={false} /></Link>
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto text-black font-sans pb-24 md:pb-0">
        <header className="bg-white border-b h-16 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            {/* 👈 ホーム画面へ戻るボタンを追加 */}
            <Link href="/" className="flex items-center text-slate-400 font-bold hover:text-[#E63946] text-xs mr-2 transition-colors">
              <Home size={16} /> ホームへ
            </Link>
            <Link href="/students" className="flex items-center text-slate-400 font-bold hover:text-[#E63946] text-xs transition-colors">
              <ChevronLeft size={16} /> 名簿へ戻る
            </Link>
          </div>
          <h2 className="font-extrabold text-xl text-slate-800">生徒カルテ</h2>
        </header>

        <div className="p-8 max-w-5xl mx-auto space-y-8">
          <Card className="border-none shadow-sm rounded-3xl p-8 bg-white flex flex-col md:flex-row items-center gap-8">
            <div className="size-20 rounded-full bg-red-50 text-[#E63946] flex items-center justify-center font-black text-2xl border-2 border-red-100 shrink-0">
              {student.name.charAt(0)}
            </div>
            <div className="flex-1 text-center md:text-left space-y-2">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <h1 className="text-2xl font-black">{student.name} 様</h1>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${student.paymentStatus.includes('完了') ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                  {student.paymentStatus}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-bold">{student.age}歳 / {student.course} / 受講開始: {student.joinDate}</p>
            </div>
          </Card>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <Card className="border-none shadow-sm rounded-3xl bg-white p-6 space-y-6">
                <div className="flex items-center justify-between border-b pb-4">
                  <h3 className="font-bold text-base flex items-center gap-2 text-[#1D3557]">
                    <Music className="text-[#E63946]" size={18} /> 稽古曲と進捗度（先生入力欄）
                  </h3>
                  <Button onClick={handleSaveProgress} size="sm" className="bg-[#1D3557] text-white text-xs rounded-xl font-bold gap-1">
                    <Save size={14} /> {isSaved ? "保存完了！" : "更新を保存"}
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold">
                  <div>
                    <label className="text-slate-400 block mb-2">稽古中の演目 / 曲名</label>
                    <Input value={songName} onChange={(e) => setSongName(e.target.value)} className="bg-slate-50 border-none h-11 text-slate-800 font-bold" />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-2">習得進捗度 ({progressVal}%)</label>
                    <input type="range" min="0" max="100" value={progressVal} onChange={(e) => setProgressVal(Number(e.target.value))} className="w-full accent-[#E63946] cursor-pointer mt-2" />
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-bold flex items-center gap-2"><CreditCard size={16}/> 支払い状況</span>
                  <span className="font-extrabold text-[#1D3557]">{student.paymentDetail}</span>
                </div>
              </Card>

              <Card className="border-none shadow-sm rounded-3xl bg-white p-6 space-y-6">
                <h3 className="font-bold text-base flex items-center gap-2 text-[#1D3557]">
                  <MessageCircle className="text-[#E63946]" size={18} /> 生徒からの振り返りノート
                </h3>
                
                <div className="bg-slate-50 p-6 rounded-2xl space-y-4 border border-slate-100">
                  <div className="flex justify-between items-center text-xs text-slate-400 font-bold">
                    <span>投稿日: {student.noteDate}</span>
                    <span className="text-[#E63946]">未返信</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">“{student.note}”</p>

                  <div className="pt-4 border-t border-slate-200 space-y-4">
                    <p className="text-xs font-bold text-slate-500">① スタンプを選択</p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {["💮 花丸", "🌸 大変よくできました", "⭐ グッド", "👍 バッチリ"].map((stamp) => (
                        <button key={stamp} onClick={() => setSelectedStamp(stamp)} className={`px-4 py-2 rounded-xl border font-bold transition-all ${selectedStamp === stamp ? 'bg-red-50 border-[#E63946] text-[#E63946] shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'}`}>
                          {stamp}
                        </button>
                      ))}
                    </div>

                    <p className="text-xs font-bold text-slate-500 pt-2">② 一言メッセージ（手動入力）</p>
                    <textarea value={replyMessage} onChange={(e) => setReplyMessage(e.target.value)} placeholder="例：自宅では鏡を見て、肩の力を抜く練習をしてみてくださいね！" className="w-full h-24 p-3 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-[#E63946]" />

                    {!replySent ? (
                      <Button onClick={handleSendReply} className="w-full bg-[#E63946] text-white text-xs font-bold py-6 rounded-xl gap-2">
                        「{selectedStamp}」とメッセージを送る
                      </Button>
                    ) : (
                      <div className="bg-green-50 text-green-700 p-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2">
                        <CheckCircle2 size={18} /> 返信と「{selectedStamp}」スタンプを送信しました！
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-none shadow-sm rounded-3xl bg-white p-6 space-y-4">
                <h3 className="font-bold text-xs text-slate-400 uppercase tracking-widest">お稽古ログ</h3>
                <div className="space-y-3 text-xs font-bold">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl text-slate-600"><span>0日目：オンデマンド予習</span><span className="text-green-500">視聴済</span></div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl text-slate-600"><span>1日目：対面60分稽古</span><span className="text-green-500">受講済</span></div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl text-slate-600"><span>振り返りノート</span><span className="text-[#E63946]">届いています</span></div>
                </div>
              </Card>
            </div>
          </div>
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