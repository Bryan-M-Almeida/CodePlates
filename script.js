const modal = document.getElementById("previewModal");
const iframe = document.getElementById("iframePreview");
const closeBtn = document.querySelector(".modal .close");

document.querySelectorAll('.btn-preview').forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();
        const link = btn.getAttribute('data-link');
        iframe.src = link;
        modal.style.display = "flex";
    });
});

closeBtn.onclick = () => {
    modal.style.display = "none";
    iframe.src = "";
}

window.onclick = e => {
    if (e.target === modal) {
        modal.style.display = "none";
        iframe.src = "";
    }
}

function criarCard() {

}
