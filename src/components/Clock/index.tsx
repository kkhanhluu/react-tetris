import classNames from 'classnames';
import useInterval from 'hooks/useInterval';
import { FunctionComponent, useState } from 'react';

export const Clock: FunctionComponent = () => {
  const [time, setTime] = useState<string[]>();

  useInterval(() => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const isEvenSecond = now.getSeconds() % 2 === 0;
    setTime([
      ...hours.split(''),
      isEvenSecond ? `colon-solid` : `colon-faded`,
      ...minutes.split(''),
    ]);
  }, 1000);

  return (
    <div className="number">
      {time?.map((sequence, index) => (
        <span
          key={index}
          className={classNames({
            bg: true,
            num: true,
            [`num-${sequence}`]: true,
          })}
        />
      ))}
    </div>
  );
};
