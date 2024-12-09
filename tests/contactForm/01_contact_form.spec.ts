import { test as base } from "@playwright/test";
import { MyFixtures } from "my-fixtures";

import { readFileSync } from "node:fs";
import { useHomePage } from "page-objects/homePage";
import { useContactFormPage } from "page-objects/contactFormPage";
import { TEXT } from "constants/consts";

const test = base.extend<MyFixtures>({
  contactFormPage: useContactFormPage,
  homePage: useHomePage,
});

test.describe("Contact Form", () => {
  test("Visit contact form page, fill in required fields, then submit the form", async ({
    page,
    contactFormPage,
    homePage,
  }) => {
    const datasetPath = "./data/contact.json";

    const dataset = JSON.parse(readFileSync(datasetPath, "utf-8"));

    await page.goto("/");
    await homePage.clickConsentButtonIfVisible();
    await homePage.verifyTextVisibility(TEXT.TITLE);

    await homePage.visitContactPage();
    await contactFormPage.verifyTextVisibility(TEXT.GET_IN_TOUCH);
    await contactFormPage.fillInContactForm(dataset);
    await contactFormPage.uploadFile(datasetPath);
    await contactFormPage.clickSubmitButton();
    await contactFormPage.verifyTextVisibility(TEXT.SUBMIT_SUCCESSFULLY);
    await contactFormPage.clickHomeButton();
    await homePage.verifyTextVisibility(TEXT.TITLE);
  });
});
