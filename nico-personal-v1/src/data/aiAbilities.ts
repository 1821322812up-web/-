export interface AIReaction { face: string; gesture: string }
export interface AIAbility { id: string; title: string; description: string; reaction: AIReaction | null }
// User-confirmed order: face 1 + gesture 1, through face 4 + gesture 4.
export const aiAbilities: AIAbility[] = [
  { id:'01', title:'AI 达人筛选', description:'用规则化指标 + AI 批量初筛达人表现、垂直度与内容匹配度，把分散的候选池快速转化为可提报名单。', reaction:{face:'/assets/nico/ai-face-01.png',gesture:'/assets/nico/ai-gesture-01.png'} },
  { id:'02', title:'AI 内容共创', description:'结合达人内容特征与产品卖点，用 AI 辅助拆解 Hook、场景、节奏与 CTA，让脚本审核从“改文案”变成“优化内容结构”。', reaction:{face:'/assets/nico/ai-face-02.png',gesture:'/assets/nico/ai-gesture-02.png'} },
  { id:'03', title:'AI 数据复盘', description:'用 AI 辅助清洗、归类多平台内容数据，识别高表现内容的共性，把播放与互动结果转化为下一轮可执行的内容判断。', reaction:{face:'/assets/nico/ai-face-03.png',gesture:'/assets/nico/ai-gesture-03.png'} },
  { id:'04', title:'AI 工作流提效', description:'用 Codex、Agent 与表格工具串联抓取、解析、评估和归档，把高频重复操作沉淀成可复用的工作流。', reaction:{face:'/assets/nico/ai-face-04.png',gesture:'/assets/nico/ai-gesture-04.png'} },
]
