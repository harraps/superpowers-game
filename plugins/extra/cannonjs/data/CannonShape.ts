export interface CannonShapePub {
    id: string;
    shape: string;
    positionOffset: { x: number, y: number, z: number };
    orientationOffset: { x: number, y: number, z: number };
    halfSize: { x: number, y: number, z: number };
    radius: number;
    height: number;
    segments: number;
}

export default class CannonShape extends SupCore.Data.Base.ListById {

  static schema: SupCore.Data.Schema = {
      shape: { type: "enum", items: ["box", "sphere", "cylinder"], mutable: true },
      positionOffset: {
        mutable: true,
        type: "hash",
        properties: {
          x: { type: "number", mutable: true },
          y: { type: "number", mutable: true },
          z: { type: "number", mutable: true },
        }
      },
      orientationOffset: {
          mutable: true,
          type: "hash",
          properties: {
              x: { type: "number", mutable: true },
              y: { type: "number", mutable: true },
              z: { type: "number", mutable: true }
          }
      },
      halfSize: {
        mutable: true,
        type: "hash",
        properties: {
          x: { type: "number", min: 0, mutable: true },
          y: { type: "number", min: 0, mutable: true },
          z: { type: "number", min: 0, mutable: true },
        }
      },
      radius: { type: "number", min: 0, mutable: true },
      height: { type: "number", min: 0, mutable: true },
      segments: { type: "number", min: 3, mutable: true }
  };

  pub: CannonShapePub[];
  byId: { [id: string]: CannonShapePub};

  constructor(pub: CannonShapePub[]) {
    super(pub, CannonShape.schema);
  }
}
