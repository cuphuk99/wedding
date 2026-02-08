const translations = {
    'ua': {
        'names': 'Ганна & Владислав',
        'hero-subtitle': 'Ми одружуємось!',
        'date': 'Збережи дату - 19.09.2026',
        'info-title': 'Де та коли',
        'location': 'Братислава, готель "Централ"',
        'time': 'Початок о 16:00',
        'timer-text': 'До нашого свята залишилось:',
        'footer': 'Чекаємо на вас!',
        'rsvp-title': 'Підтвердження присутності',
        'rsvp-subtitle': 'Будь ласка, повідомте нам про вашу участь до 01.08.2026',
        'label-name': 'Ваше ім\'я та прізвище',
        'option-yes': 'Я прийду',
        'option-no': 'На жаль, не зможу',
        'submit-btn': 'Надіслати',
        'location': 'Локація',
        "dresscode-title": "Дрес-код",
        "dresscode-text": "Будемо вдячні, якщо ви підтримаєте палітру нашого свята:",
        "color-forest": "Темно-хвойний",
        "color-olive": "Оливковий",
        "color-dark-beige": "Темний беж",
        "color-light-beige": "Світлий беж",
        "color-sand": "Пісочний"
    },
    'sk': {
        'names': 'Hanna & Vladyslav',
        'hero-subtitle': 'Berieme sa!',
        'date': 'Save the date - 19.09.2026',
        'info-title': 'Kde a kedy',
        'location': 'Bratislava, hotel "Central"',
        'time': 'Začiatok o 16:00',
        'timer-text': 'Do našej svadby zostáva:',
        'footer': 'Tešíme sa na vás!',
        'rsvp-title': 'Potvrdenie účasti',
        'rsvp-subtitle': 'Prosíme, dajte nám vedieť do 01.08.2026',
        'label-name': 'Vaše meno a priezvisko',
        'option-yes': 'Prídem',
        'option-no': 'Bohužiaľ nemôžem',
        'submit-btn': 'Odoslať',
        'location': 'Localita',
        "dresscode-title": "Dresscode",
        "dresscode-text": "Budeme vďační, ak podporíte paletu našej svadby:",
        "color-forest": "Tmavozelená",
        "color-olive": "Olivová",
        "color-dark-beige": "Tmavobéžová",
        "color-light-beige": "Svetlobéžová",
        "color-sand": "Piesková"
    }
};

function changeLanguage(lang) {
    const elements = document.querySelectorAll('[data-key]');
    elements.forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    document.documentElement.lang = lang;
    updateColorName()
}

// Змінна для зберігання останнього вибраного кольору
let selectedColorId = null;

document.querySelectorAll('.color-circle').forEach(circle => {
    circle.addEventListener('click', function() {
        selectedColorId = this.dataset.colorId; // Запам'ятовуємо, який колір вибрали
        updateColorName(); // Оновлюємо текст
        
        // Візуальне виділення
        document.querySelectorAll('.color-circle').forEach(c => c.classList.remove('active'));
        this.classList.add('active');
    });
});

function updateColorName() {
    if (!selectedColorId) return;
    
    const currentLang = document.documentElement.lang || 'ua';
    const display = document.getElementById('color-name');
    
    // Беремо переклад з об'єкта за ключем (наприклад, "color-forest")
    display.textContent = translations[currentLang][`color-${selectedColorId}`];
    display.classList.add('show');
}


function createLeaf() {
    const container = document.getElementById('leaf-container');
    if (!container) return;

    const leaf = document.createElement('div');
    leaf.classList.add('leaf');
    
    // Випадкові параметри
    const size = Math.random() * 15 + 10 + 'px';
    leaf.style.width = size;
    leaf.style.height = size;
    leaf.style.left = Math.random() * 100 + 'vw';
    
    const duration = Math.random() * 5 + 7 + 's';
    leaf.style.animation = `fall ${duration} linear forwards`;

    container.appendChild(leaf);

    // Видаляємо листок після завершення анімації
    setTimeout(() => {
        leaf.remove();
    }, parseFloat(duration) * 1000);
}

// Запуск анімації
setInterval(createLeaf, 800);

// Створюємо нову пелюстку кожні 400 мілісекунд
setInterval(createLeaf, 400);

