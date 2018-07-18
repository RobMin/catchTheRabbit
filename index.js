function Present(){
  let canvas = document.getElementById("myCanvas");
  let ctx = canvas.getContext("2d");
  let blockedPlace = [0, 4, 8, 9, 10, 11, 12, 17, 18, 19, 20, 21, 23, 27, 35, 36, 41, 42, 45, 47, 50, 52, 54, 58, 60, 62, 63, 64, 66, 70, 73,
    77, 83, 84, 88, 90, 91, 93, 96, 99, 101, 102, 103, 104, 105, 107, 109, 111, 112, 116, 118, 125, 126, 130, 132, 133,
    135, 138, 141, 143, 144, 145, 146, 147, 148, 150, 154, 157, 161, 167, 168, 171, 173, 176, 178, 180, 184, 186, 188,
    189, 191, 195, 203, 204, 209, 210, 214, 218, 219, 220, 221, 222, 227, 228, 229, 230];
  let lvl_2_BlockedPlace = [0, 1, 6, 11, 15, 19, 20, 21, 24, 25, 29, 30, 34, 38, 41, 42, 44, 48, 53, 55, 57, 60, 62, 63, 67, 70, 72, 74, 76,
                      79, 83, 84, 86, 89, 93, 98, 102, 103, 104, 105, 107, 108, 110, 111, 112, 114, 116, 117, 121, 125, 126, 128, 131, 135, 140,
                      144, 145, 146, 147, 151, 154, 156, 158, 160, 163, 167, 168, 170, 174, 179, 181, 183, 186, 188, 189, 192, 193, 197,
                      198, 202, 206, 209, 210, 211, 216, 221, 225, 229, 230];
  const wolfSpeed = 2.25, rabSpeed = 2, playerSpeed = 1.5;//only number % 36 == 0
  let wolfDirection = 5, wolfFrame = 0, wolfPos = 40, wolfX = decoder(wolfPos)[0], wolfY = decoder(wolfPos)[1], wolfFrameInter;
  let aWolfDirection = 5, aWolfFrame = 0, aWolfPos = 208, aWolfX = decoder(aWolfPos)[0], aWolfY = decoder(aWolfPos)[1], aWolfFrameInter;
  let rabDirection = 5, rabFrame = 0, rabPos = 106, rabX = decoder(rabPos)[0], rabY = decoder(rabPos)[1], rabCatched = false, rabFrameInter;
  let playerDirection = 5, playerFrame = 0, playerPos = 124, playerX = decoder(playerPos)[0], playerY = decoder(playerPos)[1], playerFrameInter, rightInter, leftInter, upInter, downInter;
  let lives = 3, gameStart = false, startInter, gameOver = false, level = 1;

  // // function to fill blockedPlace
  // function printMousePos(event) {
  //   // console.log(event.clientX, event.clientY);
  //   let y = (event.clientY - (event.clientY % 36))/36;
  //   let x = (event.clientX - (event.clientX % 36))/36;
  //   console.log((y * 21) + x);
  //   //blockedPlace[blockedPlace.length] = (y * 21) + x;
  //   //console.log(blockedPlace);
  // }
  // document.addEventListener("click", printMousePos);

  let backgr = new Image();
  backgr.src = "./Pic/level_1.png";
  backgr.onload = backgrDraw;
  function backgrDraw(){
    ctx.drawImage(backgr, 0, 0);
  }

  let cell = new Image();
  cell.src = "./Pic/cells.png";
  cell.onload = cellsDraw;
  function cellsDraw(){
    ctx.drawImage(cell, 0, 0);
  }

  let player = new Image();
  player.src = "./Pic/player.png";
  player.onload = playerDraw;
  function playerDraw(){
    ctx.drawImage(player, (playerFrame * 36), (playerDirection * 36), 36, 36, playerX, playerY, 36, 36);
  }
  playerFrameInter = setInterval(() => {
    playerFrame++;
    if (playerFrame === 3)playerFrame = 0;
  }, 180);

  document.onkeydown = function(ev){
    if (ev.keyCode === 82){
      gameOver = false;
      restart(3, 1);
      blockedPlace = [0, 4, 8, 9, 11, 12, 17, 18, 19, 20, 21, 23, 27, 35, 36, 41, 42, 45, 47, 50, 52, 54, 58, 60, 62, 63, 64, 66, 70, 73,
        77, 83, 84, 88, 90, 91, 93, 96, 99, 101, 102, 103, 104, 105, 107, 109, 111, 112, 116, 118, 125, 126, 130, 132, 133,
        135, 138, 141, 143, 144, 145, 146, 147, 148, 150, 154, 157, 161, 167, 168, 171, 173, 176, 178, 180, 184, 186, 188,
        189, 191, 195, 203, 204, 209, 210, 214, 218, 219, 221, 222, 227, 228, 229, 230];
      backgr.src = "./Pic/level_1.png";
      document.getElementsByClassName("mark")[0].src = "./Pic/uncheckMark.png";
    }
    else if (gameOver)return
    else if (!gameStart && ev.keyCode == 37) {
      document.getElementsByClassName("mark")[0].src = "./Pic/uncheckMark.png";
      gameStart = true;
      startInter = setInterval(start, 11);
    }
    switch (ev.keyCode) {
      case 38:
        if (playerPos === 124)return;
        playerDirection = 3;
        clearInterval(upInter);
        upInter = setInterval(() => {
          playerY -= playerSpeed;
          posUpdate(playerX + 18, playerY + 18, "player");
          if (blockedPlace.includes(playerPos))GG();
        }, 10);
        break;
      case 40:
        if (playerPos === 124)return;
        playerDirection = 0;
        clearInterval(downInter);
        downInter = setInterval(() => {
          playerY += playerSpeed;
          posUpdate(playerX + 18, playerY + 18, "player");
          if (blockedPlace.includes(playerPos))GG();
        }, 10);
        break;
      case 37:
        playerDirection = 1;
        clearInterval(leftInter);
        leftInter = setInterval(() => {
          playerX -= playerSpeed;
          posUpdate(playerX + 18, playerY + 18, "player");
          if (blockedPlace.includes(playerPos))GG();
        }, 10);
        break;
      case 39:
        playerDirection = 2;
        clearInterval(rightInter);
        rightInter = setInterval(() => {
          if (playerPos === 124)return;
          playerX += playerSpeed;
          posUpdate(playerX + 18, playerY + 18, "player");
          if (blockedPlace.includes(playerPos))GG(5);
          else if (rabCatched && playerPos === 124)win();
        }, 10);
        break;
      default:
        break;
    }
  }

  document.onkeyup = function(ev){
    switch (ev.keyCode) {
      case 38:
        clearInterval(upInter);
        break;
      case 40:
        clearInterval(downInter);
        break;
      case 37:
        clearInterval(leftInter)
        break;
      case 39:
        clearInterval(rightInter)
        break;
      default:
        break
    }
  }

  let wolf = new Image();
  wolf.src = "./Pic/wolf.png";
  wolf.onload = wolfDraw;
  function wolfDraw(){
    ctx.drawImage(wolf, (wolfFrame * 36), (wolfDirection * 36), 36, 36, wolfX, wolfY, 36, 36);
    if(wolfX % 36 === 0 && wolfY % 36 === 0){
      posUpdate(wolfX, wolfY, "wolf");
      dirChanger(wolfPos, wolfDirection, "wolf", -1);
    }
  }
  wolfFrameInter = setInterval(() => {
    wolfFrame++;
    if (wolfFrame === 3)wolfFrame = 0;
  }, 120);

  let aWolf = new Image();
  aWolf.src = "./Pic/aWolf.png";
  aWolf.onload = aWolfDraw;
  function aWolfDraw(){
    ctx.drawImage(aWolf, (aWolfFrame * 36), (aWolfDirection * 36), 36, 36, aWolfX, aWolfY, 36, 36);
    if(aWolfX % 36 === 0 && aWolfY % 36 === 0){
      posUpdate(aWolfX, aWolfY, "aWolf");
      dirChanger(aWolfPos, aWolfDirection, "aWolf", -1);
    }
  }
  aWolfFrameInter = setInterval(() => {
    aWolfFrame++;
    if (aWolfFrame === 3)aWolfFrame = 0;
  }, 150);


  let rab = new Image();
  rab.src = "./Pic/rabbit.png";
  rab.onload = rabDraw;
  function rabDraw(){
    ctx.drawImage(rab, (rabFrame * 36), (rabDirection * 36), 36, 36, rabX, rabY, 36, 36);
    if (rabX % 36 === 0 && rabY % 36 === 0){
      posUpdate(rabX, rabY, "rab");
      dirChanger(rabPos, rabDirection, "rab", -1);
    }

    if (rabDirection === 0 && playerPos == rabPos+21){
      rabX = decoder(rabPos)[0];
      rabY = decoder(rabPos)[1];
      dirChanger(rabPos, rabDirection, "rab", 0);
    }
    else if (rabDirection === 1 && playerPos == rabPos-1){
      rabX = decoder(rabPos)[0];
      rabY = decoder(rabPos)[1];
      dirChanger(rabPos, rabDirection, "rab", 1);
    }
    else if (rabDirection === 2 && playerPos == rabPos+1){
      rabX = decoder(rabPos)[0];
      rabY = decoder(rabPos)[1];
      dirChanger(rabPos, rabDirection, "rab", 2);
    }
    else if (rabDirection === 3 && playerPos == rabPos-21){
      rabX = decoder(rabPos)[0];
      rabY = decoder(rabPos)[1];
      dirChanger(rabPos, rabDirection, "rab", 3);
    }
  }
  rabFrameInter = setInterval(() => {
    rabFrame++;
    if (rabFrame === 3)rabFrame = 0;
  }, 90);

  function walk(dir, who){
    switch (dir) {
      case 0:
        if (who === "wolf")wolfY += wolfSpeed;
        else if (who === "aWolf") aWolfY += wolfSpeed;
        else if (who === "rab") rabY += rabSpeed;
        break;
      case 1:
        if (who === "wolf")wolfX -= wolfSpeed;
        else if (who === "aWolf") aWolfX -= wolfSpeed;
        else if (who === "rab") rabX -= rabSpeed;
        break;
      case 2:
        if (who === "wolf")wolfX += wolfSpeed;
        else if (who === "aWolf") aWolfX += wolfSpeed;
        else if (who === "rab") rabX += rabSpeed;
        default:
        break;
      case 3:
        if (who === "wolf")wolfY -= wolfSpeed;
        else if (who === "aWolf") aWolfY -= wolfSpeed;
        else if (who === "rab") rabY -= rabSpeed;
        break
    }
  }

  function dirChanger(pos, dir, who, block){
    let avail = [];
    if (block != 2 && dir !== 1 && !(blockedPlace.includes(pos + 1)))avail[avail.length] = 2;
    if (block != 1 && dir !== 2 && !(blockedPlace.includes(pos - 1)))avail[avail.length] = 1;
    if (block != 0 && (who != "wolf" || pos < 105) && pos < 210 && dir !== 3 && !(blockedPlace.includes(pos + 21)))avail[avail.length] = 0;
    if (block != 3 && (who != "aWolf" || pos > 125) && pos > 20 && dir !== 0 && !(blockedPlace.includes(pos - 21)))avail[avail.length] = 3;
    if (avail.length === 0){
      switch (dir) {
        case 0:
          dir = 3;
          break;
        case 1:
          dir = 2;
          break;
        case 2:
          dir = 1;
          break;
        case 3:
          dir = 0;
          break;
        default:
          break
      }
      if (who === "wolf") wolfDirection = dir;
      else if (who === "aWolf") aWolfDirection = dir;
      else if (who === "rab") rabDirection = dir;
    }
    else{
      let a = Math.floor(Math.random() * avail.length);
      if (who === "wolf") wolfDirection = avail[a];
      else if (who === "aWolf") aWolfDirection = avail[a];
      else if (who === "rab") rabDirection = avail[a];
    }
  }

  function posUpdate(x, y, who){
    y = Math.floor(y / 36);
    x = Math.floor(x / 36);
    if (who === "wolf") wolfPos = (y * 21) + x;
    else if (who === "aWolf") aWolfPos = (y * 21) + x;
    else if (who === "player") playerPos = (y * 21) + x;
    else if (who === "rab") rabPos = (y * 21) + x;
  }

  function decoder(num){
    let x = num % 21;
    let y = (num - x) / 21;
    x = x * 36;
    y = y * 36;
    return ([x, y])
  }

  function GG(){
    restart(lives, level);
    gameOver = true;
    lives--;
    ctx.font = "100px Arial";
    if (lives === 0)ctx.fillText("YOU LOSE", 135, 215);
    else{
      setTimeout(()=>{gameOver = false},1000);
      ctx.fillText("YOU DIE", 150, 215);
      ctx.font = "50px Arial";
      ctx.fillText("Lives left: " + lives, 230, 260);
    }
  }

  function win(){
    restart(lives, level);
    document.getElementsByClassName("mark")[0].src = "./Pic/uncheckMark.png";
    gameOver = true;
    ctx.font = "100px Arial";
    if (level === 2){
      clearInterval(startInter);
      ctx.fillText("YOU WIN", 150, 215);
    }
    else{
      level++;
      backgr.src = "./Pic/level_2.png";
      blockedPlace = lvl_2_BlockedPlace;
      setTimeout(()=>{gameOver = false},1000);
      lives++;
    }
  }

  function rabCatch(){
    document.getElementsByClassName("mark")[0].src = "./Pic/checkMark.png";
    rabCatched = true;
  }

  function restart(l, lev){
    clearInterval(startInter);
    clearInterval(rightInter);
    clearInterval(leftInter);
    clearInterval(upInter);
    clearInterval(downInter);
    gameStart = false;
    lives = l;
    level = lev;
    rabCatched = false;
    wolfDirection = 5;
    wolfPos = 40;
    wolfX = decoder(wolfPos)[0];
    wolfY = decoder(wolfPos)[1];
    aWolfDirection = 5;
    aWolfPos = 208;
    aWolfX = decoder(aWolfPos)[0];
    aWolfY = decoder(aWolfPos)[1];
    rabDirection = 5;
    rabPos = 106;
    rabX = decoder(rabPos)[0];
    rabY = decoder(rabPos)[1];
    playerDirection = 5;
    playerPos = 124;
    playerX = decoder(playerPos)[0];
    playerY = decoder(playerPos)[1];
  }

  function start(){
    if(!gameStart)return
    ctx.clearRect(0, 0, 756, 396);
    backgrDraw();
    wolfDraw();
    walk(wolfDirection, "wolf");
    aWolfDraw();
    walk(aWolfDirection, "aWolf");
    if(!(rabCatched)){
      rabDraw();
      walk(rabDirection, "rab");
    }
    playerDraw();
    cellsDraw();
    if (wolfPos === playerPos)GG();
    else if (aWolfPos === playerPos)GG();
    else if (rabPos === playerPos) rabCatch();
    else if (wolfPos === rabPos && !(rabCatched))GG();
    else if (aWolfPos === rabPos && !(rabCatched))GG();
  }
}

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
