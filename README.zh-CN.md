<div align="center">

# 🎮 微软大战代码: 游戏版

### *在你最爱的代码编辑器中开启街机射击之旅*

<img src="./vscode.png" alt="VS Code" />

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**[▶️ 立即游玩](https://ai.studio/apps/drive/1-yLmG9v681iy1NPWsoG2TamSeBdsFTJ-)** • **[📖 文档](#游戏机制)** • **[🎯 特性](#特性)** • **[💻 开发](#开发)**

---

**[English](./README.md)** | 简体中文

---

*"如果调试是一场真正的战斗会怎样？"*

将你的编程工作流程转变为史诗级街机射击游戏！通过击败 Bug、语法错误和可怕的遗留代码巨石来部署你的项目。每一波都会带来新的挑战，重构你的代码直到 1.0 版本...以及更远！

</div>

---

## 🎯 特性

### 🕹️ **原汁原味的 VS Code 体验**
- **像素级完美 UI**：精心还原的 VS Code 界面，包含活动栏、侧边栏、编辑器标签、终端和状态栏
- **交互式侧边栏**： 
  - 📁 **资源管理器** - 查看项目统计和发布进度
  - 🔍 **搜索** - 浏览敌人数据库及详细信息
  - 🌿 **源代码管理** - 追踪你在各个波次中的提交历史
  - 🐛 **调试** - 监控性能指标和连击数
  - 🧩 **扩展** - 查看已安装的能力增强

### ⚔️ **激烈的游戏玩法**
- **9 种独特敌人类型**：从基础 Bug 🪲 到合并冲突 ⚠️ 再到恐怖的 MONOLITH 终极 Boss
- **渐进式难度**：波次越来越难，敌人更智能，还有史诗般的 Boss 战
- **连击系统**：连续击杀获得巨大的分数倍率
- **能力增强道具**：
  - ☕ **咖啡** - 速度提升
  - 🤖 **GitHub Copilot** - 武器升级
  - 🐳 **Docker** - 临时护盾

### 🎨 **精致的游戏机制**
- **高级武器系统**： 
  - 弹药管理和自动装填
  - TypeScript 编译器升级
  - 终极技能"重构"（按 R/Shift）
- **视觉效果**： 
  - 敌人被摧毁时的粒子爆炸
  - 浮动伤害数字
  - 受击闪烁反馈
  - 连击计量器动画
- **动态音频反馈**：终端日志显示实时游戏事件

---

## 🎮 游戏机制

### 操作方式
```
WASD       → 移动玩家
空格键      → 发射 TypeScript 子弹
SHIFT / R  → 重构大招（充能后）
ESC        → 暂停游戏
```

### 游戏目标
在越来越困难的编码错误波次中生存下来并部署你的项目！每个波次你需要：
1. **击败敌人** 填充发布进度条
2. **进度条满后** 面对 Boss 战
3. **收集道具** 增强你的能力
4. **保持连击** 获得分数倍数

### 敌人名册

| 敌人 | 符号 | 生命值 | 分数 | 行为特点 |
|-------|--------|----|----|----------|
| **Bug** | 🪲 | 10 | 100 | 基础敌人，数量众多 |
| **语法错误** | `};` | 20 | 200 | 笨重但耐打 |
| **面条代码** | `goto` | 15 | 150 | 快速且移动飘忽 |
| **内存泄漏** | `malloc()` | 40 | 300 | 体积会随时间膨胀 |
| **404 错误** | `404` | 15 | 250 | 速度极快 |
| **合并冲突** | `<<<<` | 35 | 350 | 死后会分裂成小敌人 |
| **死循环** | `while(1)` | 25 | 400 | 螺旋攻击模式 |
| **竞态条件** | `async` | 20 | 500 | 随机瞬移 |
| **MONOLITH** 👹 | `LegacyWrapper` | 600 | 5000 | Boss：发射弹幕，阻止部署 |

### 进度系统
- **武器等级**：收集 Copilot 道具升级 TypeScript 编译器
- **弹药系统**：最大 40 发子弹，缓慢自动恢复，装填时间 2.5 秒
- **特殊技能条**：击败敌人充能，释放"重构"清空屏幕
- **波次系统**：每个版本发布难度递增（v1.0, v2.0, v3.0...）

---

## 🚀 快速开始

### 环境要求
- **Node.js**（v16 或更高版本）
- **npm** 或 **yarn**

### 安装步骤

```bash
# 克隆仓库
git clone https://github.com/yourusername/microsoft-vs-code-game.git
cd microsoft-vs-code-game

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

游戏将在 `http://localhost:5173` 打开 🎮

### 生产环境构建

```bash
# 构建优化版本
npm run build

# 预览生产构建
npm run preview

# 部署到 GitHub Pages
npm run deploy
```

---

## 💻 开发

### 项目结构

```
microsoft-vs-code-game/
├── components/
│   └── GameEngine.tsx      # 核心游戏逻辑、物理引擎、渲染
├── App.tsx                 # VS Code UI 外壳、侧边栏、覆盖层
├── types.ts                # 游戏实体的 TypeScript 接口
├── constants.ts            # 游戏配置、敌人数据、颜色
├── index.tsx               # React 入口点
├── index.html              # HTML 模板
└── vscode.png              # VS Code logo 资源
```

### 技术栈

- **React 19.2** - UI 框架
- **TypeScript 5.8** - 类型安全
- **Vite 6.2** - 构建工具和开发服务器
- **HTML5 Canvas** - 游戏渲染
- **CSS3** - VS Code 样式

### 核心组件

#### `GameEngine.tsx`
包含所有游戏逻辑：
- 游戏循环（60 FPS）
- 实体管理（玩家、敌人、弹幕、粒子）
- 碰撞检测
- 敌人 AI 行为
- 道具生成
- Boss 机制
- Canvas 渲染

#### `App.tsx`
处理 VS Code 界面：
- 活动栏导航
- 动态侧边栏视图
- 终端日志显示
- 开始/游戏结束画面
- 统计追踪和显示
- 小地图（计划中功能）

---

## 🎨 自定义

### 修改敌人难度

编辑 `constants.ts`：

```typescript
export const ENEMY_TYPES = [
  { 
    type: 'BUG', 
    text: '🪲', 
    hp: 10,        // 增加数值让 Bug 更耐打
    score: 100,    // 调整分数值
    speed: 1.5,    // 越高越快
    color: '#f14c4c', 
    width: 24, 
    desc: '普通Bug，数量众多' 
  },
  // 添加你自己的敌人！
]
```

### 调整游戏平衡

```typescript
// constants.ts
export const PLAYER_SPEED = 5;           // 移动速度
export const MAX_AMMO = 40;              // 弹药容量
export const AMMO_REGEN = 0.4;           // 每帧恢复量
export const SPECIAL_CHARGE_PER_KILL = 5; // 大招充能速率
```

### 创建新道具

```typescript
export const POWER_UPS = [
  { 
    type: 'CUSTOM_POWERUP', 
    icon: '🔥', 
    color: '#ff6b6b', 
    chance: 0.05 
  }
]
```

然后在 `GameEngine.tsx` 中实现效果：

```typescript
case 'CUSTOM_POWERUP':
  // 你的自定义逻辑
  break;
```

---

## 🐛 已知问题

- [ ] 碰撞箱可能需要微调以实现像素级完美碰撞
- [ ] 某些机器上超过 200 个实体时性能下降
- [ ] 移动端触控控制尚未实现
- [ ] 音效/背景音乐已计划但尚未实现

---

## 🤝 贡献

欢迎贡献！参与方式：

1. **Fork** 这个仓库
2. **创建** 特性分支（`git checkout -b feature/AmazingFeature`）
3. **提交** 你的更改（`git commit -m 'Add some AmazingFeature'`）
4. **推送** 到分支（`git push origin feature/AmazingFeature`）
5. **开启** Pull Request

请确保：
- 代码遵循 TypeScript 最佳实践
- 游戏机制平衡且有趣
- UI 更改尊重 VS Code 的设计语言

---

## 📜 许可证

本项目采用 **MIT 许可证** - 详见 [LICENSE](LICENSE) 文件。

---

## 🙏 致谢

- **Microsoft VS Code 团队** - 创造了启发本项目的优秀编辑器
- **TypeScript** - 让 JavaScript 开发变得可以忍受
- **React & Vite** - 提供流畅的开发体验
- **所有我们在现实生活中遇到的 Bug** - 这个游戏献给你们 🪲

---

<div align="center">

### 🎮 准备好调试了吗？

**[现在开始游玩！](https://ai.studio/apps/drive/1-yLmG9v681iy1NPWsoG2TamSeBdsFTJ-)**

由开发者制作，献给开发者 ❤️

*"交付代码，而不是 Bug！"*

---

⭐ **如果你喜欢这个游戏，请给仓库加星！** | 🐛 **在 Issues 中报告 Bug** | 💬 **与开发者同行分享**

</div>
