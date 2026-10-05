
function showToast(message) {
    const toast = document.getElementById("toast");

    if (!toast) return;

    toast.textContent = message;
    toast.classList.remove("hidden");

    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => {
        toast.classList.add("hidden");
    }, 2200);
}

const projects = [
    {
        title: "Restaurant Management App",
        description: "A restaurant QR-code ordering and POS platform designed to simplify restaurant operations.",
        image: "myimages/respos portfolio.png",
        alt: "ResPos restaurant POS",
        tags: ["Laravel", "PHP", "MySQL", "JavaScript", "Vite"],
        status: "In Progress",
        href: "#",
        buttonText: "Coming soon",
        buttonIcon: "fa-clock",
        disabled: true
    },
    {
        title: "Todo list App",
        description: "A clean productivity app for managing daily tasks with a simple modern interface and unorthodox approach & philosophy.",
        image: "myimages/tdapp.jpeg",
        alt: "To-do application",
        tags: ["HTML5", "CSS3", "JavaScript"],
        href: "todo.html",
        buttonText: "Live Demo",
        buttonIcon: "fa-arrow-up-right-from-square",
        disabled: false
    },
    {
        title: "Cvnalyser",
        description: "CV Analyser is a recruitment-support webapp. Recruiters enter a job's requirements, upload a batch of PDF CVs, and receive AI-assisted candidate assessments, ranking and recommendation without bias.",
        image: "myimages/cvnalyserr.jpeg",
        alt: "Cvnalyser project",
        tags: ["JavaScript", "HTML5", "CSS3", "NodeJS"],
        href: "#",
        buttonText: "Coming soon",
        buttonIcon: "fa-clock",
        disabled: true
    },
    {
        title: "Rock Paper Scissors",
        description: "A browser-based implementation of the classic game with an interactive user interface.",
        image: "myimages/rps.jpeg",
        alt: "Rock Paper Scissors game",
        tags: ["JavaScript", "HTML5", "CSS3"],
        href: "rock-paper-scissors.html",
        buttonText: "Live Demo",
        buttonIcon: "fa-arrow-up-right-from-square",
        disabled: false
    },
    {
        title: "Smart Irrigation System",
        description: "An automated plant irrigation system using soil moisture sensors and Arduino to control water delivery.",
        image: "myimages/arduino portfolio.jpg",
        alt: "Smart plant irrigation system",
        tags: ["Arduino", "C++", "IoT"],
        href: "#",
        buttonText: "Details",
        buttonIcon: "fa-arrow-right",
        disabled: true
    },
    {
        title: "Sonar — Username Lookup",
        description: "An OSINT tool for checking a username across online platforms.",
        image: "myimages/sonar.jpeg",
        alt: "Sonar username lookup tool",
        tags: ["JavaScript", "Fetch API", "HTML5", "CSS3"],
        href: "https://potato-oo-bop.github.io/sonar-osint/",
        buttonText: "Open Sonar",
        buttonIcon: "fa-arrow-up-right-from-square",
        disabled: false
    }
];

function renderProjects() {
    const container = document.getElementById("projects-grid");

    if (!container) return;

    container.innerHTML = projects.map(project => `
        <article class="project-card">
            <div class="project-image">
                <img src="${project.image}" alt="${project.alt}">
                ${project.status ? `<span class="project-status">${project.status}</span>` : ""}
            </div>

            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>

                <div class="project-tags">
                    ${project.tags.map(tag => `<span>${tag}</span>`).join("")}
                </div>

                <div class="project-actions">
                    <a
                        href="${project.href}"
                        class="project-btn project-btn-primary ${project.disabled ? "disabled" : ""}"
                        ${project.disabled ? 'aria-disabled="true" onclick="return false;"' : 'target="_blank"'}
                    >
                        ${project.buttonText}
                        <i class="fas ${project.buttonIcon}"></i>
                    </a>
                </div>
            </div>
        </article>
    `).join("");
}

