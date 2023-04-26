import React, { useState } from "react";
import { API_ENDPOINT, accountingSoftwareProviders } from "../constants";
import "./LoanApplicationForm.css";
import BalanceSheet from "./BalanceSheet";

function LoanApplicationForm() {
  const [businessDetails, setBusinessDetails] = useState({});
  const [loanAmount, setLoanAmount] = useState("");
  const [accountingSoftware, setAccountingSoftware] = useState("");
  const [balanceSheetData, setBalanceSheetData] = useState(null);
  const [decision, setdecision] = useState(null);

  const handleBusinessDetailsChange = event => {
    setBusinessDetails({
      ...businessDetails,
      [event.target.name]: event.target.value
    });
  };

  const handleLoanAmountChange = event => {
    setLoanAmount(event.target.value);
  };

  const handleAccountingSoftwareChange = event => {
    setAccountingSoftware(event.target.value);
  };

  const handleGetBalanceSheet = () => {
    fetch(`/${API_ENDPOINT}?accountingSoftware=${accountingSoftware}`, {
      method: "GET"
    })
      .then(response => response.json())
      .then(data => {
        console.log("data......", data);
        setBalanceSheetData(data.balanceSheet);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleSubmit = event => {
    event.preventDefault();
    fetch(`/${API_ENDPOINT}/getDecision`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        balanceSheetData: balanceSheetData,
        loanAmount: loanAmount
      })
    })
      .then(response => response.json())
      .then(data => {
        setdecision(data);
        console.log("data......", data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label>
          Business Name:
          <input
            type="text"
            name="businessName"
            value={businessDetails.businessName}
            onChange={handleBusinessDetailsChange}
          />
        </label>
        <label>
          Year Established:
          <input
            type="text"
            name="yearEstablished"
            value={businessDetails.yearEstablished}
            onChange={handleBusinessDetailsChange}
          />
        </label>
        <label>
          Loan Amount:
          <input
            type="text"
            name="loanAmount"
            value={loanAmount}
            onChange={handleLoanAmountChange}
          />
        </label>
        <label>
          Accounting Software Provider:
          <select
            value={accountingSoftware}
            onChange={handleAccountingSoftwareChange}
          >
            {accountingSoftwareProviders.map(provider => (
              <option key={provider.value} value={provider.value}>
                {provider.label}
              </option>
            ))}
          </select>
        </label>
        <button type="button" onClick={handleGetBalanceSheet}>
          Get Balance Sheet
        </button>
        <button type="submit">Submit</button>
      </form>
      {decision && (
        <p style={{ fontWeight: "bold", color: "red" }}>
          Your loan is {decision.finalDescision.desision}
        </p>
      )}
      {balanceSheetData && <BalanceSheet balanceSheetData={balanceSheetData} />}
    </div>
  );
}

export default LoanApplicationForm;
