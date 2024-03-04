const { transformValue, getTotalValue } = require("../utils/calculations");
const { witholdingTemplate } = require("./template_witholdings");

const getReteIVATemplate = ({ society, nit, period, year, tableData }) => {
    const type = "DE IVA";
    const collectingEntity = "DIRECCIÓN DE IMPUESTOS Y ADUANAS NACIONALES DIAN";

    const HEADING_COLUMNS = ["CONCEPTO", "CIUDAD CONSIGNADA", "BASE", "IVA", "TARIFA", "RETENCIÓN"];
    const tableHeaders = HEADING_COLUMNS.map(col => {
        const tableHead = 
            `<th>
                ${col}
            </th>
            `;
        
        return tableHead;
    });

    const tableInfo = tableData.map(info => {
        const concept = info["CONCEPTO_RETENCION"].trim().toUpperCase();
        const city = info["CIUDAD"].trim().toUpperCase();
        const baseValue = Number(info["VLR_BASE"].trim());
        const baseValueToPrint = transformValue(baseValue, "$");
        const ivaValue = Number(info["IVA"].trim());
        const ivaValueToPrint = transformValue(ivaValue, "$");
        const taxValue = Number(info["TARIFA"].trim());
        const taxValueToPrint = transformValue(taxValue, "%");
        const witholdingValue = Number(info["RETENCIONIVA"].trim());
        const witholdingValueToPrint = transformValue(witholdingValue, "$");

        const data = 
            `<tr>
                <td style="width: 17%;">${concept}</td>
                <td style="width: 17%;">${city}</td>
                <td>${baseValueToPrint}</td>
                <td>${ivaValueToPrint}</td>
                <td>${taxValueToPrint}</td>
                <td>${witholdingValueToPrint}</td>
            </tr>
            `;

        return data;
    });

    const totalBaseValue = getTotalValue(tableData, "VLR_BASE");
    const totalWitholdingValue = getTotalValue(tableData, "RETENCIONIVA");

    const tableFooter =
        `<tr>
            <td>TOTAL:</td>
            <td></td>
            <td>${totalBaseValue}</td>
            <td></td>
            <td></td>
            <td>${totalWitholdingValue}</td>
        </tr>
        `;
   
    const tableContent =
        `<table>
            <tr>
                ${tableHeaders}
            </tr>
            ${tableInfo}
            ${tableFooter}
        </table>
        `;
    
    const templateToPrint = witholdingTemplate({ society, nit, period, year, type, collectingEntity, tableContent });
    return templateToPrint;
};

module.exports = {
    reteIVATemplate: getReteIVATemplate,
};
