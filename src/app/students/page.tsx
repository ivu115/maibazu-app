"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  CalendarDays, 
  LayoutDashboard, 
  MessageSquare, 
  Settings,
  Search,
  Plus,
  Filter,
  MoreVertical,
  GraduationCap,
  History
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// ─── ダミー生徒データ ───
const STUDENTS = [
  { id: 1, name: "田中 美咲", age: 22, course: "3回完結", progress: "2/3完了", lastLesson: "2026/07/20", status: "継続検討中", memo: "YOASOBIの『アイドル』で稽古中。筋が良い。" },
  { id: 2, name: "佐藤 健太", age: 28, course: "初級月謝", progress: "5ヶ月目", lastLesson: "2026/07/22", status: "良好", memo: "姿勢改善が目的。仕事帰りに来校。" },
  { id: 3, name: "Emily Watson", age: 25, course: "3回完結", progress: "1/3完了", lastLesson: "2026/07/25", status: "新規", memo: "インバウンド体験。英語での補助が必要。" },
  { id: 4, name: "鈴木 花子", age: 34, course: "中級月謝", progress: "2年目", lastLesson: "2026/07/15", status: "注意(欠席気味)", memo: "仕事が忙しそう。DMでフォロー推奨。" },
];

export default function StudentsPage() {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* 🏰 サイドバー（共通ナビゲーション） */}
      <aside className="w-64 bg-[#1D3557] text-white hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-[#E63946] text-white p-1 rounded grow-0">
               <img src="/logo.png" alt="logo" className="w-6 h-6 invert brightness-0" />
            </div>
            <span className="font-black text-xl tracking-tighter">舞バズ Admin</span>
          </Link>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2">
          <Link href="/dashboard"><NavItem icon={<LayoutDashboard size={20}/>} label="ダッシュボード" active={false} /></Link>
          <Link href="/schedule"><NavItem icon={<CalendarDays size={20}/>} label="お稽古スケジュール" active={false} /></Link>
          <Link href="/students"><NavItem icon={<Users size={20}/>} label="生徒名簿（CRM）" active={true} /></Link>
          <Link href="/sns"><NavItem icon={<MessageSquare size={20}/>} label="SNS投稿サポート" active={false} /></Link>
          <Link href="/settings"><NavItem icon={<Settings size={20}/>} label="教室設定" active={false} /></Link>
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="bg-white/5 p-4 rounded-2xl text-[10px] opacity-50 font-bold leading-relaxed">
             ログイン中の講師：<br/>花月 士宝菊 様
          </div>
        </div>
      </aside>

      {/* 📋 メインコンテンツ */}
      <main className="flex-1 overflow-y-auto text-black">
        <header className="bg-white border-b h-16 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1">
            <h2 className="font-extrabold text-xl text-slate-800 mr-8">生徒名簿</h2>
            <div className="relative max-w-sm flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <Input placeholder="生徒名で検索..." className="pl-10 bg-slate-50 border-none h-10" />
            </div>
          </div>
          <Button className="bg-[#E63946] hover:bg-[#D62839] gap-2 rounded-xl font-bold">
            <Plus size={18} /> 新規登録
          </Button>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="rounded-lg gap-2 text-xs font-bold border-slate-200">
                <Filter size={14} /> 絞り込み
              </Button>
              <Button variant="outline" size="sm" className="rounded-lg gap-2 text-xs font-bold border-slate-200">
                並び替え：最終稽古日
              </Button>
            </div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Total: 12 Students</p>
          </div>

          <div className="grid gap-4">
            {STUDENTS.map(student => (
              <Card key={student.id} className="border-none shadow-sm hover:shadow-md transition-all rounded-2xl overflow-hidden group bg-white">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row items-stretch md:items-center p-6 gap-6">
                    <div className="flex items-center gap-4 md:w-1/4">
                      <div className="size-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-[#E63946]/10 group-hover:text-[#E63946] transition-all">
                        <Users size={24} />
                      </div>
                      <div>
                        <p className="font-extrabold text-slate-800">{student.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{student.age}歳 / {student.course}</p>
                      </div>
                    </div>

                    <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-6 border-t md:border-t-0 md:border-x px-0 md:px-8 py-4 md:py-0">
                      <div>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1 opacity-50">Progress</p>
                        <div className="flex items-center gap-2">
                          <GraduationCap size={14} className="text-[#E63946]" />
                          <span className="text-sm font-bold text-slate-600">{student.progress}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1 opacity-50">Last Lesson</p>
                        <div className="flex items-center gap-2">
                          <History size={14} className="text-slate-400" />
                          <span className="text-sm font-bold text-slate-600">{student.lastLesson}</span>
                        </div>
                      </div>
                      <div className="hidden md:block">
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1 opacity-50">Status</p>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black ${
                          student.status.includes('注意') ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'
                        }`}>
                          {student.status}
                        </span>
                      </div>
                    </div>

                    <div className="md:w-1/3 flex items-center justify-between gap-4">
                      <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2 italic">“{student.memo}”</p>
                      <Button variant="ghost" size="icon" className="text-slate-300 hover:text-slate-600">
                        <MoreVertical size={20} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

// ─── コンポーネント ───
function NavItem({ icon, label, active = false }: any) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-[#E63946] text-white shadow-lg' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}>
      <span className={active ? "text-white" : "text-white/40"}>{icon}</span>
      <span className="text-sm font-bold">{label}</span>
    </div>
  );
}