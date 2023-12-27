import { test, expect } from '@playwright/test';
import QBOLogin from '../QBOCommon/qboLoginAction.spec';
import GoCardlessConfig from './goCardless.config.json';

test('test', async ({ page }) => {
    console.log("starting the GoCardless Subscription test ");

    await QBOLogin(
      page,
      GoCardlessConfig.PROD.GoCardlessSubscription.qbo_URL,
      GoCardlessConfig.PROD.GoCardlessSubscription.qbo_user,
      GoCardlessConfig.PROD.GoCardlessSubscription.qbo_password,
      GoCardlessConfig.PROD.GoCardlessSubscription.companyName
      );

      console.log("click on Apps");
      await page.getByRole('link', { name: 'Apps', exact: true }).click();

      console.log("click on Find apps");
      await page.getByRole('link', { name: 'Find apps' }).click();

      await page.getByTestId('__textField').click();

      console.log("type gocardless in textfield");
      await page.getByTestId('__textField').fill('gocardless');

      console.log("select - GoCardless for QuickBooks");
      await page.getByRole('menuitem', { name: 'GoCardless for QuickBooks Collect Direct Debit payments the easy way Rated 3.5 out of 5 stars' }).click();

      const page1Promise = page.waitForEvent('popup');

      console.log("click on - Get app now");
      await page.getByRole('button', { name: 'Get app now' }).click();

      const page1 = await page1Promise;

      console.log("click on Connect");
      await page1.getByRole('button', { name: 'Connect', exact: true }).click();

      console.log("click on Sign In");
      await page1.getByRole('link', { name: 'Sign In' }).click();

      await page1.getByPlaceholder('email@example.com').click();

      console.log("enter email: ", GoCardlessConfig.PROD.GoCardlessSubscription.goCardlessUser);
      await page1.getByPlaceholder('email@example.com').fill(GoCardlessConfig.PROD.GoCardlessSubscription.goCardlessUser);
  
      await page1.getByLabel('Password').click();

      console.log("enter password: ", GoCardlessConfig.PROD.GoCardlessSubscription.goCardlessPassword );
      await page1.getByLabel('Password').fill(GoCardlessConfig.PROD.GoCardlessSubscription.goCardlessPassword);

      console.log("click on terms and conditions");
      await page1.getByTestId('terms_and_conditions').locator('svg').click();
      
      console.log("click on Connect Account");
      await page1.getByRole('button', { name: 'Connect Account' }).click();

      console.log("click on Ok");
      await page1.getByRole('button', { name: 'Ok, let\'s go' }).click();

      console.log("select bank account");
      await page1.getByRole('combobox', { name: 'Bank account where GoCardless deposits money *' }).selectOption('128');

      console.log("click on Next");
      await page1.getByRole('button', { name: 'Next' }).click();

      console.log("click on Connect");
      await page1.getByRole('button', { name: 'Connect' }).click();
      
      await page1.waitForURL('https://app.qbo.intuit.com/app/mandates');

      console.log("GoCardless subscription completed");
      console.log("redirecting to homePage...");
      await page1.goto('https://app.qbo.intuit.com/app/homepage');

      console.log("click on Apps");
      await page1.getByRole('link', { name: 'Apps', exact: true }).click();

      console.log("click on overview");
      await page1.getByRole('link', { name: 'Overview' }).click();

      await page1.getByTestId('chevron-down-icon-control').click();

      console.log("click on Disconnect");
      await page1.getByText('Disconnect').click();

      console.log("select one reason");
      await page1.getByLabel('I connected the app just to try it out').check();

      const page2Promise = page1.waitForEvent('popup');

      console.log("GoCardless app disconnected from Qbo");
      await page1.getByRole('button', { name: 'Disconnect' }).click();

      const page2 = await page2Promise;

      await page1.goto('https://app.qbo.intuit.com/app/homepage');

      console.log("GoCardless Subscription test successful");
  })