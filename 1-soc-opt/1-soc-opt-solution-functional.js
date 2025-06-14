'use strict';

const data = `city,population,area,density,country
  Shanghai,24256800,6340,3826,China
  Delhi,16787941,1484,11313,India
  Lagos,16060303,1171,13712,Nigeria
  Istanbul,14160467,5461,2593,Turkey
  Tokyo,13513734,2191,6168,Japan
  Sao Paulo,12038175,1521,7914,Brazil
  Mexico City,8874724,1486,5974,Mexico
  London,8673713,1572,5431,United Kingdom
  New York City,8537673,784,10892,United States
  Bangkok,8280925,1569,5279,Thailand`;
const AREA_INDEX = 3;
const DENSITY_INDEX = 5;
const SCHEMA = {
    0: { align: 'left', length: 18 },
    1: { align: 'right', length: 10 },
    2: { align: 'right', length: 8 },
    3: { align: 'right', length: 8 },
    4: { align: 'right', length: 18 },
    5: { align: 'right', length: 6 }
};

const extractDataRows = (data) => data
    .split('\n')
    .slice(1)
    .map(item => item.trim().split(','));

const addPercentageColumn = (data, columnNumber) => {
    const maxArea = data.reduce((acc, item) => {
        const area = parseInt(item[columnNumber]);

        return area > acc ? area : acc;
    }, 0);

    return data.map(item => {
        const area = Math.round((item[columnNumber] * 100) / maxArea);

        return [...item, area.toString()];
    })
}

const sortTable = (data, columnIndex) => data.toSorted((r1, r2) => r2[columnIndex] - r1[columnIndex]);

const alignCell = (data, {align, length}) => {
    const config = {
        left: 'padEnd',
        right: 'padStart'
    }

    return data[config[align]](length);
}

const rowFormatter = (data, schema) => {
    return data.reduce((acc, item, i) => {
        const elementSettings = schema[i];
        const element = alignCell(item, elementSettings);

        return acc + element;
    }, '')
};

const formatDataVisualisation = (data) => {
    return data.map((row) => {
        return rowFormatter(row, SCHEMA);
    });
}

const displayCityStatistics = data => {
    data.forEach((row) => {
        console.log(row);
    });
};

const dataArray = extractDataRows(data);
const updatedStatistics = addPercentageColumn(dataArray, AREA_INDEX);
const sortedData = sortTable(updatedStatistics, DENSITY_INDEX);
const formatedData = formatDataVisualisation(sortedData);

displayCityStatistics(formatedData);
