"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CheckCircle2, MapPin, User, ChevronLeft, ShieldCheck, Calendar, Clock, Video, Sparkles } from "lucide-react";

const SCHOOL_DETAILS: Record<string, any> = {
  "1": { name: "S 教室", location: "大阪府 吹田市", teacher: "花月 先生 (20代)", style: "花月流", price: "15,000円", image: "/lesson.jpg" },
  "2": { name: "H 教室", location: "兵庫県 伊丹市", teacher: "杉本 先生 (50代)", style: "無所属", price: "12,000円", image: "/rental.jpg" },
  "3": { name: "K 教室", location: "東京・世田谷", teacher: "西川 先生 (30代)", style: "西川流", price: "18,000円", image: "/hero.jpg" }
};

export default function SchoolDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const school = SCHOOL_DETAILS[id] || SCHOOL_DETAILS["1"];

  // フォーム用ステート
  const [step, setStep] = useState(1); // 1: 日時選択, 2: 情報入力, 3: 完了
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <nav className="border-b p-4 sticky top-0 bg-white/90 backdrop-blur z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/search" className="flex items-center text-slate-400 font-bold hover:text-[#E63946] transition-colors text-xs">
            <ChevronLeft size={18} /> 教室一覧へ戻る
          </Link>
          <div className="font-black text-[#E63946] text-sm">舞バズ 認定教室</div>
        </div>
      </nav>

      {/* ヒーロービジュアル */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <img src={school.image} alt={school.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        <div className="absolute bottom-6 left-0 w-full">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center gap-2 text-white/70 text-xs font-bold mb-1">
              <MapPin size={12} /> {school.location}
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white">{school.name}</h1>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-12">
        {/* 左側：説明 */}
        <div className="md:col-span-2 space-y-10">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-[#1D3557]">
              <ShieldCheck className="text-[#E63946]" /> ハイブリッド体験パッケージ
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm font-medium">
              事前のオンデマンド動画で流派の歴史や作法を予習し、当日は手ぶらで60分の対面稽古に没頭する、無理のない安心パッケージです。
            </p>
          </section>

          <section className="bg-slate-50 p-8 rounded-3xl space-y-4 border border-slate-100">
            <h3 className="font-bold text-lg text-[#1D3557]">体験に含まれるもの</h3>
            <div className="grid grid-cols-2 gap-4 text-xs font-bold text-slate-600">
              <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500"/> オンデマンド事前解説動画</div>
              <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500"/> 稽古着・扇子レンタル一式</div>
              <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500"/> 60分対面レッスン</div>
              <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500"/> 振り返りノート機能</div>
            </div>
          </section>
        </div>

        {/* 右側：動的体験申込フォーム（インタラクティブ） */}
        <div className="md:col-span-1">
          <Card className="border-none shadow-2xl rounded-3xl overflow-hidden bg-white sticky top-24">
            <div className="bg-[#1D3557] p-4 text-white text-center font-bold text-xs">
              {step === 1 && "STEP 1: 日時を選択"}
              {step === 2 && "STEP 2: お客様情報入力"}
              {step === 3 && "申込完了"}
            </div>
            <CardContent className="p-6 space-y-6">
              {step === 1 && (
                <div className="space-y-4">
                  <div className="text-center">
                    <span className="text-xs text-slate-400 font-bold">全1回体験コース（事前動画付）</span>
                    <p className="text-3xl font-black text-[#E63946]">{school.price}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500">① 日付を選択</label>
                    <Input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="bg-slate-50 border-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500">② 時間帯を選択</label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {["10:00 - 11:00", "13:00 - 14:00", "16:00 - 17:00", "19:00 - 20:00"].map((t) => (
                        <button 
                          key={t} 
                          onClick={() => setSelectedTime(t)}
                          className={`p-2.5 rounded-xl border font-bold transition-all ${selectedTime === t ? 'border-[#E63946] bg-red-50 text-[#E63946]' : 'border-slate-100 bg-slate-50 text-slate-600'}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Button 
                    disabled={!selectedDate || !selectedTime} 
                    onClick={() => setStep(2)}
                    className="w-full bg-[#E63946] py-6 rounded-2xl font-bold text-white shadow-md disabled:opacity-50"
                  >
                    次へ進む
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="bg-slate-50 p-3 rounded-xl text-xs font-bold text-slate-600 mb-2">
                    {selectedDate} / {selectedTime}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500">お名前</label>
                    <Input placeholder="山田 太郎" value={studentName} onChange={(e) => setStudentName(e.target.value)} className="bg-slate-50 border-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500">メールアドレス</label>
                    <Input type="email" placeholder="example@gmail.com" value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} className="bg-slate-50 border-none" />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setStep(1)} className="w-1/3 rounded-2xl py-6 font-bold">戻る</Button>
                    <Button 
                      disabled={!studentName || !studentEmail} 
                      onClick={() => setStep(3)}
                      className="w-2/3 bg-[#E63946] py-6 rounded-2xl font-bold text-white shadow-md disabled:opacity-50"
                    >
                      予約を確定する
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="text-center py-4 space-y-4">
                  <CheckCircle2 size={50} className="text-green-500 mx-auto" />
                  <h3 className="font-bold text-lg">予約申込が完了しました！</h3>
                  <div className="bg-red-50 p-4 rounded-2xl text-left space-y-2 border border-red-100">
                    <p className="text-xs font-bold text-[#E63946] flex items-center gap-1"><Video size={14}/> 0日目：オンデマンド事前講義</p>
                    <p className="text-[11px] text-slate-600">ご入力いただいたメールアドレスに「事前解説動画」のURLを送信しました。当日までに5分間の動画をチェックしてください。</p>
                  </div>
                  <Button onClick={() => setStep(1)} variant="outline" className="w-full rounded-2xl py-6 font-bold">他の日時で試す</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}