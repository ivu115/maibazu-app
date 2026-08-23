"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Users, CalendarDays, TrendingUp, MessageSquare, LayoutDashboard, 
  Settings, Clock, ExternalLink, Sparkles, ArrowUpRight, ChevronRight, Home, LogOut,
  Building2, Send, CreditCard, DollarSign, Video, CheckCircle2, Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ダミーデータ：舞バズがBPO代行運用している提携教室リスト
const STUDIOS = [
  { id: "all", name: "全提携教室（統合）" },
  { id: "1", name: "S 教室（大阪・吹田）", plan: "BPO代行 (50%)", instructor: "〇〇 先生" },
  { id: "2", name: "H 教室（兵庫・伊丹）", plan: "Web掲載のみ (30%)", instructor: "△△ 先生" },
  { id: "3", name: "K 教室（東京・世田谷）", plan: "BPO代行 (50%)", instructor: "◇◇ 先生" },
];

// 全提携教室の体験予約・BPOステータスデータ
const BOOKINGS = [
  { id: "B101", studio: "S 教室", student: "田中 美咲 様", date: "2026/08/20 14:00", price: 3980, margin: 1990, lineNotified: true, videoWatched: true },
  { id: "B102", studio: "H 教室", student: "佐藤 健太 様", date: "2026/08/22 11:00", price: 4500, margin: 1350, lineNotified: true, videoWatched: false },
  { id: "B103", studio: "S 教室", student: "鈴木 舞 様", date: "2026/08/25 15:30", price: 3980, margin: 1990, lineNotified: true, videoWatched: true },
  { id: "B104", studio: "K 教室", student: "高橋 翔 太様", date: "2026/08/28 18:00", price: 4980, margin: 2490, lineNotified: false, videoWatched: false },
];

