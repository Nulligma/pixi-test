export namespace StageConfig {
  type Dimention = {
    width: number;
    height: number;
  };

  let stageDimention: Dimention;

  export function setDim(obj: Dimention): void {
    stageDimention = obj;
  }

  export function getDim(): Dimention {
    return stageDimention;
  }

  export let magmaY: number;
}
