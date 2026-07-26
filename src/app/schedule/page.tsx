"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  CalendarDays, 
  LayoutDashboard, 
  MessageSquare, 
  Settings,
  Plus,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ─── ダミーお稽古データ ───
const LESSONS = [
  { id: 1, time: "10:00 - 11:00", type: "個人", student: "田中 美咲", status: "確定", room: "お座敷A" },
  { id: 2, time: "13:00 - 14:30", type: "グループ", student: "初級クラス (4名)", status: "満員", room: "広間" },
  { id: 3, time: "16:00 - 17:00", type: "体験", student: "新規申込者宛", status: "仮予約", room: "お座敷A" },
  { id: 4, time: "19:00 - 20:00", type: "個人", student: "佐藤 健太", status: "確定", room: "オンライン" },
];

export default function SchedulePage() {
  const [currentDate, setCurrentDate] = useState("2026年 7月 26日 (日)");

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* 🏰 サイドバー */}
      <aside className="w-64 bg-[#1D3557] text-white hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <img src="/logo.png" alt="logo" className="w-8 h-8 invert brightness-0" />
          <span className="font-black text-xl tracking-tighter">舞バズ Admin</span>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2 text-black">
          <Link href="/dashboard"><NavItem icon={<LayoutDashboard size={20}/>} label="ダッシュボード" /></Link>
          <Link href="/schedule"><NavItem icon={<CalendarDays size={18}/>} label="お稽古スケジュール" active /></Link>
          <Link href="/students"><NavItem icon={<Users size={20}/>} label="生徒名簿（CRM）" /></Link>
          <Link href="/sns"><NavItem icon={<MessageSquare size={20}/>} label="SNS投稿サポート" /></Link>
          <NavItem icon={<Settings size={20}/>} label="教室設定" />
        </nav>
      </aside>

      {/* 📅 メインコンテンツ */}
      <main className="flex-1 overflow-y-auto text-black">
        <header className="bg-white border-b h-16 flex items-center justify-between px-8 sticky top-0 z-10 text-black">
          <div className="flex items-center gap-4">
            <h2 className="font-extrabold text-xl text-slate-800">お稽古スケジュール</h2>
          </div>
          <Button className="bg-[#E63946] hover:bg-[#D62839] gap-2 rounded-xl font-bold">
            <Plus size={18} /> お稽古枠を追加
          </Button>
        </header>

        <div className="p-8 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* 🗓️ 左側：日付選択カレンダー（デモ用簡易版） */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
                <CardHeader className="bg-[#1D3557] text-white p-4">
                  <div className="flex justify-between items-center text-sm">
                    <ChevronLeft size={16} className="cursor-pointer" />
                    <span className="font-bold">2026年 7月</span>
                    <ChevronRight size={16} className="cursor-pointer" />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid grid-cols-7 gap-1 text-[10px] text-center font-bold text-slate-400 mb-2">
                    <span>日</span><span>月</span><span>火</span><span>水</span><span>木</span><span>金</span><span>土</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-xs text-center font-medium">
                    {[...Array(31)].map((_, i) => (
                      <div key={i} className={`p-2 rounded-lg cursor-pointer transition-colors ${i + 1 === 26 ? 'bg-[#E63946] text-white' : 'hover:bg-slate-100'}`}>
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="bg-[#1D3557]/5 p-6 rounded-3xl space-y-4">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">お稽古の凡例</p>
                <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div> 個人稽古
                </div>
                <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div> グループ
                </div>
                <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                  <div className="w-3 h-3 rounded-full bg-[#E63946]"></div> 体験（舞バズ）
                </div>
              </div>
            </div>

            {/* 🕒 右側：当日のスケジュール詳細 */}
            <div className="lg:col-span-3 space-y-6">
              <div className="flex items-center justify-between font-black text-2xl text-[#1D3557] px-2 italic">
                {currentDate}
              </div>

              <div className="space-y-4">
                {LESSONS.map((lesson) => (
                  <Card key={lesson.id} className="border-none shadow-sm rounded-3xl overflow-hidden hover:shadow-md transition-all group">
                    <div className="flex">
                      {/* 時間帯バー */}
                      <div className={`w-2 ${
                        lesson.type === '個人' ? 'bg-blue-500' : 
                        lesson.type === 'グループ' ? 'bg-orange-500' : 'bg-[#E63946]'
                      }`}></div>
                      
                      <CardContent className="p-6 flex-1 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-6 flex-1 w-full">
                          <div className="text-center min-w-[100px]">
                            <p className="text-xs font-black text-slate-400 mb-1 uppercase tracking-tighter"><Clock size={12} className="inline mr-1" /> Time</p>
                            <p className="text-sm font-black text-[#1D3557]">{lesson.time}</p>
                          </div>
                          
                          <div className="h-8 w-px bg-slate-100 hidden md:block"></div>
                          
                          <div className="flex-1 text-black">
                            <p className="text-[10px] font-bold text-[#E63946] mb-0.5 tracking-wider">{lesson.type}お稽古</p>
                            <h4 className="font-extrabold text-lg flex items-center gap-2">
                              {lesson.student}
                              {lesson.status === '仮予約' && <AlertCircle size={14} className="text-orange-500" />}
                            </h4>
                            <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-widest">
                               <MapPin size={10} /> {lesson.room}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
                          <span className={`text-[10px] font-black px-3 py-1 rounded-full ${
                            lesson.status === '確定' ? 'bg-green-50 text-green-600' : 
                            lesson.status === '満員' ? 'bg-slate-100 text-slate-400' : 
                            'bg-red-50 text-[#E63946]'
                          }`}>
                            {lesson.status}
                          </span>
                          <Button variant="ghost" size="sm" className="text-xs font-bold text-slate-400 hover:text-[#1D3557]">詳細</Button>
                          <Button size="sm" className="bg-[#1D3557] rounded-lg px-4 text-xs font-medium text-white shadow-sm">変更</Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>

              {/* 💡 お稽古の効率化ヒント（SaaSっぽさ） */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-blue-50 flex items-center justify-between gap-8 text-black">
                <div className="space-y-2">
                  <p className="font-extrabold text-[#1D3557] flex items-center gap-2">
                    <CheckCircle2 size={20} className="text-green-500" />
                    本日の事務作業は全て完了しています
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    明日のお稽古（田中様）の前に、舞バズが自動で「リマインドLINE」を送信します。
                  </p>
                </div>
                <Button className="bg-[#1D3557] rounded-2xl px-8 py-6 font-bold shadow-lg shadow-blue-100">
                  明日の準備を確認
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// ─── ナビ項目 ───
function NavItem({ icon, label, active = false }: any) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-[#E63946] text-white shadow-lg shadow-red-500/20' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}>
      <span className={active ? "text-white" : "text-white/40"}>{icon}</span>
      <span className="text-sm font-bold">{label}</span>
    </div>
  );
}