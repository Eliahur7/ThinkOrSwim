# OrderBlock_Study.ts
# Author: Ran Eliahu | github.com/Eliahur7
# Platform: TD Ameritrade / Schwab ThinkorSwim (TOS)
# Language: ThinkScript
# Description: Detects and plots Bullish and Bearish Order Blocks on the chart
#              with visual zones, labels, and optional alerts.

declare upper;

# ─────────────────────────────────────────────
# INPUTS
# ─────────────────────────────────────────────
input lookback         = 3;      # Candles to look back for OB detection
input zoneOpacity      = 30;     # Zone fill opacity (0–100)
input showLabels       = yes;    # Show OB zone labels
input showBullOB       = yes;    # Display Bullish Order Blocks
input showBearOB       = yes;    # Display Bearish Order Blocks
input maxZones         = 5;      # Max number of active zones to draw per side
input mitigatedFade    = yes;    # Fade (dim) a zone once price trades through it
input alertOnTouch     = no;     # Trigger alert when price enters an OB zone

# ─────────────────────────────────────────────
# COLORS
# ─────────────────────────────────────────────
DefineGlobalColor("BullOB_Fill",   Color.GREEN);
DefineGlobalColor("BullOB_Border", Color.DARK_GREEN);
DefineGlobalColor("BearOB_Fill",   Color.RED);
DefineGlobalColor("BearOB_Border", Color.DARK_RED);
DefineGlobalColor("Mitigated",     Color.GRAY);

# ─────────────────────────────────────────────
# CORE LOGIC — BULLISH ORDER BLOCK
# A Bullish OB is the last DOWN candle (close < open) immediately
# before a strong impulsive UP move that breaks structure.
# We identify it as: a red candle followed by a gap-up or strong
# green candle whose body exceeds the ATR threshold.
# ─────────────────────────────────────────────
def atr = Average(TrueRange(high, close, low), 14);
def bodySize    = AbsValue(close - open);
def isGreenBar  = close > open;
def isRedBar    = close < open;

# Strong impulsive move = body > 0.5 * ATR
def strongUp    = isGreenBar and bodySize > 0.5 * atr;
def strongDown  = isRedBar  and bodySize > 0.5 * atr;

# Bullish OB: last red candle before a strong up move
def bullOB_trigger = isRedBar[1] and strongUp;
# Bearish OB: last green candle before a strong down move
def bearOB_trigger = isGreenBar[1] and strongDown;

# OB Zone boundaries
def bullOB_high = if bullOB_trigger then high[1] else Double.NaN;
def bullOB_low  = if bullOB_trigger then low[1]  else Double.NaN;
def bearOB_high = if bearOB_trigger then high[1] else Double.NaN;
def bearOB_low  = if bearOB_trigger then low[1]  else Double.NaN;

# ─────────────────────────────────────────────
# MITIGATION — Zone is "mitigated" once price
# closes back through the opposite boundary
# ─────────────────────────────────────────────
def bullMitigated = bullOB_trigger[lookback] and close < bullOB_low[lookback];
def bearMitigated = bearOB_trigger[lookback] and close > bearOB_high[lookback];

# ─────────────────────────────────────────────
# PRICE INSIDE ZONE — for alerts and highlighting
# ─────────────────────────────────────────────
def insideBullOB = close <= bullOB_high[lookback] and close >= bullOB_low[lookback];
def insideBearOB = close <= bearOB_high[lookback] and close >= bearOB_low[lookback];

# ─────────────────────────────────────────────
# PLOTS — Bullish OB Boundaries
# ─────────────────────────────────────────────
plot BullOB_TopLine = if showBullOB and !IsNaN(bullOB_high) then bullOB_high else Double.NaN;
BullOB_TopLine.SetDefaultColor(GlobalColor("BullOB_Border"));
BullOB_TopLine.SetLineWeight(2);
BullOB_TopLine.SetStyle(Curve.SHORT_DASH);
BullOB_TopLine.HideBubble();

