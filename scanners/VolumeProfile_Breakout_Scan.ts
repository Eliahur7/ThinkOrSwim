# ============================================================
# VALUE AREA BREAKOUT SCANNER
# Author: Ran Eliahu (@ran-eliahu)
# Platform: TD Ameritrade / Schwab ThinkorSwim (TOS)
# Language: ThinkScript
# Timeframe: Daily
#
# Description:
#   Identifies stocks breaking out above their Value Area 
#   High (VAH) with strong relative volume.
#
# Core Strategy & Edge:
#   When price leaves the Value Area (where 70% of volume 
#   traded), it enters an area of low liquidity (Low Volume 
#   Nodes). Price tends to move rapidly through these zones 
#   until it finds the next volume node, creating high R:R 
#   momentum setups.
# ============================================================

# ---- USER INPUTS ----
input minPrice = 10.0;
input minVolume = 1000000;
input volumeMultiplier = 1.25; # 25% above average volume

# ---- VOLUME PROFILE CALCULATIONS ----
# Use highly explicit parameters to ensure Stock Hacker calculates correctly
def dailyCond = GetYYYYMMDD() != GetYYYYMMDD()[1];
profile volProfile = VolumeProfile("startNewProfile" = dailyCond, "onExpansion" = no);
def vah = volProfile.GetHighestValueArea();

# ---- BREAKOUT METRICS ----
# Price crosses above VAH or closes strongly above it
def breakout = close crosses above vah or (close > vah and close[1] <= vah[1]);

# ---- VOLUME CONFIRMATION ----
def avgVol = Average(volume, 20);
def volumeSurge = volume > (avgVol * volumeMultiplier);

# ---- FILTERS ----
def validPrice = close >= minPrice;
def validVolume = avgVol >= minVolume;

# ---- SCAN TRIGGER ----
plot VABreakout = breakout and volumeSurge and validPrice and validVolume;

# ---- FORMATTING ----
VABreakout.AssignValueColor(Color.GREEN);
