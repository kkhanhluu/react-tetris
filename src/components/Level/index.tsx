import { Number } from 'components/Number';
import { FunctionComponent } from 'react';
import { useStore } from 'store';

export const Level: FunctionComponent = () => {
  const store = useStore();
  return (
    <>
      <p>Level</p>
      <Number number={store.initNumberOfLines} length={1} />
    </>
  );
};
