# Custom Column: Volume Surge
# This custom column measures current volume relative to the 20-period average.
input averageLength = 20;
def avgVol = Average(volume, averageLength);
def surge = if avgVol > 0 then volume / avgVol else 1;
plot Volume_Surge = surge;
Volume_Surge.SetDefaultColor(Color.ORANGE);
Volume_Surge.SetLineWeight(2);
AddLabel(yes, "Vol Surge " + AsText(Round(surge, 2)) + "x",
         if surge >= 2 then Color.GREEN else Color.GRAY);
