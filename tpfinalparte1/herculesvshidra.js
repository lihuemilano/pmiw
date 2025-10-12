//Alan Pérsico Lihue Milano Comisión 3




//introduccion
let imagenes=[];
let estado=0;
let botonsiguiente ;
let fuenteletra ; //declarar variable para letra
let botonfinal1 ;
let botonfinal2 ;
let botonreiniciar ;
let botonvolver;
let botoncreditos;
let sonido;



//videojuego
let player;
let hercules;
let hercules2;
let ubiX=25;
let ubiY=200;
var posX;
var posY;
var vel;
let tiempo=0;
let radio=50;
let tam=80;





function preload () {
 //introduccion
  fuenteletra = loadFont ('data/PressStart2P-Regular.ttf') ;
  imagenes[0] = loadImage('data/1.jpeg'); // pantalla 1
  imagenes[1] = loadImage('data/2.jpeg'); // pantalla 2
  imagenes[2] = loadImage('data/3.jpeg'); // pantalla 3
  imagenes[3] = loadImage('data/8.jpeg');
  imagenes[5] = loadImage('data/6.jpeg');
  sonido=loadSound ('data/sonido.mp3');
  
  
  //videojuego
  hercules=loadImage ('data/hercules.png');
  hercules2=loadImage ('data/hercules2.png');
}


function setup() {
  //intro
  createCanvas (640, 480);
  background (23, 75, 88);
  imageMode (CENTER);
  rectMode (CENTER);
  textAlign(CENTER, CENTER);
  textSize (20);
  
  botonsiguiente = createButton('SIGUIENTE');
  botonsiguiente.position(width / 2 - 50, height - 43);
  botonsiguiente.size(120, 40);
  botonsiguiente.style('font-size', '16px');
  botonsiguiente.style('background-color', '#04F404');
  botonsiguiente.style('color', 'white');
  botonsiguiente.style('border-radius', '8px');
  botonsiguiente.style('cursor', 'pointer');
  botonsiguiente.mousePressed(siguientepantalla);
  
  botonfinal1 = createButton('SALIR CORRIENDO');
  botonfinal1.position(45, 70);
  botonfinal1.size(550, 70);
  botonfinal1.style('font-size', '16px');
  botonfinal1.style('background-color', '#00ab41');
  botonfinal1.style('color', 'white');
  botonfinal1.style('border-radius', '8px');
  botonfinal1.style('cursor', 'pointer');
  botonfinal1.mousePressed(() => (estado = 5));
  botonfinal1.hide();

  botonfinal2 = createButton('ATACAR A LA BESTIA');
  botonfinal2.position(45, 170);
  botonfinal2.size(550, 70);
  botonfinal2.style('font-size', '16px');
  botonfinal2.style('background-color', '#00ab41');
  botonfinal2.style('color', 'white');
  botonfinal2.style('border-radius', '8px');
  botonfinal2.style('cursor', 'pointer');
  botonfinal2.mousePressed(() => (estado = 4));
  botonfinal2.hide();

  botonreiniciar = createButton('REINICIAR');
  botonreiniciar.position(width / 2 - 50, height - 43);
  botonreiniciar.size(120, 40);
  botonreiniciar.style('font-size', '16px');
  botonreiniciar.style('background-color', '#04F404');
  botonreiniciar.style('color', 'white');
  botonreiniciar.style('border-radius', '8px');
  botonreiniciar.style('cursor', 'pointer');
  botonreiniciar.mousePressed (()=> (estado = 0));
  botonreiniciar.hide();
  
   botonvolver=createButton('VOLVER');
   botonvolver.position(width / 2 - 50, height - 43);
  botonvolver.size(120, 40);
  botonvolver.style('font-size', '16px');
  botonvolver.style('background-color', '#04F404');
  botonvolver.style('color', 'white');
  botonvolver.style('border-radius', '8px');
  botonvolver.style('cursor', 'pointer');
  botonvolver.mousePressed(() => (estado = 0));
  botonvolver.hide();
  
  
 botoncreditos=createButton('VER CREDITOS');
   botoncreditos.position(width /2, 43);
  botoncreditos.size(120, 40);
  botoncreditos.style('font-size', '16px');
   botoncreditos.style('background-color', '#04F404');
  botoncreditos.style('color', 'white');
  botoncreditos.style('border-radius', '8px');
  botoncreditos.style('cursor', 'pointer');
  botoncreditos.mousePressed(() => (estado = 6));
  botoncreditos.hide();
  
  
  
  
  
  //videojuego
  posX=800;//x del veneno
  vel=3;//velocidad del veneno
  imageMode (CENTER);
  rectMode (CENTER);
  ellipseMode (CENTER);
}



