import React from "react";
import Input from "@material-ui/core/Input";

export default class InputForm extends React.Component {
  onChange = e => {
    this.props.editEntity(e.target.value);
  };

  render() {
    return (
      <form>
        <Input defaultValue={this.props.text} onChange={this.onChange} />
      </form>
    );
  }
}
