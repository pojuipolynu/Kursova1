const Sprite = require('./Sprite.js');
const Player = require('./Player.js');
const CollisionBlock = require('./Collisions.js');

describe('creating Collisions blocks', ()=>{
    test('collision block width and height', () => {
        const position = {
              x: 1 * 16,
              y: 1 * 16,
            }
        let something = new CollisionBlock({position: position})
        expect(something.width).toBe(16)
        expect(something.height).toBe(16)
    });
    test('collision block class', () => {
        const position = {
              x: 1 * 16,
              y: 1 * 16,
            }
        let something = new CollisionBlock({position: position})
        expect(something).toBeInstanceOf(CollisionBlock)
    });
});


describe('creating Sprites', ()=>{
    test('Sprite correct creation', () => {
        example = new Sprite({
            position: {
                x: 240,
                y: 100,
            },
            imageSrc: './Items/texttxt.png',
            frameRate: 10,
            frameBuffer: 70,
            loop: false,
            autoplay: false,
        })
        expect(example).toBeInstanceOf(Sprite)
    });
    test('Sprite correct currentFrameleft calculating', () => {
        example = new Sprite({
            position: {
                x: 240,
                y: 100,
            },
            imageSrc: './Items/texttxt.png',
            frameRate: 10,
            frameBuffer: 70,
            loop: false,
            autoplay: false,
        })
        expect(example.currentFrameleft).toBe(example.frameRate - 1)
    });
    test('Sprite correct posittion drawing', () => {
        example = new Sprite({
            position: {
                x: 240,
                y: 100,
            },
            imageSrc: './Items/texttxt.png',
            frameRate: 10,
            frameBuffer: 70,
            loop: false,
            autoplay: false,
        })
        expect(example.position.x).toBe(240)
        expect(example.position.y).toBe(100)
    });
});

playerexample = new Player({
    imageSrc: './Pig/standingright.png',
    frameRate: 4,
    animations: {
      idleRight: {
        frameRate: 4,
        frameBuffer: 40,
        loop: true,
        imageSrc: './Pig/standingright.png',
      },
      idleLeft: {
        frameRate: 4,
        frameBuffer: 40,
        loop: true,
        imageSrc: './Pig/standingleft.png',
      },
      runRight: {
        frameRate: 6,
        frameBuffer: 10,
        loop: true,
        imageSrc: './Pig/goingright.png',
      },
      runLeft: {
        frameRate: 6,
        frameBuffer: 10,
        loop: true,
        imageSrc: './Pig/goingleft.png',
      },
      idleRightBow: {
        frameRate: 4,
        frameBuffer: 40,
        loop: true,
        imageSrc: './Pig/standingrightbow.png',
      },
      idleLeftBow: {
        frameRate: 4,
        frameBuffer: 40,
        loop: true,
        imageSrc: './Pig/standingleftbow.png',
      },
      runRightBow: {
        frameRate: 6,
        frameBuffer: 10,
        loop: true,
        imageSrc: './Pig/goingrightbow.png',
      },
      runLeftBow: {
        frameRate: 6,
        frameBuffer: 10,
        loop: true,
        imageSrc: './Pig/goingleftbow.png',
      },
    },
  })
  const keys = {
    w: {
      pressed: false,
    },
    a: {
      pressed: false,
    },
    d: {
      pressed: false,
    },
    shift:{
        pressed: false,
    },
    n:{
      pressed: false
    }
  }
describe('creating Player', ()=>{
    test('Player class', () => {
        expect(playerexample).toBeInstanceOf(Player)
    });
    test('Player movement right', () => {
        bow = false
        keys.d.pressed = true
        playerexample.handleInput(keys)
        expect(playerexample.velocity.x).toBe(2.5)
    });
    test('Player movement left', () => {
        bow = false
        keys.d.pressed = false
        keys.a.pressed = true
        playerexample.handleInput(keys)
        expect(playerexample.velocity.x).toBe(-2.5)
    });
});



