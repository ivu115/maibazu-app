"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, MapPin, Clock, User, Music, Star, ChevronLeft, ShieldCheck, Camera, CreditCard } from "lucide-react";

// ─── 教室の詳細データ（ヒアリング内容に基づき構成） ───
const SCHOOL_DETAILS: Record<string, any> = {
  "1": {
    name: "S 教室",
    location: "大阪府 吹田市",
    tagline: "20代・30代が8割。SNS世代のための日本舞踊。",
    teacher: "花月 先生 (20代)",
    style: "花月流",
    description: "「日本舞踊って、実はSNSと相性がいいんです」。若手講師が、伝統の所作を現代の視点で分かりやすく解説。オンライン稽古も取り入れた柔軟なスタイルが特徴です。",
    price: "15,000円",
    points: ["20代〜30代の生徒が多数在籍", "Instagramへの投稿や撮影大歓迎", "オンラインでの予習復習サポート"],
    image: "/lesson.jpg"
  },
  "2": {
    name: "H 教室",
    location: "兵庫県 伊丹市",
    tagline: "手ぶらで1日。コミュニティを大切にする癒しの和室。",
    teacher: "杉本 先生 (50代)",
    style: "無所属（独自カリキュラム）",
    description: "「先輩・後輩のない、フラットな関係」がモットー。自宅レッスンならではの安心感で、男性一人でも怖くない雰囲気を大切にしています。お仕事帰りのリフレッシュに最適です。",
    price: "12,000円",
    points: ["豊富な稽古着を無料でレンタル可能", "姿勢矯正や体幹トレーニング効果", "生徒同士の交流会も定期開催"],
    image: "/rental.jpg"
  },
  "3": {
    name: "K 教室",
    location: "東京・世田谷",
    tagline: "J-POPで踊る。楽しさを最優先した新しい日本舞踊。",
    teacher: "西川 先生 (30代)",
    style: "西川流",
    description: "「伝統の型をJ-POPで楽しんでほしい」。難しい曲ではなく、みんなが知っている最新曲で基本を短期間に習得。お子様連れや学生も多く、笑い声の絶えない教室です。",
    price: "18,000円",
    points: ["最新のヒット曲に合わせた振付", "夜間21時まで対応可能", "終了後に自分専用の舞動画をプレゼント"],
    image: "/hero.jpg"
  }
};

export default function SchoolDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const school = SCHOOL_DETAILS[id];
  const [isBooked, setIsBooked] = useState(false);

  if (!school) return <div className="p-20 text-center">教室が見つかりませんでした。</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* ナビゲーション */}
      <nav className="border-b p-4 sticky top-0 bg-white/90 backdrop-blur z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/search" className="flex items-center text-slate-400 font-bold hover:text-[#E63946] transition-colors">
            <ChevronLeft size={20} /> 検索画面へ
          </Link>
          <div className="font-black text-[#E63946]">舞バズ 認定教室</div>
        </div>
      </nav>

      {/* ヒーロービジュアル */}
      <div className="relative h-64 md:h-[450px] w-full overflow-hidden">
        <img src={school.image} alt={school.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-8 left-0 w-full">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center gap-2 text-white/70 text-sm font-bold mb-2">
              <MapPin size={16} /> {school.location}
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white mb-2">{school.name}</h1>
            <p className="text-white/90 font-medium md:text-xl">{school.tagline}</p>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-12 text-black">
        {/* 左側：詳細情報 */}
        <div className="md:col-span-2 space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <ShieldCheck className="text-[#E63946]" /> 教室について
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg italic">「{school.description}」</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-6">舞バズ限定：3回完結カリキュラム</h2>
            <div className="space-y-4">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex gap-4">
                    <span className="font-black text-[#E63946]">Day 1</span>
                    <div>
                        <p className="font-bold">所作と姿勢の基本</p>
                        <p className="text-sm text-slate-500">呼吸法と、J-POPを使った基本の足運びを体験します。</p>
                    </div>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex gap-4">
                    <span className="font-black text-[#E63946]">Day 2</span>
                    <div>
                        <p className="font-bold">扇子を使った表現</p>
                        <p className="text-sm text-slate-500">道具の扱いを学び、サビ部分の本格的な振付を行います。</p>
                    </div>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex gap-4">
                    <span className="font-black text-[#E63946]">Day 3</span>
                    <div>
                        <p className="font-bold">撮影会とフィードバック</p>
                        <p className="text-sm text-slate-500">成果を動画に残し、先生から今後のアドバイスをもらいます。</p>
                    </div>
                </div>
            </div>
          </section>

          <section className="bg-[#1D3557] text-white p-8 rounded-[2rem]">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><User /> 講師：{school.teacher}</h2>
            <p className="opacity-80 text-sm leading-relaxed mb-4">
                「私が一番大切にしているのは、日本舞踊を『楽しい』と思ってもらうこと。伝統は守りつつ、今の人が日常で取り入れられる美しさを伝えたいと思っています。」
            </p>
            <div className="text-xs opacity-60">流派：{school.style}</div>
          </section>
        </div>

        {/* 右側：予約サイドバー */}
        <div className="md:col-span-1">
          <div className="sticky top-24 space-y-6">
            <Card className="border-none shadow-2xl rounded-3xl overflow-hidden">
              <div className="bg-[#E63946] p-4 text-white text-center font-bold text-sm">
                舞バズ認定 受付中
              </div>
              <CardContent className="p-8">
                <div className="text-sm text-slate-400 mb-1">体験コース（全3回）</div>
                <div className="text-4xl font-black text-[#1D3557] mb-6">{school.price}</div>
                
                <div className="space-y-4 mb-8">
                    {school.points.map((p: string) => (
                        <div key={p} className="flex items-start gap-2 text-xs font-bold text-slate-600">
                            <CheckCircle2 size={14} className="text-green-500 shrink-0" /> {p}
                        </div>
                    ))}
                </div>

                {!isBooked ? (
                    <Button onClick={() => setIsBooked(true)} className="w-full bg-[#E63946] py-8 rounded-2xl text-lg font-bold shadow-xl shadow-red-100 hover:scale-[1.02] transition-transform">
                        この教室で体験する
                    </Button>
                ) : (
                    <div className="text-center p-4 bg-green-50 text-green-700 rounded-2xl font-bold">
                        申込完了しました！
                    </div>
                )}
                <p className="text-[10px] text-center text-slate-400 mt-4 leading-relaxed">
                    ※事務局が間に入って日程を調整するため、<br/>流派特有の複雑な手続きは不要です。
                </p>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold px-2 uppercase tracking-widest">
                    <ShieldCheck size={14} /> Maibazu Guarantee
                </div>
                <div className="bg-slate-50 p-4 rounded-xl text-[10px] text-slate-500 leading-relaxed font-medium">
                    舞バズが認定した本教室では、入会への強引な勧誘や、不透明な追加費用の発生は一切禁止されています。
                </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}