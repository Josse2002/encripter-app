var encryptedConverter = ["ai", "enter", "imes", "ober", "ufat"];

//Variables necesarias para el funcionamiento del programa
var encryptedInput = document.getElementById("encripter-input");
var encryptedOutput = document.getElementById("encrypted-output");
var encryptButton = document.getElementById("encrypt-button");
var decryptButton = document.getElementById("decrypt-button");
var copyButton = document.getElementById("copy-button");
//variables de interfaz
var textFound = document.getElementById("textFound");
var notFoundText = document.getElementById("notFoundEncrypt");
var notification = document.getElementById("notification");

function copyToClipboard() {
    var copyText = encryptedOutput.innerText;
    navigator.clipboard.writeText(copyText).then(() => {
        notification.firstElementChild.innerHTML = "Texto copiado al portapapeles";
        notification.style.background = "#69f542";
        showNotification();
    }, () => {
        notification.firstElementChild.innerHTML = "No se pudo copiar al portapapales, por favor reintenlo";
        notification.style.background = "#eb4034";
        showNotification();
    });

}

function showNotification() {
    notification.style.opacity = "1";
    notification.style.animation = "fadeIn 0.9s";
    setTimeout(() => {
        notification.style.opacity = "0";
        notification.style.animation = "fadeOut 0.9s";
    }, 3000);
}

function normalizeText() {
    var input = encryptedInput.value;
    encryptedInput.value = input.toLowerCase();
    //Patrones de caracteres especiales y acentos
    var specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,.";
    var acentos = "áéíóúñç";
    var acentosReplace = "aeiounc";

    //Reemplaza los caracteres especiales y acentos los que puede poner el usuario
    //mediante regex
    for (var i = 0; i < acentos.length; i++) {
        encryptedInput.value = encryptedInput.value.replace(new RegExp("\\" + acentos[i], 'gi'), acentosReplace[i]);
    }
    for (var i = 0; i < specialChars.length; i++) {
        encryptedInput.value = encryptedInput.value.replace(new RegExp("\\" + specialChars[i], 'gi'), '');
    }

}

//Función para encriptar
function encrypt() {
    var input = encryptedInput.value;
    if (input != "") {
        var output = "";
        for (var i = 0; i < input.length; i++) {
            var character = input[i];
            switch (character) {
                //casos cuando es una vocal, cambia por el valor de la posición del arreglo
                case "a":
                    output += encryptedConverter[0];
                    break;
                case "e":
                    output += encryptedConverter[1];
                    break;
                case "i":
                    output += encryptedConverter[2];
                    break;
                case "o":
                    output += encryptedConverter[3];
                    break;
                case "u":
                    output += encryptedConverter[4];
                    break;
                default:
                    //Si no es ninguna, pues solamente agrega la letra en el recorrido
                    output += character;
            }

        }
        //Muestra el resultado en el div
        textFound.style.display = "flex";
        notFoundText.style.display = "none";
        encryptedOutput.innerHTML = output;
        encryptedInput.value = "";

    } else {
        notification.firstElementChild.innerHTML = "No hay nada que encriptar, por favor escriba algo";
        notification.style.background = "#eb4034";
        showNotification();

    }

}

//Función para desencriptar
function decrypt() {
    var input = encryptedInput.value;
    if (input != "") {
        
        var letters = ["a", "e", "i", "o", "u"];
        //Este input se correra las 6 veces de las letras
        for (let i = 0; i < 6; i++) {
            //Mientras este otro, verifica en cada una de las palabras del input
            for (let j = 0; j < input.length; j++) {
                //Si el input incluye alguna de las palabras del arreglo, entonces
                if (input.includes(encryptedConverter[i])) {
                    //Reemplaza la palabra del arreglo por la letra correspondiente
                    input = input.replace(encryptedConverter[i], letters[i]);
                }

            }

        }
        textFound.style.display = "flex";
        notFoundText.style.display = "none";
        encryptedOutput.innerHTML = input;
        encryptedInput.value = "";
    }else{
        notification.firstElementChild.innerHTML = "No hay nada que desencriptar, por favor escriba algo";
        notification.style.background = "#eb4034";
        showNotification();
    }


}


encryptButton.addEventListener("click", encrypt);
encryptedInput.addEventListener("keyup", normalizeText);
decryptButton.addEventListener("click", decrypt);
copyButton.addEventListener("click", copyToClipboard);