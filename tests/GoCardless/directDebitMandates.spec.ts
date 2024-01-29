import { test, expect } from '@playwright/test';
import QBOLogin from '../QBOCommon/qboLoginAction.spec';
import GoCardlessConfig from './goCardless.config.json';

test('test', async ({ page }) => {
    console.log("starting the direct debit mandates test ");

    await QBOLogin(
      page,
      GoCardlessConfig.E2E.GoCardlessMandates.qbo_URL,
      GoCardlessConfig.E2E.GoCardlessMandates.qbo_user,
      GoCardlessConfig.E2E.GoCardlessMandates.qbo_password,
      GoCardlessConfig.E2E.GoCardlessMandates.companyName
      );

      console.log("click : settings logo");
      await page.getByRole('button', { name: 'Settings' }).click();

      console.log("click : All lists");
      await page.getByRole('link', { name: 'All lists' }).click();

      console.log("click : Direct Debit Mandates");
      await page.getByRole('link', { name: 'Direct Debit Mandates' }).click();
      
      console.log("direct debit mandates test is also successful");

  })