console.log('olá mundo');

function copyLink() {
    console.log('olá mundo');
    // O link que será copiado
    const link = 'localhost:8080/';

    // Copia o link para a área de transferência
    navigator.clipboard.writeText(link).then(function() {
        // Mostra uma mensagem de sucesso
    displaySendLinkBt();
    }).catch(function(error) {
        // Caso haja um erro
        document.getElementById('bt-copy').textContent = 'fail, sorry';
        console.error('Erro ao copiar o link:', error);
    });
}

function displaySendLinkBt() {
    document.getElementById('bt-copy').style.display = 'none';
    alert('Send the secret link to your friend.');
}