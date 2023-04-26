const mockData = require("../mockData");

getBalanceSheet = async () => {
  // Fetch balance sheet data from mockData
  const balanceSheet = mockData.map(
    ({ year, month, profitOrLoss, assetsValue }) => ({
      year,
      month,
      profitOrLoss,
      assetsValue
    })
  );

  return balanceSheet;
};

getDecision = async decision => {
  // Return decision mimicing decision s/w
  if (decision.preAssessment > 20) {
    return { desision: "approved" };
  } else {
    return { desision: "rejected" };
  }
};

module.exports = { getBalanceSheet, getDecision };
