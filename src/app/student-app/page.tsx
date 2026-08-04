"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Home, 
  BookOpen, 
  Calendar as CalendarIcon, 
  CalendarDays,
  Music, 
  ChevronLeft, 
  MapPin, 
  Video, 
  Play, 
  CheckCircle2, 
  Sparkles, 
  MessageCircle, 
  MessageSquare,
  Send, 
  ExternalLink,
  ChevronRight, 
  Heart, 
  Users,
  LayoutDashboard,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ─── コラムデータ ───
const COLUMNS = [
  {
    id: 1,
    category: "身体の科学",
    title: "なぜ日本舞踊は『重心を落とす』のか？",
    summary: "西洋のダンスとの最大の違いは「すり足」。腰を入れる姿勢がデスクワークの姿勢改善に効果的な理由を解説。",
    date: "2026/07/25",
    readTime: "3分で読める",
    content: "日本舞踊を始めるとき、最初に習うのが「腰を入れる（重心を下げる）」という姿勢です。\n\n西洋のバレエやヒップホップが「上へ上へと飛び跳ねる、動の美」を追求するのに対し、日本舞踊は「地面を踏みしめ、骨盤を安定させる、静の美」を極めます。\n\n【デスクワーク世代に効果的な理由】\n現代人の多くはスマホやPC作業により、骨盤が歪み、猫背になっています。\n日本舞踊の「すり足」は、腹筋・背筋・体幹（インナーマッスル）を自然に使用するため、身体に無理な負荷をかけずに姿勢を美しく矯正できます。\n\n稽古のあとに「背筋がピシッと伸びて肩こりが楽になった」と感じる生徒さんが多いのは、この理にかなった身体技法のおかげなのです。"
  },
  {
    id: 2,
    category: "歴史ルーツ",
    title: "歌舞伎から生まれた、江戸庶民の憧れエンタメ",
    summary: "歌舞伎役者の美しい所作に憧れた庶民たちが、日常の「習い事」として発展させた日本舞踊の成り立ち。",
    date: "2026/07/20",
    readTime: "2分で読める",
    content: "日本舞踊のルーツは江戸時代にさかのぼります。当時のスーパースターであった歌舞伎役者の美しい踊りや所作に強く憧れた庶民たちが、「自分もあの美しい立ち振る舞いを身につけたい！」と稽古を始めたのが始まりです。\n\n敷居が高いと思われがちですが、本来は「日常を粋に楽しむための庶民のレッスン」でした。舞バズではその原点に立ち返り、現代の誰もが気軽に楽しめる入り口を提供しています。"
  },
  {
    id: 3,
    category: "道具と作法",
    title: "初心者でも安心！扇子を美しく扱うコツ",
    summary: "扇子一本で桜や雨を表現する「引き算の美学」。指先の美しい意識の持ち方。",
    date: "2026/07/15",
    readTime: "2分で読める",
    content: "扇子は単なる小道具ではなく、あなたの「心の動き」を広げる体の一部です。\n\n親指と人差し指で軽く支え、力を抜いて扱うことで、風や波、時には盃（おさけの器）に見立てることができます。無駄な動きを削ぎ落とした「引き算の美学」を体感してみてください。"
  }
];

// ─── 過去のお稽古帳データ ───
const INITIAL_JOURNALS = [
  {
    id: 1,
    date: "2026/07/20",
    song: "さくらさくら",
    progress: "70%",
    stamp: "💮 花丸",
    studentNote: "すり足が難しかったですが、自分の姿勢がピンと伸びる感覚があってすごくスッキリしました！自宅で復習する時のコツはありますか？",
    teacherComment: "ミサキさん、立ち姿が本当に素晴らしかったです！自宅では鏡を見ながら、肩の力を抜いて深呼吸する練習をしてみてくださいね。次回は扇子の持ち方を深めましょう！",
    keyPoints: ["基本姿勢（腰を入れる）", "すり足の重心移動", "目線の配り方"]
  },
  {
    id: 2,
    date: "2026/07/05",
    song: "基本所作（体験稽古）",
    progress: "30%",
    stamp: "🌸 大変よくできました",
    studentNote: "初めての稽古で緊張しましたが、手ぶらで気楽に参加できて楽しかったです。",
    teacherComment: "ようこそ舞バズへ！基本の立ち姿がとても美しかったです。和の楽しさをこれから一緒に深めていきましょう！",
    keyPoints: ["お辞儀の作法", "立ち上がり方", "扇子の基本保持"]
  }
];

