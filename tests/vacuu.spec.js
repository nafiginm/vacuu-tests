import { test, expect } from '@playwright/test';

test.describe('Тестирование лендинг-страницы vacuu', () => {

  test('Локализация - проверка атрибута lang', async ({ page }) => {
    await page.goto('https://polis812.github.io/vacuu/');
    const lang = await page.getAttribute('html', 'lang');
    expect(lang).not.toBeNull();
  });

  test('Проверка всех ссылок', async ({ page }) => {
    await page.goto('https://polis812.github.io/vacuu/');
    const links = page.locator('a');
    for (let i = 0; i < await links.count(); i++) {
      const href = await links.nth(i).getAttribute('href');
      if (href && !href.startsWith('#')) {
        const response = await page.goto(href);
        expect(response.status()).toBeLessThan(400);
      }
    }
  });

  test('Форма подписки - ввод email и отправка', async ({ page }) => {
    await page.goto('https://polis812.github.io/vacuu/');
    await page.fill('input[type="email"]', 'test@example.com');
    await page.click('button[type="submit"]');
    const successMessage = page.locator('.success-message');
    await expect(successMessage).toBeVisible();
  });

  test('Переключение отзывов', async ({ page }) => {
    await page.goto('https://polis812.github.io/vacuu/');
    
    const firstReview = await page.locator('.review.active').innerText();
    await page.click('.next-review-button');
    await page.waitForTimeout(1000);
    const newReview = await page.locator('.review.active').innerText();
    
    expect(newReview).not.toBe(firstReview);
  });

});
