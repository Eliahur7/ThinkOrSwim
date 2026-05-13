# 📦 Chart OB Visuals — Order Block Study for ThinkorSwim

> **Author:** Ran Eliahu | [github.com/Eliahur7](https://github.com/Eliahur7)  
> **Platform:** TD Ameritrade / Schwab ThinkorSwim (TOS)  
> **Language:** ThinkScript  
> **Chart Type:** Overlay Study (upper panel)

---

## 📁 Files in This Folder

| File | Description |
|------|-------------|
| `OrderBlock_Study.ts` | Main ThinkScript chart study — detects and plots Bull & Bear OB zones |
| `README.md` | This file — explains what Order Blocks are and how to use the study |

---

## 🧠 What Is an Order Block?

An **Order Block (OB)** is a concept from Smart Money Concepts (SMC) and Institutional trading theory. It refers to a specific price zone where a large institutional participant — a bank, hedge fund, or market maker — placed a significant buy or sell order that caused a strong directional move.

The logic: institutions can't fill their entire position in one candle. Instead, they leave "footprints" at key levels. When price returns to those levels, the institution is likely to re-engage — either to add to their position or defend it — creating high-probability reaction zones.

---

### 🟢 Bullish Order Block (Bull OB)

A **Bullish Order Block** is the **last down (red) candle** before a strong impulsive move upward.

```
    │
    ▲  Strong green impulse (break of structure)
    │
[▓▓▓▓▓]  ← This red candle is the Bull OB
    │
```

**Why it matters:**
- Institutions placed buy orders inside this red candle before the rally
- When price returns to this zone, institutions are expected to defend it
- The zone acts as a **demand zone** — buyers step back in

**What to look for on re-test:**
- Price touches the Bull OB zone (high–low range of that red candle)
- Bullish reaction: hammer, engulfing, or strong green close
- Volume expansion on the reaction candle
- TTM Squeeze firing bullish inside or just below the zone

---

### 🔴 Bearish Order Block (Bear OB)

A **Bearish Order Block** is the **last up (green) candle** before a strong impulsive move downward.

```
    │
[▓▓▓▓▓]  ← This green candle is the Bear OB
    │
    ▼  Strong red impulse (break of structure)
    │
```

**Why it matters:**
- Institutions placed sell orders inside this green candle before the drop
- When price rallies back to this zone, institutions are expected to re-sell
- The zone acts as a **supply zone** — sellers return

**What to look for on re-test:**
- Price rallies into the Bear OB zone
- Bearish rejection: shooting star, bearish engulfing, or strong red close
- Volume increase on the rejection candle
- Stochastic overbought (>80) while inside the zone

---

## 🔍 Mitigation — When an OB No Longer Holds

An Order Block is considered **mitigated** (invalidated) once price closes through the opposite boundary of the zone:

- **Bull OB mitigated** → price closes **below** the low of the Bull OB candle
- **Bear OB mitigated** → price closes **above** the high of the Bear OB candle

Once mitigated, the zone loses its institutional significance. The study will label mitigated zones with a gray "Mitigated" bubble on the chart.

> **Rule of thumb:** Never enter a trade into a mitigated OB. The institution has already been filled or stopped out, and the zone is no longer defended.

---

## 📊 How to Read the Study on Your Chart

### Zone Colors

| Color | Meaning |
|-------|---------|
| 🟩 Green zone | Bullish Order Block — potential long entry area |
| 🟥 Red zone | Bearish Order Block — potential resistance / short area |
| ⬜ Gray bubble | Zone has been mitigated — ignore for new entries |

### Chart Background Highlight

- **Dark green background** — current price is inside an active Bull OB (watch for long entry)
- **Dark red background** — current price is inside an active Bear OB (watch for reversal or exit)

### Dashed Lines

Each OB zone is bounded by two dashed lines:
- **Top line** = high of the OB candle
- **Bottom line** = low of the OB candle

The cloud fill between them is the zone itself.

---

## ⚙️ Study Inputs (Customizable)

| Input | Default | Description |
|-------|---------|-------------|
| `lookback` | 3 | Candles back to look for OB detection context |
| `zoneOpacity` | 30 | Transparency of the zone fill |
| `showLabels` | Yes | Show price range bubbles on OB formation |
| `showBullOB` | Yes | Toggle Bullish OB zones on/off |
| `showBearOB` | Yes | Toggle Bearish OB zones on/off |
| `maxZones` | 5 | Max active zones drawn per side |
| `mitigatedFade` | Yes | Show "Mitigated" label when zone is broken |
| `alertOnTouch` | No | Fire TOS alert when price enters a zone |

---

## 🚀 How to Install

1. Open **ThinkorSwim** → go to **Charts**
2. Click the **Studies** button (beaker icon) → **Edit Studies**
3. Click **Create** (or **New Study**)
4. Copy and paste the full contents of `OrderBlock_Study.ts` into the editor
5. Name it `OrderBlock_Study` and click **OK**
6. Add it to your chart as an **Upper Study** (it plots on the price panel)

> 💡 **Pro Tip:** Works best on **Daily** charts for swing trading setups. For intraday use, apply to a **15-minute** or **1-hour** chart during the first 90 minutes of the session.

---

## 🔗 Integration with the Rest of This Repo

The Order Block study is designed to work alongside the other tools in this repository:

| Tool | How it pairs with OB |
|------|----------------------|
| `TTMSqueezePro_Study.ts` | Confirms momentum direction inside an OB zone — strongest signal when squeeze fires inside a Bull OB |
| `FallenAngels_Scanner.ts` | Finds oversold stocks; combine with Bull OB proximity for high-conviction entries |
| `InstitutionalAccumulation_Scanner.ts` | Volume footprint aligns with OB theory — both track institutional activity |
| Custom Column: RVOL | Volume surge into an OB zone significantly increases entry conviction |

**Ideal confluence entry checklist:**
- [ ] Price is inside or at the bottom of a Bull OB zone
- [ ] TTM Squeeze is charged (dots) or just fired green
- [ ] RVOL > 100% on the entry candle
- [ ] Stochastic is below 30 or crossing up
- [ ] MACD histogram is positive or turning green
- [ ] OB is **not** mitigated

---

## ⚠️ Disclaimer

This study is for **educational and informational purposes only**. Order Blocks are a discretionary concept — not every OB will hold, and not every re-test will result in a clean reaction. Always combine with your own risk management, defined stop losses, and position sizing. Nothing in this repository constitutes financial advice.

---

*Built with ThinkScript | Powered by data-driven discipline*  
*Part of the [Eliahur7/ThinkOrSwim](https://github.com/Eliahur7/ThinkOrSwim) repository*
