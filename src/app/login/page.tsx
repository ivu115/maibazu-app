"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Lock, Mail, ArrowRight, ShieldCheck, User, Users, UserPlus, LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  
  // モード切替: 'login' (ログイン) | 'signup' (新規登録)
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  // 役割切替: 'student' (生徒) | 'teacher' (講師)
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("student@maibazu.jp");
  const [password, setPassword] = useState("••••••••");

  // 役割切り替え時の初期値調整
  const handleRoleChange = (selectedRole: 'student' | 'teacher') => {
    setRole(selectedRole);
    if (mode === 'login') {
      setEmail(selectedRole === 'student' ? "student@maibazu.jp" : "teacher@maibazu.jp");
    }
  };

  // 送信処理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'student') {
      router.push('/student-app'); // 生徒用アプリへ
    } else {
      router.push('/dashboard'); // 講師用Adminへ
    }
  };

  return (
    <div className="min-h-screen bg-[#1D3557] flex items-center justify-center p-4 font-sans text-black">
      <Card className="max-w-md w-full border-none shadow-2xl rounded-[2.5rem] bg-white overflow-hidden">
        <CardHeader className="pt-10 pb-4 text-center space-y-4">
          <Link href="/" className="inline-block mx-auto">
            <img src="/logo.png" alt="舞バズ" className="w-16 h-16 object-contain mx-auto" />
          </Link>
          
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-[#1D3557]">
              {mode === 'login' ? '舞バズ ログイン' : '舞バズ 新規登録'}
            </h1>
            <p className="text-xs text-slate-400 font-bold">
              {mode === 'login' ? 'アカウントを選択してログインしてください' : 'アカウントを作成して舞バズを始めよう'}
            </p>
          </div>

          {/* 1. モード切替タブ（ログイン ⇆ 新規登録） */}
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
              <UserPlus size={14} /> 新規登録（無料）
            </button>
          </div>

          {/* 2. 役割選択ボタン (生徒 ⇆ 講師) */}
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
              onClick={() => handleRoleChange('teacher')}
              className={`py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                role === 'teacher' ? 'bg-[#1D3557] text-white shadow-md' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Users size={15} /> 講師（運営者）
            </button>
          </div>
        </CardHeader>

        <CardContent className="p-8 pt-2 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 新規登録時の名前入力欄 */}
            {mode === 'signup' && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 flex items-center gap-1">
                  <User size={14} /> お名前
                </label>
                <Input 
                  type="text" 
                  placeholder={role === 'student' ? "山田 太郎" : "花月 士宝菊"}
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
                ? (role === 'student' ? '生徒用アプリへ進む' : '管理画面（Admin）へ進む') 
                : (role === 'student' ? 'アカウントを作成して始める' : '講師登録を完了する')} 
              <ArrowRight size={18} />
            </Button>
          </form>

          {/* 切り替え案内 */}
          <div className="text-center pt-2 border-t space-y-2">
            {mode === 'login' ? (
              <p className="text-xs text-slate-400 font-bold">
                アカウントをお持ちでない方は{' '}
                <button type="button" onClick={() => setMode('signup')} className="text-[#E63946] underline font-extrabold">
                  新規登録はこちら
                </button>
              </p>
            ) : (
              <p className="text-xs text-slate-400 font-bold">
                すでにアカウントをお持ちの方は{' '}
                <button type="button" onClick={() => setMode('login')} className="text-[#1D3557] underline font-extrabold">
                  ログインはこちら
                </button>
              </p>
            )}

            <div>
              <Link href="/" className="text-xs text-slate-400 hover:text-slate-600 transition-colors inline-block mt-2">
                ← 公式Webポータルへ戻る
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}