import { Number } from 'components/Number';
import { FunctionComponent } from 'react';
import { useStore } from 'store';

export const Point: FunctionComponent = () => {
  const store = useStore();
  return (
    <div>
      <p>Point</p>
      <Number number={store.point} />
    </div>
  );
};
