const puppeteer = require("puppeteer");
const getEstablishments = require("./src/utils/getEstablishments");
const getInformationOfEstablishments = require("./src/utils/getInformationOfEstablishments");
const jsonToExcel = require("./src/utils/jsonToExcel");

async function main() {
  console.log("Starting...");
  //Receber um array com nome das cidades
  const citiesNames = ["Curitiba", "São Paulo", "Rio de Janeiro"];

  //Receber um array de palavras chaves
  const keywords = ["Hospital", "Clínica", "Consultório"];

  //Acessar o google maps
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: [],
  });
  const page = await browser.newPage();
  let establishments = await getEstablishments(page, citiesNames, keywords);
  //Criar um objeto com as informações: Nome, Site, Telefone, Endereço, Cidade, Estado, CEP, Latitude, Longitude
  let cities = await getInformationOfEstablishments(page, establishments);
  //console.log(cities);
  await jsonToExcel(cities);
  //Salvar objeto na lista de objetos
    //Salvar lista de objetos em um arquivo .xlsx
  //Criar um excel com as informações da lista de objetos
}

main();