document.addEventListener("DOMContentLoaded", () => {
    renderProjects();

/* =========================================
   THEME SYSTEM
========================================= */

const html = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle?.querySelector(".theme-toggle-icon");

const savedTheme = localStorage.getItem("portfolio-theme");

function setTheme(theme) {

    html.setAttribute("data-theme", theme);

    localStorage.setItem("portfolio-theme", theme);

    if (themeToggle) {

        themeToggle.setAttribute(
            "aria-label",
            theme === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
        );

        themeToggle.setAttribute(
            "title",
            theme === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
        );
    }
}

if (savedTheme) {

    setTheme(savedTheme);

} else {

    const prefersDark =
        window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;

    setTheme(
        prefersDark ? "dark" : "light"
    );
}

themeToggle?.addEventListener("click", () => {

    themeIcon?.classList.toggle("is-rotated");

    const current =
        html.getAttribute("data-theme");

    setTheme(
        current === "dark"
            ? "light"
            : "dark"
    );

});

    /* =========================================
       MOBILE NAVIGATION
    ========================================= */

    const menuToggle =
        document.getElementById(
            "menu-toggle"
        );

    const nav =
        document.getElementById(
            "main-nav"
        );

    menuToggle?.addEventListener(
        "click",
        () => {

            const isOpen =
                nav.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

            const icon =
                menuToggle.querySelector("i");

            icon.className =
                isOpen
                    ? "fas fa-xmark"
                    : "fas fa-bars";

        }
    );


    /* Close mobile menu after navigation */

    document
        .querySelectorAll(".nav-link")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    nav.classList.remove(
                        "open"
                    );

                    menuToggle?.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    const icon =
                        menuToggle?.querySelector(
                            "i"
                        );

                    if (icon) {
                        icon.className =
                            "fas fa-bars";
                    }

                }
            );

        });


    /* =========================================
       SCROLL REVEAL
    ========================================= */

    const revealElements =
        document.querySelectorAll(
            ".section-reveal"
        );

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

    revealElements.forEach(
        element => observer.observe(element)
    );


    /* =========================================
       AI ASSISTANT
    ========================================= */

    const aiButton =
        document.getElementById(
            "ai-assistant"
        );

    const aiPanel =
        document.getElementById(
            "ai-panel"
        );

    const aiClose =
        document.getElementById(
            "ai-close"
        );

    const aiForm =
        document.getElementById(
            "ai-form"
        );

    const aiInput =
        document.getElementById(
            "ai-input"
        );

    const aiMessages =
        document.getElementById(
            "ai-messages"
        );


    function openAI() {

        aiPanel.classList.add("open");

        aiPanel.setAttribute(
            "aria-hidden",
            "false"
        );

        setTimeout(
            () => aiInput?.focus(),
            200
        );

    }


    function closeAI() {

        aiPanel.classList.remove("open");

        aiPanel.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    aiButton?.addEventListener(
        "click",
        openAI
    );

    aiClose?.addEventListener(
        "click",
        closeAI
    );


    /* =========================================
       AI RESPONSE ENGINE
    ========================================= */

    function addMessage(
        text,
        type
    ) {

        const message =
            document.createElement(
                "div"
            );

        message.className =
            `ai-message ${type}`;

        message.textContent = text;

        aiMessages.appendChild(
            message
        );

        aiMessages.scrollTop =
            aiMessages.scrollHeight;

    }


    const aiRules = [
        {
            keywords: [
                "skill", "skills", "technology", "technologies", "tech",
                "expertise", "ability", "competence", "knowledge",
                "experience", "proficient", "familiar"
            ],
            response: "Fernandes works with JavaScript, HTML, CSS, UI/UX design, graphics design, AI prompting, IoT, Arduino, OSINT and practical problem solving."
        },
        {
            keywords: ["sonar", "username lookup", "username search"],
            response: "Sonar is Fernandes' OSINT username lookup project. Try it here: https://potato-oo-bop.github.io/sonar-osint/"
        },
        {
            keywords: ["project", "projects", "built", "work", "portfolio"],
            response: "Portfolio projects include Sonar — Username Lookup, ResPos, CV Analyser, a Todo app, Rock Paper Scissors, and a smart Arduino-based irrigation system. Sonar is live at https://potato-oo-bop.github.io/sonar-osint/."
        },
        {
            keywords: ["contact", "email", "hire", "reach", "message"],
            response: "You can contact Fernandes through the contact form or email him directly at lilfandy2.0@gmail.com."
        },
        {
            keywords: ["who", "about", "fernandes"],
            response: "Fernandes is a developer and creative problem solver interested in web development, design, AI, IoT and practical technology solutions."
        },
        {
            keywords: ["location", "where"],
            response: "Fernandes is based in Nairobi, Kenya."
        },
        {
            keywords: ["hello", "hi", "hey", "yo", "greetings", "sup", "what's up"],
            response: "Hey! Ask me about Fernandes' skills, projects, experience or contact information."
        }
    ];

    function getAIResponse(question) {
        const q = question.toLowerCase().trim();

        if (!q) {
            return "I can currently answer questions about Fernandes, his skills, projects, technologies, location and contact information.";
        }

        const matchedRule = aiRules.find(rule =>
            rule.keywords.some(keyword => q.includes(keyword))
        );

        return matchedRule ? matchedRule.response : "I can currently answer questions about Fernandes, his skills, projects, technologies, location and contact information.";
    }


    aiForm?.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const question =
                aiInput.value.trim();

            if (!question) return;

            addMessage(
                question,
                "user"
            );

            aiInput.value = "";


            setTimeout(
                () => {

                    addMessage(
                        getAIResponse(question),
                        "bot"
                    );

                },
                350
            );

        }
    );


    /* =========================================
       AI SUGGESTIONS
    ========================================= */

    document
        .querySelectorAll(
            ".ai-suggestions button"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const question =
                        button.dataset.question;

                    addMessage(
                        question,
                        "user"
                    );

                    setTimeout(
                        () => {

                            addMessage(
                                getAIResponse(
                                    question
                                ),
                                "bot"
                            );

                        },
                        300
                    );

                }
            );

        });


    /* =========================================
       ESCAPE KEY
    ========================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeAI();

                nav?.classList.remove(
                    "open"
                );

            }

        }
    );

});



/* =========================================
   PHILOSOPHY SLIDESHOW
========================================= */

