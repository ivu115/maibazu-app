"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  Users, CalendarDays, LayoutDashboard, MessageSquare, Settings,
  ChevronLeft, Sparkles, Heart, MessageCircle, Send, CheckCircle2, History
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StudentDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [replySent, setReplySent] = useState(false);

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
          <Link href="/students"><NavItem icon={<Users size={20}/>} label="生徒名簿（CRM）" active={true} /></Link>
          <Link href="/sns"><NavItem icon={<MessageSquare size={20}/>} label="SNS投稿サポート" active={false} /></Link>
          <Link href="/settings"><NavItem icon={<Settings size={20}/>} label="教室設定" active={false} /></Link>
        </nav>
      </aside>

      {/* メイン */}
      <main className="flex-1 overflow-y-auto text-black font-sans">
        <header className="bg-white border-b h-16 flex items-center px-8 sticky top-0 z-10">
          <Link href="/students" className="flex items-center text-slate-400 font-bold hover:text-[#E63946] text-xs mr-4">
            <ChevronLeft size={16} /> 生徒名簿へ戻る
          </Link>
          <h2 className="font-extrabold text-xl text-slate-800">生徒詳細カルテ</h2>
        </header>

        <div className="p-8 max-w-5xl mx-auto space-y-8">
          {/* 基本プロフィールカード */}
          <Card className="border-none shadow-sm rounded-3xl p-8 bg-white flex flex-col md:flex-row items-center gap-8">
            <div className="size-24 rounded-full bg-red-50 text-[#E63946] flex items-center justify-center font-black text-2xl border-2 border-red-100">
              田
            </div>
            <div className="flex-1 text-center md:text-left space-y-2">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <h1 className="text-2xl font-black">田中 美咲 様</h1>
                <span className="bg-green-50 text-green-600 text-xs font-bold px-3 py-1 rounded-full">受講中</span>
              </div>
              <p className="text-xs text-slate-400 font-bold">22歳 / ハイブリッド体験コース受講中 / 初回受講日: 2026年7月20日</p>
            </div>
          </Card>

          <div className="grid md:grid-cols-3 gap-8">
            {/* 左側：届いた生徒ノート（振り返り・質問） */}
            <div className="md:col-span-2 space-y-6">
              <Card className="border-none shadow-sm rounded-3xl bg-white p-6 space-y-6">
                <h3 className="font-bold text-lg flex items-center gap-2 text-[#1D3557]">
                  <MessageCircle className="text-[#E63946]" /> 体験後の振り返りノート（生徒入力）
                </h3>
                
                <div className="bg-slate-50 p-6 rounded-2xl space-y-4 border border-slate-100">
                  <div className="flex justify-between items-center text-xs text-slate-400 font-bold">
                    <span>2026/07/20 投稿</span>
                    <span className="text-[#E63946]">返信待ち</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">
                    「昨日はありがとうございました！すり足が難しかったですが、自分の姿勢がピンと伸びる感覚があってすごくスッキリしました！質問なのですが、自宅で復習するときに気をつけるポイントはありますか？」
                  </p>

                  {/* 返信アクション */}
                  <div className="pt-4 border-t border-slate-200 space-y-3">
                    <p className="text-xs font-bold text-slate-400">ワンタップで返信（先生の負担ゼロ）</p>
                    {!replySent ? (
                      <div className="flex gap-2">
                        <Button onClick={() => setReplySent(true)} className="bg-[#E63946] text-white text-xs rounded-xl font-bold">
                          💮 花マルスタンプを返信
                        </Button>
                        <Button onClick={() => setReplySent(true)} variant="outline" className="text-xs rounded-xl font-bold">
                          <Sparkles size={14} className="mr-1 text-[#E63946]"/> AIで回答案を作る
                        </Button>
                      </div>
                    ) : (
                      <div className="bg-green-50 text-green-700 p-3 rounded-xl text-xs font-bold flex items-center gap-2">
                        <CheckCircle2 size={16} /> 生徒へ返信メッセージを送信しました！
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </div>

            {/* 右側：学習進捗 */}
            <div className="space-y-6">
              <Card className="border-none shadow-sm rounded-3xl bg-white p-6 space-y-4">
                <h3 className="font-bold text-sm text-slate-400 uppercase tracking-widest">Progress</h3>
                <div className="space-y-3 text-xs font-bold">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl text-slate-600">
                    <span>0日目：オンデマンド予習</span>
                    <span className="text-green-500">視聴完了</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl text-slate-600">
                    <span>1日目：対面60分稽古</span>
                    <span className="text-green-500">受講完了</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl text-slate-600">
                    <span>振り返りノート</span>
                    <span className="text-[#E63946]">返信待ち</span>
                  </div>
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