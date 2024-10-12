export const gameData = {
  start: {
    text: "暗い森の中、あなたは古びた地図を手に持っています。伝説の宝物を求めて冒険を始めようとしています。目の前には二つの道が見えます。一つは薄暗い小道で、もう一つは不気味な霧に覆われた道です。どちらの道を選びますか？",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    choices: [
      { text: "薄暗い小道を進む", nextPage: "dimPath" },
      { text: "霧の道を進む", nextPage: "mistyPath" },
      { text: "地図をよく調べる", nextPage: "examineMap" },
      { text: "その場で休憩する", nextPage: "restStart" }
    ]
  },

  dimPath: {
    text: "薄暗い小道を進むと、古い墓地に出ました。月明かりに照らされた墓石が不気味な影を落としています。近くの一つの墓石が特に目を引きます。",
    image: "https://images.unsplash.com/photo-1572616326589-43cf673cc33e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    choices: [
      { text: "墓石を調べる", nextPage: "investigateTombstone" },
      { text: "墓地を探索する", nextPage: "exploreGraveyard" },
      { text: "墓地を素早く通り抜ける", nextPage: "quicklyPassGraveyard" },
      { text: "来た道を引き返す", nextPage: "start" }
    ]
  },

  mistyPath: {
    text: "霧の道を進むと、視界が悪くなります。周りの音も霧に吸い込まれているようです。突然、霧の中から何かが動く気配を感じます。",
    image: "https://images.unsplash.com/photo-1492485872092-7c4c42c9ef85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    choices: [
      { text: "立ち止まって様子を見る", nextPage: "observeMist" },
      { text: "声をかける", nextPage: "callOutMist" },
      { text: "霧の中を進み続ける", nextPage: "continueThroughMist" },
      { text: "来た道を引き返す", nextPage: "start" }
    ]
  },

  examineMap: {
    text: "地図をよく調べると、近くに古代の遺跡があることがわかります。しかし、地図には危険な罠の印も記されています。",
    image: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa2aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    choices: [
      { text: "遺跡に向かう", nextPage: "headToRuins" },
      { text: "薄暗い小道を進む", nextPage: "dimPath" },
      { text: "霧の道を進む", nextPage: "mistyPath" },
      { text: "その場で休憩する", nextPage: "restStart" }
    ]
  },

  restStart: {
    text: "その場で休憩することにしました。静寂の中、遠くから不思議な歌声が聞こえてきます。",
    image: "https://images.unsplash.com/photo-1476611338391-6f395a0ebc7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    choices: [
      { text: "歌声の方向に進む", nextPage: "followSong" },
      { text: "休憩を続ける", nextPage: "continueRest" },
      { text: "薄暗い小道を進む", nextPage: "dimPath" },
      { text: "霧の道を進む", nextPage: "mistyPath" }
    ]
  },

  // ... (previous pages remain unchanged)
};