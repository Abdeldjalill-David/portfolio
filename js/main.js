document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const buildings = Array.from(document.querySelectorAll('.building'));
  const mapWrap = document.querySelector('.map-wrap');
  const tooltip = document.getElementById('mapTooltip');

  const updateTooltip = (event, label) => {
    if (!tooltip || !mapWrap) return;
    tooltip.textContent = label;
    const wrapRect = mapWrap.getBoundingClientRect();
    const x = event ? event.clientX - wrapRect.left : wrapRect.width / 2;
    const y = event ? event.clientY - wrapRect.top : wrapRect.height / 2;
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
    tooltip.classList.add('visible');
  };

  buildings.forEach((building) => {
    const label = building.dataset.name || 'Explore';
    const url = building.dataset.url;

    building.setAttribute('tabindex', '0');
    building.setAttribute('role', 'link');
    building.setAttribute('aria-label', label);

    const showTooltip = (event) => updateTooltip(event, label);
    const hideTooltip = () => tooltip && tooltip.classList.remove('visible');

    building.addEventListener('pointerenter', showTooltip);
    building.addEventListener('pointermove', showTooltip);
    building.addEventListener('pointerleave', hideTooltip);
    building.addEventListener('focus', () => {
      const rect = building.getBoundingClientRect();
      const wrapRect = mapWrap.getBoundingClientRect();
      tooltip.textContent = label;
      tooltip.style.left = `${rect.left - wrapRect.left + rect.width / 2}px`;
      tooltip.style.top = `${rect.top - wrapRect.top + rect.height / 2}px`;
      tooltip.classList.add('visible');
    });
    building.addEventListener('blur', hideTooltip);

    building.addEventListener('click', () => {
      if (url) {
        window.location.href = url;
      }
    });

    building.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (url) window.location.href = url;
      }
    });
  });
});
