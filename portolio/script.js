
shwo css and js
Friday 11:40 AM
CSS
JavaScript
Friday 11:40 AM
organize it
Friday 11:41 AM

Worked for 2m 51s
Organized both files:

Expanded the compressed CSS into readable blocks
Added section comments for navigation
Grouped JavaScript interactions by purpose
Preserved all existing behavior
Confirmed all 309 CSS blocks remain balanced
CSS · JavaScript

Friday 11:44 AM
User attachment
User attachment
these will be images, does not hv to be build
Friday 12:29 PM

Worked for 44s
Replaced the CSS-built case mockups with your supplied images for:

Sona Care
Common Ground
They retain responsive cropping, hover zoom, and cursor movement. Refresh the portfolio to see them.


Mira Sol - Product Designer
Website
Friday 12:30 PM
User attachment
remove this whole section
Friday 12:30 PM

Worked for 1m 24s
Removed the entire “My practice, remixed” section along with all related CSS and JavaScript. Refresh the portfolio to see the cleaner flow.


Mira Sol - Product Designer
Website
Friday 12:32 PM
show css and js
Saturday 10:41 AM
CSS
JavaScript
Saturday 10:42 AM




Outputs
/C:/Users/patan/Documents/Codex/2026-06-25/build-a-ux-designers-portfolio-for/outputs/index.html

Sources
No sources yet
build-a-ux-designers-portfolio-for
outputs
script.js
// Scroll reveal system
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((item, index) => {
  if (index < 3) item.style.transitionDelay = `${index * 90}ms`;
  observer.observe(item);
});

// Case-study cursor labels
document.querySelectorAll('.case-visual').forEach((visual) => {
  visual.addEventListener('mousemove', (event) => {
    const chip = visual.querySelector('.view-chip');
    if (!chip || window.innerWidth < 760) return;
    const rect = visual.getBoundingClientRect();
    const x = Math.max(72, Math.min(rect.width - 72, event.clientX - rect.left));
    const y = Math.max(36, Math.min(rect.height - 36, event.clientY - rect.top));
    chip.style.right = 'auto';
    chip.style.bottom = 'auto';
    chip.style.left = `${x}px`;
    chip.style.top = `${y}px`;
    chip.style.transform = 'translate(-50%, -50%)';
  });
});

// Subtle project artwork parallax
if (window.matchMedia('(pointer: fine)').matches) {
  document.querySelectorAll('.case-visual').forEach((visual) => {
    visual.addEventListener('mousemove', (event) => {
      const rect = visual.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      const object = visual.querySelector('img, .device, .dashboard');
      if (object) object.style.transform = `translate(${x * 9}px, ${y * 9}px) scale(1.015)`;
    });
    visual.addEventListener('mouseleave', () => {
      const object = visual.querySelector('img, .device, .dashboard');
      if (object) object.style.transform = '';
    });
  });
}

// Playground media filters
document.querySelectorAll('.media-filter').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.media-filter').forEach((item) => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll('.media-project').forEach((project) => {
      project.classList.toggle('is-filtered', button.dataset.filter !== 'all' && project.dataset.category !== button.dataset.filter);
    });
  });
});

// Foley player
const audio = document.querySelector('.project-audio');
const soundPreview = document.querySelector('.sound-preview');
const soundButton = document.querySelector('.sound-play');
const duration = document.querySelector('.media-duration');
const formatTime = (seconds) => Number.isFinite(seconds) ? `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(Math.floor(seconds % 60)).padStart(2, '0')}` : '--:--';

