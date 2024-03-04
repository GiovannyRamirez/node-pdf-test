const { transformDate } = require("../utils/transformations");
const { mainTemplate } = require("./template_general");

const getIdoneidadTemplate = ({ society, identification, legalRepresentative, legalRepresentativeId, date, untilDate = null, destination }) => {
    const { dayNumber, monthWord, yearNumber } = transformDate(untilDate);

    const content = 
        `<p>
            Que el Representante Legal de dicha Sociedad cumplió con los requisitos de 
            capacidad técnica y capacidad profesional que acreditan su idoneidad, conforme 
            a lo establecido en capítulo 7 de la Circular Externa 050 de 2015, emitida por 
            la Superintendencia Financiera de Colombia.
        </p>
        <p>
            Esta idoneidad es válida hasta el ${dayNumber} de ${monthWord} de ${yearNumber}.
        </p>
        `;

    const joinDocument = mainTemplate({ society, identification, legalRepresentative, legalRepresentativeId, date, isIdoneidad: true, content, destination });
    return joinDocument;
};

module.exports = {
    idoneidadTemplate: getIdoneidadTemplate,
};
