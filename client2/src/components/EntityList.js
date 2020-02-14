import React from "react";
import PropTypes from "prop-types";

//just displys items
export default class EntityList extends React.Component {
  render() {
    return this.props.items.map(entity => (
      <div key={entity.key}>
        <h4>{`Legal Name -  ${entity.legalName}`}</h4>
        <h4>{` AVID: ${entity.AVID}| Country: ${entity.country} | Address: ${entity.address} | GLEIF: ${entity.GLEIF} | Udpate Date: ${entity.modifiedDate}`}</h4>
      </div>
    ));
  }
}

EntityList.propTypes = {
  items: PropTypes.array.isRequired
};
