import {
  ArrowRight,
  BadgeCheck,
  Coffee,
  MapPin,
  Music2,
  Receipt,
  Shirt,
  Sparkles,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const promises = [
  {
    icon: Receipt,
    number: "01",
    title: "完全明朗会計",
    description:
      "入会金・お礼・お布施など、不透明な費用を一切排除。表示価格＝支払い総額。初めてでも安心して始められます。",
  },
  {
    icon: Shirt,
    number: "02",
    title: "手ぶらでOK",
    description:
      "稽古着も扇子も全てセット。Tシャツやジャージでも始められます。着物がなくても、今日から一歩目を踏み出せます。",
  },
  {
    icon: Music2,
    number: "03",
    title: "J-POP・現代曲対応",
    description:
      "古典だけでなく、好きな音楽で日本舞踊の所作を学べる「舞バズ専用カリキュラム」。伝統と今を、同じ教室で。",
  },
];

const certifiedStudios = [
  {
    name: "扇舞堂 表参道スタジオ",
    teacher: "田中 美咲",
    teacherInitial: "美",
    location: "東京都渋谷区",
    tags: ["10〜30代が8割以上", "初心者歓迎", "手ぶらOK"],
    price: "15,000",
    accent: "from-rose-100 to-orange-50",
  },
  {
    name: "現代舞塾 桜扇",
    teacher: "佐藤 陽菜",
    teacherInitial: "陽",
    location: "大阪府大阪市（梅田）",
    tags: ["20代中心", "J-POP対応", "完全明朗会計"],
    price: "18,000",
    accent: "from-sky-100 to-indigo-50",
  },
  {
    name: "博多舞スタジオ",
    teacher: "山本 凛",
    teacherInitial: "凛",
    location: "福岡県福岡市（天神）",
    tags: ["カジュアル稽古", "3回完結", "現代曲メイン"],
    price: "12,000",
    accent: "from-emerald-100 to-teal-50",
  },
];

const teacherMoments = [
  {
    icon: Coffee,
    title: "稽古の合間のコーヒー休憩",
    description:
      "厳かな稽古のあと、先生たちも普通のカフェで談笑。舞踊の世界は、もっと身近なものです。",
    gradient: "from-amber-100 via-orange-50 to-rose-50",
  },
  {
    icon: Users,
    title: "先生も普通の若者です",
    description:
      "SNSも見るし、推しもいる。伝統を守りながら、同世代の感覚で教えてくれる先生がここにいます。",
    gradient: "from-blue-100 via-slate-50 to-indigo-50",
  },
  {
    icon: Sparkles,
    title: "好きな曲で、踊る喜びを",
    description:
      "古典の型を学びつつ、YOASOBIやOfficial髭男dismの曲で所作を体験。若者の「好き」が入口になります。",
    gradient: "from-violet-100 via-fuchsia-50 to-pink-50",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-maibazu-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-maibazu-ink/5 bg-maibazu-bg/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-full bg-maibazu-red text-sm font-black text-white">
              舞
            </span>
            <span className="text-xl font-black tracking-tight text-maibazu-ink">
              舞バズ
            </span>
          </div>
          <Button size="sm" className="hidden sm:inline-flex">
            体験パッケージを探す
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5">
        {/* Hero */}
        <section className="relative overflow-hidden py-16 sm:py-24">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-8 size-64 rounded-full bg-maibazu-red/5 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-12 -left-12 size-48 rounded-full bg-maibazu-ink/5 blur-3xl"
          />

          <div className="relative space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-maibazu-ink/10 bg-white px-4 py-1.5 text-xs font-medium text-maibazu-ink/70">
              <BadgeCheck className="size-3.5 text-maibazu-red" />
              日本舞踊の入口プラットフォーム
            </div>

            <h1 className="text-3xl font-black leading-[1.35] tracking-tight text-maibazu-ink sm:text-4xl sm:leading-[1.3]">
              日本舞踊を、
              <br />
              <span className="text-maibazu-red">
                かつての歌舞伎のように
              </span>
              <br />
              ポップな文化へ。
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-maibazu-ink/70 sm:text-lg">
              「敷居が高い」「月謝が不明」「着物がない」。そんな一歩目の不安を、舞バズが解消します。
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button size="lg" className="w-full sm:w-auto">
                3回完結の体験パッケージを探す
                <ArrowRight className="size-4" />
              </Button>
              <p className="text-xs text-maibazu-ink/50 sm:text-sm">
                入会金・お布施なし / 手ぶらで参加OK
              </p>
            </div>
          </div>

          {/* Decorative tech-meets-tradition strip */}
          <div className="mt-14 grid grid-cols-3 gap-3">
            {["伝統", "×", "テック"].map((label, i) => (
              <div
                key={label}
                className={`flex h-16 items-center justify-center rounded-xl border border-maibazu-ink/10 text-sm font-bold ${
                  i === 1
                    ? "bg-maibazu-ink text-white"
                    : "bg-white text-maibazu-ink"
                }`}
              >
                {label}
              </div>
            ))}
          </div>
        </section>

        {/* 3 Promises */}
        <section className="border-t border-maibazu-ink/5 py-16 sm:py-20">
          <div className="mb-10 space-y-3">
            <p className="text-sm font-bold uppercase tracking-widest text-maibazu-red">
              Maibazu Promise
            </p>
            <h2 className="text-2xl font-black leading-tight text-maibazu-ink sm:text-3xl">
              市場の負を解消する
              <br />
              舞バズの3つの約束
            </h2>
            <p className="text-sm leading-relaxed text-maibazu-ink/60">
              現場で聞いた「通いたいけど不安」を、プロダクト設計で一つずつ解消しました。
            </p>
          </div>

          <div className="space-y-4">
            {promises.map((item) => (
              <Card
                key={item.number}
                className="overflow-hidden transition-shadow hover:shadow-md"
              >
                <CardContent className="flex gap-5 p-6">
                  <div className="flex shrink-0 flex-col items-center gap-2">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-maibazu-red/10 text-maibazu-red">
                      <item.icon className="size-5" />
                    </div>
                    <span className="text-xs font-bold text-maibazu-ink/30">
                      {item.number}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-maibazu-ink">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-maibazu-ink/65">
                      {item.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Certified Studios */}
        <section className="border-t border-maibazu-ink/5 py-16 sm:py-20">
          <div className="mb-10 space-y-3">
            <p className="text-sm font-bold uppercase tracking-widest text-maibazu-red">
              Certified Studios
            </p>
            <h2 className="text-2xl font-black leading-tight text-maibazu-ink sm:text-3xl">
              舞バズが認定した、
              <br />
              若者が安心して通える教室
            </h2>
            <p className="text-sm leading-relaxed text-maibazu-ink/60">
              審査基準をクリアした教室のみ掲載。表示価格は3回完結コースの総額です。
            </p>
          </div>

          <div className="space-y-5">
            {certifiedStudios.map((studio) => (
              <Card
                key={studio.name}
                className="overflow-hidden transition-shadow hover:shadow-md"
              >
                <div className={`h-2 bg-gradient-to-r ${studio.accent}`} />
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex size-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${studio.accent} text-xl font-black text-maibazu-ink`}
                      aria-label={`${studio.teacher}先生`}
                    >
                      {studio.teacherInitial}
                    </div>
                    <div className="min-w-0 flex-1 space-y-1">
                      <CardTitle>{studio.name}</CardTitle>
                      <CardDescription>{studio.teacher} 先生</CardDescription>
                      <div className="flex items-center gap-1 pt-1 text-xs text-maibazu-ink/55">
                        <MapPin className="size-3.5 shrink-0" />
                        {studio.location}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 pt-0">
                  <div className="flex flex-wrap gap-2">
                    {studio.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-maibazu-ink/5 px-3 py-1 text-xs font-medium text-maibazu-ink/75"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-baseline gap-1 border-t border-maibazu-ink/5 pt-4">
                    <span className="text-xs text-maibazu-ink/50">
                      3回完結コース
                    </span>
                    <span className="ml-auto text-2xl font-black text-maibazu-red">
                      ¥{studio.price}
                    </span>
                    <span className="text-xs text-maibazu-ink/50">税込</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    この教室の体験を見る
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Teachers' Human Side */}
        <section className="border-t border-maibazu-ink/5 py-16 sm:py-20">
          <div className="mb-10 space-y-3">
            <p className="text-sm font-bold uppercase tracking-widest text-maibazu-red">
              Behind the Scenes
            </p>
            <h2 className="text-2xl font-black leading-tight text-maibazu-ink sm:text-3xl">
              先生たちの横顔
            </h2>
            <p className="text-sm leading-relaxed text-maibazu-ink/60">
              厳かなイメージだけでは、一歩目は踏み出せない。舞バズは「人」の魅力も伝えます。
            </p>
          </div>

          <div className="space-y-4">
            {teacherMoments.map((moment, index) => (
              <div
                key={moment.title}
                className={`overflow-hidden rounded-2xl border border-maibazu-ink/10 bg-gradient-to-br ${moment.gradient}`}
              >
                <div className="grid sm:grid-cols-5">
                  <div
                    className={`relative flex min-h-36 items-center justify-center sm:col-span-2 ${
                      index % 2 === 1 ? "sm:order-2" : ""
                    }`}
                  >
                    <div className="flex size-20 items-center justify-center rounded-full bg-white/80 shadow-sm">
                      <moment.icon className="size-9 text-maibazu-red" />
                    </div>
                    <div
                      aria-hidden
                      className="absolute inset-4 rounded-xl border border-dashed border-maibazu-ink/10"
                    />
                  </div>
                  <div
                    className={`flex flex-col justify-center p-6 sm:col-span-3 ${
                      index % 2 === 1 ? "sm:order-1" : ""
                    }`}
                  >
                    <h3 className="mb-2 text-lg font-bold text-maibazu-ink">
                      {moment.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-maibazu-ink/70">
                      {moment.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="border-t border-maibazu-ink/5 py-16 sm:py-20">
          <Card className="overflow-hidden border-maibazu-ink/10 bg-maibazu-ink text-white">
            <CardContent className="space-y-6 p-8 text-center">
              <p className="text-sm font-medium text-white/70">
                まずは3回、試してみる。
              </p>
              <h2 className="text-2xl font-black leading-tight sm:text-3xl">
                日本舞踊の第一歩を、
                <br />
                舞バズと一緒に。
              </h2>
              <Button
                size="lg"
                className="mx-auto w-full bg-maibazu-red hover:bg-maibazu-red/90 sm:w-auto"
              >
                3回完結の体験パッケージを探す
                <ArrowRight className="size-4" />
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-maibazu-ink/5 bg-white py-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-2 px-5 text-center text-xs text-maibazu-ink/45">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-full bg-maibazu-red text-[10px] font-black text-white">
              舞
            </span>
            <span className="font-bold text-maibazu-ink/70">舞バズ</span>
          </div>
          <p>© 2026 舞バズ — 日本舞踊を、ポップな文化へ。</p>
        </div>
      </footer>
    </div>
  );
}
