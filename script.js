const adicionarLeitura = document.querySelector('.adicionar__leitura');
const formularioMangas = document.querySelector('.formulario__mangas');
const textArea = document.querySelector('.formulario__nome-manga');
const inputNumber = document.querySelector('.capitulo__manga');
const lancamentoManga = document.querySelector('.lancamento__manga');
const listaDeLeituras = document.querySelector('.leituras_atuais');
let mangas = JSON.parse(localStorage.getItem('mangas')) || [];



function excluirleitura(manga) {
    manga.excluir = true;
    mangas = mangas.filter(leitura => !leitura.excluir);
    document.querySelector('.item-em-foco').remove();

    atualizarLeituras();
}

function atualizarLeituras() {
    localStorage.setItem('mangas', JSON.stringify(mangas));
}

adicionarLeitura.addEventListener('click', () => {
    formularioMangas.classList.toggle('hidden');
})


function criarElementoLeitura(manga) {
    const li = document.createElement('li');
    li.classList.add('item_leitura');



    const divNomeItem = document.createElement('div');
    divNomeItem.classList.add('nome__item');

    const h3Nome = document.createElement('h3');
    h3Nome.classList.add('item__descricao');
    h3Nome.textContent = "Nome";

    const pNome = document.createElement('p');
    pNome.classList.add('item__texto');
    pNome.textContent = manga.titulo;

    divNomeItem.append(h3Nome);
    divNomeItem.append(pNome);
    li.append(divNomeItem);

    const divCapituloItem = document.createElement('div');
    divCapituloItem.classList.add('item__capitulo');

    const h3Capitulo = document.createElement('h3');
    h3Capitulo.classList.add('item__descricao');
    h3Capitulo.textContent = "Capitulo"

    const pCapitulo = document.createElement('p');
    pCapitulo.classList.add('item__texto');
    pCapitulo.textContent = manga.capitulo;

    divCapituloItem.append(h3Capitulo);
    divCapituloItem.append(pCapitulo);
    li.append(divCapituloItem);

    const divLancamento = document.createElement('div');
    divLancamento.classList.add('item__lancamento');

    const h3Lancamento = document.createElement('h3');
    h3Lancamento.classList.add('item__descricao');
    h3Lancamento.textContent = "Dia de lançamento";

    const pLancamento = document.createElement('p');
    pLancamento.classList.add('item__texto');
    pLancamento.textContent = manga.lancamento;

    divLancamento.append(h3Lancamento);
    divLancamento.append(pLancamento);
    li.append(divLancamento);

    const imgEditar = document.createElement('img');
    imgEditar.setAttribute('src', './assets/imagens/pincel.png');
    imgEditar.classList.add('editar__leitura');

    li.append(imgEditar);


    imgEditar.onclick = () => {

        document.querySelectorAll('.item-em-foco').forEach(elemento => {
            elemento.classList.remove('item-em-foco');
        });


        li.classList.add('item-em-foco');



        const formularioAtualzar = document.createElement('form');
        if (!document.querySelector('.formulario__atualizar')) {
            formularioAtualzar.classList.add('formulario__atualizar')
            formularioAtualzar.innerHTML = `
            <textarea required rows="1" cols="60" class="formulario__nome-manga formulario__nome-manga-atualizar" placeholder="Editar titulo">${manga.titulo}</textarea>

            <div class="infos__formulario">
                <input required class="capitulo__manga capitulo__manga-atualizar" type="number" placeholder="Capitulo Atual?" value="${manga.capitulo}">
                <select class="lancamento__manga lancamento__manga-atualizar" name="dia-da-semana">
                    <option value="N/I">Selecione o dia da semana</option>
                    <option value="dom">Domingo</option>
                    <option value="seg">Segunda</option>
                    <option value="ter">Terça</option>
                    <option value="quar">Quarta</option>
                    <option value="quin">Quinta</option>
                    <option value="sex">Sexta</option>
                    <option value="sab">Sabado</option>
                </select>

            </div>
            <div class="botoes__formulario">
                <button class="formulario__salvar">Atualizar</button>
                <button class="formulario__excluir"><img src="./assets/imagens/delete.png"></button>
            </div>

        `


            li.after(formularioAtualzar);


            let excluirManga = document.querySelector('.formulario__excluir');
            excluirManga.onclick = () => excluirleitura(manga);


        } else {
            document.querySelector('.formulario__atualizar').remove();
        }
        formularioAtualzar.addEventListener('submit', (evento) => {

            evento.preventDefault();

            const atualizarTitulo = document.querySelector('.formulario__nome-manga-atualizar');
            manga.titulo = atualizarTitulo.value;
            pNome.textContent = manga.titulo;

            const atualizarCapitulo = document.querySelector('.capitulo__manga-atualizar');
            manga.capitulo = atualizarCapitulo.value;
            pCapitulo.textContent = manga.capitulo;

            const atualizarLancamento = document.querySelector('.lancamento__manga-atualizar');
            manga.lancamento = atualizarLancamento.value;
            pLancamento.textContent = manga.lancamento;

            atualizarLeituras();
            document.querySelector('.formulario__atualizar').remove();
        })
    }
    return li;
}




formularioMangas.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const manga = {
        titulo: textArea.value,
        capitulo: inputNumber.value,
        lancamento: lancamentoManga.value
    };
    mangas.push(manga);

    const elementoLeitura = criarElementoLeitura(manga);
    listaDeLeituras.append(elementoLeitura);

    atualizarLeituras();

    textArea.value = '';
    inputNumber.value = '';
    lancamentoManga.value = '';


    console.log(mangas);
    //console.log(manga.titulo, manga.capitulo, manga.lancamento);
});

mangas.forEach(manga => {
    const elementoLeitura = criarElementoLeitura(manga);
    listaDeLeituras.append(elementoLeitura);
});





