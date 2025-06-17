const modal = document.querySelector('.verCard');

async function carregarCards() {
  const tipo = new URLSearchParams(window.location.search).get('tipo');
  console.log('Tipo da URL:', tipo);

  const resposta = await fetch('assets/server/dados.json');
  const dados = await resposta.json();
  console.log('JSON carregado:', dados);

  const container = document.getElementById('cards-container');

  if (tipo && dados[tipo]) {
    container.innerHTML = '';

    dados[tipo].forEach(card => {
      const div = document.createElement('div');
      div.className = 'card';

       const nomeSemEmojis = card.name.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
      div.innerHTML = `
        <img src="${card.image}" alt="Imagem do card">
        <p>${nomeSemEmojis}</p>
      `;

      div.addEventListener('click', () => abrirModal(card));

      container.appendChild(div);
    });
  } else {
    container.innerHTML = `<p>Tipo "${tipo}" não encontrado.</p>`;
  }
}

function abrirModal(card) {
  
  modal.querySelector('h2').textContent = card.name;
  modal.querySelector('h3').textContent = card.alternativeName || '';

  const img = modal.querySelector('img');
  img.src = card.image;
  img.alt = card.name;

  const ps = modal.querySelectorAll('p');
  ps[0].textContent = card.description || 'No description';
  if (card.chapter) {
    ps[1].textContent = `Chapter: ${card.chapter}`;
  } else {
    ps[1].textContent = 'Chapter not informed';
  }
    

  const status = (card.status || 'Unknown').toLowerCase();
  const color = (status === 'finalizado' || status === 'hiato') ? 'red' : 'green';


  ps[2].innerHTML = `Status: <span style="color: ${color};">${card.status}</span>`;
  
  modal.classList.add('active');
}

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
  }
});

modal.querySelector('.btn-close').addEventListener('click', () => {
  modal.classList.remove('active');
});

carregarCards();
