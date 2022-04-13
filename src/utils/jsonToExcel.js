const xlsx = require("json2xls");
const fs = require("fs");

module.exports = async (cities) => {
  let results = [];
  for await (const city of cities) {
    for await (const keyword of city.keywords) {
      for await (const establishment of keyword.establishmentsData) {
        results.push({
          city: city.name,
          keyword: keyword.keyword,
          name: establishment.name,
          site: establishment.site,
          phone: establishment.phone,
          address: establishment.address,
          latitude: establishment.latitude,
          longitude: establishment.longitude,
          link: establishment.link
        });
      }
    }
  }

  let sheet = xlsx(results);
  console.log(results)
  fs.writeFileSync("results.xlsx", sheet, "binary");
  fs.writeFileSync("src/results/results.xlsx", sheet, "binary");

};