plot BullOB_BotLine = if showBullOB and !IsNaN(bullOB_low) then bullOB_low else Double.NaN;
BullOB_BotLine.SetDefaultColor(GlobalColor("BullOB_Border"));
BullOB_BotLine.SetLineWeight(2);
BullOB_BotLine.SetStyle(Curve.SHORT_DASH);
BullOB_BotLine.HideBubble();

# ─────────────────────────────────────────────
# PLOTS — Bearish OB Boundaries
# ─────────────────────────────────────────────
plot BearOB_TopLine = if showBearOB and !IsNaN(bearOB_high) then bearOB_high else Double.NaN;
BearOB_TopLine.SetDefaultColor(GlobalColor("BearOB_Border"));
BearOB_TopLine.SetLineWeight(2);
BearOB_TopLine.SetStyle(Curve.SHORT_DASH);
BearOB_TopLine.HideBubble();

plot BearOB_BotLine = if showBearOB and !IsNaN(bearOB_low) then bearOB_low else Double.NaN;
BearOB_BotLine.SetDefaultColor(GlobalColor("BearOB_Border"));
BearOB_BotLine.SetLineWeight(2);
BearOB_BotLine.SetStyle(Curve.SHORT_DASH);
BearOB_BotLine.HideBubble();

# ─────────────────────────────────────────────
# CLOUD FILLS — Zone shading between top/bottom lines
# ─────────────────────────────────────────────
AddCloud(
    if showBullOB then BullOB_TopLine else Double.NaN,
    if showBullOB then BullOB_BotLine else Double.NaN,
    GlobalColor("BullOB_Fill"),
    GlobalColor("BullOB_Fill")
);

AddCloud(
    if showBearOB then BearOB_TopLine else Double.NaN,
    if showBearOB then BearOB_BotLine else Double.NaN,
    GlobalColor("BearOB_Fill"),
    GlobalColor("BearOB_Fill")
);

# ─────────────────────────────────────────────
# LABELS — Print zone price range at formation
# ─────────────────────────────────────────────
AddChartBubble(
    showLabels and showBullOB and bullOB_trigger,
    bullOB_low[1],
    "Bull OB\n" + Round(bullOB_low[1], 2) + " – " + Round(bullOB_high[1], 2),
    Color.GREEN,
    no
);

AddChartBubble(
    showLabels and showBearOB and bearOB_trigger,
    bearOB_high[1],
    "Bear OB\n" + Round(bearOB_low[1], 2) + " – " + Round(bearOB_high[1], 2),
    Color.RED,
    yes
);

# ─────────────────────────────────────────────
# MITIGATION LABELS — Flag when zone is broken
# ─────────────────────────────────────────────
AddChartBubble(
    mitigatedFade and bullMitigated,
    low,
    "Bull OB\nMitigated",
    Color.GRAY,
    no
);

AddChartBubble(
    mitigatedFade and bearMitigated,
    high,
    "Bear OB\nMitigated",
    Color.GRAY,
    yes
);

# ─────────────────────────────────────────────
# ALERTS — Fires when price enters a zone
# ─────────────────────────────────────────────
Alert(
    alertOnTouch and insideBullOB,
    "Price entered Bullish OB zone — potential long setup",
    Alert.BAR,
    Sound.Chimes
);

Alert(
    alertOnTouch and insideBearOB,
    "Price entered Bearish OB zone — potential short/exit setup",
    Alert.BAR,
    Sound.Bell
);

# ─────────────────────────────────────────────
# BACKGROUND HIGHLIGHT — Subtle bar coloring
# when price is inside an active OB zone
# ─────────────────────────────────────────────
AssignBackgroundColor(
    if insideBullOB then Color.DARK_GREEN
    else if insideBearOB then Color.DARK_RED
    else Color.CURRENT
);
