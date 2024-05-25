document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/api/select_atv')
        .then(response => response.json())
        .then(data => {
            const tarefasRealizadasSection = document.getElementById('tarefas-proxima-aula');

            data.forEach(atividade => {
                const atividadeDiv = document.createElement('div');
                atividadeDiv.classList.add('atividade');

                atividadeDiv.innerHTML = `
                    <p><strong>Aluno:</strong> ${atividade.nome_aluno}</p>
                    <p><strong>Data de Envio:</strong> ${atividade.data_envio}</p>
                    <p><strong>Música:</strong> ${atividade.nome_musica}</p>
                    <p><strong>Compositor:</strong> ${atividade.compositor}</p>
                    <p><strong>Link para música:</strong> <a href=${atividade.link}>Link</p>
                    <button class="concluir-btn" data-id="${atividade.id}">Concluído</button>
                `;

                tarefasRealizadasSection.appendChild(atividadeDiv);
            });

            // Seleciona todos os botões "Concluído"
            const concluirBtns = document.querySelectorAll('.concluir-btn');

            // Adiciona evento de clique para cada botão
            concluirBtns.forEach(btn => {
                btn.addEventListener('click', function () {
                    const atividadeId = btn.getAttribute('data-id');
                    deletarAtividade(atividadeId);
                });
            });
        })
        .catch(error => console.error('Erro ao obter atividades:', error));
});

document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/api/aulas_realizadas')
        .then(response => response.json())
        .then(data => {
            const aulasRealizadasSection = document.getElementById('aulas-realizadas');

            data.forEach(aula => {
                const aulaDiv = document.createElement('div');
                aulaDiv.classList.add('aula');

                aulaDiv.innerHTML = `
                    <p><strong>Data da Aula:</strong> ${aula.data_aula}</p>
                    <p><strong>Professor:</strong> ${aula.nome_professor}</p>
                    <p><strong>Aluno:</strong> ${aula.nome_aluno}</p>
                    <p><strong>Instrumento:</strong> ${aula.instrumento}</p>
                    <textarea class="feedback-input" placeholder="Digite seu feedback"></textarea>
                    <button class="feedback-btn" data-id="${aula.id || aula.aula_id}">Enviar Feedback</button>
                `;

                aulasRealizadasSection.appendChild(aulaDiv);
            });

            // Adiciona evento de clique para cada botão de feedback
            const feedbackBtns = document.querySelectorAll('.feedback-btn');
            feedbackBtns.forEach(btn => {
                btn.addEventListener('click', function () {
                    const aulaId = btn.getAttribute('data-id');
                    const comentario = btn.previousElementSibling.value;
                    console.log('Enviando feedback para aula_id:', aulaId, 'com comentário:', comentario);  // Log dos dados antes de enviar
                    enviarFeedback(aulaId, comentario);
                });
            });
        })
        .catch(error => console.error('Erro ao obter aulas realizadas:', error));
});

// Função para deletar a atividade
function deletarAtividade(id) {
    fetch(`http://localhost:5000/api/delete_atv/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao excluir atividade');
        }
        return response.json();
    })
    .then(data => {
        // Atualiza a página após excluir a atividade
        window.location.reload();
    })
    .catch(error => console.error('Erro ao excluir atividade:', error));
}

function enviarFeedback(aulaId, comentario) {
    if (!aulaId || !comentario) {
        console.error('ID da aula ou comentário ausente');
        return;
    }

    fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ aula_id: aulaId, comentario: comentario })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao enviar feedback');
        }
        return response.json();
    })
    .then(data => {
        alert('Feedback enviado com sucesso!');
        window.location.reload();
    })
    .catch(error => console.error('Erro ao enviar feedback:', error));
}

document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/api/feedbacks')
        .then(response => response.json())
        .then(data => {
            const feedbacksSection = document.getElementById('feedbacks');

            data.forEach(feedback => {
                const feedbackDiv = document.createElement('div');
                feedbackDiv.classList.add('feedback');

                feedbackDiv.innerHTML = `
                    <p><strong>Data da Aula:</strong> ${feedback.data_aula}</p>
                    <p><strong>Professor:</strong> ${feedback.nome}</p>
                    <p><strong>Aluno:</strong> ${feedback.nome_aluno}</p>
                    <p><strong>Instrumento:</strong> ${feedback.instrumento}</p>
                    <p><strong>Comentário:</strong> ${feedback.comentario}</p>
                `;

                feedbacksSection.appendChild(feedbackDiv);
            });
        })
        .catch(error => console.error('Erro ao obter feedbacks:', error));
});

