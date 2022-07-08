import React from 'react';
import { formatDistanceToNow } from 'date-fns';

import './dist-to-now.css';

interface DistToNowState {
  idInterval: NodeJS.Timer | null;
}

interface DistToNowProps {
  created: Date;
  intervalTime?: number;
}

export default class DistToNow extends React.Component<DistToNowProps, DistToNowState> {
  state = {
    idInterval: null,
  };

  static defaultProps = {
    intervalTime: 5000,
  };

  componentDidMount() {
    const { intervalTime } = this.props;

    const id = setInterval(() => {
      this.update(id);
    }, intervalTime);
  }

  componentWillUnmount() {
    const  {idInterval} = this.state;
    if (idInterval !== null)
      clearInterval(idInterval);
  }

  update(id: NodeJS.Timer) {
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
