# ============================================================
# TTM SQUEEZE PRO — SCANNER COMPANION
# Author: Ran Eliahu (@Eliahur7)
# Description: Stock Hacker scan to find stocks currently IN
#              a squeeze or that just FIRED a squeeze signal.
#              Use alongside TTMSqueezePro_Study.ts on charts.
# ============================================================

input bbLength    = 20;
input bbMult      = 2.0;
input kcLength    = 20;
input kcMult      = 1.5;
input scanMode    = {default "InSqueeze", "JustFired", "BullishFired"};

# ---- BOLLINGER BANDS ----
def bbBasis = Average(close, bbLength);
def bbDev   = bbMult * StdDev(close, bbLength);
def bbUpper = bbBasis + bbDev;
def bbLower = bbBasis - bbDev;

# ---- KELTNER CHANNELS ----
def kcBasis   = Average(close, kcLength);
def atr       = Average(TrueRange(high, close, low), kcLength);
def kcUpper   = kcBasis + kcMult * atr;
def kcLower   = kcBasis - kcMult * atr;

# ---- SQUEEZE STATES ----
def squeezeOn    = bbUpper < kcUpper and bbLower > kcLower;
def squeezeOff   = !squeezeOn;
def squeezeFired = squeezeOn[1] and squeezeOff;

# ---- MOMENTUM ----
def momentumLen = 12;
def midLine     = (Highest(high, momentumLen) + Lowest(low, momentumLen)) / 2;
def delta       = close - (midLine + Average(close, momentumLen)) / 2;
def momentum    = LinearRegValue(delta, momentumLen, 0);
def momPositive = momentum > 0;
def momRising   = momentum > momentum[1];

# ---- VOLUME FILTER ----
def avgVol = Average(volume, 50);
def volOK  = avgVol >= 500000;

# ---- SCAN SIGNAL ----
plot InSqueeze     = squeezeOn and volOK;
plot JustFired     = squeezeFired and volOK;
plot BullishFired  = squeezeFired and momPositive and momRising and volOK;

# ============================================================
# STOCK HACKER SETUP:
#
# FOR "STOCKS IN SQUEEZE" SCAN:
#   Add Study Filter: TTMSqueeze_Scanner → InSqueeze = 1
#   Scan In: S&P 500 | Aggregation: Day
#   → Returns stocks coiling, ready to explode
#
# FOR "SQUEEZE JUST FIRED" SCAN:
#   Add Study Filter: TTMSqueeze_Scanner → JustFired = 1
#   → Returns stocks that fired TODAY (run intraday)
#
# FOR "BULLISH SQUEEZE FIRED" SCAN (highest quality):
#   Add Study Filter: TTMSqueeze_Scanner → BullishFired = 1
#   → Only bullish momentum fires — best long candidates
#
# RUN TIMING:
#   "InSqueeze" → Best run pre-market or after close
#   "JustFired" → Run at 9:45 AM CT after open settles
#   "BullishFired" → Run at 10:00-10:30 AM CT for day trades
# ============================================================