export default function DashboardPage() {
  const [selectedStudio, setSelectedStudio] = useState("all");

  // 選択された教室でデータフィルタリング
  const filteredBookings = selectedStudio === "all" 
    ? BOOKINGS 
    : BOOKINGS.filter(b => b.studio.includes(selectedStudio === "1" ? "S" : selectedStudio === "2" ? "H" : "K"));

  // 流通額 ＆ 舞バズ手数料利益の計算
  const totalGmv = filteredBookings.reduce((sum, b) => sum + b.price, 0);
  const totalMargin = filteredBookings.reduce((sum, b) => sum + b.margin, 0);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] pb-24 md:pb-0 text-black font-sans">
      {/* PC用サイドバー（舞バズ事務局仕様） */}
      <aside className="w-64 bg-[#1D3557] text-white hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="bg-[#E63946] p-1 rounded grow-0">
               <img src="/logo.png" alt="logo" className="w-6 h-6 invert brightness-0" />
            </div>
            <span className="font-black text-xl tracking-tighter text-white">舞バズ BPO Admin</span>
          </Link>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1">
          <Link href="/dashboard"><NavItem icon={<LayoutDashboard size={20}/>} label="統合ダッシュボード" active={true} /></Link>
          <Link href="/schedule"><NavItem icon={<CalendarDays size={20}/>} label="お稽古枠 代理設定" active={false} /></Link>
          <Link href="/students"><NavItem icon={<Users size={20}/>} label="生徒名簿・属性データ" active={false} /></Link>
          <Link href="/sns"><NavItem icon={<MessageSquare size={20}/>} label="SNS投稿代行AI" active={false} /></Link>
          <Link href="/settings"><NavItem icon={<Settings size={20}/>} label="提携教室・手数料設定" active={false} /></Link>
        </nav>
        <div className="p-4 border-t border-white/10 space-y-2">
          <div className="opacity-70 text-[11px] font-bold text-white flex items-center gap-1.5">
            <Building2 size={14} className="text-[#E63946]" /> 担当: 舞バズ 事務局
          </div>
          <Link href="/login" className="inline-flex items-center gap-1 text-[11px] text-white/50 hover:text-white font-bold transition-colors">
             <LogOut size={12} /> ログアウト（ログイン画面へ）
          </Link>
        </div>
      </aside>

      {/* メインコンテンツ */}
      <main className="flex-1 overflow-y-auto text-black">
        <header className="bg-white border-b p-4 md:px-8 sticky top-0 z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-black text-[#E63946] uppercase tracking-widest block">BPO Operations Console</span>
            <h2 className="font-black text-lg md:text-xl text-[#1D3557]">提携教室 統合管理概況</h2>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            {/* 複数教室切り替えドロップダウン */}
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

            <Link href="/" target="_blank">
              <Button size="sm" className="bg-[#E63946] hover:bg-[#D62839] text-white text-xs font-bold gap-1 rounded-xl py-5 shadow-sm">
                公式ポータルを確認 <ArrowUpRight size={14} />
              </Button>
            </Link>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
          {/* KPIカード群 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            <StatsCard label="体験予約 流通総額 (GMV)" value={`¥${totalGmv.toLocaleString()}`} trend="事前決済済" icon={<CreditCard className="text-blue-500" size={18}/>} />
            <StatsCard label="舞バズ 手数料利益" value={`¥${totalMargin.toLocaleString()}`} trend="30〜50%" icon={<TrendingUp className="text-[#E63946]" size={18}/>} />
            <StatsCard label="確定体験件数" value={`${filteredBookings.length}件`} trend="受入れ順調" icon={<Users className="text-emerald-500" size={18}/>} />
            <StatsCard label="アクティブ提携教室" value={`${STUDIOS.length - 1}教室`} trend="BPO運用中" icon={<Building2 className="text-purple-500" size={18}/>} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* 全提携教室の体験予約・LINE通知ステータス一覧 */}
            <Card className="lg:col-span-2 border-none shadow-sm rounded-3xl overflow-hidden bg-white text-black">
              <CardHeader className="bg-white border-b p-5 md:px-8 md:py-6 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base md:text-lg font-bold text-[#1D3557]">
                    体験予約・先生へのLINE通知ログ
                  </CardTitle>
                  <p className="text-xs text-slate-400 font-medium">生徒決済完了時に、舞バズが自動で先生へLINE通知した履歴です。</p>
                </div>
                <Link href="/students">
                  <Button variant="ghost" size="sm" className="text-xs text-[#E63946] font-bold p-0">全件表示 →</Button>
                </Link>
              </CardHeader>
              <CardContent className="p-4 md:p-6 space-y-4">
                {filteredBookings.map((b) => (
                  <div key={b.id} className="bg-slate-50 p-4 rounded-2xl space-y-2 border border-slate-100 flex flex-col md:flex-row justify-between md:items-center gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-[#1D3557] text-white text-[10px] font-black px-2 py-0.5 rounded-full">{b.studio}</span>
                        <span className="text-xs text-slate-400 font-mono">{b.id}</span>
                        <span className="text-xs font-bold text-slate-800">{b.student}</span>
                      </div>
                      <div className="text-xs text-slate-500 font-medium">
                        日時: <span className="font-bold text-slate-700">{b.date}</span> | 体験料: <span className="font-bold text-[#E63946]">¥{b.price.toLocaleString()}</span> (利益: +¥{b.margin.toLocaleString()})
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {b.lineNotified ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                          <Send size={12} /> 先生へLINE通知済
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                          LINE通知未送
                        </span>
                      )}

                      {b.videoWatched ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                          <Video size={12} /> 予習済
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-400">未予習</span>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* 舞バズSNS投稿代行AIカード */}
            <Card className="border-none shadow-sm rounded-3xl bg-gradient-to-br from-[#1D3557] to-[#2A4A7A] text-white p-6 space-y-4">
              <div className="flex items-center gap-2 text-[#E63946] font-bold text-sm bg-white/10 p-2.5 rounded-xl w-fit">
                <Sparkles size={16} /> 舞バズ BPO 投稿代行AI
              </div>
              <h3 className="font-black text-lg">提携教室のSNS広報を自動生成</h3>
              <p className="text-xs opacity-80 leading-relaxed font-medium break-words">
                先生にSNS更新の手間をかけさせません。稽古メモや写真をアップするだけで、舞バズAIが各教室のInstagram投稿文を自動作成・広報代行します。
              </p>
              <Link href="/sns" className="block pt-2">
                <Button className="w-full bg-[#E63946] hover:bg-[#D62839] text-white rounded-xl font-bold py-6 text-sm shadow-md">
                  SNS投稿代行ツールを開く
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
            <CalendarDays size={20} /><span className="text-[10px] mt-1 font-extrabold">予定代行</span>
          </Link>
          <Link href="/students" className="flex flex-col items-center py-2 rounded-xl text-white/60 hover:text-white">
            <Users size={20} /><span className="text-[10px] mt-1 font-extrabold">生徒</span>
          </Link>
          <Link href="/sns" className="flex flex-col items-center py-2 rounded-xl text-white/60 hover:text-white">
            <MessageSquare size={20} /><span className="text-[10px] mt-1 font-extrabold">SNS代行</span>
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