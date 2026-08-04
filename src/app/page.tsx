import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Music, ShoppingBag, MapPin, Users, Sparkles, Heart, Scroll, Zap, Info, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1D3557] font-sans">
      {/* 🚀 ヘッダー */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-md text-black">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="舞バズ ロゴ" className="h-10 w-10 object-contain rounded-full" />
              <span className="text-xl font-black tracking-tighter text-[#1D3557]">舞バズ</span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-8 font-medium text-sm text-slate-500 items-center">
            <a href="#about" className="hover:text-[#E63946] transition-colors">日本舞踊とは</a>
            <a href="#benefits" className="hover:text-[#E63946] transition-colors">メリット</a>
            <Link href="/search" className="hover:text-[#E63946] transition-colors font-bold text-[#1D3557]">教室を探す</Link>
            <Link href="/login" className="hover:text-[#E63946] transition-colors font-bold text-slate-500 text-xs">ログイン</Link>
            <Link href="/login" className="bg-slate-100 hover:bg-slate-200 text-[#1D3557] px-3 py-1.5 rounded-full text-xs font-bold transition-all">新規登録</Link>
          </nav>
          <Link href="/search">
            <Button className="bg-[#E63946] hover:bg-[#D62839] text-white rounded-full px-6 transition-all hover:scale-105 active:scale-95 text-xs font-bold shadow-md">
              1日体験に申し込む
            </Button>
          </Link>
        </div>
      </header>

      {/* 🌸 ヒーローセクション */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-28 md:pb-24 text-black">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-red-50 text-[#E63946] px-4 py-1.5 rounded-full text-xs font-bold mb-6 tracking-widest uppercase border border-red-100">
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
              <Button size="lg" className="text-lg px-10 py-8 bg-[#1D3557] text-white hover:shadow-2xl transition-all hover:-translate-y-1 rounded-2xl font-bold gap-2">
                1日体験に申し込む <ArrowRight size={20} />
              </Button>
            </Link>
          </div>
          <div className="relative">
            <img src="/group.jpg" alt="Enjoy Japanese Dance" className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 object-cover w-full h-auto" />
          </div>
        </div>
      </section>

      {/* 🏮 3分でわかる日本舞踊の魅力 */}
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
      <section id="benefits" className="py-24 bg-[#1D3557] text-white">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 italic">Benefits of Japanese Dance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BenefitCard icon={<Zap size={28} className="text-[#E63946]" />} title="姿勢と体幹の向上" desc="基本姿勢（腰を入れる）により、デスクワークで崩れがちな姿勢が矯正されます。" />
            <BenefitCard icon={<Scroll size={28} className="text-[#E63946]" />} title="教養としての日本文化" desc="演目の背景にある古典文学や季節の移ろいを知ることで、大人の教養が身につきます。" />
            <BenefitCard icon={<Heart size={28} className="text-[#E63946]" />} title="日常の所作が美しくなる" desc="歩き方、お辞儀、物の受け渡し。稽古で培った指先の意識が日常を上品に変えます。" />
          </div>
        </div>
      </section>

      {/* ✨ 舞バズの3つの約束 */}
      <section id="concept" className="py-24 bg-white text-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 italic text-[#1D3557]">Our Mission</h2>
            <div className="w-12 h-1 bg-[#E63946] mx-auto rounded-full"></div>
            <p className="mt-4 text-slate-500 font-medium tracking-wide">舞バズなら続けられる理由</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
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
      <section id="course" className="py-24 bg-[#f8fbff] text-black">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <img src="/rental.jpg" alt="Rich Selection" className="relative rounded-[2.5rem] shadow-xl w-full h-auto object-cover" />
            <div className="space-y-8">
              <header>
                <h2 className="text-3xl font-black text-[#1D3557] mb-4 uppercase tracking-tighter">Hybrid Trial Pack</h2>
                <p className="text-slate-500 font-medium underline decoration-[#E63946] decoration-2 underline-offset-4">事前動画 ＋ 対面1回完結の新しい体験</p>
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
      <section id="schools" className="py-24 bg-white text-center text-black">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 tracking-tight">提携中の認定教室</h2>
          <p className="text-slate-400 mb-16 italic">クリックで各教室の詳細・事前予習動画の概要をご覧いただけます。</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            <SchoolCard id="1" name="S 教室" location="大阪・吹田" tags={["20代30代中心", "初心者特化"]} price="15,000円" img="/lesson.jpg" />
            <SchoolCard id="2" name="H 教室" location="兵庫・伊丹" tags={["手ぶらOK", "SNS歓迎"]} price="12,000円" img="/rental.jpg" />
            <SchoolCard id="3" name="K 教室" location="東京・世田谷" tags={["夜間対応", "親切指導"]} price="18,000円" img="/hero.jpg" />
          </div>
          <div className="mt-20">
            <Link href="/search">
              <Button size="lg" className="rounded-full px-16 py-8 bg-[#1D3557] text-white font-bold hover:bg-[#E63946] transition-all text-lg shadow-xl">
                条件を指定して教室を探す
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ☕ Footer（★受講生・講師の双方とも /login へ誘導するよう統一） */}
      <footer className="py-16 bg-[#1D3557] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          <div className="w-16 h-16 rounded-full bg-white p-1.5 mx-auto overflow-hidden shadow-lg flex items-center justify-center">
            <img src="/logo.png" alt="logo" className="w-full h-full object-contain" />
          </div>
          <p className="text-sm opacity-60">© 2026 Maibazu - Japanese Dance DX Platform</p>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-center gap-6 text-xs text-white/50">
            <Link href="/search" className="hover:text-white transition-colors">教室検索</Link>
            
            {/* 👇 生徒側・先生側の両方のリンク先を /login に集約 */}
            <Link href="/login" className="hover:text-[#E63946] font-bold text-white/80 transition-colors underline underline-offset-4">
               受講生の方はこちら（アプリログイン）
            </Link>
            <Link href="/login" className="hover:text-[#E63946] font-bold text-white/80 transition-colors underline underline-offset-4">
               教室運営者・講師の方はこちら（Adminログイン）
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

// コンポーネント
function BenefitCard({ icon, title, desc }: any) {
  return (
    <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] backdrop-blur hover:bg-white/10 transition-colors">
      <div className="bg-white w-14 h-14 min-w-[56px] min-h-[56px] flex items-center justify-center rounded-2xl mb-6 shadow-lg text-[#E63946]">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-white/70 text-sm leading-relaxed font-medium">{desc}</p>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: any) {
  return (
    <div className="text-center p-8 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-sm">
      <div className="bg-white w-16 h-16 min-w-[64px] min-h-[64px] flex items-center justify-center rounded-2xl mx-auto mb-6 text-[#E63946] shadow-md border border-slate-100">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-[#1D3557]">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed font-medium">{desc}</p>
    </div>
  );
}

function StepItem({ number, title, desc }: any) {
  return (
    <div className="flex gap-6 bg-white p-6 rounded-3xl shadow-sm items-center border border-slate-50">
      <span className="text-xs font-black bg-red-50 text-[#E63946] px-3 py-1.5 rounded-full">{number}</span>
      <div>
        <h4 className="font-bold text-lg text-[#1D3557] mb-0.5">{title}</h4>
        <p className="text-slate-400 text-xs font-medium leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function SchoolCard({ id, name, location, tags, price, img }: any) {
  return (
    <Link href={`/search/${id}`}>
      <Card className="rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all cursor-pointer border-none bg-white group shadow-sm text-black">
        <div className="aspect-[4/3] bg-slate-200 overflow-hidden relative">
           <img src={img} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
           <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-black text-[#E63946] flex items-center gap-1 shadow-sm uppercase tracking-widest">
              <MapPin size={10} /> {location}
           </div>
        </div>
        <CardHeader className="p-6">
          <CardTitle className="text-xl font-black mb-4 tracking-tight">{name}</CardTitle>
          <div className="flex justify-between items-center pt-4 border-t border-slate-100">
            <span className="text-[10px] font-bold text-[#1D3557]/40 uppercase tracking-widest">Hybrid Trial</span>
            <span className="text-xl font-black text-[#E63946]">{price}</span>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}