"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, CalendarDays, LayoutDashboard, MessageSquare, Settings,
  Save, ShieldCheck, Zap, Globe, Smartphone, Check, Home, ArrowUpRight, Building2, CreditCard, Send, Percent, Plus, LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// 提携教室ごとのBPO介入度・契約設定データ
const INITIAL_STUDIO_SETTINGS: Record<string, any> = {
  "1": {
    name: "S 教室", location: "大阪・吹田", teacher: "〇〇 先生",
    bpoType: "full", // フルBPO代行
    marginRate: 50,  // 手数料率 50%
    price: "3,980円",
    tagline: "手ぶらでOK！20代・30代が8割のカジュアルお稽古場",
    features: "浴衣・着物レンタル代込み。事前解説動画つきで初めてでも安心して楽しめます。",
    tags: "着物コミコミ, 20代30代中心, 初心者特化",
    lineToken: "LINE_TOKEN_STUDIO_1_S",
    bankInfo: "三菱UFJ銀行 吹田支店 普通 1234567"
  },
  "2": {
    name: "H 教室", location: "兵庫・伊丹", teacher: "△△ 先生",
    bpoType: "listing", // Web掲載のみ
    marginRate: 30,     // 手数料率 30%
    price: "4,500円",
    tagline: "大人の教養。落ち着いた空間で学ぶ和の心",
    features: "本格和室でお稽古。丁寧な所作と立ち振る舞いが身につきます。",
    tags: "手ぶらOK, 事前動画あり, 大人の教養",
    lineToken: "LINE_TOKEN_STUDIO_2_H",
    bankInfo: "三井住友銀行 伊丹支店 普通 7654321"
  },
  "3": {
    name: "K 教室", location: "東京・世田谷", teacher: "◇◇ 先生",
    bpoType: "full", // フルBPO代行
    marginRate: 50,  // 手数料率 50%
    price: "4,980円",
    tagline: "夜間対応＆インバウンド大歓迎の世田谷稽古場",
    features: "英語対応OK。お仕事帰りに手ぶらで立ち寄れる洗練されたお教室です。",
    tags: "着物コミコミ, インバウンド対応, 夜間稽古",
    lineToken: "LINE_TOKEN_STUDIO_3_K",
    bankInfo: "みずほ銀行 世田谷支店 普通 9876543"
  }
};

