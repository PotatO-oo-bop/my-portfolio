(() => {
    const container = document.getElementById("hero-galaxy");

    if (!container) return;

    const darkPalette = [
        [205, 224, 255],
        [126, 184, 255],
        [104, 219, 236],
        [179, 146, 255],
        [229, 151, 226],
        [255, 255, 255]
    ];
    const lightPalette = [
        [37, 83, 173],
        [37, 99, 235],
        [8, 119, 145],
        [110, 68, 168],
        [165, 65, 140],
        [84, 96, 120]
    ];

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const pointerTarget = { x: 0, y: 0 };
    const pointerOffset = { x: 0, y: 0 };
    let particles = [];
    let animationTimer = null;
    let isVisible = true;
    let startTime = 0;

    container.appendChild(canvas);

    function particleCount(width) {
        const baseCount = Math.max(150, Math.min(520, Math.round(width * 0.38)));
        return window.matchMedia("(pointer: coarse)").matches
            ? Math.round(baseCount * 0.75)
            : baseCount;
    }

    function createParticles() {
        const width = container.clientWidth || window.innerWidth;
        const height = container.clientHeight || window.innerHeight;
        const count = particleCount(width);
        const centerX = width * 0.58;
        const centerY = height * 0.48;
        const maxRadius = Math.min(width * 0.68, height * 0.9);

        particles = Array.from({ length: count }, () => {
            const isArmParticle = Math.random() < 0.76;
            const orbit = Math.pow(Math.random(), isArmParticle ? 1.65 : 0.82);
            const angleSeed = Math.random() * Math.PI * 2;
            const armIndex = Math.random() * 3;
            const angle = isArmParticle
                ? armIndex + orbit * 5.5 + (Math.random() - 0.5) * 0.75
                : angleSeed;
            const toneIndex = Math.floor(Math.random() * darkPalette.length);

            return {
                radius: orbit,
                angle,
                size: Math.random() * 1.35 + 0.45,
                alpha: Math.random() * 120 + 50,
                speed: (Math.random() * 0.14 + 0.04) * (Math.random() < 0.5 ? -1 : 1),
                depth: Math.random() * 0.9 + 0.25,
                phase: Math.random() * Math.PI * 2,
                twinkle: Math.random() * 0.8 + 0.2,
                toneIndex,
                centerX,
                centerY,
                maxRadius
            };
        });

    }

    function resizeCanvas() {
        const rect = container.getBoundingClientRect();
        const width = Math.max(1, rect.width || window.innerWidth);
        const height = Math.max(1, rect.height || window.innerHeight);
        const ratio = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = Math.floor(width * ratio);
        canvas.height = Math.floor(height * ratio);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        createParticles();
        drawFrame(0);
    }

    function updateAnimationState() {
        const shouldAnimate = !motionPreference.matches && isVisible;
        if (shouldAnimate) {
            if (!animationTimer) {
                startTime = performance.now();
                animationTimer = setInterval(() => {
                    drawFrame(performance.now() - startTime);
                }, 1000 / 30);
            }
        } else if (animationTimer) {
            clearInterval(animationTimer);
            animationTimer = null;
            drawFrame(0);
        }

    }

    function loop() {
        if (motionPreference.matches || !isVisible) {
            if (animationTimer) {
                clearInterval(animationTimer);
                animationTimer = null;
            }
            return;
        }

        drawFrame(performance.now() - startTime);
    }

    function drawFrame(elapsed) {
        const width = canvas.width / (Math.min(window.devicePixelRatio || 1, 2));
        const height = canvas.height / (Math.min(window.devicePixelRatio || 1, 2));
        ctx.clearRect(0, 0, width, height);

        const centerX = width * 0.58;
        const centerY = height * 0.48;
        const radiusBase = Math.min(width * 0.66, height * 0.86);

        pointerOffset.x += (pointerTarget.x - pointerOffset.x) * 0.025;
        pointerOffset.y += (pointerTarget.y - pointerOffset.y) * 0.025;
        const palette = document.documentElement.getAttribute("data-theme") === "light"
            ? lightPalette
            : darkPalette;

        for (const particle of particles) {
            const seconds = elapsed * 0.001;
            const angle = particle.angle + seconds * particle.speed;
            const orbitRadius = particle.radius * radiusBase * 1.5;
            const x = centerX + Math.cos(angle) * orbitRadius + pointerOffset.x * particle.depth * 22;
            const y = centerY + Math.sin(angle) * orbitRadius * 0.7 + pointerOffset.y * particle.depth * 16;
            const shimmer = 0.75 + 0.25 * Math.sin((seconds * particle.twinkle * 3.5) + particle.phase);
            const [r, g, b] = palette[particle.toneIndex];
            const size = particle.size * (particle.radius < 0.2 ? 1.2 : 1);

            ctx.beginPath();
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${(particle.alpha / 255) * shimmer})`;
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    container.addEventListener("pointermove", (event) => {
        const bounds = container.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        pointerTarget.x = x;
        pointerTarget.y = y;
    }, { passive: true });

    motionPreference.addEventListener("change", updateAnimationState);

    const themeObserver = new MutationObserver(() => drawFrame(0));
    themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"]
    });

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(([entry]) => {
            isVisible = entry.isIntersecting;
            updateAnimationState();
        }, { threshold: 0.1 });
        observer.observe(container.closest(".hero") || container);
    }

    startTime = performance.now();
    resizeCanvas();
    updateAnimationState();
})();