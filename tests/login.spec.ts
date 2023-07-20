import { chromium, Browser, Page } from 'playwright';
import { test, expect } from '@playwright/test';

test("login to codere", async () => {
  const browser: Browser = await chromium.launch();
  const page: Page = await browser.newPage();

  // Replace 'your_username' and 'your_password' with valid login credentials
  const username = 'your_username';
  const password = 'your_password';

  const url = 'https://m.apuestas.codere.es/';
  await page.goto(url);
  console.log(`Navigated to ${url}`);

  // Ensure we are on the login page
  await page.waitForLoadState();

  //Accept cookies :D
  await page.getByRole('button', { name: 'ACEPTAR' }).click();


  await page.getByRole('button', { name: 'Acceder' }).click();

  // Input login credentials
  await page.getByRole('textbox', { name: 'Usuario / Correo electrónico' }).fill(username);
  await page.getByLabel('Contraseña').fill(password);

  // Click on the login button
  await page.locator('#btnaccess').click();

  // Wait for the login process to complete
  await page.waitForLoadState();

  // Check if login is successful
  const badCredentials = await page.waitForSelector('body > ion-app > ion-alert > div', { state: 'visible' });
  
  if (badCredentials) {
    console.log('Login failed.');
  } else {
    console.log('Login successful!');
  }

  // Close the browser
  await browser.close();
});