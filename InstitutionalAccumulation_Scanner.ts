# ============================================================
# INSTITUTIONAL ACCUMULATION SCANNER
# Author: Ran Eliahu (@Eliahur7)
# Description: Detects stocks showing signs of institutional
#              buying — sustained above-average volume with
#              price holding up or advancing. Identifies the
#              "smart money" accumulation phase before breakout.
#
# Scan Criteria:
#   - Current volume > 1.5x the 50-day average volume
#   - Price above VWAP (institutions buying at or below VWAP)
#   - Price within 5% of 52-week high (near breakout territory)
#   - Money Flow Index (MFI) > 50 (money flowing in)
#   - Up/Down volume ratio positive over last 10 days
#   - Price above both 50 MA and 200 MA
#
# Timeframe: Daily chart | Universe: S&P 500 / Russell 1000
# ============================================================

# ---- VOLUME SURGE ----
def avgVol50 = Average(volume, 50);
def volumeRatio = volume / avgVol50;
def volumeSurge = volumeRatio >= 1.5; # 50% above average

# ---- VWAP FILTER ----
def vwapValue = VWAP();
def aboveVwap = close >= vwapValue;

# ---- NEAR 52-WEEK HIGH (breakout territory) ----
def high52 = Highest(high, 252);
def pctFromHigh = (high52 - close) / high52 * 100;
def nearHigh = pctFromHigh <= 5; # Within 5% of 52-week high

# ---- MONEY FLOW INDEX ----
def mfiLength = 14;
def mfi = MoneyFlowIndex(length = mfiLength);
def mfiPositive = mfi > 50;

# ---- TREND CONFIRMATION ----
def ma50  = Average(close, 50);
def ma200 = Average(close, 200);
def inUptrend = close > ma50 and close > ma200 and ma50 > ma200;

# ---- ACCUMULATION DAY COUNT ----
# Count days in last 10 where close > open AND volume above average
def isAccumDay = close > open and volume > avgVol50;
def accumDays = Sum(isAccumDay, 10);
def sufficientAccum = accumDays >= 3; # At least 3 accumulation days in last 10

# ---- PRICE MINIMUM ----
def minPrice = 15.00;
def priceOK = close >= minPrice;

# ---- COMBINED INSTITUTIONAL ACCUMULATION SIGNAL ----
plot InstitutionalAccumSignal = volumeSurge
                             and aboveVwap
                             and nearHigh
                             and mfiPositive
                             and inUptrend
                             and sufficientAccum
                             and priceOK;

# ---- SUPPORTING PLOTS (for chart overlay use) ----
plot VolumeRatioPlot = volumeRatio;  # Use to gauge volume intensity
plot AccumDayCount   = accumDays;    # Use to confirm accumulation pattern
plot MFIValue        = mfi;          # Use to confirm money flow

# ============================================================
# THINKORSWIM STOCK HACKER SETUP INSTRUCTIONS:
#
# Step 1 - Add Study Filter:
#   Filter > Add Study Filter > InstitutionalAccumulation_Scanner
#   Set InstitutionalAccumSignal = 1 (true)
#
# Step 2 - Set Universe:
#   Scan In: S&P 500 or Russell 1000
#   Aggregation: Day
#
# Step 3 - Sort Results:
#   Sort by Volume Ratio (VolumeRatioPlot) descending
#   to surface highest-conviction accumulation first
#
# Step 4 - Chart Confirmation Checklist:
#   ✓ Look for tight consolidation pattern (flag/base)
#   ✓ Volume should be drying up on down days
#   ✓ Volume should spike on up days
#   ✓ Check for institutional ownership increase in earnings reports
#   ✓ Verify no major resistance overhead
#
# PRO TIP: Run this scan after market close. Stocks appearing
#          consistently across multiple days = strongest signals.
# ============================================================
