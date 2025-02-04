// Constantes globais do código
const inputAmigo = document.getElementById('amigo');
const listaAmigos = document.getElementById('listaAmigos');
const resultado = document.getElementById('resultado');
const selectExcluir = document.getElementById('excluirSorteio');
const listaDeNomes = new Set();

// Função para adicionar participantes
function adicionarAmigo() {
  const nomeAmigo = inputAmigo.value.trim();

  if (!nomeAmigo) {
    alert('Informe um nome válido');
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

// Função para sortear
function sortearAmigo() {
  if (listaDeNomes.size < 1) {
    alert('Adicione pelo menos 1 participante!');
    return;
  }

  const nomes = Array.from(listaDeNomes);
  const excluir = selectExcluir.value; // Nome a ser excluído

  // Remove o nome escolhido do sorteio, se houver
  const listaSorteio = excluir ? nomes.filter(nome => nome !== excluir) : nomes;

  if (listaSorteio.length < 1) {
    alert('Não há participantes suficientes para o sorteio!');
    return;
  }

  const indiceSorteado = Math.floor(Math.random() * listaSorteio.length);
  const sorteado = listaSorteio[indiceSorteado];

  // Exibe o resultado
  resultado.innerHTML = `
    <div class="resultado-destaque">
      <p>🎉 O sorteado foi:</p>
      <h2>${sorteado}</h2>
    </div>
  `;

  // Remove o nome sorteado do conjunto de nomes para evitar que seja sorteado novamente
  listaDeNomes.delete(sorteado);

  // Atualiza o select com o nome sorteado removido
  const optionToRemove = Array.from(selectExcluir.options).find(
    option => option.value === sorteado
  );
  if (optionToRemove) {
    optionToRemove.remove();
  }

  // Dispara os fogos de artifício
  dispararFogos();

  // Verifica se falta apenas 1 participante
  if (listaDeNomes.size === 1) {
    resultado.innerHTML += `
      <p>🔔 Faltando apenas 1 pessoa a ser sorteada!</p>
    `;
  }

  // Verifica se todos os participantes foram sorteados
  if (listaDeNomes.size === 0) {
    resultado.innerHTML += `
      <p>🎉 Todos os participantes foram sorteados! O último foi ${sorteado}. </p>
    `;
  }
}

// Função para disparar fogos de artifício
function dispararFogos() {
  confetti({
    particleCount: 1000, // Quantidade de partículas
    spread: 800, // Quão espalhados os fogos estarão
    origin: { y: 0.6 }, // Origem dos fogos (0.6 = 60% da altura da tela)
  });
}

// Função para reiniciar o sorteio
function reiniciarSorteio() {
  listaDeNomes.clear();
  listaAmigos.innerHTML = '';
  resultado.innerHTML = '';
  selectExcluir.innerHTML =
    '<option value="">Ninguém (todos participam)</option>';
  inputAmigo.focus();
}
