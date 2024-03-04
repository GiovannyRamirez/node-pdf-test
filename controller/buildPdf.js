const html_to_pdf = require("html-pdf-node");
const alternative = require("pdf-creator-node");
const dayjs = require("dayjs");

const { vinculationTemplate } = require("../certificationsTemplates/template_vinculation");
const { idoneidadTemplate } = require("../certificationsTemplates/template_idoneidad");
const { bidTemplate } = require("../certificationsTemplates/template_bid");
const { reteIVATemplate } = require("../certificationsTemplates/template_reteiva");
const { reteICATemplate } = require("../certificationsTemplates/template_reteica");

const setPdfOptions = (name) => { 
    const options = {
        format: "Letter",
        path: `./pdfFolder/${name}`,
        printBackground: true,
    };

    return options;
};

const buildPDF = async ({ body: { data: { certificationType, destination, information, income = null }}}) => {
    const fileOptions = {
        "VINCULACION_CON_INGRESOS": {
            values: {
                society: information.Sociedad,
                identification: information.Identificacion,
                legalRepresentative: information["Representante Legal"],
                legalRepresentativeId: information["Cedula Representante"],
                date: information.Fecha,
                value: income && income["Valor Total"],
                numericValue: income && income["Valor"],
                period: income && income["Periodo Evaluado"],
                incomes: true,
                destination,
            },
            fileName: "Vinculacion_Ingresos",
        },
        "VINCULACION_SIN_INGRESOS": {
            values: {
                society: information.Sociedad,
                identification: information.Identificacion,
                legalRepresentative: information["Representante Legal"],
                legalRepresentativeId: information["Cedula Representante"],
                date: information.Fecha,
                incomes: false,
                destination,
            },
            fileName: "Vinculacion",
        },
        "IDONEIDAD": {
            values: {
                society: information.Sociedad,
                identification: information.Identificacion,
                legalRepresentative: information["Representante Legal"],
                legalRepresentativeId: information["Cedula Representante"],
                date: information.Fecha,
                untilDate: information["Fecha Vigencia"],
                destination,
            },
            fileName: "Idoneidad",
        },
        "LICITACION": {
            values: {
                society: information.Sociedad,
                identification: information.Identificacion,
                legalRepresentative: information["Representante Legal"],
                legalRepresentativeId: information["Cedula Representante"],
                date: information.Fecha,
                untilDate: information["Fecha Vigencia"],
                destination,
            },
            fileName: "Licitacion",
        },
        "RETEIVA_BIM": {
            values: {
                society: information.society,
                year: information.year,
                nit: information.nit,
                period: information.period,
                tableData: information.data && information.data.data && information.data.data,
            },
            fileName: "ReteIVA",
        },
        "RETEICA_BIM": {
            values: {
                society: information.society,
                year: information.year,
                nit: information.nit,
                period: information.period,
                tableData: information.data && information.data.data && information.data.data,
            },
            fileName: "ReteICA",
        },
    };

    const getFileName = (certificationType) => {
        return fileOptions[certificationType].fileName || "Certificado";
    };

    const renderTemplate = (certificationType) => {
        const dataToPrint = fileOptions[certificationType].values;
        const template = {
            "VINCULACION_CON_INGRESOS": () => vinculationTemplate(dataToPrint),
            "VINCULACION_SIN_INGRESOS": () => vinculationTemplate(dataToPrint),
            "IDONEIDAD": () => idoneidadTemplate(dataToPrint),
            "LICITACION": () => bidTemplate(dataToPrint),
            "RETEIVA_BIM": () => reteIVATemplate(dataToPrint),
            "RETEICA_BIM": () => reteICATemplate(dataToPrint),
        };

        return template[certificationType];
    };

    const fileToPrint = {
        content: renderTemplate(certificationType)(),
    };

    const folderName = "certificaciones";
    const fileDate = dayjs().format("YYYYMMDD");
    const fileName = `${folderName}/${getFileName(certificationType)}_${fileDate}.pdf`;
    const options = setPdfOptions(fileName);

    await html_to_pdf.generatePdf(fileToPrint, options)
        .then(async () => await console.log(`${fileName} Impreso correctamente`))
        .catch((e) => console.log(e));

    // await alternative.create(fileToPrint, options)
    //     .then(async () => await console.log(`${fileName} Impreso correctamente`))
    //     .catch((e) => console.log(e));
    
    return { fileName, status: 200 };
};

module.exports = buildPDF;
