import { createStage } from 'helpers';
import { CellObject } from 'helpers/types';
import { useState } from 'react';

export function useStage(): [
  CellObject[][],
  React.Dispatch<React.SetStateAction<CellObject[][]>>,
] {
  const [stage, setStage] = useState(createStage());

  return [stage, setStage];
}
