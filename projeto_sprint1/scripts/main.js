// Variáveis globais
let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

// Variáveis do modal
const newEvent = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const calendar = document.getElementById('calendar');
const weekdays = ['domingo','segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];

// Função para abrir o modal com seleção de horário
function openModal(date) {
    clicked = date;
    const eventDay = events.find((event) => event.date === clicked);

    if (eventDay) {
        document.getElementById('eventText').innerText = eventDay.hour + ':00 - ' + eventDay.title;
        deleteEventModal.style.display = 'block';
    } else {
        // Exibir janela de novo evento
        newEvent.style.display = 'block';
    }

    backDrop.style.display = 'block';
}

// Função para carregar o calendário
function load() {
    const date = new Date();

    if (nav !== 0) {
        date.setMonth(new Date().getMonth() + nav);
    }

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const daysMonth = new Date(year, month + 1, 0).getDate();
    const firstDayMonth = new Date(year, month, 1);

    const dateString = firstDayMonth.toLocaleDateString('pt-br', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });

    const paddinDays = weekdays.indexOf(dateString.split(', ')[0]);

    document.getElementById('monthDisplay').innerText = `${date.toLocaleDateString('pt-br', { month: 'long' })}, ${year}`;

    calendar.innerHTML = '';

    for (let i = 1; i <= paddinDays + daysMonth; i++) {
        const dayS = document.createElement('div');
        dayS.classList.add('day');

        const dayString = `${month + 1}/${i - paddinDays}/${year}`;

        const currentDateFormatted = new Date().setHours(0, 0, 0, 0);
        const currentDayFormatted = new Date(year, month, i - paddinDays).setHours(0, 0, 0, 0);

        if (currentDayFormatted < currentDateFormatted) {
            dayS.classList.add('disabled');
        }

        if (i > paddinDays) {
            dayS.innerText = i - paddinDays;

            const eventDay = events.find(event => event.date === dayString);

            if (i - paddinDays === day && nav === 0) {
                dayS.id = 'currentDay';
            }

            if (eventDay) {
                const eventDiv = document.createElement('div');
                eventDiv.classList.add('event');
                eventDiv.innerText = eventDay.hour + ':00 - ' + eventDay.title;
                dayS.appendChild(eventDiv);
            }

            dayS.addEventListener('click', () => openModal(dayString));
        } else {
            dayS.classList.add('padding');
        }

        calendar.appendChild(dayS);
    }
}

// Função para fechar o modal
function closeModal() {
    newEvent.style.display = 'none';
    deleteEventModal.style.display = 'none';
    backDrop.style.display = 'none';

    clicked = null;
    load();
}

// Função para salvar evento com horário selecionado
function saveEvent() {
    const hour = document.getElementById('hourSelection').value;
    if (hour) {
        events.push({
            date: clicked,
            hour: hour
        });

        localStorage.setItem('events', JSON.stringify(events));
        closeModal();
    } else {
        alert('Selecione um horário válido.');
    }
}

// Função para deletar evento
function deleteEvent() {
    events = events.filter(event => event.date !== clicked);
    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
}

// Botões
function buttons() {
    document.getElementById('backButton').addEventListener('click', () => {
        nav--;
        load();
    });

    document.getElementById('nextButton').addEventListener('click', () => {
        nav++;
        load();
    });

    document.getElementById('cancelButton').addEventListener('click', () => closeModal());
    document.getElementById('closeButton').addEventListener('click', () => closeModal());
    document.getElementById('saveButton').addEventListener('click', () => saveEvent());
    document.getElementById('deleteButton').addEventListener('click', () => deleteEvent()); // Associando evento ao botão de deletar
}

// Inicialização dos botões e carregamento do calendário
buttons();
load();
