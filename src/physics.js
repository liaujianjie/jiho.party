let previousTimestamp = null;
let paused = false;

const jizzhoes = new Set();

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
  img.style.left = "0px";
  img.style.top = "0px";

  const appContainer = document.getElementById("App");
  appContainer.append(img);

  const jizzho = {
    img,
    scale: Math.random() + 0.5,
    x: 341,
    y: 11,
    vX: (Math.random() - 0.5) * 400,
    vY: -500,
    aX: 0,
    aY: 400,
    a: (Math.random() - 0.5) * 90,
    vA: (Math.random() - 0.5) * 1000,
  };
  jizzhoes.add(jizzho);

  updateJizzho(jizzho, 0);
}

function updateJizzho(jizzho, timeElapsed) {
  jizzho.x = jizzho.x + jizzho.vX * timeElapsed;
  jizzho.y = jizzho.y + jizzho.vY * timeElapsed;
  jizzho.vX = jizzho.vX + jizzho.aX * timeElapsed;
  jizzho.vY = jizzho.vY + jizzho.aY * timeElapsed;

  jizzho.a = jizzho.a + jizzho.vA * timeElapsed;

  jizzho.img.style.transform = [
    `translate(${jizzho.x - 40}px, ${jizzho.y - 40}px)`,
    `rotate(${jizzho.a}deg)`,
    `scale(${jizzho.scale}, ${jizzho.scale})`,
  ].join(" ");

  // GC jizzho if occluded
  if (jizzhoOccluded(jizzho.img)) {
    jizzho.img.remove();
    jizzhoes.delete(jizzho);
  }
}

/**
 * Returns `true` if jizzho is out of viewport.
 *
 * Adapted from: https://stackoverflow.com/a/125106/4773291
 */
function jizzhoOccluded(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while (el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  // Add 1000 because `offset*` doesn't account for scale transforms.
  return !(
    top + height <= window.pageYOffset + window.innerHeight + 1000 &&
    left + width <= window.pageXOffset + window.innerWidth + 1000
  );
}
