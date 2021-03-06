const autoScroll = require("./autoScroll");

module.exports = async (page, cities, keywords) => {
  let resultsCities = [];
  await page.goto("https://www.google.com/maps/");
  //Para cada cidade, pesquisar por cada palavra chave
  for await (const city of cities) {
    //Pesquisar cidade no google maps
    await page.type("input[id='searchboxinput']", city);
    await page.keyboard.press("Enter");
    await page.waitFor(5000);
    await page.evaluate(
      () => (document.getElementById("searchboxinput").value = "")
    );
    let resultsOfCity = {
      name: city,
      keywords: [],
    };
    //Pesquisar por cada palavra chave
    for await (const keyword of keywords) {
      //Pesquisar palavra no google maps
      await page.type("input[id='searchboxinput']", keyword);
      await page.keyboard.press("Enter");
      await page.waitForNavigation();
      /*await page.evaluate(
        () => (document.getElementById("ppdPk-Ej1Yeb-LgbsSe-tJiF1e").click())
      );*/
      await page.waitForNavigation();
      await page.waitFor(10000);
      await page.evaluate(
        () => (document.getElementById("searchboxinput").value = "")
      );
      //Salvar resultado da pesquisa
      let reflinks = await page.$$(".a4gq8e-aVTXAb-haAclf-jRmmHf-hSRGPd");
      let links = [];
      for await (const reflink of reflinks) {
        links.push(await page.evaluate((auxLink) => auxLink.href, reflink));
      }
      resultsOfCity.keywords.push({
        keyword: keyword,
        links: links,
      });
    }
    resultsCities.push(resultsOfCity);
  }
  return resultsCities;
};
