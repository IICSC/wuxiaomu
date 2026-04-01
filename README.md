# 雾削木 | 嵌入式开发者个人主页

<p align="center">
  <img src="https://i1.hdslb.com/bfs/face/cb0e2d1024deee2b0e360cf0acbb15b07436ee4d.jpg@150w_150h.jpg" width="120" height="120" style="border-radius: 50%;">
</p>

<p align="center">
  <strong>苦海无涯 · 学无止境</strong>
</p>

<p align="center">
  <a href="https://space.bilibili.com/323611141/">
    <img src="https://img.shields.io/badge/Bilibili-雾削木-00a1d6?style=for-the-badge&logo=bilibili&logoColor=white" alt="B站">
  </a>
  <a href="https://blog.csdn.net/WuXiaoMuDeBug">
    <img src="https://img.shields.io/badge/CSDN-雾削木-fc5531?style=for-the-badge&logo=codio&logoColor=white" alt="CSDN">
  </a>
  <a href="https://www.cnblogs.com/foge/">
    <img src="https://img.shields.io/badge/博客园-foge-36a356?style=for-the-badge&logo=blog&logoColor=white" alt="博客园">
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/粉丝-7500%2B-00a1d6?style=flat-square" alt="粉丝">
  <img src="https://img.shields.io/badge/视频-30%2B-00a1d6?style=flat-square" alt="视频">
  <img src="https://img.shields.io/badge/文章-100%2B-00a1d6?style=flat-square" alt="文章">
  <img src="https://img.shields.io/badge/许可证-MIT-green?style=flat-square" alt="License">
</p>

---

## 📖 项目简介

这是 B站嵌入式开发UP主 **雾削木** 的个人主页与全栈知识库网站。采用纯静态 HTML/CSS/JS 构建，零依赖、零构建，开箱即用。

网站包含个人介绍、技术展示、热门视频、技术博客、学习笔记（STM32/Linux/FPGA/ESP32）以及开发者工具箱等模块。

## ✨ 功能特性

### 🎨 视觉特效

| 特效 | 说明 |
|------|------|
| **科技连线背景** | Canvas 绘制节点网络，含六边形装饰、数据流光点、鼠标交互排斥、折线电路风格连线 |
| **3D 卡片倾斜** | 鼠标跟随 perspective 旋转 + 径向光效跟随光标位置 |
| **鼠标跟随光晕** | 400px 径向渐变光斑全局跟随 |
| **打字机效果** | 首页 tagline 逐字打出 + 闪烁光标 |
| **数字滚动动画** | 统计数据从 0 平滑滚动到目标值 |
| **滚动入场动画** | 8 档交错延迟的 reveal 动画（IntersectionObserver） |
| **页面加载过渡** | 双环旋转 loader + 文字呼吸动画 |
| **导航栏滚动** | 滚动加深背景 + 当前 section 自动高亮 |
| **霓虹脉冲边框** | 卡片 hover 时多层 box-shadow 发光 + 流光渐变边框 |

### 📚 知识库内容

| 模块 | 内容 |
|------|------|
| **STM32 HAL 库** | GPIO/按键/中断/定时器/UART/PWM/ADC/I2C/SPI/DMA/输入捕获/编码器/RTC/看门狗/CAN（15 篇） |
| **STM32 标准库** | GPIO 配置、引脚重映射 |
| **STM32 IAP** | Flash 分区、跳转代码、向量表偏移 |
| **Linux 驱动** | 设备树 LED/蜂鸣器/按键中断/并发竞争/I2C/SPI/Platform/Pinctrl（8 篇） |
| **IMX6ULL 裸机** | U-Boot 指令、GPIO 寄存器、IOMUX 配置 |
| **FPGA 基础** | Verilog 语法、按键消抖、FSM 状态机、PWM 呼吸灯 |
| **模块学习** | MPU6050 DMP 移植、OLED 菜单 UI、NRF24L01 无线通信 |
| **编程杂记** | Union 解析、环形缓冲区、位域操作 |
| **开发者工具箱** | STM32 Pinout/CubeMX/Compiler Explorer/ESP32/ARM/Linux 文档/Regex101/JSON/Crontab 等 12 个工具 |

### 🏗️ 技术亮点

- **零外部依赖** — Font Awesome 6.4.0 完全本地化（CSS + woff2），无 CDN 延迟
- **字体优化** — Google Fonts `font-display: swap`，文字先显示后加载
- **纯静态部署** — 无需 Node.js/Python，任何静态托管服务均可运行
- **响应式设计** — 完美适配桌面端、平板、手机
- **SEO 优化** — 完整的 meta 标签 + Open Graph

## 🛠️ 技术栈

