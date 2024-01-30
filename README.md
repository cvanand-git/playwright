
#Playwright Automation test Framework : 

Configuration :

1. Install Xcode Command Line Tools.    xcode-select --install
2. brew.      /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)”.     //to install yarn
3. Yarn.      brew install yarn             //dependency mgt.
4. Node Version Manager (NVM).    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
5. Node.      nvm install lts/fermium
6. Intuit NPM Registry (Artifactory).    npm config set registry https://registry.npmjs.intuit.com/
7. npx.         npx playwright install  

Commands :

1. yarn install.       (First command)
2. npx playwright test subscriptionFlowUK.spec.ts          //To run the test files
3. npx playwright codegen https://app.qbo.intuit.com     //To access the codegen

page.waitForSelector('yourselector')
page.waitForLoadState('domcontentloaded')
await page.waitForTimeout(5000);
page.waitForEvent('popup');
await page1.waitForURL('https://app.qbo.intuit.com/app/mandates');


import { test, expect } from '@playwright/test';
import QBOLogin from '../QBOCommon/qboLoginAction.spec';
import GoCardlessConfig from './goCardless.config.json';


test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
 ……………………………………………..
 …………………………………
 }
);


async function QBOLogin(page: Page ,qbo_URL: string,username: string,password: string, companyname = “”){.   ……….}

console.log("Navigate QBO URL: ", qbo_URL);

await page1.waitForURL('https://app.qbo.intuit.com/app/mandates');
await page1.goto('https://app.qbo.intuit.com/app/homepage');

await page1.getByRole('button', { name: 'Connect' }).click();
await page1.getByRole('link', { name: 'Apps', exact: true }).click();
await page1.getByText('Disconnect').click();

const page2Promise = page1.waitForEvent('popup');
const page2 = await page2Promise;

