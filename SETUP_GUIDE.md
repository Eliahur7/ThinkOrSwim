# ThinkorSwim Setup Guide

## Step-by-Step: Importing ThinkScript Files

### Studies (Chart Indicators)

1. Open **ThinkorSwim** desktop app
2. Go to the **Charts** tab
3. Click the **Studies** button (beaker icon, top right of chart)
4. Select **Edit Studies**
5. In the bottom left, click **Create**
6. A ThinkScript editor will open — **paste the full contents** of the `.ts` file
7. Name your study (match the filename for organization)
8. Click **OK** → **Apply**

The study will now appear in your chart studies list and can be applied to any chart.

---

### Scanners (Stock Hacker)

1. Open ThinkorSwim → **Scan** tab (top navigation)
2. Select **Stock Hacker**
3. Under filters, click **Add Study Filter**
4. Click the **filter name** to open the edit dialog
5. Click **Edit ThinkScript** (or the script icon)
6. **Paste the full contents** of the scanner `.ts` file
7. Click **OK**
8. Set the filter plot to equal `1` (true) — this activates the signal

#### Adding Fundamental Filters (Required for Elite Fundamentals Scanner)

Fundamental filters cannot be set via ThinkScript — they must be added manually:

1. In Stock Hacker, click **Add Fundamental Filter**
2. In the Category dropdown, select **Fundamentals**
3. Add each condition:

| Filter Name | Operator | Value |
|------------|----------|-------|
| P/E Ratio | is between | 5 and 35 |
| Price/Book Value Ratio | is less than | 10 |
| Return on Equity | is greater than | 15 |
| Gross Profit Margin | is greater than | 40 |
| Current Ratio | is greater than | 1.5 |
| Book Value Per Share Growth | is greater than | 0 |

---

### Setting the Scan Universe

For best results with these scanners:

| Scanner | Recommended Universe |
|---------|---------------------|
| Elite Fundamentals | S&P 500 |
| Fallen Angels | S&P 500 |
| Institutional Accumulation | S&P 500 or Russell 1000 |
| TTM Squeeze | S&P 500 (InSqueeze) / All Stocks (JustFired) |

**To set universe:** In Stock Hacker, use the **Scan In** dropdown at the top.

---

### Saving and Scheduling Scans

1. After configuring your scan, click the **disk icon** (Save Scan Query)
2. Name it (e.g., "Fallen Angels - Daily")
3. Access saved scans from the **Load Scan Query** button

**To schedule automatic scans:**
- TOS does not auto-run scans, but you can set up **Alerts** on individual stocks found in scan results
- Bookmark the scan and run it at your designated times (see timing recommendations in each scanner file)

---

## Recommended Workflow

### Pre-Market (8:00–8:30 AM CT)
- Run **Elite Fundamentals** scan → review watchlist
- Run **InSqueeze** TTM Squeeze scan → note coiling stocks

### Market Open (8:30–9:00 AM CT)
- Monitor watchlist for gap plays
- Watch for TTM Squeeze fires on open

### Primary Trading Window (9:00–10:30 AM CT)
- Run **JustFired** TTM Squeeze scan at 9:45 AM
- Execute day trades based on 5-min chart signals

### After Market Close
- Run **Fallen Angels** scan → build next-day watchlist
- Run **Institutional Accumulation** scan → identify swing candidates
- Review and update GTC orders

---

## Troubleshooting

**Scan returns 0 results:**
- Loosen one filter at a time to identify which is most restrictive
- Check that Scan In universe is set correctly
- Verify aggregation period matches the scanner's intended timeframe

**Study not plotting correctly:**
- Ensure aggregation period matches (5-min for day trading studies)
- Check that all input values are within valid ranges
- Re-paste the script if TOS shows compilation errors

**Scanner hangs or times out:**
- Avoid using custom ThinkScript studies as scan filters on large universes
- Prefer built-in TOS Fundamental filters for fundamental criteria
- Limit custom script scans to S&P 500 or similar bounded universe
