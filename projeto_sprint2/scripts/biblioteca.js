// URL da API Python que acessa o banco de dados
const apiUrl = 'http://127.0.0.1:5000/api/music';
const studentsUrl = 'http://127.0.0.1:5000/api/students';
const addAtividadeUrl = 'http://127.0.0.1:5000/api/atividade';

// Função para obter músicas da API
async function fetchMusic() {
  try {
    const response = await fetch(apiUrl);
    const musicData = await response.json();
    musicData.forEach(music => {
      displayMusic(music);
    });
  } catch (error) {
    console.error('Erro ao buscar músicas:', error);
  }
}

function displayMusic(music) {
  const musicList = document.getElementById("musicList");
  const div = document.createElement("div");
  div.classList.add("song");
  div.innerHTML = `
    <strong>${music.nome}</strong>
    ${music.compositor}<br>
    <a href="${music.link_traducao}" target="_blank">Link para música</a>
    <form class="atividadeForm">
      <label for="dataEnvio">Data de Envio:</label>
      <input type="date" name="dataEnvio" required>
      <button type="button" onclick="submitAtividade(event, '${music.nome}', '${music.compositor}', '${music.link_traducao}')">Enviar</button>
    </form>
  `;
  musicList.appendChild(div);
}

// Função para buscar alunos da API
async function fetchStudents() {
  try {
    const response = await fetch(studentsUrl);
    const studentsData = await response.json();
    displayStudents(studentsData);
  } catch (error) {
    console.error('Erro ao buscar alunos:', error);
  }
}

// Função para exibir alunos no dropdown
function displayStudents(students) {
  const studentSelect = document.getElementById("studentSelect");
  students.forEach(student => {
    const option = document.createElement("option");
    option.value = student.nome;  // Assuming 'nome' is the student's name
    option.textContent = student.nome;
    studentSelect.appendChild(option);
  });
}

// Função para enviar atividade
async function submitAtividade(event, nomeMusica, compositor, linkMusica) {
  event.preventDefault();
  const form = event.target.form;
  const dataEnvio = form.dataEnvio.value;
  const studentSelect = document.getElementById("studentSelect");
  const nomeAluno = studentSelect.options[studentSelect.selectedIndex].text;

  const atividadeData = {
    data_envio: dataEnvio,
    nome_aluno: nomeAluno,
    nome_musica: nomeMusica,
    compositor: compositor,
    link_musica: linkMusica // Enviando o link corretamente
  };

  console.log('Atividade Data:', atividadeData); // Adicione este log para verificar os dados

  try {
    const response = await fetch(addAtividadeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(atividadeData)
    });

    if (response.ok) {
      alert('Atividade enviada com sucesso!');
    } else {
      const errorData = await response.json();
      alert('Erro ao enviar atividade: ' + errorData.error);
    }
  } catch (error) {
    console.error('Erro ao enviar atividade:', error);
    alert('Erro ao enviar atividade: ' + error.message);
  }
}

// Chamar a função para buscar músicas ao carregar a página
fetchMusic();

// Chamar a função para buscar alunos ao carregar a página
fetchStudents();