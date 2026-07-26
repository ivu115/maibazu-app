"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search, ChevronRight } from "lucide-react";

const ALL_SCHOOLS = [
  { id: 1, name: "S 教室 (大阪・吹田)", location: "大阪府 吹田市", tags: ["20代30代中心", "初心者歓迎"], price: "15,000円", intro: "ITやSNSに関心のある若手講師が運営する、非常にモダンな教室です。" },
  { id: 2, name: "H 教室 (兵庫・伊丹)", location: "兵庫県 伊丹市", tags: ["女性専用", "手ぶら特化"], price: "12,000円", intro: "「日本舞踊を身近に」をモットーに、Tシャツでの稽古も公認されている教室です。" },
  { id: 3, name: "K 教室 (東京・世田谷)", location: "東京都 世田谷区", tags: ["J-POP対応", "夜間OK"], price: "18,000円", intro: "伝統を大切にしつつ、最新のヒット曲で踊る楽しさを伝える新しいスタイルの教室です。" },
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredSchools = ALL_SCHOOLS.filter(school => 
    school.name.includes(searchQuery) || school.location.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-20 text-black">
      <header className="bg-white border-b sticky top-0 z-10 p-4">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <Link href="/" className="font-bold text-[#E63946] flex items-center gap-2">
             <img src="/logo.png" alt="logo" className="w-8 h-8 object-contain" />
             舞バズ
          </Link>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input 
              placeholder="エリアで検索..." 
              className="pl-10 h-12 bg-slate-50 border-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 mt-8">
        <h1 className="text-xl font-bold mb-6">舞バズ認定教室一覧</h1>
        <div className="grid gap-6">
          {filteredSchools.map(school => (
            <Card key={school.id} className="hover:shadow-md transition-all border-none bg-white shadow-sm overflow-hidden group">
              <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-black">
                <div className="flex-1 text-black">
                  <div className="flex items-center gap-2 text-slate-400 text-[10px] mb-1 font-bold uppercase">
                    <MapPin size={14} className="text-[#E63946]" /> {school.location}
                  </div>
                  <CardTitle className="text-xl mb-2 group-hover:text-[#E63946] transition-colors">{school.name}</CardTitle>
                  <p className="text-slate-500 text-sm mb-4 leading-relaxed">{school.intro}</p>
                </div>
                <div className="text-right w-full md:w-auto md:min-w-[180px] border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-8">
                  <div className="text-3xl font-black text-[#1D3557] mb-4">{school.price}</div>
                  {/* 👈 詳細ページへのリンク */}
                  <Link href={`/search/${school.id}`}>
                    <Button className="bg-[#1D3557] w-full md:w-32 hover:bg-[#E63946] transition-all rounded-full">
                      詳細を見る <ChevronRight size={16} />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}