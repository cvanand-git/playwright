import { test, expect } from '@playwright/test';
import QBOLogin from '../QBOCommon/qboLoginAction.spec';
import GoCardlessConfig from './goCardless.config.json';

test('test', async ({ page }) => {
    console.log("starting the goCardless mandates test");
    
    await QBOLogin(
      page,
      GoCardlessConfig.E2E.GoCardlessMandates.qbo_URL,
      GoCardlessConfig.E2E.GoCardlessMandates.qbo_user,
      GoCardlessConfig.E2E.GoCardlessMandates.qbo_password,
      GoCardlessConfig.E2E.GoCardlessMandates.companyName
      );

      console.log("redirecting to invoice page");
      await page.goto('https://app.e2e.qbo.intuit.com/app/invoice');

      console.log("select customer");
      await page.getByRole('combobox', { name: 'Select a customer' }).click();

      await page.getByRole('option', { name: 'add new item' }).click();

      const randomSuffix =  Math.random().toString().substring(2,9);

      console.log("enter customer display name");
      await page.getByTestId('contact-drawer-display-name__textField').click();
      await page.getByTestId('contact-drawer-display-name__textField').fill('companyName' + randomSuffix);

      console.log("enter company name");
      await page.getByLabel('Company name').click();
      await page.getByLabel('Company name').fill('companyName' + randomSuffix);

      console.log("enter email");
      await page.getByLabel('Email', { exact: true }).click();
      await page.getByLabel('Email', { exact: true }).fill(GoCardlessConfig.E2E.GoCardlessMandates.customer_email);

      console.log("save");
      await page.getByRole('region').filter({ hasText: 'CustomerCurrencyName and contactTitleFirst nameMiddle nameLast nameSuffixCompany' }).getByRole('button', { name: 'Save' }).click();

      console.log("Ask customer to use Direct Debit");
      await page.locator('#uniqName_92_0').getByText('Ask customer to use Direct Debit').click();

      console.log("send");
      await page.getByRole('button', { name: 'Send', exact: true }).click();

      console.log("waiting for few min...");
      await page.waitForTimeout(200000);
     
      console.log("redirecting to mailinator.com");
      await page.goto('https://www.mailinator.com/site/the-essential-mailinator-guide/');
      
      console.log("waiting for few min...");
      await page.waitForTimeout(200000);

      console.log("search the email");
      await page.getByRole('textbox', { name: 'Enter public inbox' }).click();
      await page.getByRole('textbox', { name: 'Enter public inbox' }).fill(GoCardlessConfig.E2E.GoCardlessMandates.customer_email);
      await page.getByRole('button', { name: 'GO' }).click();

      await page.waitForTimeout(10000);

      await page.click('[id^="row_gocardlesstest01"]')[0];

      await page.waitForTimeout(10000);

      console.log('Set up Direct Debit');
      const page2Promise = page.waitForEvent('popup');
      await page.frameLocator('iframe[name="html_msg_body"]').getByRole('link', { name: 'Set up Direct Debit' }).click();
      const page2 = await page2Promise;

      console.log('enter first name');
      await page2.getByLabel('First name').click();
      await page2.getByLabel('First name').fill('firstName');

      console.log('enter last name');
      await page2.getByLabel('Last name').click();
      await page2.getByLabel('Last name').fill('lastName');

      console.log('enter email');
      await page2.getByLabel('Email address').click();
      await page2.getByLabel('Email address').fill(GoCardlessConfig.E2E.GoCardlessMandates.customer_email);

      console.log('enter address');
      await page2.getByPlaceholder('Start typing your postcode and select').click();
      await page2.getByPlaceholder('Start typing your postcode and select').fill('Stowe Road');
      await page2.getByText('Stowe RoadOrpington, BR6 - 62 Addresses').click();
      await page2.getByText('1 Stowe RoadOrpington, BR6 9HG', { exact: true }).click();

      console.log('continue');
      await page2.getByRole('button', { name: 'Continue' }).click();


      console.log('enter branch_code');
      await page2.getByTestId('branch_code').click();
      await page2.getByTestId('branch_code').fill('200000');

      console.log('enter account number');
      await page2.getByTestId('account_number').click();
      await page2.getByTestId('account_number').fill('55779911');

      console.log('continue');
      await page2.getByRole('button', { name: 'Continue' }).click();
      await page2.getByTestId('billing-request.bank-confirm.direct-debit-cta-button').click();

      await page.waitForTimeout(10000);
      console.log("goCardless mandates test successful");
  })