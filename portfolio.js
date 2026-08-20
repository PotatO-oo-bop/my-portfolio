document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Dark/Light mode toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const html = document.documentElement;
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark');
        html.setAttribute('data-theme', html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });

    // Update theme based on system preference on load
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').media;
    if (prefersDark) {
        body.classList.add('dark');
        html.setAttribute('data-theme', 'dark');
    }
});
