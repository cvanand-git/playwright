import { test, expect } from '@playwright/test';
import QBOLogin from '../QBOCommon/qboLoginAction.spec';
import GoCardlessConfig from './goCardless.config.json';
import date from 'date-and-time';

test('test', async ({ page }) => {
    console.log("starting the goCardless Multicurrency test ");

    await QBOLogin(
      page,
      GoCardlessConfig.E2E.GoCardlessMulticurrency.qbo_URL,
      GoCardlessConfig.E2E.GoCardlessMulticurrency.qbo_user,
      GoCardlessConfig.E2E.GoCardlessMulticurrency.qbo_password,
      GoCardlessConfig.E2E.GoCardlessMulticurrency.companyName
      );

      console.log("goto settings");
      await page.getByRole('button', { name: 'Settings' , exact: true}).click();

      console.log("goto All lists");
      await page.getByRole('link', { name: 'All lists' }).click();

      console.log("goto Direct Debit Mandates");
      await page.getByRole('link', { name: 'Direct Debit Mandates' }).click();

      console.log("redirecting to invoice page");
      await page.goto('https://app.e2e.qbo.intuit.com/app/invoice');

      console.log("select customer");
      await page.getByRole('combobox', { name: 'Select a customer' }).click();
      await page.getByText('AUD Customer').click();
       
      await page.waitForTimeout(10000);

      console.log("use direct debit");
      await page.locator('#gcInvoiceDD').check();

      await page.waitForTimeout(10000);

      await page.click('[data-qbo-bind="value:exchangeRate, visible:!isReadOnly"]');
      await page.fill('[data-qbo-bind="value:exchangeRate, visible:!isReadOnly"]', '0.56034');
      
      await page.waitForTimeout(10000);

      const now = new Date();
      const AddDays = date.addDays(now, 3);
      const startFormatted = date.format(AddDays, 'DD/MM/YYYY');

      console.log("select due date");
      await page.click('[data-qbo-bind="value: dueDate"]');
      await page.fill('[data-qbo-bind="value: dueDate"]', startFormatted);

      await page.waitForTimeout(10000);

     console.log("select product/service"); 
     await page.locator("xpath=/html/body/div[2]/div/div/div[2]/div/div/div[1]/div/div/div[1]/div[1]/div[6]/div[2]/div/div[2]/div[3]/div[7]/div/div[5]/div[1]/div[1]/div[2]/div/div[2]/table/tr/td[3]").click();
      
     await page.locator("xpath=/html/body/div[2]/div/div/div[2]/div/div/div[1]/div/div/div[1]/div[1]/div[6]/div[2]/div/div[2]/div[3]/div[7]/div/div[5]/div[1]/div[2]/div[4]/div/div/div/label/div/input").click(); 

     await page.getByText('GoCardless Refunds/Chargebacks Item').click();

     await page.getByTestId('acceptAll').click();

     console.log("click save"); 
     await page.getByRole('button', { name: 'Save', exact: true }).click();
     await page.waitForTimeout(10000); 

     
     console.log("again redirecting to invoice page..................................................................."); 
     await page.goto('https://app.e2e.qbo.intuit.com/app/invoice');

      console.log("select customer");
      await page.getByRole('combobox', { name: 'Select a customer' }).click();
      await page.getByText('Test UnitedStates').click();
       
      await page.waitForTimeout(10000);

      console.log("use direct debit");
      await page.locator('#gcInvoiceDD').check();

      await page.waitForTimeout(10000);

      await page.click('[data-qbo-bind="value:exchangeRate, visible:!isReadOnly"]');
      await page.fill('[data-qbo-bind="value:exchangeRate, visible:!isReadOnly"]', '0.56034');
      
      await page.waitForTimeout(10000);

      console.log("select due date");
      await page.click('[data-qbo-bind="value: dueDate"]');
      await page.fill('[data-qbo-bind="value: dueDate"]', startFormatted);

      await page.waitForTimeout(10000);

     console.log("select product/service"); 
     await page.locator("xpath=/html/body/div[2]/div/div/div[2]/div/div/div[1]/div/div/div[1]/div[1]/div[6]/div[2]/div/div[2]/div[3]/div[7]/div/div[5]/div[1]/div[1]/div[2]/div/div[2]/table/tr/td[3]").click();
      
     await page.locator("xpath=/html/body/div[2]/div/div/div[2]/div/div/div[1]/div/div/div[1]/div[1]/div[6]/div[2]/div/div[2]/div[3]/div[7]/div/div[5]/div[1]/div[2]/div[4]/div/div/div/label/div/input").click(); 

     await page.getByText('GoCardless Refunds/Chargebacks Item').click();

     console.log("click save"); 
     await page.getByRole('button', { name: 'Save', exact: true }).click(); 
     
     await page.waitForTimeout(10000);

     console.log("redirecting to invoices"); 

     await page.goto('https://app.e2e.qbo.intuit.com/app/invoices');

     await page.getByRole('cell', { name: 'No.' }).click();

     console.log("click edit"); 
     await page.locator("xpath=/html/body/div[2]/div/div/div[1]/div[2]/div[3]/div[4]/section[2]/section/div[2]/table/tbody/tr[3]/td[7]/span/button/span/strong").click();
     
     await page.waitForTimeout(20000);

     await page.locator("xpath=/html/body/div[2]/div/div/div[2]/div/div/div[1]/div/div/div[1]/div[1]/div[4]/div[7]/div/div[2]/div[1]/div[1]").click();

     console.log("Receive Payment"); 
     await page.locator("xpath=//*[contains(@href,'app/recvpayment?txnId')]").click();

     await page.waitForTimeout(10000);

     console.log("Bank Deposit"); 
     await page.locator("xpath=//*[contains(@href,'app/deposit?txnId')]").click();

     await page.waitForTimeout(10000);

     console.log("again redirecting to invoices"); 

     await page.goto('https://app.e2e.qbo.intuit.com/app/invoices');

     console.log("click edit"); 
     await page.locator("xpath=/html/body/div[2]/div/div/div[1]/div[2]/div[3]/div[4]/section[2]/section/div[2]/table/tbody/tr[4]/td[7]/span/button/span/strong").click();
     
     await page.waitForTimeout(20000);

     await page.locator("xpath=/html/body/div[2]/div/div/div[2]/div/div/div[1]/div/div/div[1]/div[1]/div[4]/div[7]/div/div[2]/div[1]/div[1]").click();

     console.log("Receive Payment"); 
     await page.locator("xpath=//*[contains(@href,'app/recvpayment?txnId')]").click();

     await page.waitForTimeout(10000);

     console.log("Bank Deposit"); 
     await page.locator("xpath=//*[contains(@href,'app/deposit?txnId')]").click();

     await page.waitForTimeout(10000);

     console.log("goCardless Multicurrency test is successful");

  })