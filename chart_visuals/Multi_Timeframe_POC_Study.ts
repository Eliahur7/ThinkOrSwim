# ============================================================
# MULTI-TIMEFRAME POINT OF CONTROL (POC) MAGNETS
# Author: Ran Eliahu (@Eliahur7)
# Platform: TD Ameritrade / Schwab ThinkorSwim (TOS)
# Language: ThinkScript
# Timeframe: Recommended for Intraday (1m, 5m, 15m) or Daily
#
# Description:
#   Plots the Point of Control (POC) for the Daily, Weekly, 
#   and Monthly profiles. These heavy volume nodes act as 
#   massive "magnets" for price. Institutional algos often 
#   target these untested (naked) POC levels.
#
# Features:
#   - Daily POC (Cyan)
#   - Weekly POC (Magenta) 
#   - Monthly POC (Yellow)
#   - Customizable line styles and toggles
# ============================================================

input showDailyPOC = yes;
input showWeeklyPOC = yes;
input showMonthlyPOC = yes;

# ---- DAILY POC ----
profile dailyVol = VolumeProfile("time per profile" = "DAY", "on expansion" = no);
def dailyPOCLevel = if showDailyPOC then dailyVol.GetPointOfControl() else Double.NaN;
plot DailyPOC = dailyPOCLevel;
DailyPOC.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
DailyPOC.SetDefaultColor(Color.CYAN);
DailyPOC.SetLineWeight(2);
DailyPOC.HideBubble();
DailyPOC.HideTitle();

# ---- WEEKLY POC ----
profile weeklyVol = VolumeProfile("time per profile" = "WEEK", "on expansion" = no);
def weeklyPOCLevel = if showWeeklyPOC then weeklyVol.GetPointOfControl() else Double.NaN;
plot WeeklyPOC = weeklyPOCLevel;
WeeklyPOC.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
WeeklyPOC.SetDefaultColor(Color.MAGENTA);
WeeklyPOC.SetLineWeight(2);
WeeklyPOC.SetStyle(Curve.SHORT_DASH);
WeeklyPOC.HideBubble();
WeeklyPOC.HideTitle();

# ---- MONTHLY POC ----
profile monthlyVol = VolumeProfile("time per profile" = "MONTH", "on expansion" = no);
def monthlyPOCLevel = if showMonthlyPOC then monthlyVol.GetPointOfControl() else Double.NaN;
plot MonthlyPOC = monthlyPOCLevel;
MonthlyPOC.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
MonthlyPOC.SetDefaultColor(Color.YELLOW);
MonthlyPOC.SetLineWeight(2);
MonthlyPOC.SetStyle(Curve.LONG_DASH);
MonthlyPOC.HideBubble();
MonthlyPOC.HideTitle();

# ---- CLOUD SHADING (Optional: Value Area) ----
input showValueAreaCloud = yes;
def vah = dailyVol.GetHighestValueArea();
def val = dailyVol.GetLowestValueArea();
AddCloud(if showValueAreaCloud then vah else Double.NaN, val, CreateColor(40, 40, 40), CreateColor(40, 40, 40));
