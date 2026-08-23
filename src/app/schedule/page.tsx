"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Users, CalendarDays, LayoutDashboard, MessageSquare, Settings,
  Plus, ChevronLeft, ChevronRight, Clock, MapPin, AlertCircle, X, ArrowUpRight, Home, Building2, Send, CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// 提携教室リスト
const STUDIOS = [
  { id: "1", name: "S 教室（大阪・吹田）", instructor: "〇〇 先生" },
  { id: "2", name: "H 教室（兵庫・伊丹）", instructor: "△△ 先生" },
  { id: "3", name: "K 教室（東京・世田谷）", instructor: "◇◇ 先生" },
];

export default function SchedulePage() {
  const [selectedStudio, setSelectedStudio] = useState("1");
  const [selectedDay, setSelectedDay] = useState(20);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 教室ごとのBPO代理スケジュールデータ
  const [lessons, setLessons] = useState<Record<string, Record<number, any[]>>>({
    "1": { // S教室
      20: [
        { id: 1, time: "14:00 - 15:00", type: "舞バズ手ぶら体験", student: "田中 美咲 様", status: "予約＆決済完了", lineNotified: true },
        { id: 2, time: "16:00 - 17:00", type: "舞バズ手ぶら体験", student: "舞バズ受付枠（空き）", status: "募集中", lineNotified: false }
      ],
      25: [
        { id: 3, time: "15:30 - 16:30", type: "舞バズ手ぶら体験", student: "鈴木 舞 様", status: "予約＆決済完了", lineNotified: true }
      ]
    },
    "2": { // H教室
      22: [
        { id: 4, time: "11:00 - 12:00", type: "舞バズ手ぶら体験", student: "佐藤 健太 様", status: "予約＆決済完了", lineNotified: true }
      ]
    }
  });

  const [newTime, setNewTime] = useState("13:00 - 14:00");
  const [newType, setNewType] = useState("舞バズ手ぶら体験");
  const [newCapacity, setNewCapacity] = useState("2名");

  // 新しい体験スロットを舞バズ事務局が代理追加
  const handleAddLesson = () => {
    const newLesson = {
      id: Date.now(),
      time: newTime,
      type: newType,
      student: "舞バズ受付枠（空き）",
      status: "募集中",
      lineNotified: false
    };

    setLessons(prev => ({
      ...prev,
      [selectedStudio]: {
        ...(prev[selectedStudio] || {}),
        [selectedDay]: [...(prev[selectedStudio]?.[selectedDay] || []), newLesson]
      }
    }));
    setIsModalOpen(false);
  };

  const currentStudioLessons = lessons[selectedStudio]?.[selectedDay] || [];
  const currentStudioInfo = STUDIOS.find(s => s.id === selectedStudio);

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
          <Link href="/schedule"><NavItem icon={<CalendarDays size={20}/>} label="お稽古枠 代理設定" active={true} /></Link>
          <Link href="/students"><NavItem icon={<Users size={20}/>} label="生徒名簿・属性データ" active={false} /></Link>
          <Link href="/sns"><NavItem icon={<MessageSquare size={20}/>} label="SNS投稿代行AI" active={false} /></Link>
          <Link href="/settings"><NavItem icon={<Settings size={20}/>} label="提携教室・手数料設定" active={false} /></Link>
        </nav>
        <div className="p-4 border-t border-white/10 opacity-70 text-[11px] font-bold text-white flex items-center gap-1.5">
          <Building2 size={14} className="text-[#E63946]" /> 担当: 舞バズ 事務局
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto text-black">
        <header className="bg-white border-b p-4 md:px-8 sticky top-0 z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="flex items-center gap-1 text-slate-400 hover:text-[#E63946] text-xs font-bold transition-colors">
              <Home size={16} /> ホームへ
            </Link>
            <h2 className="font-extrabold text-base md:text-xl text-slate-800">体験枠 代理設定カレンダー</h2>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            {/* 提携教室切り替え */}
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

            <Button onClick={() => setIsModalOpen(true)} className="bg-[#E63946] hover:bg-[#D62839] text-white gap-1 md:gap-2 rounded-xl font-bold text-xs py-5 shadow-sm">
              <Plus size={16} /> 代理体験枠を追加
            </Button>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
            {/* カレンダー */}
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
                      const hasLesson = lessons[selectedStudio]?.[day] && lessons[selectedStudio][day].length > 0;
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
                            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#E63946] rounded-full"></span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <div className="bg-slate-100 p-4 rounded-2xl text-xs space-y-1 text-slate-600 font-medium">
                <div className="font-bold text-[#1D3557]">対象教室: {currentStudioInfo?.name}</div>
                <div className="text-slate-400">講師: {currentStudioInfo?.instructor}</div>
              </div>
            </div>

            {/* 当日の枠一覧 */}
            <div className="lg:col-span-3 space-y-4 md:space-y-6">
              <div className="flex items-center justify-between font-black text-xl md:text-2xl text-[#1D3557] px-2 italic">
                8月 {selectedDay}日 の枠一覧（{currentStudioInfo?.name}）
              </div>

              <div className="space-y-3 md:space-y-4">
                {currentStudioLessons.length > 0 ? (
                  currentStudioLessons.map((lesson) => (
                    <Card key={lesson.id} className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
                      <div className="flex">
                        <div className={`w-2 shrink-0 ${lesson.status === '予約＆決済完了' ? 'bg-[#E63946]' : 'bg-emerald-500'}`}></div>
                        <CardContent className="p-4 md:p-6 flex-1 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <p className="text-[10px] font-black text-slate-400"><Clock size={12} className="inline mr-1" /> {lesson.time}</p>
                            <h4 className="font-extrabold text-base md:text-lg text-slate-800">{lesson.student}</h4>
                            <p className="text-xs text-[#E63946] font-bold">{lesson.type}</p>
                          </div>
                          
                          <div className="flex items-center gap-3 self-end md:self-auto">
                            {lesson.lineNotified && (
                              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                                <Send size={10} /> 先生へLINE通知済
                              </span>
                            )}
                            <span className="text-xs font-black px-3 py-1 rounded-full bg-slate-100 text-slate-600">{lesson.status}</span>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="bg-white p-8 md:p-12 rounded-3xl text-center text-slate-400 text-xs font-bold border border-dashed">
                    この日の受付枠はありません。「代理体験枠を追加」ボタンから事前枠を設定できます。
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 枠追加モーダル */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full space-y-6 shadow-2xl">
              <div className="flex justify-between items-center border-b pb-4">
                <h3 className="font-bold text-base text-[#1D3557]">8月{selectedDay}日に代理体験枠を追加</h3>
                <button onClick={() => setIsModalOpen(false)}><X size={20} className="text-slate-400"/></button>
              </div>
              <div className="space-y-4 text-xs font-bold">
                <div>
                  <label className="text-slate-400 mb-1 block">対象教室</label>
                  <Input value={currentStudioInfo?.name} disabled className="bg-slate-100 border-none h-11 text-slate-600" />
                </div>
                <div>
                  <label className="text-slate-400 mb-1 block">時間帯</label>
                  <Input value={newTime} onChange={e => setNewTime(e.target.value)} className="bg-slate-50 border-none h-11" />
                </div>
                <div>
                  <label className="text-slate-400 mb-1 block">コース名</label>
                  <Input value={newType} onChange={e => setNewType(e.target.value)} className="bg-slate-50 border-none h-11" />
                </div>
                <div>
                  <label className="text-slate-400 mb-1 block">受入人数上限</label>
                  <Input value={newCapacity} onChange={e => setNewCapacity(e.target.value)} className="bg-slate-50 border-none h-11" />
                </div>
              </div>
              <Button onClick={handleAddLesson} className="w-full bg-[#E63946] py-6 rounded-2xl font-bold text-white shadow-lg">体験枠を代理登録する</Button>
            </div>
          </div>
        )}
      </main>

      {/* スマホボトムバー */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1D3557] text-white border-t border-white/10 z-50 p-2 shadow-2xl">
        <div className="grid grid-cols-5 gap-1 text-center">
          <Link href="/dashboard" className="flex flex-col items-center py-2 rounded-xl text-white/60"><LayoutDashboard size={20} /><span className="text-[10px] mt-1 font-extrabold">ホーム</span></Link>
          <Link href="/schedule" className="flex flex-col items-center py-2 rounded-xl bg-[#E63946] font-bold text-white shadow-sm"><CalendarDays size={20} /><span className="text-[10px] mt-1 font-extrabold">予定代行</span></Link>
          <Link href="/students" className="flex flex-col items-center py-2 rounded-xl text-white/60"><Users size={20} /><span className="text-[10px] mt-1 font-extrabold">生徒</span></Link>
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