export interface Qlist {
  id: number;
  name: string;
  path: string;
  type?: string;
}

export interface Qtag {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: string
} 

export const INFORMATION_LIST: Qlist[] = [
        //  {
        //    id: 0,
        //    name: "today",
        //    path: "/article?articleId=18u4gt2bddvk00",
        //  },
        { id: 1, name: "notice", path: "/excellent" },
        { id: 2, name: "group", path: "/share" },
      ];

export const NAV_LIST: Qlist[]  = [
  { id: 0, name: "首页", path: "/" },
  { id: 2, name: "分享", path: "/share" },
  // { id: 3, name: "组件库", path: "https://wsmdyj.github.io/vcreact/", type: 'link' },
]

export const TAG_LIST: Qtag[] = [
  { value: "全部", label: "0" },
  { value: "JavaScript", label: "3" },
  { value: "Vue", label: "1" },
  { value: "React", label: "2" },
  { value: "CSS", label: "4" },
  { value: "Webpack", label: "7" },
  { value: "Node", label: "5" },
  { value: "Flutter", label: "6" },
  { value: "TypeScript", label: "8" },
  { value: "Http", label: "9" },
  { value: "Docker", label: "10" },
  { value: "性能优化", label: "11" },
  { value: "微信小程序", label: "12" },
  { value: "面试", label: "13" },
];

export const TAG_QUESTION: Qtag[] = [
  { value: "全部", label: "0" },
  { value: "已回答", label: "1" },
  { value: "已解决", label: "2" },
];

export const TAG_SHARE: Qtag[] = [
  { value: "视频推荐", label: "0" },
  { value: "必读书单", label: "1" },
  { value: "前端圈子", label: "2" },
];