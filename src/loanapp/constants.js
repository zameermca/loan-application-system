const API_ENDPOINT = "backend-url/get-balance-sheet";

const accountingSoftwareProviders = [
  {
    value: "",
    label: "Select an accounting software provider"
  },
  {
    value: "xero",
    label: "Xero"
  },
  {
    value: "myob",
    label: "MYOB"
  }
];

module.exports = {
  API_ENDPOINT,
  accountingSoftwareProviders
};
