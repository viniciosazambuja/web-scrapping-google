module.exports = async (page, establishments) => {
  for await (const city of establishments) {
    console.log(city.name);
    for await (const keyword of city.keywords) {
      console.log(keyword.keyword);
      keyword.establishmentsData = [];
      for await (const link of keyword.links) {
        console.log(link);
        await page.goto(link);
        await page.waitForNavigation();
        await page.waitFor(4000);
        console.log("Page URL: ", page.url());

        keyword.establishmentsData.push({
          name: await page.evaluate(
            () =>
              document.querySelector(
                "#pane > div > div.Yr7JMd-pane-content.cYB2Ge-oHo7ed > div > div > div.x3AX1-LfntMc-header-title > div.tAiQdd > div.lMbq3e > div:nth-child(1) > h1 > span:nth-child(1)"
              )?.innerText
          ),
          site: await page.evaluate(
            () =>
              document.querySelector("[data-item-id='authority']")?.innerText
          ),
          phone: await page.evaluate(
            () =>
              document.querySelector(
                "[data-tooltip='Copiar número de telefone']"
              )?.innerText
          ),
          address: await page.evaluate(
            () => document.querySelector("[data-item-id='address']")?.innerText
          ),
          latitude: page.url().split("@")[1].split(",")[0],
          longitude: page.url().split("@")[1].split(",")[1],
        });
      }
    }
  }
  return establishments;
};
