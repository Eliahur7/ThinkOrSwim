# Custom Column: Trend Strength
# This custom column combines moving average trend direction with ADX strength.
input fastLength = 9;
input slowLength = 21;
input adxLength = 14;
def emaFast = ExpAverage(close, fastLength);
def emaSlow = ExpAverage(close, slowLength);
def adxValue = ADX(adxLength);
def trendDirection = emaFast - emaSlow;
plot Trend_Strength = if trendDirection >= 0 then adxValue else -adxValue;
Trend_Strength.SetDefaultColor(if trendDirection >= 0 then Color.GREEN else Color.RED);
Trend_Strength.SetLineWeight(2);
AddLabel(yes, "ADX " + AsText(Round(adxValue, 0)),
         if adxValue >= 25 then Color.GREEN else Color.GRAY);
