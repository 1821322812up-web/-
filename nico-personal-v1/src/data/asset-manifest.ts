export interface AssetManifestEntry {
  original: string
  projectFile: string | null
  purpose: string
  status: 'used' | 'available' | 'excluded-v1' | 'temporary-mapping'
}

export const assetManifest = [
  { original:'Nico ai页素材/165213d0-cf3b-45a8-835f-ae1d2cb2d6b7.png', projectFile:'ai-face-01.png', purpose:'AI 达人筛选 / half-face 1, user-confirmed', status:'used' },
  { original:'Nico ai页素材/ChatGPT Image 2026年9月12日 23_20_55 (1).png', projectFile:'ai-face-02.png', purpose:'AI 内容共创 / half-face 2, user-confirmed', status:'used' },
  { original:'Nico ai页素材/ChatGPT Image 2026年9月12日 23_20_57 (2).png', projectFile:'ai-face-03.png', purpose:'AI 数据复盘 / half-face 3, user-confirmed', status:'used' },
  { original:'Nico ai页素材/ChatGPT Image 2026年9月12日 23_20_59 (3).png', projectFile:'ai-face-04.png', purpose:'AI 工作流提效 / half-face 4, user-confirmed', status:'used' },
  { original:'Nico ai页素材/ChatGPT Image 2026年9月12日 23_21_04 (5).png', projectFile:'ai-gesture-01.png', purpose:'AI 达人筛选 / gesture 1, user-confirmed', status:'used' },
  { original:'Nico ai页素材/ChatGPT Image 2026年9月12日 23_21_05 (6).png', projectFile:'ai-gesture-02.png', purpose:'AI 内容共创 / gesture 2, user-confirmed', status:'used' },
  { original:'Nico ai页素材/ChatGPT Image 2026年9月12日 23_21_07 (7).png', projectFile:'ai-gesture-03.png', purpose:'AI 数据复盘 / gesture 3, user-confirmed', status:'used' },
  { original:'Nico ai页素材/ChatGPT Image 2026年9月12日 23_21_08 (8).png', projectFile:'ai-gesture-04.png', purpose:'AI 工作流提效 / gesture 4, user-confirmed', status:'used' },
  { original: 'Hero的Nico素材/Nico-母版.png', projectFile: 'nico-base.png', purpose: 'Hero initial face and normal center gaze', status: 'used' },
  { original: 'Hero的Nico素材/Nico-头顶撕裂.png', projectFile: 'nico-head-open.png', purpose: 'Hero open-head torn rim', status: 'used' },
  { original: 'Hero的Nico素材/Nico-惊慌.png', projectFile: 'nico-panic.png', purpose: 'Hero pre-fold panic state', status: 'used' },
  { original: 'Hero的Nico素材/Nico-向上.png', projectFile: 'nico-look-up.png', purpose: 'Hero gaze up', status: 'used' },
  { original: 'Hero的Nico素材/Nico-向下.png', projectFile: 'nico-look-down.png', purpose: 'Hero gaze down', status: 'used' },
  { original: 'Hero的Nico素材/Nico-向左.png', projectFile: 'nico-look-left.png', purpose: 'Hero gaze left', status: 'used' },
  { original: 'Hero的Nico素材/Nico-向右.png', projectFile: 'nico-look-right.png', purpose: 'Hero gaze right', status: 'used' },
  { original: 'Hero的Nico素材/Nico-左上.png', projectFile: 'nico-look-up-left.png', purpose: 'Hero gaze up-left', status: 'used' },
  { original: 'Hero的Nico素材/Nico-右上.png', projectFile: 'nico-look-up-right.png', purpose: 'Hero gaze up-right', status: 'used' },
  { original: 'Hero的Nico素材/Nico坐下.png', projectFile: 'nico-look-down-left.png', purpose: 'Hero gaze down-left — confirmed by user for V2', status: 'used' },
  { original: 'Hero的Nico素材/Nico-右下.png', projectFile: 'nico-look-down-right.png', purpose: 'Hero gaze down-right', status: 'used' },
  { original: 'Hero的Nico素材/Nico-中斗鸡眼.png', projectFile: 'nico-cross-eye.png', purpose: 'Hero small between-eyes ROI; nose remains normal', status: 'used' },
  { original: 'kol.png', projectFile: 'kol.png', purpose: 'Hero brain object', status: 'used' },
  { original: 'de和en.png', projectFile: 'de-en.png', purpose: 'Hero brain object', status: 'used' },
  { original: 'ai.png', projectFile: 'ai.png', purpose: 'Hero brain object', status: 'used' },
  { original: 'Nico-挑眉（About页面用）.png', projectFile: 'nico-about.png', purpose: 'V2 static Experience portrait only', status: 'used' },
  { original: '生活照1.jpg', projectFile: 'life-01.jpg', purpose: 'About photo card', status: 'used' },
  { original: '生活照2.jpg', projectFile: 'life-02.jpg', purpose: 'Life collage small photo', status: 'used' },
  { original: '生活照3.jpg', projectFile: 'life-03.jpg', purpose: 'Life collage small photo', status: 'used' },
  { original: '生护照4.jpg', projectFile: 'life-04.jpg', purpose: 'About photo card / assumed life photo 4', status: 'temporary-mapping' },
  { original: '爱心.png', projectFile: 'heart.png', purpose: 'V3 Hero secondary collage object', status: 'used' },
  { original: '大脑.png', projectFile: 'brain.png', purpose: 'V3 Hero secondary collage object', status: 'used' },
  { original: '云朵.png', projectFile: 'cloud.png', purpose: 'V3 Hero secondary collage object', status: 'used' },
  { original: 'jackery.png', projectFile: 'jackery.png', purpose: 'Experience floating company', status: 'used' },
  { original: 'netease.png', projectFile: 'netease.png', purpose: 'Experience floating company', status: 'used' },
  { original: '大连.png', projectFile: 'dalian.png', purpose: 'V6 central hometown object in Personal Collage', status: 'used' },
  { original: '篮球.png', projectFile: 'basketball.png', purpose: 'Personal basketball; original retained, SVG alpha inset removes white outline at render time', status: 'used' },
  { original: '游戏.png', projectFile: 'gaming.png', purpose: 'V6 secondary personal game controller', status: 'used' },
  { original: '哑铃.png', projectFile: 'dumbbell.png', purpose: 'Personal fitness; original retained, SVG alpha inset removes white outline at render time', status: 'used' },
  { original: 'Nico-下脸撕裂.png', projectFile: null, purpose: 'Explicitly excluded from V1', status: 'excluded-v1' },
] as const satisfies readonly AssetManifestEntry[]