```
前端    HTML5 + CSS3 + Vanilla JavaScript (ES6+)
图标    Font Awesome 6.4.0 (本地)
字体    Noto Sans SC + JetBrains Mono (Google Fonts)
架构    纯静态，零构建工具
部署    GitHub Pages / 任何静态托管
```

## 📂 项目结构

```
wuxiaomu/
├── index.html                    # 主页面（关于/技能/视频/博客/知识库/联系）
├── css/
│   ├── style.css                 # 全局样式（~1700 行，含所有动效）
│   └── fontawesome.min.css       # Font Awesome 本地 CSS
├── js/
│   └── main.js                   # 交互逻辑（科技连线/3D倾斜/打字机等）
├── fonts/
│   └── fontawesome/
│       └── webfonts/
│           ├── fa-solid-900.woff2
│           ├── fa-brands-400.woff2
│           └── fa-regular-400.woff2
├── notes/
│   ├── learning_notes.html       # 全栈学习笔记（含侧边栏/搜索/代码复制）
│   ├── esp32_notes.html          # ESP32 专项笔记
│   └── projects.html             # 开源项目展示
├── images/                       # 图片资源
├── README.md                     # 项目说明
└── LICENSE                       # MIT 许可证
```

## 🚀 快速开始

### 方式一：直接打开

双击 `index.html` 即可在浏览器中查看。

### 方式二：Python 本地服务器

```bash
cd wuxiaomu
python -m http.server 8080
# 访问 http://localhost:8080
```

### 方式三：VS Code Live Server

1. 安装 [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) 扩展
2. 右键 `index.html` → Open with Live Server

### 方式四：GitHub Pages 部署

1. Fork 本仓库
2. Settings → Pages → Source 选择 `main` 分支
3. 访问 `https://你的用户名.github.io/wuxiaomu/`

## 🎯 自定义指南

### 修改个人信息

编辑 `index.html` 中的对应区域：
- 头像 URL → `.avatar` 的 `background` 属性
- 名字/签名 → `<h1>` 和 `.hero-tagline`
- 统计数据 → `.stat-number` 和 `.stat-label`
- 社交链接 → `.social-btn` 的 `href`

### 添加新笔记

在 `notes/learning_notes.html` 中：
1. 侧边栏 `<ul class="sidebar-menu">` 添加菜单项
2. 主内容区 `<main>` 添加对应 `<section>` 和 `.note-article`
3. 添加 `article-meta` 设置难度和阅读时间标签

### 修改主题色

编辑 `css/style.css` 顶部的 CSS 变量：

```css
:root {
    --main-blue: #4499d5;        /* 主色调 */
    --main-blue-light: #6eb5e6;  /* 亮色变体 */
    --accent-pink: #f25d8e;      /* 强调色 */
}
```

### 修改科技连线背景参数

编辑 `js/main.js` 中 `TechNetworkBg` 类的参数：
- `nodeCount` — 节点数量
- `connectionDist` — 连线距离阈值
- `dataPackets.length` — 数据流光点数量
- `hexCount` — 六边形装饰数量

## 📊 性能指标

| 指标 | 数值 |
|------|------|
| 首屏加载（无缓存） | < 1s（本地 Font Awesome） |
| 总文件大小 | ~350KB（含字体） |
| 页面数 | 4 个 HTML |
| 外部请求 | 仅 Google Fonts |
| Lighthouse 性能 | 95+ |

## 🤝 交流社区

| 群 | QQ 群号 | 状态 |
|----|---------|------|
| ①群 | 994035508 | 已满 |
| ②群 | 806278403 | 已满 |
| ③群 | 611908808 | 可加入 |

## 📝 更新日志

### v2.0 (2026-04)
- 全新科技连线粒子背景（六边形 + 数据流 + 鼠标交互）
- 3D 卡片倾斜跟随鼠标 + 径向光效
- Font Awesome 完全本地化，零 CDN 依赖
- 打字机效果 + 数字滚动 + 页面加载动画
- 笔记内容大幅扩充（STM32 15 篇 + Linux 8 篇 + FPGA 4 篇）
- 开发者工具箱（12 个在线工具/文档链接）
- 所有文章增加难度系数和预计阅读时间标签
- 全面优化响应式设计和视觉细节

### v1.0 (2024-03)
- 初始版本发布
- 基础个人主页 + 学习笔记

## 📄 许可证

[MIT License](LICENSE)

---

<p align="center">
  Made with <span style="color: #f25d8e;">♥</span> by 雾削木
</p>

<p align="center">
  <a href="https://github.com/snqx-lqh/wiki">
    <img src="https://img.shields.io/github/stars/snqx-lqh/wiki?style=social" alt="GitHub stars">
  </a>
</p>
