import { expect, test } from '@playwright/test';

test('chatbot shows local fallback when API fails', async ({ page }) => {
  await page.addInitScript(() => {
    const originalFetch = window.fetch.bind(window);
    window.fetch = async (input, init) => {
      const url = typeof input === 'string' ? input : input instanceof Request ? input.url : String(input);
      if (url.includes('/api/chat')) {
        throw new TypeError('Failed to fetch');
      }
      return originalFetch(input, init);
    };
  });

  await page.goto('/');

  await page.waitForFunction(() =>
    Boolean(document.querySelector('button[aria-label="Open chatbot"], button[aria-label="Close chatbot"]'))
  );
  await page.evaluate(() => {
    const el = document.querySelector('button[aria-label="Open chatbot"], button[aria-label="Close chatbot"]');
    if (el instanceof HTMLElement) el.click();
  });

  await page.evaluate(() => {
    const quick = document.querySelector('[data-testid="chatbot-quick-1"]');
    if (quick instanceof HTMLElement) quick.click();
  });

  await expect(
    page.getByText(/AI service is temporarily down|Key projects include an AI Agent Marketplace/i).first()
  ).toBeVisible({ timeout: 15000 });
});
