# ============================================================
# ELITE FUNDAMENTALS SCANNER
# Author: Ran Eliahu (@Eliahur7)
# Description: Filters for high-quality stocks with strong
#              fundamentals suitable for swing and position trading.
#
# Scan Criteria:
#   - P/E Ratio between 5 and 35 (value + growth sweet spot)
#   - Price/Book Value Ratio < 10
#   - Return on Equity (ROE) >= 15%
#   - Gross Profit Margin >= 40%
#   - Current Ratio >= 1.5 (liquidity check)
#   - Book Value Per Share Growth > 0 (compounding equity)
#
# Usage: Import into ThinkorSwim Stock Hacker → Scan
#        Use built-in Fundamental filters for each condition
#        (Custom ThinkScript not required for fundamental filters)
# ============================================================

# ---- PRICE FILTER (add in Stock Hacker Study filter) ----
# Ensures stock is tradeable and liquid
def price = close;
def minPrice = 10.00;
def maxPrice = 500.00;

plot PriceInRange = price >= minPrice and price <= maxPrice;

# ---- VOLUME FILTER ----
# Minimum average daily volume for liquidity
def avgVol = Average(volume, 50);
def minAvgVolume = 500000;

plot VolumeOK = avgVol >= minAvgVolume;

# ---- TREND FILTER ----
# Price must be above 200-day moving average (in uptrend)
def ma200 = Average(close, 200);
plot AboveMa200 = close > ma200;

# ---- COMBINED SIGNAL ----
# All technical conditions must be true
# (Fundamental conditions set separately in Stock Hacker UI)
plot EliteFundamentalsSignal = PriceInRange and VolumeOK and AboveMa200;

# ============================================================
# THINKORSWIM STOCK HACKER SETUP INSTRUCTIONS:
#
# Step 1 - Add Study Filter:
#   Filter > Add Study Filter > EliteFundamentals_Scanner
#   Set EliteFundamentalsSignal = 1 (true)
#
# Step 2 - Add Fundamental Filters:
#   Filter > Add Fundamental Filter:
#
#   [Fundamentals Category]
#   1. P/E Ratio           → between 5 and 35
#   2. Price/Book Value    → less than 10
#   3. Return on Equity    → greater than 15
#   4. Gross Profit Margin → greater than 40
#   5. Current Ratio       → greater than 1.5
#   6. Book Value Per Share Growth → greater than 0
#
# Step 3 - Set Universe:
#   Scan In: S&P 500  (or All Stocks for broader results)
#
# Step 4 - Run scan and sort by ROE descending for best results
# ============================================================
