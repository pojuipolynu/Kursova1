
class Player extends Sprite {
    constructor({ collisionBlocks = [], imageSrc, frameRate, animations, loop }) {
      super({ imageSrc, frameRate, animations, loop })
      this.position = {
        x: 240,
        y: 450,
      }
  
      this.velocity = {
        x: 0,
        y: 0,
      }
  
      this.sides = {
        bottom: this.position.y + this.height,
      }
      this.gravity = 1
  
      this.collisionBlocks = collisionBlocks
    }
  
    update() {
      this.position.x += this.velocity.x
  
      this.updateHitbox()
  
      this.checkForHorizontalCollisions()
      this.applyGravity()
  
      this.updateHitbox()
      this.checkForVerticalCollisions()
    }
  
    handleInput(keys) {
      if (this.preventInput) return
      this.velocity.x = 0
      if (keys.d.pressed && !bow) {
        this.switchSprite('runRight')
        this.velocity.x = 2.5
        this.lastDirection = 'right'
      } else if (keys.a.pressed && !bow) {
        this.switchSprite('runLeft')
        this.velocity.x = -2.5
        this.lastDirection = 'left'
      } else if (!bow){
        if (this.lastDirection === 'left') this.switchSprite('idleLeft')
        else this.switchSprite('idleRight')
      } else if(keys.d.pressed && bow){
        this.switchSprite('runRightBow')
        this.velocity.x = 2.5
        this.lastDirection = 'right'
      } else if (keys.a.pressed && bow) {
        this.switchSprite('runLeftBow')
        this.velocity.x = -2.5
        this.lastDirection = 'left'
      } else if (bow){
        if (this.lastDirection === 'left') this.switchSprite('idleLeftBow')
        else this.switchSprite('idleRightBow')
    }}
  
    switchSprite(name) {
      if (this.image === this.animations[name].image) return
      this.currentFrame = 0
      this.image = this.animations[name].image
      this.frameRate = this.animations[name].frameRate
      this.frameBuffer = this.animations[name].frameBuffer
      this.loop = this.animations[name].loop
      this.currentAnimation = this.animations[name]
      if(name == 'runRight' || name == 'runLeft' || name == 'runRightBow' || name == 'runLeftBow'){
      this.width = this.animations[name].image.width/6
    }
      else if(name == 'idleLeft' || name == 'idleRight' || name == 'idleLeftBow' || name == 'idleRightBow'){
        this.width = this.animations[name].image.width/4
      }

    }
  
    updateHitbox() {
      this.hitbox = {
        position: {
          x: this.position.x + 3,
          y: this.position.y + 4,
        },
        width: 78,
        height: 50,
      }
    }
  
    checkForHorizontalCollisions() {
      for (let i = 0; i < this.collisionBlocks.length; i++) {
        const collisionBlock = this.collisionBlocks[i]
  
        // if a collision exists
        if (
          this.hitbox.position.x <=
            collisionBlock.position.x + collisionBlock.width &&
          this.hitbox.position.x + this.hitbox.width >=
            collisionBlock.position.x &&
          this.hitbox.position.y + this.hitbox.height >=
            collisionBlock.position.y &&
          this.hitbox.position.y <=
            collisionBlock.position.y + collisionBlock.height
        ) {
          // collision on x axis going to the left
          if (this.velocity.x < -0) {
            const offset = this.hitbox.position.x - this.position.x
            this.position.x =
              collisionBlock.position.x + collisionBlock.width - offset + 0.01
            break
          }
  
          if (this.velocity.x > 0) {
            const offset =
              this.hitbox.position.x - this.position.x + this.hitbox.width
            this.position.x = collisionBlock.position.x - offset - 0.01
            break
          }
        }
      }
    }
  
    applyGravity() {
      this.velocity.y += this.gravity
      this.position.y += this.velocity.y
    }
  
    checkForVerticalCollisions() {
      for (let i = 0; i < this.collisionBlocks.length; i++) {
        const collisionBlock = this.collisionBlocks[i]
  
        // if a collision exists
        if (
          this.hitbox.position.x <=
            collisionBlock.position.x + collisionBlock.width &&
          this.hitbox.position.x + this.hitbox.width >=
            collisionBlock.position.x &&
          this.hitbox.position.y + this.hitbox.height >=
            collisionBlock.position.y &&
          this.hitbox.position.y <=
            collisionBlock.position.y + collisionBlock.height
        ) {
          if (this.velocity.y < 0) {
            this.velocity.y = 0
            const offset = this.hitbox.position.y - this.position.y
            this.position.y =
              collisionBlock.position.y + collisionBlock.height - offset + 0.01
            break
          }
  
          if (this.velocity.y > 0) {
            this.velocity.y = 0
            const offset =
              this.hitbox.position.y - this.position.y + this.hitbox.height
            this.position.y = collisionBlock.position.y - offset - 0.01
            break
          }
        }
      }
    }
  }

  module.exports = Player;
  