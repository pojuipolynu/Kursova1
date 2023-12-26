window.addEventListener('keydown', (event) => {
    if (player.preventInput) return
    switch (event.key) {
        case 'w':
            if (player.velocity.y === 0) player.velocity.y = -10
            break
        case 'a':
            keys.a.pressed = true
            break
        case 'd':
            keys.d.pressed = true
            break
        case 'Shift':
            keys.shift.pressed = true
            break
        case 'y':
            keys.shift.pressed = false
            textblock(place)
            break
        case 'n':
          if(place==='jojo'){
            deathrow[0] = 'death'
          } else if(place === 'komod'){
            deathrow[1] = 'death'
          }
          keys.shift.pressed = false
          break
        case 'o':
          o = true
          keys.shift.pressed = false
          break
    }
  })
  
  window.addEventListener('keyup', (event) => {
    switch (event.key) {
      case 'a':
        // move player to the left
        keys.a.pressed = false
  
        break
      case 'd':
        // move player to the right
        keys.d.pressed = false
  
        break
    }
  })
  