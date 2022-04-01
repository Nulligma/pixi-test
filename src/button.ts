import { Container, Graphics, Text, TextStyle } from "pixi.js";

export class Button extends Container {
  private readonly bg: Graphics;
  private readonly tF: Text;

  constructor(text: string) {
    super();

    this.bg = new Graphics();
    this.bg.beginFill(0);
    this.bg.drawRect(0, 0, 100, 70);
    this.bg.endFill();
    this.addChild(this.bg);

    const styly: TextStyle = new TextStyle({
      align: "center",
      fill: "#ffffff",
      fontSize: 20,
    });
    this.tF = new Text(text, styly);
    this.tF.anchor.set(0.5);
    this.tF.x = 50;
    this.tF.y = 35;
    this.addChild(this.tF);

    this.interactive = true;
  }

  activate(): void {
    this.bg.beginFill(0x00cc00);
    this.bg.drawRect(0, 0, 100, 70);
    this.bg.endFill();
  }

  deactivate(): void {
    this.bg.beginFill(0);
    this.bg.drawRect(0, 0, 100, 70);
    this.bg.endFill();
  }
}
