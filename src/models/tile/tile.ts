export enum TileValue {
  EMPTY,
  FILLED,
  ANIMATED,
}

export class Tile {
  constructor(private value: TileValue, public isSolid: boolean) {}

  get isFilled(): boolean {
    return this.value === TileValue.FILLED;
  }

  get isAnimated(): boolean {
    return this.value === TileValue.ANIMATED;
  }
}
