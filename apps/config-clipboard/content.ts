import { detectPageType, extractFromPage } from './lib/page-detectors';
import { extractHostname, extractAuthServerId } from './lib/derivation';
import type { ExtensionMessage } from './lib/messages';

function scan() {
  const url = window.location.href;
  const pageType = detectPageType(url);

  // Always extract hostname from any Okta page
  const hostname = extractHostname(url);
  if (hostname) {
    const msg: ExtensionMessage = {
      type: 'VALUES_DETECTED',
      values: { oktaIssuer: `https://${hostname}` },
      source: 'auto',
    };
    chrome.runtime.sendMessage(msg);
  }

  // Extract auth server ID from URL if on an auth server page
  const authServerId = extractAuthServerId(url);
  if (authServerId) {
    // Send as a special field that background.ts handles
    chrome.runtime.sendMessage({
      type: 'VALUES_DETECTED',
      values: { _authServerId: authServerId } as any,
      source: 'auto',
    });
  }

  // Extract page-specific values from DOM
  if (pageType !== 'unknown') {
    const values = extractFromPage(pageType);
    if (Object.keys(values).length > 0) {
      const msg: ExtensionMessage = {
        type: 'VALUES_DETECTED',
        values,
        source: 'auto',
      };
      chrome.runtime.sendMessage(msg);
    }
  }
}

// Initial scan
scan();

// Re-scan on SPA navigation (Okta admin is a SPA)
let lastUrl = window.location.href;
const observer = new MutationObserver(() => {
  if (window.location.href !== lastUrl) {
    lastUrl = window.location.href;
    setTimeout(scan, 500); // Delay for DOM to settle
  }
});
observer.observe(document.body, { childList: true, subtree: true });

// Listen for capture selection requests from the side panel
chrome.runtime.onMessage.addListener(
  (message: ExtensionMessage, _sender, sendResponse) => {
    if (message.type === 'CAPTURE_SELECTION_REQUEST') {
      const text = window.getSelection()?.toString().trim() ?? '';
      sendResponse({ type: 'CAPTURE_SELECTION_RESPONSE', text });
    }
    return true; // Keep channel open for async response
  }
);
