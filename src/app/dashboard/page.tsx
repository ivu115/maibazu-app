"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Users, CalendarDays, TrendingUp, MessageSquare, LayoutDashboard, 
  Settings, Clock, ExternalLink, Sparkles, ArrowUpRight, ChevronRight, Home, LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC] pb-24 md:pb-0 text-black font-sans">
      {/* PC用サイドバー */}
      <aside className="w-64 bg-[#1D3557] text-white hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-3">
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
        <div className="p-4 border-t border-white/10 space-y-2">
          <div className="opacity-50 text-[10px] font-bold text-white">講師：佐藤 太郎 先生</div>
          <Link href="/login" className="inline-flex items-center gap-1 text-[11px] text-white/50 hover:text-white font-bold transition-colors">
             <LogOut size={12} /> ログアウト（ログイン画面へ）
          </Link>
        </div>
      </aside>

      {/* メインコンテンツ */}
      <main className="flex-1 overflow-y-auto text-black">
        <header className="bg-white border-b p-4 md:px-8 sticky top-0 z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">先生用管理画面</span>
              <h2 className="font-black text-lg md:text-xl text-[#1D3557]">教室概況</h2>
            </div>
          </div>
          <Link href="/search/1" target="_blank">
            <Button size="sm" className="bg-[#E63946] hover:bg-[#D62839] text-white text-xs font-bold gap-1 rounded-xl py-5 shadow-sm">
              生徒用ページを確認 <ArrowUpRight size={14} />
            </Button>
          </Link>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            <StatsCard label="今月の売上" value="84,000円" trend="+12%" icon={<TrendingUp className="text-green-500" size={18}/>} />
            <StatsCard label="未対応の連絡" value="3件" trend="急ぎ" icon={<Clock className="text-[#E63946]" size={18}/>} />
            <StatsCard label="生徒の人数" value="12名" trend="+1名" icon={<Users className="text-blue-500" size={18}/>} />
            <StatsCard label="ページの閲覧数" value="1,240回" trend="+450" icon={<ExternalLink className="text-slate-400" size={18}/>} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <Card className="lg:col-span-2 border-none shadow-sm rounded-3xl overflow-hidden bg-white text-black">
              <CardHeader className="bg-white border-b p-5 md:px-8 md:py-6 flex flex-row items-center justify-between">
                <CardTitle className="text-base md:text-lg font-bold">
                  届いた生徒ノート（振り返り・質問）
                </CardTitle>
                <Link href="/students">
                  <Button variant="ghost" size="sm" className="text-xs text-[#E63946] font-bold p-0">全員見る →</Button>
                </Link>
              </CardHeader>
              <CardContent className="p-4 md:p-6 space-y-4">
                <div className="bg-slate-50 p-4 md:p-5 rounded-2xl space-y-3">
                  <div className="flex justify-between items-center text-xs text-slate-400 font-bold">
                    <span className="text-slate-700 font-extrabold text-sm">田中 美咲 さん (昨日受講)</span>
                    <span className="text-[#E63946] bg-red-50 px-2 py-0.5 rounded font-black">未返信</span>
                  </div>
                  <p className="text-xs md:text-sm text-slate-700 font-medium leading-relaxed break-words">
                    「すり足が難しかったですが、姿勢がピシッとして気持ちよかったです！家で復習する時のコツはありますか？」
                  </p>
                  <div className="pt-2 flex gap-2">
                    <Link href="/students/1" className="w-full">
                      <Button size="sm" className="bg-[#E63946] text-white text-xs rounded-xl font-bold w-full py-5 shadow-sm">
                        カルテを開いて返信する <ChevronRight size={14}/>
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm rounded-3xl bg-gradient-to-br from-[#1D3557] to-[#2A4A7A] text-white p-6 space-y-4">
              <div className="flex items-center gap-2 text-[#E63946] font-bold text-sm bg-white/10 p-2.5 rounded-xl w-fit">
                <Sparkles size={16} /> 今日のSNS文章AIサポート
              </div>
              <p className="text-xs opacity-80 leading-relaxed font-medium break-words">
                「何を投稿していいか分からない」を解消。稽古のキーワードを入れるだけで、AIが文章を作成します。
              </p>
              <Link href="/sns" className="block">
                <Button className="w-full bg-[#E63946] hover:bg-[#D62839] text-white rounded-xl font-bold py-6 text-sm shadow-md">
                  AI文章作成ページへ進む
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </main>

      {/* 📱 スマホ専用固定ボトムナビゲーション */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1D3557] text-white border-t border-white/10 z-50 p-2 shadow-2xl">
        <div className="grid grid-cols-5 gap-1 text-center">
          <Link href="/dashboard" className="flex flex-col items-center py-2 rounded-xl bg-[#E63946] font-bold text-white shadow-sm">
            <LayoutDashboard size={20} /><span className="text-[10px] mt-1 font-extrabold">ホーム</span>
          </Link>
          <Link href="/schedule" className="flex flex-col items-center py-2 rounded-xl text-white/60 hover:text-white">
            <CalendarDays size={20} /><span className="text-[10px] mt-1 font-extrabold">予定</span>
          </Link>
          <Link href="/students" className="flex flex-col items-center py-2 rounded-xl text-white/60 hover:text-white">
            <Users size={20} /><span className="text-[10px] mt-1 font-extrabold">生徒</span>
          </Link>
          <Link href="/sns" className="flex flex-col items-center py-2 rounded-xl text-white/60 hover:text-white">
            <MessageSquare size={20} /><span className="text-[10px] mt-1 font-extrabold">AI文章</span>
          </Link>
          <Link href="/settings" className="flex flex-col items-center py-2 rounded-xl text-white/60 hover:text-white">
            <Settings size={20} /><span className="text-[10px] mt-1 font-extrabold">設定</span>
          </Link>
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

function StatsCard({ label, value, trend, icon }: any) {
  return (
    <Card className="border-none shadow-sm rounded-2xl bg-white text-black p-4 md:p-6">
      <div className="flex justify-between items-start mb-2 md:mb-4">
        <div className="p-1.5 bg-slate-50 rounded-lg">{icon}</div>
        <span className="text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-600">{trend}</span>
      </div>
      <p className="text-[10px] text-slate-400 font-bold mb-1">{label}</p>
      <p className="text-lg md:text-2xl font-black text-[#1D3557]">{value}</p>
    </Card>
  );
}