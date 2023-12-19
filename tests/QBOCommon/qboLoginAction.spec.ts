  
  
  
import {Page, expect } from '@playwright/test';
import QBOConfig from './qbo.config.json';

async function QBOLogin(page: Page ,username: string,password: string, companyname = ""){
  //Login QBO account flow
  await page.goto(QBOConfig.PROD.QBO_URL);
  console.log("Navigate QBO URL: ", QBOConfig.PROD.QBO_URL);
  await page.getByTestId('IdentifierFirstInternationalUserIdInput').fill(username);
  await page.getByTestId('IdentifierFirstSubmitButton').click();
  console.log("Enter user name: ",username);
  await page.getByTestId('currentPasswordInput').fill(password);
  await page.getByTestId('passwordVerificationContinueButton').click();
  console.log("Enter password: ",password);
  try{
    await page.getByTestId('VUUSkipButton').click({timeout:10000})
    console.log('skip for now page is visible')
  } catch(e){
    console.log('skip for now page is not visible more than 10 seconds')
  }
  //select company
  if(companyname){
    await page.fill(QBOConfig.PROD.search_company_xpath, companyname);
    await page.click(QBOConfig.PROD.account_name_xpath);
    console.log("Chosse company: ",companyname);
  }else{
    console.log("There is no company with the name provided: ",companyname);
  }
  //wait for qbo landing page to load
  await page.getByRole('link', { name: QBOConfig.PROD.QBO_LandingPage }).hover();
  console.log('wait for landing page')
}

export default QBOLogin;