const philosophyTrack =
    document.querySelector(".philosophy-track");

const philosophyCards =
    document.querySelectorAll(".philosophy-card");

const philosophyDots =
    document.querySelectorAll(".philosophy-dot");

const philosophyPrev =
    document.querySelector(".philosophy-prev");

const philosophyNext =
    document.querySelector(".philosophy-next");

let philosophyIndex = 0;

let philosophyTimer;


function showPhilosophy(index) {

    if (!philosophyTrack || !philosophyCards.length) {
        return;
    }

    philosophyIndex =
        (index + philosophyCards.length)
        % philosophyCards.length;

    philosophyTrack.style.transform =
        `translateX(-${philosophyIndex * 100}%)`;


    philosophyDots.forEach(
        (dot, i) => {

            dot.classList.toggle(
                "active",
                i === philosophyIndex
            );

        }
    );

}


function nextPhilosophy() {
    showPhilosophy(
        philosophyIndex + 1
    );
}


function previousPhilosophy() {
    showPhilosophy(
        philosophyIndex - 1
    );
}


/* Buttons */

philosophyNext?.addEventListener(
    "click",
    () => {

        nextPhilosophy();

        restartPhilosophyTimer();

    }
);


philosophyPrev?.addEventListener(
    "click",
    () => {

        previousPhilosophy();

        restartPhilosophyTimer();

    }
);


/* Dots */

philosophyDots.forEach(
    dot => {

        dot.addEventListener(
            "click",
            () => {

                showPhilosophy(
                    Number(dot.dataset.slide)
                );

                restartPhilosophyTimer();

            }
        );

    }
);


/* Auto slide */

function startPhilosophyTimer() {

    philosophyTimer =
        setInterval(
            nextPhilosophy,
            5000
        );

}


function restartPhilosophyTimer() {

    clearInterval(
        philosophyTimer
    );

    startPhilosophyTimer();

}


startPhilosophyTimer();


/* Pause while hovering */

const philosophyViewport =
    document.querySelector(
        ".philosophy-viewport"
    );

philosophyViewport?.addEventListener(
    "mouseenter",
    () => {

        clearInterval(
            philosophyTimer
        );

    }
);


philosophyViewport?.addEventListener(
    "mouseleave",
    () => {

        startPhilosophyTimer();

    }
);
