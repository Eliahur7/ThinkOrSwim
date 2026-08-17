# ============================================================
# INSTITUTIONAL TREND REVERSAL SCANNER: BEARISH TO BULLISH (V2)
# Author: Ran Eliahu (@Eliahur7)
# Platform: TD Ameritrade / Schwab ThinkorSwim (TOS)
# Language: ThinkScript
# Timeframe: Daily chart (Stock Hacker)
#
# Core Strategy & Edge:
#   1. Anti-Trap / Macro Guard: Filters out severe falling knives 
#      and dead-cat bounces deep below the 50 SMA / Weekly 21 EMA.
#   2. 20 EMA Slope Filter: Ensures the 20 EMA is flattening or curling 
#      upward, proving the downtrend momentum has actually halted.
#   3. Base Building & Higher Low: Requires structural support rather 
#      than a fragile one-day V-spike.
#   4. Multi-Bar Synchronized Triggers: Allows MACD crossover and 
#      price breakout within a 3-bar window to prevent false negatives.
#   5. RSI Reclaim & Volume Surge: Confirms institutional buying 
#      conviction with rising RSI and above-average volume.
#   6. TTM Squeeze Momentum: Validates upward histogram expansion.
# ============================================================

# ---- USER INPUTS & PARAMETERS ----
input emaLength = 20;
input smaLength = 50;
input rsiLength = 14;
input maxPctBelow50SMA = 10.0;     # Rejects stocks collapsed > 10% below 50 SMA (traps like CELH/METC/GFS)
input minPrice = 5.00;
input volumeLookback = 50;
input volumeMultiplier = 1.10;
input lookbackBars = 3;

# ---- 1. MOVING AVERAGES & SLOPE (Anti-Falling-Knife) ----
def ema20 = ExpAverage(close, emaLength);
def sma50 = Average(close, smaLength);

# 20 EMA must NOT be in steep freefall (must be flattening or curling up)
def ema20Flattening = ema20 >= ema20[2] - (0.005 * close);

# Price cannot be collapsed deep below the 50 SMA (weeds out macro weekly bear trends)
def distFrom50SMA = (close - sma50) / sma50 * 100;
def notSevereBreakdown = distFrom50SMA >= -maxPctBelow50SMA;

# ---- 2. PRIOR BEARISH CONTEXT (Base Building) ----
# Price spent at least 5 of the last 10 bars below the 20 EMA
def wasDepressed = Sum(close < ema20, 10) >= 5;

# Structural support: Prior low was respected (not making fresh lower lows today)
def lowestRecentLow = Lowest(low[2], 8);
def madeSupportFloor = low >= lowestRecentLow;

# ---- 3. PRICE BREAKOUT & RECLAIM ----
# Closes above 20 EMA with bullish candle structure
def priceAboveEma = close >= ema20 and close > open and close > close[1];
def priceBreakout = priceAboveEma or (close crosses above ema20 within lookbackBars bars);

# ---- 4. MACD REVERSAL TRIGGER ----
def macdVal = MACD().Value;
def macdAvg = MACD().Avg;
def macdCrossover = macdVal crosses above macdAvg within lookbackBars bars;
def macdExpanding = macdVal > macdAvg and macdVal > macdVal[1];
def macdReversal = macdCrossover or macdExpanding;

# ---- 5. RSI MOMENTUM RECOVERY ----
def rsiVal = RSI(length = rsiLength);
def rsiRecovering = rsiVal >= 45 and rsiVal <= 70 and rsiVal > rsiVal[2];

# ---- 6. INSTITUTIONAL VOLUME EXPANSION ----
def avgVol = Average(volume, volumeLookback);
def volumeSurge = (volume >= avgVol * volumeMultiplier) or (volume > volume[1] and volume >= avgVol);

# ---- 7. TTM SQUEEZE MOMENTUM RELEASE ----
def sqzHist = TTM_Squeeze().Histogram;
def sqzTurningUp = sqzHist > sqzHist[1];

# ---- 8. PRICE & LIQUIDITY FILTER ----
def priceOK = close >= minPrice;

# ---- COMBINED SCAN TRIGGER ----
plot BullishReversalSignal = wasDepressed 
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
