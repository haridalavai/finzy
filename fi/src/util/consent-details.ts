import { create_UUID } from "./uuid";

const createData = (mobileNumber: string) => {
  const dateNow = new Date();
  const expiry = new Date(dateNow.getTime() + 600000);

  var data = JSON.stringify({
    ver: "1.0",
    timestamp: dateNow.toISOString(),
    txnid: create_UUID(),
    ConsentDetail: {
      consentStart: dateNow.toISOString(),
      consentExpiry: expiry.toISOString(),
      consentMode: "VIEW",
      fetchType: "ONETIME",
      consentTypes: ["TRANSACTIONS", "PROFILE", "SUMMARY"],
      fiTypes: [
        "DEPOSIT",
        "RECURRING_DEPOSIT",
        "TERM_DEPOSIT",
        "CREDIT_CARD",
        "CD",
        "IDR",
        "ULIP",
        "EPF",
        "PPF",
        "MUTUAL_FUNDS",
        "DEBENTURES",
        "ETF",
        "NPS",
        "GOVT_SECURITIES",
        "CP",
        "REIT",
        "INVIT",
        "EQUITIES",
        "CIS",
        "AIF",
        "BONDS",
        "INSURANCE_POLICIES",
        "SIP",
      ],
      DataConsumer: { id: "FIU" },
      Customer: { id: mobileNumber + "@setu-aa" },
      Purpose: {
        code: "101",
        refUri: "https://api.rebit.org.in/aa/purpose/101.xml",
        text: "Wealth management service",
        Category: { type: "string" },
      },
      FIDataRange: {
        from: "2020-01-06T11:39:57.153Z",
        to: "2021-10-30T14:25:33.440Z",
      },
      DataLife: { unit: "MONTH", value: 0 },
      Frequency: { unit: "MONTH", value: 5 },
      DataFilter: [
        {
          type: "TRANSACTIONAMOUNT",
          operator: ">=",
          value: "10",
        },
      ],
    },
  });

  return data;
};

export { createData };
