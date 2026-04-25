# 📈 ThinkorSwim Trading Studies & Scanners
## Professional ThinkScript Stock Screeners & Technical Indicators for Day & Swing Trading

> **Author:** Ran Eliahu | AI Cloud Engineer & Technical Trader  
> **Platform:** TD Ameritrade / Schwab ThinkorSwim (TOS)  
> **Language:** ThinkScript  
> **Trading Style:** Algorithmic scanning, swing trading, momentum day trading, stock picking

---

## Overview

This repository contains a **production-ready collection of ThinkScript stock scanners and technical analysis indicators** built for the Schwab ThinkorSwim trading platform. These automated stock screening tools identify high-probability trading opportunities by combining **fundamental stock filters**, **momentum indicators**, **volatility analysis**, and **institutional accumulation detection**.

Every scanner and study is actively used in live trading workflows with defined edges:
- **Day trading scanner:** Intraday setups on 5-minute charts (8:30–10:30 AM CT)
- **Swing trade finder:** Multi-day setups on daily charts (S&P 500 focus)
- **Volatility & breakout scanner:** TTM Squeeze squeeze-fire detection
- **Quality stock screening:** Fundamental + technical combination filters

---

## ⚡ Features at a Glance

| Feature | Benefit |
|---------|----------|
| **4 Professional Scanners** | Eliminate manual stock screening—automate your watchlist |
| **ThinkScript Code Examples** | Copy-paste ready; production-tested in live trading |
| **Momentum & Breakout Detection** | TTM Squeeze Pro study + squeeze-fire alerts |
| **Fundamental + Technical Combo** | Quality stock filters + technical entry signals |
| **Institutional Smart Money Signals** | Detect accumulation before the big move |
| **Mean Reversion Setup Finder** | Oversold high-quality stocks near moving averages |
| **Day Trading & Swing Trading Ready** | Multiple timeframes: 5-min, daily, weekly |
| **Full Setup Documentation** | Step-by-step import guide included |

---

## 🚀 Quick Start

### For Beginners
1. Download the `SETUP_GUIDE.md` and follow the ThinkorSwim import steps
2. Start with **Elite Fundamentals Scanner** to build a quality watchlist
3. Add **TTM Squeeze Pro** study to your charts for entry confirmation

### For Experienced Traders
1. Import all 4 scanners into Stock Hacker
2. Run **Institutional Accumulation Scanner** daily at market close
3. Run **TTM Squeeze Scanner** in "JustFired" mode at 9:45 AM CT for intraday setups
4. Pair with your own risk management and position sizing

### Recommended Setup
```
Watchlist Builder:      EliteFundamentals_Scanner.ts
Entry Confirmation:     TTMSqueezePro_Study.ts + TTMSqueeze_Scanner.ts
Mean Reversion Plays:   FallenAngels_Scanner.ts
Institutional Clues:    InstitutionalAccumulation_Scanner.ts
```

---

## 📁 Repository Structure

```
think-or-swim-trading-scanners/
├── scanners/
│   ├── EliteFundamentals_Scanner.ts        # Stock screening: P/E, ROE, fundamentals
│   ├── FallenAngels_Scanner.ts             # Mean reversion: oversold quality stocks
│   ├── InstitutionalAccumulation_Scanner.ts # Smart money detection & volume analysis
│   └── TTMSqueeze_Scanner.ts               # Volatility scanner: squeeze detection
├── studies/
│   └── TTMSqueezePro_Study.ts              # Technical indicator: momentum & breakout
├── README.md                                # You are here
├── SETUP_GUIDE.md                           # ThinkorSwim import tutorial
└── .git/                                    # Version control
```

---

## 🔍 Stock Scanners & Technical Screening Tools

### 1. Elite Fundamentals Scanner — Quality Stock Screener
**File:** `scanners/EliteFundamentals_Scanner.ts`  
**Use Case:** Build a curated watchlist for swing trading and position trading

Automatically screens the market for stocks with **institutional-grade fundamentals**. This stock scanner filters based on profitability, balance sheet strength, and value metrics to identify quality names worthy of technical analysis.

| Filter | Criteria |
|--------|----------|
| P/E Ratio | 5 – 35 |
| Price/Book Value | < 10 |
| Return on Equity | ≥ 15% |
| Gross Profit Margin | ≥ 40% |
| Current Ratio | ≥ 1.5 |
| Book Value Per Share Growth | > 0 |
| Price | Above 200-day MA |

**Best used:** Weekly, to maintain a curated watchlist of fundamentally sound stocks for technical entry signals.

---

