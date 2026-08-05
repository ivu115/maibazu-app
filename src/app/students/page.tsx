"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Users, CalendarDays, LayoutDashboard, MessageSquare, Settings,
  Plus, Filter, MoreVertical, GraduationCap, History, ArrowUpRight, Home
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const STUDENTS = [
  { id: 1, name: "田中 美咲", age: 22, course: "ハイブリッド体験", progress: "対面完了", lastLesson: "2026/07/20", status: "ノート届く", memo: "『姿勢がピンと伸びる感覚がスッキリした』とコメント有。" },
  { id: 2, name: "佐藤 健太", age: 28, course: "初級月謝コース", progress: "5ヶ月目", lastLesson: "2026/07/22", status: "良好", memo: "姿勢改善が目的。仕事帰りに来校。" },
  { id: 3, name: "Emily Watson", age: 25, course: "インバウンド体験", progress: "対面完了", lastLesson: "2026/07/25", status: "新規", memo: "英語での補助が必要。扇子の扱いに関心。" },
  { id: 4, name: "鈴木 花子", age: 34, course: "中級月謝コース", progress: "2年目", lastLesson: "2026/07/15", status: "注意(欠席気味)", memo: "仕事が忙しそう。フォロー推奨。" },
];

export default function StudentsPage() {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC] pb-24 md:pb-0">
      <aside className="w-64 bg-[#1D3557] text-white hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-3">
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

      <main className="flex-1 overflow-y-auto text-black font-sans">
        <header className="bg-white border-b p-4 md:px-8 sticky top-0 z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* 👈 ホーム（ダッシュボード）へ移動 */}
            <Link href="/dashboard" className="flex items-center gap-1 text-slate-400 hover:text-[#E63946] text-xs font-bold transition-colors">
              <Home size={16} /> ホームへ
            </Link>
            <h2 className="font-extrabold text-base md:text-xl text-slate-800">生徒名簿（CRM）</h2>
          </div>
          <Link href="/search/1" target="_blank">
            <Button size="sm" variant="outline" className="text-xs gap-1 border-slate-200 text-slate-600 font-bold">
              公開画面 <ArrowUpRight size={14} />
            </Button>
          </Link>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
          <div className="grid gap-4">
            {STUDENTS.map(student => (
              <Link key={student.id} href={`/students/${student.id}`}>
                <Card className="border-none shadow-sm hover:shadow-md transition-all rounded-2xl overflow-hidden bg-white cursor-pointer group">
                  <CardContent className="p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
                    <div className="flex items-center gap-4 md:w-1/4">
                      <div className="size-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold shrink-0">
                        <Users size={18} />
                      </div>
                      <div>
                        <p className="font-extrabold text-slate-800 text-base">{student.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold">{student.age}歳 / {student.course}</p>
                      </div>
                    </div>

                    <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4 border-t md:border-t-0 md:border-x pt-3 md:pt-0 md:px-6 w-full">
                      <div>
                        <p className="text-[10px] text-slate-400 font-black uppercase mb-0.5">進捗</p>
                        <span className="text-xs md:text-sm font-bold text-slate-600">{student.progress}</span>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-black uppercase mb-0.5">状態</p>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-red-50 text-[#E63946]">{student.status}</span>
                      </div>
                    </div>

                    <div className="md:w-1/3 flex items-center justify-between gap-2 w-full pt-2 md:pt-0 border-t md:border-t-0">
                      <p className="text-xs text-slate-500 leading-relaxed italic break-words line-clamp-1">“{student.memo}”</p>
                      <Button size="sm" variant="ghost" className="text-xs text-[#E63946] font-bold shrink-0">カルテ →</Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1D3557] text-white border-t border-white/10 z-50 p-2 shadow-2xl">
        <div className="grid grid-cols-5 gap-1 text-center">
          <Link href="/dashboard" className="flex flex-col items-center py-2 rounded-xl text-white/60"><LayoutDashboard size={20} /><span className="text-[10px] mt-1 font-extrabold">ホーム</span></Link>
          <Link href="/schedule" className="flex flex-col items-center py-2 rounded-xl text-white/60"><CalendarDays size={20} /><span className="text-[10px] mt-1 font-extrabold">予定</span></Link>
          <Link href="/students" className="flex flex-col items-center py-2 rounded-xl bg-[#E63946] font-bold text-white shadow-sm"><Users size={20} /><span className="text-[10px] mt-1 font-extrabold">生徒</span></Link>
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