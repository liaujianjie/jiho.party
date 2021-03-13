let previousTimestamp = null;
let paused = false;

const jizzhoes = [];

const scheduleNextFrame = () =>
  requestAnimationFrame((timestamp) => {
    const timeElapsed = (timestamp - previousTimestamp) / 1000; // seconds
    previousTimestamp = timestamp;

    // update jizzhoes
    jizzhoes.forEach((jizzho) => {
      updateJizzho(jizzho, timeElapsed);
    });

    // scheuld next frame if not paused
    if (!paused) {
      scheduleNextFrame();
    }
  });

export function startPhysics() {
  paused = false;
  scheduleNextFrame();
}

export function stopPhysics() {
  paused = true;
}

export function jizzho() {
  const img = document.createElement("img");
  img.src = "/jizzho.png";
  img.style.width = "80px";
  img.style.height = "80px";
  img.style.position = "absolute";
  img.style.pointerEvents = "none";
  img.style.transform = `rotate(${(Math.random() - 0.5) * 90}deg)`;

  const appContainer = document.getElementById("App");
  appContainer.append(img);

  const jizzho = {
    x: 341,
    y: 11,
    vX: (Math.random() - 0.5) * 400,
    vY: -500,
    aX: 0,
    aY: 400,
    img
  };
  jizzhoes.push(jizzho);

  updateJizzho(jizzho, 0);
}

function updateJizzho(jizzho, timeElapsed) {
  jizzho.x = jizzho.x + jizzho.vX * timeElapsed;
  jizzho.y = jizzho.y + jizzho.vY * timeElapsed;
  jizzho.vX = jizzho.vX + jizzho.aX * timeElapsed;
  jizzho.vY = jizzho.vY + jizzho.aY * timeElapsed;

  jizzho.img.style.left = jizzho.x - 40 + "px";
  jizzho.img.style.top = jizzho.y - 40 + "px";
}