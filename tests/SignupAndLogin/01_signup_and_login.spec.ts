import { expect, test as base } from "@playwright/test";
import { useLoginPage } from "page-objects/loginPage";
import { useHomePage } from "page-objects/homePage";
import { useSignupPage } from "page-objects/signupPage";
import { readFileSync } from "node:fs";
import { TEXT } from "constants/consts";
import { MyFixtures } from "my-fixtures";

const test = base.extend<MyFixtures>({
  loginPage: useLoginPage,
  homePage: useHomePage,
  signupPage: useSignupPage,
});

test.describe("Signup and login", () => {
  test("Test Case 01 - Register User, logout, try to register using the same email, login with incorrect credentials, login successfully then delete account", async ({
    page,
    loginPage,
    homePage,
    signupPage,
  }) => {
    const dataset = JSON.parse(readFileSync("./data/signup.json", "utf-8"));

    // Register - Test Case 1

    await page.goto("/");
    await expect(page).toHaveTitle(TEXT.TITLE);
    await homePage.clickConsentButtonIfVisible();
    await homePage.visitLoginPage();
    await loginPage.verifyTextVisibility(TEXT.NEW_USER_SIGNUP);
    await loginPage.fillInSignupNameAndEmail(dataset.name, dataset.email);
    await loginPage.clickSignupButton();
    await signupPage.fillAccountDetails(dataset);
    await signupPage.clickCreateAccountButton();
    await signupPage.verifyTextVisibility(TEXT.ACCOUNT_CREATED);
    await signupPage.clickContinueButton();
    await signupPage.verifyTextVisibility(`Logged in as ${dataset.name}`);

    // Logout - Test Case 4
    await homePage.clickLogoutButton();

    // Register with existing email - Test Case 5
    await homePage.visitLoginPage();
    await loginPage.fillInSignupNameAndEmail(dataset.name, dataset.email);
    await loginPage.verifyTextVisibility(TEXT.EMAIL_EXISTS);

    // Login with incorrect credentials - Test Case 3
    await homePage.visitLoginPage();
    await loginPage.verifyTextVisibility(TEXT.LOGIN);
    await loginPage.fillInLoginCredentials(
      dataset.email,
      dataset.incorrectPassword,
    );
    await loginPage.clickLoginButton();
    await loginPage.verifyTextVisibility(TEXT.INCORRECT_CREDENTIALS);

    // Login with correct credentials - Test Case 2
    await loginPage.fillInLoginCredentials(dataset.email, dataset.password);
    await loginPage.clickLoginButton();

    // Delete account
    await homePage.clickDeleteAccountButton();
    await homePage.verifyTextVisibility(TEXT.ACCOUNT_DELETED);
    await signupPage.clickContinueButton();
    await expect(page).toHaveTitle(TEXT.TITLE);
  });
});
