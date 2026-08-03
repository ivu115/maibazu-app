import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Music, ShoppingBag, MapPin, Users, Sparkles, Heart, Scroll, Zap, Info, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1D3557]">
      {/* 🚀 ヘッダー */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-md text-black">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="舞バズ ロゴ" className="h-9 w-9 object-contain" />
              <span className="text-xl font-black tracking-tighter text-[#1D3557]">舞バズ</span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-8 font-medium text-sm text-slate-500">
            <a href="#about" className="hover:text-[#E63946] transition-colors">日本舞踊とは</a>
            <a href="#benefits" className="hover:text-[#E63946] transition-colors">メリット</a>
            <Link href="/search" className="hover:text-[#E63946] transition-colors font-bold text-[#1D3557]">教室を探す</Link>
          </nav>
          <Link href="/search">
            <Button className="bg-[#E63946] hover:bg-[#D62839] text-white rounded-full px-6 transition-all text-xs font-bold shadow-sm">
              無料相談・予約
            </Button>
          </Link>
        </div>
      </header>

      {/* 🌸 ヒーローセクション */}
      <section className="relative overflow-hidden pt-10 pb-16 md:pt-28 md:pb-24 text-black">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div className="z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-red-50 text-[#E63946] px-4 py-1.5 rounded-full text-xs font-bold mb-6 tracking-widest uppercase">
              <Sparkles size={14} /> Traditional Culture DX
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
              日本舞踊を<br />
              <span className="text-[#E63946]">もっと気軽</span>に、<br />
              <span className="text-[#E63946]">もっと手軽</span>に。
            </h1>
            <p className="text-base md:text-lg text-slate-500 mb-10 leading-relaxed max-w-md mx-auto md:mx-0 font-medium">
              「やってみたい」という直感を大切に。<br/>
              追加請求なし、事前解説動画付きの特別な1日体験。
            </p>
            <Link href="/search">
              <Button size="lg" className="text-base md:text-lg px-8 py-7 bg-[#1D3557] text-white hover:shadow-2xl transition-all rounded-2xl font-bold gap-2">
                まずはハイブリッド体験コースを探す <ArrowRight size={20} />
              </Button>
            </Link>
          </div>
          <div className="relative">
            <img src="/group.jpg" alt="Enjoy Japanese Dance" className="relative aspect-[4/3] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500 object-cover w-full h-auto" />
          </div>
        </div>
      </section>

      {/* 🏮 日本舞踊とは */}
      <section id="about" className="py-20 bg-white border-y border-slate-100 text-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 text-[#E63946] mb-3">
             <Info size={18} />
             <span className="text-xs font-black uppercase tracking-[0.2em]">What is Maibazu?</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-10">3分でわかる日本舞踊の魅力</h2>
          <div className="space-y-8 text-slate-600 text-base md:text-lg leading-relaxed text-left bg-slate-50 p-6 md:p-12 rounded-[2rem] md:rounded-[3rem]">
            <article>
              <h3 className="text-lg md:text-xl font-bold text-[#1D3557] mb-2 flex items-center gap-2">
                <span className="w-1.5 h-5 bg-[#E63946] rounded-full"></span>
                ルーツは江戸時代の「究極の憧れ」
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-slate-600">
                日本舞踊は、江戸時代に歌舞伎から独立して生まれた芸術です。かつての庶民たちが、憧れのスターの美しい所作を自ら学ぶ「お稽古事」として発展させました。
              </p>
            </article>

            <article>
              <h3 className="text-lg md:text-xl font-bold text-[#1D3557] mb-2 flex items-center gap-2">
                <span className="w-1.5 h-5 bg-[#E63946] rounded-full"></span>
                「足し算」の西洋と、「引き算」の日舞
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-slate-600">
                西洋のダンスが「重心を高く上げ、飛び跳ねる動の美」なら、日本舞踊は「重心を下げ、地面を踏みしめる静の美」。無駄を削ぎ落とした「引き算の美学」の世界です。
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* 💎 メリット */}
      <section id="benefits" className="py-20 bg-[#1D3557] text-white">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-12 italic">Benefits of Japanese Dance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <BenefitCard icon={<Zap size={28} className="text-[#E63946]" />} title="姿勢と体幹の向上" desc="基本姿勢（腰を入れる）により、デスクワークで崩れがちな姿勢が矯正されます。" />
            <BenefitCard icon={<Scroll size={28} className="text-[#E63946]" />} title="教養としての日本文化" desc="演目の背景にある古典文学や季節の移ろいを知ることで、大人の教養が身につきます。" />
            <BenefitCard icon={<Heart size={28} className="text-[#E63946]" />} title="日常の所作が美しくなる" desc="歩き方、お辞儀、物の受け渡し。稽古で培った指先の意識が日常を上品に変えます。" />
          </div>
        </div>
      </section>

      {/* ✨ 舞バズの3つのアプローチ（アイコンサイズ修正版） */}
      <section id="concept" className="py-20 bg-white text-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 italic text-[#1D3557]">Our Mission</h2>
            <div className="w-12 h-1 bg-[#E63946] mx-auto rounded-full"></div>
            <p className="mt-3 text-xs md:text-sm text-slate-500 font-medium tracking-wide">舞バズなら続けられる理由</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 py-8 rounded-[2rem] border border-slate-100 bg-slate-50/50">
            <FeatureCard 
              icon={<CheckCircle2 size={32} className="text-[#E63946]" />} 
              title="完全明朗会計" 
              desc="事前決済で不透明な費用なし。表示価格のみで安心して始められます。" 
            />
            <FeatureCard 
              icon={<ShoppingBag size={32} className="text-[#E63946]" />} 
              title="手ぶらでOK" 
              desc="レンタルすべて込み。学校や仕事帰りに、Tシャツ参加歓迎。" 
            />
            <FeatureCard 
              icon={<Music size={32} className="text-[#E63946]" />} 
              title="楽しみ方は自由" 
              desc="J-POPに頼らず、親しみやすい本格邦楽で基本をマスター。" 
            />
          </div>
        </div>
      </section>

      {/* 📅 カリキュラム */}
      <section id="course" className="py-20 bg-[#f8fbff] text-black">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <img src="/rental.jpg" alt="Rich Selection" className="relative rounded-[2rem] shadow-lg w-full h-auto object-cover" />
            <div className="space-y-6">
              <header>
                <h2 className="text-2xl md:text-3xl font-black text-[#1D3557] mb-2 uppercase tracking-tighter">Hybrid Trial Pack</h2>
                <p className="text-slate-500 text-sm font-medium underline decoration-[#E63946] decoration-2 underline-offset-4">事前動画 ＋ 対面1回完結の新しい体験</p>
              </header>
              <div className="space-y-4">
                <StepItem number="STEP 1" title="自宅でオンデマンド予習（5分）" desc="歴史や作法、当日の流れを動画で事前にチェック。不安ゼロで当日へ。" />
                <StepItem number="STEP 2" title="稽古場での対面レッスン（60分）" desc="道具はすべて用意。親しみやすい本格邦楽に合わせて楽しく身体を動かします。" />
                <StepItem number="STEP 3" title="Web振り返りノート" desc="レッスン後の感想や質問をアプリで送信。先生から一言メッセージが届きます。" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🏫 認定教室ボタン */}
      <section id="schools" className="py-20 bg-white text-center text-black">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">提携中の認定教室</h2>
          <p className="text-slate-400 mb-12 text-sm italic">クリックで各教室の詳細・事前予習動画の概要をご覧いただけます。</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            <SchoolCard id="1" name="S 教室" location="大阪・吹田" tags={["20代30代中心", "初心者特化"]} price="15,000円" img="/lesson.jpg" />
            <SchoolCard id="2" name="H 教室" location="兵庫・伊丹" tags={["手ぶらOK", "SNS歓迎"]} price="12,000円" img="/rental.jpg" />
            <SchoolCard id="3" name="K 教室" location="東京・世田谷" tags={["夜間対応", "親切指導"]} price="18,000円" img="/hero.jpg" />
          </div>
          <div className="mt-16">
            <Link href="/search">
              <Button size="lg" className="rounded-full px-12 py-7 bg-[#1D3557] text-white font-bold hover:bg-[#E63946] transition-all text-base shadow-lg">
                条件を指定して教室を探す
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-[#1D3557] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <img src="/logo.png" alt="logo" className="w-12 h-12 mx-auto invert brightness-0 opacity-80" />
          <p className="text-xs opacity-60">© 2026 Maibazu - Japanese Dance DX Platform</p>
          <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-center gap-6 text-xs text-white/50">
            <Link href="/search" className="hover:text-white transition-colors">教室検索</Link>
            <Link href="/dashboard" className="hover:text-[#E63946] font-bold text-white/70 transition-colors underline underline-offset-4">
               教室運営者・講師の方はこちら（舞バズ Admin）
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── コンポーネント ───

function BenefitCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-[2rem] backdrop-blur hover:bg-white/10 transition-colors">
      <div className="bg-white w-14 h-14 flex items-center justify-center rounded-2xl mb-6 shadow-md">{icon}</div>
      <h3 className="text-lg md:text-xl font-bold mb-3">{title}</h3>
      <p className="text-white/70 text-xs md:text-sm leading-relaxed font-normal">{desc}</p>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="text-center p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
      <div className="bg-slate-50 w-16 h-16 flex items-center justify-center rounded-2xl mx-auto mb-4 text-[#E63946] shadow-inner">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-2 text-[#1D3557]">{title}</h3>
      <p className="text-slate-500 text-xs leading-relaxed font-normal">{desc}</p>
    </div>
  );
}

