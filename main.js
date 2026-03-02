(() => {
  const hero = document.querySelector(".amh-hero");
  if (!hero) return;

  const root = document.documentElement;
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  let latestY = window.scrollY || 0;
  let ticking = false;

  const progressInView = () => {
    const rect = hero.getBoundingClientRect();
    const vh = window.innerHeight || 1;

    const start = vh;
    const end = -rect.height;
    const p = (start - rect.top) / (start - end);

    return clamp(p, 0, 1);
  };

  const update = () => {
    ticking = false;

    const p = progressInView();

    const baseA = (p - 0.5) * 60;
    const baseB = (p - 0.5) * 95;

    const microA = Math.sin((latestY + 80) * 0.006) * 5;
    const microB = Math.sin((latestY + 140) * 0.006) * 7;

    root.style.setProperty("--layer-a-shift", `${(baseA + microA).toFixed(2)}px`);
    root.style.setProperty("--layer-b-shift", `${(baseB - microB).toFixed(2)}px`);
  };

  const onScroll = () => {
    latestY = window.scrollY || 0;
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", () => requestAnimationFrame(update));

  requestAnimationFrame(update);
})();



/*acces pattern*/
(function () {
  document.documentElement.classList.add("js-ready");
})();