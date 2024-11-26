import { expect, test } from "@playwright/test";
import { LoginPage } from "../../page-objects/loginPage";
import { HomePage } from "../../page-objects/homePage";
import { SignupPage } from "../../page-objects/signupPage";
import { readFileSync } from "node:fs";
import { TEXT } from "../../constants";

test.describe("Signup", () => {
  test("Test Case 01 - Register User", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const signupPage = new SignupPage(page);

    const dataset = JSON.parse(readFileSync("./signup.json", "utf-8"));

    await page.goto("/");
    await expect(page).toHaveTitle(TEXT.TITLE);
    await homePage.clickConsentButtonIfVisible();
    await homePage.visitSignUpLoginPage();
    await loginPage.verifyTextVisibility(TEXT.NEW_USER_SIGNUP);
    await loginPage.fillInNameAndEmail(dataset);
    await loginPage.clickSignupButton();
    await signupPage.fillAccountDetails(dataset);
    await signupPage.clickCreateAccountButton();
    await signupPage.verifyTextVisibility(TEXT.ACCOUNT_CREATED);
    await signupPage.clickContinueButton();
    await expect(page.getByText(`Logged in as ${dataset.name}`)).toBeVisible();
    await homePage.clickDeleteAccountButton();
    await homePage.verifyTextVisibility(TEXT.ACCOUNT_DELETED);
    await signupPage.clickContinueButton();
    await expect(page).toHaveTitle(TEXT.TITLE);
  });
});
