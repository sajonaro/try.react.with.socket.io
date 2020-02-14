import React, { Component } from "react";
import logo from "./R_M.PNG";
import "./App.css";
import RequestQueue from "./components/RequestsQueue";
import EntityList from "./components/EntityList";
import { subscribeToEntityReceived, pushEntity } from "./socketHelper.js";

require("./index.css");

const buildingRequestsTitle = "Building Requests";
const submittedEntity = "Submitted/Curated Entity ";

export default class App extends Component {
  constructor(props) {
    super(props);

    //this is received from VedasS
    subscribeToEntityReceived(entity => {
      console.log(`this entity is received from VEDaaS ${entity}`);

      this.setState({
        buildingRequestsRows: this.state.buildingRequestsRows.concat(
          JSON.parse(entity)
        )
      });
    });
  }

  createData = (AVID, legalName, country, address, GLEIF, modifiedDate) => {
    return { AVID, legalName, country, address, GLEIF, modifiedDate };
  };

  state = {
    buildingRequestsRows: [],

    challengeRequestsRows: [],

    maintenaceRequestsRows: [],

    buildingRequestsUpdatedRows: [],

    submittedEntities: []
  };

  editEntity = (key, attributeId, newAttributeValue) => {
    this.setState({
      buildingRequestsRows: this.state.buildingRequestsRows,
      buildingRequestsUpdatedRows: this.state.buildingRequestsRows.map(row => {
        if (row.key === key) {
          row[attributeId] = newAttributeValue;
        }
        return row;
      }),
      submittedEntities: []
    });

    //console.log(JSON.stringify(this.state.buildingRequestsUpdatedRows));
  };

  entitySubmitted = key => {
    console.log("entity " + key + " will be pushed to VEDaaS");

    this.setState({
      buildingRequestsRows: this.state.buildingRequestsRows.map(r => {
        r.modifiedDate = Date.now();
        return r;
      }),
      buildingRequestsUpdatedRows: this.state.buildingRequestsUpdatedRows.map(
        r => {
          r.modifiedDate = Date.now();
          return r;
        }
      ),
      submittedEntities: this.state.buildingRequestsUpdatedRows
        .filter(e => e.key === key)
        .map(r => {
          r.modifiedDate = Date.now();
          return r;
        })
    });

    let entity = this.state.buildingRequestsUpdatedRows.find(
      el => el.key === key
    );
    console.log(
      "about to push entity to VEDaaS (indexer)",
      JSON.stringify(entity)
    );
    pushEntity(entity);

    console.log(JSON.stringify(this.state.submittedEntities));
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h3>OEM application</h3>
          <img src={logo} alt="" style={{ width: 150 }} />
          <h3>&nbsp;</h3>
        </header>

        <h3>{buildingRequestsTitle}</h3>
        <RequestQueue
          queue={this.state.buildingRequestsRows}
          handleSubmitEntity={this.entitySubmitted}
          editEntity={this.editEntity}
        />

        <h3>&nbsp;</h3>
        <h3>&nbsp;</h3>
        <h4 align="left">{submittedEntity}</h4>
        <EntityList items={this.state.submittedEntities} />
        <h3>&nbsp;</h3>
      </div>
    );
  }
}
