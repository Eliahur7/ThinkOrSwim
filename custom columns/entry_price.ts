input support_length = 20;
input trend_length = 50;
input atr_factor = 0.5;
def sma50 = SimpleMovingAvg(close, trend_length);
def isUptrend = close > sma50;
def supportPrice = Lowest(low[1], support_length);
def atr = reference ATR(length = 14, averageType = AverageType.SIMPLE);
def nearSupport = low <= (supportPrice + (atr * atr_factor));
def isBouncing = close > high[1];
def buySignal = nearSupport[1] and isBouncing and isUptrend;
AssignBackgroundColor(if buySignal then Color.DARK_GREEN
                     else if nearSupport and isUptrend then Color.DARK_ORANGE
                     else Color.BLACK);
plot data = supportPrice;
data.AssignValueColor(if buySignal then Color.GREEN
                     else if nearSupport and isUptrend then Color.ORANGE
                     else Color.GRAY);