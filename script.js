document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".items");
  const items = document.querySelectorAll(".item");

  let activeCube = null;
  let offsetX = 0;
  let offsetY = 0;

  // Grid setup: 3 columns
  const cols = 3;
  const cubeSize = 100;
  const gap = 20;

  const totalWidth = cols * cubeSize + (cols - 1) * gap;
  const rows = Math.ceil(items.length / cols);
  const totalHeight = rows * cubeSize + (rows - 1) * gap;

  // Center the grid inside container
  const startX = (container.clientWidth - totalWidth) / 2;
  const startY = (container.clientHeight - totalHeight) / 2;

  items.forEach((cube, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    cube.style.left = `${startX + col * (cubeSize + gap)}px`;
    cube.style.top = `${startY + row * (cubeSize + gap)}px`;

    cube.addEventListener("mousedown", (e) => {
      activeCube = cube;
      const rect = cube.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
    });
  });

  document.addEventListener("mousemove", (e) => {
    if (!activeCube) return;

    const containerRect = container.getBoundingClientRect();
    const cubeRect = activeCube.getBoundingClientRect();

    let newLeft = e.clientX - containerRect.left - offsetX;
    let newTop = e.clientY - containerRect.top - offsetY;

    // Boundaries
    newLeft = Math.max(0, Math.min(newLeft, containerRect.width - cubeRect.width));
    newTop = Math.max(0, Math.min(newTop, containerRect.height - cubeRect.height));

    activeCube.style.left = `${newLeft}px`;
    activeCube.style.top = `${newTop}px`;
  });

  document.addEventListener("mouseup", () => {
    activeCube = null;
  });
});
