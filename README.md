# 🎁 Sorteio de Amigo Secreto - Desafio Oracle Next Education

Este projeto foi desenvolvido como parte do **Desafio Oracle Next Education** e tem como objetivo proporcionar uma experiência interativa e divertida para o sorteio de amigo secreto. O sistema permite que os usuários cadastrem participantes, realizem sorteios e visualizem os resultados com animações especiais.

## 📌 Funcionalidades

- ✅ **Adicionar Participantes**: Insira nomes na lista de participantes.  
- ❌ **Evitar Nomes Duplicados**: Não é possível adicionar o mesmo nome mais de uma vez.  
- 🔄 **Remover Participante**: Usuários podem se excluir da lista antes do sorteio.  
- 🎲 **Realizar Sorteio**: Realiza o sorteio de amigo secreto de forma aleatória.  
- 🚫 **Exclusão de Participante**: Permite que um participante se exclua do sorteio a qualquer momento.  
- 🎆 **Animações Especiais**: Efeitos de fogos de artifício (confetti) ao revelar o sorteado!  
- 🔄 **Refazer Sorteio**: Realiza o sorteio novamente com os mesmos participantes, caso necessário.

## 🛠️ Tecnologias Utilizadas

- **HTML** - Estrutura da página  
- **CSS** - Estilização da interface  
- **JavaScript** - Lógica do sorteio e animações  
- **[Confetti.js](https://www.kirilv.com/canvas-confetti/)** - Efeitos visuais

## 🚀 Como Executar

1. Clone o repositório:
   ```sh
   git clone https://github.com/Marcusqueiroz93/sorteio_amigo_secreto.git
   ```

2. Abra o arquivo `index.html` no seu navegador para começar a usar a aplicação.

## 📂 Estrutura do Projeto

- **`index.html`** → Página principal do sorteio, com a estrutura HTML.  
- **`styles.css`** → Arquivo de estilo para a interface.  
- **`script.js`** → Contém as funções principais:
  - `adicionarAmigo()` → Adiciona um nome à lista de participantes.  
  - `sortearAmigo()` → Realiza o sorteio e informa quem é o amigo secreto.  
  - `dispararFogos()` → Dispara a animação de confetti ao revelar o sorteado.  
  - `reiniciarSorteio()` → Limpa a lista para iniciar um novo sorteio.  
  - `refazerSorteio()` → Refaz o sorteio com a mesma lista de participantes.  
- **`/assets/`** → Pasta contendo imagens e arquivos estáticos.

## 📜 Licença

Este projeto está sob a licença MIT.

👨‍💻 Desenvolvido por: Marcus Vinícius Barbosa de Queiroz  
📧 Contato: [LinkedIn](https://www.linkedin.com/in/marcus-vinicius-queiroz/)
