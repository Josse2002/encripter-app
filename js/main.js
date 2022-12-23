/**
 * Arreglo de las palabras que se van a reemplazar por las vocales en el encriptado
 * @type {string[]} 
 */
const encryptedConverter = ["ai", "enter", "imes", "ober", "ufat"];

/**
 * Variable que contiene el input del usuario
 * @type {HTMLInputElement} 
 */
var encryptedInput = document.getElementById("encripter-input");
/**
 * Variable que contiene el div donde se muestra el resultado del encriptado
 * @type {HTMLDivElement} 
 */
var encryptedOutput = document.getElementById("encrypted-output");
/** 
 *  Botón para encriptar el texto
 * @type {HTMLButtonElement} 
 */
var encryptButton = document.getElementById("encrypt-button");
/** 
 *  Botón para desencriptar el texto
 * @type {HTMLButtonElement} 
 */
var decryptButton = document.getElementById("decrypt-button");
/** 
 *  Botón para copiar el texto al portapapeles
 * @type {HTMLButtonElement} 
 */
var copyButton = document.getElementById("copy-button");
/** 
 *  Div que contiene la estructura cuando se encripta algo
 * @type {HTMLDivElement} 
*/
var textFound = document.getElementById("textFound");
/** 
 *  Div que contiene la estructura cuando no se encripta nada
 * @type {HTMLDivElement} 
*/
var notFoundText = document.getElementById("notFoundEncrypt");
/** 
 *  Div que contiene la estructura de la notificación
 * @type {HTMLDivElement} 
*/
var notification = document.getElementById("notification");


/** 
 *  Función que se da clic en el botón de copiar, luego de que se haya encriptado algo en el input.
 *  @returns {void} No retorna nada, solo copia el texto al portapapeles
*/
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
/** 
 *  Función que se ejecuta cuando hay un error o algo que mostrar en la notificación, por ejemplo
 *  cuando se copia algo al portapapeles, o cuando no se puede copiar, o cuando se encripta algo.
 *  @returns {void} No retorna nada, solo muestra la notificación
*/
function showNotification() {
    notification.style.opacity = "1";
    notification.style.animation = "fadeIn 0.9s";
    setTimeout(() => {
        notification.style.opacity = "0";
        notification.style.animation = "fadeOut 0.9s";
    }, 3000);
}
/** 
 * Función que se ejecuta cuando el usuario escribe una letra en el campo de texto,
 * el cual se encargara de normalizar el texto, es decir, quitar los caracteres especiales y acentos, y luego encriptar
 * @returns {void} No retorna nada, solo cambia el texto del input
*/
function normalizeText() {
    input = encryptedInput.value;
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

/** 
 * Función que se ejecuta cuando se da clic en el botón de encriptar, luego de que se haya escrito algo en el input
 * @returns {void} No retorna nada, solo encripta el texto
*/
function encrypt() {
    var input = encryptedInput.value;
    if (input != "") {
        var output = "";
        for (var i = 0; i < input.length; i++) {
            var character = input[i];
            switch (character) {
                /**
                 * Casos posibles de las vocales, en este caso, se reemplazan por los números
                 */
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

/** 
 * Funcion que se ejecuta cuando se da clic en el botón de desencriptar, luego de que se escribe un texto
 * encriptado en el input.
 * @returns {void} No retorna nada, solo desencritpa el texto y lo muestra en el div
*/
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
    } else {
        notification.firstElementChild.innerHTML = "No hay nada que desencriptar, por favor escriba algo";
        notification.style.background = "#eb4034";
        showNotification();
    }


}


/**
 * Evento que encripta el texto cuando se presiona el botón de encripta, lee más en {@tutorial encriptado}
 *  @event encrypt
 * 
 */
encryptButton.addEventListener("click", encrypt);
/**
 * Evento que normaliza el texto cuando se presiona una tecla en el input
 *  @event normalizeEvent
 */
const normalizeEvent = encryptedInput.addEventListener("keyup", normalizeText);
/**
 * Evento que desencripta el texto cuando se presiona el botón de desencriptar
 *  @event decryptEvent
 */
const decryptEvent  =decryptButton.addEventListener("click", decrypt);
/**
 * Evento que copia el texto en el portapapeles cuando se presiona el botón de copiar
 * @event copyEvent
 */
const copyEvent = copyButton.addEventListener("click", copyToClipboard);