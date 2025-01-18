// Função para pegar o valor do cookie
function pegarCookie(nome) {
    let cookiesDecodificados = decodeURIComponent(document.cookie);
    let cookiesArray = cookiesDecodificados.split(';');
    for (let i = 0; i < cookiesArray.length; i++) {
        let cookie = cookiesArray[i].trim();
        if (cookie.indexOf(nome + "=") === 0) {
            return cookie.substring(nome.length + 1);
        }
    }
    return "";
}

// Função para definir o valor do cookie
function definirCookie(nome, valor) {
    document.cookie = nome + "=" + valor + ";path=/"; // Define o cookie sem expiração
}

// Função para deletar o cookie
function deletarCookie(nome) {
    document.cookie = nome + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Define o cookie com expiração no passado
}

// Função para atualizar o cronômetro
function atualizarContagem() {
    // Recupera o tempo restante do cookie (se existir)
    let tempoRestante = pegarCookie("tempoRestante");

    if (!tempoRestante) {
        // Define um tempo fixo de 2 minutos (em milissegundos)
        let tempoFixo = 2 * 60 * 1000; // 2 minutos convertidos para milissegundos
        definirCookie("tempoRestante", tempoFixo); // Salva no cookie
        tempoRestante = tempoFixo; // Usa o valor do tempo fixo definido
    } else {
        tempoRestante = parseInt(tempoRestante); // Converte o tempo em número

        // Calcula horas, minutos e segundos restantes
        const horas = Math.floor(tempoRestante / (1000 * 60 * 60));
        const minutos = Math.floor((tempoRestante % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((tempoRestante % (1000 * 60)) / 1000);

        // Formatação usando if para garantir dois dígitos
        let horasFormatadas = horas < 2 ? '0' + horas : horas;
        let minutosFormatados = minutos < 2? '0' + minutos : minutos;
        let segundosFormatados = segundos < 2 ? '0' + segundos : segundos;

        // Atualiza o cronômetro na div com o formato hh:mm:ss
        document.getElementById("timer").textContent = horasFormatadas + ':' + minutosFormatados + ':' + segundosFormatados;

        // Decrementa 1 segundo do tempo restante
        tempoRestante -= 1000;

        // Atualiza o cookie com o novo valor de tempo restante
        definirCookie("tempoRestante", tempoRestante);
    }
}

// Função para resetar o cronômetro
function resetarCronometro() {
    deletarCookie("tempoRestante"); // Deleta o cookie existente
    atualizarContagem(); // Atualiza o cronômetro
}

// Chama a função a cada 1 segundo
setInterval(atualizarContagem, 1000);
