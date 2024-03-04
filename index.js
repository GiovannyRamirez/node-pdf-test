const buildPDF = require("./controller/buildPdf");

const notIncomeVinculationData = require("./dataMocks/vinculationNotIncomes");
const incomeVinculationData = require("./dataMocks/vinculationIncomes");
const idoneidadData = require("./dataMocks/idoneidad");
const bidData = require("./dataMocks/bid");

const reteIvaData = require("./dataMocks/reteiva");
const reteIcaData = require("./dataMocks/reteica");

const buildPdfHandler = async (event, context, callback) => {
    try {
        if(!event.body) throw Error("No body");
        const response = await buildPDF({ body: event.body });

        return response;
    } catch (error) {
        console.log(error)
        const errorResponse = { code: 500, error: error.message };
        callback(JSON.stringify(errorResponse));
        return errorResponse;
    }
};

const bidEvent = { body: { data: bidData }};
const idoneidadEvent = { body: { data: idoneidadData }};
const incomeVinculationEvent = { body: { data: incomeVinculationData }};
const notIncomeVinculationEvent = { body: { data: notIncomeVinculationData }};

const reteIVAEvent = { body: { data: reteIvaData }};
const reteICAEvent = { body: { data: reteIcaData }};


buildPdfHandler(bidEvent);
buildPdfHandler(idoneidadEvent);
buildPdfHandler(incomeVinculationEvent);
buildPdfHandler(notIncomeVinculationEvent);

buildPdfHandler(reteIVAEvent);
buildPdfHandler(reteICAEvent);
