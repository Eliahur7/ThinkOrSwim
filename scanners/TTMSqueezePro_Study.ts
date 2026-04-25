# ============================================================
# TTM SQUEEZE PRO — ENHANCED MOMENTUM STUDY
# Author: Ran Eliahu (@Eliahur7)
# Based on: John Carter's TTM Squeeze concept
# Description: Identifies periods of low volatility compression
#              (Bollinger Bands inside Keltner Channels) followed
#              by explosive momentum breakouts. Enhanced version
#              adds multi-timeframe squeeze detection and
#              histogram color-coding for momentum direction.
#
# Timeframe: 5-min (day trading) | Daily (swing trading)
# ============================================================

# ============================================================
# INPUTS
# ============================================================
input bbLength      = 20;     # Bollinger Band length
input bbMult        = 2.0;    # Bollinger Band multiplier
input kcLength      = 20;     # Keltner Channel length
input kcMult        = 1.5;    # Keltner Channel multiplier (standard)
input kcMultWide    = 2.0;    # Keltner Channel multiplier (wide - for pro)
input momentumLen   = 12;     # Momentum calculation length
input alertOnFire   = YES;    # Alert when squeeze fires

# ============================================================
# BOLLINGER BANDS
# ============================================================
def bbBasis  = Average(close, bbLength);
def bbDev    = bbMult * StdDev(close, bbLength);
def bbUpper  = bbBasis + bbDev;
def bbLower  = bbBasis - bbDev;

# ============================================================
# KELTNER CHANNELS (True Range based)
# ============================================================
def kcBasis     = Average(close, kcLength);
def trueRange   = TrueRange(high, close, low);
def atr         = Average(trueRange, kcLength);
def kcUpper     = kcBasis + kcMult * atr;
def kcLower     = kcBasis - kcMult * atr;
def kcUpperWide = kcBasis + kcMultWide * atr;
def kcLowerWide = kcBasis - kcMultWide * atr;

# ============================================================
# SQUEEZE CONDITIONS
# ============================================================
# Squeeze ON  = BB inside KC (compression, coiling energy)
# Squeeze OFF = BB outside KC (expansion, energy releasing)

def squeezeOn     = bbUpper < kcUpper     and bbLower > kcLower;
def squeezeOff    = bbUpper >= kcUpper    or  bbLower <= kcLower;
def squeezeProOn  = bbUpper < kcUpperWide and bbLower > kcLowerWide;

# Detect the exact bar when squeeze fires (transitions OFF)
def squeezeFired  = squeezeOn[1] and squeezeOff; # Previous bar ON, now OFF

# ============================================================
# MOMENTUM OSCILLATOR (Delta of Momentum)
# ============================================================
def midLine   = (Highest(high, momentumLen) + Lowest(low, momentumLen)) / 2;
def delta     = close - (midLine + Average(close, momentumLen)) / 2;
def momentum  = LinearRegValue(delta, momentumLen, 0);

# Momentum direction and acceleration
def momRising    = momentum > momentum[1];
def momFalling   = momentum < momentum[1];
def momPositive  = momentum > 0;
def momNegative  = momentum < 0;

# ============================================================
# HISTOGRAM PLOTS
# ============================================================
# Color logic:
#   Bright Green  = positive AND rising  (strongest bull)
#   Dark Green    = positive BUT falling (bull fading)
#   Bright Red    = negative AND falling (strongest bear)
#   Dark Red      = negative BUT rising  (bear fading)

plot MomentumHist = momentum;
MomentumHist.setPaintingStrategy(PaintingStrategy.HISTOGRAM);
MomentumHist.assignValueColor(
    if momPositive and momRising  then Color.GREEN
    else if momPositive           then CreateColor(0, 100, 0)   # Dark green
    else if momNegative and momFalling then Color.RED
    else                               CreateColor(139, 0, 0)   # Dark red
);

# Zero line
plot ZeroLine = 0;
ZeroLine.setDefaultColor(Color.GRAY);
ZeroLine.setLineWeight(1);

# ============================================================
# SQUEEZE DOTS (plotted on zero line)
# ============================================================
# Black dot  = Squeeze ON  (coiling, do not trade yet)
# Gray dot   = No squeeze  (normal volatility)
# Red dot    = Squeeze just fired! (potential entry)

plot SqueezeDot = 0;
SqueezeDot.setPaintingStrategy(PaintingStrategy.POINTS);
SqueezeDot.setLineWeight(3);
SqueezeDot.assignValueColor(
    if squeezeFired  then Color.RED
    else if squeezeOn then Color.BLACK
    else Color.GRAY
);

# ============================================================
# ALERTS
# ============================================================
Alert(alertOnFire and squeezeFired and momPositive,
      "TTM Squeeze BULLISH FIRE — " + GetSymbol(),
      Alert.BAR,
      Sound.Ding);

Alert(alertOnFire and squeezeFired and momNegative,
      "TTM Squeeze BEARISH FIRE — " + GetSymbol(),
      Alert.BAR,
      Sound.Bell);

# ============================================================
# USAGE GUIDE:
#
# SETUP FOR DAY TRADING (5-min chart):
#   1. Apply study to 5-min chart
#   2. Wait for Black dots (squeeze building)
#   3. Enter when Red dot appears (squeeze fires)
#      + Momentum histogram turning GREEN = Long
#      + Momentum histogram turning RED   = Short
#   4. Target: 1.5x-2x the ATR from entry
#   5. Stop: Below/above the squeeze low/high
#
# SETUP FOR SWING TRADING (Daily chart):
#   1. Apply study to Daily chart
#   2. Run scanner to find stocks in squeeze
#   3. Same entry logic, wider stops
#   4. Target: Next major resistance/support level
#
# PRO TIP: Highest probability setups occur when:
#   - Multiple timeframes show squeeze simultaneously
#   - Volume expands on the fire bar
#   - Broader market trend aligns with trade direction
# ============================================================
