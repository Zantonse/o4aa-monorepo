import { CONFIG_GROUPS } from './lib/config-types';
import { getState, countFilled, buildDemoConfig } from './lib/storage';

async function renderPopup() {
  const state = await getState();
  const { filled, total } = countFilled(state);

  // Update progress ring
  const circumference = 2 * Math.PI * 24; // r=24
  const offset = circumference * (1 - filled / total);
  const ringFill = document.getElementById('ring-fill');
  const ringText = document.getElementById('ring-text');
  if (ringFill) {
    ringFill.setAttribute('stroke-dashoffset', String(offset));
    if (filled === total) {
      ringFill.setAttribute('stroke', 'oklch(0.38 0.12 160)'); // success green
    }
  }
  if (ringText) ringText.textContent = `${filled}/${total}`;

  // Missing fields list
  const missingEl = document.getElementById('missing-list');
  if (!missingEl) return;
  missingEl.textContent = ''; // Clear safely

  const missing = CONFIG_GROUPS.flatMap(g => g.fields)
    .filter(f => state[f.key].value === '');

  if (missing.length > 0) {
    const label = document.createElement('div');
    label.className = 'missing-label';
    label.textContent = 'Missing:';
    missingEl.appendChild(label);

    for (const f of missing) {
      const item = document.createElement('div');
      item.textContent = `\u2022 ${f.label}`;
      missingEl.appendChild(item);
    }
  } else {
    const done = document.createElement('div');
    done.style.color = 'var(--color-success)';
    done.style.fontWeight = '600';
    done.textContent = 'All fields collected!';
    missingEl.appendChild(done);
  }
}

// Copy JSON
document.getElementById('copy-btn')?.addEventListener('click', async () => {
  const state = await getState();
  const config = buildDemoConfig(state);
  await navigator.clipboard.writeText(JSON.stringify(config, null, 2));

  const btn = document.getElementById('copy-btn');
  if (btn) {
    btn.textContent = 'Copied!';
    setTimeout(() => { btn.textContent = 'Copy JSON'; }, 1500);
  }
});

// Open side panel
document.getElementById('panel-btn')?.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab?.id) {
    await chrome.sidePanel.open({ tabId: tab.id });
  }
  window.close();
});

renderPopup();
