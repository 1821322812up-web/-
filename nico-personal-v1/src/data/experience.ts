export interface SelectedWork {
  thumbnail?: string
  title: string
  creator?: string
  category: 'KOL' | 'KOC'
  scene: string
  tag: string
  cost?: string
  stats?: string[]
  platform: string
  result: string
  link: string
}

export interface ExperienceEntry {
  company: string
  role?: string
  market?: string
  description?: string
  metrics?: string[]
  displayName?: string
  date?: string
  highlights?: { title: string; text: string; markers?: string[] }[]
  selectedWork?: SelectedWork[]
}

// Condensed from the user's 曹博洋-达人营销.pdf, supplied 2026-09-11.
// V6 user update supersedes the PDF's earlier Jackery KOL figures: 40+ / 300万+.
// Other dates and metrics retain the PDF source; display/copy follow the V6 brief.
// No contact details or the source PDF are included in public assets.
export const experienceEntries: ExperienceEntry[] = [
  { company: 'Jackery', displayName: 'JACKERY', role: '美洲区达人营销实习生', date: '2026.05 — 至今', selectedWork: [
    {category:'KOL',title:'Family / Garden｜Old Product Campaign',scene:'Family / Garden · 老品推广',tag:'内容优化',platform:'YouTube',cost:'$2,000',stats:['92K Views','$10K+ GMV','$0.02 CPV'],result:'以较低合作成本撬动稳定播放与转化表现，实现 92K Views、$10K+ GMV 与 $0.02 CPV。',link:'https://www.youtube.com/watch?v=hCRtApq4tiM'},
    {category:'KOL',title:'Spanish Family｜Fridge Guard Launch',scene:'西语 Family · Fridge Guard 新品',tag:'新品推广',platform:'Instagram',cost:'$2,000',stats:['800K+ Views','≤$0.0025 CPV','$2K Cost'],result:'在西语 Family 垂类中推动 Fridge Guard 新品内容，单条短视频实现 800K+ 播放，并将 CPV 控制在极低水平。',link:'https://www.instagram.com/reel/DZsm24bPHs3/'},
    {category:'KOL',title:'DIY / Off-Grid｜Deep-Dive Collaboration',scene:'DIY / Off-Grid · 深度合作',tag:'场景共创',platform:'YouTube',cost:'$15,000',stats:['210K+ Views','$0.07 CPV','$15K Cost'],result:'面向高匹配的 DIY / Off-Grid 垂类开展深度合作，在更高投入下完成稳定的观看表现与场景化产品表达。',link:'https://www.youtube.com/watch?v=On_YWyCFJ-Q&t=1482s'},
    {category:'KOC',title:'GPU Mining × Jackery｜Creative Use-Case',scene:'显卡挖矿 / 硬件场景',tag:'创意联动',platform:'YouTube',result:'把 Jackery 带进显卡挖矿场景，拓展移动电源在非传统内容中的展示方式，强化创意联动与产品记忆点。',link:'https://www.youtube.com/watch?v=gpU35Jd57x0'},
    {category:'KOC',title:'Off-Grid Cabin Life｜Real-Life Review',scene:'Off-grid cabin / 离网小屋生活',tag:'真实体验',platform:'YouTube',result:'通过离网小屋的真实生活场景，将 Jackery 产品测评融入日常用电需求，让产品表现从参数走向真实体验。',link:'https://www.youtube.com/watch?v=LhKVqwLE-v8'},
  ], highlights: [
    { title: 'KOL 项目运营', text: '累计参与 40+位KOL 合作，覆盖达人筛选、商务沟通、方案制定、合同、寄样、内容审核与上线复盘等完整流程，累计播放 300万+。', markers: ['40+位KOL', '300万+'] },
    { title: 'KOC 项目优化', text: '独立负责 50 位美洲区 KOC，推动 100+条 内容上线；通过优化创作者筛选、合作机制、内容场景和投流策略，将 CPV 从 $0.13 降至 $0.078，CPV↓40%。', markers: ['100+条', 'CPV↓40%'] },
    { title: '创意共创与数据复盘', text: '将合作拓展至花园、救援、游戏、宠物等场景，围绕 Hook、节奏与 CTA 优化脚本及初稿；持续追踪美洲 YouTube、Instagram、TikTok 的竞品内容与趋势，通过播放、互动及创作者类型复盘，优化筛选与内容策略。' },
  ] },
  { company: 'NetEase', displayName: 'NETEASE YOUDAO / 网易有道', role: '海外红人营销实习生（德国 / 美国）', date: '2026.02 — 2026.05', highlights: [
    { title: '创作者拓展', text: '筛选分析 100+德语区账号，从受众、内容风格、平台表现及商业经历匹配合作，推动 10位签约，区域创作者资源 +29%。', markers: ['100+德语区账号', '10位签约', '+29%'] },
    { title: '本地化项目运营', text: '参与 DJI OSMO Nano、Hako AI、燕云十六声等项目，结合德国市场趋势、受众、预算与平台特性完成 30+ 位创作者推荐，以德语及英语推进报价、内容与排期沟通。' },
    { title: '项目协同与复盘', text: '同期最多跟进 7个项目，协调品牌、海外创作者与内部团队推进上线；跟踪播放、互动和反馈，复盘传播效果，优化筛选与内容方向。', markers: ['7个项目'] },
  ] },
]
