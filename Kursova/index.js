const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 16 * 64 // 1024
canvas.height = 16 * 36 // 576

parsedCollisions = collisions.parse2D()
collisionBlocks = parsedCollisions.createObjectsFrom2D()
place = 'empty'
bow = false
doorkey = [false, false]
//teapot, hay, window, crow
endings = [false, false, false, false] 
deathrow = ['nottouched', 'nottouched']
o = false

const player = new Player({
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

player.collisionBlocks = collisionBlocks

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

background = new Sprite({
    position: {
      x: 0,
      y: 0,
    },
    imageSrc: 'back.png',
})

crow = new Sprite({
      position: {
        x: 350,
        y: 133,
      },
      imageSrc: './Items/crow.png',
      frameRate: 5,
      frameBuffer: 70,
      loop: true,
      autoplay: true,
})
  
key = new Sprite({
    position: {
      x: 244,
      y: 459,
    },
    imageSrc: './Items/key.png',
    frameRate: 2,
    frameBuffer: 70,
    loop: false,
    autoplay: false,
})

window1 = new Sprite({
    position: {
      x: 480,
      y: 100,
    },
    imageSrc: './Items/window.png',
    frameRate: 2,
    frameBuffer: 70,
    loop: false,
    autoplay: false,
})

teapot = new Sprite({
    position: {
      x: 278,
      y: 460,
    },
    imageSrc: './Items/teapot.png',
    frameRate: 4,
    frameBuffer: 40,
    loop: true,
    autoplay: true,
})

information = new Sprite({
    position: {
      x: 10,
      y: 48,
    },
    imageSrc: './Items/block.png',
    frameRate: 1,
    frameBuffer: 40,
    loop: false,
    autoplay: false,
})

textboxe = new Sprite({
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

endingsboxe = new Sprite({
  position: {
      x: 240,
      y: 100,
  },
  imageSrc: './Items/endingsblocks.png',
  frameRate: 10,
  frameBuffer: 70,
  loop: false,
  autoplay: false,
})

crowtext = new Sprite({
  position: {
      x: 240,
      y: 100,
  },
  imageSrc: './Items/crowtxt.png',
  frameRate: 1,
  loop: false,
  autoplay: false,
})




function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
    crow.draw()
    key.draw()
    window1.draw()
    teapot.draw()
    player.handleInput(keys)
    player.draw()
    player.update()
    if (player.position.x+30 <=key.position.x && player.position.y >= key.position.y){
        information.draw()
        place = 'key'
        if(keys.shift.pressed){
          textboxe.currentFrame = 4
          textboxe.draw()
      }
    }
    else if (key.position.x+20 <= player.position.x &&  player.position.x<=teapot.position.x+20 && player.position.y >= key.position.y){
        information.draw()
        place = 'teapot'
        if(keys.shift.pressed){
          textboxe.currentFrame = 8
          textboxe.draw()
      }
    }
    else if (player.position.x >=440 && player.position.x <= 440 + player.width && player.position.y>= 460 - player.height ){
        information.draw()
        place = 'wardrobe'
        if(keys.shift.pressed){
          textboxe.currentFrame = 1
          textboxe.draw()
      }
    }
    else if (player.position.x >=630 && player.position.x <= 630 + player.width && player.position.y>= 460 - player.height ){
        information.draw()
        place = 'door1'
        if(keys.shift.pressed){
          if(doorkey[0]){
            textboxe.currentFrame = 6
            textboxe.draw()
          }else{
            textboxe.currentFrame = 2
            textboxe.draw()
          }
      }
    }
    else if (player.position.x >=500 && player.position.x <= 500 + player.width && player.position.y<= 320 && player.position.y >=300-player.height ){
        information.draw()
        place = 'komod'
        if(keys.shift.pressed){
          textboxe.currentFrame = 5
          textboxe.draw()}
          if(deathrow[1]==='death'){
            endingsboxe.currentFrame = 6
            endingsboxe.draw()
          }
    }else if (key.position.x+20 <= player.position.x &&  player.position.x<=teapot.position.x+20 && player.position.y<= 320&& player.position.y >=300-player.height ){
        information.draw()
        place = 'door2'
        if(keys.shift.pressed){
          if(doorkey[1]){
            textboxe.currentFrame = 6
            textboxe.draw()
          }else{
            textboxe.currentFrame = 2
            textboxe.draw()
          }}
    }else if (700 <= player.position.x && player.position.y<= 320&& player.position.y >=300-player.height ){
        information.draw()
        place = 'hay'
        if(keys.shift.pressed){
          textboxe.currentFrame = 3
          textboxe.draw()
      }
    }else if (650 >= player.position.x && player.position.x >=600 && player.position.y<= 320&& player.position.y >=300-player.height ){
        information.draw()
        place = 'jojo'
        if(keys.shift.pressed){
          textboxe.currentFrame = 7
          textboxe.draw()}
        if(deathrow[0]==='death'){
          endingsboxe.currentFrame = 7
          endingsboxe.draw()
        }
    }else if (470+player.width >= player.position.x && player.position.x >=450 && player.position.y<= 155){
      information.draw()
      place = 'window'
      if(keys.shift.pressed){
        textboxe.currentFrame = 9
        textboxe.draw()}
    }else if (340 >= player.position.x && player.position.x >=310 && player.position.y<= 155){
      information.draw()
      place = 'crow'
      if(keys.shift.pressed){
        crowtext.draw()}
    }else if (player.position.x <=240 && player.position.y<= 155){
      information.draw()
      place = 'bed'
      if(keys.shift.pressed){
        textboxe.currentFrame = 0
        textboxe.draw()}
        if(o){
      if(!endings[0] && !endings[2]){
        endingsboxe.currentFrame = 9
        endingsboxe.draw()
      } else if(!endings[0]){
        endingsboxe.currentFrame = 8
        endingsboxe.draw()
      } else if(!endings[1] && !endings[2] && !endings[3]){
        endingsboxe.currentFrame = 2
        endingsboxe.draw()
      } else if(!endings[1] && endings[2] && !endings[3]){
        endingsboxe.currentFrame = 3
        endingsboxe.draw()
      } else if(!endings[1]){
        endingsboxe.currentFrame = 4
        endingsboxe.draw()
      } else if(!endings[2] && !endings[3]){
        endingsboxe.currentFrame = 0
        endingsboxe.draw()
      } else if(endings[2] && !endings[3]){
        endingsboxe.currentFrame = 1
        endingsboxe.draw()
      } else if(endings[0] && endings[1] && endings[3]){
        endingsboxe.currentFrame = 5
        endingsboxe.draw() 
      }}}
}



animate()



