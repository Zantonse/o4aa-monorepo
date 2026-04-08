// O4AA Config Clipboard — Enhanced Bookmarklet (loaded from demo app)
// This file is hosted at /config-clipboard.js on the demo app.
// The bookmarklet is just: javascript:void(document.head.appendChild(document.createElement('script')).src='https://o4aa-demo.vercel.app/config-clipboard.js?'+Date.now())

(function(){
'use strict';

/* ─── State ─────────────────────────────────────────── */
var S = 'o4aa_config';
var ALL_KEYS = ['clientId','clientSecret','oktaIssuer','redirectUri','agentClientId','agentPrivateKeyJwk','agentKeyId','jagIssuer','jagAudience','jagTargetAudience','jagScope','resourceAudience','resourceTokenEndpoint'];
var LABELS = {clientId:'Client ID',clientSecret:'Client Secret',oktaIssuer:'Okta Issuer',redirectUri:'Redirect URI',agentClientId:'Agent Client ID',agentPrivateKeyJwk:'Private Key (JWK)',agentKeyId:'Agent Key ID',jagIssuer:'JAG Issuer',jagAudience:'JAG Audience',jagTargetAudience:'JAG Target Audience',jagScope:'JAG Scope',resourceAudience:'Resource Audience',resourceTokenEndpoint:'Resource Token Endpoint'};
var GROUPS = [
  {label:'OIDC Client', keys:['clientId','clientSecret','oktaIssuer','redirectUri']},
  {label:'AI Agent', keys:['agentClientId','agentPrivateKeyJwk','agentKeyId']},
  {label:'JAG Exchange', keys:['jagIssuer','jagAudience','jagTargetAudience','jagScope']},
  {label:'Resource', keys:['resourceAudience','resourceTokenEndpoint']}
];
var MANUAL_FIELDS = ['clientSecret','agentClientId','agentPrivateKeyJwk','agentKeyId','jagScope','clientId'];

function getState() { return JSON.parse(sessionStorage.getItem(S) || '{}'); }
function setState(s) { sessionStorage.setItem(S, JSON.stringify(s)); }
function merge(prev, vals) {
  var m = {};
  ALL_KEYS.forEach(function(k) { m[k] = vals[k] || prev[k] || ''; });
  return m;
}
function countFilled(s) { return ALL_KEYS.filter(function(k) { return s[k] !== ''; }).length; }

/* ─── Extract from current page ─────────────────────── */
function extract() {
  var h = location.hostname, p = location.pathname, vals = {};

  if (h.match(/\.okta\.com$|\.oktapreview\.com$/)) {
    vals.oktaIssuer = 'https://' + h;
    vals.redirectUri = 'https://o4aa-demo.vercel.app/api/auth/callback';
    vals.jagIssuer = 'https://' + h + '/oauth2';
    vals.jagAudience = 'https://' + h + '/oauth2/v1/token';
    var prev = getState();
    if (!prev.jagScope) vals.jagScope = 'ai_agent';
  }

  // OIDC App page
  if (p.match(/\/admin\/app\/oidc_client\/instance\//)) {
    var el = document.querySelector('[data-se="client-id"] input') || document.querySelector('[data-se="client-id"]');
    if (el) vals.clientId = (el.value || el.textContent || '').trim();
    if (!vals.clientId) {
      var m = document.body.innerText.match(/\b(0oa[a-zA-Z0-9]{10,})\b/);
      if (m) vals.clientId = m[1];
    }
  }

  // Workload Principal page
  if (p.match(/\/admin\/people\/workload\//)) {
    var wm = p.match(/\/workload\/(wlp_[a-zA-Z0-9]+)/);
    if (wm) vals.agentClientId = wm[1];
    if (!vals.agentClientId) {
      var wm2 = document.body.innerText.match(/\b(wlp_[a-zA-Z0-9]+)\b/);
      if (wm2) vals.agentClientId = wm2[1];
    }
  }

  // Custom Auth Server page
  var asm = p.match(/\/admin\/oauth2\/as\/(aus[a-zA-Z0-9]+)/);
  if (asm && h) {
    var sid = asm[1];
    vals.jagTargetAudience = 'https://' + h + '/oauth2/' + sid;
    vals.resourceAudience = 'https://' + h + '/oauth2/' + sid + '/v1/token';
    vals.resourceTokenEndpoint = 'https://' + h + '/oauth2/' + sid + '/v1/token';
  }

  // AI Agents page — extract agent client ID
  if (p.match(/\/admin\/directory/) || p.match(/\/admin\/ai-agent/)) {
    // Look for agent client ID pattern in page text
    if (!vals.agentClientId) {
      var agentIdMatch = document.body.innerText.match(/\b(agent_[a-zA-Z0-9]+|wlp_[a-zA-Z0-9]+)\b/);
      if (agentIdMatch) vals.agentClientId = agentIdMatch[1];
    }
  }

  // Global: scan for private JWK JSON anywhere on the page (modal dialogs, code blocks)
  // A private RSA JWK contains "d": (the private exponent) and "kty":"RSA"
  var allText = document.body.innerText;

  // Find private key JWK — look for JSON containing "d": and "kty"
  if (!vals.agentPrivateKeyJwk) {
    // Try to find JSON blocks that look like JWKs in pre/code elements and textareas first
    var codeEls = document.querySelectorAll('pre, code, textarea, [class*="json"], [class*="key"], [role="dialog"] *');
    for (var ci = 0; ci < codeEls.length; ci++) {
      var codeText = (codeEls[ci].value || codeEls[ci].textContent || '').trim();
      if (codeText.indexOf('"d"') !== -1 && codeText.indexOf('"kty"') !== -1) {
        // Try to extract the JSON object
        var jwkStart = codeText.indexOf('{');
        var jwkEnd = codeText.lastIndexOf('}');
        if (jwkStart !== -1 && jwkEnd > jwkStart) {
          var candidate = codeText.substring(jwkStart, jwkEnd + 1);
          try {
            var parsed = JSON.parse(candidate);
            if (parsed.d && parsed.kty) {
              vals.agentPrivateKeyJwk = candidate;
              // Also grab the kid if present
              if (parsed.kid && !vals.agentKeyId) {
                vals.agentKeyId = parsed.kid;
              }
              break;
            }
          } catch (e) { /* not valid JSON, skip */ }
        }
      }
    }
  }

  // Find kid value — look for "kid": pattern in visible text
  if (!vals.agentKeyId) {
    var kidMatch = allText.match(/"kid"\s*:\s*"([a-zA-Z0-9_-]{10,})"/);
    if (kidMatch) vals.agentKeyId = kidMatch[1];
  }

  return vals;
}

/* ─── Toast ─────────────────────────────────────────── */
function showToast(msg, type) {
  var t = document.createElement('div');
  t.textContent = msg;
  var bg = type === 'success' ? '#16a34a' : type === 'warn' ? '#d97706' : '#2d3570';
  t.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:' + bg + ';color:white;padding:8px 20px;border-radius:99px;font:600 13px -apple-system,sans-serif;z-index:2147483647;box-shadow:0 4px 16px rgba(0,0,0,0.2);transition:opacity 0.3s;';
  document.body.appendChild(t);
  setTimeout(function() { t.style.opacity = '0'; setTimeout(function() { t.remove(); }, 300); }, 2500);
}

/* ─── Selection Dropdown ────────────────────────────── */
function showSelectionDropdown(sel, state, onPick) {
  removeDropdown();
  var range = window.getSelection().getRangeAt(0);
  var rect = range.getBoundingClientRect();

  var dd = document.createElement('div');
  dd.id = 'o4aa-dropdown';
  dd.style.cssText = 'position:fixed;top:' + (rect.bottom + 8) + 'px;left:' + rect.left + 'px;background:white;border:1px solid #ddd;border-radius:8px;box-shadow:0 8px 32px rgba(0,0,0,0.15);z-index:2147483647;font:13px -apple-system,sans-serif;min-width:200px;overflow:hidden;';

  var header = document.createElement('div');
  header.textContent = 'Assign selection to:';
  header.style.cssText = 'padding:8px 12px;font-weight:600;font-size:11px;text-transform:uppercase;letter-spacing:0.05em;color:#666;border-bottom:1px solid #eee;';
  dd.appendChild(header);

  var preview = document.createElement('div');
  preview.textContent = sel.length > 50 ? sel.slice(0, 50) + '...' : sel;
  preview.style.cssText = 'padding:6px 12px;font-size:11px;color:#999;font-family:monospace;border-bottom:1px solid #eee;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:280px;';
  dd.appendChild(preview);

  MANUAL_FIELDS.forEach(function(k) {
    var row = document.createElement('div');
    row.style.cssText = 'padding:8px 12px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;';
    row.onmouseenter = function() { row.style.background = '#f0f4ff'; };
    row.onmouseleave = function() { row.style.background = 'none'; };

    var label = document.createElement('span');
    label.textContent = LABELS[k];
    row.appendChild(label);

    if (state[k]) {
      var badge = document.createElement('span');
      badge.textContent = 'has value';
      badge.style.cssText = 'font-size:10px;color:#999;';
      row.appendChild(badge);
    }

    row.onclick = function() { onPick(k); removeDropdown(); };
    dd.appendChild(row);
  });

  var cancel = document.createElement('div');
  cancel.textContent = 'Cancel';
  cancel.style.cssText = 'padding:8px 12px;cursor:pointer;text-align:center;color:#999;border-top:1px solid #eee;font-size:12px;';
  cancel.onmouseenter = function() { cancel.style.background = '#fafafa'; };
  cancel.onmouseleave = function() { cancel.style.background = 'none'; };
  cancel.onclick = function() { removeDropdown(); };
  dd.appendChild(cancel);

  document.body.appendChild(dd);
  setTimeout(function() { document.addEventListener('click', outsideClick); }, 10);
}

function outsideClick(e) {
  var dd = document.getElementById('o4aa-dropdown');
  if (dd && !dd.contains(e.target)) removeDropdown();
}
function removeDropdown() {
  var dd = document.getElementById('o4aa-dropdown');
  if (dd) dd.remove();
  document.removeEventListener('click', outsideClick);
}

/* ─── Panel ─────────────────────────────────────────── */
function renderPanel(state) {
  var existing = document.getElementById('o4aa-panel');
  if (existing) existing.remove();

  var filled = countFilled(state);
  var total = ALL_KEYS.length;

  var panel = document.createElement('div');
  panel.id = 'o4aa-panel';
  panel.style.cssText = 'position:fixed;top:80px;right:16px;width:300px;background:white;border:1px solid #ddd;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,0.12);z-index:2147483646;font:13px -apple-system,sans-serif;color:#1a1a2e;max-height:calc(100vh - 120px);display:flex;flex-direction:column;';

  /* Header */
  var hdr = document.createElement('div');
  hdr.style.cssText = 'background:#2d3570;color:white;padding:10px 14px;border-radius:12px 12px 0 0;display:flex;justify-content:space-between;align-items:center;cursor:move;user-select:none;';

  var hdrLeft = document.createElement('div');
  var hdrTitle = document.createElement('strong');
  hdrTitle.textContent = 'O4AA Config';
  hdrTitle.style.fontSize = '14px';
  hdrLeft.appendChild(hdrTitle);
  var hdrSub = document.createElement('div');
  hdrSub.textContent = 'Clipboard';
  hdrSub.style.cssText = 'font-size:10px;opacity:0.7;';
  hdrLeft.appendChild(hdrSub);
  hdr.appendChild(hdrLeft);

  var hdrRight = document.createElement('div');
  hdrRight.style.cssText = 'display:flex;align-items:center;gap:8px;';

  var badge = document.createElement('span');
  badge.textContent = filled + '/' + total;
  badge.style.cssText = 'background:rgba(255,255,255,0.2);padding:2px 8px;border-radius:99px;font-size:11px;font-weight:600;';
  hdrRight.appendChild(badge);

  var closeBtn = document.createElement('span');
  closeBtn.textContent = '\u00d7';
  closeBtn.style.cssText = 'cursor:pointer;font-size:18px;opacity:0.7;line-height:1;';
  closeBtn.onclick = function() { panel.remove(); };
  hdrRight.appendChild(closeBtn);
  hdr.appendChild(hdrRight);
  panel.appendChild(hdr);

  /* Draggable */
  var isDragging = false, startX, startY, startRight, startTop;
  hdr.onmousedown = function(e) {
    isDragging = true;
    startX = e.clientX; startY = e.clientY;
    startRight = parseInt(panel.style.right) || 16;
    startTop = parseInt(panel.style.top) || 80;
    e.preventDefault();
  };
  document.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    panel.style.right = (startRight - (e.clientX - startX)) + 'px';
    panel.style.top = (startTop + (e.clientY - startY)) + 'px';
  });
  document.addEventListener('mouseup', function() { isDragging = false; });

  /* Body */
  var body = document.createElement('div');
  body.style.cssText = 'flex:1;overflow-y:auto;padding:8px;';

  GROUPS.forEach(function(g) {
    var gFilled = g.keys.filter(function(k) { return state[k] !== ''; }).length;

    var sec = document.createElement('div');
    sec.style.cssText = 'border:1px solid #e8e8ec;border-radius:6px;margin-bottom:6px;overflow:hidden;';

    var secHdr = document.createElement('div');
    secHdr.style.cssText = 'padding:6px 10px;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#2d3570;background:#f0f4ff;display:flex;justify-content:space-between;cursor:pointer;user-select:none;';

    var secLabel = document.createElement('span');
    secLabel.textContent = g.label;
    secHdr.appendChild(secLabel);

    var secCount = document.createElement('span');
    secCount.textContent = gFilled + '/' + g.keys.length;
    secCount.style.color = '#888';
    secHdr.appendChild(secCount);

    var secBody = document.createElement('div');
    secBody.style.cssText = 'padding:2px 0;' + (gFilled === g.keys.length ? 'display:none;' : '');

    secHdr.onclick = function() {
      secBody.style.display = secBody.style.display === 'none' ? 'block' : 'none';
    };

    g.keys.forEach(function(k) {
      var row = document.createElement('div');
      row.style.cssText = 'display:flex;align-items:center;gap:6px;padding:4px 10px;';

      var dot = document.createElement('div');
      var hasVal = state[k] !== '';
      dot.textContent = hasVal ? '\u2713' : '\u00d7';
      dot.style.cssText = 'width:16px;height:16px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:9px;flex-shrink:0;' + (hasVal ? 'background:#e8fae8;color:#16a34a;border:1px solid #86d086;' : 'background:#f5f5f7;color:#aaa;border:1px solid #ddd;');
      row.appendChild(dot);

      var lbl = document.createElement('div');
      lbl.textContent = LABELS[k];
      lbl.style.cssText = 'font-size:11px;font-weight:500;min-width:75px;flex-shrink:0;';
      row.appendChild(lbl);

      var val = document.createElement('div');
      val.style.cssText = 'font-family:monospace;font-size:10px;color:#888;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;';
      val.textContent = hasVal ? (state[k].length > 25 ? state[k].slice(0, 25) + '\u2026' : state[k]) : '';
      val.title = state[k] || '';
      row.appendChild(val);

      secBody.appendChild(row);
    });

    sec.appendChild(secHdr);
    sec.appendChild(secBody);
    body.appendChild(sec);
  });

  panel.appendChild(body);

  /* Footer */
  var foot = document.createElement('div');
  foot.style.cssText = 'padding:10px;border-top:1px solid #eee;display:flex;flex-direction:column;gap:6px;';

  var copyBtn = document.createElement('button');
  copyBtn.textContent = 'Copy Config JSON';
  copyBtn.style.cssText = 'width:100%;padding:8px;background:#2d3570;color:white;border:none;border-radius:6px;font:600 13px -apple-system,sans-serif;cursor:pointer;';
  copyBtn.onmouseenter = function() { copyBtn.style.background = '#1a2050'; };
  copyBtn.onmouseleave = function() { copyBtn.style.background = '#2d3570'; };
  copyBtn.onclick = function() {
    var cfg = {};
    ALL_KEYS.forEach(function(k) { cfg[k] = state[k] || ''; });
    navigator.clipboard.writeText(JSON.stringify(cfg, null, 2)).then(function() {
      showToast('Copied ' + filled + '/' + total + ' fields!', 'success');
      copyBtn.textContent = 'Copied!';
      setTimeout(function() { copyBtn.textContent = 'Copy Config JSON'; }, 1500);
    });
  };
  foot.appendChild(copyBtn);

  var clearBtn = document.createElement('button');
  clearBtn.textContent = 'Clear All';
  clearBtn.style.cssText = 'width:100%;padding:5px;background:none;color:#888;border:1px solid #ddd;border-radius:6px;font:12px -apple-system,sans-serif;cursor:pointer;';
  clearBtn.onclick = function() {
    sessionStorage.removeItem(S);
    renderPanel({});
    showToast('Config cleared', 'warn');
  };
  foot.appendChild(clearBtn);

  var status = document.createElement('div');
  status.style.cssText = 'text-align:center;font-size:11px;color:' + (filled === total ? '#16a34a' : '#888') + ';';
  status.textContent = filled === total ? 'All fields collected!' : (total - filled) + ' field' + (total - filled > 1 ? 's' : '') + ' remaining';
  foot.appendChild(status);

  panel.appendChild(foot);
  document.body.appendChild(panel);
}

/* ─── Main ──────────────────────────────────────────── */
var prev = getState();
var vals = extract();
var sel = (window.getSelection() || '').toString().trim();

if (sel && sel.length > 0 && sel.length < 5000) {
  var state = merge(prev, vals);
  setState(state);
  showSelectionDropdown(sel, state, function(key) {
    var v = {}; v[key] = sel;
    var updated = merge(state, v);
    setState(updated);
    renderPanel(updated);
    showToast(LABELS[key] + ' captured!', 'success');
  });
  renderPanel(state);
} else {
  var state = merge(prev, vals);
  setState(state);
  renderPanel(state);
  var newCount = countFilled(state) - countFilled(prev);
  if (newCount > 0) showToast(newCount + ' field' + (newCount > 1 ? 's' : '') + ' auto-detected!', 'success');
  else if (document.getElementById('o4aa-panel')) showToast('Panel refreshed \u2014 ' + countFilled(state) + '/' + ALL_KEYS.length + ' fields', 'warn');
}

})();
