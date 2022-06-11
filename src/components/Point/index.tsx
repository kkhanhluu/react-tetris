import { Number } from 'components/Number';
import { FunctionComponent } from 'react';

export const Point: FunctionComponent = () => {
  return (
    <div>
      <p>Point</p>
      <Number number={1500} />
    </div>
  );
};