soundButton.addEventListener('click', () => {
  if (audio.readyState === 0) {
    document.querySelector('[data-project="foley"]').click();
    return;
  }
  if (audio.paused) audio.play(); else audio.pause();
});
audio.addEventListener('play', () => { soundPreview.classList.add('is-playing'); soundButton.querySelector('span').textContent = 'Ⅱ'; });
audio.addEventListener('pause', () => { soundPreview.classList.remove('is-playing'); soundButton.querySelector('span').textContent = '▶'; });
audio.addEventListener('timeupdate', () => { duration.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`; });

// Video hover previews
document.querySelectorAll('.video-preview video').forEach((video) => {
  video.addEventListener('loadeddata', () => video.closest('.video-preview').classList.add('has-media'));
  video.closest('.video-preview').addEventListener('mouseenter', () => { if (video.readyState > 2) video.play(); });
  video.closest('.video-preview').addEventListener('mouseleave', () => video.pause());
});

// Full project viewer
const viewer = document.querySelector('.project-viewer');
const projectData = {
  foley: { type: 'Sound design / Foley', title: 'Giving an animation weight and texture', description: 'A study in making movement feel tangible through recorded and designed sound.', tools: ['Reaper', 'Foley', 'Sound design'], media: 'audio', source: 'assets/media/foley-animation.mp3' },
  led: { type: 'Motion / Installation', title: 'Abstract film for monumental LED screens', description: 'A large-format motion study built around scale, rhythm, colour, and the architecture of a public screen.', tools: ['After Effects', 'Motion design'], media: 'video', source: 'assets/media/led-abstract.mp4' },
  world: { type: 'Interactive / 3D web', title: 'A digital world for an imaginary artist', description: 'A personal experiment combining environmental storytelling, interaction, and an invented visual identity.', tools: ['Unity', 'Blender', 'JavaScript'], media: 'link', source: '#' },
  edit: { type: 'Video / Direction & edit', title: 'Stories shaped through camera, rhythm and type', description: 'Selected shooting, editing, and motion work assembled into a concise visual study.', tools: ['Premiere Pro', 'After Effects'], media: 'video', source: 'assets/media/video-edit.mp4' }
};

document.querySelectorAll('.open-project').forEach((button) => {
  button.addEventListener('click', () => {
    const project = projectData[button.dataset.project];
    document.querySelector('#viewer-type').textContent = project.type;
    document.querySelector('#viewer-kicker').textContent = project.type;
    document.querySelector('#viewer-title').textContent = project.title;
    document.querySelector('#viewer-description').textContent = project.description;
    document.querySelector('#viewer-tools').innerHTML = project.tools.map((tool) => `<span>${tool}</span>`).join('');
    const media = viewer.querySelector('.viewer-media');
    if (project.media === 'audio') media.innerHTML = `<audio controls autoplay src="${project.source}"></audio>`;
    else if (project.media === 'video') media.innerHTML = `<video controls autoplay src="${project.source}"></video>`;
    else media.innerHTML = '<div class="viewer-placeholder"><b>Enter the world</b><span>Interactive project link ready to connect</span></div>';
    viewer.showModal();
  });
});

viewer.querySelector('.viewer-close').addEventListener('click', () => viewer.close());
viewer.addEventListener('click', (event) => { if (event.target === viewer) viewer.close(); });
viewer.addEventListener('close', () => { viewer.querySelectorAll('audio, video').forEach((media) => media.pause()); });

// Cursor-reactive hero spheres
const hero = document.querySelector('.hero');
const spheres = [...document.querySelectorAll('.sphere')];
if (hero && spheres.length && window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const motion = spheres.map((sphere, index) => ({
    sphere,
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    strength: [42, -58, 74][index]
  }));

  hero.addEventListener('pointermove', (event) => {
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
      item.sphere.classList.toggle('is-near', proximity > 0.22);
    });
  });

  hero.addEventListener('pointerleave', () => {
    motion.forEach((item) => {
      item.targetX = 0;
      item.targetY = 0;
      item.sphere.classList.remove('is-near');
    });
  });

  hero.addEventListener('pointerdown', (event) => {
    if (event.target.closest('a, button')) return;
    motion.forEach((item, index) => {
      item.targetX += (index % 2 ? -1 : 1) * (65 + index * 16);
      item.targetY += (index - 1) * 42;
      item.sphere.animate(
        [{ filter: 'brightness(1.16)' }, { filter: 'brightness(1)' }],
        { duration: 420, easing: 'ease-out' }
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

