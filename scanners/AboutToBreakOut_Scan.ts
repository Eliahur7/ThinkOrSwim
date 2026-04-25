# ============================================
# ABOUT TO BREAK OUT SCAN
# Author: Eliahur7 + Claude | April 2026
# Repository: https://github.com/Eliahur7/ThinkOrSwim-
# ============================================
# DESCRIPTION:
#   Scans for stocks coiling near a breakout point — price is
#   consolidating in a tight range near recent highs with
#   rising momentum. TTM Squeeze is used as the primary
#   compression/momentum proxy.
#
# LOGIC:
#   - TTM Squeeze momentum is positive and rising (breakout fuel)
#   - Price is within 3% of the 20-day high (near resistance)
#   - Price is above the 50 SMA (trend is supportive)
#   - Relative volume picking up (accumulation signal)
#
# HOW TO USE IN TOS:
#   Scan Tab → Add Study Filter → Edit Formula → paste code
#
# NOTE:
#   TOS scans do not support secondary aggregation periods.
#   All conditions use the primary chart aggregation.
#
# BEST PAIRED WITH:
#   BullishReversalEntry.ts or ORB indicator for entry trigger
# ============================================

def sma50    = Average(close, 50);
def high20   = Highest(high, 20);
def squeeze  = TTM_Squeeze().Histogram;
def relVol   = volume / Average(volume, 50);

# Squeeze momentum positive and rising
def sqzMomRising = squeeze > 0 and squeeze > squeeze[1];

# Price within 3% of 20-day high
def nearHigh = close >= high20 * 0.97;

# Above 50 SMA
def aboveSMA50 = close > sma50;

# Volume picking up
def volPickup = relVol > 1.1;

plot scan = sqzMomRising and nearHigh and aboveSMA50 and volPickup;
