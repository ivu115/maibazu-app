"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CheckCircle2, MapPin, ChevronLeft, ShieldCheck, Video, ExternalLink, CreditCard, Sparkles, ShoppingBag, Play } from "lucide-react";

// BPO手ぶら体験パッケージ対応の教室データ
const INITIAL_DETAILS: Record<string, any> = {
  "1": { name: "S 教室", location: "大阪府 吹田市", mapQuery: "大阪府吹田市", mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52425.26388484931!2d135.4800366!3d34.760161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000e3954201be7b%3A0x867087fb2559599d!2zT3Nha2EsIFN1aXRh!5e0!3m2!1sen!2sjp!4v1700000000000", teacher: "花月 先生 (20代)", style: "花月流", price: "3,980円", image: "/lesson.jpg", desc: "手ぶらでOK！浴衣・着物レンタル代込み。20代〜30代の生徒が多数在籍。若手講師が伝統の所作を分かりやすく指導します。" },
  "2": { name: "H 教室", location: "兵庫県 伊丹市", mapQuery: "兵庫県伊丹市", mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52431.109848529!2d135.378902!3d34.783102!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000f074d284fb15%3A0x9d4a46efb7ef5d89!2sItami%2C%20Hyogo!5e0!3m2!1sen!2sjp!4v1700000000000", teacher: "杉本 先生 (50代)", style: "無所属", price: "4,500円", image: "/rental.jpg", desc: "手ぶらで1日お稽古がコンセプト。豊富な稽古着から好きな柄を選んで体験できます。事前解説動画付き。" },
  "3": { name: "K 教室", location: "東京・世田谷", mapQuery: "東京都世田谷区", mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d103730.93294829!2d139.601502!3d35.646502!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018f3a388e4e94d%3A0x6b453e0205096531!2sSetagaya%20City%2C%20Tokyo!5e0!3m2!1sen!2sjp!4v1700000000000", teacher: "西川 先生 (30代)", style: "西川流", price: "4,980円", image: "/hero.jpg", desc: "伝統を大切にしつつ、親しみやすい本格邦楽で基本を学べる世田谷の教室。着物レンタル＆着付け代込み。" }
};

export default function SchoolDetailPage() {
  const params = useParams();
  const id = (params.id as string) || "1";
  const [school, setSchool] = useState<any>(INITIAL_DETAILS[id] || INITIAL_DETAILS["1"]);

  // ローカルストレージ設定の反映
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
  const [cardNumber, setCardNumber] = useState("4242 •••• •••• 4242");
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-black font-sans">
      <nav className="border-b p-4 sticky top-0 bg-white/90 backdrop-blur z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/search" className="flex items-center text-slate-400 font-bold hover:text-[#E63946] transition-colors text-xs">
            <ChevronLeft size={18} /> 教室一覧へ戻る
          </Link>
          <div className="font-black text-[#E63946] text-sm">舞バズ 認定教室（手ぶらコミコミプラン）</div>
        </div>
      </nav>

      {/* メインヒーロー画像 */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <img src={school.image} alt={school.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        <div className="absolute bottom-6 left-0 w-full">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center gap-2 text-white/80 text-xs font-bold mb-1">
              <MapPin size={12} className="text-[#E63946]" /> {school.location}
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white">{school.name}</h1>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-10">
          {/* コミコミプラン内容 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-[#1D3557]">
              <ShieldCheck className="text-[#E63946]" /> 手ぶら体験パッケージに含まれるもの
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm text-center space-y-2">
                <ShoppingBag size={28} className="text-[#E63946] mx-auto" />
                <h3 className="font-bold text-sm text-[#1D3557]">浴衣・着物一式</h3>
                <p className="text-xs text-slate-400">手ぶらOK！レンタル＆着付け代込み</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm text-center space-y-2">
                <Video size={28} className="text-blue-500 mx-auto" />
                <h3 className="font-bold text-sm text-[#1D3557]">事前オンデマンド動画</h3>
                <p className="text-xs text-slate-400">歴史や基本姿勢を事前チェック</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm text-center space-y-2">
                <Sparkles size={28} className="text-emerald-500 mx-auto" />
                <h3 className="font-bold text-sm text-[#1D3557]">マンツーマン指導</h3>
                <p className="text-xs text-slate-400">60分の対面丁寧レッスン</p>
              </div>
            </div>
          </section>

          {/* 教室メッセージ */}
          <section className="space-y-4">
            <h3 className="font-bold text-lg text-[#1D3557]">お教室の特徴・講師からのメッセージ</h3>
            <p className="text-slate-700 leading-relaxed text-sm font-bold bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              “{school.desc}”
            </p>
          </section>

          {/* アクセス */}
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

        {/* 申込 ＆ Web事前決済ステップ */}
        <div className="md:col-span-1">
          <Card className="border-none shadow-2xl rounded-3xl overflow-hidden bg-white sticky top-24">
            <div className="bg-[#1D3557] p-4 text-white text-center font-bold text-xs">
              {step === 1 && "STEP 1: 日時を選択"}
              {step === 2 && "STEP 2: 情報入力 ＆ クレカ事前決済"}
              {step === 3 && "申込＆決済完了"}
            </div>
            <CardContent className="p-6 space-y-6">
              {step === 1 && (
                <div className="space-y-4">
                  <div className="text-center bg-red-50/50 p-4 rounded-2xl border border-red-100">
                    <span className="text-xs text-slate-400 font-bold">手ぶらコミコミ1日体験（事前動画付）</span>
                    <p className="text-3xl font-black text-[#E63946]">{school.price}</p>
                    <p className="text-[10px] text-slate-400 font-bold mt-1">※現地での追加費用は一切ありません</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500">① 日付を選択</label>
                    <Input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="bg-slate-50 border-none h-11 text-xs font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500">② 時間帯を選択</label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {["10:00 - 11:00", "13:00 - 14:00", "16:00 - 17:00", "19:00 - 20:00"].map((t) => (
                        <button key={t} onClick={() => setSelectedTime(t)} className={`p-2.5 rounded-xl border font-bold transition-all ${selectedTime === t ? 'border-[#E63946] bg-red-50 text-[#E63946]' : 'border-slate-100 bg-slate-50 text-slate-600'}`}>{t}</button>
                      ))}
                    </div>
                  </div>
                  <Button disabled={!selectedDate || !selectedTime} onClick={() => setStep(2)} className="w-full bg-[#E63946] py-6 rounded-2xl font-bold text-white shadow-md disabled:opacity-50">次へ進む（事前決済）</Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="bg-slate-50 p-3 rounded-xl text-xs font-bold text-slate-600 mb-2 border">
                    {selectedDate} {selectedTime} / {school.price}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500">お名前</label>
                    <Input placeholder="山田 太郎" value={studentName} onChange={(e) => setStudentName(e.target.value)} className="bg-slate-50 border-none h-11 text-xs font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500">メールアドレス</label>
                    <Input type="email" placeholder="example@gmail.com" value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} className="bg-slate-50 border-none h-11 text-xs font-bold" />
                  </div>

                  <div className="space-y-2 pt-2 border-t">
                    <label className="text-xs font-bold text-slate-500 flex items-center gap-1">
                      <CreditCard size={14} className="text-[#E63946]" /> クレジットカード情報 (Stripe)
                    </label>
                    <Input value={cardNumber} onChange={e => setCardNumber(e.target.value)} className="bg-slate-50 border-none h-11 text-xs font-mono font-bold" />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" onClick={() => setStep(1)} className="w-1/3 rounded-2xl py-6 font-bold text-xs">戻る</Button>
                    <Button disabled={!studentName || !studentEmail || isProcessing} onClick={handlePayment} className="w-2/3 bg-[#E63946] py-6 rounded-2xl font-bold text-white text-xs shadow-md disabled:opacity-50">
                      {isProcessing ? "決済処理中..." : `${school.price} を決済して予約`}
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="text-center py-4 space-y-4">
                  <CheckCircle2 size={50} className="text-emerald-500 mx-auto" />
                  <div className="space-y-1">
                    <h3 className="font-bold text-lg text-[#1D3557]">決済 ＆ 予約完了！</h3>
                    <p className="text-xs text-slate-500">先生のLINEへ予約通知を送信しました。現地での現金やり取りはありません。</p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 text-left space-y-2">
                    <p className="text-xs font-bold text-blue-900 flex items-center gap-1">
                      <Video size={14} className="text-blue-600" /> 当日の事前解説動画（予習）
                    </p>
                    <p className="text-[11px] text-blue-700 leading-relaxed">
                      体験日までに以下の動画（約3分）をご覧いただくと、当日の体験がより楽しくスムーズになります。
                    </p>
                    <Link href="/student-app" className="block pt-1">
                      <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl gap-1">
                        <Play size={12} /> 事前解説動画を今すぐ観る
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}