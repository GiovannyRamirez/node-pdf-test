const { getTextFromNumber } = require("./numberToWordsLarge");


const Unidades = {
    1: "UN",
    2: "DOS",
    3: "TRES",
    4: "CUATRO",
    5: "CINCO",
    6: "SEIS",
    7: "SIETE",
    8: "OCHO",
    9: "NUEVE",
};

function Decenas(num){

    const decena = Math.floor(num / 10);
    const unidad = num - (decena * 10);

    switch(decena)
    {
        case 1:
            switch(unidad)
            {
                case 0: return "DIEZ";
                case 1: return "ONCE";
                case 2: return "DOCE";
                case 3: return "TRECE";
                case 4: return "CATORCE";
                case 5: return "QUINCE";
                case 6: return "DIECISÉIS";
                default: return "DIECI" + Unidades[unidad];
            }
        case 2:
            switch(unidad)
            {
                case 0: return "VEINTE";
                case 2: return "VEINTIDÓS";
                case 3: return "VEINTITRÉS";
                case 6: return "VEINTISÉIS";
                default: return "VEINTI" + Unidades[unidad];
            }
        case 3: return DecenasY("TREINTA", unidad);
        case 4: return DecenasY("CUARENTA", unidad);
        case 5: return DecenasY("CINCUENTA", unidad);
        case 6: return DecenasY("SESENTA", unidad);
        case 7: return DecenasY("SETENTA", unidad);
        case 8: return DecenasY("OCHENTA", unidad);
        case 9: return DecenasY("NOVENTA", unidad);
        case 0: return Unidades[unidad];
    }
}

function DecenasY(strSin, numUnidades) {
    if (numUnidades > 0) return strSin + " Y " + Unidades[numUnidades];
    return strSin;
}

function Centenas(num) {
    const centenas = Math.floor(num / 100);
    const decenas = num - (centenas * 100);

    switch(centenas)
    {
        case 1:
            if (decenas > 0)
                return "CIENTO " + Decenas(decenas);
            return "CIEN";
        case 2: return "DOSCIENTOS " + Decenas(decenas);
        case 3: return "TRESCIENTOS " + Decenas(decenas);
        case 4: return "CUATROCIENTOS " + Decenas(decenas);
        case 5: return "QUINIENTOS " + Decenas(decenas);
        case 6: return "SEISCIENTOS " + Decenas(decenas);
        case 7: return "SETECIENTOS " + Decenas(decenas);
        case 8: return "OCHOCIENTOS " + Decenas(decenas);
        case 9: return "NOVECIENTOS " + Decenas(decenas);
    }

    return Decenas(decenas);
}//Centenas()

function Seccion(num, divisor, strSingular, strPlural) {
    const cientos = Math.floor(num / divisor)
    const resto = num - (cientos * divisor)

    let letras = "";

    if (cientos > 0)
        if (cientos > 1)
            letras = Centenas(cientos) + " " + strPlural;
        else
            letras = strSingular;

    if (resto > 0)
        letras += "";

    return letras;
}//Seccion()

function Miles(num) {
    const divisor = 1000;
    const cientos = Math.floor(num / divisor)
    const resto = num - (cientos * divisor)

    const strMiles = Seccion(num, divisor, "UN MIL", "MIL");
    const strCentenas = Centenas(resto);

    if(strMiles == "")
        return strCentenas;

    return strMiles + " " + strCentenas;
}//Miles()

function Millones(num) {
    const divisor = 1000000;
    const cientos = Math.floor(num / divisor)
    const resto = num - (cientos * divisor)

    const strMillones = Seccion(num, divisor, "UN MILLÓN", "MILLONES");
    const strMiles = Miles(resto);

    if(strMillones == "")
        return strMiles;

    return strMillones + " " + strMiles;
}//Millones()

function NumeroALetras(num) {
    var data = {
        numero: num,
        enteros: Math.floor(num),
        centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
        letrasCentavos: "",
        letrasMonedaPlural: 'Córdobas',//"PESOS", 'Dólares', 'Bolívares', 'etcs'
        letrasMonedaSingular: 'Córdoba', //"PESO", 'Dólar', 'Bolivar', 'etc'

        letrasMonedaCentavoPlural: "CENTAVOS",
        letrasMonedaCentavoSingular: "CENTAVO"
    };

    if (data.centavos > 0) {
        data.letrasCentavos = "CON " + (function (){
            if (data.centavos == 1)
                return Millones(data.centavos) + " " + data.letrasMonedaCentavoSingular;
            else
                return Millones(data.centavos) + " " + data.letrasMonedaCentavoPlural;
            })();
    };

    if(data.enteros == 0)
        return "CERO " + data.letrasMonedaPlural + " " + data.letrasCentavos;
    if (data.enteros == 1)
        return Millones(data.enteros) + " " + data.letrasMonedaSingular + " " + data.letrasCentavos;
    else
        return Millones(data.enteros) + " " + data.letrasMonedaPlural + " " + data.letrasCentavos;
}

// for (let i = 0; i < 1234567890000000; i+= 230404.4) {
//     console.log(NumeroALetras(i))
// }

const numberToConvert = 22;

const conversor = require("conversor-numero-a-letras-es-ar");

const getWordFromNumber = (number) => {
    const numeroATexto = conversor.conversorNumerosALetras;
    const numeroAPalabra = new numeroATexto();

    const integerPart = Math.trunc(number);
    const decimalPart = (((Math.round(number * 100)) - (Math.floor(number) * 100)));

    const integerWord = numeroAPalabra.convertToText(integerPart);
    const decimalWord = `y ${numeroAPalabra.convertToText(decimalPart)}`;
    const completeWordNumber = `${integerWord} ${decimalWord}`;

    if (!decimalPart) return integerWord;
    return completeWordNumber;
};

const decimal = NumeroALetras(numberToConvert);
const large = getTextFromNumber(`${numberToConvert}`);
const complete = getWordFromNumber(numberToConvert);

console.log({ decimal, large, complete })