export default function SettingsPage() {
  const [selectedStudio, setSelectedStudio] = useState("1");
  const [success, setSuccess] = useState(false);

  // 選択中教室のフォーム状態
  const [schoolName, setSchoolName] = useState("");
  const [location, setLocation] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [bpoType, setBpoType] = useState("full");
  const [marginRate, setMarginRate] = useState(50);
  const [price, setPrice] = useState("");
  const [tagline, setTagline] = useState("");
  const [features, setFeatures] = useState("");
  const [tags, setTags] = useState("");
  const [lineToken, setLineToken] = useState("");
  const [bankInfo, setBankInfo] = useState("");

  // 教室切り替え時にフォーム値を反映
  useEffect(() => {
    const data = INITIAL_STUDIO_SETTINGS[selectedStudio];
    if (data) {
      setSchoolName(data.name);
      setLocation(data.location);
      setTeacherName(data.teacher);
      setBpoType(data.bpoType);
      setMarginRate(data.marginRate);
      setPrice(data.price);
      setTagline(data.tagline);
      setFeatures(data.features);
      setTags(data.tags);
      setLineToken(data.lineToken);
      setBankInfo(data.bankInfo);
    }
  }, [selectedStudio]);

  // BPOタイプの変更に応じてデフォルト手数料率を自動入力
  const handleBpoTypeChange = (type: string) => {
    setBpoType(type);
    if (type === "full") setMarginRate(50);
    else if (type === "listing") setMarginRate(30);
  };

  const handleSave = () => {
    INITIAL_STUDIO_SETTINGS[selectedStudio] = {
      name: schoolName,
      location,
      teacher: teacherName,
      bpoType,
      marginRate,
      price,
      tagline,
      features,
      tags,
      lineToken,
      bankInfo
    };
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2500);
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] pb-24 md:pb-0 text-black font-sans">
      {/* PC用サイドバー（5大メニュー復活） */}
      <aside className="w-64 bg-[#1D3557] text-white hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="bg-[#E63946] p-1 rounded grow-0"><img src="/logo.png" alt="logo" className="w-6 h-6 invert brightness-0" /></div>
            <span className="font-black text-xl tracking-tighter text-white">舞バズ BPO Admin</span>
          </Link>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1">
          <Link href="/dashboard"><NavItem icon={<LayoutDashboard size={20}/>} label="統合ダッシュボード" active={false} /></Link>
          <Link href="/schedule"><NavItem icon={<CalendarDays size={20}/>} label="お稽古枠 代理設定" active={false} /></Link>
          <Link href="/students"><NavItem icon={<Users size={20}/>} label="生徒名簿・属性データ" active={false} /></Link>
          <Link href="/sns"><NavItem icon={<MessageSquare size={20}/>} label="SNS投稿代行AI" active={false} /></Link>
          <Link href="/settings"><NavItem icon={<Settings size={20}/>} label="提携教室・BPO設定" active={true} /></Link>
        </nav>
        <div className="p-4 border-t border-white/10 opacity-70 text-[11px] font-bold text-white flex items-center gap-1.5">
          <Building2 size={14} className="text-[#E63946]" /> 担当: 舞バズ 事務局
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto text-black">
        <header className="bg-white border-b h-16 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="flex items-center gap-1 text-slate-400 hover:text-[#E63946] text-xs font-bold transition-colors">
              <Home size={16} /> ホームへ
            </Link>
            <h2 className="font-extrabold text-base md:text-xl text-slate-800">提携教室 BPO契約・手数料率設定</h2>
          </div>

          <div className="flex items-center gap-3">
            {/* 提携教室切り替え */}
            <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-xl text-xs font-bold text-[#1D3557]">
              <Building2 size={16} className="text-[#E63946]" />
              <select 
                value={selectedStudio} 
                onChange={(e) => setSelectedStudio(e.target.value)}
                className="bg-transparent font-bold focus:outline-none cursor-pointer text-[#1D3557]"
              >
                <option value="1">S 教室（大阪・吹田）</option>
                <option value="2">H 教室（兵庫・伊丹）</option>
                <option value="3">K 教室（東京・世田谷）</option>
              </select>
            </div>

            <Button onClick={handleSave} className="bg-[#E63946] hover:bg-[#D62839] text-white gap-2 rounded-xl px-4 md:px-6 font-bold text-xs shadow-md">
              <Save size={16} /> {success ? "設定保存完了！" : "BPO契約設定を更新"}
            </Button>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8">
          {/* BPO介入度 ＆ 手数料率設定 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 px-2">
              <Percent className="text-[#E63946]" size={18} />
              <h3 className="font-black text-slate-400 text-xs uppercase tracking-widest">BPO介入度 ＆ 収益分配設定</h3>
            </div>
            <Card className="border-none shadow-sm rounded-3xl bg-white p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold">
                <div>
                  <label className="text-slate-400 block mb-1">BPO介入度（提携タイプ）</label>
                  <select 
                    value={bpoType} 
                    onChange={e => handleBpoTypeChange(e.target.value)}
                    className="w-full bg-slate-50 border-none h-11 rounded-xl px-3 font-bold text-[#1D3557]"
                  >
                    <option value="full">フルBPO代行（集客・予約・決済・LINE通知代行）</option>
                    <option value="listing">Webサイト掲載のみ（自力運営支援）</option>
                    <option value="custom">特別カスタム契約</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">舞バズ 成果報酬手数料率 (%)</label>
                  <div className="flex items-center gap-2">
                    <Input 
                      type="number" 
                      value={marginRate} 
                      onChange={e => setMarginRate(Number(e.target.value))} 
                      className="bg-slate-50 border-none h-11 text-black font-bold text-base" 
                    />
                    <span className="text-slate-600 font-extrabold text-sm">%</span>
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">手ぶら体験パッケージ販売価格</label>
                  <Input value={price} onChange={e => setPrice(e.target.value)} className="bg-slate-50 border-none h-11 text-black font-bold" />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">先生のLINE自動通知トークン / ID</label>
                  <Input value={lineToken} onChange={e => setLineToken(e.target.value)} className="bg-slate-50 border-none h-11 text-black font-bold font-mono" />
                </div>

                <div className="md:col-span-2">
                  <label className="text-slate-400 block mb-1">先生への体験料送金口座情報（精算用）</label>
                  <Input value={bankInfo} onChange={e => setBankInfo(e.target.value)} className="bg-slate-50 border-none h-11 text-black font-bold" />
                </div>
              </div>
            </Card>
          </section>

          {/* 公開教室プロフィール設定 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 px-2">
              <Zap className="text-[#E63946]" size={18} />
              <h3 className="font-black text-slate-400 text-xs uppercase tracking-widest">ポータル公開用 教室基本プロフィール</h3>
            </div>
            <Card className="border-none shadow-sm rounded-3xl bg-white p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold">
                <div>
                  <label className="text-slate-400 block mb-1">教室表示名</label>
                  <Input value={schoolName} onChange={e => setSchoolName(e.target.value)} className="bg-slate-50 border-none h-11 text-black font-bold" />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">エリア / 所在地</label>
                  <Input value={location} onChange={e => setLocation(e.target.value)} className="bg-slate-50 border-none h-11 text-black font-bold" />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">講師名</label>
                  <Input value={teacherName} onChange={e => setTeacherName(e.target.value)} className="bg-slate-50 border-none h-11 text-black font-bold" />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">タグ（カンマ区切り）</label>
                  <Input value={tags} onChange={e => setTags(e.target.value)} className="bg-slate-50 border-none h-11 text-black font-bold" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-slate-400 block mb-1">キャッチコピー</label>
                  <Input value={tagline} onChange={e => setTagline(e.target.value)} className="bg-slate-50 border-none h-11 text-black font-bold" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-slate-400 block mb-1">教室の特徴・メッセージ</label>
                  <textarea value={features} onChange={e => setFeatures(e.target.value)} rows={3} className="w-full bg-slate-50 border-none p-3 rounded-xl text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-[#E63946]" />
                </div>
              </div>
            </Card>
          </section>
        </div>
      </main>

      {/* 📱 スマホ専用固定ボトムナビゲーション（5大メニュー） */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1D3557] text-white border-t border-white/10 z-50 p-2 shadow-2xl">
        <div className="grid grid-cols-5 gap-1 text-center">
          <Link href="/dashboard" className="flex flex-col items-center py-2 rounded-xl text-white/60"><LayoutDashboard size={20} /><span className="text-[10px] mt-1 font-extrabold">ホーム</span></Link>
          <Link href="/schedule" className="flex flex-col items-center py-2 rounded-xl text-white/60"><CalendarDays size={20} /><span className="text-[10px] mt-1 font-extrabold">予定代行</span></Link>
          <Link href="/students" className="flex flex-col items-center py-2 rounded-xl text-white/60"><Users size={20} /><span className="text-[10px] mt-1 font-extrabold">生徒</span></Link>
          <Link href="/sns" className="flex flex-col items-center py-2 rounded-xl text-white/60"><MessageSquare size={20} /><span className="text-[10px] mt-1 font-extrabold">SNS代行</span></Link>
          <Link href="/settings" className="flex flex-col items-center py-2 rounded-xl bg-[#E63946] font-bold text-white shadow-sm"><Settings size={20} /><span className="text-[10px] mt-1 font-extrabold">設定</span></Link>
        </div>
      </nav>
    </div>
  );
}

function NavItem({ icon, label, active = false }: any) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-[#E63946] text-white shadow-lg' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}>
      <span className={active ? "text-white" : "text-white/40"}>{icon}</span>
      <span className="text-sm font-bold">{label}</span>
    </div>
  );
}