// script.js
const box = document.getElementById('box');
const xRange = document.getElementById('xRange');
const yRange = document.getElementById('yRange');
const zRange = document.getElementById('zRange');
const rotateX = document.getElementById('rotateX');
const rotateY = document.getElementById('rotateY');
const rotateZ = document.getElementById('rotateZ');
const resetButton = document.getElementById('reset');
const widthInput = document.getElementById('width');
const heightInput = document.getElementById('height');
const depthInput = document.getElementById('depth');
const generateButton = document.getElementById('generate');

// Actualizar transformaciones en tiempo real
function updateTransform() {
  const x = xRange.value;
  const y = yRange.value;
  const z = zRange.value;
  const rotX = rotateX.value;
  const rotY = rotateY.value;
  const rotZ = rotateZ.value;

  box.style.transform = `
    translate3d(${x}px, ${y}px, ${z}px)
    rotateX(${rotX}deg)
    rotateY(${rotY}deg)
    rotateZ(${rotZ}deg)
  `;
}

// Escuchar cambios en los sliders
[xRange, yRange, zRange, rotateX, rotateY, rotateZ].forEach(slider => {
  slider.addEventListener('input', updateTransform);
});

// Reiniciar transformaciones
resetButton.addEventListener('click', () => {
  xRange.value = 0;
  yRange.value = 0;
  zRange.value = 0;
  rotateX.value = 0;
  rotateY.value = 0;
  rotateZ.value = 0;
  updateTransform();
});

// Generar caja con dimensiones específicas
generateButton.addEventListener('click', () => {
  const width = parseInt(widthInput.value, 10) || 100;
  const height = parseInt(heightInput.value, 10) || 100;
  const depth = parseInt(depthInput.value, 10) || 100;

  generateBox(width, height, depth);
});

function generateBox(width, height, depth) {
  box.innerHTML = ''; // Limpiar la caja anterior

  const faces = [
    { transform: `translateZ(${depth / 2}px)`, size: [width, height] },
    { transform: `translateZ(-${depth / 2}px) rotateY(180deg)`, size: [width, height] },
    { transform: `rotateY(90deg) translateZ(${width / 2}px)`, size: [depth, height] },
    { transform: `rotateY(-90deg) translateZ(${width / 2}px)`, size: [depth, height] },
    { transform: `rotateX(90deg) translateZ(${height / 2}px)`, size: [width, depth] },
    { transform: `rotateX(-90deg) translateZ(${height / 2}px)`, size: [width, depth] }
  ];

  faces.forEach(face => {
    const div = document.createElement('div');
    div.classList.add('face');
    div.style.width = `${face.size[0]}px`;
    div.style.height = `${face.size[1]}px`;
    div.style.transform = face.transform;
    box.appendChild(div);
  });
}