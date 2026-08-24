import { test, expect } from '@playwright/test';

test.describe('YouTube Clone E2E Tests', () => {
  test('Homepage loads correctly, has the YouTubeVN logo, chips navigation, and renders video cards', async ({ page }) => {
    await page.goto('/');

    // 1. Check for the 'YouTubeVN' logo
    // Based on Header.tsx, we have "YouTube" and a sup element with "VN"
    // The logo contains "YouTubeVN" text content.
    await expect(page.locator('text=YouTubeVN')).toBeVisible();

    // 2. Check for the chips navigation
    // Based on CategoryNav.tsx, chips contain "Tất cả", "Trò chơi", "Âm nhạc"
    await expect(page.locator('button', { hasText: /^Tất cả$/ })).toBeVisible();
    await expect(page.locator('button', { hasText: /^Trò chơi$/ })).toBeVisible();
    await expect(page.locator('button', { hasText: /^Âm nhạc$/ })).toBeVisible();

    // 3. Check for video cards
    // Homepage displays images with object-cover and aspect-video class. Wait for at least one image to load.
    // In page.tsx: <img src={video.thumbnail} alt={video.title} ... />
    // Using a selector for video cards
    const videoCardImage = page.locator('img[alt]').first();
    await expect(videoCardImage).toBeVisible();
  });

  test('Shorts page renders the video container and has the Like/Dislike/Comment buttons', async ({ page }) => {
    await page.goto('/shorts');

    // Wait for the shorts container
    // Check for "Đăng ký" button which is present in shorts info overlay
    await expect(page.locator('button:has-text("Đăng ký")').first()).toBeVisible();

    // Check for Like/Dislike/Comment/Share/Repeat buttons
    // The buttons have ThumbsUp, ThumbsDown, MessageSquare, Share2, Repeat icons inside SVG.
    // In Shorts page, there is "Không thích", "Chia sẻ", "Phối lại" text.
    await expect(page.locator('text=Không thích').first()).toBeVisible();
    await expect(page.locator('text=Chia sẻ').first()).toBeVisible();
    await expect(page.locator('text=Phối lại').first()).toBeVisible();

    // Also check for the Like count (e.g. '83' or '84') and Comment count (e.g. '5')
    await expect(page.locator('text=83').first().or(page.locator('text=84').first())).toBeVisible();
    await expect(page.locator('text=5').first()).toBeVisible();
  });

  test('Parental Control modal appears when clicking the profile icon', async ({ page }) => {
    await page.goto('/');

    // Click the profile icon. Based on Header.tsx, it's a button wrapping a div with a User icon.
    // Let's click the button that opens the modal. It contains the lucide-user class or we can find it by finding the button with a User icon.
    // The structure is: <button onClick={() => setIsModalOpen(true)} className="p-1 hover:bg-[#272727] rounded-full transition ml-1 sm:ml-0">
    // <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-700 rounded-full flex items-center justify-center text-white">
    // <User size={16} className="sm:w-5 sm:h-5" />
    
    // Using a more robust locator
    const profileButton = page.locator('header button').filter({ has: page.locator('.bg-purple-700') });
    await profileButton.click();

    // The Parental Control modal should appear
    await expect(page.locator('h2:has-text("Dành cho phụ huynh")')).toBeVisible();
    await expect(page.locator('text=Vui lòng giải bài toán để tiếp tục')).toBeVisible();
    await expect(page.locator('text=Xác nhận')).toBeVisible();
  });
});
