import React, { FC, useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

import './dist-to-now.css';

interface DistToNowState {
  idInterval: NodeJS.Timer | null;
}

interface DistToNowProps {
  created: Date;
  intervalTime?: number;
}

const DistToNow: FC<DistToNowProps> = (props) => {
  const { created, intervalTime } = props;

  const [idIntervalState, setIdIntervalState] = useState<DistToNowState['idInterval']>(null);

  useEffect(() => {
    const idInterval = setInterval(() => {
      setIdIntervalState(idInterval);
    }, intervalTime);

    return () => {
      clearInterval(idInterval);
    };
  }, [intervalTime]);

  const distToNow = formatDistanceToNow(created, {
    includeSeconds: true,
  });

  return <span className="created">{distToNow}</span>;
};

DistToNow.defaultProps = {
  intervalTime: 5000,
};

export default DistToNow;
