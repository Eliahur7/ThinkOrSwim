# ============================================
# ELITE FUNDAMENTALS SCAN
# Author: Eliahur7 + Claude | April 2026
# Repository: https://github.com/Eliahur7/ThinkOrSwim-
# ============================================
# DESCRIPTION:
#   Filters the market for stocks with strong fundamental
#   characteristics — the "fundamental monsters." Designed
#   to build a universe of high-quality stocks to then
#   apply technical scans on top of.
#
# FILTERS:
#   - Market Cap > $10B (large cap, institutional quality)
#   - Positive EPS (profitable)
#   - P/E Ratio between 10-50 (not too cheap, not too expensive)
#   - Price above 200 SMA (long-term uptrend)
#   - Price above 50 SMA (medium-term trend intact)
#
# HOW TO USE IN TOS:
#   Scan Tab → Add Study Filter → Edit Formula → paste code
#   Recommended: Set Stock Universe to S&P 500 or NASDAQ 100
#
# NOTE:
#   GetFundamentalData() and EPS() are not supported in TOS scans.
#   Use TOS built-in fundamental filters (P/E, EPS, Market Cap)
#   from the Scan tab's dropdown menus alongside this study filter.
#
# TECHNICAL COMPONENT (paste as study filter):
# ============================================

def sma50  = Average(close, 50);
def sma200 = Average(close, 200);

# Price above key moving averages
def aboveSMA200 = close > sma200;
def aboveSMA50  = close > sma50;

# EMAs in bullish order
def ema21 = ExpAverage(close, 21);
def bullStack = ema21 > sma50 and sma50 > sma200;

plot scan = aboveSMA200 and aboveSMA50 and bullStack;
