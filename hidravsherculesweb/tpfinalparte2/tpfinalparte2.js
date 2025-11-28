//Alan Persico, Lihué Milano
//Com 3
//link youtube: https://youtu.be/o0-m3B8dvqw?si=mGYdMucsEuGxohi6
let juego; 
let sonidoBatalla;
let imagenes = [];
let fondo;

function preload() {
  fondo = loadImage('data/fondobatalla.webp');
  imagenes[1] = loadImage('data/hidrafoto.png');
  imagenes[2] = loadImage('data/herculesfoto.png');
  sonidoBatalla = loadSound('data/musicafondo.mp3');
}

function setup() {
  createCanvas(640, 480);
  rectMode(CENTER);
  imageMode(CENTER);
  textAlign(CENTER, CENTER);
  textSize(20);

  juego = new Batalla(); 
}

function draw() {
  juego.actualizar();
  juego.dibujar();
}


class Batalla {
  constructor() {
    this.estado = 0;   // pantalla actual
    this.estadoBatalla = 0;
    this.sonidoReproducido = false;

    this.player = new Player(100, 400, 100, 100);
    this.npc = new Npc(540, 100, 100, 100);

    this.vida = new Vida(100, 300, 150, 20, 0, 255, 0);
    this.vidaNpc = new VidaNpc(540, 200, 150, 20, 0, 255, 0);

    this.turnos = new Turnos();

    this.botonStart = new Boton("START", width/2-60, 300, () => {
      this.estado = 1;
      this.sonidoReproducido = false;
    });

    this.botonTutorial = new Boton("TUTORIAL", width/2-60, 360, () => {
      this.estado = 2;
    });

    this.botonVolver = new Boton("VOLVER", width/2-60, 420, () => {
      this.estado = 0;
    });
  }

  actualizar() {

    if (this.estado === 0) {
      this.resetearBatalla();
      this.botonStart.mostrar();
      this.botonTutorial.mostrar();
      this.botonVolver.ocultar();
    }

    if (this.estado === 1) {
      this.botonStart.ocultar();
      this.botonTutorial.ocultar();
      this.botonVolver.ocultar();

      if (!this.sonidoReproducido) {
        sonidoBatalla.play();
        this.sonidoReproducido = true;
      }

      // Cambios de turno
      if (this.estadoBatalla == 0) {
        this.turnos.turnoPlayer();
      } else if (this.estadoBatalla == 1) {
        this.turnos.turnoNpc();
      } else if (this.estadoBatalla == 2) {
        this.turnos.ataqueNpc();
      } else if (this.estadoBatalla == 3) {
        this.turnos.ataquePlayer();
      }

      // Revisar derrota y victoria
      if (this.vida.ancho < 10) this.estado = 3;
      if (this.vidaNpc.ancho < 10) this.estado = 4;
    }

    if (this.estado === 2) {
      this.botonStart.ocultar();
      this.botonTutorial.ocultar();
      this.botonVolver.mostrar();
    }

    if (this.estado === 3 || this.estado === 4) {
      this.botonVolver.mostrar();
    }
  }

  dibujar() {
    background(0);

    if (this.estado === 0) {
      background(0, 255, 0);
      text("HIDRA VS HÉRCULES", width/2, 150);
      return;
    }

    if (this.estado === 2) {
      background(94,172,98);
      fill(255);
      text("Usa las teclas 1,2,3,4 para atacar a Hércules", width/2, height/2);
      return;
    }

    if (this.estado === 3) {
      background(255,0,0);
      fill(255);
      text("PERDISTE", width/2, height/2);
      text("Lihué Milano, Alan Persico, Com 3", width/2, 260);
      return;
    }

    if (this.estado === 4) {
      background(0,255,0);
      fill(255);
      text("GANASTE", width/2, height/2);
      text("Lihué Milano, Alan Persico, Com 3", width/2, 260);
      return;
    }

    image(fondo, width/2, height/2);
    this.player.dibuja();
    this.npc.dibuja();
    this.vida.dibuja();
    this.vidaNpc.dibuja();

    if (this.estadoBatalla === 0) {
      stroke (0) ;
      text("Es tu turno", width/2, 420);
      text("1-Mordida  2-Garras  3-Cabezazo  4-Veneno", width/2, 450);
    }

    if (this.estadoBatalla === 1) {
      stroke (0);
      text("Turno de Hércules", 200, 180);
      text("Presioná flecha derecha", 200, 210);
    }
  }

  resetearBatalla() {
    this.estadoBatalla = 0;
    this.turnos.tiempo = 0;
    this.vida.ancho = 150;
    this.vidaNpc.ancho = 150;

    // colores
    this.vida.r = this.vidaNpc.r = 0;
    this.vida.g = this.vidaNpc.g = 255;
    this.vida.b = this.vidaNpc.b = 0;
  }

  ataquePlayer(tipo) {
    if (tipo === 1) this.vidaNpc.ancho -= 10;
    if (tipo === 2) this.vidaNpc.ancho -= 30;
    if (tipo === 3) this.vidaNpc.ancho -= 5;
    if (tipo === 4) this.vidaNpc.ancho -= 40;

    this.estadoBatalla = 3;
  }

  ataqueNpc() {
    this.vida.disminuye();
    this.estadoBatalla = 2;
  }
}


class Boton {
  constructor(texto, x, y, accion) {
    this.btn = createButton(texto);
    this.btn.position(x, y);
    this.btn.size(120, 40);
    this.btn.style("font-size", "16px");
    this.btn.style("background-color", "#04F404");
    this.btn.style("color", "white");
    this.btn.style("border-radius", "8px");
    this.btn.style("cursor", "pointer");
    this.btn.mousePressed(accion);
  }

  mostrar() { this.btn.show(); }
  ocultar() { this.btn.hide(); }
}

class Player {
  constructor(x, y, ancho, alto) {
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
  }
  dibuja() { image(imagenes[1], this.x, this.y, this.ancho, this.alto); }
}

class Npc {
  constructor(x, y, ancho, alto) {
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
  }
  dibuja() { image(imagenes[2], this.x, this.y, this.ancho, this.alto); }
}

class Vida {
  constructor(x, y, ancho, alto, r, g, b) {
    this.x = x; this.y = y;
    this.ancho = ancho; this.alto = alto;
    this.r = r; this.g = g; this.b = b;
  }
  dibuja() { fill(this.r, this.g, this.b); rect(this.x, this.y, this.ancho, this.alto); }
  disminuye() { this.ancho -= random(5, 50); }
}

class VidaNpc extends Vida {}

class Turnos {
  constructor() { this.tiempo = 0; }
  turnoPlayer() { this.tiempo = 0; }
  ataquePlayer() { if (++this.tiempo === 100) juego.estadoBatalla = 1; }
  turnoNpc() { this.tiempo = 0; }
  ataqueNpc() { if (++this.tiempo === 100) juego.estadoBatalla = 0; }
}

function keyPressed() {
  if (juego.estado !== 1) return;

  // Turno del jugador
  if (juego.estadoBatalla === 0) {
    if (key === "1") juego.ataquePlayer(1);
    if (key === "2") juego.ataquePlayer(2);
    if (key === "3") juego.ataquePlayer(3);
    if (key === "4") juego.ataquePlayer(4);
  }

  // Turno del NPC
  if (juego.estadoBatalla === 1 && keyCode === RIGHT_ARROW) {
    juego.ataqueNpc();
  }
}
