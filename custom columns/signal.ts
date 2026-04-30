input trendLen = 21;
input momLen = 5;
input agg = AggregationPeriod.WEEK;

def ema21 = ExpAverage(close(period = agg), trendLen);
def emaSlope = ema21 > ema21[1];
def momentum = close(period = agg) - close(period = agg)[momLen];
def momAccelerating = momentum > momentum[1];

def weekVol = volume(period = agg);
def avgWeekVol = Average(volume(period = agg), 10);
def volConfirmed = weekVol > avgWeekVol * 1.1;

def emaDistance = (close(period = agg) - ema21) / ema21 * 100;
def notOverextended = emaDistance < 10;
def notTooClose = emaDistance > 1;

# Core States
def isAboveEMA = close(period = agg) > ema21 and emaSlope;
def isBelowEMA = close(period = agg) < ema21;
def isMomUp = momentum > 0;
def isMomDown = momentum < 0;

# Entry quality flag
def strongEntry = isAboveEMA and isMomUp and momAccelerating 
                  and volConfirmed and notOverextended and notTooClose;

AddLabel(yes,
    if strongEntry then "STRONG BULL ✓"
    else if isAboveEMA and isMomUp then "STRONG BULL"
    else if isAboveEMA and isMomDown then "DIP BUY"
    else if isBelowEMA and isMomDown then "BEAR / AVOID"
    else if isBelowEMA and isMomUp then "BEAR RALLY"
    else "NEUTRAL",

    if strongEntry then Color.GREEN
    else if isAboveEMA and isMomUp then Color.DARK_GREEN
    else if isAboveEMA and isMomDown then Color.YELLOW
    else if isBelowEMA and isMomDown then Color.RED
    else if isBelowEMA and isMomUp then Color.ORANGE
    else Color.GRAY
);

#AssignBackgroundColor(
#    if strongEntry then Color.GREEN
#    else if isAboveEMA and isMomUp then Color.DARK_GREEN
#    else if isAboveEMA and isMomDown then Color.DARK_ORANGE
#    else if isBelowEMA and isMomDown then Color.DARK_RED
#    else Color.BLACK
#);