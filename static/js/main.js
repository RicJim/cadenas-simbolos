document.addEventListener('DOMContentLoaded', () => {
    const alfabetoInput = document.getElementById('alfabeto');
    const cad1Input = document.getElementById('cadena1');
    const cad2Input = document.getElementById('cadena2');
    const longitud1 = document.getElementById('longitud1');
    const longitud2 = document.getElementById('longitud2');
    
    let caracteres = new Set();

    alfabetoInput.addEventListener('input', () => {
        const input = alfabetoInput.value.split('');
        caracteres = new Set(input);
        alfabetoInput.value = Array.from(caracteres).join('');

        if (alfabetoInput.value.trim() !== '') {
            cad1Input.removeAttribute('disabled');
            cad2Input.removeAttribute('disabled');
        } else {
            cad1Input.setAttribute('disabled', 'disabled');
            cad2Input.setAttribute('disabled', 'disabled');
        }

        filterInput(cad1Input, caracteres);
        filterInput(cad2Input, caracteres);
    });

    //Verificar si el caracter se encuentra en el alfabeto
    function filterInput(input, caracteres) {
        const inputValue = input.value;
        const filteredValue = inputValue.split('').filter(char => caracteres.has(char)).join('');
        input.value = filteredValue;

        updateLength(input, input === cad1Input ? longitud1 : longitud2);
    };

    function updateLength(input, lengthInput) {
        const inputValue = input.value;
        const length = inputValue.length;
        lengthInput.value = length;
    }

    function verify(input, caracteres) {
        const inputValue = input.value;

        if (inputValue.split('').some(char => !caracteres.has(char))) {
            input.setCustomValidity('Contiene caracteres no válidos para el alfabeto.');

            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'Carácter no válido, intente con otro...',
                confirmButtonColor: '#007bff'
            });
        } else {
            input.setCustomValidity('');
        }
    }

    cad1Input.addEventListener('input', event => {
        verify(event.target, caracteres);
        filterInput(event.target, caracteres);
        verify(event.target, caracteres);
        resultadosButton();
    });

    cad2Input.addEventListener('input', event => {
        verify(event.target, caracteres);
        filterInput(event.target, caracteres);
        verify(event.target, caracteres);
        resultadosButton();
    });

    //Redireccion con los resultados al html Mostrar resultados
    const form = document.querySelector('form');
    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        window.location.href = data.redirect;
    });

    //Habilitar o desabilitar boton mostrar resultados
    const expaInput = document.getElementById('exponentea');
    const expbInput = document.getElementById('exponenteb');
    const resButton = document.getElementById('btn-res');

    const resultadosButton = () => {
        if (expaInput.value.trim() !== '' && expbInput.value.trim() !== '' && cad1Input.value.trim() !== '' && cad2Input.value.trim() !== '') {
            resButton.removeAttribute('disabled');
        } else {
            resButton.setAttribute('disabled', 'disabled');
        }
    };

    expaInput.addEventListener('input', resultadosButton);
    expbInput.addEventListener('input', resultadosButton);


    //limpiar Textbox
    const formInputs = document.querySelectorAll('form input[type="text"]');

    function limpiarInputs() {
        formInputs.forEach(input => input.value = '');
        resButton.disabled = true;
    }

    window.addEventListener('load', limpiarInputs)
});
