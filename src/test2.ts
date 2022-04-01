import {
  BaseTexture,
  Container,
  Loader,
  Rectangle,
  Sprite,
  Text,
  TextStyle,
  Texture,
} from "pixi.js";
import { StageConfig } from "./StageConfig";

export class Test2 extends Container {
  private mt: MediaText;
  private readonly intv: any;
  constructor() {
    super();

    const { height: sH } = StageConfig.getDim();

    this.mt = new MediaText();
    this.mt.y = sH / 2;
    this.addChild(this.mt);

    this.update();

    this.intv = setInterval(this.update.bind(this), 2000);
  }

  private update(): void {
    let input: Array<String> = [];
    let rn: number;
    for (let index = 0; index < 3; index++) {
      rn = Math.floor(Math.random() * 3);

      switch (rn) {
        case 0:
          input.push("money");
          break;
        case 1:
          input.push((Math.random() + 1).toString(36).substring(4));
          break;
        case 2:
          input.push("emoji");
          break;
      }
    }
    this.mt.updateText(input);
  }

  discard() {
    clearInterval(this.intv);
  }
}

class MediaText extends Container {
  private moneyTexture: BaseTexture;
  private emojiTexuture: BaseTexture;
  constructor() {
    super();

    this.moneyTexture = Loader.shared.resources["money"].texture.baseTexture;

    this.emojiTexuture = Loader.shared.resources["emoji"].texture.baseTexture;
  }

  public updateText(arr: Array<String>): void {
    let nextX: number = 0;
    let frame: number = 0;

    this.removeChildren();
    arr.forEach((element: string) => {
      switch (element) {
        case "money":
          frame = Math.floor(Math.random() * 6);

          const moneySP: Sprite = new Sprite(
            new Texture(this.moneyTexture, new Rectangle(frame * 70, 0, 70, 72))
          );
          moneySP.x = nextX;
          this.addChild(moneySP);

          nextX += moneySP.width;
          break;

        case "emoji":
          frame = Math.floor(Math.random() * 20);
          let x: number = frame % 5;
          const y: number = Math.floor(frame / 5);

          if (x == 4 && (y == 2 || y == 3)) x = 0;

          const emojiSP: Sprite = new Sprite(
            new Texture(
              this.emojiTexuture,
              new Rectangle(x * 72, y * 72, 72, 72)
            )
          );
          emojiSP.x = nextX;
          this.addChild(emojiSP);

          nextX += emojiSP.width;
          break;
        default:
          const t = new Text(
            element,
            new TextStyle({
              align: "center",
              fill: 0,
              fontSize: Math.floor(Math.random() * 30 + 10) + 10,
            })
          );
          t.anchor.set(0, 0.5);
          t.x = nextX;
          t.y = 35;
          this.addChild(t);
          nextX += t.width + 10;
          break;
      }
    });
  }
}
