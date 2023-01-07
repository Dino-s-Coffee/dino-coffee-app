import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonTitle,
} from '@ionic/react';

import React, { useRef, useEffect } from "react";
import { Application, Sprite, Container, Texture, TilingSprite } from 'pixi.js';

let app: any;
let opponentShips: any[] = [];
let playerShip: any[] = [];

function isCollision(a: Container, b: Container) {
  return a.x > b.x - b.width / 2 &&
    a.x < b.x + b.width / 2 &&
    a.y > b.y - b.height / 2 &&
    a.y < b.y + b.height / 2;
}


class RenderObject {
  image: string;
  sprite: Sprite;
  public container: any;
  app: any;
  constructor(image: string) {
    this.image = image;

    this.sprite = Sprite.from(image);
    this.sprite.anchor.set(0.5);
    this.sprite.scale.set(2);

    this.app = app;
  }
  clone() {
    return new RenderObject(this.image);
  }
  render(x: number, y: number) {
    this.container = this.app.stage.addChild(this.sprite);
    this.container.position.set(x, y);
  }
  isCollision(other: RenderObject) {
    return isCollision(this.container, other.container);
  }
  explode() {
    this.container.destroy();
  }
}
class Ship extends RenderObject {
  bullet: Bullet;
  reload: number;
  constructor(image: string, bullet: Bullet, reload: number) {
    super(image);
    this.bullet = bullet;
    this.reload = reload;
  }
  shoot() {
    const newBullet = this.bullet.clone();
    newBullet.startShooting(this.container.x, this.container.y);
  }
  startShooting() {
    let elapsed = 0.0;
    this.app.ticker.add((delta: number) => {
      elapsed += delta;
      if (elapsed > this.reload) {
        this.shoot();
        elapsed = 0.0;
      }
    });
  }
}
class PlayerShip extends Ship {
  constructor(image: string, bullet: PlayerBullet, reload: number) {
    super(image, bullet, reload);

    this.sprite.interactive = true;
    this.sprite.cursor = 'pointer';

    this.container = this.app.stage.addChild(this.sprite);
    this.container.position.set(this.app.screen.width / 2, this.app.screen.height / 2 + 100);

    this.app.stage.addEventListener('pointermove', (e: any) => {
      this.container.position.copyFrom(e.global);
    });

    this.startShooting();
  }
}
class OpponentShip extends Ship {
  constructor(image: string, bullet: Bullet, reload: number) {
    super(image, bullet, reload);
  }
  clone(): OpponentShip {
    return new OpponentShip(this.image, this.bullet.clone(), this.reload);
  }
}
class Explosion extends RenderObject {
  constructor(image: string) {
    super(image);
  }
}
class Bullet extends RenderObject {
  explosion: Explosion;
  direction: number;
  speed: number;
  enemies: any[];
  constructor(image: string, explosion: Explosion, direction: number, speed: number, enemies: any[]) {
    super(image);
    this.direction = direction;
    this.speed = speed;
    this.explosion = explosion;
    this.enemies = enemies;
  }
  startShooting(x: number, y: number) {
    this.container = this.app.stage.addChild(this.sprite);
    this.container.position.set(x, y);
    this.app.ticker.add((delta: number) => {
      this.move(delta);
      this.checkCollision();
    });
  }
  move(delta: number) {
    this.container.y += this.direction * this.speed * delta;
  }
  needDestroy() {
    return this.container.y < 0 || this.container.y > this.app.screen.height;
  }
  checkCollision() {
    this.enemies.forEach((enemy: any, index: number) => {
      // if (this.isCollision(enemy)) {
      //   enemy.explode();
      //   this.explode();
      //   this.enemies.splice(index, 1);
      // }
    });
  }
  clone() {
    return new Bullet(this.image, this.explosion.clone(), this.direction, this.speed, this.enemies);
  }
}
class OpponentBullet extends Bullet {
  constructor(image: string, explosion: Explosion, direction: number, speed: number, playShip: any[]) {
    super(image, explosion, direction, speed, playShip);
    this.sprite.anchor.y = 1;
    this.sprite.scale.y *= -1;
  }
}
class PlayerBullet extends Bullet {
  constructor(image: string, explosion: Explosion, direction: number, speed: number, opponentShips: any[]) {
    super(image, explosion, direction, speed, opponentShips);
  }
}
async function startPlayer() {
  const shipImage = `/assets/game/shooting/ship/player/blue/level1.png`;
  const bulletImage = `/assets/game/shooting/ship/player/bullet/level1.png`;
  const explosionImage = `/assets/game/shooting/ship/player/bullet/level1.png`;

  const explosion = new Explosion(explosionImage);
  const bullet = new PlayerBullet(bulletImage, explosion, -1, 3, opponentShips);
  playerShip.push(new PlayerShip(shipImage, bullet, 20));
}
async function startOpponent() {
  const shipImage = `/assets/game/shooting/ship/opponent/level1/ship0.png`;
  const bulletImage = `/assets/game/shooting/ship/opponent/level1/bullet.png`;
  const explosionImage = `/assets/game/shooting/ship/opponent/level1/bullet-explode.png`;
  const explosion = new Explosion(explosionImage);
  const bullet = new OpponentBullet(bulletImage, explosion, 1, 3, playerShip);
  while (opponentShips.length < 4) {
    const ship = new OpponentShip(shipImage, bullet.clone(), Math.min(50, (opponentShips.length + 1) * 10 + 10));
    opponentShips.push(ship);
    ship.render(opponentShips.length * 100 - 50, 50);
    setTimeout(() => {
      ship.startShooting();
    }, opponentShips.length * 700);
  }
}

async function setBackgroundImage() {
  const texture = await Texture.fromURL('http://ansimuz.com/site/wp-content/uploads/2015/02/preview-trees-and-bushesx2.png');
  const tilingSprite = new TilingSprite(
    texture,
    app.screen.width,
    app.screen.height,
  );
  app.stage.addChild(tilingSprite);
  let elapsed = 0;
  
  app.ticker.add((delta: number) => {
      elapsed += delta;
      tilingSprite.tilePosition.y += 1 * delta;
  });
  
}

async function start() {
  // setBackgroundImage();
  startPlayer();
  startOpponent();
}

const Game: React.FC = () => {
  const ref = useRef<any>();

  useEffect(() => {
    app = new Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: '#1099bb',
    });

    app.stage.interactive = true;
    app.stage.hitArea = app.screen;

    ref.current.appendChild(app.view);
    start();
    return () => {
      app.destroy(true, true);
    };
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Game</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div ref={ref} style={{ height: '100%' }} />
      </IonContent>
    </IonPage>
  );
};

export default Game;
