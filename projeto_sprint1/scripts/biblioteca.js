// URL da API Python que acessa o banco de dados
const apiUrl = 'http://127.0.0.1:5000/api/music';

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

// Função para exibir músicas
function displayMusic(music) {
  const musicList = document.getElementById("musicList");
  const div = document.createElement("div");
  div.classList.add("song");
  div.innerHTML = `<strong>${music.nome}</strong>  ${music.compositor} (${music.ano_lancamento})<br>
                  <a href="${music.link_traducao}" target="_blank">Link para musica</a>`;
  musicList.appendChild(div);
}

// Chamar a função para buscar músicas ao carregar a página
fetchMusic();