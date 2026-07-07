// Video hover previews
document.querySelectorAll(".video-preview video").forEach((video) => {
  const preview = video.closest(".video-preview");
  video.addEventListener("loadeddata", () =>
    preview?.classList.add("has-media"),
  );
  preview?.addEventListener("mouseenter", () => {
    if (video.readyState > 2) video.play();
  });
  preview?.addEventListener("mouseleave", () => video.pause());
});

// Full project viewer
const viewer = document.querySelector(".project-viewer");
const projectData = {
  foley: {
    type: "Sound design / Foley",
    title: "Giving an animation weight and texture",
    description:
      "A study in making movement feel tangible through recorded and designed sound.",
    tools: ["Reaper", "Foley", "Sound design"],
    media: "audio",
    source: "assets/media/foley-animation.mp3",
  },
  led: {
    type: "Motion / Installation",
    title: "Abstract film for monumental LED screens",
    description:
      "A large-format motion study built around scale, rhythm, colour, and the architecture of a public screen.",
    tools: ["After Effects", "Motion design"],
    media: "video",
    source: "assets/media/led-abstract.mp4",
  },
  world: {
    type: "Interactive / 3D web",
    title: "A digital world for an imaginary artist",
    description:
      "A personal experiment combining environmental storytelling, interaction, and an invented visual identity.",
    tools: ["Unity", "Blender", "JavaScript"],
    media: "link",
    source: "#",
  },
  edit: {
    type: "Video / Direction & edit",
    title: "Stories shaped through camera, rhythm and type",
    description:
      "Selected shooting, editing, and motion work assembled into a concise visual study.",
    tools: ["Premiere Pro", "After Effects"],
    media: "video",
    source: "assets/media/video-edit.mp4",
  },
};

document.querySelectorAll(".open-project").forEach((button) => {
  button.addEventListener("click", () => {
    const project = projectData[button.dataset.project];
    if (!project || !viewer) return;

    document.querySelector("#viewer-type").textContent = project.type;
    document.querySelector("#viewer-kicker").textContent = project.type;
    document.querySelector("#viewer-title").textContent = project.title;
    document.querySelector("#viewer-description").textContent =
      project.description;
    document.querySelector("#viewer-tools").innerHTML = project.tools
      .map((tool) => `<span>${tool}</span>`)
      .join("");

    const media = viewer.querySelector(".viewer-media");
    if (project.media === "audio")
      media.innerHTML = `<audio controls autoplay src="${project.source}"></audio>`;
    else if (project.media === "video")
      media.innerHTML = `<video controls autoplay src="${project.source}"></video>`;
    else
      media.innerHTML =
        '<div class="viewer-placeholder"><b>Enter the world</b><span>Interactive project link ready to connect</span></div>';

    if (typeof viewer.showModal === "function") viewer.showModal();
    else viewer.setAttribute("open", "");
  });
});

if (viewer) {
  viewer
    .querySelector(".viewer-close")
    ?.addEventListener("click", () => viewer.close());
  viewer.addEventListener("click", (event) => {
    if (event.target === viewer) viewer.close();
  });
  viewer.addEventListener("close", () => {
    viewer.querySelectorAll("audio, video").forEach((media) => media.pause());
  });
}

// Cursor-reactive hero spheres
const hero = document.querySelector(".hero");
const spheres = [...document.querySelectorAll(".sphere")];

if (
  hero &&
  spheres.length &&
  window.matchMedia("(pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const motion = spheres.map((sphere, index) => ({
    sphere,
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    strength: [42, -58, 74][index],
  }));

  hero.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;

    motion.forEach((item, index) => {
      const sphereRect = item.sphere.getBoundingClientRect();
      const dx = event.clientX - (sphereRect.left + sphereRect.width / 2);
      const dy = event.clientY - (sphereRect.top + sphereRect.height / 2);
      const distance = Math.hypot(dx, dy);
      const proximity = Math.max(0, 1 - distance / 190);
      const repelX = distance ? -(dx / distance) * proximity * 42 : 0;
      const repelY = distance ? -(dy / distance) * proximity * 42 : 0;

      item.targetX = nx * item.strength + repelX;
      item.targetY = ny * item.strength * (index === 1 ? -0.65 : 0.65) + repelY;
      item.sphere.classList.toggle("is-near", proximity > 0.22);
    });
  });

  hero.addEventListener("pointerleave", () => {
    motion.forEach((item) => {
      item.targetX = 0;
      item.targetY = 0;
      item.sphere.classList.remove("is-near");
    });
  });

  hero.addEventListener("pointerdown", (event) => {
    if (event.target.closest("a, button")) return;

    motion.forEach((item, index) => {
      item.targetX += (index % 2 ? -1 : 1) * (65 + index * 16);
      item.targetY += (index - 1) * 42;
      item.sphere.animate(
        [{ filter: "brightness(1.16)" }, { filter: "brightness(1)" }],
        { duration: 420, easing: "ease-out" },
      );
    });
  });

  const animateSpheres = () => {
    motion.forEach((item, index) => {
      item.x += (item.targetX - item.x) * (0.055 + index * 0.012);
      item.y += (item.targetY - item.y) * (0.055 + index * 0.012);
      item.sphere.style.transform = `translate3d(${item.x}px, ${item.y}px, 0)`;
    });
    requestAnimationFrame(animateSpheres);
  };

  animateSpheres();
}
