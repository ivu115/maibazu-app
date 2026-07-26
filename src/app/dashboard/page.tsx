"use client";

import React, { useState } from 'react';
import Link from 'next/link'; // 👈 これが絶対に必要です！
import { 
  Users, 
  CalendarDays, 
  JapaneseCircle, 
  TrendingUp, 
  MessageSquare, 
  LayoutDashboard, 
  Settings,
  Bell,
  Search,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
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
        <nav className="flex-1 px-4 py-4 space-y-2">
          {/* 各ページへのリンクを href で指定 */}
          <Link href="/dashboard"><NavItem icon={<LayoutDashboard size={20}/>} label="ダッシュボード" active={window.location.pathname === '/dashboard'} /></Link>
          <Link href="/schedule"><NavItem icon={<CalendarDays size={20}/>} label="お稽古スケジュール" active={window.location.pathname === '/schedule'} /></Link>
          <Link href="/students"><NavItem icon={<Users size={20}/>} label="生徒名簿（CRM）" active={window.location.pathname === '/students'} /></Link>
          <Link href="/sns"><NavItem icon={<MessageSquare size={20}/>} label="SNS投稿サポート" active={window.location.pathname === '/sns'} /></Link>
          <Link href="/settings"><NavItem icon={<Settings size={20}/>} label="教室設定" active={window.location.pathname === '/settings'} /></Link>
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="bg-white/5 p-4 rounded-2xl text-[10px] opacity-50 font-bold">
             ログイン中の講師：<br/>花月 士宝菊 様
          </div>
        </div>
      </aside>

      {/* 🖥️ メインコンテンツ */}
      <main className="flex-1 overflow-y-auto">
        {/* 上部バー */}
        <header className="bg-white border-b h-16 flex items-center justify-between px-8 sticky top-0 z-10">
          <h2 className="font-bold text-slate-800">教室概況</h2>
          <div className="flex items-center gap-4">
            <button className="text-slate-400 hover:text-[#E63946] relative">
              <Bell size={20}/>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#E63946] rounded-full"></span>
            </button>
            <div className="w-8 h-8 bg-slate-200 rounded-full overflow-hidden border">
               <img src="/logo.png" alt="teacher" />
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-8">
          
          {/* 📊 統計カード（経営分析） */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatsCard label="今月の見込み売上" value="84,000円" trend="+12%" icon={<TrendingUp className="text-green-500" size={16}/>} />
            <StatsCard label="新規申込（未対応）" value="3名" trend="急ぎ" icon={<Clock className="text-[#E63946]" size={16}/>} />
            <StatsCard label="総生徒数" value="12名" trend="+1" icon={<Users className="text-blue-500" size={16}/>} />
            <StatsCard label="サイト閲覧数" value="1,240" trend="+450" icon={<ExternalLink className="text-slate-400" size={16}/>} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-black">
            {/* 📅 予約一覧（事務の自動化） */}
            <Card className="lg:col-span-2 border-none shadow-sm rounded-3xl overflow-hidden">
              <CardHeader className="bg-white border-b px-8 py-6">
                <CardTitle className="text-lg font-bold flex items-center justify-between">
                  直近の予約申込
                  <Button variant="outline" size="sm" className="text-xs">一覧を見る</Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 text-slate-400 font-bold">
                      <th className="px-8 py-4 text-left">生徒名</th>
                      <th className="px-4 py-4 text-left">コース</th>
                      <th className="px-4 py-4 text-left">希望日</th>
                      <th className="px-8 py-4 text-right">ステータス</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <ReservationRow name="田中 美咲 (22)" course="3回完結" date="2026/08/01" status="未対応" urgent />
                    <ReservationRow name="佐藤 健太 (28)" course="初級月謝" date="2026/08/03" status="完了" />
                    <ReservationRow name="Emily Watson (25)" course="3回完結" date="2026/08/05" status="未対応" />
                  </tbody>
                </table>
              </CardContent>
            </Card>

            {/* ✨ AI SNSサポート（マーケティング） */}
            <Card className="border-none shadow-sm rounded-3xl bg-gradient-to-br from-[#1D3557] to-[#2A4A7A] text-white">
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Sparkles className="text-[#E63946]" size={20} /> 今日のSNS投稿案
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                  <p className="text-xs opacity-70 mb-2">おすすめのテーマ：</p>
                  <p className="text-sm font-bold">「すり足の美学」について</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl text-[13px] leading-relaxed">
                  「伝統は、静止の中に宿る。今日は初心者コースの皆さんと『すり足』を稽古しました。派手な動きを削ぎ落とすからこそ、心が見えてくる。そんな体験をしてみませんか？ #舞バズ #日本舞踊」
                </div>
                <Button className="w-full bg-[#E63946] hover:bg-[#D62839] rounded-xl font-bold py-6">
                  この文章をコピー
                </Button>
                <p className="text-[10px] text-center opacity-40 italic">舞バズAIがあなたの稽古記録から生成しました</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

// ─── コンポーネント ───

function NavItem({ icon, label, active = false }: any) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-[#E63946] text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}>
      {icon}
      <span className="text-sm font-bold">{label}</span>
    </div>
  );
}

function StatsCard({ label, value, trend, icon }: any) {
  return (
    <Card className="border-none shadow-sm rounded-2xl">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
          <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${trend === '急ぎ' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
            {trend}
          </span>
        </div>
        <p className="text-xs text-slate-400 font-bold mb-1 uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-black text-[#1D3557]">{value}</p>
      </CardContent>
    </Card>
  );
}

function ReservationRow({ name, course, date, status, urgent = false }: any) {
  return (
    <tr className="hover:bg-slate-50/50 transition-colors">
      <td className="px-8 py-5 font-bold text-slate-700">{name}</td>
      <td className="px-4 py-5 text-slate-500">{course}</td>
      <td className="px-4 py-5 text-slate-500">{date}</td>
      <td className="px-8 py-5 text-right">
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${status === '未対応' ? 'bg-red-50 text-[#E63946]' : 'bg-slate-100 text-slate-400'}`}>
          {status}
        </span>
      </td>
    </tr>
  );
}