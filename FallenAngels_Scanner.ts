# ============================================================
# FALLEN ANGELS SCANNER
# Author: Ran Eliahu (@Eliahur7)
# Description: Identifies high-quality S&P 500 stocks that have
#              pulled back significantly from their 52-week highs
#              but are showing early signs of recovery.
#              Classic mean-reversion / dip-buying setup.
#
# Scan Criteria:
#   - S&P 500 universe (quality filter built-in)
#   - RSI(14) between 25 and 40 (oversold but not broken)
#   - Price is 8% to 25% below 52-week high (pullback zone)
#   - Price is ABOVE 200-day MA (long-term uptrend intact)
#   - RSI is rising (momentum turning up)
#
# Trading Window: Daily/Weekly charts for swing/position trades
# ============================================================

# ---- RSI CALCULATION ----
def rsiLength = 14;
def rsiValue = RSI(length = rsiLength);

# RSI must be in oversold-recovery zone
def rsiOversold = rsiValue >= 25 and rsiValue <= 40;

# ---- RSI RISING (momentum turning) ----
# Current RSI higher than 3 bars ago
def rsiRising = rsiValue > rsiValue[3];

# ---- 52-WEEK HIGH PULLBACK ----
def high52 = Highest(high, 252);
def pullbackPct = (high52 - close) / high52 * 100;

# Between 8% and 25% off the 52-week high
def inPullbackZone = pullbackPct >= 8 and pullbackPct <= 25;

# ---- TREND FILTER ----
# Must be above 200-day MA — we want fallen angels, not broken stocks
def ma200 = Average(close, 200);
def aboveMa200 = close > ma200;

# ---- VOLUME FILTER ----
def avgVol50 = Average(volume, 50);
def minVolume = 1000000; # Minimum 1M avg daily volume for S&P 500 names
def sufficientVolume = avgVol50 >= minVolume;

# ---- PRICE FLOOR ----
def minPrice = 20.00;
def priceOK = close >= minPrice;

# ---- COMBINED FALLEN ANGEL SIGNAL ----
plot FallenAngelSignal = rsiOversold
                      and rsiRising
                      and inPullbackZone
                      and aboveMa200
                      and sufficientVolume
                      and priceOK;

# ---- PULLBACK PERCENTAGE LABEL (for chart use) ----
plot PullbackPercent = pullbackPct;

# ============================================================
# THINKORSWIM STOCK HACKER SETUP INSTRUCTIONS:
#
# Step 1 - Add Study Filter:
#   Filter > Add Study Filter > FallenAngels_Scanner
#   Set FallenAngelSignal = 1 (true)
#
# Step 2 - Set Universe:
#   Scan In: S&P 500
#
# Step 3 - Sort Results:
#   Sort by RSI ascending to find most oversold first
#   OR sort by pullback % descending for deepest dips
#
# Step 4 - Confirm on Daily/Weekly chart:
#   - Look for bullish candle patterns at support
#   - Check for volume confirmation on bounce days
#   - Verify sector is not in systemic breakdown
#
# BEST MARKET CONDITIONS: Use during broad market corrections
#                         when VIX is elevated (>20)
# ============================================================
