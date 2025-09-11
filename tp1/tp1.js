// Alumna: Lihué A. Milano
// Comisión: 3
// TP 1 Programación para medios interactivos orientada a las tecnologías web
// https://youtu.be/xn_pxQDOzLs?si=t0_NS2cFkiIZ4twY

let colores = []; //variables pasan a ser LET
let colum = 6;    //cantidad de columnas
let fila = 6;     //cantidad de filas
let tam = 65;     //tamaño de cada celda
let img;

function preload () { //Cargar un archivo antes de que corra setup (empiece el programa)
  img = loadImage("programacion.png"); //nos aseguramos de que la imagen esté cargada antes de setup(), y la carga en variable "img"
}

function setup() {
  createCanvas (800, 400) ; //crear lienzo de este tamaño
   // canvas.oncontextmenu = () => false; // bloquear menú contextual
  for (let k = 0; k < colum; k++) {
    colores[k] = [];
    for (let i = 0; i < fila; i++) {
      colores[k][i] = color(255); // asigno color blanco
    }
  }
}


function draw() {
  background (255) ;
  image (img, 0, 0) ; //funcion donde cargamos y ponemos lugar de la imagen
  stroke(0);       // Color negro para la línea
  strokeWeight(2); // Grosor de la línea
  line (400, 0, 400, 400) ; //linea del medio
  for (let k = 0; k < colum; k++ ) { // bucle para las 6 columnas
    for (let i =0; i<fila; i++ ) { // bucle para las 6 filas
      let x = width/2 + k * tam; // Calcula la posición X de cada figura (empieza en la mitad del sketch y suma tam)
      let y = i * tam; // Calcula la posición Y de cada figura
      fill (colores [k][i]); // usa el color guardado
      figura (x, y, tam) ;//llama la función para dibujar figura
    }
  }
}
//Funcion que no retorna valor
function figura (x, y, s) {
  const cuad = 6; //cantidad de cuadrados dentro de la figura
  rectMode (CORNER) ; //porque va orientado desde la esquina
  // Distancia entre el mouse y el centro de la figura

  let escala = obtesc(x, y); //escala segun distancia al mouse
  for (let i = 0; i < cuad; i++ ) {
    let lado = s * (1.1 - i * 0.1) * escala ; //Tamaño ajustado según escala (1.0=tamaño normal, 0,1=mas pequeño)
    rect(x, y, lado, lado); //se invoca para dibujar cada cuadrado
  }
}
function obtesc(x, y) {
  let d = dist(x, y, mouseX, mouseY); // distancia al mouse
  let escala = map(d, 0, 200, 0.4, 1.0); // si está cerca, achica; si está lejos, normal
  escala = constrain(escala, 0.4, 1.0);   // limita el rango
  return escala;
}
function mousePressed() {
  if (mouseButton === LEFT) { //si se hace click izquierdo se asignan colores aleatorios
    for (let k = 0; k < colum; k++) { //Este bucle se ejecuta 6 veces k: 0, 1, 2, 3, 4, 5
      for (let i = 0; i < fila; i++) {
        colores[k][i] = color(random(255), random(255), random(255));
      }
    }
  } else if (mouseButton === RIGHT) { // si se hace click derecho se reinicia a blanco
    for (let k = 0; k < colum; k++) {
      for (let i = 0; i < fila; i++) {
        // reinicia a blanco
        colores[k][i] = color(255);
      }
    }
  }
}
