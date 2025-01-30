import { Given, When, Then } from '@cucumber/cucumber';
import { chromium } from "@playwright/test";

let browser, page;

Given('I navigate to {string}', async function (url) { 

  browser = await chromium.launch({
    headless: false, 
    args: ["--start-maximized"], 
  });

  const context = await browser.newContext({
    viewport: null,
  });

  page = await context.newPage();
  await page.goto(url, { timeout: 60000 }); 
  await page.waitForLoadState("domcontentloaded"); 
});

When('I click on the "All" link text on the left side of the homepage', async function () {
  await page.locator('//*[@id="nav-hamburger-menu"]/i').waitFor({ state: 'visible' }); 
  await page.locator('//*[@id="nav-hamburger-menu"]/i').click(); 
});

When('I click on "Electronics & Computers" under the All categories section', async function () {
  
  await page.getByRole('link', { name: 'Electronics & Computers' }).click();

});

  When('I click on "Phones & Accessories"', async function () {
    await page.getByRole('link', { name: 'Phones & Accessories' }).nth(1).click();

  });
  When('I apply filters for {string} brand, {string} condition, and price range {string}', async function (brand, condition, priceRange) {
    await page.getByLabel(Samsung).check();
    await page.waitForTimeout(2000);
    await page.getByLabel(Samsung).check();
    await page.waitForTimeout(2000);
  
    const slider = await page.locator('input[type="range"]');
    const box = await slider.boundingBox();

if (box) {
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + (box.width * (150 / 300)), box.y + box.height / 2);
  await page.mouse.up();
}

  });
  
  Then('I verify that the displayed mobile phones match the applied filters', async function () {
    const products = await page.$$('.s-main-slot .s-result-item');
    
    for (let product of products.slice(0, 5)) { 
      const text = await product.textContent();
      
      
      if (!text.includes('Samsung')) {
        throw new Error(`Non-Samsung product found: ${text}`);
      }
      
      const priceElement = await product.$('.a-price-whole');
      if (priceElement) {
        const priceText = await priceElement.innerText();
        const price = parseInt(priceText.replace(/[^\d]/g, ''));
        if (price < 100 || price > 350) {
          throw new Error(`Price out of range: ${price}`);
        }
      }
    }
  
    await page.close();
    await browser.close();
  });

