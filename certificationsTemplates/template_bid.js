const { mainTemplate } = require("./template_general");

const getBidTemplate = ({ society, identification, legalRepresentative, legalRepresentativeId, date, destination }) => {
    const content = 
        `<p>
            La mencionada Sociedad ha dado cumplimiento a lo estipulado en su contrato de 
            intermediación y las políticas de la Compañía y está autorizado para comercializar 
            Seguros Generales, Vida y Salud.
        </p>
        `;

    const joinDocument = mainTemplate({ society, identification, legalRepresentative, legalRepresentativeId, date, content, destination });
    return joinDocument;
};

module.exports = {
    bidTemplate: getBidTemplate,
};
