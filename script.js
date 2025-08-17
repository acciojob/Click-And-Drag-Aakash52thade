document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.items');
  if (!container) return;

  let isDown = false;
  let startX = 0;
  let startScrollLeft = 0;

  // Prevent native drag (images/text) interfering with our drag-to-scroll
  container.addEventListener('dragstart', (e) => e.preventDefault());

  container.addEventListener('mousedown', (e) => {
    // Only respond to left button
    if (e.button !== 0 && e.which !== 1) return;

    isDown = true;
    container.classList.add('active');

    // Where inside the container did we press?
    // Use pageX so Cypress { pageX: ... } works reliably
    startX = e.pageX - container.getBoundingClientRect().left;

    // Record current scroll position
    startScrollLeft = container.scrollLeft;

    // Avoid text selection while dragging
    e.preventDefault();
  });

  const stopDragging = () => {
    if (!isDown) return;
    isDown = false;
    container.classList.remove('active');
  };

  container.addEventListener('mouseleave', stopDragging);
  container.addEventListener('mouseup', stopDragging);

  container.addEventListener('mousemove', (e) => {
    if (!isDown) return;

    // Current mouse X relative to the container
    const x = e.pageX - container.getBoundingClientRect().left;

    // Movement delta; tweak multiplier for speed
    const walk = (x - startX) * 2;

    // Scroll opposite to mouse drag direction (feels natural)
    container.scrollLeft = startScrollLeft - walk;

    e.preventDefault();
  });
});
