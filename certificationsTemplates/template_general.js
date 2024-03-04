const dayjs = require("dayjs");
// const 
// const fs = require('fs');
const path = require('path');

const imgPath = path.resolve(__dirname, 'pdfsign.png');

const { transformIdentification, transformDate } = require("../utils/transformations");
const { paperTemplate } = require("./template_paper");

const getMainTemplate = ({ society, identification, legalRepresentative, legalRepresentativeId = null, date, content, isIdoneidad = false, destination }) => {
    const societyName = society.trim().toUpperCase();
    const legalRepresentativeName = legalRepresentative.trim().toUpperCase();
    const destinationName = destination.trim().toUpperCase();
    const vigencyDate = dayjs(date).format("YYYY/MM/DD");

    const currentDate = new Date();
    const { dayNumber, dayWord, monthWord, yearNumber } = transformDate(currentDate);
    
    const getLegalRepresentativeInfo = ({ legalRepresentativeId }) => {
        if (!legalRepresentativeId || !isIdoneidad) return legalRepresentativeName;
        const legalRepresentativeDoc = transformIdentification(legalRepresentativeId);
        const legalId = `${legalRepresentativeName} identificado con C.C ${legalRepresentativeDoc}`;
        return legalId;
    };

    const legalRepresentativeInfo = getLegalRepresentativeInfo({ legalRepresentativeId });
   
    const generalContent = 
        `<p>
            Que la Sociedad ${societyName} Identificada con NIT. ${identification} 
            cuyo Representante Legal es el (la) Sr(a). ${legalRepresentativeInfo}, 
            tiene una relación mercantil vigente desde ${vigencyDate} con la Compañía; 
            en los términos del artículo 845 del Código de Comercio.
        </p>
        ${content}
        <p>
            Esta certificación se expide en Bogotá, a solicitud del interesado a los 
            <span class="day">${dayWord}</span> (${dayNumber}) días del 
            mes de ${monthWord} de ${yearNumber}. Con destino a ${destinationName}.
        </p>
        <section>
            <p class="firma">Atentamente,</p>
            <section class="firma-img">
            <svg class="firma-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 98 54" version="1.1">
            <g id="surface1">
            <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 60.25 3.675781 C 40.898438 14.003906 24.101562 26.144531 10.949219 39.292969 C 0.398438 49.769531 -2.101562 55.511719 5.449219 51.632812 C 9.300781 49.667969 37.148438 32.742188 38 31.835938 C 38.851562 30.929688 39.148438 30.777344 32.5 34.859375 C 25.449219 39.140625 5.398438 50.925781 3.699219 51.734375 C 2.75 52.1875 1.851562 52.4375 1.699219 52.238281 C 0.5 51.078125 10.648438 39.59375 20.101562 31.484375 C 30.449219 22.566406 45.050781 12.59375 57.75 5.691406 C 68.101562 0.101562 68.601562 0.152344 59.699219 5.84375 C 53.601562 9.773438 38 21.054688 38 21.507812 C 38 21.863281 39.949219 20.550781 45.25 16.625 C 47.75 14.757812 53.5 10.730469 58.101562 7.65625 C 62.648438 4.582031 66.550781 1.8125 66.75 1.511719 C 67.449219 0.351562 64.949219 1.160156 60.25 3.675781 Z M 60.25 3.675781 "/>
            <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 71.5 6.195312 C 70 6.851562 66.601562 8.664062 64 10.328125 C 61.398438 11.9375 57.949219 14.054688 56.351562 15.011719 C 54.800781 15.96875 53.351562 16.976562 53.148438 17.277344 C 52.800781 17.832031 58.898438 14.558594 64 11.433594 C 71.148438 7.050781 76.5 5.039062 76.5 6.75 C 76.5 7.707031 75.101562 9.417969 67.449219 17.730469 C 58.601562 27.351562 54.851562 32.039062 52.75 36.320312 C 50.699219 40.296875 50.550781 42.011719 52.050781 42.867188 C 54.550781 44.175781 60.699219 41.960938 80.75 32.492188 C 87.648438 29.265625 93.351562 26.496094 93.5 26.34375 C 94.101562 25.691406 90.300781 27.25 77 33.09375 C 51.75 44.226562 50.300781 44.480469 52.949219 37.375 C 54.449219 33.398438 57.5 29.46875 67.449219 18.789062 C 75.898438 9.671875 77.800781 7.101562 77.300781 5.742188 C 76.898438 4.734375 74.648438 4.886719 71.5 6.195312 Z M 71.5 6.195312 "/>
            <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 36.949219 23.019531 C 36.300781 23.828125 36.351562 23.875 37.148438 23.222656 C 37.949219 22.566406 38.199219 22.164062 37.800781 22.164062 C 37.699219 22.164062 37.300781 22.566406 36.949219 23.019531 Z M 36.949219 23.019531 "/>
            </g>
            </svg>
  </section>
            <strong>
                Marco Alejandro Arenas Prada<br>
                Country Manager<br>
                Liberty Seguros S.A.
            </strong>
        </section>
        `;
    
    const templateToPrint = paperTemplate({ content: generalContent });
    return templateToPrint;
};

module.exports = {
    mainTemplate: getMainTemplate,
};
