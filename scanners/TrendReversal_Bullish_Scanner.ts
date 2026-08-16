# ============================================================
# TREND REVERSAL SCANNER: BEARISH TO BULLISH
# Author: Ran Eliahu (@Eliahur7)
# Platform: TD Ameritrade / Schwab ThinkorSwim (TOS)
# Language: ThinkScript
# Timeframe: Daily chart (or 4-Hour / Intraday for Swing Trading)
#
# Description:
#   Identifies high-probability trend reversal inflection points 
#   where an oversold or beaten-down stock (trading below key 
#   averages) makes a decisive structural shift to the upside.
#
# Core Strategy & Edge:
#   1. Prior Bearish Context: Validates the stock was depressed 
#      below its 20 EMA in recent bars (avoids chasing extended runners).
#   2. Multi-Bar Synchronized Triggers: Allows MACD crossover and 
#      price breakout within a 3-bar window to prevent false negatives.
#   3. Momentum Recovery: RSI exiting cold/oversold zone (< 42) 
#      and reclaiming bullish territory (>= 45).
#   4. Institutional Volume Surge: Confirms buying conviction 
#      against 50-day average volume.
#   5. Volatility / Squeeze Release: Confirms upward histogram expansion.
# ============================================================

# ---- USER INPUTS & PARAMETERS ----
input emaLength = 20;
input rsiLength = 14;
input rsiColdThreshold = 42;
input rsiRecoveryThreshold = 45;
input volumeLookback = 50;
input volumeMultiplier = 1.15;
input minPrice = 5.00;
input lookbackBars = 3;

# ---- 1. PRICE & EXPONENTIAL MOVING AVERAGE ----
def ema20 = ExpAverage(close, emaLength);

# ---- 2. PRIOR BEARISH CONTEXT ----
# Confirms price was depressed below 20 EMA in at least 6 of the last 10 bars
def wasDepressed = Sum(close < ema20, 10) >= 6;

# ---- 3. STRUCTURAL PRICE BREAKOUT ----
# Price crosses or closes firmly above 20 EMA with bullish candle structure
def priceAboveEma = close >= ema20 and close > open and close > close[1];
def priceBreakout = priceAboveEma or (close crosses above ema20 within lookbackBars bars);

# ---- 4. MACD MOMENTUM REVERSAL ----
def macdVal = MACD().Value;
def macdAvg = MACD().Avg;
def macdCrossover = macdVal crosses above macdAvg within lookbackBars bars;
def macdExpanding = macdVal > macdAvg and macdVal > macdVal[1];
def macdReversal = macdCrossover or macdExpanding;

# ---- 5. RSI MOMENTUM RECOVERY ----
def rsiVal = RSI(length = rsiLength);
def rsiWasCold = Lowest(rsiVal, 10) < rsiColdThreshold; # Rebounding from oversold/weak state
def rsiRecovering = rsiVal >= rsiRecoveryThreshold and rsiVal > rsiVal[2];

# ---- 6. INSTITUTIONAL VOLUME EXPANSION ----
def avgVol = Average(volume, volumeLookback);
def volumeSurge = (volume > avgVol * volumeMultiplier) or (volume > volume[1] and volume > avgVol);

# ---- 7. TTM SQUEEZE HISTOGRAM MOMENTUM ----
def sqzHist = TTM_Squeeze().Histogram;
def sqzTurningUp = sqzHist > sqzHist[1];

# ---- 8. LIQUIDITY & PRICE FILTER ----
def priceOK = close >= minPrice;

# ---- COMBINED SCAN TRIGGER ----
plot BullishReversalSignal = wasDepressed 
                             and priceBreakout 
                             and macdReversal 
                             and rsiWasCold 
                             and rsiRecovering 
                             and volumeSurge 
                             and sqzTurningUp 
                             and priceOK;

# ---- FORMATTING ----
BullishReversalSignal.AssignValueColor(Color.GREEN);
BullishReversalSignal.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
