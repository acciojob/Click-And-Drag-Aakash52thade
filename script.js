document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".items");
  const items = document.querySelectorAll(".item");

  let activeCube = null;
  let offsetX = 0;
  let offsetY = 0;

  items.forEach((cube, index) => {
    // Arrange in grid initially
    const col = index % 3;
    const row = Math.floor(index / 3);
    cube.style.left = `${20 + col * 120}px`;
    cube.style.top = `${20 + row * 120}px`;

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

    // Constrain inside container
    newLeft = Math.max(0, Math.min(newLeft, containerRect.width - cubeRect.width));
    newTop = Math.max(0, Math.min(newTop, containerRect.height - cubeRect.height));

    activeCube.style.left = `${newLeft}px`;
    activeCube.style.top = `${newTop}px`;
  });

  document.addEventListener("mouseup", () => {
    activeCube = null;
  });
});