function StepItem({ number, title, desc }: { number: string, title: string, desc: string }) {
  return (
    <div className="flex gap-4 bg-white p-5 rounded-2xl shadow-sm items-center border border-slate-100">
      <span className="text-xs font-black bg-red-50 text-[#E63946] px-2.5 py-1 rounded-full shrink-0">{number}</span>
      <div>
        <h4 className="font-bold text-sm md:text-base text-[#1D3557] mb-0.5">{title}</h4>
        <p className="text-slate-400 text-xs font-normal leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function SchoolCard({ id, name, location, tags, price, img }: { id: string, name: string, location: string, tags: string[], price: string, img: string }) {
  return (
    <Link href={`/search/${id}`}>
      <Card className="rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all cursor-pointer border-none bg-white group shadow-sm text-black">
        <div className="aspect-[4/3] bg-slate-200 overflow-hidden relative">
           <img src={img} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
           <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black text-[#E63946] flex items-center gap-1 shadow-sm uppercase tracking-widest">
              <MapPin size={10} /> {location}
           </div>
        </div>
        <CardHeader className="p-6">
          <CardTitle className="text-lg font-black mb-3 tracking-tight">{name}</CardTitle>
          <div className="flex justify-between items-center pt-3 border-t border-slate-100">
            <span className="text-[10px] font-bold text-[#1D3557]/40 uppercase tracking-widest">Hybrid Trial</span>
            <span className="text-lg font-black text-[#E63946]">{price}</span>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}