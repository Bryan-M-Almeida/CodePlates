const modal = document.getElementById("previewModal");
const iframe = document.getElementById("iframePreview");
const closeBtn = document.querySelector(".modal .close");
const cardContainer = document.querySelector(".template-container");

cardContainer.addEventListener('click', e => {
    if (e.target.classList.contains('btn-preview')) {
        e.preventDefault();
        const visualizar = e.target.getAttribute('data-visualizar');
        iframe.src = visualizar;
        modal.classList.add("show");
    }
});

closeBtn.onclick = () => {
    modal.classList.remove("show");
    setTimeout(() => iframe.src = "", 300); // espera o fade-out
};

window.onclick = e => {
    if (e.target === modal) {
        modal.classList.remove("show");
        setTimeout(() => iframe.src = "", 300);
    }
};


function criarCard(img, nome, visualizar, codigo) {
    const card = document.createElement('div');
    cardContainer.appendChild(card);
    card.className = 'card'
    card.innerHTML = `<img src="${img}"
                alt="${nome}" />
            <h3>${nome}</h3>
            <div class="buttons">
                <a href="#" class="btn-preview" data-visualizar="${visualizar}">🔍
                    Visualizar</a>
                <a href="${codigo}" target="_blank">💻 Código</a>
            </div>`
}

criarCard("assets/barbearia.jpg", 'Barbershop', 'https://bryan-m-almeida.github.io/template-barbearia/', 'https://github.com/Bryan-M-Almeida/template-barbearia')
criarCard('assets/loja gold.jpg', 'Gold', 'https://bryan-m-almeida.github.io/template-loja/', 'https://github.com/Bryan-M-Almeida/template-loja');
criarCard("assets/pizzaria.webp", 'Pizzaria', 'https://bryan-m-almeida.github.io/template-pizzaria/', 'https://github.com/Bryan-M-Almeida/template-pizzaria')