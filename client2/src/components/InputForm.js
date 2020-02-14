import React from "react";
import Input from "@material-ui/core/Input";

export default class InputForm extends React.Component {
  onChange = e => {
    this.props.editEntity(this.props.attributeId, e.target.value);
    //console.log(e.target.value);
  };

  render() {
    return (
      <form>
        <Input
          name="text"
          defaultValue={this.props.text}
          onChange={this.onChange}
        />
      </form>
    );
  }
}
