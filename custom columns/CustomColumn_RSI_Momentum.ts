# Custom Column: RSI Momentum
# This custom column displays the current RSI and highlights overbought/oversold conditions.
input length = 14;
def rsiValue = reference RSI(length = length);
plot RSI_Momentum = rsiValue;
RSI_Momentum.SetDefaultColor(Color.CYAN);
RSI_Momentum.SetLineWeight(2);
RSI_Momentum.SetPaintingStrategy(PaintingStrategy.LINE);
AddLabel(yes, "RSI " + AsText(Round(rsiValue, 0)),
         if rsiValue > 70 then Color.RED
         else if rsiValue < 30 then Color.GREEN
         else Color.YELLOW);
