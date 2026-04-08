import { expect, test } from '@playwright/test';

test('chatbot token scrolls to contact section', async ({ page }) => {
  await page.addInitScript(() => {
    const originalFetch = window.fetch.bind(window);
    window.fetch = async (input, init) => {
      const url = typeof input === 'string' ? input : input instanceof Request ? input.url : String(input);
      if (url.includes('/api/chat')) {
        const payload = `data: ${JSON.stringify({ text: 'Taking you to contact. [SCROLL_TO_CONTACT]' })}\n\n`;
        const stream = new ReadableStream({
          start(controller) {
            controller.enqueue(new TextEncoder().encode(payload));
            controller.close();
          },
        });
        return new Response(stream, {
          status: 200,
          headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' },
        });
      }
      return originalFetch(input, init);
    };
  });

  await page.goto('/');
  await page.evaluate(() => window.scrollTo(0, 0));
  const beforeY = await page.evaluate(() => window.scrollY);

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

  await page.waitForTimeout(1200);

  const afterY = await page.evaluate(() => window.scrollY);
  const contactTop = await page.evaluate(() => {
    const el = document.getElementById('contact');
    if (!(el instanceof HTMLElement)) return 0;
    return Math.max(0, Math.floor(el.getBoundingClientRect().top + window.scrollY));
  });

  expect(afterY).toBeGreaterThan(beforeY + 150);
  expect(Math.abs(afterY - contactTop)).toBeLessThan(500);
});
