# ============================================================
# VOLUME PROFILE SQUEEZE SCANNER
# Author: Ran Eliahu (@Eliahur7)
# Platform: TD Ameritrade / Schwab ThinkorSwim (TOS)
# Language: ThinkScript
# Timeframe: Daily
#
# Description:
#   Identifies stocks where the Value Area (the distance 
#   between the Value Area High and Value Area Low) is 
#   extremely compressed. 
#
# Core Strategy & Edge:
#   A tight Value Area indicates that 70% of the trading 
#   volume occurred in a very narrow price band. This massive 
#   buildup of energy often precedes an explosive volatility 
#   breakout when price finally escapes the node.
# ============================================================

# ---- USER INPUTS ----
input maxCompressionPct = 2.0;  # Max distance between VAH and VAL as a % of price
input minPrice = 10.0;
input minVolume = 1000000;

# ---- VOLUME PROFILE CALCULATIONS ----
# Use highly explicit parameters to ensure Stock Hacker calculates correctly
def dailyCond = GetYYYYMMDD() != GetYYYYMMDD()[1];
profile volProfile = VolumeProfile("startNewProfile" = dailyCond, "onExpansion" = no);
def vah = volProfile.GetHighestValueArea();
def val = volProfile.GetLowestValueArea();

# ---- SQUEEZE METRICS ----
# Calculate the distance between VAH and VAL as a percentage of the closing price
def vaDistance = vah - val;
def vaCompressionPct = (vaDistance / close) * 100;

# ---- FILTERS ----
def isCompressed = vaCompressionPct <= maxCompressionPct;
def validPrice = close >= minPrice;
def validVolume = Average(volume, 20) >= minVolume;

# ---- SCAN TRIGGER ----
plot VPSqueeze = isCompressed and validPrice and validVolume;

# ---- FORMATTING ----
VPSqueeze.AssignValueColor(Color.YELLOW);
