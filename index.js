document.addEventListener("DOMContentLoaded", () => {
/* =========================================
   THEME SYSTEM
========================================= */

const html = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");

const savedTheme = localStorage.getItem("portfolio-theme");

function setTheme(theme) {

    html.setAttribute("data-theme", theme);

    localStorage.setItem("portfolio-theme", theme);

    if (themeToggle) {

        themeToggle.textContent =
            theme === "dark" ? "☀️" : "🌙";

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


    function getAIResponse(question) {

        const q =
            question.toLowerCase();


        if (
            q.includes("skill") ||
            q.includes("technology") ||
            q.includes("tech")
        ) {

            return "Fernandes works with JavaScript, HTML, CSS, UI/UX design, graphics design, AI prompting, IoT, Arduino, OSINT and problem solving.";

        }


        if (
            q.includes("project") ||
            q.includes("built") ||
            q.includes("work")
        ) {

            return "Current portfolio projects include ResPos, a minimalist Todo application, Rock Paper Scissors and a smart Arduino-based plant irrigation system.";

        }


        if (
            q.includes("contact") ||
            q.includes("email") ||
            q.includes("hire")
        ) {

            return "You can contact Fernandes through the contact form or email him directly at lilfandy2.0@gmail.com.";

        }


        if (
            q.includes("who") ||
            q.includes("about") ||
            q.includes("fernandes")
        ) {

            return "Fernandes is a developer and creative problem solver interested in web development, design, AI, IoT and practical technology solutions.";

        }


        if (
            q.includes("location") ||
            q.includes("where")
        ) {

            return "Fernandes is based in Nairobi, Kenya.";

        }


        if (
            q.includes("hello") ||
            q.includes("hi") ||
            q.includes("hey")
        ) {

            return "Hey! Ask me about Fernandes' skills, projects, experience or contact information.";

        }


        return "I can currently answer questions about Fernandes, his skills, projects, technologies, location and contact information.";

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