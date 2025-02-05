// Constantes globais do programa
const inputAmigo = document.getElementById('amigo');
const listaAmigos = document.getElementById('listaAmigos');
const resultado = document.getElementById('resultado');
const selectExcluir = document.getElementById('excluirSorteio');

let listaDeNomes = new Set();
let listaOriginal = new Set(); // Armazena a lista original para reiniciar
let botaoSortear = document.querySelector('.sortearAmigo');
let botaoAdicionar = document.querySelector('.button-add');

// Captura o evento de pressionar a tecla "Enter" para adicionar participantes
inputAmigo.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // Evita o comportamento padrão
    adicionarAmigo();
  }
});

// Função para adicionar participantes
function adicionarAmigo() {
  const nomeAmigo = inputAmigo.value.trim();

  if (!nomeAmigo || !/^[a-zA-Z\s]+$/.test(nomeAmigo)) {
    alert('Informe um nome válido (apenas letras e espaços)!');
    return;
  }

  if (listaDeNomes.has(nomeAmigo)) {
    alert('Este nome já foi adicionado!');
    return;
  }

  listaDeNomes.add(nomeAmigo);
  inputAmigo.value = '';
  inputAmigo.focus();

  // Atualiza a lista visual de nomes
  const itemLista = document.createElement('li');
  itemLista.textContent = nomeAmigo;
  listaAmigos.appendChild(itemLista);

  // Atualiza o select com o novo nome
  const option = document.createElement('option');
  option.value = nomeAmigo;
  option.textContent = nomeAmigo;
  selectExcluir.appendChild(option);
}

// Função para iniciar o sorteio e salvar a lista original
function iniciarSorteio() {
  listaOriginal = new Set(listaDeNomes);
  console.log(listaOriginal);
}

// Função para sortear um amigo
function sortearAmigo() {
  if (listaDeNomes.size < 1) {
    alert('Adicione pelo menos 1 participante!');
    return;
  }

  // Salva a lista original antes de iniciar o sorteio
  if (listaOriginal.size === 0) {
    iniciarSorteio();
  }

  const nomes = Array.from(listaDeNomes);
  const excluir = selectExcluir.value;

  // Mantém a lista original sem excluir ninguém visualmente
  const listaSorteio = excluir ? nomes.filter(nome => nome !== excluir) : nomes;

  if (listaSorteio.length < 1) {
    alert('Não há participantes suficientes para o sorteio!');
    return;
  }

  // Realiza o sorteio
  const indiceSorteado = Math.floor(Math.random() * listaSorteio.length);
  const sorteado = listaSorteio[indiceSorteado];

  // Exibe o resultado
  resultado.innerHTML = `
    <div class="resultado-destaque">
      <p>🎉 O sorteado foi:</p>
      <h2>${sorteado}</h2>
    </div>
  `;

  // Remove o sorteado do conjunto de nomes para evitar repetição
  listaDeNomes.delete(sorteado);

  setTimeout(() => {
    resultado.innerHTML = '';
  }, 1500);

  if (listaDeNomes.size === 1) {
    setTimeout(() => {
      resultado.innerHTML = `<p>🔔 Falta apenas mais 1 participante a ser sorteado!</p>`;
    }, 1500);
  }

  if (listaDeNomes.size === 0) {
    setTimeout(() => {
      resultado.innerHTML = `<p>🎉 Todos os participantes foram sorteados! </p>`;
      // Desativa os botões quando o sorteio terminar
      botaoSortear.disabled = true;
      botaoAdicionar.disabled = true;
    }, 1500);
  }

  dispararFogos();
}

// Função para disparar fogos de artifício
function dispararFogos() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 1000,
      spread: 800,
      origin: { y: 0.6 },
    });
  } else {
    console.warn('Biblioteca confetti não carregada.');
  }
}

// Função para reiniciar o sorteio
function reiniciarSorteio() {
  listaDeNomes.clear();
  listaOriginal.clear();
  listaAmigos.innerHTML = '';
  resultado.innerHTML = '';
  selectExcluir.innerHTML =
    '<option value="">Ninguém (todos participam)</option>';
  inputAmigo.focus();

  // Reabilita os botões para um novo sorteio
  botaoSortear.disabled = false;
  botaoAdicionar.disabled = false;
}
// Função para refazer o sorteio com a mesma lista original

function refazerSorteio() {
  // Pergunta se o usuário realmente deseja refazer o sorteio
  const confirmar = confirm(
    'Você deseja refazer o sorteio com os mesmos participantes?'
  );

  if (!confirmar) {
    return; // Se o usuário cancelar, não faz nada
  }

  // Exibe o indicador de carregamento
  document.getElementById('carregando').style.display = 'block';
  listaAmigos.style.display = 'none'; // Esconde a lista de amigos

  // Verifica se a lista original está disponível
  if (listaOriginal.size === 0) {
    alert('Adicione participantes primeiro antes de refazer o sorteio!');
    document.getElementById('carregando').style.display = 'none';
    listaAmigos.style.display = 'block'; // Mostra a lista de amigos
    return;
  }

  // Restaura a lista de nomes original, ignorando os já sorteados
  listaDeNomes = new Set(listaOriginal);

  // Atualiza a lista visual de amigos
  listaAmigos.innerHTML = '';
  listaDeNomes.forEach(nome => {
    const itemLista = document.createElement('li');
    itemLista.textContent = nome;
    listaAmigos.appendChild(itemLista);
  });

  // Atualiza o select de exclusão
  selectExcluir.innerHTML =
    '<option value="">Ninguém (todos participam)</option>';
  listaDeNomes.forEach(nome => {
    const option = document.createElement('option');
    option.value = nome;
    option.textContent = nome;
    selectExcluir.appendChild(option);
  });

  // Reabilita os botões para o novo sorteio
  botaoSortear.disabled = false;
  botaoAdicionar.disabled = false;

  // Foca no campo de entrada de nome
  inputAmigo.focus();

  // Esconde o indicador de carregamento e mostra a lista de amigos novamente
  setTimeout(() => {
    document.getElementById('carregando').style.display = 'none';
    listaAmigos.style.display = 'block';
  }, 3000); // Ajuste o tempo do carregamento conforme necessário
}
