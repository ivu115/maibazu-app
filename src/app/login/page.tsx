"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("teacher@maibazu.jp");
  const [password, setPassword] = useState("12345678");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#1D3557] flex items-center justify-center p-4 font-sans">
      <Card className="max-w-md w-full border-none shadow-2xl rounded-[2.5rem] bg-white overflow-hidden text-black">
        <CardHeader className="pt-10 pb-6 text-center space-y-3">
          <Link href="/" className="inline-block mx-auto">
            <img src="/logo.png" alt="舞バズ" className="w-16 h-16 object-contain mx-auto" />
          </Link>
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-[#1D3557]">舞バズ Admin ログイン</h1>
            <p className="text-xs text-slate-400 font-bold">教室運営者・講師専用ダッシュボード</p>
          </div>
        </CardHeader>
        <CardContent className="p-8 pt-0 space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 flex items-center gap-1">
                <Mail size={14} /> 講師メールアドレス / ID
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

            <Button type="submit" className="w-full bg-[#E63946] hover:bg-[#D62839] text-white py-7 rounded-2xl font-bold text-base gap-2 shadow-lg shadow-red-100 transition-all hover:scale-[1.02]">
              ログインして管理画面へ <ArrowRight size={18} />
            </Button>
          </form>

          <div className="bg-slate-50 p-4 rounded-2xl text-[11px] text-slate-400 space-y-1 border border-slate-100">
            <p className="font-bold text-[#1D3557] flex items-center gap-1">
              <ShieldCheck size={14} className="text-green-500"/> デモ用アカウント
            </p>
            <p>そのまま「ログインして管理画面へ」ボタンを押すとダッシュボードに入れます。</p>
          </div>

          <div className="text-center pt-2">
            <Link href="/" className="text-xs text-slate-400 font-bold hover:text-[#E63946] transition-colors">
              ← 舞バズ トップページへ戻る
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}