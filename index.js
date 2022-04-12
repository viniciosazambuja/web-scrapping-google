const puppeteer = require("puppeteer");
const getEstablishments = require("./src/utils/getEstablishments");

async function main() {
  console.log("Starting...");
  //Receber um array com nome das cidades
  const cities = ["São Paulo", "Belo Horizonte"];

  //Receber um array de palavras chaves
  const keywords = ["Hospital", "Indústria"];

  //Acessar o google maps
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: [],
  });
  const page = await browser.newPage();
  let establishments = await getEstablishments(page, cities, keywords);
  console.log(establishments);

  //Para cada palavra chave, salvar cada uma das opções da lista de resultados de cada página

  //Criar um objeto com as informações: Nome, Site, Telefone, Endereço, Cidade, Estado, CEP, Latitude, Longitude

  //Salvar objeto na lista de objetos

  //Criar um excel com as informações da lista de objetos
}

main();