export default function StudentAppPage() {
  const [activeTab, setActiveTab] = useState<'home' | 'media' | 'calendar' | 'journal'>('home');
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [selectedMonthDay, setSelectedMonthDay] = useState(1);

  const [selectedColumn, setSelectedColumn] = useState<any>(null);
  const [selectedJournal, setSelectedJournal] = useState<any>(null);

  const [reflectionText, setReflectionText] = useState("");
  const [noteSent, setNoteSent] = useState(false);
  const [history, setHistory] = useState(INITIAL_JOURNALS);

  const handleSendNote = () => {
    if (!reflectionText) return;
    const newEntry = {
      id: Date.now(),
      date: "2026/08/01 (本日)",
      song: "さくらさくら",
      progress: "70%",
      studentNote: reflectionText,
      stamp: "送信済み（返信待ち）",
      teacherComment: "先生がノートを確認中です...",
      keyPoints: ["振り返り送信完了"]
    };
    setHistory([newEntry, ...history]);
    setReflectionText("");
    setNoteSent(true);
    setTimeout(() => setNoteSent(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-black font-sans pb-24">
      {/* 📱 ヘッダー */}
      <header className="bg-[#1D3557] text-white p-4 sticky top-0 z-50 shadow-md">
        <div className="max-w-md mx-auto flex items-center justify-between">
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

        {/* A. コラム詳細画面 */}
        {selectedColumn ? (
          <div className="space-y-6">
            <Button variant="ghost" onClick={() => setSelectedColumn(null)} className="text-xs font-bold text-slate-500 p-0">
              <ChevronLeft size={16} /> コラム一覧へ戻る
            </Button>
            <Card className="border-none shadow-sm rounded-3xl p-6 bg-white space-y-6">
              <span className="text-[10px] bg-red-50 text-[#E63946] font-bold px-3 py-1 rounded-full">{selectedColumn.category}</span>
              <h1 className="text-xl font-bold text-[#1D3557] leading-snug">{selectedColumn.title}</h1>
              <div className="flex justify-between text-xs text-slate-400 border-b pb-4">
                <span>{selectedColumn.date}</span>
                <span>{selectedColumn.readTime}</span>
              </div>
              <div className="text-sm text-slate-700 leading-relaxed space-y-4 whitespace-pre-wrap font-medium">
                {selectedColumn.content}
              </div>
            </Card>
          </div>
        ) : selectedJournal ? (
          /* B. お稽古帳詳細画面 */
          <div className="space-y-6">
            <Button variant="ghost" onClick={() => setSelectedJournal(null)} className="text-xs font-bold text-slate-500 p-0">
              <ChevronLeft size={16} /> お稽古帳一覧へ戻る
            </Button>

            <Card className="border-none shadow-sm rounded-3xl p-6 bg-white space-y-6">
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <span className="text-xs font-bold text-slate-400">{selectedJournal.date} 稽古分</span>
                  <h2 className="text-xl font-black text-[#1D3557]">{selectedJournal.song}</h2>
                </div>
                <span className="text-2xl">{selectedJournal.stamp}</span>
              </div>

              {selectedJournal.keyPoints && selectedJournal.keyPoints.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">本日学んだポイント</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedJournal.keyPoints.map((kp: string) => (
                      <span key={kp} className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-xl font-bold">✓ {kp}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2 bg-slate-50 p-4 rounded-2xl">
                <p className="text-xs font-bold text-slate-400">あなたのノート</p>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">“{selectedJournal.studentNote}”</p>
              </div>

              <div className="space-y-2 bg-red-50/60 p-5 rounded-2xl border border-red-100">
                <p className="text-xs font-bold text-[#E63946] flex items-center gap-1"><Heart size={14}/> 先生からのアドバイス</p>
                <p className="text-xs text-slate-800 leading-relaxed font-bold">{selectedJournal.teacherComment}</p>
              </div>
            </Card>
          </div>
        ) : (
          /* C. メインタブ */
          <>
            {/* 1. ホーム */}
            {activeTab === 'home' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400 font-bold">受講生マイページ</p>
                    <h1 className="text-xl font-black text-[#1D3557]">田中 美咲 様</h1>
                  </div>
                  <span className="text-[10px] bg-green-50 text-green-600 font-bold px-3 py-1 rounded-full">受講中</span>
                </div>

                <Card className="border-none shadow-md rounded-3xl bg-gradient-to-br from-[#1D3557] to-[#2A4A7A] text-white overflow-hidden">
                  <CardHeader className="p-6 pb-2">
                    <CardTitle className="text-xs font-bold uppercase tracking-widest opacity-60 flex items-center gap-1">
                      <CalendarIcon size={14} /> Next Lesson
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 space-y-3">
                    <div>
                      <p className="text-2xl font-black">2026年 8月 1日 (土)</p>
                      <p className="text-lg font-bold text-[#E63946]">10:00 - 11:00 (対面稽古)</p>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
                      <span className="flex items-center gap-1 opacity-80"><MapPin size={12}/> S教室 (お座敷A)</span>
                      <span className="bg-white/10 px-3 py-1 rounded-full font-bold">手ぶらOK</span>
                    </div>
                  </CardContent>
                </Card>

                {/* 所属教室情報 */}
                <Card className="border-none shadow-sm rounded-3xl bg-white p-6 space-y-4">
                  <div className="flex items-center justify-between border-b pb-3">
                    <h3 className="font-bold text-sm text-[#1D3557] flex items-center gap-2">
                      <Users className="text-[#E63946]" size={18} /> 所属教室の情報
                    </h3>
                    <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-bold">公認教室</span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <p className="text-slate-400 text-[10px] font-bold">教室名・講師</p>
                      <p className="font-bold text-slate-800 text-sm">S 教室（佐藤 太郎 先生）</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-[10px] font-bold">所在地・アクセス</p>
                      <p className="font-medium text-slate-700">大阪府吹田市 ◯◯ 1-2-3（阪急吹田駅 徒歩5分）</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-[10px] font-bold">お稽古ルール</p>
                      <p className="font-medium text-slate-700">・手ぶら着付けセット完備（Tシャツ参加OK）<br/>・完全明朗会計（事前決済完了済み）</p>
                    </div>
                    <a 
                      href="https://www.google.com/maps/search/?api=1&query=大阪府吹田市" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#E63946] font-bold pt-2 hover:underline"
                    >
                      Googleマップで場所を確認 <ExternalLink size={12} />
                    </a>
                  </div>
                </Card>

                {/* ポータルサイトリンク */}
                <div className="pt-6 border-t text-center space-y-2">
                  <Link href="/portal" className="inline-flex items-center gap-1 text-slate-400 hover:text-[#1D3557] text-xs font-bold transition-colors">
                     舞バズ 公式Webポータルを見る →
                  </Link>
                </div>
              </div>
            )}

            {/* 2. コラム */}
            {activeTab === 'media' && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-[#1D3557]">コラム ＆ 解説動画</h2>

                <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden">
                  <CardHeader className="p-6 pb-2">
                    <CardTitle className="text-sm font-bold flex items-center gap-2 text-[#1D3557]">
                      <Video className="text-[#E63946]" size={16} /> 0日目：事前解説動画
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

                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">舞バズ 文化コラム</h3>
                  {COLUMNS.map(col => (
                    <Card key={col.id} onClick={() => setSelectedColumn(col)} className="border-none shadow-sm rounded-2xl bg-white p-5 space-y-2 cursor-pointer hover:shadow-md transition-all">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] bg-red-50 text-[#E63946] font-bold px-2 py-0.5 rounded">{col.category}</span>
                        <span className="text-[10px] text-slate-400">{col.readTime}</span>
                      </div>
                      <h4 className="font-bold text-sm text-[#1D3557] flex items-center justify-between">
                        {col.title} <ChevronRight size={16} className="text-slate-300" />
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{col.summary}</p>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* 3. カレンダー */}
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
                      const isLessonDay = day === 1;
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

            {/* 4. お稽古帳 */}
            {activeTab === 'journal' && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-[#1D3557]">マイお稽古帳</h2>

                <Card className="border-none shadow-sm rounded-3xl bg-white p-6 space-y-4">
                  <h3 className="font-bold text-xs text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    <Music size={14} className="text-[#E63946]" /> 稽古曲の進捗度
                  </h3>
                  <div className="p-4 bg-slate-50 rounded-2xl space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-extrabold text-slate-800">「さくらさくら」</span>
                      <span className="font-black text-[#E63946]">70% 習得</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-[#E63946] h-full rounded-full w-[70%]"></div>
                    </div>
                  </div>
                </Card>

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
                      <Send size={14} /> 先生へ送信する
                    </Button>
                  ) : (
                    <div className="bg-green-50 text-green-700 p-3 rounded-2xl text-xs font-bold text-center">
                      送信しました！先生からの確認をお待ちください。
                    </div>
                  )}
                </Card>

                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">これまでの稽古記録</h3>
                  {history.map((item, idx) => (
                    <Card key={idx} onClick={() => setSelectedJournal(item)} className="border-none shadow-sm rounded-3xl bg-white p-6 space-y-3 cursor-pointer hover:shadow-md transition-all">
                      <div className="flex justify-between items-center text-xs border-b pb-2">
                        <span className="font-black text-[#1D3557]">{item.date} （{item.song}）</span>
                        <span className="font-black text-[#E63946]">{item.stamp}</span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1 italic">“{item.studentNote}”</p>
                      <div className="text-[10px] text-slate-400 font-bold flex items-center justify-between pt-1">
                        <span>先生からのコメントあり</span>
                        <span className="text-[#E63946] font-bold flex items-center">詳細を見る <ChevronRight size={12}/></span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

      </main>

      {/* 📱 固定ボトムナビゲーション */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t p-2 z-50 shadow-lg">
        <div className="max-w-md mx-auto grid grid-cols-4 gap-1 text-center">
          <button onClick={() => { setActiveTab('home'); setSelectedColumn(null); setSelectedJournal(null); }} className={`flex flex-col items-center py-2 rounded-xl transition-all ${activeTab === 'home' && !selectedColumn && !selectedJournal ? 'text-[#E63946] font-bold' : 'text-slate-400'}`}>
            <Home size={20} /><span className="text-[9px] mt-1">ホーム</span>
          </button>

          <button onClick={() => { setActiveTab('media'); setSelectedColumn(null); setSelectedJournal(null); }} className={`flex flex-col items-center py-2 rounded-xl transition-all ${activeTab === 'media' || selectedColumn ? 'text-[#E63946] font-bold' : 'text-slate-400'}`}>
            <BookOpen size={20} /><span className="text-[9px] mt-1">コラム・動画</span>
          </button>

          <button onClick={() => { setActiveTab('calendar'); setSelectedColumn(null); setSelectedJournal(null); }} className={`flex flex-col items-center py-2 rounded-xl transition-all ${activeTab === 'calendar' ? 'text-[#E63946] font-bold' : 'text-slate-400'}`}>
            <CalendarIcon size={20} /><span className="text-[9px] mt-1">カレンダー</span>
          </button>

          <button onClick={() => { setActiveTab('journal'); setSelectedColumn(null); setSelectedJournal(null); }} className={`flex flex-col items-center py-2 rounded-xl transition-all ${activeTab === 'journal' || selectedJournal ? 'text-[#E63946] font-bold' : 'text-slate-400'}`}>
            <Music size={20} /><span className="text-[9px] mt-1">お稽古帳</span>
          </button>
        </div>
      </nav>
    </div>
  );
}