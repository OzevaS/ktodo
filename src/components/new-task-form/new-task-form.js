import React from "react";
import propTypes from "prop-types";

import "./new-task-form.css";

export default class NewTaskForm extends React.Component {
  state = {
    text: "",
  };

  static defaultProps = {
    onAdd: () => {},
  };

  static propTypes = {
    onAdd: propTypes.func,
  };

  onChange = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onAdd(this.state.text);

    this.setState({
      text: "",
    });
  };

  render() {
    const { text } = this.state;

    return (
      <form className="new-task-form" onSubmit={this.onSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.onChange}
          value={text}
        />
      </form>
    );
  }
}
