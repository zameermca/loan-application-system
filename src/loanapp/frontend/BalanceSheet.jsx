import React from "react";

function BalanceSheet({ balanceSheetData }) {
  return (
    <div>
      <h2>Balance Sheet</h2>
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Month</th>
            <th>Profit/Loss</th>
            <th>Assets Value</th>
          </tr>
        </thead>
        <tbody>
          {balanceSheetData.map((data, index) => (
            <tr key={index}>
              <td>{data.year}</td>
              <td>{data.month}</td>
              <td>{data.profitOrLoss}</td>
              <td>{data.assetsValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BalanceSheet;
