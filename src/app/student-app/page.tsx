"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Home, BookOpen, Calendar as CalendarIcon, Music, 
  ChevronLeft, QrCode, MapPin, Clock, Video, Play, 
  CheckCircle2, Sparkles, MessageCircle, Send, Award, FileText, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StudentAppPage() {
  // タブ管理: 'home' | 'media' | 'calendar' | 'journal'
  const [activeTab, setActiveTab] = useState<'home' | 'media' | 'calendar' | 'journal'>('home');
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [selectedMonthDay, setSelectedMonthDay] = useState(1);

  // ノート投稿用
  const [reflectionText, setReflectionText] = useState("");
  const [noteSent, setNoteSent] = useState(false);

  // 過去の稽古履歴（お稽古帳用）
  const [history, setHistory] = useState([
    {
      date: "2026/07/20",
      song: "さくらさくら",
      studentNote: "すり足が難しかったですが、自分の姿勢がピンと伸びる感覚があってすごくスッキリしました！",
      stamp: "💮 花丸",
      teacherComment: "姿勢がとても素晴らしかったです！次回は扇子の持ち方を練習しましょうね。"
    },
    {
      date: "2026/07/05",
      song: "基本所作（体験）",
      studentNote: "初めての稽古で緊張しましたが、手ぶらで気楽に参加できて楽しかったです。",
      stamp: "🌸 大変よくできました",
      teacherComment: "ようこそ舞バズへ！基本の立ち姿がとても美しかったです。"
    }
  ]);

  const handleSendNote = () => {
    if (!reflectionText) return;
    const newEntry = {
      date: "2026/08/01 (本日)",
      song: "さくらさくら",
      studentNote: reflectionText,
      stamp: "送信済み（先生の返信待ち）",
      teacherComment: "先生がノートを確認中です..."
    };
    setHistory([newEntry, ...history]);
    setReflectionText("");
    setNoteSent(true);
    setTimeout(() => setNoteSent(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-black font-sans pb-24">
      {/* 📱 スマホアプリ風ヘッダー */}
      <header className="bg-[#1D3557] text-white p-4 sticky top-0 z-50 shadow-md">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Link href="/" className="text-white/60 hover:text-white flex items-center text-xs font-bold">
            <ChevronLeft size={16} /> Webポータル
          </Link>
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="logo" className="w-6 h-6 invert brightness-0" />
            <span className="font-black text-lg tracking-tighter">舞バズ Student</span>
          </div>
          <div className="size-8 bg-[#E63946] rounded-full flex items-center justify-center font-black text-xs text-white">
            田
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto p-4 space-y-6">
        
        {/* ────────────────── 1. ホームタブ ────────────────── */}
        {activeTab === 'home' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400 font-bold">受講生マイページ</p>
                <h1 className="text-xl font-black text-[#1D3557]">田中 美咲 様</h1>
                <p className="text-[10px] text-[#E63946] font-bold mt-1">S 教室 (大阪・吹田)</p>
              </div>
              <span className="text-[10px] bg-green-50 text-green-600 font-bold px-3 py-1 rounded-full">受講中</span>
            </div>

            {/* 次回チケット */}
            <Card className="border-none shadow-md rounded-3xl bg-gradient-to-br from-[#1D3557] to-[#2A4A7A] text-white overflow-hidden">
              <CardHeader className="p-6 pb-2">
                <CardTitle className="text-xs font-bold uppercase tracking-widest opacity-60 flex items-center gap-1">
                  <CalendarIcon size={14} /> Next Lesson Ticket
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
                  <QrCode size={18} /> チェックインQR表示
                </Button>
              </CardContent>
            </Card>

            {/* クイックリンク */}
            <div className="grid grid-cols-2 gap-4">
              <div onClick={() => setActiveTab('media')} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 cursor-pointer hover:border-[#E63946] transition-all">
                <Video className="text-[#E63946] mb-2" size={24} />
                <p className="font-bold text-xs">0日目 予習動画</p>
                <p className="text-[10px] text-slate-400">事前チェック</p>
              </div>
              <div onClick={() => setActiveTab('journal')} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 cursor-pointer hover:border-[#E63946] transition-all">
                <Music className="text-[#E63946] mb-2" size={24} />
                <p className="font-bold text-xs">お稽古帳</p>
                <p className="text-[10px] text-slate-400">進捗 70% 達成</p>
              </div>
            </div>
          </div>
        )}

        {/* ────────────────── 2. コラム・解説動画タブ ────────────────── */}
        {activeTab === 'media' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-[#1D3557]">コラム ＆ 解説動画</h2>

            {/* 0日目動画 */}
            <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden">
              <CardHeader className="p-6 pb-2">
                <CardTitle className="text-sm font-bold flex items-center gap-2 text-[#1D3557]">
                  <Video className="text-[#E63946]" size={16} /> 【必須】0日目・事前解説動画
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-2 space-y-3">
                {!isPlayingVideo ? (
                  <div onClick={() => setIsPlayingVideo(true)} className="relative aspect-video bg-slate-800 rounded-2xl overflow-hidden cursor-pointer flex items-center justify-center">
                    <img src="/hero.jpg" alt="thumbnail" className="w-full h-full object-cover opacity-60" />
                    <div className="size-12 rounded-full bg-[#E63946] text-white flex items-center justify-center shadow-xl">
                      <Play size={20} className="ml-1 fill-white" />
                    </div>
                  </div>
                ) : (
                  <div className="aspect-video bg-slate-900 rounded-2xl flex flex-col items-center justify-center text-white p-4 text-center space-y-2">
                    <Sparkles className="text-[#E63946] animate-pulse" size={28} />
                    <p className="text-xs font-bold">【再生中】日本舞踊の基本とマナー（5分）</p>
                    <Button size="sm" variant="ghost" onClick={() => setIsPlayingVideo(false)} className="text-white/60 text-[10px]">閉じる</Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 📚 特集コラム記事 */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">舞バズ 文化コラム</h3>
              
              <Card className="border-none shadow-sm rounded-2xl bg-white p-5 space-y-2 cursor-pointer hover:shadow-md transition-all">
                <span className="text-[9px] bg-red-50 text-[#E63946] font-bold px-2 py-0.5 rounded">身体の科学</span>
                <h4 className="font-bold text-sm text-[#1D3557]">なぜ日本舞踊は「重心を落とす」のか？</h4>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                  西洋のダンスとの最大の違いは「すり足」。腰を入れる姿勢がデスクワークの姿勢改善に効果的な理由を解説。
                </p>
              </Card>

              <Card className="border-none shadow-sm rounded-2xl bg-white p-5 space-y-2 cursor-pointer hover:shadow-md transition-all">
                <span className="text-[9px] bg-blue-50 text-blue-600 font-bold px-2 py-0.5 rounded">歴史ルーツ</span>
                <h4 className="font-bold text-sm text-[#1D3557]">歌舞伎から生まれた庶民のエンタメ</h4>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                  江戸時代の庶民たちが「憧れのスター」の所作を真似したことから始まった、習い事としての歴史。
                </p>
              </Card>
            </div>
          </div>
        )}

        {/* ────────────────── 3. カレンダータブ ────────────────── */}
        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-[#1D3557]">お稽古カレンダー</h2>

            <Card className="border-none shadow-sm rounded-3xl bg-white p-6">
              <div className="text-center font-bold text-sm mb-4 text-[#1D3557]">2026年 8月</div>
              <div className="grid grid-cols-7 gap-1 text-[10px] text-center font-bold text-slate-400 mb-2">
                <span>日</span><span>月</span><span>火</span><span>水</span><span>木</span><span>金</span><span>土</span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-xs text-center font-medium">
                {[...Array(31)].map((_, i) => {
                  const day = i + 1;
                  const isLessonDay = day === 1; // 8月1日がお稽古日
                  return (
                    <div 
                      key={day} 
                      onClick={() => setSelectedMonthDay(day)}
                      className={`p-2.5 rounded-xl cursor-pointer relative ${
                        selectedMonthDay === day 
                          ? 'bg-[#1D3557] text-white font-bold' 
                          : isLessonDay ? 'bg-red-50 text-[#E63946] font-black border border-red-200' : 'hover:bg-slate-50'
                      }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="border-none shadow-sm rounded-3xl bg-white p-6 space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">8月{selectedMonthDay}日の予定</h3>
              {selectedMonthDay === 1 ? (
                <div className="bg-red-50 p-4 rounded-2xl border border-red-100 space-y-1">
                  <p className="text-xs font-black text-[#E63946]">10:00 - 11:00 お稽古（確定）</p>
                  <p className="text-xs font-bold text-slate-700">S教室 / 個人体験レッスン</p>
                </div>
              ) : (
                <p className="text-xs text-slate-400">予定はありません。</p>
              )}
            </Card>
          </div>
        )}

        {/* ────────────────── 4. お稽古帳（Journal）タブ ────────────────── */}
        {activeTab === 'journal' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-[#1D3557]">マイお稽古帳</h2>

            {/* 🎵 習っている曲の進捗度 */}
            <Card className="border-none shadow-sm rounded-3xl bg-white p-6 space-y-4">
              <h3 className="font-bold text-xs text-slate-400 uppercase tracking-widest flex items-center gap-1">
                <Music size={14} className="text-[#E63946]" /> 習得曲の進捗度
              </h3>
              
              <div className="space-y-3">
                <div className="p-4 bg-slate-50 rounded-2xl space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-extrabold text-slate-800">「さくらさくら」</span>
                    <span className="font-black text-[#E63946]">70% 完了</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-[#E63946] h-full rounded-full w-[70%]"></div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50/50 rounded-2xl flex items-center justify-between text-xs opacity-60">
                  <span className="font-bold text-slate-600">「元禄花見踊り」</span>
                  <span className="font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">100% 修了 🌸</span>
                </div>
              </div>
            </Card>

            {/* 📝 振り返りノート送信フォーム */}
            <Card className="border-none shadow-sm rounded-3xl bg-white p-6 space-y-3">
              <h3 className="font-bold text-xs text-slate-400 uppercase tracking-widest flex items-center gap-1">
                <MessageCircle size={14} className="text-[#E63946]" /> 今日の振り返り・質問を書く
              </h3>
              <textarea 
                value={reflectionText}
                onChange={(e) => setReflectionText(e.target.value)}
                placeholder="稽古の感想や、先生への質問を入力してください..."
                className="w-full h-24 p-3 bg-slate-50 border-none rounded-2xl text-xs outline-none focus:ring-2 focus:ring-[#E63946]"
              />
              {!noteSent ? (
                <Button onClick={handleSendNote} disabled={!reflectionText} className="w-full bg-[#1D3557] text-white py-5 rounded-2xl font-bold text-xs gap-2">
                  <Send size={14} /> ノートを送信する
                </Button>
              ) : (
                <div className="bg-green-50 text-green-700 p-3 rounded-2xl text-xs font-bold text-center">
                  送信しました！先生からの返信をお待ちください。
                </div>
              )}
            </Card>

            {/* 📜 過去の稽古履歴＆コメント一覧 */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">これまでの稽古履歴</h3>
              {history.map((item, idx) => (
                <Card key={idx} className="border-none shadow-sm rounded-3xl bg-white p-6 space-y-4">
                  <div className="flex justify-between items-center text-xs border-b pb-3">
                    <span className="font-black text-[#1D3557]">{item.date} （曲：{item.song}）</span>
                    <span className="font-black text-[#E63946]">{item.stamp}</span>
                  </div>
                  
                  <div className="space-y-2 text-xs">
                    <p className="text-slate-500 font-medium">【あなたのノート】“{item.studentNote}”</p>
                    <div className="bg-red-50/50 p-3 rounded-xl border border-red-100 text-slate-700 font-bold">
                      【先生のコメント】{item.teacherComment}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* 📱 固定ボトムナビゲーション（タブバー） */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t p-2 z-50 shadow-lg">
        <div className="max-w-md mx-auto grid grid-cols-4 gap-1 text-center">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center py-2 rounded-xl transition-all ${activeTab === 'home' ? 'text-[#E63946] font-bold' : 'text-slate-400'}`}
          >
            <Home size={20} />
            <span className="text-[9px] mt-1">ホーム</span>
          </button>

          <button 
            onClick={() => setActiveTab('media')}
            className={`flex flex-col items-center py-2 rounded-xl transition-all ${activeTab === 'media' ? 'text-[#E63946] font-bold' : 'text-slate-400'}`}
          >
            <BookOpen size={20} />
            <span className="text-[9px] mt-1">コラム・動画</span>
          </button>

          <button 
            onClick={() => setActiveTab('calendar')}
            className={`flex flex-col items-center py-2 rounded-xl transition-all ${activeTab === 'calendar' ? 'text-[#E63946] font-bold' : 'text-slate-400'}`}
          >
            <CalendarIcon size={20} />
            <span className="text-[9px] mt-1">カレンダー</span>
          </button>

          <button 
            onClick={() => setActiveTab('journal')}
            className={`flex flex-col items-center py-2 rounded-xl transition-all ${activeTab === 'journal' ? 'text-[#E63946] font-bold' : 'text-slate-400'}`}
          >
            <Music size={20} />
            <span className="text-[9px] mt-1">お稽古帳</span>
          </button>
        </div>
      </nav>
    </div>
  );
}