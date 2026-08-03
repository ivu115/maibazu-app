"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Users, 
  CalendarDays, 
  TrendingUp, 
  MessageSquare, 
  LayoutDashboard, 
  Settings,
  Bell,
  Clock,
  ExternalLink,
  Sparkles,
  ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans">
      {/* 🏰 サイドバー */}
      <aside className="w-64 bg-[#1D3557] text-white hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-[#E63946] p-1 rounded grow-0">
               <img src="/logo.png" alt="logo" className="w-6 h-6 invert brightness-0" />
            </div>
            <span className="font-black text-xl tracking-tighter text-white">舞バズ Admin</span>
          </Link>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1">
          <Link href="/dashboard"><NavItem icon={<LayoutDashboard size={20}/>} label="ダッシュボード" active={true} /></Link>
          <Link href="/schedule"><NavItem icon={<CalendarDays size={20}/>} label="お稽古スケジュール" active={false} /></Link>
          <Link href="/students"><NavItem icon={<Users size={20}/>} label="生徒名簿（CRM）" active={false} /></Link>
          <Link href="/sns"><NavItem icon={<MessageSquare size={20}/>} label="SNS投稿サポート" active={false} /></Link>
          <Link href="/settings"><NavItem icon={<Settings size={20}/>} label="教室設定" active={false} /></Link>
        </nav>
        <div className="p-4 border-t border-white/10 opacity-50 text-[10px] font-bold">
           講師：花月 士宝菊 先生
        </div>
      </aside>

      {/* 🖥️ メインコンテンツ */}
      <main className="flex-1 overflow-y-auto text-black">
        <header className="bg-white border-b h-16 flex items-center justify-between px-8 sticky top-0 z-10">
          <h2 className="font-bold text-slate-800">教室概況</h2>
          <div className="flex items-center gap-4">
            <Link href="/search/1" target="_blank">
              <Button size="sm" variant="outline" className="text-xs gap-1 border-slate-200 text-slate-600 font-bold">
                公開ページを確認 <ArrowUpRight size={14} />
              </Button>
            </Link>
            <div className="w-8 h-8 bg-slate-100 rounded-full overflow-hidden border p-1">
               <img src="/logo.png" alt="teacher" className="w-full h-full object-contain" />
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatsCard label="今月の見込み売上" value="84,000円" trend="+12%" icon={<TrendingUp className="text-green-500" size={16}/>} />
            <StatsCard label="新規受講・振り返り" value="3件" trend="新着あり" icon={<Clock className="text-[#E63946]" size={16}/>} />
            <StatsCard label="総生徒数" value="12名" trend="+1" icon={<Users className="text-blue-500" size={16}/>} />
            <StatsCard label="ページ閲覧数" value="1,240" trend="+450" icon={<ExternalLink className="text-slate-400" size={16}/>} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 border-none shadow-sm rounded-3xl overflow-hidden bg-white text-black">
              <CardHeader className="bg-white border-b px-8 py-6">
                <CardTitle className="text-lg font-bold flex items-center justify-between">
                  届いた生徒ノート（振り返り・質問）
                  <Link href="/students">
                    <Button variant="outline" size="sm" className="text-xs">名簿で全員見る</Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="bg-slate-50 p-4 rounded-2xl space-y-2">
                  <div className="flex justify-between items-center text-xs text-slate-400 font-bold">
                    <span>田中 美咲 さん (昨日体験)</span>
                    <span className="text-[#E63946]">未返信</span>
                  </div>
                  <p className="text-sm text-slate-700 font-medium">「すり足が難しかったですが、姿勢がピシッとして気持ちよかったです！家で復習する時のコツはありますか？」</p>
                  <div className="pt-2 flex gap-2">
                    <Link href="/students">
                      <Button size="sm" className="bg-[#E63946] text-white text-xs rounded-xl font-bold">花マルスタンプを送る</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm rounded-3xl bg-gradient-to-br from-[#1D3557] to-[#2A4A7A] text-white">
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Sparkles className="text-[#E63946]" size={20} /> 今日のSNS投稿案
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                  <p className="text-xs opacity-70 mb-1">おすすめテーマ：</p>
                  <p className="text-sm font-bold">「すり足と体幹トレーニング」</p>
                </div>
                <p className="text-xs opacity-80 leading-relaxed">
                  今日の生徒ノートを元に、AIが「すり足の姿勢改善効果」についての投稿案を作成しました。
                </p>
                <Link href="/sns" className="block">
                  <Button className="w-full bg-[#E63946] hover:bg-[#D62839] rounded-xl font-bold py-6 text-white">
                    AI作成画面へ移動する
                  </Button>
                </Link>
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
      <span className={active ? "text-white" : "text-white/40"}>{icon}</span>
      <span className="text-sm font-bold">{label}</span>
    </div>
  );
}

function StatsCard({ label, value, trend, icon }: any) {
  return (
    <Card className="border-none shadow-sm rounded-2xl bg-white text-black">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
          <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-green-50 text-green-600">{trend}</span>
        </div>
        <p className="text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-black text-[#1D3557]">{value}</p>
      </CardContent>
    </Card>
  );
}