import { deriveFields, extractHostname, extractAuthServerId } from './lib/derivation';
import { getState, mergeValues, setHostname, setAuthServerId, getHostname, getAuthServerId, clearState } from './lib/storage';
import type { ExtensionMessage } from './lib/messages';
import type { FieldSource } from './lib/config-types';

// Keep popup as the action click behavior (side panel opened separately)
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: false });

// Handle messages from content script and side panel
chrome.runtime.onMessage.addListener(
  (message: ExtensionMessage & { values?: Record<string, string> }, sender, sendResponse) => {
    if (message.type === 'VALUES_DETECTED') {
      handleValuesDetected(
        message.values as Record<string, string>,
        message.source as FieldSource,
        sender.tab?.url,
      );
      return;
    }

    if (message.type === 'CAPTURE_SELECTION_REQUEST') {
      // Forward to the active tab's content script
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id) {
          chrome.tabs.sendMessage(tabs[0].id, message, (response) => {
            if (response) {
              // Forward the capture response back to all listeners (side panel)
              chrome.runtime.sendMessage(response).catch(() => {
                // Side panel may not be open — ignore
              });
            }
          });
        }
      });
      return;
    }

    if (message.type === 'CLEAR_STATE') {
      clearState().then(() => {
        notifyUI();
      });
      return;
    }
  }
);

async function handleValuesDetected(
  values: Record<string, string>,
  source: FieldSource,
  tabUrl?: string,
) {
  // Handle special _authServerId field (not a DemoConfig key)
  const authServerId = values['_authServerId'];
  delete values['_authServerId'];

  // Store hostname if detected from the tab URL
  if (tabUrl) {
    const hostname = extractHostname(tabUrl);
    if (hostname) await setHostname(hostname);
  }

  // Store auth server ID if detected
  if (authServerId) {
    await setAuthServerId(authServerId);
  }

  // Merge extracted values into state
  if (Object.keys(values).length > 0) {
    await mergeValues(values, source);
  }

  // Run derivation if we have both hostname and auth server ID
  const hostname = await getHostname();
  const serverId = authServerId ?? await getAuthServerId();
  if (hostname && serverId) {
    const derived = deriveFields(hostname, serverId);
    await mergeValues(derived, 'derived');
  }

  // Notify UI
  notifyUI();
}

function notifyUI() {
  const msg: ExtensionMessage = { type: 'STATE_UPDATED' };
  chrome.runtime.sendMessage(msg).catch(() => {
    // Side panel or popup may not be open — ignore
  });
}
