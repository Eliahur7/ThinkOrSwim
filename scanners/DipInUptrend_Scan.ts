# ============================================
# DIP IN UPTREND SCAN
# Author: Eliahur7 + Claude | April 2026
# Repository: https://github.com/Eliahur7/ThinkOrSwim-
# ============================================
# DESCRIPTION:
#   Scans for stocks that are in a confirmed longer-term uptrend
#   but are currently pulling back — the classic "dip buy" setup.
#   Identifies stocks where the trend is intact but price has
#   temporarily retreated, offering a potential entry opportunity.
#
# LOGIC:
#   - Price is above the 200 SMA (long-term uptrend confirmed)
#   - Price is above the 50 SMA (medium-term trend intact)
#   - Price is currently BELOW the 21 EMA (short-term pullback)
#   - 21 EMA is above 50 SMA (trend structure healthy)
#
# HOW TO USE IN TOS:
#   Scan Tab → Add Study Filter → Edit Formula → paste code
#
# BEST PAIRED WITH:
#   BullishReversalEntry.ts chart study for entry timing
# ============================================

def sma50  = Average(close, 50);
def sma200 = Average(close, 200);
def ema21  = ExpAverage(close, 21);

# Long-term uptrend
def aboveSMA200 = close > sma200;

# Medium-term trend intact
def aboveSMA50 = close > sma50;

# Short-term pullback
def belowEMA21 = close < ema21;

# Trend structure healthy
def emaAboveSMA = ema21 > sma50;

plot scan = aboveSMA200 and aboveSMA50 and belowEMA21 and emaAboveSMA;
