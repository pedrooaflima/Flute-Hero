document.addEventListener('DOMContentLoaded', function() {
  // Captura o link "Criar uma agora!"
  const criarContaLink = document.getElementById('criar-conta-link');

  // Adiciona um ouvinte de evento de clique ao link
  criarContaLink.addEventListener('click', function(event) {
    // Evita o comportamento padrão do link (navegar para uma nova página)
    event.preventDefault();

    // Cria um novo formulário de criação de conta
    const criarContaForm = document.createElement('form');
    criarContaForm.innerHTML = `
      <h1>Criar Conta</h1>
      <div class="form-group">
        <label for="nome">Nome:</label>
        <input type="text" id="nome" name="nome" required>
      </div>
      <div class="form-group">
        <label for="email">E-mail:</label>
        <input type="email" id="email" name="email" required>
      </div>
      <div class="form-group">
        <label for="confirmar-email">Confirmar E-mail:</label>
        <input type="email" id="confirmar-email" name="confirmar-email" required>
      </div>
      <div class="form-group">
        <label for="senha">Senha:</label>
        <input type="password" id="senha" name="senha" required>
      </div>
      <div class="form-group">
        <label for="confirmar-senha">Confirmar Senha:</label>
        <input type="password" id="confirmar-senha" name="confirmar-senha" required>
      </div>
      <div class="form-group">
        <button type="submit">Criar Conta</button>
      </div>
    `;

    // Substitui o formulário de login pelo formulário de criação de conta
    const mainElement = document.querySelector('main');
    mainElement.innerHTML = '';
    mainElement.appendChild(criarContaForm);
  });

  // Captura o formulário de login
  const loginForm = document.querySelector('form');

  // Adiciona um ouvinte de evento de envio ao formulário de login
  loginForm.addEventListener('submit', function(event) {
    // Evita o envio do formulário (comportamento padrão)
    event.preventDefault();

    // Aqui você pode adicionar a lógica para lidar com o login
    // Por exemplo, enviar os dados para o servidor e autenticar o usuário
    console.log('Login processado');
  });
});
