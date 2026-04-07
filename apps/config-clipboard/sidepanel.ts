import { CONFIG_GROUPS, type ConfigKey, type ConfigState, type FieldState } from './lib/config-types';
import { getState, buildDemoConfig, countFilled } from './lib/storage';
import type { ExtensionMessage } from './lib/messages';

let currentState: ConfigState;

// ─── Render ──────────────────────────────────────────

function render(state: ConfigState) {
  currentState = state;
  const { filled, total } = countFilled(state);

  // Counter badge
  const counter = document.getElementById('counter');
  if (counter) counter.textContent = `${filled}/${total}`;

  // Groups container
  const groupsEl = document.getElementById('groups');
  if (!groupsEl) return;
  groupsEl.textContent = ''; // Clear children safely

  for (const group of CONFIG_GROUPS) {
    const groupFilled = group.fields.filter(f => state[f.key].value !== '').length;
    const allFilled = groupFilled === group.fields.length;

    const groupEl = document.createElement('div');
    groupEl.className = 'group';

    // Header
    const header = document.createElement('div');
    header.className = 'group-header';

    const headerLabel = document.createElement('span');
    headerLabel.textContent = group.label;
    header.appendChild(headerLabel);

    const headerCount = document.createElement('span');
    headerCount.className = 'group-count';
    headerCount.textContent = `${groupFilled}/${group.fields.length}`;
    header.appendChild(headerCount);

    // Body
    const body = document.createElement('div');
    body.className = allFilled ? 'group-body collapsed' : 'group-body';

    header.addEventListener('click', () => {
      body.classList.toggle('collapsed');
    });

    for (const field of group.fields) {
      body.appendChild(createFieldRow(field.key, field.label, state[field.key]));
    }

    groupEl.appendChild(header);
    groupEl.appendChild(body);
    groupsEl.appendChild(groupEl);
  }

  // Capture bar — show dropdown of empty fields
  const emptyFields = CONFIG_GROUPS.flatMap(g => g.fields).filter(f => state[f.key].value === '');
  const captureBar = document.getElementById('capture-bar');
  const captureTarget = document.getElementById('capture-target') as HTMLSelectElement | null;

  if (captureBar && captureTarget) {
    if (emptyFields.length > 0) {
      captureBar.style.display = 'flex';
      captureTarget.textContent = ''; // Clear options safely
      for (const f of emptyFields) {
        const opt = document.createElement('option');
        opt.value = f.key;
        opt.textContent = f.label;
        captureTarget.appendChild(opt);
      }
    } else {
      captureBar.style.display = 'none';
    }
  }

  // Status text
  const statusEl = document.getElementById('status');
  if (statusEl) {
    if (filled === total) {
      statusEl.textContent = 'All fields collected \u2014 ready to copy';
      statusEl.style.color = 'var(--color-success)';
    } else {
      const remaining = total - filled;
      statusEl.textContent = `${remaining} field${remaining > 1 ? 's' : ''} remaining`;
      statusEl.style.color = 'var(--color-muted)';
    }
  }
}

function createFieldRow(key: ConfigKey, label: string, fs: FieldState): HTMLElement {
  const row = document.createElement('div');
  row.className = 'field-row';

  // Indicator circle
  const indicator = document.createElement('div');
  indicator.className = `field-indicator indicator-${fs.source}`;
  indicator.textContent = fs.source === 'pending' ? '\u00d7' : '\u2713';
  row.appendChild(indicator);

  // Label
  const labelEl = document.createElement('div');
  labelEl.className = 'field-label';
  labelEl.textContent = label;
  row.appendChild(labelEl);

  // Value
  const valueEl = document.createElement('div');
  valueEl.className = fs.value ? 'field-value' : 'field-value empty';
  valueEl.textContent = fs.value
    ? (fs.value.length > 30 ? fs.value.slice(0, 30) + '\u2026' : fs.value)
    : 'not set';
  valueEl.title = fs.value || '';

  // Click to edit inline
  if (fs.value) {
    valueEl.addEventListener('click', () => {
      const input = document.createElement('input');
      input.type = 'text';
      input.value = fs.value;
      input.style.cssText = 'width:100%;font-family:var(--font-mono);font-size:11px;padding:2px 4px;border:1px solid var(--color-primary);border-radius:3px;';
      valueEl.replaceWith(input);
      input.focus();
      input.select();

      const save = () => {
        const msg: ExtensionMessage = {
          type: 'VALUES_DETECTED',
          values: { [key]: input.value } as Partial<Record<ConfigKey, string>>,
          source: 'manual',
        };
        chrome.runtime.sendMessage(msg);
      };

      input.addEventListener('blur', save);
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') { save(); input.blur(); }
        if (e.key === 'Escape') { loadAndRender(); }
      });
    });
  }

  row.appendChild(valueEl);
  return row;
}

// ─── Actions ─────────────────────────────────────────

async function copyConfigJson() {
  const state = await getState();
  const config = buildDemoConfig(state);
  const json = JSON.stringify(config, null, 2);

  try {
    await navigator.clipboard.writeText(json);
    showToast('Copied to clipboard!');
  } catch {
    // Fallback
    const textarea = document.createElement('textarea');
    textarea.value = json;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    showToast('Copied to clipboard!');
  }
}

function captureSelection() {
  const msg: ExtensionMessage = { type: 'CAPTURE_SELECTION_REQUEST' };
  chrome.runtime.sendMessage(msg);
}

function showToast(message: string) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}

// ─── Init ────────────────────────────────────────────

async function loadAndRender() {
  const state = await getState();
  render(state);
}

// Listen for updates
chrome.runtime.onMessage.addListener((message: ExtensionMessage) => {
  if (message.type === 'CAPTURE_SELECTION_RESPONSE') {
    const target = (document.getElementById('capture-target') as HTMLSelectElement)?.value as ConfigKey;
    if (target && (message as any).text) {
      const msg: ExtensionMessage = {
        type: 'VALUES_DETECTED',
        values: { [target]: (message as any).text } as Partial<Record<ConfigKey, string>>,
        source: 'manual',
      };
      chrome.runtime.sendMessage(msg);
    }
  }

  if (message.type === 'STATE_UPDATED') {
    loadAndRender();
  }
});

// Wire buttons
document.getElementById('copy-btn')?.addEventListener('click', copyConfigJson);
document.getElementById('clear-btn')?.addEventListener('click', () => {
  const msg: ExtensionMessage = { type: 'CLEAR_STATE' };
  chrome.runtime.sendMessage(msg);
});
document.getElementById('capture-btn')?.addEventListener('click', captureSelection);

// Initial render
loadAndRender();