document.querySelectorAll('.color-circle').forEach(circle => {
    circle.addEventListener('click', function() {
        // Визначаємо поточну мову (зберігаємо її в змінну при перемиканні мов)
        const currentLang = document.documentElement.lang || 'ua'; 
        
        // Беремо назву з відповідного атрибута
        const colorName = currentLang === 'ua' ? this.dataset.nameUa : this.dataset.nameSk;
        
        const display = document.getElementById('color-name');
        display.textContent = colorName;
        display.classList.add('show');
        
        // Візуально виділяємо активне коло
        document.querySelectorAll('.color-circle').forEach(c => c.classList.remove('active'));
        this.classList.add('active');
    });
});
window.onscroll = function() {
    updateScroll();
};

function updateScroll() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    // Оновлюємо лінію прогресу
    document.getElementById("progress-bar").style.width = scrolled + "%";
    
    // Показуємо кнопку RSVP
    const btn = document.getElementById("floatingBtn");
    if (winScroll > 300) {
        btn.classList.add("show");
    } else {
        btn.classList.remove("show");
    }
}
document.addEventListener('DOMContentLoaded', function() {
    const attendanceYes = document.getElementById('attendance-yes');
    const attendanceNo = document.getElementById('attendance-no');
    const accommodationBlock = document.getElementById('accommodation-block');
    const housingInputs = document.querySelectorAll('input[name="housing_needed"]');

    function toggleAccommodation() {
        if (attendanceYes.checked) {
            accommodationBlock.style.display = 'block';
            // Робимо вибір житла обов'язковим, якщо людина прийде
            housingInputs.forEach(input => input.required = true);
        } else {
            accommodationBlock.style.display = 'none';
            // Знімаємо обов'язковість, якщо людина не прийде (щоб форма відправилась)
            housingInputs.forEach(input => {
                input.required = false;
                input.checked = false; // Скидаємо вибір
            });
        }
    }

    // Слухаємо зміни
    attendanceYes.addEventListener('change', toggleAccommodation);
    attendanceNo.addEventListener('change', toggleAccommodation);

    // Запускаємо один раз при завантаженні, щоб перевірити початковий стан
    toggleAccommodation();
});

document.addEventListener('DOMContentLoaded', () => {
    const mascot = document.querySelector('.mascot-animation');
    if (!mascot) return;

    let lastPos = 0;
    let isEscaping = false;
    let currentDirection = 'right'; // Відстежуємо напрямок

    const startNewRun = (delay = 1000) => {
        isEscaping = false;
        mascot.style.transition = 'none'; 
        mascot.style.animation = 'none';
        mascot.style.opacity = '1';
        
        setTimeout(() => {
            const vhToPx = (vh) => (vh * window.innerHeight) / 100;
            let newPosVH;
            let valid = false;
            let attempts = 0;

            while (!valid && attempts < 20) {
                const isBottomZone = Math.random() > 0.5;
                newPosVH = isBottomZone ? (Math.random() * 20 + 5) : (Math.random() * 15 + 75);
                if (Math.abs(vhToPx(newPosVH) - lastPos) > 150) {
                    valid = true;
                    lastPos = vhToPx(newPosVH);
                }
                attempts++;
            }

            mascot.style.bottom = newPosVH + 'vh';

            const runFromLeft = Math.random() > 0.5;
            currentDirection = runFromLeft ? 'right' : 'left';
            const animName = runFromLeft ? 'runRight' : 'runLeft';
            const duration = Math.random() * 4 + 8;

            // Скидаємо позицію перед стартом
            mascot.style.left = runFromLeft ? '-250px' : '115%';
            
            mascot.style.animation = `${animName} ${duration}s linear forwards, bounceEffect 2s ease-in-out infinite alternate`;
        }, delay); 
    };

    mascot.addEventListener('mousedown', () => {
        if (isEscaping) return;
        
        isEscaping = true;

        // 1. Фіксуємо поточну позицію
        const rect = mascot.getBoundingClientRect();
        mascot.style.animation = 'none';
        mascot.style.left = rect.left + 'px';


        const escapeTarget = (currentDirection === 'right') ? '120%' : '-300px';

        requestAnimationFrame(() => {
            mascot.style.transition = 'left 0.7s ease-in'; 
            mascot.style.left = escapeTarget;
        });

        // 3. Пауза 10 секунд
        setTimeout(() => {
            mascot.style.opacity = '0';
            startNewRun(5000);
        }, 700);
    });

    mascot.addEventListener('animationend', (e) => {
        if (isEscaping) return;
        if (e.animationName === 'runRight' || e.animationName === 'runLeft') {
            startNewRun();
        }
    });

    startNewRun();
});