async function loadNames() {
    try {
        const response = await fetch('./names.txt');
        const text = await response.text();
        const names = text.trim().split(/\r?\n/).filter(name => name.length > 0);
        return names;
    } catch (error) {
        console.error('Ошибка загрузки names.txt:', error);
        return ["Имя1", "Имя2", "Имя3"];
    }
}

function getRandomName(names) {
    return names[Math.floor(Math.random() * names.length)];
}

async function assignRandomNames() {
    const names = await loadNames();
    document.getElementById('loshara').textContent = getRandomName(names);
    document.getElementById('philosopher').textContent = getRandomName(names);
}

// Анимация появления при загрузке и при прокрутке
function initAnimations() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.fade-in, .fade-up').forEach(el => {
        observer.observe(el);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    assignRandomNames();
    initAnimations();
});
