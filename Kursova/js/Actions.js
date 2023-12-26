function drawImageActualSize() {
  canvas.width = this.naturalWidth;
  canvas.height = this.naturalHeight;
  c.drawImage(this, 0, 0);
}
function textblock(){
    if(place === 'empty') return
    else if(place === 'wardrobe'){
        bow = true
        player.switchSprite('idleRightBow')
    }else if(place === 'teapot'){
        teapot.loop = false
        teapot.currentFrame = 0
        endings[0] = true
    }else if(place==='key'){
        key.currentFrame = 1
        doorkey[0] = true
    }else if(place==='door1'){
        if(doorkey[0]){
        player.position.x = 730
        player.position.y = 300}
    }else if(place==='jojo'){
        deathrow[0] = 'allgood'
    }else if(place === 'komod'){
        deathrow[1] = 'allgood'
        doorkey[1] = true
    }else if(place==='door2'){
        if(doorkey[1]){
        player.position.x = 647
        player.position.y = 150}
    }else if(place==='hay'){
        endings[1] = true
    }else if(place==='window'){
        endings[2] = true
        window1.currentFrame = 1
    }else if(place==='crow'){
        endings[3] = true
    }
}