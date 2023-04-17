      /*
       * Falling Sand Algorithm Demo
       * Public Domain
       * modifed par manono (biotop)
       */


// modifier structure ?? 


      var width = 100;
      var height = 100;
      var cellSize = 4;
      var cvs = document.createElement('canvas');
      document.body.appendChild(cvs);
      cvs.width = width * cellSize;
      cvs.height = height * cellSize;
      var ctx = cvs.getContext('2d');
      var buffer = [];    
      var timecounter = 0; 
      var EMPTY = 0;
      var WALL = 1;
      var SAND = 2;
      var WATER = 3;
      var DAPHNIA = 4;
      var DAPHNIAFULL = 5;
      var EGGS = 6;
      var ALGAE = 7;
      var LIGHT = 8;
      var colors = {};
      colors[EMPTY] = '#999';
      colors[WALL] = '#444';
      colors[SAND] = '#990';
      colors[WATER] = '#00f';
      colors[DAPHNIA] = "#f0f";
      colors[DAPHNIAFULL] = "#f5f";
      colors[EGGS] = " #ffcce6"
      colors[ALGAE] = "#2f5"
      colors[LIGHT] = "#000"

      // set all cells to empty
      for (var i = 0; i < width * height; i++)
          buffer[i] = EMPTY;

      // set buffer at location (x, y)
      function setBuf(x, y, val) {
          buffer[x + y * width] = val;
      }

      // read buffer at location (x, y)
      function getBuf(x, y) {
          if (x < 0 || x >= width ||
              y < 0 || y >= height)
              return EMPTY;
          return buffer[x + y * width];
      }

      // fill with water
      for (var y = 0.1 * height; y < height -1; y++) {
        for (var x = 0; x < width; x++) {
          setBuf(x, y, WATER);
        }
      }

      //fill with sand
      for (var y = height * 0.5 ; y < height ; y++) {
        for (var x = width*0.25; x < width*0.75; x++) {
          var rand = Math.random() <0.9 ? 0 : 1; 
          if (rand == 1)
            setBuf(x, y, SAND);
        }
      }
      // put some wall (1) down //modifié pour recouvrir otut le sol 
      for (var x = 0; x <= width; x++) 
          setBuf( x , height - 1 , WALL);

      // put edges on wall // modifié pour recouvrir les bords 
      for (var y = height; y > 0; y--) {
          setBuf(Math.floor(width) - 1, y, WALL);
          setBuf(Math.floor(width) /*+ 10*/, y, WALL);
      }

      // set a light point 
      

      // add initial amount of daphnia
      for (var y = 10 ; y < height-10; y++) {
        for (var x = 10; x < width-10; x++) {
          var rand = Math.random() <0.99 ? 0 : 1; 
          if (rand == 1)
            setBuf(x, y, DAPHNIA);
        }
      }

      // add initial amount of algae
      for (var y = 10 ; y < height-10; y++) {
        for (var x = 10; x < width-10; x++) {
          var rand = Math.random() <0.99 ? 0 : 1; 
          if (rand == 1)
            setBuf(x, y, ALGAE);
        }
      }   

      function placeSand() {
          // place sand at top of screen
          setBuf(Math.floor(width / 2) + Math.floor(Math.random() * 6) - 3, 2, SAND);
      }

      function placeWater() {
          // place water at the top of screen
          setBuf(Math.floor(width / 2) + Math.floor(Math.random() * 6) - 3, 3, WATER);
        }

      function rain() {
        // place water at the top of screen
      for (var n = 0; n <= 10; n++) 
        setBuf(Math.floor(Math.random() * width) - 3, 0, WATER);
       }

      function placeDaphnia(){
          // place daphnia at the top of screen
          setBuf(Math.floor(Math.random() * width) - 3, 3, DAPHNIA);        
      }

      function daphnialifecycle(){
        
      }


      var emptyOrLiquid = [EMPTY, WATER, DAPHNIA];

      function think() {
          for (var y = height - 1; y >= 0; y--) {
              var moveHoriz = [];
              for (var x = 0; x < width; x++) {
                  // set dir to +1 or -1 randomly
                  var dirx = Math.random() < 0.5 ? -1 : 1;               
                  var diry = Math.random() < 0.5 ? -1 : 1;   
                  var dirb = Math.random() <0.1 ? 0 : 1; //valeur done propension a deplacement verticalOUhorizontal
                  var grow = Math.random() <0.99 ? 0 : 1; //valeur done vitesse de croissance algae
                  var timecounter = timecounter + 1;

                  if (getBuf(x, y) == SAND) { // if we have sand
                      if (emptyOrLiquid.indexOf(getBuf(x, y + 1)) >= 0) { // if empty/liquid below
                          setBuf(x, y, getBuf(x, y + 1)); // clear sand
                          setBuf(x, y + 1, SAND); // move sand
                      } else if (emptyOrLiquid.indexOf(getBuf(x + dirx, y + 1)) >= 0) { // if empty/liquid diagonal
                          setBuf(x, y, getBuf(x + dirx, y + 1)); // clear sand
                          setBuf(x + dirx, y + 1, SAND); // move sand
                      }
                  } 

                  else if (getBuf(x, y) == WATER) { // if we have water
                      if (getBuf(x, y + 1) == EMPTY) { // if empty below
                          setBuf(x, y, EMPTY); // clear water
                          setBuf(x, y + 1, WATER); // move water
                      } /*else if (getBuf(x + dir, y) == EMPTY) {
                          moveHoriz.push({
                                  x: x,
                                  y: y,
                                  nx: x + dir,
                                  element: WATER
                              });
                      }*/
                  } 

                  else if (getBuf(x, y) == DAPHNIA) {  // if we have water
                      if (getBuf(x, y + 1) == EMPTY) { // if empty below
                          setBuf(x, y, EMPTY); // clear 
                          setBuf(x, y + 1, DAPHNIA); // move 

                      } /*else if (getBuf(x + dir, y) == EMPTY) { //move horizontal quand ajout a fluid 
                          moveHoriz.push({
                                  x: x,
                                  y: y,
                                  nx: x + dir,
                                  element: DAPHNIA
                              });

                      }*/ else if (dirb == 1 && emptyOrLiquid.indexOf(getBuf(x, y+diry)) >= 0) { // if empty/liquid up
                          setBuf(x, y, getBuf(x, y + diry)); // clear sand
                          setBuf(x, y + diry, DAPHNIA); // move sand
                      }
                        else if (dirb == 0 && emptyOrLiquid.indexOf(getBuf(x + dirx, y )) >= 0) { // if empty/liquid horiz
                          setBuf(x, y, getBuf(x + dirx, y)); // clear sand
                          setBuf(x + dirx, y, DAPHNIA); // move sand
                      }         
                        for (let i = -1; i <= 1; i++) {
                          for (let j = -1; j <= 1; j++) {
                            if (getBuf(x+i, y+j) == ALGAE) { // if algea
                            setBuf(x+i, y+j, WATER); // clear 
                            setBuf(x, y, DAPHNIAFULL); // move 
                          }
                        }
                      }
                    }




                  else if (getBuf(x, y) == DAPHNIAFULL) {  // if we have water
                    
                    if (getBuf(x, y + 1) == EMPTY) { // if empty below
                        setBuf(x, y, EMPTY); // clear 
                        setBuf(x, y + 1, DAPHNIAFULL); // move 
                    }
                      else if (dirb == 1 && emptyOrLiquid.indexOf(getBuf(x, y+diry)) >= 0) { // if empty/liquid up
                        setBuf(x, y, getBuf(x, y + diry)); // clear sand
                        setBuf(x, y + diry, DAPHNIAFULL); // move sand
                    }
                      else if (dirb == 0 && emptyOrLiquid.indexOf(getBuf(x + dirx, y )) >= 0) { // if empty/liquid horiz
                        setBuf(x, y, getBuf(x + dirx, y)); // clear sand
                        setBuf(x + dirx, y, DAPHNIAFULL); // move sand
                    }        
                    for (let i = -1; i <= 1; i++) { // manger meme quand full 
                          for (let j = -1; j <= 1; j++) {
                            if (getBuf(x+i, y+j) == ALGAE) { // if algea
                            setBuf(x+i, y+j, WATER); // clear 
                            setBuf(x, y, DAPHNIAFULL); // move 
                          }
                        }
                      } 
                  }


                  else if (getBuf(x, y) == ALGAE) { // if we have algae
                      if (getBuf(x, y + 1) == EMPTY) { // if empty below
                          setBuf(x, y, EMPTY); // clear 
                          setBuf(x, y + 1, ALGAE); // move 
                      }   
                      else if (grow == 1 && getBuf(x+dirx, y+diry) == WATER) { // grow
                          setBuf(x + dirx, y + diry, ALGAE); // add
                      }
                        else if (grow == 0 && getBuf(x+dirx, y+diry) == WATER) { // move
                         setBuf(x, y, getBuf(x + dirx, y + diry)); // clear 
                          setBuf(x + dirx, y + diry, ALGAE); // move 
                      } 
                  } 
              }

              /*for (var i = 0; i < moveHoriz.length; i++) {
                  var m = moveHoriz[i];
                  if (getBuf(m.x, m.y) == m.element &&
                      getBuf(m.nx, m.y) == EMPTY) {
                      setBuf(m.x, m.y, EMPTY); // clear element
                      setBuf(m.nx, m.y, m.element); // move element
                  }
              }*/
          }
      }

      function draw() {
          for (var y = 0; y < height; y++) {
              for (var x = 0; x < width; x++) {
                  ctx.fillStyle = colors[getBuf(x, y)];
                  ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
              }
          }
      }

      function tick() {
          think();
          draw();
      }


      //setInterval(placeSand, 1000);       // place sand every second


      //setInterval(rain, 250);      // rain

      //setInterval(placeDaphnia, 100)

      // draw a frame every 0.01 second
      setInterval(tick, 10);

    