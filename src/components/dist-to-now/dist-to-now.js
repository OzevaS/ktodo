import React from "react";
import { formatDistanceToNow } from "date-fns";
import propTypes from "prop-types";

import "./dist-to-now.css";

export default class DistToNow extends React.Component {
  state = {
    idInterval: null,
  };

  static defaultProps = {
    created: new Date(),
    intervalTime: 5000,
  };

  static propTypes = {
    created: propTypes.instanceOf(Date),
    intervalTime: propTypes.number,
  };

  componentDidMount() {
    const { intervalTime } = this.props;

    const id = setInterval(() => {
      this.update(id);
    }, intervalTime);
  }

  componentWillUnmount() {
    clearInterval(this.state.idInterval);
  }

  update(id) {
    this.setState({
      idInterval: id,
    });
  }

  render() {
    const distToNow = formatDistanceToNow(this.props.created, {
      includeSeconds: true,
    });

    return <span className="created">{distToNow}</span>;
  }
}