### 2. Fallen Angels Scanner — Mean Reversion Stock Finder
**File:** `scanners/FallenAngels_Scanner.ts`  
**Use Case:** Identify oversold high-quality stocks near support

A specialized stock screener that finds **high-quality S&P 500 names** that have pulled back 8–25% from their 52-week highs but are showing early momentum recovery. Perfect for mean-reversion traders buying strength at a discount during market corrections.

**Signal Logic:**
- RSI(14) between 25–40 (oversold but not broken)
- Price 8–25% below 52-week high
- Price **above** 200-day MA (long-term trend intact)
- RSI rising (momentum turning up)

**Best used:** During broad market corrections when VIX > 20. Sort results by RSI ascending for deepest oversold names.

---

### 3. Institutional Accumulation Scanner — Smart Money Detection
**File:** `scanners/InstitutionalAccumulation_Scanner.ts`  
**Use Case:** Detect accumulation before institutional breakouts

A unique stock scanner that identifies where **institutional smart money is quietly accumulating** before likely breakouts. Uses volume analysis, VWAP positioning, and Money Flow Index patterns to detect the accumulation phase before the big move.

**Signal Logic:**
- Volume ≥ 1.5× the 50-day average
- Price above VWAP
- Within 5% of 52-week high (near breakout)
- Money Flow Index (MFI) > 50
- At least 3 accumulation days in last 10 sessions
- Price above both 50 MA and 200 MA (confirmed uptrend)

**Best used:** After market close. Stocks appearing consistently across multiple days represent the strongest conviction signals.

---

### 4. TTM Squeeze Scanner — Volatility Compression Detector
**File:** `scanners/TTMSqueeze_Scanner.ts`  
**Use Case:** Find breakout-ready stocks and intraday momentum setups

A volatility-focused stock scanner built to complement the TTM Squeeze Pro technical indicator. Three powerful scanning modes for different trading timeframes:

| Mode | Description | Best Run Time |
|------|-------------|---------------|
| `InSqueeze` | Stocks currently coiling (BB inside KC) | Pre-market / after close |
| `JustFired` | Squeeze fired today | 9:45 AM CT |
| `BullishFired` | Bullish momentum squeeze only | 10:00–10:30 AM CT |

---

## 📊 Technical Indicators & Studies

### TTM Squeeze Pro — Advanced Momentum & Volatility Indicator
**File:** `studies/TTMSqueezePro_Study.ts`  
**Use Case:** Chart study for breakout and momentum confirmation

A professional-grade technical indicator based on John Carter's famous TTM Squeeze. This momentum study detects **volatility compression** (Bollinger Bands contracting inside Keltner Channels) followed by explosive momentum breakouts—perfect for timing breakout entry signals.

**Features:**
- Dual Keltner Channel detection (standard + wide) for Pro-level squeeze identification
- Color-coded momentum histogram:
  - 🟢 **Bright Green** — Positive & rising (strongest bull signal)
  - 🟩 **Dark Green** — Positive but fading
  - 🔴 **Bright Red** — Negative & falling (strongest bear signal)
  - 🟥 **Dark Red** — Negative but recovering
- Squeeze dot indicator (Black = coiling, Red = fired)
- Built-in alerts for bullish and bearish squeeze fires

**Timeframes:** 5-minute (day trading) | Daily (swing trading)

---

## 🚀 How to Import These Scanners into ThinkorSwim

### Importing a Study
1. Open ThinkorSwim → **Charts**
2. Click **Studies** (beaker icon) → **Edit Studies**
3. Click **Create** → paste the `.ts` file contents
4. Name the study and click **OK**

### Importing a Scanner
1. Open ThinkorSwim → **Scan** tab
2. Click **Stock Hacker**
3. Click **Add Study Filter** → **Edit**
4. Paste the scanner `.ts` code
5. Configure filters as described in each file's setup comments
6. Set **Scan In** to desired universe (S&P 500 recommended)

> 💡 **Pro Tip:** All fundamental filters (P/E, ROE, etc.) must be added as separate **Fundamental Filters** in the Stock Hacker UI — they cannot be set via ThinkScript directly.

---

## ⚠️ Disclaimer

These tools are for **educational and informational purposes only**. Nothing in this repository constitutes financial advice. Trading involves substantial risk of loss. Always do your own research and trade with proper risk management.

---

## 🤝 Connect

- **GitHub:** [github.com/Eliahur7](https://github.com/Eliahur7)
- **LinkedIn:** [linkedin.com/in/raneliahu](https://www.linkedin.com/in/raneliahu)
- **Medium:** [@Eliahu.ran](https://medium.com/@Eliahu.ran)

---

*Built with ThinkScript | Powered by data-driven discipline*
