'use strict';

const table = {
  data: [],
  max: 0,
  setData(data) {
    this.data = data;

    return this;
  },
  splitData() {
    this.data = this.data.split('\n');

    return this;
  },
  cutTable() {
    this.data = this.data.slice(1, this.data.length - 1);

    return this;
  },
  convertToArray() {
    this.data = this.data.map(item => item.trim().split(','));

    return this;
  },
  setMax() {
    this.max = this.data.reduce((acc, item) => {
      const area = parseInt(item[3]);

      return area > acc
          ? area
          : acc;
    }, 0)

    return this;
  },
  normalizeArea() {
    this.data = this.data.map(item => {
      const area = Math.round((item[3] * 100) / this.max);

      return [...item, area.toString()];
    });

    return this;
  },
  sortTable() {
    this.data = this.data.toSorted((r1, r2) => r2[5] - r1[5]);

    return this;
  },
  getString() {
    return this.data.join('\n');
  }
}

const cityList = table
    .setData(data)
    .splitData()
    .cutTable()
    .convertToArray()
    .setMax()
    .normalizeArea()
    .sortTable()
    .getString();

console.log(cityList);
