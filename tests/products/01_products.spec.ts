import { test as base } from "@playwright/test";
import { readFileSync } from "node:fs";
import { useProductsPage } from "page-objects/productsPage";
import { MyFixtures } from "my-fixtures";
import { useHomePage } from "page-objects/homePage";
import { TEXT } from "constants/consts";

const test = base.extend<MyFixtures>({
  homePage: useHomePage,
  productsPage: useProductsPage,
});

test.describe("Product Page", () => {
  const datasetPath = "./data/product.json";
  const dataset = JSON.parse(readFileSync(datasetPath, "utf-8"));

  test.beforeEach(async ({ page, homePage }) => {
    await page.goto("/");
    await homePage.clickConsentButtonIfVisible();
    await homePage.verifyTextVisibility(TEXT.TITLE);
    await homePage.visitProductsPage();
  });

  test("Visit all products page, confirm visibility of product list, visit product details page, confirm details visibility", async ({
    productsPage,
  }) => {
    await productsPage.verifyTextVisibility(TEXT.PRODUCTS_TITLE);
    await productsPage.verifyAllProductsVisibility();
    await productsPage.visitProductPage(dataset.id);
    await productsPage.confirmProductDetails(dataset);
  });
  test("Visit all products page, visit product page, search for product, confirm product was found", async ({
    productsPage,
  }) => {
    await productsPage.verifyTextVisibility(TEXT.PRODUCTS_TITLE);
    await productsPage.verifyAllProductsVisibility();
    await productsPage.SearchForProduct(dataset.name);
    await productsPage.verifyTextVisibility(TEXT.SEARCHED_PRODUCTS);
    await productsPage.verifyProductWasFound(dataset.name);
  });
});
