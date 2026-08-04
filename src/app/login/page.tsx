"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Lock, Mail, ArrowRight, ShieldCheck, User, Users } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<'student' | 'teacher'>('student'); // 'student' or 'teacher'
  const [email, setEmail] = useState("student@maibazu.jp");
  const [password, setPassword] = useState("••••••••");

  // 役割切替
  const handleRoleChange = (selectedRole: 'student' | 'teacher') => {
    setRole(selectedRole);
    if (selectedRole === 'student') {
      setEmail("student@maibazu.jp");
    } else {
      setEmail("teacher@maibazu.jp");
    }
  };

  // ログイン処理（振分）
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'student') {
      router.push('/student-app'); // 生徒用アプリへ
    } else {
      router.push('/dashboard'); // 先生用管理画面へ
    }
  };

  return (
    <div className="min-h-screen bg-[#1D3557] flex items-center justify-center p-4 font-sans text-black">
      <Card className="max-w-md w-full border-none shadow-2xl rounded-[2.5rem] bg-white overflow-hidden">
        <CardHeader className="pt-10 pb-4 text-center space-y-3">
          <Link href="/" className="inline-block mx-auto">
            <img src="/logo.png" alt="舞バズ" className="w-16 h-16 object-contain mx-auto" />
          </Link>
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-[#1D3557]">舞バズ ログイン</h1>
            <p className="text-xs text-slate-400 font-bold">アカウントを選択してログインしてください</p>
          </div>

          {/* 🎭 役割（ロール）選択タブ */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl gap-1 mt-4">
            <button
              type="button"
              onClick={() => handleRoleChange('student')}
              className={`py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                role === 'student' ? 'bg-[#E63946] text-white shadow-md' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <User size={16} /> 生徒（受講生）
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange('teacher')}
              className={`py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                role === 'teacher' ? 'bg-[#1D3557] text-white shadow-md' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Users size={16} /> 講師（運営者）
            </button>
          </div>
        </CardHeader>

        <CardContent className="p-8 pt-2 space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 flex items-center gap-1">
                <Mail size={14} /> {role === 'student' ? '生徒 ID / メールアドレス' : '講師 ID / メールアドレス'}
              </label>
              <Input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-50 border-none h-12 text-sm font-bold"
                required
              />
            </div>

            <div className="space-y-2">
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
              {role === 'student' ? '生徒用アプリへ' : '管理画面（Admin）へ'} <ArrowRight size={18} />
            </Button>
          </form>

          <div className="bg-slate-50 p-4 rounded-2xl text-[11px] text-slate-400 space-y-1 border border-slate-100">
            <p className="font-bold text-[#1D3557] flex items-center gap-1">
              <ShieldCheck size={14} className="text-green-500"/> デモ用アカウント選択中
            </p>
            <p>ボタンを押すと、自動的に「{role === 'student' ? '生徒用アプリ' : '講師用ダッシュボード'}」へ遷移します。</p>
          </div>

          <div className="text-center pt-2">
            <Link href="/" className="text-xs text-slate-400 font-bold hover:text-[#E63946] transition-colors">
              ← 公式Webポータルへ戻る
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}