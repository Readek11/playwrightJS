import { test } from "@playwright/test";

import { readFileSync } from "node:fs";
import { HomePage } from "../../page-objects/homePage";
import { ContactFormPage } from "../../page-objects/contactFormPage";
import { TEXT } from "../../constants";

test.describe("Contact Form", () => {
  test("Visit contact form page, fill in required fields, then submit the form", async ({
    page,
  }) => {
    const datasetPath = "./data/contact.json";

    const homePage = new HomePage(page);
    const contactPage = new ContactFormPage(page);
    const dataset = JSON.parse(readFileSync(datasetPath, "utf-8"));

    await page.goto("/");
    await homePage.clickConsentButtonIfVisible();
    await homePage.verifyTextVisibility(TEXT.TITLE);

    await homePage.visitContactPage();
    await contactPage.verifyTextVisibility(TEXT.GET_IN_TOUCH);
    await contactPage.fillInContactForm(dataset);
    await contactPage.uploadFile(datasetPath);
    await contactPage.clickSubmitButton();
    await contactPage.verifyTextVisibility(TEXT.SUBMIT_SUCCESSFULLY);
    await contactPage.clickHomeButton();
    await homePage.verifyTextVisibility(TEXT.TITLE);
  });
});
