const container = document.querySelector(".items");
const cubes = document.querySelectorAll(".item");

let activeCube = null;
let offsetX = 0;
let offsetY = 0;

// Enable dragging for each cube
cubes.forEach(cube => {
  cube.style.position = "absolute"; // allow free movement
  cube.addEventListener("mousedown", (e) => {
    activeCube = cube;

    // calculate offset so cube doesn't "jump" on click
    const rect = cube.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    cube.style.zIndex = 1000; // bring on top while dragging
    document.addEventListener("mousemove", moveCube);
    document.addEventListener("mouseup", dropCube);
  });
});

function moveCube(e) {
  if (!activeCube) return;

  const containerRect = container.getBoundingClientRect();
  const cubeRect = activeCube.getBoundingClientRect();

  // Calculate new positions
  let newLeft = e.clientX - containerRect.left - offsetX;
  let newTop = e.clientY - containerRect.top - offsetY;

  // Boundary conditions
  if (newLeft < 0) newLeft = 0;
  if (newTop < 0) newTop = 0;
  if (newLeft + cubeRect.width > containerRect.width) {
    newLeft = containerRect.width - cubeRect.width;
  }
  if (newTop + cubeRect.height > containerRect.height) {
    newTop = containerRect.height - cubeRect.height;
  }

  // Apply movement
  activeCube.style.left = newLeft + "px";
  activeCube.style.top = newTop + "px";
}

function dropCube() {
  if (!activeCube) return;
  activeCube.style.zIndex = 1;
  document.removeEventListener("mousemove", moveCube);
  document.removeEventListener("mouseup", dropCube);
  activeCube = null;
}
