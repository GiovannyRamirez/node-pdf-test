const conversor = require("conversor-numero-a-letras-es-ar");
const dayjs = require("dayjs");

const getNameOfMonth = (month) => {
    const numberToMonth = conversor.conversorNumerosALetras;
    const monthText = new numberToMonth();

    const monthName = monthText.convertirNroMesAtexto(month);
    return monthName;
};

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

const transformIdentification = (value) => {
    const extractNumbers = value.toString().replace(/[^0-9]+/g, "");
    const valueTransformed = new Intl.NumberFormat().format(extractNumbers);
    return valueTransformed; 
};

const transformDate = (date) => {
    const dayDate = dayjs(date).format("DD");
    const dayWord = getWordFromNumber(dayDate);
    
    const monthDate = dayjs(date).format("MM");
    const monthWord = getNameOfMonth(monthDate);

    const yearDate = dayjs(date).format("YYYY");

    const dateTransformed = {
        dayNumber: dayDate,
        dayWord: dayWord,
        monthNumber: monthDate,
        monthWord: monthWord,
        yearNumber: yearDate,
    };

    return dateTransformed;
};

module.exports = {
    getNameOfMonth,
    getWordFromNumber,
    transformIdentification,
    transformDate,
};
