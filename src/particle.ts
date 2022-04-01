import { Emitter, upgradeConfig } from "@pixi/particle-emitter";
import {
  Container,
  Loader,
  ParticleContainer,
  Sprite,
  Texture,
  Ticker,
} from "pixi.js";
import { StageConfig } from "./StageConfig";

export class ParticleTest extends Container {
  private readonly particleContainer: ParticleContainer;
  private magmaList: Array<Magma>;
  private intv: any;
  constructor() {
    super();
    const { width: sW, height: sH } = StageConfig.getDim();

    const sp: Sprite = Sprite.from(Loader.shared.resources["volcano"].texture);
    sp.anchor.set(0.5, 0.25);
    sp.position.set(sW / 2, sH - sp.height * 0.75);
    this.addChild(sp);

    StageConfig.magmaY = sH - sp.height * 0.75;

    this.particleContainer = new ParticleContainer();
    this.addChild(this.particleContainer);

    this.magmaList = [];

    for (let index = 0; index < 9; index++) {
      this.magmaList.push(new Magma(this.particleContainer));
    }

    this.intv = setInterval(this.createNewMagma.bind(this), 500);
  }

  private createNewMagma(): void {
    const m: Magma = this.magmaList.find((magma: Magma) => magma.exploded);
    m.burn();
  }

  discard() {
    clearInterval(this.intv);
    this.magmaList.forEach((magma) => magma.discard());
  }
}

class Magma {
  private readonly emitter: Emitter;
  private readonly explosion: Emitter;
  private x: number;
  private y: number;
  private dx: number;
  private dy: number;
  public exploded: boolean;

  private readonly particleContainer: ParticleContainer;

  constructor(particleContainer: ParticleContainer) {
    this.particleContainer = particleContainer;

    this.exploded = true;

    const expConfig = Loader.shared.resources["expEm"].data;
    const fireConfig = Loader.shared.resources["fireEm"].data;

    const particle: Texture = Loader.shared.resources["particle"].texture;

    this.emitter = new Emitter(
      particleContainer,
      upgradeConfig(fireConfig, [particle])
    );

    this.explosion = new Emitter(
      this.particleContainer,
      upgradeConfig(expConfig, [particle])
    );
  }

  burn() {
    this.exploded = false;

    var deg = Math.floor(Math.random() * 90 + 25) + 25;
    var rad = (deg * Math.PI) / 180;
    var velocity = Math.floor(Math.random() * 10);

    this.exploded = false;

    this.dx = velocity * Math.cos(rad);
    this.dy = velocity * Math.sin(rad);

    (this.x = StageConfig.getDim().width / 2), (this.y = StageConfig.magmaY);

    this.emitter.autoUpdate = true;
    this.emitter.updateOwnerPos(this.x, this.y);

    setTimeout(() => {
      this.emitter.emit = true;
    }, 50);
    Ticker.shared.add(this.update, this);
  }

  explode() {
    this.emitter.emit = false;
    Ticker.shared.remove(this.update, this);

    this.explosion.updateOwnerPos(this.x, this.y);
    this.explosion.autoUpdate = true;
    this.explosion.emit = true;
    this.explosion.playOnce(() => (this.exploded = true));
  }

  update(delta: number) {
    this.x += this.dx * delta;
    this.y -= this.dy * delta;

    this.emitter.updateOwnerPos(this.x, this.y);

    this.dy -= 0.18;

    if (this.y > StageConfig.getDim().height) {
      this.dx = 0;
      this.dy = 0;
      this.explode();
    }
  }

  discard() {
    Ticker.shared.remove(this.update, this);
    this.emitter.destroy();
    this.explosion.destroy();
  }
}
