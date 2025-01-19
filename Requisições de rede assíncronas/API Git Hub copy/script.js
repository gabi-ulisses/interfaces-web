async function buscar(date) {
    const url = `https://api.nasa.gov/planetary/apod?api_key=yax5hrTcj9uVgTX3NpWwoE2T3pQPFQ2b2OCZbvfv&date=${date}`;
    let response = await fetch(url);

    if (response.ok) {
        let data = await response.json();

        let explicacao = document.querySelector('#explicacao');
        explicacao.textContent = data['explanation'];

        let title = document.querySelector('#title');
        title.textContent = data['title'];
        
        let img = document.querySelector('#image');
        img.src = data['hdurl'];
    } else {
        alert('Erro ao buscar imagem');
    }
}

function main() {
    let btn = document.querySelector('#buscar');
    btn.addEventListener('click', function() {
        let txtDate = document.querySelector('#date');
        let date = txtDate.value;
        buscar(date);
    });
}

main();
/*
async function buscar(date) {
    const url = `https://api.nasa.gov/planetary/apod?api_key=yax5hrTcj9uVgTX3NpWwoE2T3pQPFQ2b2OCZbvfv&date=${date}`;

    let response = await fetch(url);

    if (response.ok) {
        let data = await response.json();

        // Obter a explicação em inglês
        let explicacaoEn = data['explanation'];

        // Traduzir a explicação para o português usando LibreTranslate
        let traducao = await traduzirParaPortugues(explicacaoEn);

        let explicacao = document.querySelector('#explicacao');
        explicacao.textContent = traducao;

        let img = document.querySelector('#image');
        img.src = data['hdurl'];
    } else {
        alert('Erro ao buscar imagem');
    }

}

async function traduzirParaPortugues(texto) {
    const res = await fetch("https://libretranslate.com/translate", {
        method: "POST",
        body: JSON.stringify({
            q: texto,             // Texto a ser traduzido
            source: "en",         // Idioma original (inglês)
            target: "pt"          // Idioma de destino (português)
        }),
        headers: { "Content-Type": "application/json" }
    });

    const data = await res.json();
    return data.translatedText;  // Retorna o texto traduzido
}

function main() {
    let btn = document.querySelector('#buscar');
    btn.addEventListener('click', function() {
        let txtDate = document.querySelector('#date');
        let date = txtDate.value;
        buscar(date);
    });
}

main();
*/
