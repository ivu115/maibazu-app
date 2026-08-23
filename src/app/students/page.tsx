"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Users, CalendarDays, LayoutDashboard, MessageSquare, Settings,
  Plus, Filter, MoreVertical, GraduationCap, History, ArrowUpRight, Home, Building2, Video, Send, Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// 提携教室リスト
const STUDIOS = [
  { id: "all", name: "全提携教室（総合）" },
  { id: "1", name: "S 教室（大阪・吹田）" },
  { id: "2", name: "H 教室（兵庫・伊丹）" },
  { id: "3", name: "K 教室（東京・世田谷）" },
];

// 全提携教室の生徒データ（BPO管理用）
const STUDENTS = [
  { id: 1, studio: "S 教室", name: "田中 美咲", age: 22, course: "手ぶら1日体験", price: 3980, margin: 1990, progress: "体験完了", videoWatched: true, lastLesson: "2026/08/20", status: "返信待ち", memo: "『姿勢がピシッと伸びてスッキリした』とノート記載。" },
  { id: 2, studio: "H 教室", name: "佐藤 健太", age: 28, course: "手ぶら1日体験", price: 4500, margin: 1350, progress: "体験完了", videoWatched: false, lastLesson: "2026/08/22", status: "良好", memo: "姿勢改善が目的。継続意向あり。" },
  { id: 3, studio: "K 教室", name: "Emily Watson", age: 25, course: "インバウンド体験", price: 4980, margin: 2490, progress: "体験予約済", videoWatched: true, lastLesson: "2026/08/28", status: "事前動画済", memo: "英語での補助希望。扇子の扱いに関心。" },
  { id: 4, studio: "S 教室", name: "鈴木 舞", age: 34, course: "手ぶら1日体験", price: 3980, margin: 1990, progress: "体験予約済", videoWatched: true, lastLesson: "2026/08/25", status: "予約完了", memo: "お仕事帰りに来校予定。" },
];

export default function StudentsPage() {
  const [selectedStudio, setSelectedStudio] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // 教室および検索語でフィルタリング
  const filteredStudents = STUDENTS.filter(student => {
    const matchesStudio = selectedStudio === "all" || student.studio.includes(selectedStudio === "1" ? "S" : selectedStudio === "2" ? "H" : "K");
    const matchesSearch = student.name.includes(searchTerm) || student.memo.includes(searchTerm);
    return matchesStudio && matchesSearch;
  });

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
          <Link href="/schedule"><NavItem icon={<CalendarDays size={20}/>} label="お稽古枠 代理設定" active={false} /></Link>
          <Link href="/students"><NavItem icon={<Users size={20}/>} label="生徒名簿・属性データ" active={true} /></Link>
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
            <h2 className="font-extrabold text-base md:text-xl text-slate-800">全提携教室 生徒名簿（BPO CRM）</h2>
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

            <Link href="/" target="_blank">
              <Button size="sm" variant="outline" className="text-xs gap-1 border-slate-200 text-slate-600 font-bold rounded-xl py-5">
                公開ポータル <ArrowUpRight size={14} />
              </Button>
            </Link>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
          {/* 検索バー */}
          <div className="relative max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input 
              type="text" 
              placeholder="生徒名やメモで検索..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10 bg-white border-slate-200 h-12 rounded-2xl text-sm font-bold shadow-sm"
            />
          </div>

          <div className="grid gap-4">
            {filteredStudents.map(student => (
              <Link key={student.id} href={`/students/${student.id}`}>
                <Card className="border-none shadow-sm hover:shadow-md transition-all rounded-2xl overflow-hidden bg-white cursor-pointer group">
                  <CardContent className="p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
                    {/* 生徒基本情報 ＆ 所属教室バッジ */}
                    <div className="flex items-center gap-4 md:w-1/3">
                      <div className="size-12 rounded-2xl bg-slate-100 flex items-center justify-center text-[#1D3557] font-bold shrink-0 shadow-inner">
                        <Users size={20} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="bg-[#1D3557] text-white text-[10px] font-black px-2 py-0.5 rounded-full">{student.studio}</span>
                          <p className="font-extrabold text-slate-800 text-base">{student.name}</p>
                        </div>
                        <p className="text-xs text-slate-400 font-bold">{student.age}歳 / {student.course}</p>
                      </div>
                    </div>

                    {/* 決済額・利益・事前動画 */}
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4 border-t md:border-t-0 md:border-x pt-3 md:pt-0 md:px-6 w-full">
                      <div>
                        <p className="text-[10px] text-slate-400 font-black uppercase mb-0.5">体験決済額 (利益)</p>
                        <span className="text-xs md:text-sm font-bold text-slate-700">¥{student.price.toLocaleString()}</span>
                        <span className="text-[10px] font-bold text-[#E63946] block">(+¥{student.margin.toLocaleString()})</span>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-black uppercase mb-0.5">事前動画視聴</p>
                        {student.videoWatched ? (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-blue-50 text-blue-600 inline-flex items-center gap-1">
                            <Video size={10} /> 予習完了
                          </span>
                        ) : (
                          <span className="text-xs text-slate-300">未視聴</span>
                        )}
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-black uppercase mb-0.5">ステータス</p>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-red-50 text-[#E63946]">{student.status}</span>
                      </div>
                    </div>

                    {/* メモ ＆ 詳細ボタン */}
                    <div className="md:w-1/3 flex items-center justify-between gap-2 w-full pt-2 md:pt-0 border-t md:border-t-0">
                      <p className="text-xs text-slate-500 leading-relaxed italic break-words line-clamp-1">“{student.memo}”</p>
                      <Button size="sm" variant="ghost" className="text-xs text-[#E63946] font-bold shrink-0">代行カルテ →</Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* スマホボトムバー */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1D3557] text-white border-t border-white/10 z-50 p-2 shadow-2xl">
        <div className="grid grid-cols-5 gap-1 text-center">
          <Link href="/dashboard" className="flex flex-col items-center py-2 rounded-xl text-white/60"><LayoutDashboard size={20} /><span className="text-[10px] mt-1 font-extrabold">ホーム</span></Link>
          <Link href="/schedule" className="flex flex-col items-center py-2 rounded-xl text-white/60"><CalendarDays size={20} /><span className="text-[10px] mt-1 font-extrabold">予定代行</span></Link>
          <Link href="/students" className="flex flex-col items-center py-2 rounded-xl bg-[#E63946] font-bold text-white shadow-sm"><Users size={20} /><span className="text-[10px] mt-1 font-extrabold">生徒</span></Link>
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