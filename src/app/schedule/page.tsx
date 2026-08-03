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
  AlertCircle,
  ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LESSONS = [
  { id: 1, time: "10:00 - 11:00", type: "対面体験", student: "田中 美咲", status: "確定", room: "お座敷A" },
  { id: 2, time: "13:00 - 14:30", type: "グループ", student: "初級クラス (4名)", status: "満員", room: "広間" },
  { id: 3, time: "16:00 - 17:00", type: "対面体験", student: "新規申込者宛", status: "仮予約", room: "お座敷A" },
  { id: 4, time: "19:00 - 20:00", type: "個人稽古", student: "佐藤 健太", status: "確定", room: "お座敷B" },
];

export default function SchedulePage() {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
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
          <Link href="/dashboard"><NavItem icon={<LayoutDashboard size={20}/>} label="ダッシュボード" active={false} /></Link>
          <Link href="/schedule"><NavItem icon={<CalendarDays size={20}/>} label="お稽古スケジュール" active={true} /></Link>
          <Link href="/students"><NavItem icon={<Users size={20}/>} label="生徒名簿（CRM）" active={false} /></Link>
          <Link href="/sns"><NavItem icon={<MessageSquare size={20}/>} label="SNS投稿サポート" active={false} /></Link>
          <Link href="/settings"><NavItem icon={<Settings size={20}/>} label="教室設定" active={false} /></Link>
        </nav>
        <div className="p-4 border-t border-white/10 opacity-50 text-[10px] font-bold">
           講師：花月 士宝菊 先生
        </div>
      </aside>

      {/* 📅 メインコンテンツ */}
      <main className="flex-1 overflow-y-auto text-black font-sans">
        <header className="bg-white border-b h-16 flex items-center justify-between px-8 sticky top-0 z-10">
          <h2 className="font-extrabold text-xl text-slate-800">お稽古スケジュール</h2>
          <div className="flex items-center gap-4">
            <Link href="/search/1" target="_blank">
              <Button size="sm" variant="outline" className="text-xs gap-1 border-slate-200 text-slate-600 font-bold">
                公開ページを確認 <ArrowUpRight size={14} />
              </Button>
            </Link>
            <Button className="bg-[#E63946] hover:bg-[#D62839] text-white gap-2 rounded-xl font-bold">
              <Plus size={18} /> お稽古枠を追加
            </Button>
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
                <CardHeader className="bg-[#1D3557] text-white p-4">
                  <div className="flex justify-between items-center text-sm font-bold">
                    <ChevronLeft size={16} className="cursor-pointer" />
                    <span>2026年 8月</span>
                    <ChevronRight size={16} className="cursor-pointer" />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid grid-cols-7 gap-1 text-[10px] text-center font-bold text-slate-400 mb-2">
                    <span>日</span><span>月</span><span>火</span><span>水</span><span>木</span><span>金</span><span>土</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-xs text-center font-medium">
                    {[...Array(31)].map((_, i) => (
                      <div key={i} className={`p-2 rounded-lg cursor-pointer transition-colors ${i + 1 === 1 ? 'bg-[#E63946] text-white font-bold' : 'hover:bg-slate-100'}`}>
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="bg-[#1D3557]/5 p-6 rounded-3xl space-y-3">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">お稽古の分類</p>
                <div className="flex items-center gap-3 text-xs font-bold text-slate-600"><div className="w-3 h-3 rounded-full bg-blue-500"></div> 個人稽古</div>
                <div className="flex items-center gap-3 text-xs font-bold text-slate-600"><div className="w-3 h-3 rounded-full bg-orange-500"></div> グループ</div>
                <div className="flex items-center gap-3 text-xs font-bold text-slate-600"><div className="w-3 h-3 rounded-full bg-[#E63946]"></div> 対面体験（舞バズ）</div>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
              <div className="flex items-center justify-between font-black text-2xl text-[#1D3557] px-2 italic">
                2026年 8月 1日 (土)
              </div>

              <div className="space-y-4">
                {LESSONS.map((lesson) => (
                  <Card key={lesson.id} className="border-none shadow-sm rounded-3xl overflow-hidden hover:shadow-md transition-all bg-white">
                    <div className="flex">
                      <div className={`w-2 ${
                        lesson.type === '個人' ? 'bg-blue-500' : 
                        lesson.type === 'グループ' ? 'bg-orange-500' : 'bg-[#E63946]'
                      }`}></div>
                      <CardContent className="p-6 flex-1 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-6 flex-1 w-full">
                          <div className="text-center min-w-[100px]">
                            <p className="text-[10px] font-black text-slate-400 mb-1 uppercase tracking-tighter"><Clock size={12} className="inline mr-1" /> Time</p>
                            <p className="text-sm font-black text-[#1D3557]">{lesson.time}</p>
                          </div>
                          <div className="h-8 w-px bg-slate-100 hidden md:block"></div>
                          <div className="flex-1">
                            <p className="text-[10px] font-bold text-[#E63946] mb-0.5 tracking-wider">{lesson.type}</p>
                            <h4 className="font-extrabold text-lg flex items-center gap-2 text-slate-800">
                              {lesson.student}
                              {lesson.status === '仮予約' && <AlertCircle size={14} className="text-orange-500" />}
                            </h4>
                            <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-widest">
                               <MapPin size={10} /> {lesson.room}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
                          <span className={`text-[10px] font-black px-3 py-1 rounded-full ${
                            lesson.status === '確定' ? 'bg-green-50 text-green-600' : 
                            lesson.status === '満員' ? 'bg-slate-100 text-slate-400' : 
                            'bg-red-50 text-[#E63946]'
                          }`}>
                            {lesson.status}
                          </span>
                          <Link href="/students">
                            <Button variant="ghost" size="sm" className="text-xs font-bold text-slate-400 hover:text-[#1D3557]">カルテを見る</Button>
                          </Link>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
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