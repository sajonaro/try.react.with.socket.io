const guid = require("./guid.js");

let main = {
  //titles
  ValidationQueue: "Validation Queue",
  MaintenanceQueue: "Maintenance Queue",
  ClientRecords: "Client Records",
  ClientRecord: "Client Record",
  curatedEntities: "Curated/processed Enities",

  //functions
  createEntity: (
    AVID,
    legalName,
    country,
    address,
    GLEIF,
    modifiedDate,
    clientData,
    key
  ) => {
    return {
      AVID,
      legalName,
      country,
      address,
      GLEIF,
      modifiedDate,
      clientData,
      key
    };
  },

  createClientRecord: (
    AVID,
    legalName,
    country,
    address,
    GLEIF,
    modifiedDate,
    clientId,
    clientData,
    key
  ) => {
    return {
      key,
      clientId,
      clientData,
      AVID,
      legalName,
      country,
      address,
      GLEIF,
      modifiedDate
    };
  },

  createEmptyClientRecord: () => {
    return main.createClientRecord("", "", "", "", "", "", "", "", guid());
  },

  getSampleClientRecods: () => {
    return [
      main.createClientRecord(
        "45412345",
        "Coca Cola INC",
        "France",
        "Champ de Mars, 5 Avenue Anatole France, 75007 Paris",
        4,
        Date.now(),
        1,
        "XYZ ",
        guid()
      ),
      main.createClientRecord(
        "8787",
        "ACME ",
        "United Kingdom",
        "St Katharine's & Wapping, London EC3N 4AB, United Kingdom",
        5,
        Date.now(),
        2,
        "woddle doodle",
        guid()
      ),
      main.createClientRecord(
        "1234",
        "North Wind LLC ",
        "United Satates",
        "Golden Gate Bridge, San Francisco, CA, United States",
        12,
        Date.now(),
        3,
        "abcdefg",
        guid()
      ),
      main.createClientRecord(
        "",
        "Coca Cola INC",
        "",
        "",
        "",
        "",
        3,
        "",
        guid()
      )
    ];
  },

  onCreateClientRecord: () => {
    console.log("create client record");
  }
};

module.exports = main;
