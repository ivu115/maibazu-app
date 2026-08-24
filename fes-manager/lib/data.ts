// lib/data.ts
export interface Booth {
    id: string;
    name: string;
    icon: string;
    location: string;
    powerWatt: number;
    qualityPoints: string[];
    cookingSteps: string[];
    hygieneRules: string[];
    schedule: { id: string; time: string; task: string; done: boolean }[];
    checklists: { id: string; text: string; done: boolean; type: 'pre' | 'hourly' }[];
  }
  
  export const initialBooths: Record<string, Booth> = {
    frankfurt: {
      id: 'frankfurt',
      name: 'フランクフルト',
      icon: '🌭',
      location: '中庭（食堂側）',
      powerWatt: 1200,
      qualityPoints: [
        '表面はパリッと香ばしく、中心温度75℃以上で1分以上加熱を徹底',
        'ケチャップ・マスタードは均一に（ハーフ希望か必ずヒアリング）',
        '焼き置きは最大10分まで。冷めたものは提供しない'
      ],
      cookingSteps: [
        '鉄板を温め、薄く油を引く',
        '切れ目を下にして並べ、転がしながら全面に焼き色をつける',
        'トングで掴んで弾力と熱さを確認し、専用トレーに乗せる'
      ],
      hygieneRules: [
        '会計担当（現金を触る）と調理担当は完全分離',
        '調理担当はエンボス手袋を着用し、1時間ごとに交換',
        '使用トングは1時間ごとにアルコール消毒'
      ],
      schedule: [
        { id: 'f1', time: '08:30', task: '小テント1張・机2台の受取と配置', done: false },
        { id: 'f2', time: '09:00', task: '鉄板・食材（冷凍保管場所から）搬入', done: false },
        { id: 'f3', time: '09:30', task: '鉄板の予熱・試焼き・温度確認', done: false },
        { id: 'f4', time: '10:00', task: '販売開始（16:00まで）', done: false },
        { id: 'f5', time: '16:00', task: '販売終了・鉄板清掃・油処理', done: false }
      ],
      checklists: [
        { id: 'fc1', text: '消火器・アルコールスプレーの常置確認', done: false, type: 'pre' },
        { id: 'fc2', text: '食材の消費期限・保管温度の確認', done: false, type: 'pre' },
        { id: 'fc3', text: '手袋交換・トング消毒の実施', done: false, type: 'hourly' },
        { id: 'fc4', text: 'ゴミ箱（串専用BOX）の溢れ確認', done: false, type: 'hourly' }
      ]
    },
    churros: {
      id: 'churros',
      name: 'チュロス',
      icon: '🥖',
      location: '中庭（食堂側）',
      powerWatt: 1300,
      qualityPoints: [
        '外側サクサク、中はモチモチの食感をキープ',
        'シナモンシュガーは袋の中で均等にまぶす',
        '保温ケースの温度を一定に保つ'
      ],
      cookingSteps: [
        'オーブン/フライヤーを指定温度に余熱',
        '規定時間しっかり加熱し、余分な油を切る',
        '耐熱袋に入れてシュガーをまぶし、素早く提供'
      ],
      hygieneRules: [
        '粉類の飛散防止・密閉保管',
        '手袋着用の徹底と調理エリアの定期拭き掃除'
      ],
      schedule: [
        { id: 'c1', time: '08:30', task: 'テント・机設置', done: false },
        { id: 'c2', time: '09:00', task: 'チュロス生地・シュガー搬入', done: false },
        { id: 'c3', time: '09:40', task: '試作・焼き時間チェック', done: false },
        { id: 'c4', time: '10:00', task: '販売開始', done: false }
      ],
      checklists: [
        { id: 'cc1', text: '保温器の動作と温度確認', done: false, type: 'pre' },
        { id: 'cc2', text: 'トング・周辺清掃', done: false, type: 'hourly' }
      ]
    },
    coffee: {
      id: 'coffee',
      name: 'コーヒー',
      icon: '☕',
      location: '中庭（食堂側）',
      powerWatt: 1000,
      qualityPoints: [
        'アイス：カップに氷を8分目まで入れ、急冷して香りを閉じ込める',
        'ホット：適温（約80℃）で提供。火傷防止のためフタを確実に閉める',
        'シロップ・ミルクの有無を丁寧に確認'
      ],
      cookingSteps: [
        'サーバー/ポットのお湯を沸かす',
        '抽出手順に従いドリップ（または抽出）',
        'アイスの場合は氷入りカップに注ぎマドラーで1回ステア'
      ],
      hygieneRules: [
        '氷は必ず専用アイススコップを使用（手掴み厳禁）',
        '給湯口周辺のこまめなアルコール消毒'
      ],
      schedule: [
        { id: 'k1', time: '08:30', task: '机・電源コード配線', done: false },
        { id: 'k2', time: '09:00', task: '氷（第1弾）受取・豆/粉搬入', done: false },
        { id: 'k3', time: '10:00', task: '販売開始', done: false },
        { id: 'k4', time: '13:00', task: '氷の追加補充確認', done: false }
      ],
      checklists: [
        { id: 'kc1', text: '電源コードが足に引っかからないか養生確認', done: false, type: 'pre' },
        { id: 'kc2', text: '氷の残量確認（残り1袋で総務部へ要請）', done: false, type: 'hourly' }
      ]
    },
    ramune: {
      id: 'ramune',
      name: 'ラムネ',
      icon: '🥤',
      location: '中庭（食堂側）',
      powerWatt: 0,
      qualityPoints: [
        '氷水にしっかり浸して「キンキン」に冷やす（水温5℃以下目安）',
        '玉押し具（オープナー）の使い方を笑顔で説明する',
        '吹きこぼれた時用のダスターを常に手元に置く'
      ],
      cookingSteps: [
        'クーラーボックス/タライに氷と水を張り、瓶を浸す',
        '注文を受けたらタオルで水気を拭いて渡す',
        '開けられないお客様（特にお子様）は開栓をサポート'
      ],
      hygieneRules: [
        'ドブづけ用の水は清潔な水道水を使用',
        '瓶口を素手で触らないよう注意'
      ],
      schedule: [
        { id: 'r1', time: '08:45', task: 'タライ・クーラーボックス設置', done: false },
        { id: 'r2', time: '09:15', task: 'ラムネ瓶・氷の搬入・ドブづけ開始', done: false },
        { id: 'r3', time: '10:00', task: '販売開始', done: false }
      ],
      checklists: [
        { id: 'rc1', text: '瓶の割れ・ヒビがないか目視点検', done: false, type: 'pre' },
        { id: 'rc2', text: '回収BOX（瓶専用・王冠/プラ分別）の設置確認', done: false, type: 'pre' },
        { id: 'rc3', text: 'タライの氷追加と水温チェック', done: false, type: 'hourly' }
      ]
    }
  };