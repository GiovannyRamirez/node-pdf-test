const { getWordFromNumber } = require("../utils/transformations");
const { mainTemplate } = require("./template_general");

const getVinculationTemplate = ({ society, identification, legalRepresentative, incomes, date, value = null, numericValue = null, period = null, destination }) => {
    const getIncomes = (value, numericValue, period) => {
        const wordValue = getWordFromNumber(numericValue);
        const printWordValue = `${wordValue} Pesos M/L`;
        const printIncomes = !incomes ? "" :
            `<p>
                Durante el período ${period} la mencionada Sociedad ha percibido comisiones 
                con promedio Mensual por ${value} <span class="price">(${printWordValue}</span>).
            </p>`;

        return printIncomes;            
    };
    const content = getIncomes(value, numericValue, period);

    const joinDocument = mainTemplate({ society, identification, legalRepresentative, date, content, destination });
    return joinDocument;
};

module.exports = {
    vinculationTemplate: getVinculationTemplate,
};
