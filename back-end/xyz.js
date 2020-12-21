const puppeteer = require("puppeteer");

(async () => {
  const browser = puppeteer.launch({
    headless: false,
  });
  const page = (await browser).newPage();
  (
    await page
  ).goto(
    "https://kctc.kribb.re.kr/EN/search/resourceSearchResult?pageNumber=1&searchKeyword=&category=&selectAll=false&dna=false&typeStrain=false&engOpen=yes&protect=N",
    { waitUntil: "load", timeout: 0 }
  );

  (await page).type("#searchKeyword","Bacillus");
  await Promise.all([
    (await page).click("#searchKeyword + a"),
    (await page).waitForNavigation({
        waitUntil:"networkidle0"
    }),
  ]);
  
//   (await page).evaluate(()=>{
    
//     document.querySelector("#searchKeyword").nextElementSibling().click();
//   });
//   (await page).waitForNavigation();
  console.log((await page).content);
})();
