const mockData = require("../mockData");

function summarizeData(balanceSheet) {
  // Apply rules and summarize application details
  const applicationDetails = {
    businessName: "ABC Company",
    yearEstablished: "2010",
    summaryOfProfitOrLoss: "$10,000",
    preAssessmentValue: "$100,000"
  };
  return applicationDetails;
}

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

  // Return balance sheet
  return balanceSheet;
};

getDecision = async decision => {
  // Return balance sheet
  if (decision.preAssessment > 20) {
    return { desision: "approved" };
  } else {
    return { desision: "rejected" };
  }
};

module.exports = { summarizeData, getBalanceSheet, getDecision };
