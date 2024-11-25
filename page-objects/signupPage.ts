import { Locator, Page } from "@playwright/test";
import { AccountDetails } from "../models";
import { CommonPage } from "./commonPage";

export class SignupPage extends CommonPage {
  private readonly testId = {
    name: "name",
    email: "email",
    password: "password",
    days: "days",
    months: "months",
    years: "years",
    firstName: "first_name",
    lastName: "last_name",
    company: "company",
    address: "address",
    address2: "address2",
    country: "country",
    state: "state",
    city: "city",
    zipcode: "zipcode",
    mobile_number: "mobile_number",
    createAccount: "create-account",
    continue: "continue-button",
  };

  constructor(page: Page) {
    super(page);
  }

  getMrRadio(): Locator {
    return this.page.getByRole("radio", { name: "Mr." });
  }

  getMrsRadio(): Locator {
    return this.page.getByRole("radio", { name: "Mrs." });
  }

  private getNameInput(): Locator {
    return this.page.getByTestId(this.testId.name);
  }

  private getPasswordInput(): Locator {
    return this.page.getByTestId(this.testId.password);
  }

  private getDaysInput(): Locator {
    return this.page.getByTestId(this.testId.days);
  }

  private getMonthsInput(): Locator {
    return this.page.getByTestId(this.testId.months);
  }

  private getYearsInput(): Locator {
    return this.page.getByTestId(this.testId.years);
  }

  private getNewsletterCheckbox(): Locator {
    return this.page.getByRole("checkbox", { name: "newsletter" });
  }

  private getOptinCheckbox(): Locator {
    return this.page.getByRole("checkbox", {
      name: "Receive special offers from our partners!",
    });
  }

  private getFirstNameInput(): Locator {
    return this.page.getByTestId(this.testId.firstName);
  }

  private getLastNameInput(): Locator {
    return this.page.getByTestId(this.testId.lastName);
  }

  private getCompanyInput(): Locator {
    return this.page.getByTestId(this.testId.company);
  }

  private getAddressInput(): Locator {
    return this.page.getByTestId(this.testId.address);
  }

  private getAddress2Input(): Locator {
    return this.page.getByTestId(this.testId.address2);
  }

  private getCountryInput(): Locator {
    return this.page.getByTestId(this.testId.country);
  }

  private getStateInput(): Locator {
    return this.page.getByTestId(this.testId.state);
  }

  private getCityInput(): Locator {
    return this.page.getByTestId(this.testId.city);
  }

  private getZipcodeInput(): Locator {
    return this.page.getByTestId(this.testId.zipcode);
  }

  private getMobileNumberInput(): Locator {
    return this.page.getByTestId(this.testId.mobile_number);
  }

  private getCreateAccountButton(): Locator {
    return this.page.getByTestId(this.testId.createAccount);
  }

  private getContinueButton(): Locator {
    return this.page.getByTestId(this.testId.continue);
  }

  public async checkMrRadio() {
    await this.getMrRadio().check();
  }

  public async checkMrsRadio() {
    await this.getMrsRadio().check();
  }

  public async clickCreateAccountButton() {
    await this.getCreateAccountButton().click();
  }

  public async clickContinueButton() {
    await this.getContinueButton().click();
  }

  public async fillAccountDetails(data: AccountDetails) {
    if (data.gender === "female") {
      await this.checkMrsRadio();
    } else {
      await this.checkMrRadio();
    }
    await this.getNameInput().fill(data.name);
    await this.getPasswordInput().fill(data.password);
    await this.getDaysInput().selectOption(data.birthDate.day);
    await this.getMonthsInput().selectOption(data.birthDate.month);
    await this.getYearsInput().selectOption(data.birthDate.year);
    await this.getNewsletterCheckbox().check();
    await this.getOptinCheckbox().check();
    await this.getFirstNameInput().fill(data.firstName);
    await this.getLastNameInput().fill(data.lastName);
    await this.getCompanyInput().fill(data.company);
    await this.getAddressInput().fill(data.address);
    await this.getAddress2Input().fill(data.address2);
    await this.getCountryInput().selectOption(data.country);
    await this.getStateInput().fill(data.state);
    await this.getCityInput().fill(data.city);
    await this.getZipcodeInput().fill(data.zipcode);
    await this.getMobileNumberInput().fill(data.mobileNumber);
  }
}
