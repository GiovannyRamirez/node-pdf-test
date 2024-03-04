const { transformDate } = require("../utils/transformations");
const { paperTemplate } = require("./template_paper");

const getWitholdingTemplate = ({ society, nit, period, year, tableContent, type, collectingEntity }) => {
    const societyName = society.trim().toUpperCase();

    const currentDate = new Date();
    const { dayNumber, monthWord, yearNumber } = transformDate(currentDate);
    const monthUpperCased = monthWord.toUpperCase();

    const header = {
        content: `<h4>LIBERTY SEGUROS S.A.</h4>
                <h4>NIT: 860.039-988-0
                <h4>AV. CALLE 72 No. 10 - 07 PISO 8</h4>`,
        style: {
            gap: 0,
        }
    };
   
    const generalContent = 
        `<p>
            DE CONFORMIDAD CON EL ACUERDO 28/95 ART. 6 CERTIFICA QUE DURANTE EL BIMESTRE 
            <strong>${period}</strong> DEL AÑO GRAVABLE ${year}, SE PRACTICÓ RETENCIÓN ${type} POR LOS 
            SIGUIENTES CONCEPTOS:
        </p>
        <p>
            <strong>${societyName} NIT: ${nit}</strong>
        </p>
        ${tableContent}
        <p>
            CERTIFICAMOS ADEMÁS QUE DICHA RETENCIÓN FUE CONSIGNADA OPORTUNAMENTE A NOMBRE 
            DE LA ${collectingEntity}. PARA CONSTANCIA, SE EXPIDE ${dayNumber} DEL MES DE 
            ${monthUpperCased} DE ${yearNumber} ESTE DOCUMENTO NO REQUIERE FIRMA AUTOGRAFIADA. 
            ART. 10 DEL DECRETO 386 DE 1991.
        </p>
        `;
    
    const templateToPrint = paperTemplate({ content: generalContent, header });
    return templateToPrint;
};

module.exports = {
    witholdingTemplate: getWitholdingTemplate,
};
