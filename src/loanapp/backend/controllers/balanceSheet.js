const balanceSheetService = require("../services/balanceSheet");

async function getBalanceSheet1(req, res) {
  const { accountingSoftware } = req.query;
  // Send request to accounting software provider to fetch balance sheet data
  // ...

  // Once balance sheet data is fetched, pass it to the service layer
  const balanceSheet = [
    {
      year: 2020,
      month: 12,
      profitOrLoss: 250000,
      assetsValue: 1234
    },
    {
      year: 2020,
      month: 11,
      profitOrLoss: 1150,
      assetsValue: 5789
    },
    {
      year: 2020,
      month: 10,
      profitOrLoss: 2500,
      assetsValue: 22345
    },
    {
      year: 2020,
      month: 9,
      profitOrLoss: -187000,
      assetsValue: 223452
    }
  ];
  const summarizedData = balanceSheetService.summarizeData(balanceSheet);

  // Send summarized application details to decision engine (in this case, we're just returning mock data)
  const decision = { approved: true };

  // Send final outcome to frontend
  res.json({ applicationDetails: summarizedData, decision });
}

async function getBalanceSheet(req, res) {
  try {
    const balanceSheet = await balanceSheetService.getBalanceSheet();
    res.json({ balanceSheet });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getDecision1(req, res) {
  try {
    const descision = await balanceSheetService.getDecision();
    res.json({ descision });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getDecision(req, res) {
  try {
    const { balanceSheetData, loanAmount } = req.body;
    // Check if the business has made a profit in the last 12 months
    const last12Months = balanceSheetData.slice(0, 12);
    const hasProfit = last12Months.some(({ profitOrLoss }) => profitOrLoss > 0);

    // Calculate the average asset value across 12 months
    const totalAssetValue = last12Months.reduce(
      (acc, { assetsValue }) => acc + assetsValue,
      0
    );
    const avgAssetValue = totalAssetValue / 12;
    console.log("getDecision..........3");
    // Calculate the preAssessment value based on the rules
    let preAssessment = 20;
    if (hasProfit) {
      preAssessment = 60;
    }
    if (avgAssetValue > loanAmount) {
      preAssessment = 100;
    }
    console.log("avgAssetValue..........3  ", avgAssetValue);
    console.log("preAssessment..........3  ", preAssessment);
    console.log("loanAmount..........3  ", loanAmount);
    console.log("hasProfit..........3  ", hasProfit);

    // Get the required business details
    const { name, yearEstablished } = balanceSheetData[0];
    const profitLossSummary = balanceSheetData.reduce(
      (acc, { year, profitOrLoss }) => {
        acc[year] = profitOrLoss;
        return acc;
      },
      {}
    );
    // Send the final output to the decision engine
    const decision = {
      preAssessment,
      businessDetails: {
        name,
        yearEstablished,
        profitLossSummary
      }
    };
    const finalDescision = await balanceSheetService.getDecision(decision);
    res.json({ finalDescision });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { getBalanceSheet, getDecision };
