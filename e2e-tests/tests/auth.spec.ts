import { test, expect } from '@playwright/test';

const UI_URL= "http://localhost:5173/";

test('should allow the user to sign in', async ({ page }) => {
  await page.goto(UI_URL);

  // GET THE SIGN IN BUTTON
  await page.getByRole("link", {name : "Sign In"}).click();

  // EXPECT THE HEADING THEIR
  await expect(page.getByRole("heading", { name: "Sign In"})).toBeVisible();

  // check the inpute correct or not
  await page.locator('[name="email"]').fill('test@t.com');
  await page.locator('[name="password"]').fill('test123');
   
  // CHECK WEITHER THE LOGIN BUTTON VISIBLE OR NOT 
  await page.getByRole("button", {name: "Login" }).click();
  
  // CHECK WEITHER THE EXPECTED OUT PUT VISIBLE OR NOT
  await expect(page.getByText("User has been signed in")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Booking"})).toBeVisible()
  await expect(page.getByRole("link", {name: "My Hotels"})).toBeVisible()
  await expect(page.getByRole("button", {name: "SignOut"})).toBeVisible()
  

});

test("should allow user register", async({page})=>{
  
  await page.goto(UI_URL);

  await page.getByRole("link", {name : "Sign In"}).click();
  await page.getByRole("link", {name: "Create an account  here" }).click();
  await  expect(
    page.getByRole("heading", {name: "Create an Account"})
  ).toBeVisible();

  await page.locator('[name="firstName"]').fill('test@t');
  await page.locator('[name="lastName"]').fill('test123');
  await page.locator('[name="email"]').fill('test@test.com');
  await page.locator('[name="password"]').fill('test123');
  await page.locator('[name="confirmPassword"]').fill('test123');

  await page.getByRole("button", {name: "Create Account" }).click();
  await expect(page.getByText("Registration success!")).toBeVisible();

})
