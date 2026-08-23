"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Lock, Mail, ArrowRight, ShieldCheck, User, Building2, UserPlus, LogIn, Compass, ChevronLeft } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  
  // モード切替: 'login' (ログイン) | 'signup' (新規登録)
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  // 役割切替: 'student' (生徒) | 'admin' (舞バズ事務局 / BPOスタッフ)
  const [role, setRole] = useState<'student' | 'admin'>('admin');
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("admin@maibazu.jp");
  const [password, setPassword] = useState("••••••••");

  const handleRoleChange = (selectedRole: 'student' | 'admin') => {
    setRole(selectedRole);
    if (mode === 'login') {
      setEmail(selectedRole === 'student' ? "student@maibazu.jp" : "admin@maibazu.jp");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'student') {
      router.push('/student-app'); // 生徒用ポータル・アプリへ
    } else {
      router.push('/dashboard'); // 舞バズ事務局用 BPO統合管理画面へ
    }
  };

  return (
    <div className="min-h-screen bg-[#1D3557] flex flex-col items-center justify-center p-4 font-sans text-black">
      {/* 🌐 上部：公式ポータルへのダイレクト戻りボタン */}
      <div className="max-w-md w-full mb-4 flex justify-between items-center px-2">
        <Link href="/portal" className="inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-white font-bold transition-colors bg-white/10 px-4 py-2 rounded-full backdrop-blur">
          <ChevronLeft size={14} /> 舞バズ 公式ポータルTOPへ
        </Link>
      </div>

      <Card className="max-w-md w-full border-none shadow-2xl rounded-[2.5rem] bg-white overflow-hidden">
        <CardHeader className="pt-8 pb-4 text-center space-y-4">
          <div className="inline-block mx-auto">
            <img src="/logo.png" alt="舞バズ" className="w-16 h-16 object-contain mx-auto" />
          </div>
          
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-[#1D3557]">
              {mode === 'login' ? '舞バズ ログイン' : '舞バズ アカウント作成'}
            </h1>
            <p className="text-xs text-slate-400 font-bold">
              {mode === 'login' ? '日本舞踊をもっと気軽にもっと手軽に' : '無料で今すぐ始めよう'}
            </p>
          </div>

          {/* モード切替（ログイン ⇆ 新規登録） */}
          <div className="flex border-b border-slate-100 pt-2">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`flex-1 py-3 text-xs font-bold border-b-2 transition-all flex items-center justify-center gap-1.5 ${
                mode === 'login' ? 'border-[#E63946] text-[#E63946]' : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              <LogIn size={14} /> ログイン
            </button>
            <button
              type="button"
              onClick={() => setMode('signup')}
              className={`flex-1 py-3 text-xs font-bold border-b-2 transition-all flex items-center justify-center gap-1.5 ${
                mode === 'signup' ? 'border-[#E63946] text-[#E63946]' : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              <UserPlus size={14} /> 新規登録
            </button>
          </div>

          {/* 役割選択（生徒 ⇆ 舞バズ事務局BPO） */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl gap-1">
            <button
              type="button"
              onClick={() => handleRoleChange('student')}
              className={`py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                role === 'student' ? 'bg-[#E63946] text-white shadow-md' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <User size={15} /> 生徒（受講生）
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange('admin')}
              className={`py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                role === 'admin' ? 'bg-[#1D3557] text-white shadow-md' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Building2 size={15} /> 事務局 (BPO Admin)
            </button>
          </div>
        </CardHeader>

        <CardContent className="p-8 pt-2 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 flex items-center gap-1">
                  <User size={14} /> お名前
                </label>
                <Input 
                  type="text" 
                  placeholder={role === 'student' ? "山田 太郎" : "舞バズ 担当スタッフ"}
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="bg-slate-50 border-none h-12 text-sm font-bold"
                  required
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 flex items-center gap-1">
                <Mail size={14} /> メールアドレス / ID
              </label>
              <Input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-50 border-none h-12 text-sm font-bold"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 flex items-center gap-1">
                <Lock size={14} /> パスワード
              </label>
              <Input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-50 border-none h-12 text-sm font-bold"
                required
              />
            </div>

            <Button 
              type="submit" 
              className={`w-full text-white py-7 rounded-2xl font-bold text-base gap-2 shadow-lg transition-all hover:scale-[1.02] ${
                role === 'student' ? 'bg-[#E63946] hover:bg-[#D62839]' : 'bg-[#1D3557] hover:bg-[#2A4A7A]'
              }`}
            >
              {mode === 'login' 
                ? (role === 'student' ? '生徒用アプリへ進む' : 'BPO管理画面（Admin）へ進む') 
                : (role === 'student' ? 'アカウントを作成して始める' : '事務局スタッフ登録を完了')} 
              <ArrowRight size={18} />
            </Button>
          </form>

          {/* デモ用注記 */}
          <div className="bg-slate-50 p-3.5 rounded-2xl text-[11px] text-slate-400 space-y-1 border border-slate-100">
            <p className="font-bold text-[#1D3557] flex items-center gap-1">
              <ShieldCheck size={14} className="text-green-500"/> デモ用アカウント選択中
            </p>
            <p>ボタンを押すと、自動的に「{role === 'student' ? '生徒用アプリ' : '複数教室を管理するBPO統合Console'}」へ遷移します。</p>
          </div>

          {/* 🌐 ポータルサイト・教室検索への誘導 */}
          <div className="text-center pt-2 border-t space-y-3">
            <div>
              <Link href="/portal" className="inline-flex items-center gap-1.5 text-xs text-[#E63946] font-bold hover:underline">
                 <Compass size={14} /> ログインせずに教室を探す（公式ポータル） →
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}