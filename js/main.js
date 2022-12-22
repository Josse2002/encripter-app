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

function copyToClipboard() {
    var copyText = encryptedOutput.innerText;
    navigator.clipboard.writeText(copyText).then(() => {
        alert("Texto copiado al portapapeles");
    }, () => {
        alert("No se pudo copiar el texto al portapapeles");
    });

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
}

//Función para desencriptar
function decrypt() {
    var input = encryptedInput.value;
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

}


encryptButton.addEventListener("click", encrypt);
encryptedInput.addEventListener("keyup", normalizeText);
decryptButton.addEventListener("click", decrypt);
copyButton.addEventListener("click", copyToClipboard);