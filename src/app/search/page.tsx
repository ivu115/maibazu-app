"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search, ChevronRight, Map, List, ExternalLink } from "lucide-react";

const INITIAL_SCHOOLS = [
  { id: 1, name: "S 教室 (大阪・吹田)", location: "大阪府 吹田市", mapQuery: "大阪府吹田市", mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52425.26388484931!2d135.4800366!3d34.760161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000e3954201be7b%3A0x867087fb2559599d!2zT3Nha2EsIFN1aXRh!5e0!3m2!1sen!2sjp!4v1700000000000", tags: ["20代30代中心", "初心者歓迎"], price: "15,000円", intro: "ITやSNSに関心のある若手講師が運営する、非常にモダンな教室です。" },
  { id: 2, name: "H 教室 (兵庫・伊丹)", location: "兵庫県 伊丹市", mapQuery: "兵庫県伊丹市", mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52431.109848529!2d135.378902!3d34.783102!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000f074d284fb15%3A0x9d4a46efb7ef5d89!2sItami%2C%20Hyogo!5e0!3m2!1sen!2sjp!4v1700000000000", tags: ["女性専用", "手ぶら特化"], price: "12,000円", intro: "「日本舞踊を身近に」をモットーに、Tシャツでの稽古も公認されている教室です。" },
  { id: 3, name: "K 教室 (東京・世田谷)", location: "東京都 世田谷区", mapQuery: "東京都世田谷区", mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d103730.93294829!2d139.601502!3d35.646502!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018f3a388e4e94d%3A0x6b453e0205096531!2sSetagaya%20City%2C%20Tokyo!5e0!3m2!1sen!2sjp!4v1700000000000", tags: ["夜間対応", "親切指導"], price: "18,000円", intro: "伝統を大切にしつつ、最新のヒット曲で踊る楽しさを伝える新しいスタイルの教室です。" },
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [schools, setSchools] = useState(INITIAL_SCHOOLS);

  // ローカルストレージからの変更読み込み
  useEffect(() => {
    const saved = localStorage.getItem('maibazu_school_1');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSchools(prev => prev.map(s => s.id === 1 ? {
          ...s,
          name: parsed.name ? `${parsed.name} (大阪・吹田)` : s.name,
          intro: parsed.desc || s.intro,
          price: parsed.price || s.price,
          tags: parsed.tags && parsed.tags.length > 0 ? parsed.tags : s.tags
        } : s));
      } catch (e) {}
    }
  }, []);

  const filteredSchools = schools.filter(school => 
    school.name.includes(searchQuery) || school.location.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-20 text-black font-sans">
      <header className="bg-white border-b sticky top-0 z-20 p-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <Link href="/" className="font-bold text-[#E63946] flex items-center gap-2">
             <img src="/logo.png" alt="logo" className="w-8 h-8 object-contain" />
             <span className="text-xl font-black text-[#1D3557]">舞バズ</span>
          </Link>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input 
              placeholder="エリアで検索..." 
              className="pl-10 h-11 bg-slate-50 border-none text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <Button size="sm" variant={viewMode === "list" ? "default" : "ghost"} onClick={() => setViewMode("list")} className={`rounded-lg text-xs font-bold gap-1 ${viewMode === "list" ? "bg-[#1D3557] text-white" : "text-slate-500"}`}>
              <List size={14} /> リスト
            </Button>
            <Button size="sm" variant={viewMode === "map" ? "default" : "ghost"} onClick={() => setViewMode("map")} className={`rounded-lg text-xs font-bold gap-1 ${viewMode === "map" ? "bg-[#E63946] text-white" : "text-slate-500"}`}>
              <Map size={14} /> 地図
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 mt-8">
        <h1 className="text-xl font-bold mb-6 flex items-center justify-between">
          <span>舞バズ認定：体験対応教室</span>
          <span className="text-xs text-slate-400 font-normal">該当 {filteredSchools.length} 件</span>
        </h1>

        {viewMode === "map" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSchools.map(school => (
              <Card key={school.id} className="border-none shadow-md rounded-3xl overflow-hidden bg-white p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg text-[#1D3557]">{school.name}</h3>
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(school.mapQuery)}`} target="_blank" rel="noopener noreferrer" className="text-xs text-[#E63946] font-bold flex items-center gap-1 hover:underline">
                    Googleマップ <ExternalLink size={12} />
                  </a>
                </div>
                <div className="w-full h-48 rounded-2xl overflow-hidden border bg-slate-100">
                  <iframe title={school.name} src={school.mapEmbed} width="100%" height="100%" style={{ border: 0 }} allowFullScreen={false} loading="lazy" />
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs font-bold text-slate-400">{school.location}</span>
                  <Link href={`/search/${school.id}`}>
                    <Button size="sm" className="bg-[#E63946] text-white rounded-xl text-xs font-bold">詳細・予約へ</Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredSchools.map(school => (
              <Card key={school.id} className="hover:shadow-md transition-all border-none bg-white shadow-sm overflow-hidden group">
                <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 text-slate-400 text-xs mb-1 font-bold">
                      <span className="flex items-center gap-1 text-[#E63946]"><MapPin size={14} /> {school.location}</span>
                    </div>
                    <CardTitle className="text-xl mb-2 group-hover:text-[#E63946] transition-colors">{school.name}</CardTitle>
                    <p className="text-slate-500 text-sm mb-4 leading-relaxed">{school.intro}</p>
                    <div className="flex flex-wrap gap-2">
                      {school.tags.map(tag => (
                        <span key={tag} className="text-[10px] bg-slate-50 text-slate-500 px-3 py-1 rounded-full font-bold border border-slate-100">#{tag}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-right w-full md:w-auto md:min-w-[180px] border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-8">
                    <div className="text-xs text-slate-400 mb-1 font-bold opacity-60">1日体験・予習動画付</div>
                    <div className="text-3xl font-black text-[#1D3557] mb-4 tracking-tighter">{school.price}</div>
                    <Link href={`/search/${school.id}`}>
                      <Button className="bg-[#1D3557] w-full md:w-32 hover:bg-[#E63946] transition-all rounded-full flex items-center justify-center gap-2 text-white font-bold">
                        詳細を見る <ChevronRight size={16} />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}