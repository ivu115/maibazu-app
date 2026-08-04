"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Video, Calendar, MapPin, QrCode, CheckCircle2, 
  Send, Sparkles, Music, ChevronLeft, Award, Play, MessageCircle
} from "lucide-react";

export default function StudentAppPage() {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [reflectionText, setReflectionText] = useState("");
  const [noteSent, setNoteSent] = useState(false);

  const handleSendNote = () => {
    if (!reflectionText) return;
    setNoteSent(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-black font-sans pb-12">
      {/* 📱 スマホアプリ風ヘッダー */}
      <header className="bg-[#1D3557] text-white p-4 sticky top-0 z-50 shadow-md">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Link href="/" className="text-white/60 hover:text-white flex items-center text-xs font-bold">
            <ChevronLeft size={16} /> Webポータルへ
          </Link>
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="logo" className="w-6 h-6 invert brightness-0" />
            <span className="font-black text-lg tracking-tighter">舞バズ Student</span>
          </div>
          <div className="size-8 bg-[#E63946] rounded-full flex items-center justify-center font-black text-xs">
            田
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto p-4 space-y-6">
        {/* 生徒ウェルカムカード */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-bold">おかえりなさい！</p>
            <h1 className="text-xl font-black text-[#1D3557]">田中 美咲 様</h1>
            <p className="text-[10px] text-[#E63946] font-bold mt-1">S 教室 (大阪・吹田) 受講中</p>
          </div>
          <div className="text-right">
            <span className="text-[10px] bg-green-50 text-green-600 font-bold px-3 py-1 rounded-full border border-green-100">受講中</span>
          </div>
        </div>

        {/* 🎟️ 1. 次回のお稽古チケット */}
        <Card className="border-none shadow-md rounded-3xl bg-gradient-to-br from-[#1D3557] to-[#2A4A7A] text-white overflow-hidden">
          <CardHeader className="p-6 pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-widest opacity-60 flex items-center gap-1">
              <Calendar size={14} /> Next Lesson Ticket
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0 space-y-4">
            <div>
              <p className="text-2xl font-black">2026年 8月 1日 (土)</p>
              <p className="text-lg font-bold text-[#E63946]">10:00 - 11:00 (対面稽古)</p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
              <span className="flex items-center gap-1 opacity-80"><MapPin size={12}/> S教室 (お座敷A)</span>
              <span className="bg-white/10 px-3 py-1 rounded-full font-bold">手ぶらOK</span>
            </div>
            <Button className="w-full bg-white text-[#1D3557] hover:bg-slate-100 py-6 rounded-2xl font-bold gap-2 text-sm shadow-lg">
              <QrCode size={18} /> チェックイン用QRを表示
            </Button>
          </CardContent>
        </Card>

        {/* 🎬 2. 0日目・オンデマンド事前講義（動画） */}
        <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden">
          <CardHeader className="p-6 pb-2">
            <CardTitle className="text-base font-bold flex items-center gap-2 text-[#1D3557]">
              <Video className="text-[#E63946]" size={18} /> 0日目：事前オンデマンド講義
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-2 space-y-4">
            {!isPlayingVideo ? (
              <div 
                onClick={() => setIsPlayingVideo(true)}
                className="relative aspect-video bg-slate-800 rounded-2xl overflow-hidden cursor-pointer group flex items-center justify-center"
              >
                <img src="/hero.jpg" alt="thumbnail" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform" />
                <div className="size-14 rounded-full bg-[#E63946] text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                  <Play size={24} className="ml-1 fill-white" />
                </div>
                <span className="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded">5:20</span>
              </div>
            ) : (
              <div className="aspect-video bg-slate-900 rounded-2xl flex flex-col items-center justify-center text-white p-4 text-center space-y-2">
                <Sparkles className="text-[#E63946] animate-pulse" size={32} />
                <p className="text-xs font-bold">【再生中】日本舞踊の歴史と当日の作法</p>
                <p className="text-[10px] opacity-60">「姿勢を落とす＝美しいすり足の基本です」</p>
                <Button size="sm" variant="ghost" onClick={() => setIsPlayingVideo(false)} className="text-white/60 text-[10px]">閉じる</Button>
              </div>
            )}
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              ※稽古前日までにこの5分動画をご視聴ください。作法や雰囲気を知ることで、当日は手ぶらで安心して体験に専念できます。
            </p>
          </CardContent>
        </Card>

        {/* 🎵 3. マイお稽古・曲と進捗度 */}
        <Card className="border-none shadow-sm rounded-3xl bg-white p-6 space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <h3 className="font-bold text-sm text-[#1D3557] flex items-center gap-2">
              <Music className="text-[#E63946]" size={16} /> 練習中の曲と進捗
            </h3>
            <span className="text-xs font-black text-[#E63946]">70% 達成</span>
          </div>
          <div>
            <p className="text-base font-black text-slate-800 mb-2">「さくらさくら」</p>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div className="bg-[#E63946] h-full rounded-full w-[70%] transition-all duration-1000"></div>
            </div>
            <p className="text-[10px] text-slate-400 mt-2 font-bold">次回目標：扇子を使った回転の所作</p>
          </div>
        </Card>

        {/* 📝 4. 振り返り＆質問ノート */}
        <Card className="border-none shadow-sm rounded-3xl bg-white p-6 space-y-4">
          <h3 className="font-bold text-sm text-[#1D3557] flex items-center gap-2">
            <MessageCircle className="text-[#E63946]" size={16} /> 振り返り＆質問ノート
          </h3>

          {/* 過去に届いた先生からのスタンプ＆メッセージ */}
          <div className="bg-red-50/60 p-4 rounded-2xl border border-red-100 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#E63946]">
              <span>花月 先生からの返信</span>
              <span className="text-[10px] text-slate-400">2026/07/21</span>
            </div>
            <div className="text-2xl">💮</div>
            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              「ミサキさん、昨日はお疲れ様でした！すり足の姿勢がとても綺麗でしたよ。次回は扇子の持ち方を練習しましょうね！」
            </p>
          </div>

          {/* 新しい振り返り送信フォーム */}
          <div className="pt-2 space-y-3">
            <p className="text-xs font-bold text-slate-500">稽古後の感想や質問を送る</p>
            <textarea 
              value={reflectionText}
              onChange={(e) => setReflectionText(e.target.value)}
              placeholder="例：今日のすり足、少しコツが掴めました！自宅で復習する時の注意点はありますか？"
              className="w-full h-24 p-3 bg-slate-50 border-none rounded-2xl text-xs outline-none focus:ring-2 focus:ring-[#E63946]"
            />
            {!noteSent ? (
              <Button 
                onClick={handleSendNote} 
                disabled={!reflectionText}
                className="w-full bg-[#1D3557] text-white py-6 rounded-2xl font-bold text-xs gap-2"
              >
                <Send size={14} /> 先生へノートを送信
              </Button>
            ) : (
              <div className="bg-green-50 text-green-700 p-3 rounded-2xl text-xs font-bold text-center flex items-center justify-center gap-2">
                <CheckCircle2 size={16} /> 先生へ送信しました！
              </div>
            )}
          </div>
        </Card>

      </main>
    </div>
  );
}