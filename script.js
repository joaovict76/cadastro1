$(document).ready(function () {
    // Máscaras
    $('#cpf').mask('000.000.000-00');
    $('#data_nascimento').mask('00/00/0000');
    $('#telefone').mask('(00)00000-0000');

    // Busca automática de endereço via CEP (se necessário)
    $('#cep').blur(function () {
        let cep = $(this).val().replace(/\D/g, '');
        if (cep.length === 8) {
            $.getJSON(`https://viacep.com.br/ws/${cep}/json/`, function (data) {
                if (!("erro" in data)) {
                    $("#logradouro").val(data.logradouro);
                    $("#bairro").val(data.bairro);
                    $("#cidade").val(data.localidade);
                    $("#estado").val(data.uf);
                } else {
                    alert("CEP não encontrado!");
                }
            });
        }
    });
});

    // Aplica a máscara (000.000.000-00)
    if (cpf.length > 3) cpf = cpf.replace(/^(\d{3})(\d)/, '$1.$2');
    if (cpf.length > 6) cpf = cpf.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
    if (cpf.length > 9) cpf = cpf.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');

    this.value = cpf; // Atualiza o input formatado

    function validarCPF() {
        let cpf = document.getElementById("cpf").value.replace(/\D/g, '');
        let cpfErro = document.getElementById("cpfErro");
    
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
            cpfErro.style.display = "block";
            return false;
        }
        
        let soma = 0, resto;
        for (let i = 1; i <= 9; i++) soma += parseInt(cpf.charAt(i - 1)) * (11 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.charAt(9))) {
            cpfErro.style.display = "block";
            return false;
        }
        
        soma = 0;
        for (let i = 1; i <= 10; i++) soma += parseInt(cpf.charAt(i - 1)) * (12 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.charAt(10))) {
            cpfErro.style.display = "block";
            return false;
        }
        
        cpfErro.style.display = "none";
        return true;
    }