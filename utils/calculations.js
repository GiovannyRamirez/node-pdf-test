const transformValue = (value, sign) => {
    const amount = new Intl.NumberFormat().format(value);
    return `${sign} ${amount}`;
};

const getTotalValue = (data, key) => {
    const totalValue = data.reduce((prev, curr) => prev + Number(curr[key]), 0);

    const valueTransformed = transformValue(totalValue, "$");
    return valueTransformed;
};

module.exports = {
    getTotalValue,
    transformValue,
};