function siguientepantalla() {
  if (estado < 3) {
    estado++;
  } else if (estado === 2) {
    estado = 3;
  }
}




function draw() {
 background(0);
    botonvolver.mousePressed(() => (estado = 0));
     botoncreditos.mousePressed(() => (estado = 6));
  textFont(fuenteletra);
  fill(255);
  textSize(20);

  if (estado === 0) {
    image(imagenes[0], width / 2, height / 2, width, height);
    text('COMENZAR AVENTURA', width / 2, height - 80);
    botoncreditos.hide();
    botonvolver.hide();
    ubiX=25;
    ubiY=200;
  } else if (estado === 1) {
    image(imagenes[1], width / 2, height / 2, width, height);
    textAlign(CENTER, TOP);
    textLeading(30);
    text(
      'BIEN CERQUITA DEL RÍO PARANÁ LA GENTE VIVÍA ATORMENTADA POR UNA BESTIA RARA; UNA HIDRA DE SIETE CABEZAS. UN MUCHACHO DEL  PUEBLO SE CANSÓ DE TENERLE MIEDO, SE CALZÓ EL PONCHO Y ARRANCÓ PARA EL RÍO',
      width / 2,
      120,
      560
    );
  } else if (estado === 2) {
    image(imagenes[2], width / 2, height / 2, width, height);
    textAlign(CENTER);
    text(
      'SE ACERCÓ HASTA EL RÍO CUANDO DE GOLPE... SURGIÓ ENTRE LAS AGUAS VERDES LA BESTIA',
      width / 2,
      height - 174,
      560
    );
  } else if (estado === 3) {
    image(imagenes[3], width / 2, height / 2, width, height);
    text('QUÉ HACE AHORA?', width / 2, height - 130);
  } else if (estado === 4) {
     videojuego();
     
    } else if (estado === 5) {
      image(imagenes[5], width / 2, height / 2, width, height);
    text('EL MUCHACHO VUELVE A SU PUEBLITO', width / 2, height - 140, 560);
  }

  // Mostrar u ocultar botones
  if (estado === 0 || estado === 1 || estado === 2) {
    botonsiguiente.show();
   
  } else {
    botonsiguiente.hide();
  }

  if (estado === 3) {
    botonfinal1.show();
    botonfinal2.show();
  } else {
    botonfinal1.hide();
    botonfinal2.hide();
  }

  if (estado === 5) {
    botonreiniciar.show();
  } else {
    botonreiniciar.hide();
  }

 if (estado===6){
   background(0);
   text('Lihue Milano, Alan Pérsico, comisión 3', width/2, height/2, 560);
 }

}




function videojuego(){
   background (255, 0, 0);
   image (imagenes [1], width/2, height/2);
   fill (255);
text ('Usá las flechas para esquivar los ataques venenosos de la hidra!', 400, 10, 560); 



//movimiento de los ataques
  if (tiempo<2.66) {
    tiempo=tiempo+0.01;
  } else {
    tiempo = 0
  }
  if (tiempo==0) {
    posY=random (0, 400)
  }

//choque entre personaje y ataque
  var distancia= dist (posX, posY, ubiX, ubiY);

  if (distancia<40 && ubiX<640) {
    noLoop();
    jugador (2);
    fill (255);
    text ("GAME OVER", width/2,height/2);
    
  } else {
    jugador(1);
  }

//generar veneno
  if (posX>0) {
    posX=posX-vel;
  } else {
    posX=800
  }
  
  fill (0, 255, 0);
  ellipse (posX, posY, radio);



//fin del juego 
  if (ubiX==640) {
    background (0);
    fill (255);
    text ("Ganaste! Hércules logró llegar a la Hidra y la derrotó", width/2, height/2, 560);
  botonvolver.show();
  botoncreditos.show();
  }
   
}



//jugador y posicion inicial

function jugador (estadoPersonaje) {
  if (estadoPersonaje == 1) {
    image (hercules, ubiX, ubiY, tam, tam);
  } else if (estadoPersonaje==2) {
    image (hercules2, ubiX,ubiY, 120, 120);
  }
}

//mover jugador

function keyPressed () {
  if  (keyCode === LEFT_ARROW && ubiX>0 ) {
    ubiX-=5;
  } else if (keyCode=== RIGHT_ARROW && ubiX<640) {
    ubiX+=5;
  }

  if (keyCode === UP_ARROW && ubiY>0) {
    ubiY-=5;
  } else if (keyCode === DOWN_ARROW && ubiY<480) {
    ubiY+=5;
  }}
  
  function mouseClicked(){
    sonido.play();
  }
