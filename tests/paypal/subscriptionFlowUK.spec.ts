import { test, expect } from '@playwright/test';
import QBOLogin from '../QBOCommon/qboLoginAction.spec';
import PaypalConfig from './paypal.config.json';

test('test', async ({ page }) => {
    console.log("starting the test ");

    await QBOLogin(
      page,
      PaypalConfig.PROD.PayPalLogin.qbo_URL,
      PaypalConfig.PROD.PayPalLogin.qbo_user,
      PaypalConfig.PROD.PayPalLogin.qbo_password,
      PaypalConfig.PROD.UKPayPalCommerceProdLogin.companyName
      );

      console.log("click on the APPs from left navBar ");
      await page.getByRole('link', { name: 'Apps', exact: true }).click();
      console.log("click steps2");
      const appconnection = page.getByRole('button', { name: 'Accept Card Pay... Launch Expand Menu' }).click();

      console.log("APP is subscribed or not",appconnection);


      await page.getByTestId('chevron-down-icon-control').click();
      console.log("clicking the disconnect Button");
      await page.getByText('Disconnect').click();
      await page.getByLabel('I connected the app just to').check();
      const page1Promise = page.waitForEvent('popup');
      await page.getByRole('button', { name: 'Disconnect' }).click();
      const page1 = await page1Promise;
      await page.goto('https://app.qbo.intuit.com/app/appcenter/myapps');
      await page.goto('https://app.qbo.intuit.com/app/paypalcp');
  })
  