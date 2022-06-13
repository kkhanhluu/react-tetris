import { Number } from 'components/Number';
import { FunctionComponent } from 'react';
import { useStore } from 'store';

export const Line: FunctionComponent = () => {
  const store = useStore();
  return (
    <>
      <p>Lines</p>
      <Number number={store.numberOfClearedLines} length={1} />
    </>
  );
};
