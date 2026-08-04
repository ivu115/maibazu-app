"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CheckCircle2, MapPin, ChevronLeft, ShieldCheck, Video, ExternalLink } from "lucide-react";

const INITIAL_DETAILS: Record<string, any> = {
  "1": { name: "S 教室", location: "大阪府 吹田市", mapQuery: "大阪府吹田市", mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52425.26388484931!2d135.4800366!3d34.760161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000e3954201be7b%3A0x867087fb2559599d!2zT3Nha2EsIFN1aXRh!5e0!3m2!1sen!2sjp!4v1700000000000", teacher: "花月 先生 (20代)", style: "花月流", price: "15,000円", image: "/lesson.jpg", desc: "20代〜30代の生徒が多数在籍。若手講師が伝統の所作を分かりやすく指導します。" },
  "2": { name: "H 教室", location: "兵庫県 伊丹市", mapQuery: "兵庫県伊丹市", mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52431.109848529!2d135.378902!3d34.783102!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000f074d284fb15%3A0x9d4a46efb7ef5d89!2sItami%2C%20Hyogo!5e0!3m2!1sen!2sjp!4v1700000000000", teacher: "杉本 先生 (50代)", style: "無所属", price: "12,000円", image: "/rental.jpg", desc: "「手ぶらで1日」がコンセプト。豊富な稽古着から好きな柄を選んで体験できます。" },
  "3": { name: "K 教室", location: "東京・世田谷", mapQuery: "東京都世田谷区", mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d103730.93294829!2d139.601502!3d35.646502!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018f3a388e4e94d%3A0x6b453e0205096531!2sSetagaya%20City%2C%20Tokyo!5e0!3m2!1sen!2sjp!4v1700000000000", teacher: "西川 先生 (30代)", style: "西川流", price: "18,000円", image: "/hero.jpg", desc: "伝統を大切にしつつ、親しみやすい本格邦楽で基本を学べる世田谷の教室です。" }
};

export default function SchoolDetailPage() {
  const params = useParams();
  const id = (params.id as string) || "1";
  const [school, setSchool] = useState<any>(INITIAL_DETAILS[id] || INITIAL_DETAILS["1"]);

  // ローカルストレージから設定内容を反映
  useEffect(() => {
    if (id === "1") {
      const saved = localStorage.getItem('maibazu_school_1');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setSchool((prev: any) => ({
            ...prev,
            name: parsed.name || prev.name,
            price: parsed.price || prev.price,
            desc: parsed.desc || prev.desc,
            teacher: parsed.teacher ? `${parsed.teacher} 先生` : prev.teacher
          }));
        } catch (e) {}
      }
    }
  }, [id]);

  const [step, setStep] = useState(1);
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
        <div className="md:col-span-2 space-y-10">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-[#1D3557]">
              <ShieldCheck className="text-[#E63946]" /> 教室の特徴・メッセージ
            </h2>
            <p className="text-slate-700 leading-relaxed text-sm font-bold bg-slate-50 p-6 rounded-2xl border border-slate-100">
              “{school.desc}”
            </p>
          </section>

          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-[#1D3557] flex items-center gap-2">
                <MapPin className="text-[#E63946]" size={18}/> アクセス・地図
              </h3>
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(school.mapQuery)}`} target="_blank" rel="noopener noreferrer" className="text-xs text-[#E63946] font-bold flex items-center gap-1 hover:underline">
                Googleマップアプリで開く <ExternalLink size={12} />
              </a>
            </div>
            <div className="w-full h-64 rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
              <iframe title={school.name} src={school.mapEmbed} width="100%" height="100%" style={{ border: 0 }} allowFullScreen={false} loading="lazy" />
            </div>
          </section>
        </div>

        {/* 申込フォーム */}
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
                    <span className="text-xs text-slate-400 font-bold">1日体験コース（予習動画付）</span>
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
                        <button key={t} onClick={() => setSelectedTime(t)} className={`p-2.5 rounded-xl border font-bold transition-all ${selectedTime === t ? 'border-[#E63946] bg-red-50 text-[#E63946]' : 'border-slate-100 bg-slate-50 text-slate-600'}`}>{t}</button>
                      ))}
                    </div>
                  </div>
                  <Button disabled={!selectedDate || !selectedTime} onClick={() => setStep(2)} className="w-full bg-[#E63946] py-6 rounded-2xl font-bold text-white shadow-md disabled:opacity-50">次へ進む</Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="bg-slate-50 p-3 rounded-xl text-xs font-bold text-slate-600 mb-2">{selectedDate} / {selectedTime}</div>
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
                    <Button disabled={!studentName || !studentEmail} onClick={() => setStep(3)} className="w-2/3 bg-[#E63946] py-6 rounded-2xl font-bold text-white shadow-md disabled:opacity-50">1日体験に申し込む</Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="text-center py-4 space-y-4">
                  <CheckCircle2 size={50} className="text-green-500 mx-auto" />
                  <h3 className="font-bold text-lg">申込完了！</h3>
                  <p className="text-xs text-slate-500">ご指定のメールアドレス宛に、事前解説動画のリンクをお送りしました。</p>
                  <Button onClick={() => setStep(1)} variant="outline" className="w-full rounded-2xl py-6 font-bold">もう一度確認する</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}