# 📈 ThinkorSwim Trading Studies & Scanners

> **Author:** Ran Eliahu | AI Cloud Engineer & Technical Trader  
> **Platform:** TD Ameritrade / Schwab ThinkorSwim (TOS)  
> **Language:** ThinkScript  
> **Trading Style:** Algorithmic scanning, swing trading, momentum day trading

---

## Overview

This repository contains a curated set of professional-grade **ThinkScript studies and Stock Hacker scanners** built for ThinkorSwim. These tools are designed to systematically identify high-probability trading setups by combining **fundamental quality filters**, **technical momentum signals**, and **institutional activity detection**.

All scanners are actively used in a live trading workflow with a defined edge:
- **Day trading window:** 8:30–10:30 AM CT on 5-minute charts
- **Swing/position trading:** Daily and weekly charts on the S&P 500 universe

---

## 📁 Repository Structure

```
thinkorswim-studies/
├── scanners/
│   ├── EliteFundamentals_Scanner.ts        # Quality fundamental filter
│   ├── FallenAngels_Scanner.ts             # Oversold high-quality dip finder
│   ├── InstitutionalAccumulation_Scanner.ts # Smart money detection
│   └── TTMSqueeze_Scanner.ts               # Volatility compression scanner
├── studies/
│   └── TTMSqueezePro_Study.ts              # Full TTM Squeeze Pro chart study
└── docs/
    └── SETUP_GUIDE.md                      # Step-by-step TOS import guide
```

---

## 🔍 Scanners

### 1. Elite Fundamentals Scanner
**File:** `scanners/EliteFundamentals_Scanner.ts`

Filters the market for stocks with institutional-grade fundamentals. Designed to build a **watchlist of quality names** that are appropriate for swing or position trades.

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

### 2. Fallen Angels Scanner
**File:** `scanners/FallenAngels_Scanner.ts`

Identifies **high-quality S&P 500 stocks** that have pulled back 8–25% from their 52-week highs but are showing early momentum recovery. Classic mean-reversion setup for buying strength at a discount.

**Signal Logic:**
- RSI(14) between 25–40 (oversold but not broken)
- Price 8–25% below 52-week high
- Price **above** 200-day MA (long-term trend intact)
- RSI rising (momentum turning up)

**Best used:** During broad market corrections when VIX > 20. Sort results by RSI ascending for deepest oversold names.

---

### 3. Institutional Accumulation Scanner
**File:** `scanners/InstitutionalAccumulation_Scanner.ts`

Detects stocks where **smart money is quietly accumulating** before a potential breakout. Tracks volume surges, VWAP positioning, and Money Flow Index to identify the accumulation phase.

**Signal Logic:**
- Volume ≥ 1.5× the 50-day average
- Price above VWAP
- Within 5% of 52-week high (near breakout)
- Money Flow Index (MFI) > 50
- At least 3 accumulation days in last 10 sessions
- Price above both 50 MA and 200 MA (confirmed uptrend)

**Best used:** After market close. Stocks appearing consistently across multiple days represent the strongest conviction signals.

---

### 4. TTM Squeeze Scanner
**File:** `scanners/TTMSqueeze_Scanner.ts`

Companion scanner to the TTM Squeeze Pro study. Three scan modes:

| Mode | Description | Best Run Time |
|------|-------------|---------------|
| `InSqueeze` | Stocks currently coiling (BB inside KC) | Pre-market / after close |
| `JustFired` | Squeeze fired today | 9:45 AM CT |
| `BullishFired` | Bullish momentum squeeze only | 10:00–10:30 AM CT |

---

## 📊 Studies

### TTM Squeeze Pro — Enhanced Momentum Study
**File:** `studies/TTMSqueezePro_Study.ts`

An enhanced implementation of John Carter's classic TTM Squeeze indicator. Detects **volatility compression** (Bollinger Bands contracting inside Keltner Channels) followed by explosive momentum breakouts.

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

## 🚀 How to Import into ThinkorSwim

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
