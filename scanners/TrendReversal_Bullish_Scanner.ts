# ============================================================
# INSTITUTIONAL TREND REVERSAL SCANNER: BEARISH TO BULLISH (V4)
# Author: Ran Eliahu (@Eliahur7)
# Platform: TD Ameritrade / Schwab ThinkorSwim (TOS)
# Language: ThinkScript
# Timeframe: Daily chart (Stock Hacker Native — No Multi-Timeframe Errors)
#
# Core Strategy & Edge:
#   1. Macro Trend Guard: Uses the mathematical daily equivalent of the 
#      Weekly 21 EMA (105-day EMA) & 5-week momentum (25-day momentum)
#      to 100% eliminate Stock Hacker "Secondary period" errors while
#      strictly rejecting macro bear down-cycles (BIRK, CELH, TSLA, METC).
#   2. Strict Today-Confirmation: Today's candle MUST hold above the 
#      20 EMA on a green/positive candle (rejects failed breakouts like BIRK -4%).
#   3. Anti-Falling-Knife: 20 EMA must be flattening or curling upward.
#   4. Base Building: Verifies prior depression + higher swing low support floor.
#   5. MACD & RSI Momentum Reclaim: Synchronized momentum recovery.
#   6. Institutional Volume Expansion: Buying volume >= 50-day average.
# ============================================================

# ---- USER INPUTS & PARAMETERS ----
input emaLength = 20;
input smaLength = 50;
input rsiLength = 14;
input maxPctBelow50SMA = 10.0;
input minPrice = 5.00;
input volumeLookback = 50;
input volumeMultiplier = 1.05;
input lookbackBars = 3;

# ---- 1. MACRO TREND GUARD (Stock Hacker Native Weekly Equivalent) ----
# Weekly 21 EMA = 105 Daily EMA (21 weeks * 5 days)
# 5-Week Momentum = 25 Daily Momentum (5 weeks * 5 days)
def macroEma = ExpAverage(close, 105);
def macroMom = close - close[25];
def isMacroBear = close < macroEma and macroMom < 0;
def macroTrendOK = !isMacroBear;

# ---- 2. DAILY MOVING AVERAGES & SLOPES ----
def ema20 = ExpAverage(close, emaLength);
def sma50 = Average(close, smaLength);

# 20 EMA must NOT be in steep freefall (must be stabilizing/curling up)
def ema20Flattening = ema20 >= ema20[2] - (0.005 * close);

# Price distance from 50 SMA (rejects severe breakdown traps)
def distFrom50SMA = (close - sma50) / sma50 * 100;
def notSevereBreakdown = distFrom50SMA >= -maxPctBelow50SMA;

# ---- 3. STRICT TODAY CANDLE CONFIRMATION (Filters out BIRK) ----
# Price MUST be currently holding above 20 EMA today and cannot be a dumping red bar
def holdsAboveEmaToday = close >= ema20 and close >= open and close >= close[1];

# Price recently crossed or reclaimed 20 EMA
def priceBreakout = holdsAboveEmaToday and (close crosses above ema20 within lookbackBars bars or close[1] < ema20[1] or close[2] < ema20[2]);

# ---- 4. PRIOR BEARISH CONTEXT (Base Building) ----
# Price spent at least 4 of the last 10 bars below the 20 EMA (true reversal from base)
def wasDepressed = Sum(close < ema20, 10) >= 4;

# Structural support floor: Not printing fresh lower lows today
def lowestRecentLow = Lowest(low[2], 8);
def madeSupportFloor = low >= lowestRecentLow;

# ---- 5. MACD REVERSAL TRIGGER ----
def macdVal = MACD().Value;
def macdAvg = MACD().Avg;
def macdCrossover = macdVal crosses above macdAvg within lookbackBars bars;
def macdExpanding = macdVal > macdAvg and macdVal > macdVal[1];
def macdReversal = macdCrossover or macdExpanding;

# ---- 6. RSI MOMENTUM RECOVERY ----
def rsiVal = RSI(length = rsiLength);
def rsiRecovering = rsiVal >= 45 and rsiVal <= 72 and rsiVal > rsiVal[2];

# ---- 7. INSTITUTIONAL VOLUME EXPANSION ----
def avgVol = Average(volume, volumeLookback);
def volumeSurge = (volume >= avgVol * volumeMultiplier) or (volume > volume[1] and volume >= avgVol);

# ---- 8. TTM SQUEEZE MOMENTUM RELEASE ----
def sqzHist = TTM_Squeeze().Histogram;
def sqzTurningUp = sqzHist > sqzHist[1];

# ---- 9. PRICE & LIQUIDITY FILTER ----
def priceOK = close >= minPrice;

# ---- COMBINED SCAN TRIGGER ----
plot BullishReversalSignal = macroTrendOK
                             and holdsAboveEmaToday
                             and wasDepressed 
                             and notSevereBreakdown 
                             and ema20Flattening 
                             and madeSupportFloor 
                             and priceBreakout 
                             and macdReversal 
                             and rsiRecovering 
                             and volumeSurge 
                             and sqzTurningUp 
                             and priceOK;

# ---- FORMATTING ----
BullishReversalSignal.AssignValueColor(Color.GREEN);
BullishReversalSignal.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
