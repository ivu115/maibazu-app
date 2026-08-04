"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Users, CalendarDays, LayoutDashboard, MessageSquare, Settings,
  Plus, ChevronLeft, ChevronRight, Clock, MapPin, AlertCircle, X, ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [lessons, setLessons] = useState<Record<number, any[]>>({
    1: [
      { id: 1, time: "10:00 - 11:00", type: "対面体験", student: "田中 美咲", status: "確定", room: "お座敷A" },
      { id: 2, time: "13:00 - 14:30", type: "グループ", student: "初級クラス (4名)", status: "満員", room: "広間" },
      { id: 3, time: "19:00 - 20:00", type: "個人稽古", student: "佐藤 健太", status: "確定", room: "お座敷B" }
    ],
    2: [
      { id: 4, time: "14:00 - 15:00", type: "対面体験", student: "Emily Watson", status: "仮予約", room: "お座敷A" }
    ],
    15: [
      { id: 5, time: "11:00 - 12:00", type: "個人稽古", student: "鈴木 花子", status: "確定", room: "お座敷A" }
    ]
  });

  const [newTime, setNewTime] = useState("15:00 - 16:00");
  const [newType, setNewType] = useState("対面体験");
  const [newStudent, setNewStudent] = useState("舞バズ枠（空き）");

  const handleAddLesson = () => {
    const newLesson = {
      id: Date.now(),
      time: newTime,
      type: newType,
      student: newStudent,
      status: "受付中",
      room: "お座敷A"
    };
    setLessons(prev => ({
      ...prev,
      [selectedDay]: [...(prev[selectedDay] || []), newLesson]
    }));
    setIsModalOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] pb-24 md:pb-0">
      {/* PC用サイドバー */}
      <aside className="w-64 bg-[#1D3557] text-white hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-[#E63946] p-1 rounded grow-0"><img src="/logo.png" alt="logo" className="w-6 h-6 invert brightness-0" /></div>
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
           講師：佐藤 太郎 先生
        </div>
      </aside>

      {/* メイン */}
      <main className="flex-1 overflow-y-auto text-black font-sans">
        <header className="bg-white border-b p-4 md:px-8 sticky top-0 z-10 flex items-center justify-between">
          <h2 className="font-extrabold text-xl text-slate-800">お稽古スケジュール</h2>
          <div className="flex items-center gap-4">
            <Link href="/search/1" target="_blank">
              <Button size="sm" variant="outline" className="text-xs gap-1 border-slate-200 text-slate-600 font-bold">
                公開ページを確認 <ArrowUpRight size={14} />
              </Button>
            </Link>
            <Button onClick={() => setIsModalOpen(true)} className="bg-[#E63946] hover:bg-[#D62839] text-white gap-2 rounded-xl font-bold">
              <Plus size={18} /> お稽古枠を追加
            </Button>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
                <CardHeader className="bg-[#1D3557] text-white p-4">
                  <div className="flex justify-between items-center text-sm font-bold">
                    <ChevronLeft size={16} />
                    <span>2026年 8月</span>
                    <ChevronRight size={16} />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid grid-cols-7 gap-1 text-[10px] text-center font-bold text-slate-400 mb-2">
                    <span>日</span><span>月</span><span>火</span><span>水</span><span>木</span><span>金</span><span>土</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-xs text-center font-medium">
                    {[...Array(31)].map((_, i) => {
                      const day = i + 1;
                      const hasLesson = lessons[day] && lessons[day].length > 0;
                      return (
                        <div 
                          key={day} 
                          onClick={() => setSelectedDay(day)}
                          className={`p-2 rounded-lg cursor-pointer transition-all relative ${
                            selectedDay === day 
                              ? 'bg-[#E63946] text-white font-bold shadow-md' 
                              : 'hover:bg-slate-100'
                          }`}
                        >
                          {day}
                          {hasLesson && selectedDay !== day && (
                            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#E63946] rounded-full"></span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-3 space-y-6">
              <div className="flex items-center justify-between font-black text-2xl text-[#1D3557] px-2 italic">
                2026年 8月 {selectedDay}日 のお稽古
              </div>

              <div className="space-y-4">
                {(lessons[selectedDay] || []).length > 0 ? (
                  lessons[selectedDay].map((lesson) => (
                    <Card key={lesson.id} className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
                      <div className="flex">
                        <div className={`w-2 ${lesson.type === '個人稽古' ? 'bg-blue-500' : lesson.type === 'グループ' ? 'bg-orange-500' : 'bg-[#E63946]'}`}></div>
                        <CardContent className="p-6 flex-1 flex items-center justify-between gap-6">
                          <div>
                            <p className="text-[10px] font-black text-slate-400 mb-1"><Clock size={12} className="inline mr-1" /> {lesson.time}</p>
                            <h4 className="font-extrabold text-lg text-slate-800">{lesson.student}</h4>
                            <p className="text-xs text-[#E63946] font-bold">{lesson.type}</p>
                          </div>
                          <span className="text-xs font-black px-3 py-1 rounded-full bg-slate-100 text-slate-600">{lesson.status}</span>
                        </CardContent>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="bg-white p-12 rounded-3xl text-center text-slate-400 font-bold border border-dashed">
                    この日のお稽古予定はありません。「お稽古枠を追加」ボタンから受付を開始できます。
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 追加モーダル */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full space-y-6 shadow-2xl">
              <div className="flex justify-between items-center border-b pb-4">
                <h3 className="font-bold text-lg">8月{selectedDay}日にお稽古枠を追加</h3>
                <button onClick={() => setIsModalOpen(false)}><X size={20} className="text-slate-400"/></button>
              </div>
              <div className="space-y-4 text-xs font-bold">
                <div>
                  <label className="text-slate-400 mb-1 block">時間帯</label>
                  <Input value={newTime} onChange={e => setNewTime(e.target.value)} className="bg-slate-50 border-none h-11" />
                </div>
                <div>
                  <label className="text-slate-400 mb-1 block">種類</label>
                  <select value={newType} onChange={e => setNewType(e.target.value)} className="w-full bg-slate-50 border-none h-11 rounded-xl px-3 font-bold">
                    <option value="対面体験">対面体験（舞バズ枠）</option>
                    <option value="個人稽古">個人稽古</option>
                    <option value="グループ">グループ稽古</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 mb-1 block">名目 / 生徒名</label>
                  <Input value={newStudent} onChange={e => setNewStudent(e.target.value)} className="bg-slate-50 border-none h-11" />
                </div>
              </div>
              <Button onClick={handleAddLesson} className="w-full bg-[#E63946] py-6 rounded-2xl font-bold text-white">この枠を登録する</Button>
            </div>
          </div>
        )}
      </main>

      {/* 📱 スマホ専用ボトムナビゲーション */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1D3557] text-white border-t border-white/10 z-50 p-2 shadow-2xl">
        <div className="grid grid-cols-5 gap-1 text-center">
          <Link href="/dashboard" className="flex flex-col items-center py-2 rounded-xl text-white/60"><LayoutDashboard size={20} /><span className="text-[10px] mt-1 font-extrabold">ホーム</span></Link>
          <Link href="/schedule" className="flex flex-col items-center py-2 rounded-xl bg-[#E63946] font-bold text-white"><CalendarDays size={20} /><span className="text-[10px] mt-1 font-extrabold">予定</span></Link>
          <Link href="/students" className="flex flex-col items-center py-2 rounded-xl text-white/60"><Users size={20} /><span className="text-[10px] mt-1 font-extrabold">生徒</span></Link>
          <Link href="/sns" className="flex flex-col items-center py-2 rounded-xl text-white/60"><MessageSquare size={20} /><span className="text-[10px] mt-1 font-extrabold">AI文章</span></Link>
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