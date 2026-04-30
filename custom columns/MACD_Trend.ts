input fastLength = 12;
input slowLength = 26;
input MACDLength = 9;
def diff = reference MACD(fastLength, slowLength, MACDLength).Diff;
plot data = diff;
data.AssignValueColor(if diff > diff[1] then Color.UPTICK else Color.DOWNTICK);
AssignBackgroundColor(if diff > diff[1] then Color.DARK_GREEN else Color.DARK_RED);