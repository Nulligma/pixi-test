import { Loader, ParticleContainer, Sprite, Texture } from "pixi.js";
import gsap from "gsap";
import { StageConfig } from "./StageConfig";

export class Test1 extends ParticleContainer {
  private readonly cardTexture: Texture;
  private readonly spriteArray: Array<Sprite>;

  constructor() {
    super(144, { alpha: false, rotation: false, scale: false });

    this.interactiveChildren = false;

    this.cardTexture = Loader.shared.resources["card"].texture;

    const { width: sW, height: sH } = StageConfig.getDim();

    let sprite: Sprite;
    const quaterWidth: number = sW / 4;
    const quaterHeight: number = sH / 4;
    const tQWidth: number = (3 * sW) / 4;
    this.spriteArray = [];

    let index: number;

    for (index = 0; index < 144; index++) {
      sprite = new Sprite(this.cardTexture);
      sprite.anchor.set(0.5);
      sprite.position.set(quaterWidth, quaterHeight + index * 2);
      this.spriteArray[index] = sprite;
      this.addChild(sprite);
    }

    for (index = 0; index < 144; index++) {
      sprite = this.spriteArray[143 - index];

      gsap.to(sprite, {
        x: tQWidth,
        y: quaterHeight + index * 2,
        duration: 2,
        delay: index,
        onStart: (i: number) => {
          this.addChild(this.spriteArray[143 - i]);
        },
        onStartParams: [index],
      });
    }
  }

  discard() {
    gsap.globalTimeline.clear();
  }
}
