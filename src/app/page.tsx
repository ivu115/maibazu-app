import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Music, ShoppingBag, MapPin, Users, Sparkles, Heart, Scroll, Zap, Info } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1D3557] font-sans">
      {/* 🚀 ヘッダー */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="舞バズ ロゴ" className="h-10 w-10 object-contain" />
              <span className="text-xl font-black tracking-tighter text-[#1D3557]">舞バズ</span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-8 font-medium text-sm text-slate-500">
            <a href="#about" className="hover:text-[#E63946] transition-colors">日本舞踊とは</a>
            <a href="#benefits" className="hover:text-[#E63946] transition-colors">メリット</a>
            <a href="#course" className="hover:text-[#E63946] transition-colors">体験内容</a>
          </nav>
          <Link href="/search">
            <Button className="bg-[#E63946] hover:bg-[#D62839] text-white rounded-full px-6 transition-all hover:scale-105 active:scale-95 text-xs font-bold">
              無料相談・予約
            </Button>
          </Link>
        </div>
      </header>

      {/* 🌸 ヒーローセクション */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-28 md:pb-24 text-black">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-red-50 text-[#E63946] px-4 py-1.5 rounded-full text-xs font-bold mb-6 tracking-widest uppercase">
              <Sparkles size={14} /> Traditional Culture DX
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-8">
              日本舞踊を<br />
              <span className="text-[#E63946]">もっと気軽</span>に、<br />
              <span className="text-[#E63946]">もっと手軽</span>に。
            </h1>
            <p className="text-base md:text-lg text-slate-500 mb-10 leading-relaxed max-w-md mx-auto md:mx-0 font-medium">
              「やってみたい」という直感を大切にしたいから。<br/>
              流派の壁や道具の準備、不透明な費用をすべて取り払いました。
            </p>
            <Link href="/search">
              <Button size="lg" className="text-lg px-10 py-8 bg-[#1D3557] text-white hover:shadow-2xl transition-all hover:-translate-y-1 rounded-2xl font-bold">
                まずは3回完結コースを体験する
              </Button>
            </Link>
          </div>
          <div className="relative">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-100 rounded-full blur-3xl opacity-50 px-4 text-black"></div>
            <img src="/group.jpg" alt="Enjoy Japanese Dance" className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 object-cover" />
          </div>
        </div>
      </section>

      {/* 🏮 日本舞踊のまとめセクション（詳しく・＊＊削除版） */}
      <section id="about" className="py-24 bg-white border-y border-slate-100 text-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 text-[#E63946] mb-4">
             <Info size={20} />
             <span className="text-sm font-black uppercase tracking-[0.2em]">What is Maibazu?</span>
          </div>
          <h2 className="text-3xl font-bold mb-12">3分でわかる日本舞踊の魅力</h2>
          <div className="space-y-10 text-slate-600 text-left bg-slate-50 p-8 md:p-14 rounded-[3rem]">
            <article>
              <h3 className="text-xl font-bold text-[#1D3557] mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-[#E63946] rounded-full"></span>
                ルーツは江戸時代の「究極の憧れ」
              </h3>
              <p className="leading-relaxed">
                日本舞踊は、江戸時代に歌舞伎から独立して生まれた芸術です。かつての庶民たちは、スター俳優である歌舞伎役者の美しい所作や踊りに強く憧れ、それを自分でも学びたいという熱意から「習い事」として発展させました。つまり、日本文化の美しさが凝縮された最高峰のエンターテインメントなのです。
              </p>
            </article>

            <article>
              <h3 className="text-xl font-bold text-[#1D3557] mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-[#E63946] rounded-full"></span>
                「足し算」の西洋と、「引き算」の日舞
              </h3>
              <p className="leading-relaxed">
                バレエやヒップホップなどの西洋のダンスが「重心を高く上げ、飛び跳ねる、動の美」であるのに対し、日本舞踊は対極。重心をぐっと下げ、地面を踏みしめるように滑らせる「すり足」が基本です。無駄な動きをそぎ落とした先に宿る「静の美」と、一瞬の静止に宿る感情。その深みこそが、見る者を魅了し続けています。
              </p>
            </article>

            <article>
              <h3 className="text-xl font-bold text-[#1D3557] mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-[#E63946] rounded-full"></span>
                「間」を感じる、日本特有のリズム感
              </h3>
              <p className="leading-relaxed">
                日本舞踊において最も重要とされるのが「間（ま）」です。音と音のあいだ。動きと動きの隙間に生まれる余白。この「間」を操ることで、扇子一本だけで桜が舞い散る様子や、しとしとと降る雨、さらには繊細な恋心までをも描き出します。
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* 💎 メリットセクション */}
      <section id="benefits" className="py-24 bg-[#1D3557] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#E63946] rounded-full blur-[120px] opacity-20 -mr-32 -mt-32"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 italic">Benefits of Japanese Dance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BenefitCard 
              icon={<Zap size={24} className="text-[#E63946]" />}
              title="姿勢と体幹の向上"
              desc="『腰を入れる』という独特の基本姿勢を保つことで、デスクワークで崩れがちな姿勢が矯正され、自然と美しい立ち姿になります。"
            />
            <BenefitCard 
              icon={<Scroll size={24} className="text-[#E63946]" />}
              title="教養としての日本文化"
              desc="演目の背景にある古典文学や歴史、季節の移ろいを知ることで、大人の女性・男性としての深み（教養）が身につきます。"
            />
            <BenefitCard 
              icon={<Heart size={24} className="text-[#E63946]" />}
              title="日常の所作が美しくなる"
              desc="日常の歩き方、お辞儀の仕方、物の受け渡し。稽古で培った指先の意識が、あなたの毎日を上品でしなやかに変えていきます。"
            />
          </div>
        </div>
      </section>

/* 📅 カリキュラム */
<section id="course" className="py-24 bg-[#f8fbff] text-black">
  <div className="max-w-6xl mx-auto px-4">
    <div className="grid md:grid-cols-2 gap-16 items-center">
      <div className="relative group">
        <img src="/rental.jpg" alt="Rich Selection" className="relative rounded-[2.5rem] shadow-xl w-full h-auto" />
      </div>
      <div className="space-y-8">
        <header>
          <h2 className="text-3xl font-black text-[#1D3557] mb-4 uppercase tracking-tighter">Hybrid Trial Pack</h2>
          <p className="text-slate-500 font-medium underline decoration-[#E63946] decoration-2 underline-offset-4">事前動画 ＋ 対面1回完結の新しい体験</p>
        </header>
        <div className="space-y-4">
          <StepItem number="STEP 1" title="自宅でオンデマンド予習（5分）" desc="歴史や作法、当日の流れを動画で事前チェック。不安ゼロで当日へ。" />
          <StepItem number="STEP 2" title="稽古場での対面レッスン（60分）" desc="道具はすべて用意。親しみやすい本格邦楽に合わせて楽しく身体を動かします。" />
          <StepItem number="STEP 3" title="Web振り返りノート" desc="レッスン後の感想や質問をアプリで送信。先生から一言メッセージが届きます。" />
        </div>
      </div>
    </div>
  </div>
</section>

      {/* 🏫 認定教室ボタン */}
      <section id="schools" className="py-24 bg-white text-center text-black">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-16 tracking-tight italic">Find Your Best Studio</h2>
          <div className="flex justify-center">
            <Link href="/search">
              <Button size="lg" className="rounded-full px-20 py-10 bg-[#E63946] text-white font-black text-xl hover:scale-105 transition-all shadow-xl shadow-red-100 italic">
                今すぐ認定教室を検索
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white text-center border-t text-black">
  <p className="text-xs text-slate-300 italic mb-4">© 2026 Maibazu - Japanese Dance DX Platform</p>
  {/* 👇 OBピッチでの切り替え用リンク */}
  <Link href="/dashboard" className="text-[10px] text-slate-200 hover:text-slate-400 transition-colors">
     教室運営者の方はこちら（Admin Login）
  </Link>
</footer>
    </div>
  );
}

// ─── 子コンポーネント ───

function BenefitCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] backdrop-blur hover:bg-white/10 transition-colors">
      <div className="bg-white size-12 flex items-center justify-center rounded-xl mb-6 shadow-lg">{icon}</div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-white/60 text-sm leading-relaxed font-medium">{desc}</p>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="text-center p-4">
      <div className="bg-slate-50 size-16 flex items-center justify-center rounded-2xl mx-auto mb-6 text-[#E63946] shadow-sm italic font-bold">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 italic">{title}</h3>
      <p className="text-slate-500 text-sm italic">{desc}</p>
    </div>
  );
}

function StepItem({ number, title, desc }: { number: string, title: string, desc: string }) {
  return (
    <div className="flex gap-6 bg-white p-6 rounded-3xl shadow-sm items-center border border-slate-50 group hover:shadow-xl transition-all">
      <span className="text-4xl font-black text-slate-100 italic tracking-tighter group-hover:text-[#E63946]/20 transition-colors">{number}</span>
      <div>
        <h4 className="font-bold text-lg text-[#1D3557] mb-0.5">{title}</h4>
        <p className="text-slate-400 text-xs font-medium leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}