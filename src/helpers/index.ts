export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export function createStage() {
  return new Array(STAGE_HEIGHT)
    .fill(null)
    .map(() => new Array(STAGE_WIDTH).fill([0, 'clear']));
}
