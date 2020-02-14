import React, { Component } from "react";
import logo from "./UJ.PNG";
import "./App.css";
import Queue from "./components/Queue";
import ClientRecords from "./components/ClientRecords";
import EntityList from "./components/EntityList";
import Tabs from "./components/Tabs";
import { subscribeToEntityReceived, pushEntity } from "./code/socketHelper";
require("./index.css");
const main = require("./code/main.js");

export default class App extends Component {
  constructor(props) {
    super(props);

    //this is received from OEM
    subscribeToEntityReceived(entity => {
      console.log(`this entity is received from OEM ${entity}`);
      const e = JSON.parse(entity);

      this.setState({
        curatedEntities: this.state.curatedEntities.concat(e),
        clientRecords: this.state.clientRecords.map(r => {
          if (r.key === e.key) return e;
          return r;
        })
      });
    });
  }

  state = {
    clientRecords: [],
    maintenanceQueue: [],
    validationQueue: [],
    curatedEntities: []
  };

  onEntitySubmitted = key => {
    let entity = this.state.maintenanceQueue.find(el => el.key === key);
    console.log(
      "about to push entity to OEM (indexer)",
      JSON.stringify(entity)
    );
    pushEntity(entity);
  };

  onCreateClientRecord = () => {
    this.setState({
      clientRecords: this.state.clientRecords.concat(
        main.createEmptyClientRecord()
      )
    });
  };

  onClientRecordChanged = (key, attrtibuteName, newAttributeValue) => {
    this.setState({
      clientRecords: this.state.clientRecords.map(r => {
        if (r.key === key) r[attrtibuteName] = newAttributeValue;
        return r;
      })
    });
    console.log(
      JSON.stringify(this.state.clientRecords.filter(r => r.key === key))
    );
  };

  onDeleteClientRecord = key => {
    this.setState({
      clientRecords: this.state.clientRecords.filter(r => r.key !== key)
    });
  };

  onSendToValidationQueue = key => {
    console.log(
      `we could use this hanlder to send entity to Indexer.. for something cool , entity key is ${key}`
    );
  };

  onSendToMaintenanceQueue = key => {
    this.setState({
      maintenanceQueue: this.state.maintenanceQueue.concat(
        this.state.clientRecords
          .filter(r => r.key === key)
          .map(el => {
            return main.createEntity(
              el.AVID,
              el.legalName,
              el.country,
              el.address,
              el.GLEIF,
              el.modifiedDate,
              el.clientData,
              el.key
            );
          })
      )
    });
  };

  onEntityChanged = (key, attributeName, newValue) => {
    this.setState({
      maintenanceQueue: this.state.maintenanceQueue.map(r => {
        if (r.key === key) r[attributeName] = newValue;
        return r;
      })
    });
    console.log(key + " " + attributeName + "  " + newValue);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h3>VEDaaS application</h3>
          <img src={logo} alt="" style={{ width: 150 }} />
        </header>

        <Tabs>
          <div label={main.ClientRecords}>
            <ClientRecords
              queue={this.state.clientRecords}
              handleSubmitEntity={this.entitySubmitted}
              onClientRecordChanged={this.onClientRecordChanged}
              onCreateClientRecord={this.onCreateClientRecord}
              onDeleteClientRecord={this.onDeleteClientRecord}
              onSendToValidationQueue={this.onSendToValidationQueue}
              onSendToMaintenanceQueue={this.onSendToMaintenanceQueue}
            />
          </div>
          <div label={main.MaintenanceQueue}>
            <h3>{main.MaintenanceQueue}</h3>
            <Queue
              queue={this.state.maintenanceQueue}
              handleSubmitEntity={this.onEntitySubmitted}
              onEntityChanged={this.onEntityChanged}
            />
          </div>
        </Tabs>

        <h3>&nbsp;</h3>
        <h3>&nbsp;</h3>
        <h4 align="left">{main.curatedEntities}</h4>
        <EntityList items={this.state.curatedEntities} />
        <h3>&nbsp;</h3>
      </div>
    );
  }
}
