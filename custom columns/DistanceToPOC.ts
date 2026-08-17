# ============================================================
# DISTANCE TO POC (POINT OF CONTROL) WATCHLIST COLUMN
# Author: Ran Eliahu (@Eliahur7)
# Platform: TD Ameritrade / Schwab ThinkorSwim (TOS)
# Language: ThinkScript
#
# Description:
#   Displays the percentage distance from the current price 
#   to the Daily Point of Control (POC).
#
# Interpretation:
#   - High Positive/Negative %: Mean-reversion candidates 
#     (overextended from the heaviest volume node).
#   - Near 0.0%: Coiling/compressing directly on top of 
#     institutional volume (breakout imminent).
# ============================================================

# ---- VOLUME PROFILE POC ----
profile volProfile = VolumeProfile("time per profile" = "DAY", "on expansion" = no);
def poc = volProfile.GetPointOfControl();

# ---- DISTANCE CALCULATION ----
def distanceToPOC = (close - poc) / poc * 100;

# ---- PLOT ----
plot POC_Dist = distanceToPOC;

# ---- FORMATTING ----
POC_Dist.AssignValueColor(
    if POC_Dist >= 2.0 then Color.GREEN
    else if POC_Dist <= -2.0 then Color.RED
    else if AbsValue(POC_Dist) <= 0.5 then Color.YELLOW
    else Color.WHITE
);
