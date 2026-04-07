// O4AA Config Clipboard — Bookmarklet
// Drag this to your bookmarks bar, then click it on any Okta admin page.
// It extracts config values, accumulates across pages, and copies JSON.

javascript:void(function(){
  var S='o4aa_config';
  var prev=JSON.parse(sessionStorage.getItem(S)||'{}');
  var h=location.hostname;
  var p=location.pathname;
  var vals={};

  /* Always derive from hostname */
  if(h.match(/\.okta\.com$|\.oktapreview\.com$/)){
    vals.oktaIssuer='https://'+h;
    vals.redirectUri='https://o4aa-demo.vercel.app/api/auth/callback';
    vals.jagIssuer='https://'+h+'/oauth2';
    vals.jagAudience='https://'+h+'/oauth2/v1/token';
    if(!prev.jagScope) vals.jagScope='ai_agent';
  }

  /* OIDC App page — extract Client ID */
  if(p.match(/\/admin\/app\/oidc_client\/instance\//)){
    var el=document.querySelector('[data-se="client-id"] input')||document.querySelector('[data-se="client-id"]');
    if(el) vals.clientId=(el.value||el.textContent||'').trim();
    if(!vals.clientId){
      var m=document.body.innerText.match(/\b(0oa[a-zA-Z0-9]{10,})\b/);
      if(m) vals.clientId=m[1];
    }
  }

  /* Workload Principal page — extract Agent Client ID */
  if(p.match(/\/admin\/people\/workload\//)){
    var wm=p.match(/\/workload\/(wlp_[a-zA-Z0-9]+)/);
    if(wm) vals.agentClientId=wm[1];
    if(!vals.agentClientId){
      var wm2=document.body.innerText.match(/\b(wlp_[a-zA-Z0-9]+)\b/);
      if(wm2) vals.agentClientId=wm2[1];
    }
  }

  /* Custom Auth Server page — derive JAG + Resource endpoints */
  var asm=p.match(/\/admin\/oauth2\/as\/(aus[a-zA-Z0-9]+)/);
  if(asm&&h){
    var sid=asm[1];
    vals.jagTargetAudience='https://'+h+'/oauth2/'+sid;
    vals.resourceAudience='https://'+h+'/oauth2/'+sid+'/v1/token';
    vals.resourceTokenEndpoint='https://'+h+'/oauth2/'+sid+'/v1/token';
  }

  /* If user has text selected, prompt to assign it */
  var sel=(window.getSelection()||'').toString().trim();
  if(sel&&sel.length>0&&sel.length<5000){
    var fields=[
      {k:'clientSecret',l:'Client Secret'},
      {k:'agentClientId',l:'Agent Client ID'},
      {k:'agentPrivateKeyJwk',l:'Agent Private Key (JWK)'},
      {k:'agentKeyId',l:'Agent Key ID'},
      {k:'jagScope',l:'JAG Scope'},
      {k:'clientId',l:'Client ID'},
    ];
    var opts=fields.map(function(f,i){return(i+1)+'. '+f.l}).join('\n');
    var choice=prompt('Assign selected text to which field?\n\n'+opts+'\n\nEnter number (or cancel):');
    if(choice){
      var idx=parseInt(choice)-1;
      if(idx>=0&&idx<fields.length) vals[fields[idx].k]=sel;
    }
  }

  /* Merge with previous */
  var merged={};
  var allKeys=['clientId','clientSecret','oktaIssuer','redirectUri','agentClientId','agentPrivateKeyJwk','agentKeyId','jagIssuer','jagAudience','jagTargetAudience','jagScope','resourceAudience','resourceTokenEndpoint'];
  allKeys.forEach(function(k){merged[k]=vals[k]||prev[k]||''});
  sessionStorage.setItem(S,JSON.stringify(merged));

  /* Count filled */
  var filled=allKeys.filter(function(k){return merged[k]!==''}).length;

  /* Copy to clipboard */
  navigator.clipboard.writeText(JSON.stringify(merged,null,2)).then(function(){
    alert('O4AA Config ('+filled+'/'+allKeys.length+' fields)\n\nCopied to clipboard!\n\nPaste into the demo app at /settings.\n\n'+(filled<allKeys.length?'Missing: '+allKeys.filter(function(k){return merged[k]===''}).join(', '):'All fields collected!'));
  }).catch(function(){
    /* Fallback */
    var ta=document.createElement('textarea');
    ta.value=JSON.stringify(merged,null,2);
    document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove();
    alert('O4AA Config ('+filled+'/'+allKeys.length+' fields) — Copied to clipboard!');
  });
}())
