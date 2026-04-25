# ============================================
# FALLEN ANGELS SCAN
# Author: Eliahur7 + Claude | April 2026
# Repository: https://github.com/Eliahur7/ThinkOrSwim-
# ============================================
# DESCRIPTION:
#   Scans for stocks that were previously strong (52-week high
#   territory) but have pulled back significantly — "fallen angels."
#   These are high-quality stocks that have sold off and may be
#   setting up for a recovery/mean reversion trade.
#
# LOGIC:
#   - Stock is down significantly from its 52-week high (30%+)
#   - But still above its 52-week low (not in freefall)
#   - Price is showing early signs of stabilization (close > open)
#   - Relative volume is elevated (institutional interest returning)
#
# HOW TO USE IN TOS:
#   Scan Tab → Add Study Filter → Edit Formula → paste code
#
# BEST PAIRED WITH:
#   BullishReversalEntry.ts for entry timing on recovered setups
# ============================================

def hi52  = Highest(high, 252);
def lo52  = Lowest(low, 252);
def range52 = hi52 - lo52;

# Down 30%+ from 52-week high
def fallenFromHigh = (hi52 - close) / hi52 >= 0.30;

# But not at the absolute bottom (some floor exists)
def aboveLow = close > lo52 * 1.05;

# Current candle showing strength
def greenCandle = close > open;

# Elevated relative volume (proxy)
def relVol = volume / Average(volume, 50);
def highRelVol = relVol > 1.2;

plot scan = fallenFromHigh and aboveLow and greenCandle and highRelVol;
