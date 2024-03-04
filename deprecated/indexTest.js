const html_to_pdf = require("html-pdf-node");

const dayjs = require("dayjs");

const { mainTemplate } = require("../certificationsTemplates/template_general");
const { getWordFromNumber, getNameOfMonth } = require("../utils/transformations");

const options = { 
    format: "Letter",
    path: "./pdfExample2.pdf",
    printBackground: true,
};

const data = {
    certificationType: "VINCULACION_CON_INGRESOS",
    information: {
        "Sociedad": "   AseS. EN SEG. uRIBE LOPeZ Y CIA LtdA    ",
        "Identificacion": " 900.657.056-7",
        "Fecha": "2013-10-04",
    },
    income: {
        "Valor": 150000000.98,
        "Valor Total": "$ 150.000.000,98",
        "Periodo Evaluado": "202005 - 202012",
        "Registros Evaluados": 3,
    }
}

const { certificationType, information, income = null } = data;


const getContentFromTemplate = ({ society, identification, incomes, date, value = null, numericValue = null, period = null }) => {

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

    const joinDocument = mainTemplate({ society, identification, date, content });

    return joinDocument;
};

const getContent = ({ society, identification, incomes, date, value = null, numericValue = null, period = null }) => {
    const societyName = society.trim().toUpperCase();
    const vigencyDate = dayjs(date).format("YYYY/MM/DD");

    const currentDayDate = dayjs().format("DD");
    const currentDayDateWord = getWordFromNumber(currentDayDate);

    const currentMonthDate = dayjs().format("MM");
    const currentYearDate = dayjs().format("YYYY");

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

    const content = 
        `<style>
            body {
                background-image: url("https://cdn.discordapp.com/attachments/893241074699608084/1058432014472200192/Liberty_bg_1.jpg");
                background-position: center;
                background-repeat: no-repeat;
                background-size: 98% 95%;
                padding: 4% 12% 9%;
            }
            header {
                display: flex;
                flex-direction: column;
                gap: 64px;
                margin: 128px 0 64px;
            }
            header, footer {
                text-align: center;
            }
            h4 {
                font-weight: 600;
                margin: 0;
            }
            main {
                text-align: justify;
            }
            p {
                margin-bottom: 18px;
            }
            .firma {
                margin-bottom: 4px;
            }
            .firma-img {
                width: 43%;
            }
            footer {
                bottom: 9%;
                position: absolute;
                width: 76%;
            }
            span, a {
                color: #808080;
                font-size: 14px;
            }
            .day, .price {
                color: black;
                font-size: 16px;
                text-transform: capitalize;
            }
            a {
                display: inline;
                margin-right: 4px;
            }
        </style>
        <body>    
            <header>                        
                <h4>LIBERTY SEGUROS S.A.</h4>
                <h4>CERTIFICAN:</h4>
            </header>
            <main>
                <p>
                    Que la Sociedad ${societyName} Identificado con NIT. ${identification}, 
                    tiene una relación mercantil vigente desde ${vigencyDate} con la Compañía; 
                    en los términos del artículo 845 del Código de Comercio.
                </p>
                ${getIncomes(value, numericValue, period)}
                <p>
                    Esta certificación se expide en Bogotá, a solicitud del interesado a los 
                    <span class="day">${currentDayDateWord}</span> (${currentDayDate}) días del 
                    mes de ${getNameOfMonth(currentMonthDate)} de ${currentYearDate}.
                </p>
                <section>
                    <p class="firma">Atentamente,</p>
                    <img
                        class="firma-img"
                        src="https://cdn.discordapp.com/attachments/1017164510366273636/1058432071011414076/FirmaJefe.png"
                        alt="Firma"
                    />
                    <br>
                    <strong>
                        Marco Alejandro Arenas Prada<br>
                        Country Manager<br>
                        Liberty Seguros S.A.
                    </strong>
                </section>
            </main>
            <footer>
                <span>
                    Oficina Principal Calle 72 No. 10-07 Bogotá D.C - Colombia Tel: 3103300
                </span>
                <br>
                <a href="www.libertyseguros.co">
                    www.libertyseguros.co
                </a>
                <span>
                    NIT. 860.039.988-0
                </span>
            </footer>
        </body>
        `;

    return content;
}

let file = {
    "VINCULACION_CON_INGRESOS": {
        society: information.Sociedad,
        identification: information.Identificacion,
        date: information.Fecha,
        numericValue: income && income["Valor"],
        value: income && income["Valor Total"],
        period: income && income["Periodo Evaluado"],
        incomes: true,
    },
    "VINCULACION_SIN_INGRESOS": {
        society: information.Sociedad,
        identification: information.Identificacion,
        date: information.Fecha,
        incomes: false,
    },
};

let fileToPrint = {
    content: getContentFromTemplate(file[certificationType]),
};


html_to_pdf.generatePdf(fileToPrint, options).then(() => console.log("Éxito"))
module.exports = {
    getNameOfMonth,
    getWordFromNumber,
};
