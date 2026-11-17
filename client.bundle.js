/**
 * Client half of `dsh-notebooks`.
 *
 * Four seats, one library:
 * - `sidebar.panellist` — the row in the left sidebar;
 * - `main` — the library page (list, search, create, rename, delete);
 * - `sidebar.right.pane.tab` — one note open beside the chat, like a document;
 * - `conversation.session.header.utilities` — «В блокнот» in the chat header;
 * - `conversation.chat.assistant-actions` — «В блокнот» under one assistant answer.
 *
 * The Host half owns the files; this module talks to it over `/notebooks/api/*`
 * on the page's own origin, so a reverse-proxy prefix and the desktop shell both
 * keep working.
 */
window.__ModuleLoader__.load({
  id: 'dsh-notebooks',
  factory(require) {
    const React = require('react')
    const h = React.createElement

    // Vendored markdown-it (MIT): see vendor/LICENSE.markdown-it. The UMD build
    // is evaluated in a local CommonJS shim so the module gets it as a value,
    // not through a global and not through eval.
    const mdModule = { exports: {} }
    ;(function (module, exports) {
(function(e,t){typeof exports==`object`&&typeof module<`u`?module.exports=t():typeof define==`function`&&define.amd?define([],t):(e=typeof globalThis<`u`?globalThis:e||self,e.markdownit=t())})(this,function(){var e=Object.defineProperty,t=(t,n)=>{let r={};for(var i in t)e(r,i,{get:t[i],enumerable:!0});return n||e(r,Symbol.toStringTag,{value:`Module`}),r},n={};function r(e){let t=n[e];if(t)return t;t=n[e]=[];for(let e=0;e<128;e++){let n=String.fromCharCode(e);t.push(n)}for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);t[r]=`%`+(`0`+r.toString(16).toUpperCase()).slice(-2)}return t}function i(e,t){typeof t!=`string`&&(t=i.defaultChars);let n=r(t);return e.replace(/(%[a-f0-9]{2})+/gi,function(e){let t=``;for(let r=0,i=e.length;r<i;r+=3){let a=parseInt(e.slice(r+1,r+3),16);if(a<128)t+=n[a];else{if((a&224)==192&&r+3<i){let n=parseInt(e.slice(r+4,r+6),16);if((n&192)==128){let e=a<<6&1984|n&63;t+=e<128?`��`:String.fromCharCode(e),r+=3;continue}}if((a&240)==224&&r+6<i){let n=parseInt(e.slice(r+4,r+6),16),i=parseInt(e.slice(r+7,r+9),16);if((n&192)==128&&(i&192)==128){let e=a<<12&61440|n<<6&4032|i&63;t+=e<2048||e>=55296&&e<=57343?`���`:String.fromCharCode(e),r+=6;continue}}if((a&248)==240&&r+9<i){let n=parseInt(e.slice(r+4,r+6),16),i=parseInt(e.slice(r+7,r+9),16),o=parseInt(e.slice(r+10,r+12),16);if((n&192)==128&&(i&192)==128&&(o&192)==128){let e=a<<18&1835008|n<<12&258048|i<<6&4032|o&63;e<65536||e>1114111?t+=`����`:(e-=65536,t+=String.fromCharCode(55296+(e>>10),56320+(e&1023))),r+=9;continue}}t+=`�`}}return t})}i.defaultChars=`;/?:@&=+$,#`,i.componentChars=``;var a={};function o(e){let t=a[e];if(t)return t;t=a[e]=[];for(let e=0;e<128;e++){let n=String.fromCharCode(e);/^[0-9a-z]$/i.test(n)?t.push(n):t.push(`%`+(`0`+e.toString(16).toUpperCase()).slice(-2))}for(let n=0;n<e.length;n++)t[e.charCodeAt(n)]=e[n];return t}function s(e,t,n){typeof t!=`string`&&(n=t,t=s.defaultChars),n===void 0&&(n=!0);let r=o(t),i=``;for(let t=0,a=e.length;t<a;t++){let o=e.charCodeAt(t);if(n&&o===37&&t+2<a&&/^[0-9a-f]{2}$/i.test(e.slice(t+1,t+3)))i+=e.slice(t,t+3),t+=2;else if(o<128)i+=r[o];else if(o>=55296&&o<=57343){if(o>=55296&&o<=56319&&t+1<a){let n=e.charCodeAt(t+1);if(n>=56320&&n<=57343){i+=encodeURIComponent(e[t]+e[t+1]),t++;continue}}i+=`%EF%BF%BD`}else i+=encodeURIComponent(e[t])}return i}s.defaultChars=`;/?:@&=+$,-_.!~*'()#`,s.componentChars=`-_.!~*'()`;function c(e){let t=``;return t+=e.protocol||``,t+=e.slashes?`//`:``,t+=e.auth?e.auth+`@`:``,e.hostname&&e.hostname.indexOf(`:`)!==-1?t+=`[`+e.hostname+`]`:t+=e.hostname||``,t+=e.port?`:`+e.port:``,t+=e.pathname||``,t+=e.search||``,t+=e.hash||``,t}function l(){this.protocol=null,this.slashes=null,this.auth=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.pathname=null}var u=/^([a-z0-9.+-]+:)/i,d=/:[0-9]*$/,f=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,p=[`%`,`/`,`?`,`;`,`#`,`'`,`{`,`}`,`|`,`\\`,`^`,"`",`<`,`>`,`"`,"`",` `,`\r`,`
`,`	`],m=[`/`,`?`,`#`],h=255,g=/^[+a-z0-9A-Z_-]{0,63}$/,_=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,v={javascript:!0,"javascript:":!0},y={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0};function b(e,t){if(e&&e instanceof l)return e;let n=new l;return n.parse(e,t),n}l.prototype.parse=function(e,t){let n,r,i,a=e;if(a=a.trim(),!t&&e.split(`#`).length===1){let e=f.exec(a);if(e)return this.pathname=e[1],e[2]&&(this.search=e[2]),this}let o=u.exec(a);if(o&&(o=o[0],n=o.toLowerCase(),this.protocol=o,a=a.substr(o.length)),(t||o||a.match(/^\/\/[^@\/]+@[^@\/]+/))&&(i=a.substr(0,2)===`//`,i&&!(o&&v[o])&&(a=a.substr(2),this.slashes=!0)),!v[o]&&(i||o&&!y[o])){let e=-1;for(let t=0;t<m.length;t++)r=a.indexOf(m[t]),r!==-1&&(e===-1||r<e)&&(e=r);let t,n;n=e===-1?a.lastIndexOf(`@`):a.lastIndexOf(`@`,e),n!==-1&&(t=a.slice(0,n),a=a.slice(n+1),this.auth=t),e=-1;for(let t=0;t<p.length;t++)r=a.indexOf(p[t]),r!==-1&&(e===-1||r<e)&&(e=r);e===-1&&(e=a.length),a[e-1]===`:`&&e--;let i=a.slice(0,e);a=a.slice(e),this.parseHost(i),this.hostname=this.hostname||``;let o=this.hostname[0]===`[`&&this.hostname[this.hostname.length-1]===`]`;if(!o){let e=this.hostname.split(/\./);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n&&!n.match(g)){let r=``;for(let e=0,t=n.length;e<t;e++)n.charCodeAt(e)>127?r+=`x`:r+=n[e];if(!r.match(g)){let r=e.slice(0,t),i=e.slice(t+1),o=n.match(_);o&&(r.push(o[1]),i.unshift(o[2])),i.length&&(a=i.join(`.`)+a),this.hostname=r.join(`.`);break}}}}this.hostname.length>h&&(this.hostname=``),o&&(this.hostname=this.hostname.substr(1,this.hostname.length-2))}let s=a.indexOf(`#`);s!==-1&&(this.hash=a.substr(s),a=a.slice(0,s));let c=a.indexOf(`?`);return c!==-1&&(this.search=a.substr(c),a=a.slice(0,c)),a&&(this.pathname=a),y[n]&&this.hostname&&!this.pathname&&(this.pathname=``),this},l.prototype.parseHost=function(e){let t=d.exec(e);t&&(t=t[0],t!==`:`&&(this.port=t.substr(1)),e=e.substr(0,e.length-t.length)),e&&(this.hostname=e)};var x=t({decode:()=>i,encode:()=>s,format:()=>c,parse:()=>b}),S=t({Any:()=>C,Cc:()=>ee,Cf:()=>te,P:()=>ne,S:()=>re,Z:()=>ie}),C=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,ee=/[\0-\x1F\x7F-\x9F]/,te=/[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/,ne=/[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B4E\u1B4F\u1B5A-\u1B60\u1B7D-\u1B7F\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDD6E\uDEAD\uDED0\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9\uDFD4\uDFD5\uDFD7\uDFD8]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09\uDFE1]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDD6D-\uDD6F\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD839\uDDFF|\uD83A[\uDD5E\uDD5F]/,re=/[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C1\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2429\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E5\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBD2\uFD40-\uFD4F\uFD90\uFD91\uFDC8-\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD803[\uDD8E\uDD8F\uDED1-\uDED8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDC00-\uDCEF\uDCFA-\uDCFC\uDD00-\uDEB3\uDEBA-\uDED0\uDEE0-\uDEF0\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED8\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0-\uDCBB\uDCC0\uDCC1\uDCD0-\uDCD8\uDD00-\uDE57\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE8A\uDE8E-\uDEC6\uDEC8\uDECD-\uDEDC\uDEDF-\uDEEA\uDEEF-\uDEF8\uDF00-\uDF92\uDF94-\uDFEF\uDFFA]/,ie=/[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/,ae=[8364,0,8218,402,8222,8230,8224,8225,710,8240,352,8249,338,0,381,0,0,8216,8217,8220,8221,8226,8211,8212,732,8482,353,8250,339,0,382,376];function oe(e){return e===0||e>=55296&&e<=57343||e>1114111}function se(e){return oe(e)?65533:e>=128&&e<=159&&ae[e-128]||e}function ce(e){return e-1>>>0<127||e-160>>>0<55136?String.fromCharCode(e):String.fromCodePoint(se(e))}var w=(()=>{let e=new Uint8Array(127),t=0;for(let n=33;n<=126;n++)n!==34&&n!==36&&n!==92&&(e[n]=t++);return e})();function le(e,t,n,r,i,a){let o=e.length,s=a*90,c=0,l=()=>{let t=w[e.charCodeAt(c++)];return t<a?t:t*91-s+w[e.charCodeAt(c++)]},u=n-r,d=n+i,f=new Int32Array(d);f.fill(-1,r,a),f.fill(-1,a+u,d);let p=new Int32Array(d),m=new Int32Array(d);function h(t,n){let r=0,i=n,a=n+t;for(;i<a;){let t=w[e.charCodeAt(c++)];if(t<89)r+=t,f[i++]=r;else if(t===89){let t=w[e.charCodeAt(c++)]+2;for(;t--;)f[i++]=++r}else{let t=w[e.charCodeAt(c++)];r+=89+(t<90?t*91+w[e.charCodeAt(c++)]:w[e.charCodeAt(c++)]*8281+w[e.charCodeAt(c++)]*91+w[e.charCodeAt(c++)]),f[i++]=r}}}h(r,0),h(u,a);let g=new Int32Array(i*2),_=0,v=0;function y(e,t){for(let n=0;n<e;n++){let e=t+n,r=l(),i=l();g[v*2]=r,g[v*2+1]=i,v+=1,p[e]=_;let a=(f[r]<0?m[r]:1)+(f[i]<0?m[i]:1);m[e]=a,_+=a}}y(i-a+r,a+u),y(a-r,r);let b=new Uint16Array(_),x=0;for(let e=0;e<v;e++)for(let t=0;t<2;t++){let n=g[e*2+t],r=f[n];if(r<0){let e=p[n],t=e+m[n];for(;e<t;)b[x++]=b[e++]}else b[x++]=r}let S=new Uint16Array(t),C=0;for(;c<o;){let t=w[e.charCodeAt(c++)];t>=a&&(t=t*91-s+w[e.charCodeAt(c++)]);let n=f[t];if(n<0){let e=p[t],n=e+m[t];for(;e<n;)S[C++]=b[e++]}else S[C++]=n}return S}var ue=le("!}.&u%}'&}*'~!6*)%&,~!J~!J~%L~y<~!R,~~%Lu~~#GD~~#|)1#%}^%}2%+#.##%##%}&%##%'#%##&%#%#'%#&#%#&#'#%%#&#%##%#)%''%&%#%#'%#%%#%%}%%%#%#&(23#%%#&-%0%('1#(##%#'##+%'*.:1}#%#6-+(%'%%#%%%}#L'2351&('%}&/N'(0(/*-%(%%}#'+&T%7.2}#&%&#%#36/5##%&%%#&#%%#))2%%##%&&'0~!#*+&'%1~!%).'3q?&%'1~!.##%6(~!+%%%(Gw'rT~!E#<nA%#jZ~!H%(~!42##~!*31&~!G%U~#)5~#`3~!J~!Z~%]~%Y~%C~!q~!u~#kz~%#~!6'~!D~!U~!?~#T~!c%~!G#'~%7|~!G~!J~!G&~#pb~(Df}#%}*&}#%##%##%##&#-}&'#'&%#.++}%mI,#,@&(}*%}*'%&##&#%##%}&0}#.},U},%}+%}&%}#%##&}B%(}(%}+%)})%##%#&}&%##%&}<%}>%#%&}*%}(%}9%}/%})%}*%}*%}?&}&%}3%}&*#%})%#%#)}#&#-#+*%E%%'%'#%}#*V##&##I}#&&##%&%#&&Qf%%))w/0+&%#(#.%-''''++++7}>%4'',##1,#%#&%##&#'##&#*#9)%&%}#*}%,#+P(%A&%#'&##wSD',9E00#y#@}(+}&%&>~!#~!X}#*}(&&}(&}(,%}%&#+&}#&}I%#%}%)#(},'%#*}4%%#%}(''}#/##(##),%-##%%)#&}(.}&%#&}%%}*&#%},&&}&%}#%*'#%})%}D&}&%}-&}6&#&}-,%}#%})-(~+`~,=?~I9'9%~!,#%})%})%}@%}?%}(~!?~#<~#pP~#BG~#=1#%K+~#?#~%;)~#A~#mF1~#A'~'X%'~#lR~#N~'N~#r~#m#-~#i'?%#'%~#B%##%,%#~#_%#0%~#]732~,w~2+#:&#%&'0%&>%}#>##F+)#%&&#(+_}4&}-%}(&}@&}O7Fdf0@+/v4}&WU##&/0#&'('B#%}.%}'+#%}#%%&#&%#%##+#&#)#6#'#.},%}c%},%#%##%&#&%#&~#>'*-.%##%##%}#%%}%'~#)D1}#%*&~#_%%'(~#S2%'.}#~#=##*'*-%}&'%'##&&~'E%.#&~#M4}%%##&'%#~#O1##%&#'+~#<B%##%%'%+~#;#@%}#&%#&&%#(~#H1}'%'##&&~#?A}&'~#D#%32}'&&&&~#[}'(#%}'~#;C})&}%%#%~#=&%,3}%'(#%%~#^'#&&)#%'~#Y%-~#d-%'~#^%%&#&&&}#~#b~2t*&'~&(~&@~0%~e~3}%*''0})&}+~!9##-}#%-hD*)1fC#%/&/fB#40~!+#)*4~!+~!K'&:~!/*7~!.#~!H~!L':~%x&~!H#~!*~%1~!I#~!+A~#p'~!F~~#-#~,,(~.Z~!V~%;'B'mq-W~!N~%I%#&&#&}#%},%%}'%}+X#%}#&}(%}'%}<%}#%}%%'}'%}:~![)9@~%>~#UA%-%##&~!C%~!-.9:~!1~!-^2/:a~!y,D*J#-5)/4~%23,~#G~!L1~!0X3`~!2+~!!0-~&E~!W~!o,>Y&]~%cZx_&~#O*9#A#'#+I'%#)~!0B*-5A+-((F&*M#)(-7-5+'-3a5Vi~!Y~!?+[)%3),ERHm~!+:D,VG.+)?fB%%*(%)'(#&80%1'8`K8?`+'Z#&O&'H5#*9)A%%5&3))0%39+.*7#()&&*=4@**L)<'_&*+..;(#*+)./&0#3)%')-8(4ixD(&.}%,('aI:,)%,k2231T)I'#/-W7,/'Q#.'Y24+h')37</31&83##&0#),H(?'&?/1##%#&&#%''-%&&&#(&''&#.-'%#%%(,')*'&#&#'##%(%(#%('#&##%%%%('%#%#%%#%#&%##h>w+v<ayvyvcg.uuhKr}g/v|g>u9i[~>g5uI~=RvdwEg;v/g;uk!!TTSx]@RT!U!#!@VBRUU!'UTe-d0c`e&gSdicedFcrdTaqb.kYcAohdYd@a3e+d}dMdtd.aJ#bqcK`dle/e.e'dwdPdodddjbEb}ogd^ofdpduc6j?l%d{drdqc)d7bacOdQ%T#Y)X.sR[yH>6Vyv3[xwLu>vo'!*.[yBacahoj>6Rew3[xqdZa#!a&#^(X-[yG>6Vyu3[xvg3sEr|g.u/Ri9db0T#^(Xa)!-[y;>6Vylg4wKs{JwNZt3@3r=c4Z([xlg;wKt!cpq's@v7A'*a(a+!-a#[y<3Dt?3Dt'>6Vym3[xmg9rxsNJwLZt4~?r?db1T#`-!(Xa,!0[yS>6Vz%NuQs.g4wKtnJwNZtS@3r>c4Z([y%g;wKtrdga8!a(!#&T*Y-Xa#!a0<or[yc3Dtq>6Vz43[y3JwNZtf@3s!Ju}!%Dti:pm3c_%X#tjB5pkd6q!r]u?voC'*-a.a2!0a&a+[yI3DtI3Ds~3DtH>6Vyw3[xx;:s#~<5pKJwNZtE@3r~d`a)!a2T#a.(!+U.X1[yT3Dt`3Dtv>6Vz&3[y&g9rxwzcxstPu.<rAJwLZtT~?r@dZa%!a.&^*Za(/Reu[ya>6Vz23[y1g3sEr}wkg{NuQRg{ci(U#5@b`~,cg#U(2WnH5wugcRh7dX#T(Y,a'Ta!!a,[yZ<]mj>6Vz,3[y+Pv#5ReZKu+=,%!H}7ABwkaS?Rh:BcW(X#<]mrj:ubv/ARekdg%!(!a.*Ta(Y.X1!#sP>Rl*Dt6[y>>6Vyo3Wf*jOvuumvuRgRJuq*!:9<B@bX~3jVv&v@s@5Re[d/rQt{uAvo&a&a*)a2!,0Wf!3Dt0=Bs'>6Re}3[xy~<5s%JwJZt1~Gs)c;&!#2sJkNuXvzq7rxu,Re8dka4!a8(aEZ+a@Y.X1Xa)[yd=Bs(3DtP>6Vz53[y4cX#X&Re:avRe9~<5s&JwJZtQ~Gs*i^rzvdRg+Jv{%!2sbB@bX}kdga,!Za?&^*T1/!a'Dt+[y6>6Vyf3Wf%g/u;s4hGu6?Rh-JvZ,!c%#&RoX54Rivj7uyvf8RgTKvZB%*!2sGh<vu5Rgq<=C::9bb~#dZ#T&Ta6Y.X*Dt>[y93Wf)coZ(T,6VyifluvRgC@95@B@bX~/hFu34cC#T,k/unq8w8Q5RkUklwQuzunq8w8Q5Rk8d/rJu?v8w9)-&!a0a;a&aIWejg3sEr/h1s<DtDJvyZqY5aws3Jvy!&Wei~Hr1:au5@Bag>23E~5c:Z&bX};kKv?w&unuVu5Rjc;>bs)#~@:Rh.=ay<a]C;b`}Vd6s/t{uAvoaxa()!a,a7%-a#a2Dt,[yF2Wo[>6Vyt3[xuNuPRi&NuPwpi#RoWh?vf8Ri%Jv]!%Ri:KvxD!.'2WeAjZu`q9rxu,Re7woeAg-unLq(qA_/*2Wg_g3u5q^9:4E}/jTrxrzv=Wkkd~0UX#^^Xa-a1a5T&a=U1a'*aEa]!a*aPaA-adok[y54Rn>;:p3~Dp5g9rpsFNvZqjg3uJp4~<5p0Pw;5qlJwNZt*@3p1Pw:5p/Ou!5p2JvG'!6Vye=<qnJvh_[xhg3v,Rh3kOwOw-sDuev/Re^dha[a%!%!a+#Ta7)-5TaCaO!aka!a)sf[yb2>Rl!9ARiq5E}Qg=ucRkBE|oJrJ_@Wk~@Wk{JrJ_@Wk|@WkyJrJ_@Wk}@WkzJvO_[y2g-vMRmiKuYC!)&>Ri;>Ri<@3RkNc](X#@9Rk=g5vuRmhKvDB!+'=]meg3u4Rmgd)#Y'Vz3CARmfd`a+!%T'!+#Ta1Ta6TaM-sTDt9[yA9sYd'%Y#s[[xpj:ueunaXRgEjRq,v-vuqdd2'`#6Rev<32@5>:2<E}5xIo9a*X#Y(;5RePJvD_g>vyRgNj8w)v8<wggs:RgXiZt|vjx,hSq3ah!-(~@:Ro/Ou!5RhWj^v(pyw8unRhUdx-UY#^Ua.a3a70!)%UX1TaDa)'omRiRRhE[y:3Dsz=Br,>6Vyj3[xkg6ruwjcqsrPw;5r*Ku]D'Zt-@3r(~?r.i[vwv]dU1a--U#`a4(g/vsRhPOu!5RhLj:rmu9Wo!~@:wdh@g/vsRiTjXuvvNr}:RhBj^v(pyw8unRn]dz1UYa'a+^Y(!aETZalaRY.Ta?a4[yDJw1!#qLsW>6Vyrfzq-pLflpwRe|Js>%!Dt@3Dt&Jvy_[xs~HrnjMuwpsw'RecKu+D#'!t<~Grl~?rjg5u-x,gwp{ah!-(~@:Rg~Ou!5Rh'jXuvvNr}:Rh#cW#X/c;&!#2sLi[v7u7RgpJv)(!iLrxu,Re6j7v@s@5Se[e7d`aW!Za(a`T.a#!a3!&aDa-!9)Dt_=6s+3[x~~DR|h~DS6avhGun5RkZj3w)v-]mkKunB!&*]kb97R|i<ARk<c:Z(6Vy}Juh'!wziMRoS:F|vkLuauJv5vtvQRh1d='T+Y#VyO~DR|jcF#T'7R|g97R|kJv3'!ay<Rj,Jvh&!:ReXcsa6*a+#a#_aIRf9aLRf?c,Z&Rf5Rf7c.Z&Rf;Rf>cQ#%T'p-Rf8Rf=ct#%'(*!,p,Rf4p+Rf6Rf:Rf<d~'Ua%U*^UYa(!a,-!#a4YaTalaEX0a8a<Weo3Dt/3Dsx=Br93Wen~Dr;~<5p<JwNZt2@3p=Pw:5p;Ou!5r3c7&!#:p>3Ds}KvGB)_6Vyk2sM=<r7x'eovA(!hFu1ARf}cV#X&@r5j6rvwQa^Rf3c=Za'wkghJv__g;unRggA53B9=b^}%j6uduo5Jq;!(hIv%2Re`Ou4ARe_e%a#^^^Xa&!a*a2!&a6YaP!*ad!#a:aE/5Rn?[y@>6Vyp;:pE~DrY~<5pBJwNZt8@3pCh=rt3rWPw:5pAJup_[xoNuPpF9c!#'45pD5ARn)d8#X'X*3@rU72s]h>v<<sSjJpqvewOJq/(!hNw'5ReBk0s2u3w/w'5ReE5@Jq.!a+JQ!&WeU23d(#Y&RjG5]jBk!u7w&u0udARjEe#+^^^Ub#!a2/a`Z(agT1!a-a;|@TaG!aS[yV=Re~fow'RguNuPRe?bz#'>RoUWeL>:Cbb|?JwPZtVg6ruRmzJvD'!6Vz(g/vmRh~Jvy_[y(g9voRgyx*cy(#2>Ri2B9b]~9kIw9u7rluJu3Rg]dI#a%UY'@=p%CAx.gQZ&RhwwygtRm{x5g_Z'+ABqR9Woa=Bp&dV#^*Xa'!&@o{g4v]Rk;Jv{!%Rk[wkkiA5RkiwwfUB=x,fUuqC&*!>RfTg8v0RfV~ARfSd;rJsAuAv9wR'ae+/aO!a@aza/a#[yQ@Wg!2Wemg3sEr0JvB_g>uvReWg2v+Re=KupB_+[y!2AbY~-~Hr2AJwD!(h<~El>h<~El?Kun@+_:9b`}Kg-v/Ri3g;vtwyk_9]k_d=&T#*U.6qh@Ab`|K9:H|CJv[!&3Dtex'fDwC%!Rf[9WlMd[(^X,!a%Z06Vz!@WgBg=v~Rgvg,QRe@awd,#Y+jTv|Q~EfWj]uNr|~FRfXdy#Y&^Ua%!aO.!(a)Ua;=!a@aKap!a-,a!Ta]a[rSa]p?[y82sK=Bq~;:p:~<5p8Pw:5p7d'#Y'Wf(;RnRi[u4w&RgJJvG'!6Vyh=<r#ijuuv/sIKuYD'ZtG@3p9~Gr&d2#`(g<vtRgFj`u5w&rqpxRf2CJuY!+:wfnTOu!5Rg}jNs1ucv&RfwJvA!&3@q|BDcC#T,k/unq8w8Q5RkTklwQuzunq8w8Q5Rk9dga#!a'!a=#a0!:+Tb*b@aO.a4!aba8aFJv^}?!VyR~Dr<g;u%Rn.~<5p[x'e`wNZtR@3p]Pw:5pZhNvjBp.woe_g5u-r4JwF!%DtO3:ooc7&!#:p^3DtpLuGw(!+%)Dtk6Vz#2sd=<r8d'#Y([y#<x3gJt`w@!)%}MRiowzikRij=]ilxAf3,U(#B2Rf#g0v-Rm[ck{`U#]giKv3>)!&6Ri154s,KuGB_%@r68r:dJ|t`#X(9<E|u2@H|rx3gJu?w'!+'1Nu7Reg4=H~+9<wxgY95Rm]xLggZ-`(X}U2:Ri4h<uOawRmsJv__5@bb{jbV~3dka#a'a]!,#a+U=a>b6a3b%!/aKa/)!arwve^VyJ;:pR~DpTg3uJpS~<5pOPw;5qmPw:5pNOu!5pQJvG'!6Vyx=<qoJvA!{~Jup!%@qk7Rn/KvyD!}''[xz;>wkh'?Rh,x8gyt`w5D!&),(SgyccRgztJ@3pPB5p#d'(Y#<]mmifubw&RgoJvE&!82s^JvF&!8Rf,ADb]~;x=h'rNu]vK!,%'*0RnORh)4Rh*AqQg-vaRnNg;wHwkh'ba~4cE#Ta*x3gctyw@'!+%RnFRnD<4Rn@hFvK5RnCxWg[#`&a0Ua()`1Rm75Rg[c]%X#qi8Rg^NvdRj>BwzgZauwji7Rm6A4wgg]d1#&(*,.0a#Rm;Rm<Rm=Rm>Rm?Rm@RmARmBe%#^^^Xaea?aC/b+(,!a+a#!a/!>a&Ta<aKbD!2wphBRnk[yPw}hE|.=Br-3Dtm>6Vy~g6urRf.x,hPrNav!%'RnqRo%Ro#Nu;q[Pw;5r+JwNZtM@3r)d'#Y'Weh;xChL#`&RnmRnoKu}>%(!Rne~Bs-;2wjcussJv+'!aYSO}6@B<5?ba~8LrNvj!.%*ROwungw~ng~:9;Ri^>wtnig;wHRnixDh@|(UZ.x1h@|)!#:2<H|*xHn]#-UX'3Ro)z=iT}6ARns=Bwsn_wpnaRncw]aR(#UXa&Ua*a/=]iPd'#Y&Ro'WnXf{QRm2hNvj]nZd`'T~&1`{|`#9b]{}c:'!#Wl{>@=be}]?cl{{U#:5Abb}Jds#^YaF!a*b4a#a3aPa>&Tb!bH!*a_!Eau?/a&RjY<]gj>6Vz*;:pe~DrZg,QRj1JwNZtX@wihspcJvZ&!VyX9WmOJu|!|N2WmHJvh&!]ht~Bpbcn&T(!#RmQ<s7Nu;padH#X'`+WmJ@>RmKCARhnKup=!)&Wf+:RhqNuPpf9c!#'45pd5AwghpARn(Ls@w!%,)!RmP@Wfe<E|IJva!&WmNg8vsRmLd`*.`#Y'Xa!axRn*]hrA8Rhug5s@rXg8u!RmMd8#X'X*3@rV72smdI*#UY&RmICARho~GsgxVgd)Ta'U-Y&Xa!T#RnEWnA@Wffg1uDRi0hFvK5RnBxGnG&#`%owp)@wsf+bX}Ze-*1!a*^^^Ua|!#a.aq&Ya2!a>.a6!a:aO`aJDtL[y`@Wg#>6Vz12@wzoYRoZNuPRi!NuPRhzg=ucRi,@=b`{Yg=ucRi-ACJvB!&Sh[ebSh]ebi`wUuFRm4Jw2_[y0JvB!.<Ju(!&SoG}6Shd}6<Ju(!&SoH}6She}6Kur@._g5vHRieJvx!{L2G{Kx6gd'T#?Rh82Wi5cZ#X(g1w)Rm5dW-Y(Ta#!a)!#aYa=wnfE=su2>>bU{0j9udv:<svj8uQv-7RgHdE%#^'sq9sp=>Bb_{TJv`!&g/r|snj6v(us5d,#Y(56H}[978H}]Jw5!&g1rushJvB!+j;v{u5?zDhd}6}bj;v{u5?zDhe}6}ce*#`(^^^a[aea!=!a6a*aoXb1a.!aAbL!b>,b'aL!aV@Wf|2Wlg3[y/JwNZt^@3piPw:5pgJunZou3@rsJva&!Vy_g<v~Rm#JvG'!6Vz0=<r{Ju{%!:pj@WfsiXuJu3Rm:JvZ&!WfA~Bph@c4Z&Dtwax5rubx(#:awRk1@d,#Y&RfjRfid1#,Y(@Wfp2Wlrg5s@ryKu[@!,'=]ig9wlk?Rk>g5u-rqJvy'!@9RkQcH(T#=>Ri~@<wkj(Wj(KuZB*!&<7rw@9RkRcH(T#=>Ri}@<wkj)Wj)dg(Ta2Xa9X#`-!a*CARhg@@=I}d9x;c~#X%so=<sj>2@@=aybb}XjWv0Q~EfEj3vLv;<d,#Y(56H}`978H}_dgaPaFa'a/!#a3Y0a_a;a|!1(a7-[yE3[xt;:pJNvZrrg3uJrvJwNZt=@3pIh=rt3rxPw:5pGOu!5rpJvG'!6Vys=<rz@c4Z&Dt(ax5rtJvZ!&~BpH@wsfNg-vaRlNci*U#=<wei<F}a5@Jq.!a*JQ!%@qZ23d(#Y&RjH5]jCk!u7w&u0udARjFd/prq=tyvpaEa(a:.!a1aZ(@@=I}:9wpd%=<sX55w_h}@@=I{t=ay<aU@@=I}T=ay<2@@=I})?C9:9au@9Cb]}DP~=x-fAZ(2Wl1=ay<aU@@=I}>5@d##Y+jTv|vV~EfFj]uNpn~FRfGdgaK!Z2&!a8a-Tb({E!acTbM*!a(DtY[yYd'%Y#sl[y*hHvh>Re5x2c{Z}.j4uCvcawRiMd+#X+_x&d!},<5RkX;2Hzw@x,gavfB-!{CcF&T#Roe;RodwWbBg5urRgaKvHC*_6Vz+<4opieuew&Rmq@d]&Y)X,T#X0Rh}<BqP=4qS9:ReMg/ujReNJw0!/<Jui%!bd{kawwnemRelAxUa?a3#*.&UX(Ya+a/RhvRnQ<o}9Wmtd-#Y&RgSRmw9;Rmxay=Rmyg-vaRmuxEhSrNu,v-voC!%(aR.a(a7+1Ro1>Ro5CE{A9b]{@;5x#eO{:g;urRi+KrNA!%(Ro3>Ro79;Ri_Ku@>{;&!x%gX|{KunA_+g5QRj/g3u5Rj#g>uERj%wio/xRhS&!,!#^1U}wba{8>>@=be}qC@:D5ba{7Ku+A&!}x?ba}t>>@=be}se(aA^^^Uat!b0#{pa+awUazbGa#aLb9bgaWac'a5TbS=Br!d1#`%scp_Jvl!#rT>Re0JvX&!VyN=H{Fcm#U&:pY=ReaJv2&!]h0=]nUJvG'!6Vy|=<r%JrM_=]h2@Wlud'#)U'Wf'b]{i=]h/Jvh!&~BpWg=v]RnMx+ny#'Nu;pVwjnu=]nwxJnx,T#`&Reqwjnt=]nvieu9vrRjLLuYwP(#+!th@wih5pX~Gr'g5v/Rh4KunA'!-CARnP@wwiN:Rm_9x'cvw>!|l=<saKvAA!0&3@q}>w^e1bp#&Re2Re3BDx7gH#T|f5H|eKuZ>!%(:qNAH{]Jv6!+3B2B9=b^{X<5<B92:E{ZLvhwA(a;a%!igQuyRmad+#Y}m@3Rh5d8#X'X*:AqUAHzmaxwbh<aXRnVcF}RT#Nw&cj#U(BWnug/vsRntdka)(a3+.Zb7aYYan1!bVa@Xa}[y^@b[{G=H{+hFu73Rj&Pv#5ReQcK%T#sig1v{Rj'Ku+D#'!t]~Grm~?rkKuMB!01d5#`'Vy.ta3Dtu~Hroc8#'{^45s85AwZbP&!#Rn!wghxWn#KvEA!)&2RlA2RlBx:h|#(T,=]j09Wobz>x]z/@awRoTd+#Y(az]hFhCrm4d,#Y+jTv|Q~EfMj]uNr|~FRfOdCa!Xa9_X#@<plJvf!%b`{(9;Rgwc;.!#2x7cw#T|UDb]|T5Ju={(!=@E{&Jv)&!Ab`{'awJvf!~*>>@=be{#KuY>!+&4Ezyi[ugv&RjIdea+T)#UXa&T-T&a!Rh9auRmW=]kLg5vuRn+g3u4Rn-Ow6ARn,hHus5xNk?#UX(U~)/g8v0RkD~AwkkF?Ri.OuNBwkkA?Ri/d|a2`a*^UYa.!aBTZaTa'Xa;!(!2!-a#b2[yC>6Vyq3[xr2Wi?g1rusVh%s?DtF~<5rbJs;%!DtBfswKtCj[uvuSsEu3RgVx3o:u+wN'*Zt;@3rd~Grh~?rfg8w)Lq)qE&-a%!>bI|`jWv0vV~EfCjTv|vV~Ef@j]uNpn~FRfBcK#T']gWNu7x,k7q4ai(0!hHv8<RhmkMu9vrsBuev/RhlCJvB!,g<v{wchh~@:Rhji[vrv{wchi~@:RhkdS&a5UY#Ta!RgPwwiI5BwciI~@:Rh`x'iJvj'!5]iJPu8Bwch]~@:Rhach)U#h3rp]gLh@t|Ax,hTq3ah!-(~@:Ro0Ou!5RhXj^v(pyw8unRhVd|)`,^UYas!a?/a2Z'a^Ta{Tb7Ta(a#!a,Wf&9sZ3DtAadamov=Bqt3[xig8vsRm~>waiL2b`{QJv*_Ouv2qgj<v]v2BqfdR'X*X#Y-@3qr~Gqv~?p6hHv-]glPup5Lq+q?_%*b_{qF{n9b^{rOu4ARhpKvCD!+&~Bqp:5Dbb}nwoiKl&unuTuBv]v+ueunaXRf0=Jvh!0nKufu8v1w&w7q%w&uHrz:Rgnj5w,uxDJq/(!hNw'5ReCk0s2u3w/w'5ReFd>Za&!*UaA=<wkgsRnSJv^!%Refifw3vyRgOKu_B'!,<]gkiiu:w&Rh<=C@a^<B57@2F{[<B5@aW:=3away9A5aW=<B=C@a^<B57@2F{Ie-#`(^^^bCara.b8aza6!/bZ,!adTbnTbOb+aFaS!aAT9@Wf~2Wli3Dtl2@d,#Y&RfnRfmJwJZtN~GqyJva&!VyMg<v~Rm%iXuJu3Rm9Jv[_=]ih9wlkDRkCd1#`(@Wg>2Wls3cH#T(@<Rj*=>Ri|b~'#23s9h<~El.d'#Y&Dtxi^rzvdRl#d*#U%(o|B2s`hJwSaxRmDKv4B&!1:Rmdd5#`'Vx}to~Hq{x'f1v3(!BA5ba|bJv_&!Wfug1v]ReIdO+U/Y#&G}-8wze=Rh{g1v]ReHg/uQRf/by#)ibQwERl/cH#T(@<Rj+=>Ri{cNu+vlax-!(#a0qa9<Rii2;;bU{H;x<i=&X#Rk`<4wwi=C9H~8xAI(Y#<azRi@45wXI<B9;5bb~7dL(X#Xa(+!aL6Vy{g5QqOau:5au2@ay547EzbxOcU(UX-T#Ta#:Cbb|A?wjh/b_|SOw6ARgtihr}u7Rhy<d1#T)X1@@=I|~=ay<2@@=aybb}Sj3vLv;<d,#Y(56H}A978H}@dGpvs@uAu`vcw9*!aFa+ai%(b!aXa8.a?a[ozWey=sU2@G}Nch&U#Rf_WexKu+D#'!t:~Gr`~?r^j]uNr|~FRg*j^psurwJt|RmcKv)@&!)7Rkv~Br[@wxfO:Rl3co#U'6Rezj_q#vIuavjRltwzeyh@vr5JqD0!>aY?C9:9au@9Cb]}9cl#U*5;5<H||jbuus1ucv&Rfvg1v~d/pppzqFr^a--a~!aMat1(hFv;Wiz@@=Izoj5uuv-7Rix~Cw`fk2WlVcZ#X,k)u3vWs@u2]ktg;wEx'fBq(_2Wg/jTv|vV~EfoJv]!15x'hzqG!(P~EfU~CRl_j6v(us5x4i-#T(2WmZ?C2F|d>Kq<aj1!*jTqIsBv=Wl`~Cw`fi2WlWj`v0u*~>RlR=c>Z,k#u3vWs@u2]kr<c1Z+jTqIsBv=Wla~Cw`fm2WlXdmb3!a{(arZa`bkTa%TbQTa-a9+c'!aM!/[yL=Bqug.w'RifhFvyDRj.g>vgwyk^9]k^Jv3_@WfbAARkhJw2_[x|JvB_wkoIRoKwkoJRoLd'(Y#<]gm=<9<H|yd'%_X#skDtb3awwqkgNulRkgdB#^',9:p'hJwSaxRmEBwVb8@4=H|qLu+w50&!)@3qs~?pU>Awwn;;Rn=c:Z'ARn<=<qwKvC@!/&~BqqJv6!&]eVb^z^xRge'/a%+^`#Sge}6<4Rn3=]n0Pw2>Rn8Jw0!&>Rn:>Rn6cY#a7+!a&=<wkaNw~h3z_c5Z{=wjh#=]nLKv^D!&)Vyz=bW|swYb<WetcG#T(2wxa@qVx@gD#Y&b^|V5JwG&!5bb|pg/w&RgD@x=kHs=uAvn!a%%/'+RmSRh694Ro`g-vaRmRhHv-]mlxCcS#`&ba~.5cD#Ta)P~=d,#Y(56H{>978H{Dd_#{2^Y%_+qbbb{6g3sERhsbU{?dfa.,`a(Xa<!aiX#(55RiG54RiHcI#T'WiU3RiVNvdwtfcRlKNvdd,#Y&RlHRlExQgf.1*^T'X#Sgf}6Wn4=]hfPrk>Rn7Jw0!&>Rn5>Rn9Lunw?&a2!,5<oq@@wqfdRlJj5Q~=d,#Y(~ARfcOuN]fdDKw;ay(}i!547E}j?cI#T(@5bV}iCbV}hdv(^^Tb?a40,b##Tbo!a*bR!a<b|a/!aKai!aU[yK=]o^g:v>ReGJwPZtK<7Rh+h<~El,Pv#5ReR@awwxjCg,ulRjDJv6&!]j!z?aQeeg>w=Sh<eeJw;!&axEzOg,Qosc!#*:wkeJ]eJ>x'h-u(!%Ro.w~h.zPdNZ(X,Ya![x{;9ReY;wkgxRiF:x?ap#Y&RmUg<s2Rkod]+UY0TZ'!a&A9sw<=bczLNvuw{gqzNhJwSaxRmCKuLay!#&s_Rf-55b^{uJvZa!!c%#(55Ri654wmiu5RiuawLu,vp!+}^%b_}Y9;wkgxba}o>A9:=b^}zKuh=a''!3awRk3c*'!#aHRk6c+Z&Rk5Rk4Jv)&!awRjSawd9*`#0?C2@EzMj8u<uJ5RmbjQrquJu3x,k>uq@_+=ayb^|W~ARkEOuN]k@7dhzV^X/X&a-#zRzSb`zXcJzTT#2WkVKvDBzW!%FzY9;5bbzWjQrquJu3Jw3%!b`zU=ayb^zQd:#X(T-a!6Vyywxh}=b]{Jg=u1RiAdGp~qHtzv!w(wA+a+a;<!aJaYai'anasb(=azRmV:Cbb{MLq2vb!%')RjuRjrRjtRjqx3jnqCw3!%')Rk(Rk+Rk&Rk)Lq2vb!%')Rj{RjxRjzRjwLq2vb!%')RjsRjpRjfRjex3jcqCw3!%')Rk'Rk*RjkRjl9<CbbzfOu4ARhxLq2vb!%')RjyRjvRjhRjgx=joq*uKvb!%')+-Rk.Rk%Rj~Rk-Rk#Rj}x=jdq*uKvb!%')+-Rk,Rk!Rj|RjmRjjRjidAq&qKs@uAv8Aa.'*-a@a&0!aM@a5[y73Dsy3Ds|3Dt):wxgI2sHJwJZt.~Gqxwsf0ikrzt}Rl0Jvy_[xj~HqzKv_A|D!&WfP8axRoVcf,U#k(v]v+ueunaXRf1Ju}'!g8u#Ri=jQw!sCunLprq>!,')~<5qeGzq9F{W=c##%s5au:5aU3CBE|;d4#X(D!a&6Vygx(b;#(=]ed?C2F{N<capoq2r[a&!aPa9,'Pw;5s:@@=I|,55w_h|@@=IzcP~=x'fCqB_2Wl2>aU@@=I|1OuNBc1Z+jTqIsBv=Wlc~Cw`fl2WlZ~AcTa%!Z+jTqIsBv=Wlb~Cw`fh2WlYk+uNqJsBv=WlSg,u3dca3#UXaMYa)TaB-=cM|7T#<bI}l5@B932:aV2G{BOuNBJq:|M!5Ezt=<B=C@a^<B57@2F{v>cB{/T#=ay<bI{3Jv6!a.6BKq0ah&+!5E}HP~Ef{978BaU@@=Iza<7d#.Y#978BaU@@=IzH~AJq0!(@@=IzG978BaU@@=IzFe,aU*Y&^^^bvJb,b:bFad!a,c2Ta>aL.bo6!a#CbTa'T#Re{2Wlh2@G{yg6t~Ro_NvdRfticuRQRllJv3&!x&c|zs@Jw3!%RflwpfkRlpKuL;%(!Re<@G|C2GzdhIvuBwgjAg-u0RjAKQB%!(GzZ@G|5NuuRl7d='T+Y#Vy[g<v~Rm!==G|>JvA!)@wma=]m1ifuaw&RmnLs@vT'!|/+[y,g:v>ReTJw1!#qX=x!eC{bLu+wT&)ZtZauq_~Graci&U#F|89:r_Lupvq!.)&2RlG8RfaC=x!eF{_h?rpWlmd&'!#X|&]k::xJey#`'T|+<E|&2@H|%dE#(^,g;u.RiEg6vjRiC9xCkA{O|zY#g=ucRmXKs0@!&*@G|m@awRknJuh!,3d(}gY}eJvj!%Rm):Jw3!%Rm+Rm-Ls0w(&!a(a#@b[|6cZ#X'7RkxWgAOu4ARn'dH'U#Y*Vz-Wm'CARm}d]*#a%^a*T'aK!a<9bV{PC=p*Jw4!&SgxcbB5r]idw(wBRmF7xFkt#&`(Rm/Rm8E|!JuY_9:Rl5=wrgr2:bbxd@xXfB(a*#T+!.X0X1Ta/a'T&RlDRfL>RlyARl9b[z[>RfZ:RlL:RfRwlg/ARl;9;RlxKv,A/!%7s69<74=BA5ba{-8Bde#`a<XaKYa1,a'P~=wxfB2bZ}}?C972@@=I}r8@55B9;5bb}G978B2@@=aybb}3j3vLv;<Jw3&!>Rfk=ayb^}4~Ad1#`*@@=aybb{w2@>==<bbz]dx+UY#^UaF!a9!bB'Ya1.!ajXa#%olRhD[y=3Dt#Ov5BrHKuMB%!(Rf^Wep~HrJwkiQjKr|~FRg)Ku+D#'!t5~GrF~?rDdV)UY,Z/_7RkuG{<~BrBg,rlsO:235B@bX}|d?a1!#`(6Vyn5@d##Y+jTv|vV~EfIj]uNpn~FRfH7Lq2vb1!a9-978BaU@@=Iz9978BbU}#~AJq0!(@@=Iz8978BaU@@=Iz7~AJQ|}!978BbU}!JvkaK!AdUa21-U#`a+(g/vsRn~Ou!5RPj:rmu9WhOjXuvvNr}:RhAj^v(pyw8unRn[kPr}p|u7vwv]RiSBd;pppzq@qHQa?(b.!a.a`@.|xa(hFv;Wiyj5uuv-7Riw~Cw`fg2WlU978BbU|wOuNBJqG!(P~EfD~CRlQcZ#X,k)u3vWs@u2]ksg;wEx'f@q1_2Wg.j]uNpn~FRfqJv]!15x'h{qG!(@@=IzK~CRl^j6v(us5x4i,#T(2WmY?C2F{1>Kq<aj1!*jTqIsBv=Wld~Cw`fj2Wl[j`v0u*~>RlT=c>Z,k#u3vWs@u2]kq<c1Z+jTqIsBv=Wle~Cw`fn2Wl]dn1#c(a(b^a2!b/bAT(bj!aDa7bu,a_a{c0!2T0g:v>ReD2@G{42@G{5~DpM~<5rc=Bx6i>{RT#RnI@zCx]y]z:2Jv[!zr5Awyk]9]k]dD(Y+X#6Vz.g=wKtgwhaCwgmTWj2Lu,w%_+/[y-B;b^xeg3u3Rj-2@bX{*KrJ<!+'@Wg(g?QRlC@Jv`!%b[zIwsfII}8JQ_@w|kW|=Jv(%!AqcOuNBJvEzh!bYzjLs@wP#(0!oy@>RkdJwMZtc3Dtd@BcG#T'9bWxg2@2Fznd*#Y+;2x'c}w<zizixNgwa#Z'U+!/!a'!a+w~g~z6wcn{Rn}wcnzRn|5Rh%=]nJg5vuRmvNvdRlvcprJu}w*az*a#!%.a.'Bot9qT]kj@Wg'ay2Gzv@Jv`!%b[zEwsfHI}1;ck#Ux`<Cbbx_Lu+w!a&0*!wko*wwo,So,}6Juqxf!E}PigQuyRm`d3(`#8>Rn%:A5B;bZ~%KvhCa!a2!x>k7#Uxb@b{#xaRk7Jw0!)>wwhlShl}6>wwhmShm}6CJvB!.x'hhvj{!!5Bwkhhbaz}x'hivjz~!5Bwkhibaz|xEhTrNu,v-vpD!a%&/)a3a.,%Ro2t[CE{)@3re9b]{%wjo09:rgc:Z&Ro6=<riifuaw&RmoKrNA!%(Ro4>Ro89;Ri`dSaL'UYzxZb)7Rka3xRhT&!,!#^1U}vbaz{>>@=be}yC@:D5bazzKu+A&!}{?ba}y>>@=be}wxBh[t`u~vJvr!%a!a()a,a0a4RoC=]o;Ju(!%RoGRhdwjh`=]oAg>w#Ro?g5vuRo=NvdRl|Ku]C.!&;RoEJvB!%RoORoMBx'h[v+_?w~h`}~5?w~hd~!xKh]oiptu-utv.vp!#%&a30a@a'a+(a/aOp(o~p!RoDJu(!%RoHRhewjha=]oBNvdRl}g>w#Ro@g5vuRo>c[#X']o<CauRoRAd-#Y':RkpauRoQKu]C.!&;RoFJvB!%RoNRoPBx'h]v+_?w~ha}t5?w~he}ue!/UbhYacXaW^Tc&a;b:a-c/#b&aja1(!cL+!bKbt!bmcRc9aIc?8[yW3Dtt94Rg`Jv}!&SiRMzBhEebShEMNuPRe>x7gL#TzuwjirRipc<Z&>on;>z=h-MSh.Mwqczx'a7vj&!>Re4@=ResJt__NuPRi*NuPRi)j]uNr|~FRfzKrJ>_+@Wfy@Wf]2WocKrJ<!+'@Wg%g/QRl@@Jv`!&awRl<wsfFIzgLu(w*!.*&ShBMwvhIRhI9;RhNx1hK'!#Sn]Mx1hK~0!#:2<H~7cNu+w7D*'1ZtW>Rn1~?rOc:Z&Rn2=<rQ<7wjh&=BSnLMc]#X(6Vz)w[b=a!U#9wzgMc3#&(RgMRitRis<x,gKt`ax!&+SioM=BSilMc3#&(RgKRinRimKurB,!&SiQMzBhDebShDM6BJQ!(P~Efx978B2@@=I}WLrJw!!,a*&@G}O@9wkibRid@@x'fKwC!&SlDMSfLMjUv~Q~EfKKv3@a+!(hFv-]mpx/hYZ(C5RiWz<o/MwkhY?So/M@x,gbvfB*&!SgEM:SoeeehFu3:Rgbda(,^TZa)X/7Sg[eb:2RgI~BrMC@wgkc:wwkcRerx3h(uUvK!&*,SnOM4Sh*MArRg;wHRh(x=h;rJvPwI!a4',a'0@Wg&=BSh/Mg>w=Rh=g3w*wwgGRgGcW(X#;Sg}M2Gzk@Jv`!&awRl=wsfGIz`dKZ*T'Y-:RhR7RhQg5u-p`j6v(us5d,#Y+~Awkia?RicOuNBwkibba}Ld6p~tyu_vbAa'a+!a/'a3aEa8a!>Sh,ebJv{!&Sh@ebSaReb9;SgwebNuPRi(NvdRl)NuPRi'hHu^<Rm^Jvv_@Wl(g;u1Si/ebKu'B&!*Sh?eb@Wl'z@aPeb95Si.ebcpputyvjB)!,&a+0a%ShAMWeK@G}C@WfJ9;RhMwvhH9w{ia}ix,hJvRA1(!zAn[MRhHx1hJ~*!#hFv(BSn[MBJQ!(@@=I~'978B2@@=I}2db.Ua<'X}+T#a0XaG2G}E;wkg|wuh!Rh!x,hZu,@)!&So0MVy)C5RiXACJvB!&5RiY5RiZg8w)cG}*T#2@bU}=KsA>(!a.3wkhZba~(x,h^u(A!&(SoCMRhb5Bz=h[eb?w~hb~6x,h_u(A!&(SoDMRhc5Bz=h]eb?w~hc~6e)aA1T#T,^^^c-bMb&blcPaP(a/!0!bA=b5c@a(!bfbrc#2afwmhARnjwchORnp2Wlf3DtsNvdRl-2@wpa<]m0bx(#:awRk2@Jw3!%RfhwpfgRlnKQB%!(G{V@G|'NuuRl6d='T+Y#VyUg<v~Rl~==G|<Jv+'!aYShC}6@B<5?ba~8@Jw3'!g2QRljhLrpWlOd+#Y'g.w'rIg>w*wgj@g-u0Rj@Lu+wT&)ZtUauq]~GrGci&U#F|39:rELrNvj!.%*RhCwunfw~nf~:9;Ri]>wtnhg;wHRnhx3hDs@v~!/+'@Wfr@9RkSNu&Rlo=@<5GzoKs0@_+@Wl+@awRkmJuh!-3d(}pY#qWJvj!%Rm(:Jw3!%Rm,Rm*de&!1U-U#`)Re;@G|.@9Ri82@wjfvRlq=@<5GzpLvOvr!).&2RlF8Rf`C=x!eE{.Jw3_g2QRlkhLrpWlPde(!#U{s,UXa*Ta'[y'g:v>ReS;x0PZ&RnlRnn~HrKJw1}f!=x!eB|2w]aP(#Xa&a*Ta.Ua2a7=]iOd'#Y&Ro&WnWg;u.RiDg6vjRiBNvdRlzhNvj]nYJuW_2Wm3x)kFze{9d])!a.!,Y01!#&aC!a3RndC=ox~BrC@2b^{pg,rlse7x'ksuq!%Rm.E{xidw(wBRmGx9o+)X#wwo-So-}69:Rl4@xSf@a#XZ'X)X,Ta(/ARl8b[xc>RfY:RlI:RfQwlg.ARl:9;Rlwdn'#^XafaQa1X1TaHTa)@b[{zcZ#X'7RkwWg@Ou4ARn&x)kG#{,g7u/RkGdH'U#Y*Vz'Wm&CARm|bx#(A]gUbUzJj9Q~=d,#Y(56H}l978H{U7d,0#U*2>ABb_xZ978BbU{e~AJQ{g!978BbU{hxMh?ad{oUYZ.x1h?{l!#:2<H{mx3n[t{vl!,&a%3Ro(z=iS}6ARnr=Bwsn^wvn`Rnbd`*T}B0!#^X'BG{c9b]{a>>@=be}F?JvS!&BG{d7BG}(Bde#`a1X,Ya@!a'P~=wxf@2bZ}I56B2@@=aybb}08@55B9;5bb}<j3vLv;<Jw3&!>Rfg=ayb^}&OuNBKuLA!)a!P~=x#fD{f2@>==<bbzl?C972@@=Ix^d6rSu,v7w*C(0a)a6#B+a%!sQ[y?3Dt%3[xn~<5rLOu!5p@Ku+D#'!t7~GrP~?rNKvlaya7'!h+v-5qMg=t|cd,U#5AAaa5Abb{S@52B5@a[@52B5Gx[iXueu;d<#`a(!/549C;ag>23ExY5@Dah89b^~689Jv)!~2b[~1Lv'w(%*!a#bX|aPrmawRe]keu7uhv-q6rxu,q`xTo]/a5aU!bNaDXbi!b-!ao!b<bwA!#5@B932:aV2G|:d-)Y#hJrL>RhG<7@C5<H|_=Cau:5aj5@B932:bJ|ng>vIbs)#?C2F|9jPv0w.vISh-MKvUaz(.!9ABbb|[5;5<H|Eg>unwfh;9:4E|YjQsBt|vjx'hYq3!(?C2F|J:2<BaY?C2F|GOu!5x,g|p{ah!-(?C2F|c9:4E|OjXuvvNr}:Rh&i[w*t|cd+U#jJvsu)vsSn~Mkfrmu9p}u7vwv]So!McW#Xa!ax5@A5aY:5;5<H|>kJv~vYrquJu3x4ib#T)2@SmZM?C2F|Bj:rmu9@xPhI(a*a#U#`a3-5Abb|L~@:RhK9:4E|0@52B5G|#C::aY?C2F|-:2<BaY?C2F|.5Jvk!a)javYrquJu3x4ia#T)2@SmYM?C2F|HAxPhH(!a#U#`a*-5Abb|4~@:RhJ9:4E|R@52B5G|F:2<BaY?C2F|Sc^#Xa2j=Qq5CJvB!-g<v{z;hhM?C2F|Zi[vrv{z;hiM?C2F|XKsA>!a)-g<v{z;h[eb?C2F|]i[vrv{z;h]eb?C2F|^iZu.vix,hZq3ah!.(?C2F|QOu!5ShXM:2<BaY?C2F|P",13494,2713,49,25,61),T;(function(e){e[e.VALUE_LENGTH=49152]=`VALUE_LENGTH`,e[e.FLAG13=8192]=`FLAG13`,e[e.BRANCH_LENGTH=8064]=`BRANCH_LENGTH`,e[e.JUMP_TABLE=127]=`JUMP_TABLE`,e[e.VALUE_MASK=8191]=`VALUE_MASK`})(T||(T={}));function E(e){"@babel/helpers - typeof";return E=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},E(e)}function de(e,t){if(E(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(E(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function fe(e){var t=de(e,`string`);return E(t)==`symbol`?t:t+``}function D(e,t,n){return(t=fe(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var O;(function(e){e[e.AMP=38]=`AMP`,e[e.NUM=35]=`NUM`,e[e.SEMI=59]=`SEMI`,e[e.EQUALS=61]=`EQUALS`,e[e.ZERO=48]=`ZERO`,e[e.NINE=57]=`NINE`,e[e.LOWER_A=97]=`LOWER_A`,e[e.LOWER_X=120]=`LOWER_X`})(O||(O={}));var k=32,pe=21,me=2097151,he=2047,ge=0;function _e(e){let t=e>>>pe;return t===he?ge:t}function ve(e){return e-O.ZERO>>>0<=9}function ye(e){return(e|k)-O.LOWER_A>>>0<=5}function be(e){return(e|k)-O.LOWER_A>>>0<=25}function xe(e){return e===O.EQUALS||be(e)||ve(e)}var Se;(function(e){e[e.EntityStart=0]=`EntityStart`,e[e.NumericStart=1]=`NumericStart`,e[e.NumericDecimal=2]=`NumericDecimal`,e[e.NumericHex=3]=`NumericHex`,e[e.NamedEntity=4]=`NamedEntity`})(Se||(Se={}));var Ce;(function(e){e[e.Legacy=0]=`Legacy`,e[e.Strict=1]=`Strict`,e[e.Attribute=2]=`Attribute`})(Ce||(Ce={}));function we(e,t,n,r){let i=(t&T.BRANCH_LENGTH)>>7,a=t&T.JUMP_TABLE;if(a){if(i===0)return r===a?n:-1;let t=r-a;if(t>>>0>=i)return-1;let o=e[n+t];return o===0?-1:n+i+o-1&65535}if(i===0)return-1;let o=i+1>>1,s=n+o+i;for(let t=0;t<i;t++){let i=e[n+(t>>1)]>>((t&1)<<3)&255;if(i===r)return s+e[n+o+t]&65535;if(i>r)return-1}return-1}function Te(e,t,n){return n===1?String.fromCharCode(e[t]&T.VALUE_MASK):n===2?String.fromCharCode(e[t+1]):String.fromCharCode(e[t+1],e[t+2])}function Ee(e,t,n){let r=t+1,i=0,a=r;if(r<n&&(e.charCodeAt(r)|k)===O.LOWER_X)for(r+=1,a=r;r<n;){let t=e.charCodeAt(r);if(ve(t))i=i*16+(t-O.ZERO);else if(ye(t))i=i*16+((t|k)-O.LOWER_A+10);else break;r+=1}else for(;r<n;){let t=e.charCodeAt(r)-O.ZERO;if(t>>>0>9)break;i=i*10+t,r+=1}if(r===a)return 0;r<n&&e.charCodeAt(r)===O.SEMI&&(r+=1),i>1114111&&(i=1114112);let o=r-t;return o>=he&&(ge=o,o=he),o<<pe|i}function De(e,t,n){let r=ue,i=e.indexOf(`&`);if(i<0)return e;let a=e.length,o=0,s=``,c=r[0],l=c&T.JUMP_TABLE,u=(c&T.BRANCH_LENGTH)>>7;do{let c=i+1,d=e.charCodeAt(c),f,p;if(d===O.NUM){let n=Ee(e,c,a);f=_e(n),t&&f>0&&e.charCodeAt(c+f-1)!==O.SEMI&&(f=0),p=f===0?``:ce(n&me)}else if(be(d)){f=0,p=``;let n=d-l,i;if(n>>>0<u){let e=r[1+n];i=e===0?-1:u+e&65535}else i=-1;let o=0,s=0,m=i<0?0:r[i],h=c+1;trie:for(;h<a;){for(;(m&(T.VALUE_LENGTH|T.FLAG13))===0&&(m&T.JUMP_TABLE)!==0;){let t=m&T.JUMP_TABLE,n=(m&T.BRANCH_LENGTH)>>7;if(n===0){if(e.charCodeAt(h)!==t)break trie;i+=1}else{let a=e.charCodeAt(h)-t;if(a>>>0>=n)break trie;let o=r[i+1+a];if(o===0)break trie;i=i+n+o&65535}if(m=r[i],h+=1,h>=a)break trie}if((m&(T.VALUE_LENGTH|T.FLAG13))===T.FLAG13){let t=(m&T.BRANCH_LENGTH)>>7;if(e.charCodeAt(h)!==(m&T.JUMP_TABLE))break;h+=1;let n=t-1,a=i+1,o=0;for(;o+1<n;o+=2){let t=r[a];if(e.charCodeAt(h)!==(t&255)||(h+=1,e.charCodeAt(h)!==(t>>8&255)))break trie;h+=1,a+=1}if(o<n){if(e.charCodeAt(h)!==(r[a]&255))break;h+=1}i+=1+(t>>1),m=r[i];continue}let n=m>>>14,l=e.charCodeAt(h);if(n!==0){if(l===O.SEMI){f=h-c+1,p=n===1?String.fromCharCode(m&T.VALUE_MASK):Te(r,i,n);break}if(!t&&(m&T.FLAG13)===0&&(f=h-c,o=i,s=n),n===1)break}let u=we(r,m,i+(n||1),l);if(u<0)break;i=u,m=r[i],h+=1}if(p===``){let e=m>>>14;e!==0&&!t&&(m&T.FLAG13)===0&&(f=h-c,o=i,s=e),f>0&&(p=Te(r,o,s))}}else f=0,p=``;f===0||n&&d!==O.NUM&&e.charCodeAt(c+f-1)!==O.SEMI&&c+f<a&&xe(e.charCodeAt(c+f))?i=c:(o<i&&(s+=e.slice(o,i)),s+=p,i=o=c+f),e.charCodeAt(i)!==O.AMP&&(i=e.indexOf(`&`,i))}while(i>=0);return s+e.slice(o)}function Oe(e){return De(e,!0,!1)}var ke=t({arrayReplaceAt:()=>je,asciiTrim:()=>R,callable:()=>Ae,escapeHtml:()=>M,escapeRE:()=>Ue,fromCodePoint:()=>A,isMdAsciiPunct:()=>I,isPunctChar:()=>We,isPunctCharCode:()=>F,isSpace:()=>N,isValidEntityCode:()=>Me,isWhiteSpace:()=>P,lib:()=>Ke,normalizeReference:()=>L,unescapeAll:()=>j,unescapeMd:()=>Le});function Ae(e){let t=function(...n){return Reflect.construct(e,n,new.target&&new.target!==t?new.target:e)};return Object.defineProperty(t,"name",{value:e.name}),Object.setPrototypeOf(t,e),t.prototype=e.prototype,t}function je(e,t,n){return[].concat(e.slice(0,t),n,e.slice(t+1))}function Me(e){return!(e>=55296&&e<=57343||e>=64976&&e<=65007||(e&65535)==65535||(e&65535)==65534||e>=0&&e<=8||e===11||e>=14&&e<=31||e>=127&&e<=159||e>1114111)}function A(e){if(e>65535){e-=65536;let t=55296+(e>>10),n=56320+(e&1023);return String.fromCharCode(t,n)}return String.fromCharCode(e)}var Ne=/\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g,Pe=RegExp(`${Ne.source}|&([a-z#][a-z0-9]{1,31});`,`gi`),Fe=/^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;function Ie(e,t){if(t.charCodeAt(0)===35&&Fe.test(t)){let n=t[1].toLowerCase()===`x`?parseInt(t.slice(2),16):parseInt(t.slice(1),10);return Me(n)?A(n):e}let n=Oe(e);return n===e?e:n}function Le(e){return e.indexOf(`\\`)<0?e:e.replace(Ne,`$1`)}function j(e){return e.indexOf(`\\`)<0&&e.indexOf(`&`)<0?e:e.replace(Pe,function(e,t,n){return t||Ie(e,n)})}var Re=/[&<>"]/,ze=/[&<>"]/g,Be={"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`};function Ve(e){return Be[e]}function M(e){return Re.test(e)?e.replace(ze,Ve):e}var He=/[.?*+^$[\]\\(){}|-]/g;function Ue(e){return e.replace(He,`\\$&`)}function N(e){switch(e){case 9:case 32:return!0}return!1}function P(e){if(e>=8192&&e<=8202)return!0;switch(e){case 9:case 10:case 11:case 12:case 13:case 32:case 160:case 5760:case 8239:case 8287:case 12288:return!0}return!1}function We(e){return ne.test(e)||re.test(e)}function F(e){return We(A(e))}function I(e){switch(e){case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 41:case 42:case 43:case 44:case 45:case 46:case 47:case 58:case 59:case 60:case 61:case 62:case 63:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 124:case 125:case 126:return!0;default:return!1}}function L(e){return e=e.trim().replace(/\s+/g,` `),e.toLowerCase().toUpperCase()}function Ge(e){return e===32||e===9||e===10||e===13}function R(e){let t=0;for(;t<e.length&&Ge(e.charCodeAt(t));t++);let n=e.length-1;for(;n>=t&&Ge(e.charCodeAt(n));n--);return e.slice(t,n+1)}var Ke={mdurl:x,ucmicro:S};function qe(e,t,n){let r,i,a,o,s=e.posMax,c=e.pos;for(e.pos=t+1,r=1;e.pos<s;){if(a=e.src.charCodeAt(e.pos),a===93&&(r--,r===0)){i=!0;break}if(o=e.pos,e.md.inline.skipToken(e),a===91){if(o===e.pos-1)r++;else if(n)return e.pos=c,-1}}let l=-1;return i&&(l=e.pos),e.pos=c,l}function Je(e,t,n){let r,i=t,a={ok:!1,pos:0,str:``};if(e.charCodeAt(i)===60){for(i++;i<n;){if(r=e.charCodeAt(i),r===10||r===60)return a;if(r===62)return a.pos=i+1,a.str=j(e.slice(t+1,i)),a.ok=!0,a;r===92&&i+1<n?i+=2:i++}return a}let o=0;for(;i<n&&(r=e.charCodeAt(i),!(r===32||r<32||r===127));)if(r===92&&i+1<n){if(e.charCodeAt(i+1)===32){i++;continue}i+=2}else{if(r===40&&(o++,o>32))return a;if(r===41){if(o===0)break;o--}i++}return t===i||o!==0||(a.str=j(e.slice(t,i)),a.pos=i,a.ok=!0),a}function Ye(e,t,n,r){let i,a=t,o={ok:!1,can_continue:!1,pos:0,str:``,marker:0};if(r)o.str=r.str,o.marker=r.marker;else{if(a>=n)return o;let r=e.charCodeAt(a);if(r!==34&&r!==39&&r!==40)return o;t++,a++,r===40&&(r=41),o.marker=r}for(;a<n;){if(i=e.charCodeAt(a),i===o.marker)return o.pos=a+1,o.str+=j(e.slice(t,a)),o.ok=!0,o;if(i===40&&o.marker===41)return o;i===92&&a+1<n&&a++,a++}return o.can_continue=!0,o.str+=j(e.slice(t,a)),o}var Xe=t({parseLinkDestination:()=>Je,parseLinkLabel:()=>qe,parseLinkTitle:()=>Ye}),z=class{constructor(e,t,n){D(this,`map`,null),D(this,`level`,0),D(this,`children`,null),D(this,`content`,``),D(this,`markup`,``),D(this,`info`,``),D(this,`block`,!1),D(this,`hidden`,!1),this.type=e,this.tag=t,this.attrs=null,this.nesting=n,this.meta=null}attrIndex(e){if(!this.attrs)return-1;let t=this.attrs;for(let n=0,r=t.length;n<r;n++)if(t[n][0]===e)return n;return-1}attrPush(e){this.attrs?this.attrs.push(e):this.attrs=[e]}attrSet(e,t){let n=this.attrIndex(e),r=[e,t];n<0?this.attrPush(r):this.attrs[n]=r}attrGet(e){let t=this.attrIndex(e),n=null;return t>=0&&(n=this.attrs[t][1]),n}attrJoin(e,t){let n=this.attrIndex(e);n<0?this.attrPush([e,t]):this.attrs[n][1]=`${this.attrs[n][1]} ${t}`}},B=class{constructor(){D(this,`__rules__`,[]),D(this,`__cache__`,null)}__find__(e){for(let t=0;t<this.__rules__.length;t++)if(this.__rules__[t].name===e)return t;return-1}__compile__(){let e=new Set;this.__rules__.forEach(t=>{t.enabled&&t.alt.forEach(t=>{t&&e.add(t)})}),this.__cache__=Object.create(null),this.__cache__[``]=[],this.__rules__.forEach(e=>{e.enabled&&this.__cache__[``].push(e.fn)}),e.forEach(e=>{this.__cache__[e]=[],this.__rules__.forEach(t=>{t.enabled&&t.alt.indexOf(e)>=0&&this.__cache__[e].push(t.fn)})})}at(e,t,n={}){let r=this.__find__(e);if(r===-1)throw Error(`Parser rule not found: ${e}`);this.__rules__[r].fn=t,this.__rules__[r].alt=n.alt||[],this.__cache__=null}before(e,t,n,r={}){let i=this.__find__(e);if(i===-1)throw Error(`Parser rule not found: ${e}`);this.__rules__.splice(i,0,{name:t,enabled:!0,fn:n,alt:r.alt||[]}),this.__cache__=null}after(e,t,n,r={}){let i=this.__find__(e);if(i===-1)throw Error(`Parser rule not found: ${e}`);this.__rules__.splice(i+1,0,{name:t,enabled:!0,fn:n,alt:r.alt||[]}),this.__cache__=null}push(e,t,n={}){this.__rules__.push({name:e,enabled:!0,fn:t,alt:n.alt||[]}),this.__cache__=null}enable(e,t=!1){Array.isArray(e)||(e=[e]);let n=[];return e.forEach(e=>{let r=this.__find__(e);if(r<0){if(t)return;throw Error(`Rules manager: invalid rule name ${e}`)}this.__rules__[r].enabled=!0,n.push(e)}),this.__cache__=null,n}enableOnly(e,t=!1){Array.isArray(e)||(e=[e]),this.__rules__.forEach(e=>{e.enabled=!1}),this.enable(e,t)}disable(e,t=!1){Array.isArray(e)||(e=[e]);let n=[];return e.forEach(e=>{let r=this.__find__(e);if(r<0){if(t)return;throw Error(`Rules manager: invalid rule name ${e}`)}this.__rules__[r].enabled=!1,n.push(e)}),this.__cache__=null,n}getRules(e){return this.__cache__||this.__compile__(),this.__cache__[e]||[]}},V={};V.code_inline=function(e,t,n,r,i){let a=e[t];return`<code${i.renderAttrs(a)}>${M(a.content)}</code>`},V.code_block=function(e,t,n,r,i){let a=e[t];return`<pre${i.renderAttrs(a)}><code>${M(e[t].content)}</code></pre>\n`},V.fence=function(e,t,n,r,i){let a=e[t],o=a.info?j(a.info).trim():``,s=``,c=``;if(o){let e=o.split(/(\s+)/g);s=e[0],c=e.slice(2).join(``)}let l;if(l=n.highlight&&n.highlight(a.content,s,c)||M(a.content),l.indexOf(`<pre`)===0)return l+`
`;if(o){let e=a.attrIndex(`class`),t=a.attrs?a.attrs.slice():[];e<0?t.push([`class`,`${n.langPrefix}${s}`]):(t[e]=[t[e][0],t[e][1]],t[e][1]+=` ${n.langPrefix}${s}`);let r={attrs:t};return`<pre><code${i.renderAttrs(r)}>${l}</code></pre>\n`}return`<pre><code${i.renderAttrs(a)}>${l}</code></pre>\n`},V.image=function(e,t,n,r,i){let a=e[t];return a.attrs[a.attrIndex(`alt`)][1]=i.renderInlineAsText(a.children,n,r),i.renderToken(e,t,n)},V.hardbreak=function(e,t,n){return n.xhtmlOut?`<br />
`:`<br>
`},V.softbreak=function(e,t,n){return n.breaks?n.xhtmlOut?`<br />
`:`<br>
`:`
`},V.text=function(e,t){return M(e[t].content)},V.html_block=function(e,t){return e[t].content},V.html_inline=function(e,t){return e[t].content};var Ze=class{constructor(){D(this,`rules`,Object.assign({},V))}renderAttrs(e){let t,n,r;if(!e.attrs)return``;for(r=``,t=0,n=e.attrs.length;t<n;t++)r+=` ${M(e.attrs[t][0])}="${M(String(e.attrs[t][1]))}"`;return r}renderToken(e,t,n){let r=e[t],i=``;if(r.hidden)return``;let a=t-1;for(;a>=0&&e[a].hidden&&e[a].nesting===0;)a--;r.block&&r.nesting!==-1&&a>=0&&e[a].hidden&&e[a].nesting===-1&&(i+=`
`),i+=(r.nesting===-1?`</`:`<`)+r.tag,i+=this.renderAttrs(r),r.nesting===0&&n.xhtmlOut&&(i+=` /`);let o=!1;if(r.block&&(o=!0,r.nesting===1)){let n=t+1;for(;n<e.length&&e[n].hidden&&e[n].nesting===0;)n++;if(n<e.length){let t=e[n];(t.type===`inline`||t.hidden||t.nesting===-1&&t.tag===r.tag)&&(o=!1)}}return i+=o?`>
`:`>`,i}renderInline(e,t,n){let r=``,i=this.rules;for(let a=0,o=e.length;a<o;a++){let o=e[a].type;i[o]===void 0?r+=this.renderToken(e,a,t):r+=i[o](e,a,t,n,this)}return r}renderInlineAsText(e,t,n){let r=``;for(let i=0,a=e.length;i<a;i++)switch(e[i].type){case`text`:case`code_inline`:r+=e[i].content;break;case`image`:r+=this.renderInlineAsText(e[i].children,t,n);break;case`html_inline`:case`html_block`:r+=e[i].content;break;case`softbreak`:case`hardbreak`:r+=`
`}return r}render(e,t,n){let r=``,i=this.rules;for(let a=0,o=e.length;a<o;a++){let o=e[a].type;o===`inline`?r+=this.renderInline(e[a].children,t,n):i[o]===void 0?r+=this.renderToken(e,a,t):r+=i[o](e,a,t,n,this)}return r}},Qe=class{constructor(e,t,n){D(this,`tokens`,[]),D(this,`inlineMode`,!1),D(this,`Token`,z),this.src=e,this.env=n,this.md=t}},$e=/\r\n?/g,et=/\0/g;function tt(e){let t;t=e.src.replace($e,`
`),t=t.replace(et,`�`),e.src=t}function nt(e){let t;e.inlineMode?(t=new e.Token(`inline`,``,0),t.content=e.src,t.map=[0,1],t.children=[],e.tokens.push(t)):e.md.block.parse(e.src,e.md,e.env,e.tokens)}function rt(e){let t=e.tokens,n=0;for(let e=0;e<t.length;e++)t[e].type!==`reference_definition`&&(e!==n&&(t[n]=t[e]),n++);t.length!==n&&(t.length=n)}function it(e){let t=e.tokens;for(let n=0,r=t.length;n<r;n++){let r=t[n];r.type===`inline`&&e.md.inline.parse(r.content,e.md,e.env,r.children)}}function at(e){return/^<a[>\s]/i.test(e)}function ot(e){return/^<\/a\s*>/i.test(e)}function st(e){let t=e.tokens;if(e.md.options.linkify)for(let n=0,r=t.length;n<r;n++){if(t[n].type!==`inline`||!e.md.linkify.test(t[n].content))continue;let r=t[n].children,i=[],a=0;for(let t=r.length-1;t>=0;t--){let n=r[t];if(n.type===`link_close`)for(t--;r[t].level!==n.level&&r[t].type!==`link_open`;)t--;else if(n.type===`html_inline`&&(at(n.content)&&a>0&&a--,ot(n.content)&&a++),!(a>0)&&n.type===`text`&&e.md.linkify.test(n.content)){let a=n.content,o=e.md.linkify.match(a),s=[],c=n.level,l=0;o.length>0&&o[0].index===0&&t>0&&r[t-1].type===`text_special`&&(o=o.slice(1));for(let t=0;t<o.length;t++){let n=o[t].url,r=e.md.normalizeLink(n);if(!e.md.validateLink(r))continue;let i=o[t].text;i=o[t].schema?o[t].schema===`mailto:`&&!/^mailto:/i.test(i)?e.md.normalizeLinkText(`mailto:${i}`).replace(/^mailto:/,``):e.md.normalizeLinkText(i):e.md.normalizeLinkText(`http://${i}`).replace(/^http:\/\//,``);let u=o[t].index;if(u>l){let t=new e.Token(`text`,``,0);t.content=a.slice(l,u),t.level=c,s.push(t)}let d=new e.Token(`link_open`,`a`,1);d.attrs=[[`href`,r]],d.level=c++,d.markup=`linkify`,d.info=`auto`,s.push(d);let f=new e.Token(`text`,``,0);f.content=i,f.level=c,s.push(f);let p=new e.Token(`link_close`,`a`,-1);p.level=--c,p.markup=`linkify`,p.info=`auto`,s.push(p),l=o[t].lastIndex}if(l<a.length){let t=new e.Token(`text`,``,0);t.content=a.slice(l),t.level=c,s.push(t)}i.push({index:t,nodes:s})}}if(i.length>0){let e=r.length;for(let t of i)e+=t.nodes.length-1;let a=Array(e),o=0,s=0;i.reverse();for(let e=0;e<r.length;e++){let t=i[o];if((t==null?void 0:t.index)===e){for(let e of t.nodes)a[s++]=e;o++}else a[s++]=r[e]}t[n].children=a}}}var ct=/\+-|\.\.|\?\?\?\?|!!!!|,,|--/,lt=/\((c|tm|r)\)/i,ut=/\((c|tm|r)\)/gi,dt={c:`©`,r:`®`,tm:`™`};function ft(e,t){return dt[t.toLowerCase()]}function pt(e){let t=0;for(let n=e.length-1;n>=0;n--){let r=e[n];r.type===`text`&&!t&&(r.content=r.content.replace(ut,ft)),r.type===`link_open`&&r.info===`auto`&&t--,r.type===`link_close`&&r.info===`auto`&&t++}}function mt(e){let t=0;for(let n=e.length-1;n>=0;n--){let r=e[n];r.type===`text`&&!t&&ct.test(r.content)&&(r.content=r.content.replace(/\+-/g,`±`).replace(/\.{2,}/g,`…`).replace(/([?!])…/g,`$1..`).replace(/([?!]){4,}/g,`$1$1$1`).replace(/,{2,}/g,`,`).replace(/(^|[^-])---(?=[^-]|$)/gm,`$1—`).replace(/(^|\s)--(?=\s|$)/gm,`$1–`).replace(/(^|[^-\s])--(?=[^-\s]|$)/gm,`$1–`)),r.type===`link_open`&&r.info===`auto`&&t--,r.type===`link_close`&&r.info===`auto`&&t++}}function ht(e){let t;if(e.md.options.typographer)for(t=e.tokens.length-1;t>=0;t--)e.tokens[t].type===`inline`&&(lt.test(e.tokens[t].content)&&pt(e.tokens[t].children),ct.test(e.tokens[t].content)&&mt(e.tokens[t].children))}var gt=/['"]/,_t=/['"]/g,vt=`’`,yt=1e3;function bt(e,t,n){for(;e.length>n;){let n=e.pop();n.isSingleQuote?t.single=n.prevSameQuoteIdx:t.double=n.prevSameQuoteIdx}}function H(e,t,n,r){e[t]||(e[t]=[]),e[t].push({pos:n,ch:r})}function xt(e,t){let n=``,r=0;t.sort((e,t)=>e.pos-t.pos);for(let i=0;i<t.length;i++){let a=t[i];n+=e.slice(r,a.pos)+a.ch,r=a.pos+1}return n+e.slice(r)}function St(e,t){let n,r=[],i={single:-1,double:-1},a={};for(let o=0;o<e.length;o++){let s=e[o],c=e[o].level;for(n=r.length-1;n>=0&&!(r[n].level<=c);n--);if(bt(r,i,n+1),s.type!==`text`)continue;let l=s.content,u=0,d=l.length;OUTER:for(;u<d;){_t.lastIndex=u;let s=_t.exec(l);if(!s)break;let f=!0,p=!0;u=s.index+1;let m=s[0]===`'`,h=32;if(s.index-1>=0)h=l.charCodeAt(s.index-1);else for(n=o-1;n>=0&&e[n].type!==`softbreak`&&e[n].type!==`hardbreak`;n--)if(e[n].content){h=e[n].content.charCodeAt(e[n].content.length-1);break}let g=32;if(u<d)g=l.charCodeAt(u);else for(n=o+1;n<e.length&&e[n].type!==`softbreak`&&e[n].type!==`hardbreak`;n++)if(e[n].content){g=e[n].content.charCodeAt(0);break}let _=I(h)||F(h),v=I(g)||F(g),y=P(h),b=P(g);if(b?f=!1:v&&(y||_||(f=!1)),y?p=!1:_&&(b||v||(p=!1)),g===34&&s[0]===`"`&&h>=48&&h<=57&&(p=f=!1),f&&p&&(f=_,p=v),!f&&!p)m&&H(a,o,s.index,vt);else{if(p&&(n=m?i.single:i.double,n>=0&&r[n].level===c)){let e=r[n],c,l;m?(c=t.md.options.quotes[2],l=t.md.options.quotes[3]):(c=t.md.options.quotes[0],l=t.md.options.quotes[1]),H(a,o,s.index,l),H(a,e.tokenIdx,e.contentPos,c),bt(r,i,n);continue OUTER}if(f){if(r.length>=yt)return;r.push({tokenIdx:o,contentPos:s.index,isSingleQuote:m,level:c,prevSameQuoteIdx:m?i.single:i.double}),m?i.single=r.length-1:i.double=r.length-1}else p&&m&&H(a,o,s.index,vt)}}}Object.keys(a).forEach(function(t){let n=Number(t);e[n].content=xt(e[n].content,a[t])})}function Ct(e){if(e.md.options.typographer)for(let t=e.tokens.length-1;t>=0;t--)e.tokens[t].type===`inline`&&gt.test(e.tokens[t].content)&&St(e.tokens[t].children,e)}function wt(e){let t,n,r=e.length;for(t=0;t<r;t++)e[t].type===`text_special`&&(e[t].type=`text`);for(t=n=0;t<r;t++)e[t].type===`text`&&t+1<r&&e[t+1].type===`text`?e[t+1].content=e[t].content+e[t+1].content:(t!==n&&(e[n]=e[t]),n++);t!==n&&(e.length=n)}function Tt(e){let t,n,r=e.tokens,i=r.length;for(let e=0;e<i;e++){if(r[e].type!==`inline`)continue;let i=r[e].children,a=i.length;for(t=0;t<a;t++)i[t].type===`text_special`&&(i[t].type=`text`),i[t].children&&wt(i[t].children);for(t=n=0;t<a;t++)i[t].type===`text`&&t+1<a&&i[t+1].type===`text`?i[t+1].content=i[t].content+i[t+1].content:(t!==n&&(i[n]=i[t]),n++);t!==n&&(i.length=n)}}var Et=[[`normalize`,tt],[`block`,nt],[`strip_references`,rt],[`inline`,it],[`linkify`,st],[`replacements`,ht],[`smartquotes`,Ct],[`text_join`,Tt]],Dt=class{constructor(){D(this,`ruler`,new B),D(this,`State`,Qe);for(let e=0;e<Et.length;e++)this.ruler.push(Et[e][0],Et[e][1])}process(e){let t=this.ruler.getRules(``);for(let n=0,r=t.length;n<r;n++)t[n](e)}},Ot=class{constructor(e,t,n,r){D(this,`bMarks`,[]),D(this,`eMarks`,[]),D(this,`tShift`,[]),D(this,`sCount`,[]),D(this,`bsCount`,[]),D(this,`blkIndent`,0),D(this,`line`,0),D(this,`lineMax`,0),D(this,`tight`,!1),D(this,`listIndent`,-1),D(this,`parentType`,`root`),D(this,`level`,0),D(this,`Token`,z),this.src=e,this.md=t,this.env=n,this.tokens=r;let i=this.src;for(let e=0,t=0,n=0,r=0,a=i.length,o=!1;t<a;t++){let s=i.charCodeAt(t);if(!o){if(N(s)){n++,s===9?r+=4-r%4:r++;continue}o=!0}(s===10||t===a-1)&&(s!==10&&t++,this.bMarks.push(e),this.eMarks.push(t),this.tShift.push(n),this.sCount.push(r),this.bsCount.push(0),o=!1,n=0,r=0,e=t+1)}this.bMarks.push(i.length),this.eMarks.push(i.length),this.tShift.push(0),this.sCount.push(0),this.bsCount.push(0),this.lineMax=this.bMarks.length-1}push(e,t,n){let r=new z(e,t,n);return r.block=!0,n<0&&this.level--,r.level=this.level,n>0&&this.level++,this.tokens.push(r),r}isEmpty(e){return this.bMarks[e]+this.tShift[e]>=this.eMarks[e]}skipEmptyLines(e){for(let t=this.lineMax;e<t&&!(this.bMarks[e]+this.tShift[e]<this.eMarks[e]);e++);return e}skipSpaces(e){for(let t=this.src.length;e<t&&N(this.src.charCodeAt(e));e++);return e}skipSpacesBack(e,t){if(e<=t)return e;for(;e>t;)if(!N(this.src.charCodeAt(--e)))return e+1;return e}skipChars(e,t){for(let n=this.src.length;e<n&&this.src.charCodeAt(e)===t;e++);return e}skipCharsBack(e,t,n){if(e<=n)return e;for(;e>n;)if(t!==this.src.charCodeAt(--e))return e+1;return e}getLines(e,t,n,r){if(e>=t)return``;let i=Array(t-e);for(let a=0,o=e;o<t;o++,a++){let e=0,s=this.bMarks[o],c=s,l;for(l=o+1<t||r?this.eMarks[o]+1:this.eMarks[o];c<l&&e<n;){let t=this.src.charCodeAt(c);if(N(t))t===9?e+=4-(e+this.bsCount[o])%4:e++;else if(c-s<this.tShift[o])e++;else break;c++}e>n?i[a]=Array(e-n+1).join(` `)+this.src.slice(c,l):i[a]=this.src.slice(c,l)}return i.join(``)}},kt=65536;function At(e,t){let n=e.bMarks[t]+e.tShift[t],r=e.eMarks[t];return e.src.slice(n,r)}function jt(e){let t=[],n=e.length,r=0,i=e.charCodeAt(r),a=!1,o=0,s=``;for(;r<n;)i===124&&(a?(s+=e.substring(o,r-1),o=r):(t.push(s+e.substring(o,r)),s=``,o=r+1)),a=i===92,r++,i=e.charCodeAt(r);return t.push(s+e.substring(o)),t}function Mt(e,t,n,r){if(t+2>n)return!1;let i=t+1;if(e.sCount[i]<e.blkIndent||e.sCount[i]-e.blkIndent>=4)return!1;let a=e.bMarks[i]+e.tShift[i];if(a>=e.eMarks[i])return!1;let o=e.src.charCodeAt(a++);if(o!==124&&o!==45&&o!==58||a>=e.eMarks[i])return!1;let s=e.src.charCodeAt(a++);if(s!==124&&s!==45&&s!==58&&!N(s)||o===45&&N(s))return!1;for(;a<e.eMarks[i];){let t=e.src.charCodeAt(a);if(t!==124&&t!==45&&t!==58&&!N(t))return!1;a++}let c=At(e,t+1),l=c.split(`|`),u=[];for(let e=0;e<l.length;e++){let t=l[e].trim();if(!t){if(e===0||e===l.length-1)continue;return!1}if(!/^:?-+:?$/.test(t))return!1;t.charCodeAt(t.length-1)===58?u.push(t.charCodeAt(0)===58?`center`:`right`):t.charCodeAt(0)===58?u.push(`left`):u.push(``)}if(c=At(e,t).trim(),c.indexOf(`|`)===-1||e.sCount[t]-e.blkIndent>=4)return!1;l=jt(c),l.length&&l[0]===``&&l.shift(),l.length&&l[l.length-1]===``&&l.pop();let d=l.length;if(d===0||d!==u.length)return!1;if(r)return!0;let f=e.parentType;e.parentType=`table`;let p=e.md.block.ruler.getRules(`blockquote`),m=e.push(`table_open`,`table`,1),h=[t,0];m.map=h;let g=e.push(`thead_open`,`thead`,1);g.map=[t,t+1];let _=e.push(`tr_open`,`tr`,1);_.map=[t,t+1];for(let t=0;t<l.length;t++){let n=e.push(`th_open`,`th`,1);u[t]&&(n.attrs=[[`style`,`text-align:${u[t]}`]]);let r=e.push(`inline`,``,0);r.content=l[t].trim(),r.children=[],e.push(`th_close`,`th`,-1)}e.push(`tr_close`,`tr`,-1),e.push(`thead_close`,`thead`,-1);let v,y=0;for(i=t+2;i<n&&!(e.sCount[i]<e.blkIndent);i++){let r=!1;for(let t=0,a=p.length;t<a;t++)if(p[t](e,i,n,!0)){r=!0;break}if(r||(c=At(e,i).trim(),!c)||e.sCount[i]-e.blkIndent>=4||(l=jt(c),l.length&&l[0]===``&&l.shift(),l.length&&l[l.length-1]===``&&l.pop(),y+=d-l.length,y>kt))break;if(i===t+2){let n=e.push(`tbody_open`,`tbody`,1);n.map=v=[t+2,0]}let a=e.push(`tr_open`,`tr`,1);a.map=[i,i+1];for(let t=0;t<d;t++){let n=e.push(`td_open`,`td`,1);u[t]&&(n.attrs=[[`style`,`text-align:${u[t]}`]]);let r=e.push(`inline`,``,0);r.content=l[t]?l[t].trim():``,r.children=[],e.push(`td_close`,`td`,-1)}e.push(`tr_close`,`tr`,-1)}return v&&(e.push(`tbody_close`,`tbody`,-1),v[1]=i),e.push(`table_close`,`table`,-1),h[1]=i,e.parentType=f,e.line=i,!0}function Nt(e,t,n){if(e.sCount[t]-e.blkIndent<4)return!1;let r=t+1,i=r;for(;r<n;)if(e.isEmpty(r))r++;else if(e.sCount[r]-e.blkIndent>=4)r++,i=r;else break;e.line=i;let a=e.push(`code_block`,`code`,0);return a.content=e.getLines(t,i,4+e.blkIndent,!1)+`
`,a.map=[t,e.line],!0}function Pt(e,t,n,r){let i=e.bMarks[t]+e.tShift[t],a=e.eMarks[t];if(e.sCount[t]-e.blkIndent>=4||i+3>a)return!1;let o=e.src.charCodeAt(i);if(o!==126&&o!==96)return!1;let s=i;i=e.skipChars(i,o);let c=i-s;if(c<3)return!1;let l=e.src.slice(s,i),u=e.src.slice(i,a);if(o===96&&u.indexOf(String.fromCharCode(o))>=0)return!1;if(r)return!0;let d=t,f=!1;for(;d++,!(d>=n||(i=s=e.bMarks[d]+e.tShift[d],a=e.eMarks[d],i<a&&e.sCount[d]<e.blkIndent));)if(e.src.charCodeAt(i)===o&&!(e.sCount[d]-e.blkIndent>=4)&&(i=e.skipChars(i,o),!(i-s<c)&&(i=e.skipSpaces(i),!(i<a)))){f=!0;break}c=e.sCount[t],e.line=d+ +!!f;let p=e.push(`fence`,`code`,0);return p.info=u,p.content=e.getLines(t+1,d,c,!0),p.markup=l,p.map=[t,e.line],!0}function Ft(e,t,n,r){let i=e.bMarks[t]+e.tShift[t],a=e.eMarks[t],o=e.lineMax;if(e.sCount[t]-e.blkIndent>=4||e.src.charCodeAt(i)!==62)return!1;if(r)return!0;let s=[],c=[],l=[],u=[],d=e.md.block.ruler.getRules(`blockquote`),f=e.parentType;e.parentType=`blockquote`;let p=!1,m;for(m=t;m<n;m++){let t=e.sCount[m]<e.blkIndent;if(i=e.bMarks[m]+e.tShift[m],a=e.eMarks[m],i>=a)break;if(e.src.charCodeAt(i++)===62&&!t){let t=e.sCount[m]+1,n,r;e.src.charCodeAt(i)===32?(i++,t++,r=!1,n=!0):e.src.charCodeAt(i)===9?(n=!0,(e.bsCount[m]+t)%4==3?(i++,t++,r=!1):r=!0):n=!1;let o=t;for(s.push(e.bMarks[m]),e.bMarks[m]=i;i<a;){let t=e.src.charCodeAt(i);if(N(t))t===9?o+=4-(o+e.bsCount[m]+ +!!r)%4:o++;else break;i++}p=i>=a,c.push(e.bsCount[m]),e.bsCount[m]=e.sCount[m]+1+ +!!n,l.push(e.sCount[m]),e.sCount[m]=o-t,u.push(e.tShift[m]),e.tShift[m]=i-e.bMarks[m];continue}if(p)break;let r=!1;for(let t=0,i=d.length;t<i;t++)if(d[t](e,m,n,!0)){r=!0;break}if(r){e.lineMax=m,e.blkIndent!==0&&(s.push(e.bMarks[m]),c.push(e.bsCount[m]),u.push(e.tShift[m]),l.push(e.sCount[m]),e.sCount[m]-=e.blkIndent);break}s.push(e.bMarks[m]),c.push(e.bsCount[m]),u.push(e.tShift[m]),l.push(e.sCount[m]),e.sCount[m]=-1}let h=e.blkIndent;e.blkIndent=0;let g=e.push(`blockquote_open`,`blockquote`,1);g.markup=`>`;let _=[t,0];g.map=_,e.md.block.tokenize(e,t,m);let v=e.push(`blockquote_close`,`blockquote`,-1);v.markup=`>`,e.lineMax=o,e.parentType=f,_[1]=e.line;for(let n=0;n<u.length;n++)e.bMarks[n+t]=s[n],e.tShift[n+t]=u[n],e.sCount[n+t]=l[n],e.bsCount[n+t]=c[n];return e.blkIndent=h,!0}function It(e,t,n,r){let i=e.eMarks[t];if(e.sCount[t]-e.blkIndent>=4)return!1;let a=e.bMarks[t]+e.tShift[t],o=e.src.charCodeAt(a++);if(o!==42&&o!==45&&o!==95)return!1;let s=1;for(;a<i;){let t=e.src.charCodeAt(a++);if(t!==o&&!N(t))return!1;t===o&&s++}if(s<3)return!1;if(r)return!0;e.line=t+1;let c=e.push(`hr`,`hr`,0);return c.map=[t,e.line],c.markup=Array(s+1).join(String.fromCharCode(o)),!0}function Lt(e,t){let n=e.eMarks[t],r=e.bMarks[t]+e.tShift[t],i=e.src.charCodeAt(r++);return i!==42&&i!==45&&i!==43||r<n&&!N(e.src.charCodeAt(r))?-1:r}function Rt(e,t){let n=e.bMarks[t]+e.tShift[t],r=e.eMarks[t],i=n;if(i+1>=r)return-1;let a=e.src.charCodeAt(i++);if(a<48||a>57)return-1;for(;;){if(i>=r)return-1;if(a=e.src.charCodeAt(i++),a>=48&&a<=57){if(i-n>=10)return-1}else{if(a===41||a===46)break;return-1}}return i<r&&(a=e.src.charCodeAt(i),!N(a))?-1:i}function zt(e,t){let n=e.level+2;for(let r=t+2,i=e.tokens.length-2;r<i;r++)e.tokens[r].level===n&&e.tokens[r].type===`paragraph_open`&&(e.tokens[r+2].hidden=!0,e.tokens[r].hidden=!0,r+=2)}function Bt(e,t,n,r){let i,a,o,s,c=t,l=!0;if(e.sCount[c]-e.blkIndent>=4||e.listIndent>=0&&e.sCount[c]-e.listIndent>=4&&e.sCount[c]<e.blkIndent)return!1;let u=!1;r&&e.parentType===`paragraph`&&e.sCount[c]>=e.blkIndent&&(u=!0);let d,f,p;if((p=Rt(e,c))>=0){if(d=!0,o=e.bMarks[c]+e.tShift[c],f=Number(e.src.slice(o,p-1)),u&&f!==1)return!1}else if((p=Lt(e,c))>=0)d=!1;else return!1;if(u&&e.skipSpaces(p)>=e.eMarks[c])return!1;if(r)return!0;let m=e.src.charCodeAt(p-1),h=e.tokens.length;d?(s=e.push(`ordered_list_open`,`ol`,1),f!==1&&(s.attrs=[[`start`,f]])):s=e.push(`bullet_list_open`,`ul`,1);let g=[c,0];s.map=g,s.markup=String.fromCharCode(m);let _=!1,v=e.md.block.ruler.getRules(`list`),y=e.parentType;for(e.parentType=`list`;c<n;){a=p,i=e.eMarks[c];let t=e.sCount[c]+p-(e.bMarks[c]+e.tShift[c]),r=t;for(;a<i;){let t=e.src.charCodeAt(a);if(t===9)r+=4-(r+e.bsCount[c])%4;else if(t===32)r++;else break;a++}let u=a,f;f=u>=i?1:r-t,f>4&&(f=1);let h=t+f;s=e.push(`list_item_open`,`li`,1),s.markup=String.fromCharCode(m);let g=[c,0];s.map=g,d&&(s.info=e.src.slice(o,p-1));let y=e.tight,b=e.tShift[c],x=e.sCount[c],S=e.listIndent;if(e.listIndent=e.blkIndent,e.blkIndent=h,e.tight=!0,e.tShift[c]=u-e.bMarks[c],e.sCount[c]=r,u>=i&&e.isEmpty(c+1)?e.line=Math.min(e.line+2,n):e.md.block.tokenize(e,c,n),(!e.tight||_)&&(l=!1),_=e.line-c>1&&e.isEmpty(e.line-1),e.blkIndent=e.listIndent,e.listIndent=S,e.tShift[c]=b,e.sCount[c]=x,e.tight=y,s=e.push(`list_item_close`,`li`,-1),s.markup=String.fromCharCode(m),c=e.line,g[1]=c,c>=n||e.sCount[c]<e.blkIndent||e.sCount[c]-e.blkIndent>=4)break;let C=!1;for(let t=0,r=v.length;t<r;t++)if(v[t](e,c,n,!0)){C=!0;break}if(C)break;if(d){if(p=Rt(e,c),p<0)break;o=e.bMarks[c]+e.tShift[c]}else if(p=Lt(e,c),p<0)break;if(m!==e.src.charCodeAt(p-1))break}return s=d?e.push(`ordered_list_close`,`ol`,-1):e.push(`bullet_list_close`,`ul`,-1),s.markup=String.fromCharCode(m),g[1]=c,e.line=c,e.parentType=y,l&&zt(e,h),!0}var Vt=999;function Ht(e){let t=e.length;for(let n=0;n<e.length-1;n++){let r=e.charCodeAt(n);if(r<55296||r>56319)continue;let i=e.charCodeAt(n+1);i>=56320&&i<=57343&&(t--,n++)}return t}function U(e,t){return Math.min(e.eMarks[t]+1,e.src.length)}function W(e,t){let n=e.lineMax;if(t>=n||e.isEmpty(t))return-1;let r=!1;if(e.sCount[t]-e.blkIndent>3&&(r=!0),e.sCount[t]<0&&(r=!0),!r){let r=e.md.block.ruler.getRules(`reference`),i=e.parentType;e.parentType=`reference`;let a=!1;for(let i=0,o=r.length;i<o;i++)if(r[i](e,t,n,!0)){a=!0;break}if(e.parentType=i,a)return-1}return e.bMarks[t]+e.tShift[t]}function Ut(e,t,n,r){let i=e.src,a=e.bMarks[t]+e.tShift[t],o=t+1;if(e.sCount[t]-e.blkIndent>=4||i.charCodeAt(a)!==91)return!1;let s=U(e,t),c=``,l=-1,u=++a;for(;a<s;){if(c.length+a-u>Vt*2)return!1;let t=i.charCodeAt(a);if(t===91)return!1;if(t===93){l=a;break}if(t===92&&(t=i.charCodeAt(++a)),t===10&&a<s){let t=W(e,o);if(t<0)return!1;c+=i.slice(u,s),a=u=t,s=U(e,o++)}else a++}if(l<0||i.charCodeAt(l+1)!==58||(c+=i.slice(u,l),c.length>Vt&&Ht(c)>Vt))return!1;for(a=l+2;a<s;){let t=i.charCodeAt(a);if(t===10){let t=W(e,o);if(t<0)break;a=t,s=U(e,o++)}else if(N(t))a++;else break}let d=e.md.helpers.parseLinkDestination(i,a,s);if(!d.ok)return!1;let f=e.md.normalizeLink(d.str);if(!e.md.validateLink(f))return!1;a=d.pos;let p=a,m=s,h=o;for(;a<s;){let t=i.charCodeAt(a);if(t===10){let t=W(e,o);if(t<0)break;a=t,s=U(e,o++)}else if(N(t))a++;else break}let g=a,_=e.md.helpers.parseLinkTitle(i,a,s);for(;_.can_continue;){let t=W(e,o);if(t<0)break;a=t,s=U(e,o++),_=e.md.helpers.parseLinkTitle(i,a,s,_)}let v;for(g!==p&&_.ok?(v=_.str,a=_.pos):(v=``,a=p,s=m,o=h);a<s&&N(i.charCodeAt(a));)a++;if(a<s&&i.charCodeAt(a)!==10&&v)for(v=``,a=p,s=m,o=h;a<s&&N(i.charCodeAt(a));)a++;if(a<s&&i.charCodeAt(a)!==10)return!1;let y=L(c);if(!y)return!1;if(r)return!0;e.env.references===void 0&&(e.env.references={}),e.env.references[y]===void 0&&(e.env.references[y]={title:v,href:f});let b=e.push(`reference_definition`,``,0);b.map=[t,o],b.hidden=!0;let x=Object.create(null);return x.label=y,b.meta=x,e.line=o,!0}var Wt=`address.article.aside.base.basefont.blockquote.body.caption.center.col.colgroup.dd.details.dialog.dir.div.dl.dt.fieldset.figcaption.figure.footer.form.frame.frameset.h1.h2.h3.h4.h5.h6.head.header.hr.html.iframe.legend.li.link.main.menu.menuitem.nav.noframes.ol.optgroup.option.p.param.search.section.summary.table.tbody.td.tfoot.th.thead.title.tr.track.ul`.split(`.`),Gt=`<[A-Za-z][A-Za-z0-9\\-]*(?:\\s+[a-zA-Z_:][a-zA-Z0-9:._-]*(?:\\s*=\\s*(?:[^"'=<>\`\\x00-\\x20]+|'[^']*'|"[^"]*"))?)*\\s*\\/?>`,Kt=`<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>`;RegExp(`^(?:${Gt}|${Kt}|<!---?>|<!--(?:[^-]|-[^-]|--[^>])*-->|<[?][\\s\\S]*?[?]>|<![A-Za-z][^>]*>|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>)`);var qt=RegExp(`^(?:${Gt}|${Kt})`),G=[[/^<(script|pre|style|textarea)(?=(\s|>|$))/i,/<\/(script|pre|style|textarea)>/i,!0],[/^<!--/,/-->/,!0],[/^<\?/,/\?>/,!0],[/^<![A-Za-z]/,/>/,!0],[/^<!\[CDATA\[/,/\]\]>/,!0],[RegExp(`^</?(${Wt.join(`|`)})(?=(\\s|/?>|$))`,`i`),/^$/,!0],[RegExp(`${qt.source}\\s*$`),/^$/,!1]];function Jt(e,t,n,r){let i=e.bMarks[t]+e.tShift[t],a=e.eMarks[t];if(e.sCount[t]-e.blkIndent>=4||!e.md.options.html||e.src.charCodeAt(i)!==60)return!1;let o=e.src.slice(i,a),s=0;for(;s<G.length&&!G[s][0].test(o);s++);if(s===G.length)return!1;if(r)return G[s][2];let c=t+1,l=G[s][1].test(``);if(!G[s][1].test(o)){for(;c<n&&!(e.sCount[c]<e.blkIndent&&(l||!e.isEmpty(c)));c++)if(i=e.bMarks[c]+e.tShift[c],a=e.eMarks[c],o=e.src.slice(i,a),G[s][1].test(o)){o.length!==0&&c++;break}}e.line=c;let u=e.push(`html_block`,``,0);return u.map=[t,c],u.content=e.getLines(t,c,e.blkIndent,!0),!0}function Yt(e,t,n,r){let i=e.bMarks[t]+e.tShift[t],a=e.eMarks[t];if(e.sCount[t]-e.blkIndent>=4)return!1;let o=e.src.charCodeAt(i);if(o!==35||i>=a)return!1;let s=1;for(o=e.src.charCodeAt(++i);o===35&&i<a&&s<=6;)s++,o=e.src.charCodeAt(++i);if(s>6||i<a&&!N(o))return!1;if(r)return!0;a=e.skipSpacesBack(a,i);let c=e.skipCharsBack(a,35,i);c>i&&N(e.src.charCodeAt(c-1))&&(a=c),e.line=t+1;let l=e.push(`heading_open`,`h${s}`,1);l.markup=`########`.slice(0,s),l.map=[t,e.line];let u=e.push(`inline`,``,0);u.content=R(e.src.slice(i,a)),u.map=[t,e.line],u.children=[];let d=e.push(`heading_close`,`h${s}`,-1);return d.markup=`########`.slice(0,s),!0}function Xt(e,t,n){let r=e.md.block.ruler.getRules(`paragraph`);if(e.sCount[t]-e.blkIndent>=4)return!1;let i=e.parentType;e.parentType=`paragraph`;let a=0,o,s=t+1;for(;s<n&&!e.isEmpty(s);s++){if(e.sCount[s]-e.blkIndent>3)continue;if(e.sCount[s]>=e.blkIndent){let t=e.bMarks[s]+e.tShift[s],n=e.eMarks[s];if(t<n&&(o=e.src.charCodeAt(t),(o===45||o===61)&&(t=e.skipChars(t,o),t=e.skipSpaces(t),t>=n))){a=o===61?1:2;break}}if(e.sCount[s]<0)continue;let t=!1;for(let i=0,a=r.length;i<a;i++)if(r[i](e,s,n,!0)){t=!0;break}if(t)break}if(!a)return e.parentType=i,!1;let c=R(e.getLines(t,s,e.blkIndent,!1));e.line=s+1;let l=e.push(`heading_open`,`h${a}`,1);l.markup=String.fromCharCode(o),l.map=[t,e.line];let u=e.push(`inline`,``,0);u.content=c,u.map=[t,e.line-1],u.children=[];let d=e.push(`heading_close`,`h${a}`,-1);return d.markup=String.fromCharCode(o),e.parentType=i,!0}function Zt(e,t,n){let r=e.md.block.ruler.getRules(`paragraph`),i=e.parentType,a=t+1;for(e.parentType=`paragraph`;a<n&&!e.isEmpty(a);a++){if(e.sCount[a]-e.blkIndent>3||e.sCount[a]<0)continue;let t=!1;for(let i=0,o=r.length;i<o;i++)if(r[i](e,a,n,!0)){t=!0;break}if(t)break}let o=R(e.getLines(t,a,e.blkIndent,!1));e.line=a;let s=e.push(`paragraph_open`,`p`,1);s.map=[t,e.line];let c=e.push(`inline`,``,0);return c.content=o,c.map=[t,e.line],c.children=[],e.push(`paragraph_close`,`p`,-1),e.parentType=i,!0}var K=[[`table`,Mt,[`paragraph`,`reference`]],[`code`,Nt],[`fence`,Pt,[`paragraph`,`reference`,`blockquote`,`list`]],[`blockquote`,Ft,[`paragraph`,`reference`,`blockquote`,`list`]],[`hr`,It,[`paragraph`,`reference`,`blockquote`,`list`]],[`list`,Bt,[`paragraph`,`reference`,`blockquote`]],[`reference`,Ut],[`html_block`,Jt,[`paragraph`,`reference`,`blockquote`]],[`heading`,Yt,[`paragraph`,`reference`,`blockquote`]],[`lheading`,Xt],[`paragraph`,Zt]],Qt=class{constructor(){D(this,`ruler`,new B),D(this,`State`,Ot);for(let e=0;e<K.length;e++)this.ruler.push(K[e][0],K[e][1],{alt:(K[e][2]||[]).slice()})}tokenize(e,t,n){let r=this.ruler.getRules(``),i=r.length,a=e.md.options.maxNesting,o=t,s=!1;for(;o<n&&(e.line=o=e.skipEmptyLines(o),!(o>=n||e.sCount[o]<e.blkIndent));){if(e.level>=a){e.line=n;break}let t=e.line,c=!1;for(let a=0;a<i;a++)if(c=r[a](e,o,n,!1),c){if(t>=e.line)throw Error(`block rule didn't increment state.line`);break}if(!c)throw Error(`none of the block rules matched`);e.tight=!s,e.isEmpty(e.line-1)&&(s=!0),o=e.line,o<n&&e.isEmpty(o)&&(s=!0,o++,e.line=o)}}parse(e,t,n,r){if(!e)return;let i=new this.State(e,t,n,r);this.tokenize(i,i.line,i.lineMax)}},$t=class{constructor(e,t,n,r){D(this,`pos`,0),D(this,`level`,0),D(this,`pending`,``),D(this,`pendingLevel`,0),D(this,`cache`,{}),D(this,`backticks`,{}),D(this,`backticksScanned`,!1),D(this,`skipHtmlSpecial`,!1),D(this,`linkLevel`,0),D(this,`delimiters`,[]),D(this,`_prev_delimiters`,[]),D(this,`Token`,z),this.src=e,this.env=n,this.md=t,this.tokens=r,this.tokens_meta=Array(r.length),this.posMax=this.src.length}pushPending(){let e=new z(`text`,``,0);return e.content=this.pending,e.level=this.pendingLevel,this.tokens.push(e),this.pending=``,e}push(e,t,n){this.pending&&this.pushPending();let r=new z(e,t,n),i;return n<0&&(this.level--,this.delimiters=this._prev_delimiters.pop()),r.level=this.level,n>0&&(this.level++,this._prev_delimiters.push(this.delimiters),this.delimiters=[],i={delimiters:this.delimiters}),this.pendingLevel=this.level,this.tokens.push(r),this.tokens_meta.push(i),r}scanDelims(e,t){let n=this.posMax,r=this.src.charCodeAt(e),i;if(e===0)i=32;else if(e===1)i=this.src.charCodeAt(0),(i&63488)==55296&&(i=65533);else if(i=this.src.charCodeAt(e-1),(i&64512)==56320){let t=this.src.charCodeAt(e-2);i=(t&64512)==55296?65536+(t-55296<<10)+(i-56320):65533}else(i&64512)==55296&&(i=65533);let a=e;for(;a<n&&this.src.charCodeAt(a)===r;)a++;let o=a-e,s=a<n?this.src.charCodeAt(a):32;if((s&64512)==55296){let e=this.src.charCodeAt(a+1);s=(e&64512)==56320?65536+(s-55296<<10)+(e-56320):65533}else(s&64512)==56320&&(s=65533);let c=I(i)||F(i),l=I(s)||F(s),u=P(i),d=P(s),f=!d&&(!l||u||c),p=!u&&(!c||d||l);return{can_open:f&&(t||!p||c),can_close:p&&(t||!f||l),length:o}}};function en(e){switch(e){case 10:case 33:case 35:case 36:case 37:case 38:case 42:case 43:case 45:case 58:case 60:case 61:case 62:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 125:case 126:return!0;default:return!1}}function tn(e,t){let n=e.pos;for(;n<e.posMax&&!en(e.src.charCodeAt(n));)n++;return n!==e.pos&&(t||(e.pending+=e.src.slice(e.pos,n)),e.pos=n,!0)}function nn(e){return e>=65&&e<=90||e>=97&&e<=122}function rn(e){return e>=65&&e<=90||e>=97&&e<=122||e>=48&&e<=57||e===43||e===45||e===46}function an(e,t){if(!e.md.options.linkify||e.linkLevel>0)return!1;let n=e.pos,r=e.posMax;if(n+3>r||e.src.charCodeAt(n)!==58||e.src.charCodeAt(n+1)!==47||e.src.charCodeAt(n+2)!==47)return!1;let i=n-Math.min(10,e.pending.length,n),a=n;for(;a>i&&rn(e.src.charCodeAt(a-1));)a--;if(a===n||!nn(e.src.charCodeAt(a)))return!1;let o=n-a,s=e.md.linkify.matchAtStart(e.src.slice(a));if(!s)return!1;let c=s.url;if(c.length<=o)return!1;let l=c.length;for(;l>0&&c.charCodeAt(l-1)===42;)l--;l!==c.length&&(c=c.slice(0,l));let u=e.md.normalizeLink(c);if(!e.md.validateLink(u))return!1;if(!t){e.pending=e.pending.slice(0,-o);let t=e.push(`link_open`,`a`,1);t.attrs=[[`href`,u]],t.markup=`linkify`,t.info=`auto`;let n=e.push(`text`,``,0);n.content=e.md.normalizeLinkText(c);let r=e.push(`link_close`,`a`,-1);r.markup=`linkify`,r.info=`auto`}return e.pos+=c.length-o,!0}function on(e,t){let n=e.pos;if(e.src.charCodeAt(n)!==10)return!1;let r=e.pending.length-1,i=e.posMax;if(!t){if(r>=0&&e.pending.charCodeAt(r)===32){if(r>=1&&e.pending.charCodeAt(r-1)===32){let t=r-1;for(;t>=1&&e.pending.charCodeAt(t-1)===32;)t--;e.pending=e.pending.slice(0,t),e.push(`hardbreak`,`br`,0)}else e.pending=e.pending.slice(0,-1),e.push(`softbreak`,`br`,0)}else e.push(`softbreak`,`br`,0)}for(n++;n<i&&N(e.src.charCodeAt(n));)n++;return e.pos=n,!0}var sn=[];for(let e=0;e<256;e++)sn.push(0);`\\!"#$%&'()*+,./:;<=>?@[]^_\`{|}~-`.split(``).forEach(function(e){sn[e.charCodeAt(0)]=1});function cn(e,t){let n=e.pos,r=e.posMax;if(e.src.charCodeAt(n)!==92||(n++,n>=r))return!1;let i=e.src.charCodeAt(n);if(i===10){for(t||e.push(`hardbreak`,`br`,0),n++;n<r&&(i=e.src.charCodeAt(n),N(i));)n++;return e.pos=n,!0}if(i===32){if(!t){let t=e.push(`text_special`,``,0);t.content=`\\`,t.markup=`\\`,t.info=`escape`}return e.pos=n,!0}let a=e.src[n];if(i>=55296&&i<=56319&&n+1<r){let t=e.src.charCodeAt(n+1);t>=56320&&t<=57343&&(a+=e.src[n+1],n++)}let o=`\\`+a;if(!t){let t=e.push(`text_special`,``,0);t.content=i<256&&sn[i]!==0?a:o,t.markup=o,t.info=`escape`}return e.pos=n+1,!0}function ln(e){let t={},n=0;for(;(n=e.indexOf("`",n))!==-1;){let r=n;for(;e.charCodeAt(++n)===96;);t[n-r]=r}return t}function un(e,t){var n;let r=e.pos;if(e.src.charCodeAt(r)!==96)return!1;let i=e.posMax,a=r+1;for(;a<i&&e.src.charCodeAt(a)===96;)a++;let o=e.src.slice(r,a),s=o.length;if(e.backticksScanned||(e.backticks=ln(e.src),e.backticksScanned=!0),((n=e.backticks[s])==null?-1:n)>=a){let n=a,r;for(;(r=e.src.indexOf("`",n))!==-1&&r<i;){for(n=r+1;e.src.charCodeAt(n)===96;)n++;if(n>i)break;if(n-r===s){if(!t){let t=e.push(`code_inline`,`code`,0);t.markup=o;let n=e.src.slice(a,r).replace(/\n/g,` `);n.startsWith(` `)&&n.endsWith(` `)&&/[^ ]/.test(n)&&(n=n.slice(1,-1)),t.content=n}return e.pos=n,!0}}}return t||(e.pending+=o),e.pos=a,!0}function dn(e,t){let n=e.pos,r=e.src.charCodeAt(n);if(t||r!==126)return!1;let i=e.scanDelims(e.pos,!0),a=i.length,o=String.fromCharCode(r);if(a<2)return!1;let s;a%2&&(s=e.push(`text`,``,0),s.content=o,a--);for(let t=0;t<a;t+=2)s=e.push(`text`,``,0),s.content=o+o,e.delimiters.push({marker:r,length:0,token:e.tokens.length-1,end:-1,open:i.can_open,close:i.can_close});return e.pos+=i.length,!0}function fn(e,t){let n,r=[],i=t.length;for(let a=0;a<i;a++){let i=t[a];if(i.marker!==126||i.end===-1)continue;let o=t[i.end];n=e.tokens[i.token],n.type=`s_open`,n.tag=`s`,n.nesting=1,n.markup=`~~`,n.content=``,n=e.tokens[o.token],n.type=`s_close`,n.tag=`s`,n.nesting=-1,n.markup=`~~`,n.content=``,e.tokens[o.token-1].type===`text`&&e.tokens[o.token-1].content===`~`&&r.push(o.token-1)}for(;r.length;){let t=r.pop(),i=t+1;for(;i<e.tokens.length&&e.tokens[i].type===`s_close`;)i++;i--,t!==i&&(n=e.tokens[i],e.tokens[i]=e.tokens[t],e.tokens[t]=n)}}function pn(e){let t=e.tokens_meta,n=e.tokens_meta.length;fn(e,e.delimiters);for(let i=0;i<n;i++){var r;let n=(r=t[i])==null?void 0:r.delimiters;n&&fn(e,n)}}var mn={tokenize:dn,postProcess:pn};function hn(e,t){let n=e.pos,r=e.src.charCodeAt(n);if(t||r!==95&&r!==42)return!1;let i=e.scanDelims(e.pos,r===42);for(let t=0;t<i.length;t++){let t=e.push(`text`,``,0);t.content=String.fromCharCode(r),e.delimiters.push({marker:r,length:i.length,token:e.tokens.length-1,end:-1,open:i.can_open,close:i.can_close})}return e.pos+=i.length,!0}function gn(e,t){let n=t.length;for(let r=n-1;r>=0;r--){let n=t[r];if(n.marker!==95&&n.marker!==42||n.end===-1)continue;let i=t[n.end],a=r>0&&t[r-1].end===n.end+1&&t[r-1].marker===n.marker&&t[r-1].token===n.token-1&&t[n.end+1].token===i.token+1,o=String.fromCharCode(n.marker),s=e.tokens[n.token];s.type=a?`strong_open`:`em_open`,s.tag=a?`strong`:`em`,s.nesting=1,s.markup=a?o+o:o,s.content=``;let c=e.tokens[i.token];c.type=a?`strong_close`:`em_close`,c.tag=a?`strong`:`em`,c.nesting=-1,c.markup=a?o+o:o,c.content=``,a&&(e.tokens[t[r-1].token].content=``,e.tokens[t[n.end+1].token].content=``,r--)}}function _n(e){let t=e.tokens_meta,n=e.tokens_meta.length;gn(e,e.delimiters);for(let i=0;i<n;i++){var r;let n=(r=t[i])==null?void 0:r.delimiters;n&&gn(e,n)}}var vn={tokenize:hn,postProcess:_n};function yn(e,t){let n,r,i,a,o=``,s=``,c=e.pos,l=!0;if(e.src.charCodeAt(e.pos)!==91)return!1;let u=e.pos,d=e.posMax,f=e.pos+1,p=e.md.helpers.parseLinkLabel(e,e.pos,!0);if(p<0)return!1;let m=p+1;if(m<d&&e.src.charCodeAt(m)===40){for(l=!1,m++;m<d&&(n=e.src.charCodeAt(m),N(n)||n===10);m++);if(m>=d)return!1;if(c=m,i=e.md.helpers.parseLinkDestination(e.src,m,e.posMax),i.ok){for(o=e.md.normalizeLink(i.str),e.md.validateLink(o)?m=i.pos:o=``,c=m;m<d&&(n=e.src.charCodeAt(m),N(n)||n===10);m++);if(i=e.md.helpers.parseLinkTitle(e.src,m,e.posMax),m<d&&c!==m&&i.ok)for(s=i.str,m=i.pos;m<d&&(n=e.src.charCodeAt(m),N(n)||n===10);m++);}(m>=d||e.src.charCodeAt(m)!==41)&&(l=!0),m++}if(l){if(e.env.references===void 0)return!1;if(m<d&&e.src.charCodeAt(m)===91?(c=m+1,m=e.md.helpers.parseLinkLabel(e,m),m>=0?r=e.src.slice(c,m++):m=p+1):m=p+1,r||(r=e.src.slice(f,p)),r=L(r),a=e.env.references[r],!a)return e.pos=u,!1;o=a.href,s=a.title}if(!t){e.pos=f,e.posMax=p;let t=e.push(`link_open`,`a`,1),n=[[`href`,o]];if(t.attrs=n,s&&n.push([`title`,s]),r){let e=Object.create(null);e.label=r,t.meta=e}e.linkLevel++,e.md.inline.tokenize(e),e.linkLevel--,e.push(`link_close`,`a`,-1)}return e.pos=m,e.posMax=d,!0}function bn(e,t){let n,r,i,a,o,s,c,l,u=``,d=e.pos,f=e.posMax;if(e.src.charCodeAt(e.pos)!==33||e.src.charCodeAt(e.pos+1)!==91)return!1;let p=e.pos+2,m=e.md.helpers.parseLinkLabel(e,e.pos+1,!1);if(m<0)return!1;if(a=m+1,a<f&&e.src.charCodeAt(a)===40){for(a++;a<f&&(n=e.src.charCodeAt(a),N(n)||n===10);a++);if(a>=f)return!1;for(l=a,s=e.md.helpers.parseLinkDestination(e.src,a,e.posMax),s.ok&&(u=e.md.normalizeLink(s.str),e.md.validateLink(u)?a=s.pos:u=``),l=a;a<f&&(n=e.src.charCodeAt(a),N(n)||n===10);a++);if(s=e.md.helpers.parseLinkTitle(e.src,a,e.posMax),a<f&&l!==a&&s.ok)for(c=s.str,a=s.pos;a<f&&(n=e.src.charCodeAt(a),N(n)||n===10);a++);else c=``;if(a>=f||e.src.charCodeAt(a)!==41)return e.pos=d,!1;a++}else{if(e.env.references===void 0)return!1;if(a<f&&e.src.charCodeAt(a)===91?(l=a+1,a=e.md.helpers.parseLinkLabel(e,a),a>=0?i=e.src.slice(l,a++):a=m+1):a=m+1,i||(i=e.src.slice(p,m)),i=L(i),o=e.env.references[i],!o)return e.pos=d,!1;u=o.href,c=o.title}if(!t){r=e.src.slice(p,m);let t=[];e.md.inline.parse(r,e.md,e.env,t);let n=e.push(`image`,`img`,0),a=[[`src`,u],[`alt`,``]];if(n.attrs=a,n.children=t,n.content=r,c&&a.push([`title`,c]),i){let e=Object.create(null);e.label=i,n.meta=e}}return e.pos=a,e.posMax=f,!0}var xn=/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/,Sn=/^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;function Cn(e,t){let n=e.pos;if(e.src.charCodeAt(n)!==60)return!1;let r=e.pos,i=e.posMax;for(;;){if(++n>=i)return!1;let t=e.src.charCodeAt(n);if(t===60)return!1;if(t===62)break}let a=e.src.slice(r+1,n);if(Sn.test(a)){let n=e.md.normalizeLink(a);if(!e.md.validateLink(n))return!1;if(!t){let t=e.push(`link_open`,`a`,1);t.attrs=[[`href`,n]],t.markup=`autolink`,t.info=`auto`;let r=e.push(`text`,``,0);r.content=e.md.normalizeLinkText(a);let i=e.push(`link_close`,`a`,-1);i.markup=`autolink`,i.info=`auto`}return e.pos+=a.length+2,!0}if(xn.test(a)){let n=e.md.normalizeLink(`mailto:${a}`);if(!e.md.validateLink(n))return!1;if(!t){let t=e.push(`link_open`,`a`,1);t.attrs=[[`href`,n]],t.markup=`autolink`,t.info=`auto`;let r=e.push(`text`,``,0);r.content=e.md.normalizeLinkText(a);let i=e.push(`link_close`,`a`,-1);i.markup=`autolink`,i.info=`auto`}return e.pos+=a.length+2,!0}return!1}function wn(e){return/^<a[>\s]/i.test(e)}function Tn(e){return/^<\/a\s*>/i.test(e)}function En(e){let t=e|32;return t>=97&&t<=122}function Dn(e,t){let n=e.src,r,i;if(n.startsWith(`<!--`,t)){if(n.startsWith(`>`,t+4))return t+5;if(n.startsWith(`->`,t+4))return t+6;r=t+4,i=`-->`}else if(n.startsWith(`<![CDATA[`,t))r=t+9,i=`]]>`;else if(n.charCodeAt(t+1)===63)r=t+2,i=`?>`;else if(En(n.charCodeAt(t+2)))r=t+3,i=`>`;else return-1;if(e.skipHtmlSpecial)return-1;let a=n.indexOf(i,r);return a<0?(e.skipHtmlSpecial=!0,-1):a+i.length}function On(e,t){if(!e.md.options.html)return!1;let n=e.posMax,r=e.pos;if(e.src.charCodeAt(r)!==60||r+2>=n)return!1;let i,a=e.src.charCodeAt(r+1);if(a===33||a===63)i=Dn(e,r);else if(a===47||En(a)){let t=e.src.slice(r).match(qt);i=t?r+t[0].length:-1}else return!1;if(i<0)return!1;if(!t){let t=e.push(`html_inline`,``,0);t.content=e.src.slice(r,i),wn(t.content)&&e.linkLevel++,Tn(t.content)&&e.linkLevel--}return e.pos=i,!0}var kn=/^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i,An=/^&([a-z][a-z0-9]{1,31});/i;function jn(e,t){let n=e.pos,r=e.posMax;if(e.src.charCodeAt(n)!==38||n+1>=r)return!1;if(e.src.charCodeAt(n+1)===35){let r=e.src.slice(n).match(kn);if(r){if(!t){let t=r[1][0].toLowerCase()===`x`?parseInt(r[1].slice(1),16):parseInt(r[1],10),n=e.push(`text_special`,``,0);n.content=Me(t)?A(t):A(65533),n.markup=r[0],n.info=`entity`}return e.pos+=r[0].length,!0}}else{let r=e.src.slice(n).match(An);if(r){let n=Oe(r[0]);if(n!==r[0]){if(!t){let t=e.push(`text_special`,``,0);t.content=n,t.markup=r[0],t.info=`entity`}return e.pos+=r[0].length,!0}}}return!1}function Mn(e){let t={},n=e.length;if(!n)return;let r=0,i=-2,a=[];for(let o=0;o<n;o++){let n=e[o];if(a.push(0),(e[r].marker!==n.marker||i!==n.token-1)&&(r=o),i=n.token,n.length=n.length||0,!n.close)continue;t.hasOwnProperty(n.marker)||(t[n.marker]=[-1,-1,-1,-1,-1,-1]);let s=t[n.marker][(n.open?3:0)+n.length%3],c=r-a[r]-1,l=c;for(;c>s;c-=a[c]+1){let t=e[c];if(t.marker===n.marker&&t.open&&t.end<0){let r=!1;if((t.close||n.open)&&(t.length+n.length)%3==0&&(t.length%3!=0||n.length%3!=0)&&(r=!0),!r){let r=c>0&&!e[c-1].open?a[c-1]+1:0;a[o]=o-c+r,a[c]=r,n.open=!1,t.end=o,t.close=!1,l=-1,i=-2;break}}}l!==-1&&(t[n.marker][(n.open?3:0)+(n.length||0)%3]=l)}}function Nn(e){let t=e.tokens_meta,n=e.tokens_meta.length;Mn(e.delimiters);for(let e=0;e<n;e++){var r;let n=(r=t[e])==null?void 0:r.delimiters;n&&Mn(n)}}function Pn(e){let t,n,r=0,i=e.tokens,a=e.tokens.length;for(t=n=0;t<a;t++)i[t].nesting<0&&r--,i[t].level=r,i[t].nesting>0&&r++,i[t].type===`text`&&t+1<a&&i[t+1].type===`text`?i[t+1].content=i[t].content+i[t+1].content:(t!==n&&(i[n]=i[t]),n++);t!==n&&(i.length=n)}var Fn=[[`text`,tn],[`linkify`,an],[`newline`,on],[`escape`,cn],[`backticks`,un],[`strikethrough`,mn.tokenize],[`emphasis`,vn.tokenize],[`link`,yn],[`image`,bn],[`autolink`,Cn],[`html_inline`,On],[`entity`,jn]],In=[[`balance_pairs`,Nn],[`strikethrough`,mn.postProcess],[`emphasis`,vn.postProcess],[`fragments_join`,Pn]],Ln=class{constructor(){D(this,`ruler`,new B),D(this,`ruler2`,new B),D(this,`State`,$t);for(let e=0;e<Fn.length;e++)this.ruler.push(Fn[e][0],Fn[e][1]);for(let e=0;e<In.length;e++)this.ruler2.push(In[e][0],In[e][1])}skipToken(e){let t=e.pos,n=this.ruler.getRules(``),r=n.length,i=e.md.options.maxNesting,a=e.cache;if(a[t]!==void 0){e.pos=a[t];return}let o=!1;if(e.level<i){for(let i=0;i<r;i++)if(e.level++,o=n[i](e,!0),e.level--,o){if(t>=e.pos)throw Error(`inline rule didn't increment state.pos`);break}}else e.pos=e.posMax;o||e.pos++,a[t]=e.pos}tokenize(e){let t=this.ruler.getRules(``),n=t.length,r=e.posMax,i=e.md.options.maxNesting;for(;e.pos<r;){let a=e.pos,o=!1;if(e.level<i){for(let r=0;r<n;r++)if(o=t[r](e,!1),o){if(a>=e.pos)throw Error(`inline rule didn't increment state.pos`);break}}if(o){if(e.pos>=r)break}else e.pending+=e.src[e.pos++]}e.pending&&e.pushPending()}parse(e,t,n,r){let i=new this.State(e,t,n,r);this.tokenize(i);let a=this.ruler2.getRules(``),o=a.length;for(let e=0;e<o;e++)a[e](i)}};function Rn(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function q(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?Rn(Object(n),!0).forEach(function(t){D(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Rn(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function zn(e,t){if(e==null)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.includes(r))continue;n[r]=e[r]}return n}function Bn(e,t){if(e==null)return{};var n,r,i=zn(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.includes(n)||{}.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var Vn=[`rebuilder`],Hn=class{constructor(e={}){D(this,`src_Any`,C.source),D(this,`src_Cc`,ee.source),D(this,`src_Z`,ie.source),D(this,`src_P`,ne.source),D(this,`src_ZPCc`,[this.src_Z,this.src_P,this.src_Cc].join(`|`)),D(this,`src_ZCc`,[this.src_Z,this.src_Cc].join(`|`)),D(this,`cache`,{}),D(this,`opts`,{maxLength:1e4,urlAuth:!1,schema_names:[]}),this.opts=q(q({},this.opts),e)}set(e={}){return this.opts=q(q({},this.opts),e),this.cache={},this}escapeRE(e){return e.replace(/[.?*+^$[\]\\(){}|-]/g,`\\$&`)}nestedPairRE(e,t,n=4){let r=this.escapeRE(e),i=this.escapeRE(t),a=`(?:(?!${this.src_ZCc}|${r}|${i}).)`,o=`${r}${a}{0,1000}${i}`;for(let e=2;e<=n;e++)o=`${r}(?:${a}|${o}){0,1000}${i}`;return o}get_text_separators(){var e,t;return(t=(e=this.cache).text_separators)==null?e.text_separators=/[><\uff5c]/:t}get_pseudo_letter(){var e,t;return(t=(e=this.cache).src_pseudo_letter)==null?e.src_pseudo_letter=RegExp(`(?:(?!${this.get_text_separators().source}|${this.src_ZPCc})${this.src_Any})`):t}get_ipv4_addr(){var e,t;return(t=(e=this.cache).src_ip4)==null?e.src_ip4=RegExp(`(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])[.]){3}(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])`):t}get_ipv6_addr(){var e,t;let n=`[0-9A-Fa-f]{1,4}`,r=`(?:(?:${n}:${n})|${this.get_ipv4_addr().source})`;return(t=(e=this.cache).src_ip6_addr)==null?e.src_ip6_addr=RegExp(`(?:(?:${n}:){6}${r}|::(?:${n}:){5}${r}|(?:${n})?::(?:${n}:){4}${r}|(?:(?:${n}:){0,1}${n})?::(?:${n}:){3}${r}|(?:(?:${n}:){0,2}${n})?::(?:${n}:){2}${r}|(?:(?:${n}:){0,3}${n})?::${n}:${r}|(?:(?:${n}:){0,4}${n})?::${r}|(?:(?:${n}:){0,5}${n})?::${n}|(?:(?:${n}:){0,6}${n})?::)`):t}get_ipv6_url_host(){var e,t;return(t=(e=this.cache).src_ip6_host)==null?e.src_ip6_host=RegExp(`\\[${this.get_ipv6_addr().source}\\]`):t}get_ipv6_mail_host(){var e,t;return(t=(e=this.cache).src_ipv6_mail_host)==null?e.src_ipv6_mail_host=RegExp(`\\[IPv6:${this.get_ipv6_addr().source}\\]`):t}get_auth(){var e,t;return(t=(e=this.cache).src_auth)==null?e.src_auth=RegExp(`(?:(?:(?!${this.src_ZCc}|[@/\\[\\]()]).){1,50}@)?`):t}get_port(){var e,t;return(t=(e=this.cache).src_port)==null?e.src_port=RegExp(`(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?`):t}get_host_terminator(){var e,t;return(t=(e=this.cache).src_host_terminator)==null?e.src_host_terminator=RegExp(`(?=$|${this.get_text_separators().source}|${this.src_ZPCc})(?!${this.opts[`---`]?`-(?!--)|`:`-|`}_|:\\d|\\.-|\\.(?!$|${this.src_ZPCc}))`):t}get_path_terminator(){var e,t;return(t=(e=this.cache).src_path_terminator)==null?e.src_path_terminator=RegExp(`${this.src_ZPCc}|${this.get_text_separators().source}`):t}get_path(){var e,t;return(t=(e=this.cache).src_path)==null?e.src_path=RegExp(`(?:[/?#](?:${this.nestedPairRE(`[`,`]`)}|${this.nestedPairRE(`(`,`)`)}|${this.nestedPairRE(`{`,`}`)}|\\"(?:(?!${this.src_ZCc}|["]).){1,100}\\"|\\'(?:(?!${this.src_ZCc}|[']).){1,100}\\'|\\'(?=${this.get_pseudo_letter().source}|[-])|\\.{2,20}[:]?[a-zA-Z0-9%/&]|\\.(?!${this.src_ZCc}|[.]|$)|`+(this.opts[`---`]?`\\-(?!--(?:[^-]|$))(?:-{0,19})|`:`\\-{1,20}|`)+`,(?!${this.src_ZCc}|$)|;(?!${this.src_ZCc}|$)|\\!{1,20}(?!${this.src_ZCc}|[!]|$)|\\?(?!${this.src_ZCc}|[?]|$)|`+this.get_path_extra().source+`[\\\\/:%@#&=_~*]|(?!${this.get_path_terminator().source}).){1,${this.opts.maxLength}}|\\/)?`):t}get_mail_name(){var e,t;return(t=(e=this.cache).src_mail_name)==null?e.src_mail_name=RegExp("[-!#$%&'*+/=?^_`{|}~a-zA-Z0-9](?:[-!#$%&'*+/=?^_`{|}~a-zA-Z0-9]|[.](?=[-!#$%&'*+/=?^_`{|}~a-zA-Z0-9])){0,63}"):t}get_xn(){var e,t;return(t=(e=this.cache).src_xn)==null?e.src_xn=RegExp(`xn--[a-z0-9\\-]{1,59}`):t}get_tld(){if(this.cache.tld)return this.cache.tld;let e=[...new Set(this.opts.tlds||[])].sort().reverse().join(`|`);return this.cache.tld=RegExp(`${e||`$#none#$`}|${this.get_xn().source}`),this.cache.tld}get_domain_root(){var e,t;return(t=(e=this.cache).src_domain_root)==null?e.src_domain_root=RegExp(`(?:`+this.get_xn().source+`|${this.get_pseudo_letter().source}{1,63})`):t}get_domain(){var e,t;return(t=(e=this.cache).src_domain)==null?e.src_domain=RegExp(`(?:`+this.get_xn().source+`|(?:${this.get_pseudo_letter().source})|(?:${this.get_pseudo_letter().source}(?:-|${this.get_pseudo_letter().source}){0,61}${this.get_pseudo_letter().source}))`):t}get_url_host_port(){var e,t;return(t=(e=this.cache).url_host_port)==null?e.url_host_port=RegExp(`(?:`+this.get_ipv6_url_host().source+`|(?:(?:(?:${this.get_domain().source})\\.){0,10}${this.get_domain().source}))`+this.get_port().source+this.get_host_terminator().source):t}get_fuzzy_url_host_port(){var e,t;return(t=(e=this.cache).fuzzy_url_host_port)==null?e.fuzzy_url_host_port=RegExp(`(?:`+(this.opts.fuzzyIP?this.get_ipv4_addr().source+`|`:``)+`(?:(?:(?:${this.get_domain().source})\\.){1,10}(?:${this.get_tld().source})))`+this.get_host_terminator().source):t}get_mail_host(){var e,t;return(t=(e=this.cache).src_mail_host)==null?e.src_mail_host=RegExp(`(?:`+this.get_ipv6_mail_host().source+`|(?:(?:(?:${this.get_domain().source})\\.){0,4}${this.get_domain().source}))`+this.get_host_terminator().source):t}get_fuzzy_mail_host(){var e,t;return(t=(e=this.cache).src_fuzzy_mail_host)==null?e.src_fuzzy_mail_host=RegExp(`(?:`+this.get_ipv6_mail_host().source+`|(?:(?:(?:${this.get_domain().source})[.]){1,4}${this.get_domain_root().source}))`+this.get_host_terminator().source):t}get_path_extra(){var e,t;return(t=(e=this.cache).src_path_extra)==null?e.src_path_extra=RegExp(``):t}get_fuzzy_mail_host_search(){var e,t;return(t=(e=this.cache).mail_fuzzy_host_search)==null?e.mail_fuzzy_host_search=RegExp(`@${this.get_fuzzy_mail_host().source}`,`ig`):t}get_fuzzy_link_search(){var e,t;return(t=(e=this.cache).link_fuzzy_search)==null?e.link_fuzzy_search=RegExp(`(^|(?![.:/\\-_@])(?:[$+<=>^\`|\uff5c]|${this.src_ZPCc}))(?:(?![$+<=>^\`|\uff5c])${this.get_fuzzy_url_host_port().source}${this.get_path().source})`,`ig`):t}get_http_validator(){var e,t;return(t=(e=this.cache).http_validator)==null?e.http_validator=RegExp(`\\/\\/`+(this.opts.urlAuth?this.get_auth().source:``)+this.get_url_host_port().source+this.get_path().source,`iy`):t}get_relative_proto_validator(){var e,t;return(t=(e=this.cache).relative_proto_validator)==null?e.relative_proto_validator=RegExp((this.opts.urlAuth?this.get_auth().source:``)+`(?:localhost|${this.get_ipv6_url_host().source}|(?:(?:${this.get_domain().source})[.]){1,10}${this.get_domain_root().source})`+this.get_port().source+this.get_host_terminator().source+this.get_path().source,`iy`):t}get_mail_name_validator(){var e,t;return(t=(e=this.cache).mail_name_validator)==null?e.mail_name_validator=RegExp(`(?:^|${this.get_text_separators().source}|"|\\(|${this.src_ZCc})(${this.get_mail_name().source})$`):t}get_mailto_validator(){var e,t;return(t=(e=this.cache).mailto_validator)==null?e.mailto_validator=RegExp(`${this.get_mail_name().source}@${this.get_mail_host().source}`,`iy`):t}get_schema_names(){var e,t;return(t=(e=this.cache).schema_names)==null?e.schema_names=new RegExp((this.opts.schema_names||[]).map(e=>this.escapeRE(e)).join(`|`)):t}get_schema_search(){var e,t;return(t=(e=this.cache).schema_search)==null?e.schema_search=RegExp(`(^|(?!_)(?:[><\uff5c]|${this.src_ZPCc}))(${this.get_schema_names().source})`,`ig`):t}get_schema_at_start(){var e,t;return(t=(e=this.cache).schema_at_start)==null?e.schema_at_start=RegExp(`^${this.get_schema_search().source}`,`i`):t}},Un={validate:(e,t,n)=>{let r=n.re.get_http_validator();r.lastIndex=t;let i=r.exec(e);return i?i[0].length:0},normalize:(e,t)=>t.normalize(e)},Wn={"http:":Un,"https:":Un,"ftp:":Un,"//":{validate:function(e,t,n){let r=n.re.get_relative_proto_validator();r.lastIndex=t;let i=r.exec(e);return i?t>=3&&e[t-3]===`:`||t>=3&&e[t-3]===`/`?0:i[0].length:0},normalize:(e,t)=>t.normalize(e)},"mailto:":{validate:function(e,t,n){let r=n.re.get_mailto_validator();r.lastIndex=t;let i=r.exec(e);return i?i[0].length:0},normalize:(e,t)=>t.normalize(e)}},Gn=`a:cdefgilmnoqrstuwxz|b:abdefghijmnorstvwyz|c:acdfghiklmnoruvwxyz|d:ejkmoz|e:cegrstu|f:ijkmor|g:abdefghilmnpqrstuwy|h:kmnrtu|i:delmnoqrst|j:emop|k:eghimnprwyz|l:abcikrstuvy|m:acdeghklmnopqrstuvwxyz|n:acefgilopruz|o:m|p:aefghklmnrstwy|q:a|r:eosuw|s:abcdeghijklmnortuvxyz|t:cdfghjklmnortvwz|u:agksyz|v:aceginu|w:fs|y:et|z:amw`,Kn=`biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф`;function qn(){let e=Kn.split(`|`);return Gn.split(`|`).forEach(t=>{let n=t.indexOf(`:`),r=t.slice(0,n);for(let i of t.slice(n+1))e.push(r+i)}),e}var Jn={fuzzyLink:!1,fuzzyEmail:!0,fuzzyIP:!1,"---":!1,tlds:qn(),urlAuth:!1,maxLength:1e4},Yn=class{constructor(e,t,n,r){D(this,`schema`,void 0),D(this,`index`,void 0),D(this,`lastIndex`,void 0),D(this,`raw`,void 0),D(this,`text`,void 0),D(this,`url`,void 0);let i=e.slice(n,r);this.schema=t.toLowerCase(),this.index=n,this.lastIndex=r,this.raw=i,this.text=i,this.url=i}},Xn=class{constructor(e={}){D(this,`__opts__`,void 0),D(this,`__schemas__`,void 0),D(this,`re`,void 0);let{rebuilder:t}=e,n=Bn(e,Vn);this.__opts__=q(q({},Jn),n),this.__schemas__=q({},Wn),this.re=t||new Hn,this.re.set(q(q({},this.__opts__),{},{schema_names:Object.keys(this.__schemas__)}))}add(e,t=null){if(!t)delete this.__schemas__[e];else{let n=q({normalize:(e,t)=>t.normalize(e)},t);this.__schemas__[e]=n}return this.re.set(q(q({},this.__opts__),{},{schema_names:Object.keys(this.__schemas__)})),this}set(e={}){return this.__opts__=q(q({},this.__opts__),e),this.re.set(q(q({},this.__opts__),{},{schema_names:Object.keys(this.__schemas__)})),this}test(e){if(!e.length)return!1;let t,n;for(n=this.re.get_schema_search(),n.lastIndex=0;(t=n.exec(e))!==null;)if(this.testSchemaAt(e,t[2],n.lastIndex))return!0;if(this.__opts__.fuzzyLink&&this.__schemas__[`http:`]&&(n=this.re.get_fuzzy_link_search(),n.lastIndex=0,n.exec(e)!==null))return!0;if(this.__opts__.fuzzyEmail&&this.__schemas__[`mailto:`]&&e.indexOf(`@`)>=0){let n=this.re.get_fuzzy_mail_host_search(),r=this.re.get_mail_name_validator();for(n.lastIndex=0;(t=n.exec(e))!==null;){let n=e.slice(Math.max(0,t.index-65),t.index);if(r.test(n))return!0}}return!1}testSchemaAt(e,t,n){return this.__schemas__[t.toLowerCase()]?this.__schemas__[t.toLowerCase()].validate(e.slice(0,n+this.__opts__.maxLength),n,this):0}match(e){let t=[],n=this.re.get_schema_search(),r,i,a,o,s,c,l=!1,u=!1,d=!1,f=0;if(!e.length)return null;for(n.lastIndex=0,this.__opts__.fuzzyLink&&this.__schemas__[`http:`]&&(r=this.re.get_fuzzy_link_search(),r.lastIndex=0),this.__opts__.fuzzyEmail&&this.__schemas__[`mailto:`]&&(i=this.re.get_fuzzy_mail_host_search(),i.lastIndex=0,a=this.re.get_mail_name_validator());;){let p=Math.max(f-1,0);if(i&&a&&!d&&(!s||s.index<f))for(i.lastIndex<p&&(i.lastIndex=p);;){let t=i.exec(e);if(!t){d=!0,s=void 0;break}let n=a.exec(e.slice(Math.max(0,t.index-65),t.index));if(n){if(s={schema:`mailto:`,index:t.index-n[1].length,lastIndex:t.index+t[0].length},s.index>=f)break;i.lastIndex<p&&(i.lastIndex=p)}}if(r&&!u&&(!o||o.index<f))for(r.lastIndex<p&&(r.lastIndex=p);;){let t=r.exec(e);if(!t){u=!0,o=void 0;break}if(o={schema:``,index:t.index+t[1].length,lastIndex:t.index+t[0].length},o.index>=f)break;r.lastIndex<p&&(r.lastIndex=p)}let m=s;(!m||o&&(o.index<m.index||o.index===m.index&&o.lastIndex>m.lastIndex))&&(m=o);let h;if(!l)for(;;){if(!c){n.lastIndex<p&&(n.lastIndex=p);let t=n.exec(e);if(!t){l=!0;break}c={schema:t[2],index:t.index+t[1].length,lastIndex:t.index+t[0].length}}if(c.index<f){c=void 0;continue}if(m&&c.index>m.index)break;let t=c;c=void 0;let r=this.testSchemaAt(e,t.schema,t.lastIndex);if(r){h={schema:t.schema,index:t.index,lastIndex:t.lastIndex+r};break}}let g=h;if((!g||s&&(s.index<g.index||s.index===g.index&&s.lastIndex>g.lastIndex))&&(g=s),(!g||o&&(o.index<g.index||o.index===g.index&&o.lastIndex>g.lastIndex))&&(g=o),!g)break;g===s?s=void 0:g===o&&(o=void 0);let _=new Yn(e,g.schema,g.index,g.lastIndex);_.schema?this.__schemas__[_.schema].normalize(_,this):this.normalize(_),t.push(_),f=g.lastIndex}return t.length?t:null}matchAtStart(e){if(!e.length)return null;let t=this.re.get_schema_at_start().exec(e);if(!t)return null;let n=this.testSchemaAt(e,t[2],t[0].length);if(!n)return null;let r=new Yn(e,t[2],t.index+t[1].length,t.index+t[0].length+n);return this.__schemas__[r.schema].normalize(r,this),r}tlds(e,t=!1){return e=Array.isArray(e)?e:[e],t?this.__opts__.tlds=this.__opts__.tlds.concat(e):this.__opts__.tlds=e,this.re.set(q(q({},this.__opts__),{},{schema_names:Object.keys(this.__schemas__)})),this}normalize(e){e.schema||(e.url=`http://${e.url}`),e.schema===`mailto:`&&!/^mailto:/i.test(e.url)&&(e.url=`mailto:${e.url}`)}},J=2147483647,Y=36,Zn=1,X=26,Qn=38,$n=700,er=72,tr=128,nr=`-`,rr=/^xn--/,ir=/[^\0-\x7F]/,ar=/[\x2E\u3002\uFF0E\uFF61]/g,or={overflow:`Overflow: input needs wider integers to process`,"not-basic":`Illegal input >= 0x80 (not a basic code point)`,"invalid-input":`Invalid input`},sr=35,Z=Math.floor,cr=String.fromCharCode;function Q(e){throw RangeError(or[e])}function lr(e,t){let n=[],r=e.length;for(;r--;)n[r]=t(e[r]);return n}function ur(e,t){let n=e.split(`@`),r=``;n.length>1&&(r=n[0]+`@`,e=n[1]),e=e.replace(ar,`.`);let i=lr(e.split(`.`),t).join(`.`);return r+i}function dr(e){let t=[],n=0,r=e.length;for(;n<r;){let i=e.charCodeAt(n++);if(i>=55296&&i<=56319&&n<r){let r=e.charCodeAt(n++);(r&64512)==56320?t.push(((i&1023)<<10)+(r&1023)+65536):(t.push(i),n--)}else t.push(i)}return t}var fr=e=>String.fromCodePoint(...e),pr=function(e){return e>=48&&e<58?26+(e-48):e>=65&&e<91?e-65:e>=97&&e<123?e-97:Y},mr=function(e,t){return e+22+75*(e<26)-((t!=0)<<5)},hr=function(e,t,n){let r=0;for(e=n?Z(e/$n):e>>1,e+=Z(e/t);e>455;r+=Y)e=Z(e/sr);return Z(r+36*e/(e+Qn))},gr=function(e){let t=[],n=e.length,r=0,i=tr,a=er,o=e.lastIndexOf(nr);o<0&&(o=0);for(let n=0;n<o;++n)e.charCodeAt(n)>=128&&Q(`not-basic`),t.push(e.charCodeAt(n));for(let s=o>0?o+1:0;s<n;){let o=r;for(let t=1,i=Y;;i+=Y){s>=n&&Q(`invalid-input`);let o=pr(e.charCodeAt(s++));o>=Y&&Q(`invalid-input`),o>Z((J-r)/t)&&Q(`overflow`),r+=o*t;let c=i<=a?Zn:i>=a+X?X:i-a;if(o<c)break;let l=Y-c;t>Z(J/l)&&Q(`overflow`),t*=l}let c=t.length+1;a=hr(r-o,c,o==0),Z(r/c)>J-i&&Q(`overflow`),i+=Z(r/c),r%=c,t.splice(r++,0,i)}return String.fromCodePoint(...t)},_r=function(e){let t=[];e=dr(e);let n=e.length,r=tr,i=0,a=er;for(let n of e)n<128&&t.push(cr(n));let o=t.length,s=o;for(o&&t.push(nr);s<n;){let n=J;for(let t of e)t>=r&&t<n&&(n=t);let c=s+1;n-r>Z((J-i)/c)&&Q(`overflow`),i+=(n-r)*c,r=n;for(let n of e)if(n<r&&++i>J&&Q(`overflow`),n===r){let e=i;for(let n=Y;;n+=Y){let r=n<=a?Zn:n>=a+X?X:n-a;if(e<r)break;let i=e-r,o=Y-r;t.push(cr(mr(r+i%o,0))),e=Z(i/o)}t.push(cr(mr(e,0))),a=hr(i,c,s===o),i=0,++s}++i,++r}return t.join(``)},vr={version:`2.3.1`,ucs2:{decode:dr,encode:fr},decode:gr,encode:_r,toASCII:function(e){return ur(e,function(e){return ir.test(e)?`xn--`+_r(e):e})},toUnicode:function(e){return ur(e,function(e){return rr.test(e)?gr(e.slice(4).toLowerCase()):e})}},yr={default:{options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:`language-`,linkify:!1,typographer:!1,quotes:`“”‘’`,highlight:null,maxNesting:100},components:{core:{},block:{},inline:{}}},zero:{options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:`language-`,linkify:!1,typographer:!1,quotes:`“”‘’`,highlight:null,maxNesting:20},components:{core:{rules:[`normalize`,`block`,`strip_references`,`inline`,`text_join`]},block:{rules:[`paragraph`]},inline:{rules:[`text`],rules2:[`balance_pairs`,`fragments_join`]}}},commonmark:{options:{html:!0,xhtmlOut:!0,breaks:!1,langPrefix:`language-`,linkify:!1,typographer:!1,quotes:`“”‘’`,highlight:null,maxNesting:20},components:{core:{rules:[`normalize`,`block`,`strip_references`,`inline`,`text_join`]},block:{rules:[`blockquote`,`code`,`fence`,`heading`,`hr`,`html_block`,`lheading`,`list`,`reference`,`paragraph`]},inline:{rules:[`autolink`,`backticks`,`emphasis`,`entity`,`escape`,`html_inline`,`image`,`link`,`newline`,`text`],rules2:[`balance_pairs`,`emphasis`,`fragments_join`]}}}},br=/^(vbscript|javascript|file|data):/,xr=/^data:image\/(gif|png|jpeg|webp);/,Sr=[`http:`,`https:`,`mailto:`],$=class{validateLink(e){let t=e.trim().toLowerCase();return!br.test(t)||xr.test(t)}normalizeLink(e){let t=b(e,!0);if(t.hostname&&(!t.protocol||Sr.indexOf(t.protocol)>=0))try{t.hostname=vr.toASCII(t.hostname)}catch(e){}return t.auth&&(t.auth=s(t.auth)),t.hostname&&(t.hostname=s(t.hostname)),t.pathname&&(t.pathname=s(t.pathname)),t.search&&(t.search=s(t.search)),t.hash&&(t.hash=s(t.hash)),c(t)}normalizeLinkText(e){let t=b(e,!0);if(t.hostname&&(!t.protocol||Sr.indexOf(t.protocol)>=0))try{t.hostname=vr.toUnicode(t.hostname)}catch(e){}return i(c(t),i.defaultChars+`%`)}constructor(...e){D(this,`inline`,new Ln),D(this,`block`,new Qt),D(this,`core`,new Dt),D(this,`renderer`,new Ze),D(this,`linkify`,new Xn),D(this,`utils`,ke),D(this,`helpers`,Object.assign({},Xe));let[t,n]=e;typeof t==`string`?(this.configure(t),n&&this.set(n)):(this.configure(`default`),this.set(t||{}))}set(e){return Object.assign(this.options,e),this}configure(e){let t;if(typeof e==`string`){let n=e;if(t=yr[n],!t)throw Error(`Wrong 'markdown-it' preset "${n}", check name`)}else t=e;if(!t)throw Error("Wrong `markdown-it` preset, can't be empty");t.options&&(this.options=q({},t.options));let n=t.components;if(n){var r;[`core`,`block`,`inline`].forEach(e=>{var t;let r=(t=n[e])==null?void 0:t.rules;r&&this[e].ruler.enableOnly(r)});let e=(r=n.inline)==null?void 0:r.rules2;e&&this.inline.ruler2.enableOnly(e)}return this}enable(e,t=!1){let n=[];Array.isArray(e)||(e=[e]),[`core`,`block`,`inline`].forEach(t=>{n=n.concat(this[t].ruler.enable(e,!0))}),n=n.concat(this.inline.ruler2.enable(e,!0));let r=e.filter(e=>n.indexOf(e)<0);if(r.length&&!t)throw Error(`MarkdownIt. Failed to enable unknown rule(s): ${r}`);return this}disable(e,t=!1){let n=[];Array.isArray(e)||(e=[e]),[`core`,`block`,`inline`].forEach(t=>{n=n.concat(this[t].ruler.disable(e,!0))}),n=n.concat(this.inline.ruler2.disable(e,!0));let r=e.filter(e=>n.indexOf(e)<0);if(r.length&&!t)throw Error(`MarkdownIt. Failed to disable unknown rule(s): ${r}`);return this}use(e,...t){return e.apply(e,[this,...t]),this}parse(e,t){if(typeof e!=`string`)throw Error(`Input data should be a String`);let n=new this.core.State(e,this,t);return this.core.process(n),n.tokens}render(e,t={}){return this.renderer.render(this.parse(e,t),this.options,t)}parseInline(e,t){let n=new this.core.State(e,this,t);return n.inlineMode=!0,this.core.process(n),n.tokens}renderInline(e,t={}){return this.renderer.render(this.parseInline(e,t),this.options,t)}};return D($,`Token`,z),D($,`Ruler`,B),D($,`Renderer`,Ze),D($,`ParserCore`,Dt),D($,`StateCore`,Qe),D($,`ParserBlock`,Qt),D($,`StateBlock`,Ot),D($,`ParserInline`,Ln),D($,`StateInline`,$t),Ae($)});
//# sourceMappingURL=markdown-it.umd.min.js.map
    })(mdModule, mdModule.exports)
    const markdownit = mdModule.exports.markdownit ?? mdModule.exports

    // Vendored highlight.js (BSD-3-Clause) core plus a language subset.
var highlightjs = (function () {
  var modules = {
    "./languages/csharp": function (module, exports, require) {
/*
Language: C#
Author: Jason Diamond <jason@diamond.name>
Contributor: Nicolas LLOBERA <nllobera@gmail.com>, Pieter Vantorre <pietervantorre@gmail.com>, David Pine <david.pine@microsoft.com>
Website: https://docs.microsoft.com/dotnet/csharp/
Category: common
*/

/** @type LanguageFn */
function csharp(hljs) {
  const BUILT_IN_KEYWORDS = [
    'bool',
    'byte',
    'char',
    'decimal',
    'delegate',
    'double',
    'dynamic',
    'enum',
    'float',
    'int',
    'long',
    'nint',
    'nuint',
    'object',
    'sbyte',
    'short',
    'string',
    'ulong',
    'uint',
    'ushort'
  ];
  const FUNCTION_MODIFIERS = [
    'public',
    'private',
    'protected',
    'static',
    'internal',
    'protected',
    'abstract',
    'async',
    'extern',
    'override',
    'unsafe',
    'virtual',
    'new',
    'sealed',
    'partial'
  ];
  const LITERAL_KEYWORDS = [
    'default',
    'false',
    'null',
    'true'
  ];
  const NORMAL_KEYWORDS = [
    'abstract',
    'as',
    'base',
    'break',
    'case',
    'catch',
    'class',
    'const',
    'continue',
    'do',
    'else',
    'event',
    'explicit',
    'extern',
    'finally',
    'fixed',
    'for',
    'foreach',
    'goto',
    'if',
    'implicit',
    'in',
    'interface',
    'internal',
    'is',
    'lock',
    'namespace',
    'new',
    'operator',
    'out',
    'override',
    'params',
    'private',
    'protected',
    'public',
    'readonly',
    'record',
    'ref',
    'return',
    'scoped',
    'sealed',
    'sizeof',
    'stackalloc',
    'static',
    'struct',
    'switch',
    'this',
    'throw',
    'try',
    'typeof',
    'unchecked',
    'unsafe',
    'using',
    'virtual',
    'void',
    'volatile',
    'while'
  ];
  const CONTEXTUAL_KEYWORDS = [
    'add',
    'alias',
    'and',
    'ascending',
    'args',
    'async',
    'await',
    'by',
    'descending',
    'dynamic',
    'equals',
    'file',
    'from',
    'get',
    'global',
    'group',
    'init',
    'into',
    'join',
    'let',
    'nameof',
    'not',
    'notnull',
    'on',
    'or',
    'orderby',
    'partial',
    'record',
    'remove',
    'required',
    'scoped',
    'select',
    'set',
    'unmanaged',
    'value|0',
    'var',
    'when',
    'where',
    'with',
    'yield'
  ];

  const KEYWORDS = {
    keyword: NORMAL_KEYWORDS.concat(CONTEXTUAL_KEYWORDS),
    built_in: BUILT_IN_KEYWORDS,
    literal: LITERAL_KEYWORDS
  };
  const TITLE_MODE = hljs.inherit(hljs.TITLE_MODE, { begin: '[a-zA-Z](\\.?\\w)*' });
  // https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/integral-numeric-types
  // https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/floating-point-numeric-types
  // `_` separators sit between digits, and may also follow the `0x`/`0b` prefix
  const DIGITS = '\\d(_*\\d)*';
  const INTEGER_SUFFIX = '([uU][lL]?|[lL][uU]?)?';
  const REAL_SUFFIX = '([fFdDmM]|[uU][lL]?|[lL][uU]?)?';
  const NUMBERS = {
    className: 'number',
    variants: [
      { begin: '\\b0[bB]_*[01](_*[01])*' + INTEGER_SUFFIX },
      { begin: '(-?)\\b0[xX]_*[a-fA-F0-9](_*[a-fA-F0-9])*' + INTEGER_SUFFIX },
      { begin: '(-?)(\\b' + DIGITS + '(\\.(' + DIGITS + ')?)?|\\.' + DIGITS + ')([eE][-+]?' + DIGITS + ')?' + REAL_SUFFIX }
    ],
    relevance: 0
  };
  const RAW_STRING = {
    className: 'string',
    begin: /"""("*)(?!")(.|\n)*?"""\1/,
    relevance: 1
  };
  const VERBATIM_STRING = {
    className: 'string',
    begin: '@"',
    end: '"',
    contains: [ { begin: '""' } ]
  };
  const VERBATIM_STRING_NO_LF = hljs.inherit(VERBATIM_STRING, { illegal: /\n/ });
  const SUBST = {
    className: 'subst',
    begin: /\{/,
    end: /\}/,
    keywords: KEYWORDS
  };
  const SUBST_NO_LF = hljs.inherit(SUBST, { illegal: /\n/ });
  const INTERPOLATED_STRING = {
    className: 'string',
    begin: /\$"/,
    end: '"',
    illegal: /\n/,
    contains: [
      { begin: /\{\{/ },
      { begin: /\}\}/ },
      hljs.BACKSLASH_ESCAPE,
      SUBST_NO_LF
    ]
  };
  const INTERPOLATED_VERBATIM_STRING = {
    className: 'string',
    begin: /\$@"/,
    end: '"',
    contains: [
      { begin: /\{\{/ },
      { begin: /\}\}/ },
      { begin: '""' },
      SUBST
    ]
  };
  const INTERPOLATED_VERBATIM_STRING_NO_LF = hljs.inherit(INTERPOLATED_VERBATIM_STRING, {
    illegal: /\n/,
    contains: [
      { begin: /\{\{/ },
      { begin: /\}\}/ },
      { begin: '""' },
      SUBST_NO_LF
    ]
  });
  SUBST.contains = [
    INTERPOLATED_VERBATIM_STRING,
    INTERPOLATED_STRING,
    VERBATIM_STRING,
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    NUMBERS,
    hljs.C_BLOCK_COMMENT_MODE
  ];
  SUBST_NO_LF.contains = [
    INTERPOLATED_VERBATIM_STRING_NO_LF,
    INTERPOLATED_STRING,
    VERBATIM_STRING_NO_LF,
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    NUMBERS,
    hljs.inherit(hljs.C_BLOCK_COMMENT_MODE, { illegal: /\n/ })
  ];
  const STRING = { variants: [
    RAW_STRING,
    INTERPOLATED_VERBATIM_STRING,
    INTERPOLATED_STRING,
    VERBATIM_STRING,
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE
  ] };

  const GENERIC_MODIFIER = {
    begin: "<",
    end: ">",
    contains: [
      { beginKeywords: "in out" },
      TITLE_MODE
    ]
  };
  const TYPE_IDENT_RE = hljs.IDENT_RE + '(<' + hljs.IDENT_RE + '(\\s*,\\s*' + hljs.IDENT_RE + ')*>)?(\\[\\])?';
  const AT_IDENTIFIER = {
    // prevents expressions like `@class` from incorrect flagging
    // `class` as a keyword
    begin: "@" + hljs.IDENT_RE,
    relevance: 0
  };

  return {
    name: 'C#',
    aliases: [
      'cs',
      'c#'
    ],
    keywords: KEYWORDS,
    illegal: /::/,
    contains: [
      hljs.COMMENT(
        '///',
        '$',
        {
          returnBegin: true,
          contains: [
            {
              className: 'doctag',
              variants: [
                {
                  begin: '///',
                  relevance: 0
                },
                { begin: '<!--|-->' },
                {
                  begin: '</?',
                  end: '>'
                }
              ]
            }
          ]
        }
      ),
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: 'meta',
        begin: '#',
        end: '$',
        keywords: { keyword: 'if else elif endif define undef warning error line region endregion pragma checksum' }
      },
      STRING,
      NUMBERS,
      {
        beginKeywords: 'class interface',
        relevance: 0,
        end: /[{;=]/,
        illegal: /[^\s:,]/,
        contains: [
          { beginKeywords: "where class" },
          TITLE_MODE,
          GENERIC_MODIFIER,
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      {
        beginKeywords: 'namespace',
        relevance: 0,
        end: /[{;=]/,
        illegal: /[^\s:]/,
        contains: [
          TITLE_MODE,
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      {
        beginKeywords: 'record',
        relevance: 0,
        end: /[{;=]/,
        illegal: /[^\s:]/,
        contains: [
          TITLE_MODE,
          GENERIC_MODIFIER,
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      {
        // [Attributes("")]
        className: 'meta',
        begin: '^\\s*\\[(?=[\\w])',
        excludeBegin: true,
        end: '\\]',
        excludeEnd: true,
        contains: [
          {
            className: 'string',
            begin: /"/,
            end: /"/
          }
        ]
      },
      {
        // Expression keywords prevent 'keyword Name(...)' from being
        // recognized as a function definition
        beginKeywords: 'new return throw await else',
        relevance: 0
      },
      {
        className: 'function',
        begin: '(' + TYPE_IDENT_RE + '\\s+)+' + hljs.IDENT_RE + '\\s*(<[^=]+>\\s*)?\\(',
        returnBegin: true,
        end: /\s*[{;=]/,
        excludeEnd: true,
        keywords: KEYWORDS,
        contains: [
          // prevents these from being highlighted `title`
          {
            beginKeywords: FUNCTION_MODIFIERS.join(" "),
            relevance: 0
          },
          {
            begin: hljs.IDENT_RE + '\\s*(<[^=]+>\\s*)?\\(',
            returnBegin: true,
            contains: [
              hljs.TITLE_MODE,
              GENERIC_MODIFIER
            ],
            relevance: 0
          },
          { match: /\(\)/ },
          {
            className: 'params',
            begin: /\(/,
            end: /\)/,
            excludeBegin: true,
            excludeEnd: true,
            keywords: KEYWORDS,
            relevance: 0,
            contains: [
              STRING,
              NUMBERS,
              hljs.C_BLOCK_COMMENT_MODE
            ]
          },
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      AT_IDENTIFIER
    ]
  };
}

module.exports = csharp;

    },
    "./languages/javascript": function (module, exports, require) {
const IDENT_RE = '[A-Za-z$_][0-9A-Za-z$_]*';

const KEYWORDS = [
  "as", // for exports
  "in",
  "of",
  "if",
  "for",
  "while",
  "finally",
  "var",
  "new",
  "function",
  "do",
  "return",
  "void",
  "else",
  "break",
  "catch",
  "instanceof",
  "with",
  "throw",
  "case",
  "default",
  "try",
  "switch",
  "continue",
  "typeof",
  "delete",
  "let",
  "yield",
  "const",
  "class",
  // JS handles these with a special rule
  // "get",
  // "set",
  "debugger",
  "async",
  "await",
  "static",
  "import",
  "from",
  "export",
  "extends",
  // It's reached stage 3, which is "recommended for implementation":
  "using"
];
const LITERALS = [
  "true",
  "false",
  "null",
  "undefined",
  "NaN",
  "Infinity"
];

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects
const TYPES = [
  // Fundamental objects
  "Object",
  "Function",
  "Boolean",
  "Symbol",
  // numbers and dates
  "Math",
  "Date",
  "Number",
  "BigInt",
  // text
  "String",
  "RegExp",
  // Indexed collections
  "Array",
  "Float32Array",
  "Float64Array",
  "Int8Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "Int16Array",
  "Int32Array",
  "Uint16Array",
  "Uint32Array",
  "BigInt64Array",
  "BigUint64Array",
  // Keyed collections
  "Set",
  "Map",
  "WeakSet",
  "WeakMap",
  // Structured data
  "ArrayBuffer",
  "SharedArrayBuffer",
  "Atomics",
  "DataView",
  "JSON",
  // Control abstraction objects
  "Promise",
  "Generator",
  "GeneratorFunction",
  "AsyncFunction",
  // Reflection
  "Reflect",
  "Proxy",
  // Internationalization
  "Intl",
  // WebAssembly
  "WebAssembly"
];

const ERROR_TYPES = [
  "Error",
  "EvalError",
  "InternalError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "TypeError",
  "URIError"
];

const BUILT_IN_GLOBALS = [
  "setInterval",
  "setTimeout",
  "clearInterval",
  "clearTimeout",

  "require",
  "exports",

  "eval",
  "isFinite",
  "isNaN",
  "parseFloat",
  "parseInt",
  "decodeURI",
  "decodeURIComponent",
  "encodeURI",
  "encodeURIComponent",
  "escape",
  "unescape"
];

const BUILT_IN_VARIABLES = [
  "arguments",
  "this",
  "super",
  "console",
  "window",
  "document",
  "localStorage",
  "sessionStorage",
  "module",
  "self",
  "global" // Node.js
];

const BUILT_INS = [].concat(
  BUILT_IN_GLOBALS,
  TYPES,
  ERROR_TYPES
);

/*
Language: JavaScript
Description: JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions.
Category: common, scripting, web
Website: https://developer.mozilla.org/en-US/docs/Web/JavaScript
*/


/** @type LanguageFn */
function javascript(hljs) {
  const regex = hljs.regex;
  /**
   * Takes a string like "<Booger" and checks to see
   * if we can find a matching "</Booger" later in the
   * content.
   * @param {RegExpMatchArray} match
   * @param {{after:number}} param1
   */
  const hasClosingTag = (match, { after }) => {
    const tag = "</" + match[0].slice(1);
    const pos = match.input.indexOf(tag, after);
    return pos !== -1;
  };

  const IDENT_RE$1 = IDENT_RE;
  const FRAGMENT = {
    begin: '<>',
    end: '</>'
  };
  // to avoid some special cases inside isTrulyOpeningTag
  const XML_SELF_CLOSING = /<[A-Za-z0-9\\._:-]+\s*\/>/;
  const XML_TAG = {
    begin: /<[A-Za-z0-9\\._:-]+/,
    end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
    /**
     * @param {RegExpMatchArray} match
     * @param {CallbackResponse} response
     */
    isTrulyOpeningTag: (match, response) => {
      const afterMatchIndex = match[0].length + match.index;
      const nextChar = match.input[afterMatchIndex];
      if (
        // HTML should not include another raw `<` inside a tag
        // nested type?
        // `<Array<Array<number>>`, etc.
        nextChar === "<" ||
        // the , gives away that this is not HTML
        // `<T, A extends keyof T, V>`
        nextChar === ","
        ) {
        response.ignoreMatch();
        return;
      }

      // `<something>`
      // Quite possibly a tag, lets look for a matching closing tag...
      if (nextChar === ">") {
        // if we cannot find a matching closing tag, then we
        // will ignore it
        if (!hasClosingTag(match, { after: afterMatchIndex })) {
          response.ignoreMatch();
        }
      }

      // `<blah />` (self-closing)
      // handled by simpleSelfClosing rule

      let m;
      const afterMatch = match.input.substring(afterMatchIndex);

      // some more template typing stuff
      //  <T = any>(key?: string) => Modify<
      if ((m = afterMatch.match(/^\s*=/))) {
        response.ignoreMatch();
        return;
      }

      // `<From extends string>`
      // technically this could be HTML, but it smells like a type
      // NOTE: This is ugh, but added specifically for https://github.com/highlightjs/highlight.js/issues/3276
      if ((m = afterMatch.match(/^\s+extends\s+/))) {
        if (m.index === 0) {
          response.ignoreMatch();
          // eslint-disable-next-line no-useless-return
          return;
        }
      }
    }
  };
  const KEYWORDS$1 = {
    $pattern: IDENT_RE,
    keyword: KEYWORDS,
    literal: LITERALS,
    built_in: BUILT_INS,
    "variable.language": BUILT_IN_VARIABLES
  };

  // https://tc39.es/ecma262/#sec-literals-numeric-literals
  const decimalDigits = '[0-9](_?[0-9])*';
  const frac = `\\.(${decimalDigits})`;
  // DecimalIntegerLiteral, including Annex B NonOctalDecimalIntegerLiteral
  // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
  const decimalInteger = `0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*`;
  const NUMBER = {
    className: 'number',
    variants: [
      // DecimalLiteral
      { begin: `(\\b(${decimalInteger})((${frac})|\\.)?|(${frac}))` +
        `[eE][+-]?(${decimalDigits})\\b` },
      { begin: `\\b(${decimalInteger})\\b((${frac})\\b|\\.)?|(${frac})\\b` },

      // DecimalBigIntegerLiteral
      { begin: `\\b(0|[1-9](_?[0-9])*)n\\b` },

      // NonDecimalIntegerLiteral
      { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b" },
      { begin: "\\b0[bB][0-1](_?[0-1])*n?\\b" },
      { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },

      // LegacyOctalIntegerLiteral (does not include underscore separators)
      // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
      { begin: "\\b0[0-7]+n?\\b" },
    ],
    relevance: 0
  };

  const SUBST = {
    className: 'subst',
    begin: '\\$\\{',
    end: '\\}',
    keywords: KEYWORDS$1,
    contains: [] // defined later
  };
  const HTML_TEMPLATE = {
    begin: '\.?html`',
    end: '',
    starts: {
      end: '`',
      returnEnd: false,
      contains: [
        hljs.BACKSLASH_ESCAPE,
        SUBST
      ],
      subLanguage: 'xml'
    }
  };
  const CSS_TEMPLATE = {
    begin: '\.?css`',
    end: '',
    starts: {
      end: '`',
      returnEnd: false,
      contains: [
        hljs.BACKSLASH_ESCAPE,
        SUBST
      ],
      subLanguage: 'css'
    }
  };
  const GRAPHQL_TEMPLATE = {
    begin: '\.?gql`',
    end: '',
    starts: {
      end: '`',
      returnEnd: false,
      contains: [
        hljs.BACKSLASH_ESCAPE,
        SUBST
      ],
      subLanguage: 'graphql'
    }
  };
  const TEMPLATE_STRING = {
    className: 'string',
    begin: '`',
    end: '`',
    contains: [
      hljs.BACKSLASH_ESCAPE,
      SUBST
    ]
  };
  const JSDOC_COMMENT = hljs.COMMENT(
    /\/\*\*(?!\/)/,
    '\\*/',
    {
      relevance: 0,
      contains: [
        {
          begin: '(?=@[A-Za-z]+)',
          relevance: 0,
          contains: [
            {
              className: 'doctag',
              begin: '@[A-Za-z]+'
            },
            {
              className: 'type',
              begin: '\\{',
              end: '\\}',
              excludeEnd: true,
              excludeBegin: true,
              relevance: 0
            },
            {
              className: 'variable',
              begin: IDENT_RE$1 + '(?=\\s*(-)|$)',
              endsParent: true,
              relevance: 0
            },
            // eat spaces (not newlines) so we can find
            // types or variables
            {
              begin: /(?=[^\n])\s/,
              relevance: 0
            }
          ]
        }
      ]
    }
  );
  const COMMENT = {
    className: "comment",
    variants: [
      JSDOC_COMMENT,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.C_LINE_COMMENT_MODE
    ]
  };
  const SUBST_INTERNALS = [
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    HTML_TEMPLATE,
    CSS_TEMPLATE,
    GRAPHQL_TEMPLATE,
    TEMPLATE_STRING,
    // Skip numbers when they are part of a variable name
    { match: /\$\d+/ },
    NUMBER,
    // This is intentional:
    // See https://github.com/highlightjs/highlight.js/issues/3288
    // hljs.REGEXP_MODE
  ];
  SUBST.contains = SUBST_INTERNALS
    .concat({
      // we need to pair up {} inside our subst to prevent
      // it from ending too early by matching another }
      begin: /\{/,
      end: /\}/,
      keywords: KEYWORDS$1,
      contains: [
        "self"
      ].concat(SUBST_INTERNALS)
    });
  const SUBST_AND_COMMENTS = [].concat(COMMENT, SUBST.contains);
  const PARAMS_CONTAINS = SUBST_AND_COMMENTS.concat([
    // eat recursive parens in sub expressions
    {
      begin: /(\s*)\(/,
      end: /\)/,
      keywords: KEYWORDS$1,
      contains: ["self"].concat(SUBST_AND_COMMENTS)
    }
  ]);
  const PARAMS = {
    className: 'params',
    // convert this to negative lookbehind in v12
    begin: /(\s*)\(/, // to match the parms with
    end: /\)/,
    excludeBegin: true,
    excludeEnd: true,
    keywords: KEYWORDS$1,
    contains: PARAMS_CONTAINS
  };

  // ES6 classes
  const CLASS_OR_EXTENDS = {
    variants: [
      // class Car extends vehicle
      {
        match: [
          /class/,
          /\s+/,
          IDENT_RE$1,
          /\s+/,
          /extends/,
          /\s+/,
          regex.concat(IDENT_RE$1, "(", regex.concat(/\./, IDENT_RE$1), ")*")
        ],
        scope: {
          1: "keyword",
          3: "title.class",
          5: "keyword",
          7: "title.class.inherited"
        }
      },
      // class Car
      {
        match: [
          /class/,
          /\s+/,
          IDENT_RE$1
        ],
        scope: {
          1: "keyword",
          3: "title.class"
        }
      },

    ]
  };

  const CLASS_REFERENCE = {
    relevance: 0,
    match:
    regex.either(
      // Hard coded exceptions
      /\bJSON/,
      // Float32Array, OutT
      /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,
      // CSSFactory, CSSFactoryT
      /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,
      // FPs, FPsT
      /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/,
      // P
      // single letters are not highlighted
      // BLAH
      // this will be flagged as a UPPER_CASE_CONSTANT instead
    ),
    className: "title.class",
    keywords: {
      _: [
        // se we still get relevance credit for JS library classes
        ...TYPES,
        ...ERROR_TYPES
      ]
    }
  };

  const USE_STRICT = {
    label: "use_strict",
    className: 'meta',
    relevance: 10,
    begin: /^\s*['"]use (strict|asm)['"]/
  };

  const FUNCTION_DEFINITION = {
    variants: [
      {
        match: [
          /function/,
          /\s+/,
          IDENT_RE$1,
          /(?=\s*\()/
        ]
      },
      // anonymous function
      {
        match: [
          /function/,
          /\s*(?=\()/
        ]
      }
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    label: "func.def",
    contains: [ PARAMS ],
    illegal: /%/
  };

  const UPPER_CASE_CONSTANT = {
    relevance: 0,
    match: /\b[A-Z][A-Z_0-9]+\b/,
    className: "variable.constant"
  };

  function noneOf(list) {
    return regex.concat("(?!", list.join("|"), ")");
  }

  const FUNCTION_CALL = {
    match: regex.concat(
      /\b/,
      noneOf([
        ...BUILT_IN_GLOBALS,
        "super",
        "import",
        "await",
      ].map(x => `${x}\\s*\\(`)),
      IDENT_RE$1, regex.lookahead(/\s*\(/)),
    className: "title.function",
    relevance: 0
  };

  const PROPERTY_ACCESS = {
    begin: regex.concat(/\./, regex.lookahead(
      regex.concat(IDENT_RE$1, /(?![0-9A-Za-z$_(])/)
    )),
    end: IDENT_RE$1,
    excludeBegin: true,
    keywords: "prototype",
    className: "property",
    relevance: 0
  };

  const GETTER_OR_SETTER = {
    match: [
      /get|set/,
      /\s+/,
      IDENT_RE$1,
      /(?=\()/
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      { // eat to avoid empty params
        begin: /\(\)/
      },
      PARAMS
    ]
  };

  const FUNC_LEAD_IN_RE = '(\\(' +
    '[^()]*(\\(' +
    '[^()]*(\\(' +
    '[^()]*' +
    '\\)[^()]*)*' +
    '\\)[^()]*)*' +
    '\\)|' + hljs.UNDERSCORE_IDENT_RE + ')\\s*=>';

  const FUNCTION_VARIABLE = {
    match: [
      /const|var|let/, /\s+/,
      IDENT_RE$1, /\s*/,
      /=\s*/,
      /(async\s*)?/, // async is optional
      regex.lookahead(FUNC_LEAD_IN_RE)
    ],
    keywords: "async",
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      PARAMS
    ]
  };

  return {
    name: 'JavaScript',
    aliases: ['js', 'jsx', 'mjs', 'cjs'],
    keywords: KEYWORDS$1,
    // this will be extended by TypeScript
    exports: { PARAMS_CONTAINS, CLASS_REFERENCE },
    illegal: /#(?![$_A-Za-z])/,
    contains: [
      hljs.SHEBANG({
        label: "shebang",
        binary: "node",
        relevance: 5
      }),
      USE_STRICT,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      HTML_TEMPLATE,
      CSS_TEMPLATE,
      GRAPHQL_TEMPLATE,
      TEMPLATE_STRING,
      COMMENT,
      // Skip numbers when they are part of a variable name
      { match: /\$\d+/ },
      NUMBER,
      CLASS_REFERENCE,
      {
        scope: 'attr',
        match: IDENT_RE$1 + regex.lookahead(':'),
        relevance: 0
      },
      FUNCTION_VARIABLE,
      { // "value" container
        begin: '(' + hljs.RE_STARTERS_RE + '|\\b(case|return|throw)\\b)\\s*',
        keywords: 'return throw case',
        relevance: 0,
        contains: [
          COMMENT,
          hljs.REGEXP_MODE,
          {
            className: 'function',
            // we have to count the parens to make sure we actually have the
            // correct bounding ( ) before the =>.  There could be any number of
            // sub-expressions inside also surrounded by parens.
            begin: FUNC_LEAD_IN_RE,
            returnBegin: true,
            end: '\\s*=>',
            contains: [
              {
                className: 'params',
                variants: [
                  {
                    begin: hljs.UNDERSCORE_IDENT_RE,
                    relevance: 0
                  },
                  {
                    className: null,
                    begin: /\(\s*\)/,
                    skip: true
                  },
                  {
                    begin: /(\s*)\(/,
                    end: /\)/,
                    excludeBegin: true,
                    excludeEnd: true,
                    keywords: KEYWORDS$1,
                    contains: PARAMS_CONTAINS
                  }
                ]
              }
            ]
          },
          { // could be a comma delimited list of params to a function call
            begin: /,/,
            relevance: 0
          },
          {
            match: /\s+/,
            relevance: 0
          },
          { // JSX
            variants: [
              { begin: FRAGMENT.begin, end: FRAGMENT.end },
              { match: XML_SELF_CLOSING },
              {
                begin: XML_TAG.begin,
                // we carefully check the opening tag to see if it truly
                // is a tag and not a false positive
                'on:begin': XML_TAG.isTrulyOpeningTag,
                end: XML_TAG.end
              }
            ],
            subLanguage: 'xml',
            contains: [
              {
                begin: XML_TAG.begin,
                end: XML_TAG.end,
                skip: true,
                contains: ['self']
              }
            ]
          }
        ],
      },
      FUNCTION_DEFINITION,
      {
        // prevent this from getting swallowed up by function
        // since they appear "function like"
        beginKeywords: "while if switch catch for"
      },
      {
        // we have to count the parens to make sure we actually have the correct
        // bounding ( ).  There could be any number of sub-expressions inside
        // also surrounded by parens.
        begin: '\\b(?!function)' + hljs.UNDERSCORE_IDENT_RE +
          '\\(' + // first parens
          '[^()]*(\\(' +
            '[^()]*(\\(' +
              '[^()]*' +
            '\\)[^()]*)*' +
          '\\)[^()]*)*' +
          '\\)\\s*\\{', // end parens
        returnBegin:true,
        label: "func.def",
        contains: [
          PARAMS,
          hljs.inherit(hljs.TITLE_MODE, { begin: IDENT_RE$1, className: "title.function" })
        ]
      },
      // catch ... so it won't trigger the property rule below
      {
        match: /\.\.\./,
        relevance: 0
      },
      PROPERTY_ACCESS,
      // hack: prevents detection of keywords in some circumstances
      // .keyword()
      // $keyword = x
      {
        match: '\\$' + IDENT_RE$1,
        relevance: 0
      },
      {
        match: [ /\bconstructor(?=\s*\()/ ],
        className: { 1: "title.function" },
        contains: [ PARAMS ]
      },
      FUNCTION_CALL,
      UPPER_CASE_CONSTANT,
      CLASS_OR_EXTENDS,
      GETTER_OR_SETTER,
      {
        match: /\$[(.]/ // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
      }
    ]
  };
}

module.exports = javascript;

    },
    "./languages/typescript": function (module, exports, require) {
const IDENT_RE = '[A-Za-z$_][0-9A-Za-z$_]*';

const KEYWORDS = [
  "as", // for exports
  "in",
  "of",
  "if",
  "for",
  "while",
  "finally",
  "var",
  "new",
  "function",
  "do",
  "return",
  "void",
  "else",
  "break",
  "catch",
  "instanceof",
  "with",
  "throw",
  "case",
  "default",
  "try",
  "switch",
  "continue",
  "typeof",
  "delete",
  "let",
  "yield",
  "const",
  "class",
  // JS handles these with a special rule
  // "get",
  // "set",
  "debugger",
  "async",
  "await",
  "static",
  "import",
  "from",
  "export",
  "extends",
  // It's reached stage 3, which is "recommended for implementation":
  "using"
];
const LITERALS = [
  "true",
  "false",
  "null",
  "undefined",
  "NaN",
  "Infinity"
];

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects
const TYPES = [
  // Fundamental objects
  "Object",
  "Function",
  "Boolean",
  "Symbol",
  // numbers and dates
  "Math",
  "Date",
  "Number",
  "BigInt",
  // text
  "String",
  "RegExp",
  // Indexed collections
  "Array",
  "Float32Array",
  "Float64Array",
  "Int8Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "Int16Array",
  "Int32Array",
  "Uint16Array",
  "Uint32Array",
  "BigInt64Array",
  "BigUint64Array",
  // Keyed collections
  "Set",
  "Map",
  "WeakSet",
  "WeakMap",
  // Structured data
  "ArrayBuffer",
  "SharedArrayBuffer",
  "Atomics",
  "DataView",
  "JSON",
  // Control abstraction objects
  "Promise",
  "Generator",
  "GeneratorFunction",
  "AsyncFunction",
  // Reflection
  "Reflect",
  "Proxy",
  // Internationalization
  "Intl",
  // WebAssembly
  "WebAssembly"
];

const ERROR_TYPES = [
  "Error",
  "EvalError",
  "InternalError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "TypeError",
  "URIError"
];

const BUILT_IN_GLOBALS = [
  "setInterval",
  "setTimeout",
  "clearInterval",
  "clearTimeout",

  "require",
  "exports",

  "eval",
  "isFinite",
  "isNaN",
  "parseFloat",
  "parseInt",
  "decodeURI",
  "decodeURIComponent",
  "encodeURI",
  "encodeURIComponent",
  "escape",
  "unescape"
];

const BUILT_IN_VARIABLES = [
  "arguments",
  "this",
  "super",
  "console",
  "window",
  "document",
  "localStorage",
  "sessionStorage",
  "module",
  "self",
  "global" // Node.js
];

const BUILT_INS = [].concat(
  BUILT_IN_GLOBALS,
  TYPES,
  ERROR_TYPES
);

/*
Language: JavaScript
Description: JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions.
Category: common, scripting, web
Website: https://developer.mozilla.org/en-US/docs/Web/JavaScript
*/


/** @type LanguageFn */
function javascript(hljs) {
  const regex = hljs.regex;
  /**
   * Takes a string like "<Booger" and checks to see
   * if we can find a matching "</Booger" later in the
   * content.
   * @param {RegExpMatchArray} match
   * @param {{after:number}} param1
   */
  const hasClosingTag = (match, { after }) => {
    const tag = "</" + match[0].slice(1);
    const pos = match.input.indexOf(tag, after);
    return pos !== -1;
  };

  const IDENT_RE$1 = IDENT_RE;
  const FRAGMENT = {
    begin: '<>',
    end: '</>'
  };
  // to avoid some special cases inside isTrulyOpeningTag
  const XML_SELF_CLOSING = /<[A-Za-z0-9\\._:-]+\s*\/>/;
  const XML_TAG = {
    begin: /<[A-Za-z0-9\\._:-]+/,
    end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
    /**
     * @param {RegExpMatchArray} match
     * @param {CallbackResponse} response
     */
    isTrulyOpeningTag: (match, response) => {
      const afterMatchIndex = match[0].length + match.index;
      const nextChar = match.input[afterMatchIndex];
      if (
        // HTML should not include another raw `<` inside a tag
        // nested type?
        // `<Array<Array<number>>`, etc.
        nextChar === "<" ||
        // the , gives away that this is not HTML
        // `<T, A extends keyof T, V>`
        nextChar === ","
        ) {
        response.ignoreMatch();
        return;
      }

      // `<something>`
      // Quite possibly a tag, lets look for a matching closing tag...
      if (nextChar === ">") {
        // if we cannot find a matching closing tag, then we
        // will ignore it
        if (!hasClosingTag(match, { after: afterMatchIndex })) {
          response.ignoreMatch();
        }
      }

      // `<blah />` (self-closing)
      // handled by simpleSelfClosing rule

      let m;
      const afterMatch = match.input.substring(afterMatchIndex);

      // some more template typing stuff
      //  <T = any>(key?: string) => Modify<
      if ((m = afterMatch.match(/^\s*=/))) {
        response.ignoreMatch();
        return;
      }

      // `<From extends string>`
      // technically this could be HTML, but it smells like a type
      // NOTE: This is ugh, but added specifically for https://github.com/highlightjs/highlight.js/issues/3276
      if ((m = afterMatch.match(/^\s+extends\s+/))) {
        if (m.index === 0) {
          response.ignoreMatch();
          // eslint-disable-next-line no-useless-return
          return;
        }
      }
    }
  };
  const KEYWORDS$1 = {
    $pattern: IDENT_RE,
    keyword: KEYWORDS,
    literal: LITERALS,
    built_in: BUILT_INS,
    "variable.language": BUILT_IN_VARIABLES
  };

  // https://tc39.es/ecma262/#sec-literals-numeric-literals
  const decimalDigits = '[0-9](_?[0-9])*';
  const frac = `\\.(${decimalDigits})`;
  // DecimalIntegerLiteral, including Annex B NonOctalDecimalIntegerLiteral
  // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
  const decimalInteger = `0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*`;
  const NUMBER = {
    className: 'number',
    variants: [
      // DecimalLiteral
      { begin: `(\\b(${decimalInteger})((${frac})|\\.)?|(${frac}))` +
        `[eE][+-]?(${decimalDigits})\\b` },
      { begin: `\\b(${decimalInteger})\\b((${frac})\\b|\\.)?|(${frac})\\b` },

      // DecimalBigIntegerLiteral
      { begin: `\\b(0|[1-9](_?[0-9])*)n\\b` },

      // NonDecimalIntegerLiteral
      { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b" },
      { begin: "\\b0[bB][0-1](_?[0-1])*n?\\b" },
      { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },

      // LegacyOctalIntegerLiteral (does not include underscore separators)
      // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
      { begin: "\\b0[0-7]+n?\\b" },
    ],
    relevance: 0
  };

  const SUBST = {
    className: 'subst',
    begin: '\\$\\{',
    end: '\\}',
    keywords: KEYWORDS$1,
    contains: [] // defined later
  };
  const HTML_TEMPLATE = {
    begin: '\.?html`',
    end: '',
    starts: {
      end: '`',
      returnEnd: false,
      contains: [
        hljs.BACKSLASH_ESCAPE,
        SUBST
      ],
      subLanguage: 'xml'
    }
  };
  const CSS_TEMPLATE = {
    begin: '\.?css`',
    end: '',
    starts: {
      end: '`',
      returnEnd: false,
      contains: [
        hljs.BACKSLASH_ESCAPE,
        SUBST
      ],
      subLanguage: 'css'
    }
  };
  const GRAPHQL_TEMPLATE = {
    begin: '\.?gql`',
    end: '',
    starts: {
      end: '`',
      returnEnd: false,
      contains: [
        hljs.BACKSLASH_ESCAPE,
        SUBST
      ],
      subLanguage: 'graphql'
    }
  };
  const TEMPLATE_STRING = {
    className: 'string',
    begin: '`',
    end: '`',
    contains: [
      hljs.BACKSLASH_ESCAPE,
      SUBST
    ]
  };
  const JSDOC_COMMENT = hljs.COMMENT(
    /\/\*\*(?!\/)/,
    '\\*/',
    {
      relevance: 0,
      contains: [
        {
          begin: '(?=@[A-Za-z]+)',
          relevance: 0,
          contains: [
            {
              className: 'doctag',
              begin: '@[A-Za-z]+'
            },
            {
              className: 'type',
              begin: '\\{',
              end: '\\}',
              excludeEnd: true,
              excludeBegin: true,
              relevance: 0
            },
            {
              className: 'variable',
              begin: IDENT_RE$1 + '(?=\\s*(-)|$)',
              endsParent: true,
              relevance: 0
            },
            // eat spaces (not newlines) so we can find
            // types or variables
            {
              begin: /(?=[^\n])\s/,
              relevance: 0
            }
          ]
        }
      ]
    }
  );
  const COMMENT = {
    className: "comment",
    variants: [
      JSDOC_COMMENT,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.C_LINE_COMMENT_MODE
    ]
  };
  const SUBST_INTERNALS = [
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    HTML_TEMPLATE,
    CSS_TEMPLATE,
    GRAPHQL_TEMPLATE,
    TEMPLATE_STRING,
    // Skip numbers when they are part of a variable name
    { match: /\$\d+/ },
    NUMBER,
    // This is intentional:
    // See https://github.com/highlightjs/highlight.js/issues/3288
    // hljs.REGEXP_MODE
  ];
  SUBST.contains = SUBST_INTERNALS
    .concat({
      // we need to pair up {} inside our subst to prevent
      // it from ending too early by matching another }
      begin: /\{/,
      end: /\}/,
      keywords: KEYWORDS$1,
      contains: [
        "self"
      ].concat(SUBST_INTERNALS)
    });
  const SUBST_AND_COMMENTS = [].concat(COMMENT, SUBST.contains);
  const PARAMS_CONTAINS = SUBST_AND_COMMENTS.concat([
    // eat recursive parens in sub expressions
    {
      begin: /(\s*)\(/,
      end: /\)/,
      keywords: KEYWORDS$1,
      contains: ["self"].concat(SUBST_AND_COMMENTS)
    }
  ]);
  const PARAMS = {
    className: 'params',
    // convert this to negative lookbehind in v12
    begin: /(\s*)\(/, // to match the parms with
    end: /\)/,
    excludeBegin: true,
    excludeEnd: true,
    keywords: KEYWORDS$1,
    contains: PARAMS_CONTAINS
  };

  // ES6 classes
  const CLASS_OR_EXTENDS = {
    variants: [
      // class Car extends vehicle
      {
        match: [
          /class/,
          /\s+/,
          IDENT_RE$1,
          /\s+/,
          /extends/,
          /\s+/,
          regex.concat(IDENT_RE$1, "(", regex.concat(/\./, IDENT_RE$1), ")*")
        ],
        scope: {
          1: "keyword",
          3: "title.class",
          5: "keyword",
          7: "title.class.inherited"
        }
      },
      // class Car
      {
        match: [
          /class/,
          /\s+/,
          IDENT_RE$1
        ],
        scope: {
          1: "keyword",
          3: "title.class"
        }
      },

    ]
  };

  const CLASS_REFERENCE = {
    relevance: 0,
    match:
    regex.either(
      // Hard coded exceptions
      /\bJSON/,
      // Float32Array, OutT
      /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,
      // CSSFactory, CSSFactoryT
      /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,
      // FPs, FPsT
      /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/,
      // P
      // single letters are not highlighted
      // BLAH
      // this will be flagged as a UPPER_CASE_CONSTANT instead
    ),
    className: "title.class",
    keywords: {
      _: [
        // se we still get relevance credit for JS library classes
        ...TYPES,
        ...ERROR_TYPES
      ]
    }
  };

  const USE_STRICT = {
    label: "use_strict",
    className: 'meta',
    relevance: 10,
    begin: /^\s*['"]use (strict|asm)['"]/
  };

  const FUNCTION_DEFINITION = {
    variants: [
      {
        match: [
          /function/,
          /\s+/,
          IDENT_RE$1,
          /(?=\s*\()/
        ]
      },
      // anonymous function
      {
        match: [
          /function/,
          /\s*(?=\()/
        ]
      }
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    label: "func.def",
    contains: [ PARAMS ],
    illegal: /%/
  };

  const UPPER_CASE_CONSTANT = {
    relevance: 0,
    match: /\b[A-Z][A-Z_0-9]+\b/,
    className: "variable.constant"
  };

  function noneOf(list) {
    return regex.concat("(?!", list.join("|"), ")");
  }

  const FUNCTION_CALL = {
    match: regex.concat(
      /\b/,
      noneOf([
        ...BUILT_IN_GLOBALS,
        "super",
        "import",
        "await",
      ].map(x => `${x}\\s*\\(`)),
      IDENT_RE$1, regex.lookahead(/\s*\(/)),
    className: "title.function",
    relevance: 0
  };

  const PROPERTY_ACCESS = {
    begin: regex.concat(/\./, regex.lookahead(
      regex.concat(IDENT_RE$1, /(?![0-9A-Za-z$_(])/)
    )),
    end: IDENT_RE$1,
    excludeBegin: true,
    keywords: "prototype",
    className: "property",
    relevance: 0
  };

  const GETTER_OR_SETTER = {
    match: [
      /get|set/,
      /\s+/,
      IDENT_RE$1,
      /(?=\()/
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      { // eat to avoid empty params
        begin: /\(\)/
      },
      PARAMS
    ]
  };

  const FUNC_LEAD_IN_RE = '(\\(' +
    '[^()]*(\\(' +
    '[^()]*(\\(' +
    '[^()]*' +
    '\\)[^()]*)*' +
    '\\)[^()]*)*' +
    '\\)|' + hljs.UNDERSCORE_IDENT_RE + ')\\s*=>';

  const FUNCTION_VARIABLE = {
    match: [
      /const|var|let/, /\s+/,
      IDENT_RE$1, /\s*/,
      /=\s*/,
      /(async\s*)?/, // async is optional
      regex.lookahead(FUNC_LEAD_IN_RE)
    ],
    keywords: "async",
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      PARAMS
    ]
  };

  return {
    name: 'JavaScript',
    aliases: ['js', 'jsx', 'mjs', 'cjs'],
    keywords: KEYWORDS$1,
    // this will be extended by TypeScript
    exports: { PARAMS_CONTAINS, CLASS_REFERENCE },
    illegal: /#(?![$_A-Za-z])/,
    contains: [
      hljs.SHEBANG({
        label: "shebang",
        binary: "node",
        relevance: 5
      }),
      USE_STRICT,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      HTML_TEMPLATE,
      CSS_TEMPLATE,
      GRAPHQL_TEMPLATE,
      TEMPLATE_STRING,
      COMMENT,
      // Skip numbers when they are part of a variable name
      { match: /\$\d+/ },
      NUMBER,
      CLASS_REFERENCE,
      {
        scope: 'attr',
        match: IDENT_RE$1 + regex.lookahead(':'),
        relevance: 0
      },
      FUNCTION_VARIABLE,
      { // "value" container
        begin: '(' + hljs.RE_STARTERS_RE + '|\\b(case|return|throw)\\b)\\s*',
        keywords: 'return throw case',
        relevance: 0,
        contains: [
          COMMENT,
          hljs.REGEXP_MODE,
          {
            className: 'function',
            // we have to count the parens to make sure we actually have the
            // correct bounding ( ) before the =>.  There could be any number of
            // sub-expressions inside also surrounded by parens.
            begin: FUNC_LEAD_IN_RE,
            returnBegin: true,
            end: '\\s*=>',
            contains: [
              {
                className: 'params',
                variants: [
                  {
                    begin: hljs.UNDERSCORE_IDENT_RE,
                    relevance: 0
                  },
                  {
                    className: null,
                    begin: /\(\s*\)/,
                    skip: true
                  },
                  {
                    begin: /(\s*)\(/,
                    end: /\)/,
                    excludeBegin: true,
                    excludeEnd: true,
                    keywords: KEYWORDS$1,
                    contains: PARAMS_CONTAINS
                  }
                ]
              }
            ]
          },
          { // could be a comma delimited list of params to a function call
            begin: /,/,
            relevance: 0
          },
          {
            match: /\s+/,
            relevance: 0
          },
          { // JSX
            variants: [
              { begin: FRAGMENT.begin, end: FRAGMENT.end },
              { match: XML_SELF_CLOSING },
              {
                begin: XML_TAG.begin,
                // we carefully check the opening tag to see if it truly
                // is a tag and not a false positive
                'on:begin': XML_TAG.isTrulyOpeningTag,
                end: XML_TAG.end
              }
            ],
            subLanguage: 'xml',
            contains: [
              {
                begin: XML_TAG.begin,
                end: XML_TAG.end,
                skip: true,
                contains: ['self']
              }
            ]
          }
        ],
      },
      FUNCTION_DEFINITION,
      {
        // prevent this from getting swallowed up by function
        // since they appear "function like"
        beginKeywords: "while if switch catch for"
      },
      {
        // we have to count the parens to make sure we actually have the correct
        // bounding ( ).  There could be any number of sub-expressions inside
        // also surrounded by parens.
        begin: '\\b(?!function)' + hljs.UNDERSCORE_IDENT_RE +
          '\\(' + // first parens
          '[^()]*(\\(' +
            '[^()]*(\\(' +
              '[^()]*' +
            '\\)[^()]*)*' +
          '\\)[^()]*)*' +
          '\\)\\s*\\{', // end parens
        returnBegin:true,
        label: "func.def",
        contains: [
          PARAMS,
          hljs.inherit(hljs.TITLE_MODE, { begin: IDENT_RE$1, className: "title.function" })
        ]
      },
      // catch ... so it won't trigger the property rule below
      {
        match: /\.\.\./,
        relevance: 0
      },
      PROPERTY_ACCESS,
      // hack: prevents detection of keywords in some circumstances
      // .keyword()
      // $keyword = x
      {
        match: '\\$' + IDENT_RE$1,
        relevance: 0
      },
      {
        match: [ /\bconstructor(?=\s*\()/ ],
        className: { 1: "title.function" },
        contains: [ PARAMS ]
      },
      FUNCTION_CALL,
      UPPER_CASE_CONSTANT,
      CLASS_OR_EXTENDS,
      GETTER_OR_SETTER,
      {
        match: /\$[(.]/ // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
      }
    ]
  };
}

/*
Language: TypeScript
Author: Panu Horsmalahti <panu.horsmalahti@iki.fi>
Contributors: Ike Ku <dempfi@yahoo.com>
Description: TypeScript is a strict superset of JavaScript
Website: https://www.typescriptlang.org
Category: common, scripting
*/


/** @type LanguageFn */
function typescript(hljs) {
  const regex = hljs.regex;
  const tsLanguage = javascript(hljs);

  const IDENT_RE$1 = IDENT_RE;
  const TYPES = [
    "any",
    "void",
    "number",
    "boolean",
    "string",
    "object",
    "never",
    "symbol",
    "bigint",
    "unknown"
  ];
  const NAMESPACE = {
    begin: [
      /namespace/,
      /\s+/,
      hljs.IDENT_RE
    ],
    beginScope: {
      1: "keyword",
      3: "title.class"
    }
  };
  const INTERFACE = {
    beginKeywords: 'interface',
    end: /\{/,
    excludeEnd: true,
    keywords: {
      keyword: 'interface extends',
      built_in: TYPES
    },
    contains: [ tsLanguage.exports.CLASS_REFERENCE ]
  };
  const USE_STRICT = {
    className: 'meta',
    relevance: 10,
    begin: /^\s*['"]use strict['"]/
  };
  const TS_SPECIFIC_KEYWORDS = [
    "type",
    // "namespace",
    "interface",
    "public",
    "private",
    "protected",
    "implements",
    "declare",
    "abstract",
    "readonly",
    "enum",
    "override",
    "satisfies"
  ];
  /*
    namespace is a TS keyword but it's fine to use it as a variable name too.
    const message = 'foo';
    const namespace = 'bar';
  */
  const KEYWORDS$1 = {
    $pattern: IDENT_RE,
    keyword: KEYWORDS.concat(TS_SPECIFIC_KEYWORDS),
    literal: LITERALS,
    built_in: BUILT_INS.concat(TYPES),
    "variable.language": BUILT_IN_VARIABLES
  };

  const DECORATOR = {
    className: 'meta',
    begin: '@' + IDENT_RE$1,
  };

  const swapMode = (mode, label, replacement) => {
    const indx = mode.contains.findIndex(m => m.label === label);
    if (indx === -1) { throw new Error("can not find mode to replace"); }

    mode.contains.splice(indx, 1, replacement);
  };


  // this should update anywhere keywords is used since
  // it will be the same actual JS object
  Object.assign(tsLanguage.keywords, KEYWORDS$1);

  tsLanguage.exports.PARAMS_CONTAINS.push(DECORATOR);

  // highlight the function params
  const ATTRIBUTE_HIGHLIGHT = tsLanguage.contains.find(c => c.scope === "attr");

  // take default attr rule and extend it to support optionals
  const OPTIONAL_KEY_OR_ARGUMENT = Object.assign({},
    ATTRIBUTE_HIGHLIGHT,
    { match: regex.concat(IDENT_RE$1, regex.lookahead(/\s*\?:/)) }
  );
  tsLanguage.exports.PARAMS_CONTAINS.push([
    tsLanguage.exports.CLASS_REFERENCE, // class reference for highlighting the params types
    ATTRIBUTE_HIGHLIGHT, // highlight the params key
    OPTIONAL_KEY_OR_ARGUMENT, // Added for optional property assignment highlighting
  ]);

  // Add the optional property assignment highlighting for objects or classes
  tsLanguage.contains = tsLanguage.contains.concat([
    DECORATOR,
    NAMESPACE,
    INTERFACE,
    OPTIONAL_KEY_OR_ARGUMENT, // Added for optional property assignment highlighting
  ]);

  // TS gets a simpler shebang rule than JS
  swapMode(tsLanguage, "shebang", hljs.SHEBANG());
  // JS use strict rule purposely excludes `asm` which makes no sense
  swapMode(tsLanguage, "use_strict", USE_STRICT);

  const functionDeclaration = tsLanguage.contains.find(m => m.label === "func.def");
  functionDeclaration.relevance = 0; // () => {} is more typical in TypeScript

  Object.assign(tsLanguage, {
    name: 'TypeScript',
    aliases: [
      'ts',
      'tsx',
      'mts',
      'cts'
    ]
  });

  return tsLanguage;
}

module.exports = typescript;

    },
    "./languages/json": function (module, exports, require) {
const EXTENDED_NUMBER_RE = '([-+]?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)|NaN|[-+]?Infinity'; // 0x..., 0..., decimal, float

const EXTENDED_NUMBER_MODE = {
  scope: 'number',
  match: EXTENDED_NUMBER_RE,
  relevance: 0
};

/*
Language: JSON
Description: JSON (JavaScript Object Notation) is a lightweight data-interchange format.
Websites: http://www.json.org, https://www.json5.org
Category: common, protocols, web
*/


function json(hljs) {
  const ATTRIBUTE = {
    className: 'attr',
    begin: /(("(\\.|[^\\"\r\n])*")|('(\\.|[^\\'\r\n])*'))(?=\s*:)/,
    relevance: 1.01
  };
  const PUNCTUATION = {
    match: /[{}[\],:]/,
    className: "punctuation",
    relevance: 0
  };
  const LITERALS = [
    "true",
    "false",
    "null"
  ];
  // NOTE: normally we would rely on `keywords` for this but using a mode here allows us
  // - to use the very tight `illegal: \S` rule later to flag any other character
  // - as illegal indicating that despite looking like JSON we do not truly have
  // - JSON and thus improve false-positively greatly since JSON will try and claim
  // - all sorts of JSON looking stuff
  const LITERALS_MODE = {
    scope: "literal",
    beginKeywords: LITERALS.join(" "),
  };

  return {
    name: 'JSON',
    aliases: ['jsonc', 'json5'],
    keywords:{
      literal: LITERALS,
    },
    contains: [
      ATTRIBUTE,
      PUNCTUATION,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      LITERALS_MODE,
      EXTENDED_NUMBER_MODE,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE
    ],
    illegal: '\\S'
  };
}

module.exports = json;

    },
    "./languages/bash": function (module, exports, require) {
/*
Language: Bash
Author: vah <vahtenberg@gmail.com>
Contributrors: Benjamin Pannell <contact@sierrasoftworks.com>
Website: https://www.gnu.org/software/bash/
Category: common, scripting
*/

/** @type LanguageFn */
function bash(hljs) {
  const regex = hljs.regex;
  const VAR = {};
  const BRACED_VAR = {
    begin: /\$\{/,
    end: /\}/,
    contains: [
      "self",
      {
        begin: /:-/,
        contains: [ VAR ]
      } // default values
    ]
  };
  Object.assign(VAR, {
    className: 'variable',
    variants: [
      { begin: regex.concat(/\$[\w\d#@][\w\d_]*/,
        // negative look-ahead tries to avoid matching patterns that are not
        // Perl at all like $ident$, @ident@, etc.
        `(?![\\w\\d])(?![$])`) },
      BRACED_VAR
    ]
  });

  const SUBST = {
    className: 'subst',
    begin: /\$\(/,
    end: /\)/,
    contains: [ hljs.BACKSLASH_ESCAPE ]
  };
  const COMMENT = hljs.inherit(
    hljs.COMMENT(),
    {
      match: [
        /(^|\s)/,
        /#.*$/
      ],
      scope: {
        2: 'comment'
      }
    }
  );
  const HERE_DOC = {
    begin: /<<-?\s*(?=\w+)/,
    starts: { contains: [
      hljs.END_SAME_AS_BEGIN({
        begin: /(\w+)/,
        end: /(\w+)/,
        className: 'string'
      })
    ] }
  };
  const QUOTE_STRING = {
    className: 'string',
    begin: /"/,
    end: /"/,
    contains: [
      hljs.BACKSLASH_ESCAPE,
      VAR,
      SUBST
    ]
  };
  SUBST.contains.push(QUOTE_STRING);
  const ESCAPED_QUOTE = {
    match: /\\"/
  };
  const APOS_STRING = {
    className: 'string',
    begin: /'/,
    end: /'/
  };
  const ESCAPED_APOS = {
    match: /\\'/
  };
  const ARITHMETIC = {
    begin: /\$?\(\(/,
    end: /\)\)/,
    contains: [
      {
        begin: /\d+#[0-9a-f]+/,
        className: "number"
      },
      hljs.NUMBER_MODE,
      VAR
    ]
  };
  const SH_LIKE_SHELLS = [
    "fish",
    "bash",
    "zsh",
    "sh",
    "csh",
    "ksh",
    "tcsh",
    "dash",
    "scsh",
  ];
  const KNOWN_SHEBANG = hljs.SHEBANG({
    binary: `(${SH_LIKE_SHELLS.join("|")})`,
    relevance: 10
  });
  const FUNCTION = {
    className: 'function',
    begin: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
    returnBegin: true,
    contains: [ hljs.inherit(hljs.TITLE_MODE, { begin: /\w[\w\d_]*/ }) ],
    relevance: 0
  };

  const KEYWORDS = [
    "if",
    "then",
    "else",
    "elif",
    "fi",
    "time",
    "for",
    "while",
    "until",
    "in",
    "do",
    "done",
    "case",
    "esac",
    "coproc",
    "function",
    "select"
  ];

  const LITERALS = [
    "true",
    "false"
  ];

  // to consume paths to prevent keyword matches inside them
  const PATH_MODE = { match: /(\/[a-z._-]+)+/ };

  // http://www.gnu.org/software/bash/manual/html_node/Shell-Builtin-Commands.html
  const SHELL_BUILT_INS = [
    "break",
    "cd",
    "continue",
    "eval",
    "exec",
    "exit",
    "export",
    "getopts",
    "hash",
    "pwd",
    "readonly",
    "return",
    "shift",
    "test",
    "times",
    "trap",
    "umask",
    "unset"
  ];

  const BASH_BUILT_INS = [
    "alias",
    "bind",
    "builtin",
    "caller",
    "command",
    "declare",
    "echo",
    "enable",
    "help",
    "let",
    "local",
    "logout",
    "mapfile",
    "printf",
    "read",
    "readarray",
    "source",
    "sudo",
    "type",
    "typeset",
    "ulimit",
    "unalias"
  ];

  const ZSH_BUILT_INS = [
    "autoload",
    "bg",
    "bindkey",
    "bye",
    "cap",
    "chdir",
    "clone",
    "comparguments",
    "compcall",
    "compctl",
    "compdescribe",
    "compfiles",
    "compgroups",
    "compquote",
    "comptags",
    "comptry",
    "compvalues",
    "dirs",
    "disable",
    "disown",
    "echotc",
    "echoti",
    "emulate",
    "fc",
    "fg",
    "float",
    "functions",
    "getcap",
    "getln",
    "history",
    "integer",
    "jobs",
    "kill",
    "limit",
    "log",
    "noglob",
    "popd",
    "print",
    "pushd",
    "pushln",
    "rehash",
    "sched",
    "setcap",
    "setopt",
    "stat",
    "suspend",
    "ttyctl",
    "unfunction",
    "unhash",
    "unlimit",
    "unsetopt",
    "vared",
    "wait",
    "whence",
    "where",
    "which",
    "zcompile",
    "zformat",
    "zftp",
    "zle",
    "zmodload",
    "zparseopts",
    "zprof",
    "zpty",
    "zregexparse",
    "zsocket",
    "zstyle",
    "ztcp"
  ];

  const GNU_CORE_UTILS = [
    "chcon",
    "chgrp",
    "chown",
    "chmod",
    "cp",
    "dd",
    "df",
    "dir",
    "dircolors",
    "ln",
    "ls",
    "mkdir",
    "mkfifo",
    "mknod",
    "mktemp",
    "mv",
    "realpath",
    "rm",
    "rmdir",
    "shred",
    "sync",
    "touch",
    "truncate",
    "vdir",
    "b2sum",
    "base32",
    "base64",
    "cat",
    "cksum",
    "comm",
    "csplit",
    "cut",
    "expand",
    "fmt",
    "fold",
    "head",
    "join",
    "md5sum",
    "nl",
    "numfmt",
    "od",
    "paste",
    "ptx",
    "pr",
    "sha1sum",
    "sha224sum",
    "sha256sum",
    "sha384sum",
    "sha512sum",
    "shuf",
    "sort",
    "split",
    "sum",
    "tac",
    "tail",
    "tr",
    "tsort",
    "unexpand",
    "uniq",
    "wc",
    "arch",
    "basename",
    "chroot",
    "date",
    "dirname",
    "du",
    "echo",
    "env",
    "expr",
    "factor",
    // "false", // keyword literal already
    "groups",
    "hostid",
    "id",
    "link",
    "logname",
    "nice",
    "nohup",
    "nproc",
    "pathchk",
    "pinky",
    "printenv",
    "printf",
    "pwd",
    "readlink",
    "runcon",
    "seq",
    "sleep",
    "stat",
    "stdbuf",
    "stty",
    "tee",
    "test",
    "timeout",
    // "true", // keyword literal already
    "tty",
    "uname",
    "unlink",
    "uptime",
    "users",
    "who",
    "whoami",
    "yes"
  ];

  return {
    name: 'Bash',
    aliases: [
      'sh',
      'zsh'
    ],
    keywords: {
      $pattern: /\b[a-z][a-z0-9._-]+\b/,
      keyword: KEYWORDS,
      literal: LITERALS,
      built_in: [
        ...SHELL_BUILT_INS,
        ...BASH_BUILT_INS,
        // Shell modifiers
        "set",
        "shopt",
        ...ZSH_BUILT_INS,
        ...GNU_CORE_UTILS
      ]
    },
    contains: [
      KNOWN_SHEBANG, // to catch known shells and boost relevancy
      hljs.SHEBANG(), // to catch unknown shells but still highlight the shebang
      FUNCTION,
      ARITHMETIC,
      COMMENT,
      HERE_DOC,
      PATH_MODE,
      QUOTE_STRING,
      ESCAPED_QUOTE,
      APOS_STRING,
      ESCAPED_APOS,
      VAR
    ]
  };
}

module.exports = bash;

    },
    "./languages/python": function (module, exports, require) {
/*
Language: Python
Description: Python is an interpreted, object-oriented, high-level programming language with dynamic semantics.
Website: https://www.python.org
Category: common
*/

function python(hljs) {
  const regex = hljs.regex;
  const IDENT_RE = /[\p{XID_Start}_]\p{XID_Continue}*/u;
  const RESERVED_WORDS = [
    'and',
    'as',
    'assert',
    'async',
    'await',
    'break',
    'case',
    'class',
    'continue',
    'def',
    'del',
    'elif',
    'else',
    'except',
    'finally',
    'for',
    'from',
    'global',
    'if',
    'import',
    'in',
    'is',
    'lambda',
    'lazy',
    'match',
    'nonlocal|10',
    'not',
    'or',
    'pass',
    'raise',
    'return',
    'try',
    'while',
    'with',
    'yield'
  ];

  const BUILT_INS = [
    '__import__',
    'abs',
    'aiter',
    'all',
    'anext',
    'any',
    'ascii',
    'bin',
    'bool',
    'breakpoint',
    'bytearray',
    'bytes',
    'callable',
    'chr',
    'classmethod',
    'compile',
    'complex',
    'delattr',
    'dict',
    'dir',
    'divmod',
    'enumerate',
    'eval',
    'exec',
    'filter',
    'float',
    'format',
    'frozendict',
    'frozenset',
    'getattr',
    'globals',
    'hasattr',
    'hash',
    'help',
    'hex',
    'id',
    'input',
    'int',
    'isinstance',
    'issubclass',
    'iter',
    'len',
    'list',
    'locals',
    'map',
    'max',
    'memoryview',
    'min',
    'next',
    'object',
    'oct',
    'open',
    'ord',
    'pow',
    'print',
    'property',
    'range',
    'repr',
    'reversed',
    'round',
    'sentinel',
    'set',
    'setattr',
    'slice',
    'sorted',
    'staticmethod',
    'str',
    'sum',
    'super',
    'tuple',
    'type',
    'vars',
    'zip'
  ];

  const LITERALS = [
    '__debug__',
    'Ellipsis',
    'False',
    'None',
    'NotImplemented',
    'True'
  ];

  // https://docs.python.org/3/library/typing.html
  // TODO: Could these be supplemented by a CamelCase matcher in certain
  // contexts, leaving these remaining only for relevance hinting?
  const TYPES = [
    "Any",
    "Callable",
    "Coroutine",
    "Dict",
    "List",
    "Literal",
    "Generic",
    "Optional",
    "Sequence",
    "Set",
    "Tuple",
    "Type",
    "Union"
  ];

  const KEYWORDS = {
    $pattern: /[A-Za-z]\w+|__\w+__/,
    keyword: RESERVED_WORDS,
    built_in: BUILT_INS,
    literal: LITERALS,
    type: TYPES
  };

  const PROMPT = {
    className: 'meta',
    begin: /^(>>>|\.\.\.) /
  };

  const SUBST = {
    className: 'subst',
    begin: /\{/,
    end: /\}/,
    keywords: KEYWORDS,
    illegal: /#/
  };

  const LITERAL_BRACKET = {
    begin: /\{\{/,
    relevance: 0
  };

  const STRING = {
    className: 'string',
    contains: [ hljs.BACKSLASH_ESCAPE ],
    variants: [
      {
        begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?'''/,
        end: /'''/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          PROMPT
        ],
        relevance: 10
      },
      {
        begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?"""/,
        end: /"""/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          PROMPT
        ],
        relevance: 10
      },
      {
        begin: /([fFtT][rR]|[rR][fFtT]|[fFtT])'''/,
        end: /'''/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          PROMPT,
          LITERAL_BRACKET,
          SUBST
        ]
      },
      {
        begin: /([fFtT][rR]|[rR][fFtT]|[fFtT])"""/,
        end: /"""/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          PROMPT,
          LITERAL_BRACKET,
          SUBST
        ]
      },
      {
        begin: /([uU]|[rR])'/,
        end: /'/,
        relevance: 10
      },
      {
        begin: /([uU]|[rR])"/,
        end: /"/,
        relevance: 10
      },
      {
        begin: /([bB]|[bB][rR]|[rR][bB])'/,
        end: /'/
      },
      {
        begin: /([bB]|[bB][rR]|[rR][bB])"/,
        end: /"/
      },
      {
        begin: /([fFtT][rR]|[rR][fFtT]|[fFtT])'/,
        end: /'/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          LITERAL_BRACKET,
          SUBST
        ]
      },
      {
        begin: /([fFtT][rR]|[rR][fFtT]|[fFtT])"/,
        end: /"/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          LITERAL_BRACKET,
          SUBST
        ]
      },
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE
    ]
  };

  // https://docs.python.org/3.9/reference/lexical_analysis.html#numeric-literals
  const digitpart = '[0-9](_?[0-9])*';
  const pointfloat = `(\\b(${digitpart}))?\\.(${digitpart})|\\b(${digitpart})\\.`;
  // Whitespace after a number (or any lexical token) is needed only if its absence
  // would change the tokenization
  // https://docs.python.org/3.9/reference/lexical_analysis.html#whitespace-between-tokens
  // We deviate slightly, requiring a word boundary or a keyword
  // to avoid accidentally recognizing *prefixes* (e.g., `0` in `0x41` or `08` or `0__1`)
  const lookahead = `\\b|${RESERVED_WORDS.join('|')}`;
  const NUMBER = {
    className: 'number',
    relevance: 0,
    variants: [
      // exponentfloat, pointfloat
      // https://docs.python.org/3.9/reference/lexical_analysis.html#floating-point-literals
      // optionally imaginary
      // https://docs.python.org/3.9/reference/lexical_analysis.html#imaginary-literals
      // Note: no leading \b because floats can start with a decimal point
      // and we don't want to mishandle e.g. `fn(.5)`,
      // no trailing \b for pointfloat because it can end with a decimal point
      // and we don't want to mishandle e.g. `0..hex()`; this should be safe
      // because both MUST contain a decimal point and so cannot be confused with
      // the interior part of an identifier
      {
        begin: `(\\b(${digitpart})|(${pointfloat}))[eE][+-]?(${digitpart})[jJ]?(?=${lookahead})`
      },
      {
        begin: `(${pointfloat})[jJ]?`
      },

      // decinteger, bininteger, octinteger, hexinteger
      // https://docs.python.org/3.9/reference/lexical_analysis.html#integer-literals
      // optionally "long" in Python 2
      // https://docs.python.org/2.7/reference/lexical_analysis.html#integer-and-long-integer-literals
      // decinteger is optionally imaginary
      // https://docs.python.org/3.9/reference/lexical_analysis.html#imaginary-literals
      {
        begin: `\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?(?=${lookahead})`
      },
      {
        begin: `\\b0[bB](_?[01])+[lL]?(?=${lookahead})`
      },
      {
        begin: `\\b0[oO](_?[0-7])+[lL]?(?=${lookahead})`
      },
      {
        begin: `\\b0[xX](_?[0-9a-fA-F])+[lL]?(?=${lookahead})`
      },

      // imagnumber (digitpart-based)
      // https://docs.python.org/3.9/reference/lexical_analysis.html#imaginary-literals
      {
        begin: `\\b(${digitpart})[jJ](?=${lookahead})`
      }
    ]
  };
  const COMMENT_TYPE = {
    className: "comment",
    begin: regex.lookahead(/# type:/),
    end: /$/,
    keywords: KEYWORDS,
    contains: [
      { // prevent keywords from coloring `type`
        begin: /# type:/
      },
      // comment within a datatype comment includes no keywords
      {
        begin: /#/,
        end: /\b\B/,
        endsWithParent: true
      }
    ]
  };
  const PARAMS = {
    className: 'params',
    variants: [
      // Exclude params in functions without params
      {
        className: "",
        begin: /\(\s*\)/,
        skip: true
      },
      {
        begin: /\(/,
        end: /\)/,
        excludeBegin: true,
        excludeEnd: true,
        keywords: KEYWORDS,
        contains: [
          'self',
          PROMPT,
          NUMBER,
          STRING,
          hljs.HASH_COMMENT_MODE
        ]
      }
    ]
  };
  SUBST.contains = [
    STRING,
    NUMBER,
    PROMPT
  ];

  return {
    name: 'Python',
    aliases: [
      'py',
      'gyp',
      'ipython'
    ],
    unicodeRegex: true,
    keywords: KEYWORDS,
    illegal: /(<\/|\?)|=>/,
    contains: [
      PROMPT,
      NUMBER,
      {
        // very common convention
        scope: 'variable.language',
        match: /\bself\b/
      },
      {
        // eat "if" prior to string so that it won't accidentally be
        // labeled as an f-string
        beginKeywords: "if",
        relevance: 0
      },
      { match: /\bor\b/, scope: "keyword" },
      STRING,
      COMMENT_TYPE,
      hljs.HASH_COMMENT_MODE,
      {
        match: [
          /\bdef/, /\s+/,
          IDENT_RE,
        ],
        scope: {
          1: "keyword",
          3: "title.function"
        },
        contains: [ PARAMS ]
      },
      {
        variants: [
          {
            match: [
              /\bclass/, /\s+/,
              IDENT_RE, /\s*/,
              /\(\s*/, IDENT_RE,/\s*\)/
            ],
          },
          {
            match: [
              /\bclass/, /\s+/,
              IDENT_RE
            ],
          }
        ],
        scope: {
          1: "keyword",
          3: "title.class",
          6: "title.class.inherited",
        }
      },
      {
        className: 'meta',
        begin: /^[\t ]*@/,
        end: /(?=#)|$/,
        contains: [
          NUMBER,
          PARAMS,
          STRING
        ]
      }
    ]
  };
}

module.exports = python;

    },
    "./languages/sql": function (module, exports, require) {
/*
 Language: SQL
 Website: https://en.wikipedia.org/wiki/SQL
 Category: common, database
 */

/*

Goals:

SQL is intended to highlight basic/common SQL keywords and expressions

- If pretty much every single SQL server includes supports, then it's a canidate.
- It is NOT intended to include tons of vendor specific keywords (Oracle, MySQL,
  PostgreSQL) although the list of data types is purposely a bit more expansive.
- For more specific SQL grammars please see:
  - PostgreSQL and PL/pgSQL - core
  - T-SQL - https://github.com/highlightjs/highlightjs-tsql
  - sql_more (core)

 */

function sql(hljs) {
  const regex = hljs.regex;
  const COMMENT_MODE = hljs.COMMENT('--', '$');
  const STRING = {
    scope: 'string',
    variants: [
      {
        begin: /'/,
        end: /'/,
        contains: [ { match: /''/ } ]
      }
    ]
  };
  const QUOTED_IDENTIFIER = {
    begin: /"/,
    end: /"/,
    contains: [ { match: /""/ } ]
  };

  const LITERALS = [
    "true",
    "false",
    // Not sure it's correct to call NULL literal, and clauses like IS [NOT] NULL look strange that way.
    // "null",
    "unknown"
  ];

  const MULTI_WORD_TYPES = [
    "double precision",
    "large object",
    "with timezone",
    "without timezone"
  ];

  const TYPES = [
    'bigint',
    'binary',
    'blob',
    'boolean',
    'char',
    'character',
    'clob',
    'date',
    'dec',
    'decfloat',
    'decimal',
    'float',
    'int',
    'integer',
    'interval',
    'nchar',
    'nclob',
    'national',
    'numeric',
    'real',
    'row',
    'smallint',
    'time',
    'timestamp',
    'varchar',
    'varying', // modifier (character varying)
    'varbinary'
  ];

  const NON_RESERVED_WORDS = [
    "add",
    "asc",
    "collation",
    "desc",
    "final",
    "first",
    "last",
    "view"
  ];

  // https://jakewheat.github.io/sql-overview/sql-2016-foundation-grammar.html#reserved-word
  const RESERVED_WORDS = [
    "abs",
    "acos",
    "all",
    "allocate",
    "alter",
    "and",
    "any",
    "are",
    "array",
    "array_agg",
    "array_max_cardinality",
    "as",
    "asensitive",
    "asin",
    "asymmetric",
    "at",
    "atan",
    "atomic",
    "authorization",
    "avg",
    "begin",
    "begin_frame",
    "begin_partition",
    "between",
    "bigint",
    "binary",
    "blob",
    "boolean",
    "both",
    "by",
    "call",
    "called",
    "cardinality",
    "cascaded",
    "case",
    "cast",
    "ceil",
    "ceiling",
    "char",
    "char_length",
    "character",
    "character_length",
    "check",
    "classifier",
    "clob",
    "close",
    "coalesce",
    "collate",
    "collect",
    "column",
    "commit",
    "condition",
    "connect",
    "constraint",
    "contains",
    "convert",
    "copy",
    "corr",
    "corresponding",
    "cos",
    "cosh",
    "count",
    "covar_pop",
    "covar_samp",
    "create",
    "cross",
    "cube",
    "cume_dist",
    "current",
    "current_catalog",
    "current_date",
    "current_default_transform_group",
    "current_path",
    "current_role",
    "current_row",
    "current_schema",
    "current_time",
    "current_timestamp",
    "current_path",
    "current_role",
    "current_transform_group_for_type",
    "current_user",
    "cursor",
    "cycle",
    "date",
    "day",
    "deallocate",
    "dec",
    "decimal",
    "decfloat",
    "declare",
    "default",
    "define",
    "delete",
    "dense_rank",
    "deref",
    "describe",
    "deterministic",
    "disconnect",
    "distinct",
    "double",
    "drop",
    "dynamic",
    "each",
    "element",
    "else",
    "empty",
    "end",
    "end_frame",
    "end_partition",
    "end-exec",
    "equals",
    "escape",
    "every",
    "except",
    "exec",
    "execute",
    "exists",
    "exp",
    "external",
    "extract",
    "false",
    "fetch",
    "filter",
    "first_value",
    "float",
    "floor",
    "for",
    "foreign",
    "frame_row",
    "free",
    "from",
    "full",
    "function",
    "fusion",
    "get",
    "global",
    "grant",
    "group",
    "grouping",
    "groups",
    "having",
    "hold",
    "hour",
    "identity",
    "in",
    "indicator",
    "initial",
    "inner",
    "inout",
    "insensitive",
    "insert",
    "int",
    "integer",
    "intersect",
    "intersection",
    "interval",
    "into",
    "is",
    "join",
    "json_array",
    "json_arrayagg",
    "json_exists",
    "json_object",
    "json_objectagg",
    "json_query",
    "json_table",
    "json_table_primitive",
    "json_value",
    "lag",
    "language",
    "large",
    "last_value",
    "lateral",
    "lead",
    "leading",
    "left",
    "like",
    "like_regex",
    "listagg",
    "ln",
    "local",
    "localtime",
    "localtimestamp",
    "log",
    "log10",
    "lower",
    "match",
    "match_number",
    "match_recognize",
    "matches",
    "max",
    "member",
    "merge",
    "method",
    "min",
    "minute",
    "mod",
    "modifies",
    "module",
    "month",
    "multiset",
    "national",
    "natural",
    "nchar",
    "nclob",
    "new",
    "no",
    "none",
    "normalize",
    "not",
    "nth_value",
    "ntile",
    "null",
    "nullif",
    "numeric",
    "octet_length",
    "occurrences_regex",
    "of",
    "offset",
    "old",
    "omit",
    "on",
    "one",
    "only",
    "open",
    "or",
    "order",
    "out",
    "outer",
    "over",
    "overlaps",
    "overlay",
    "parameter",
    "partition",
    "pattern",
    "per",
    "percent",
    "percent_rank",
    "percentile_cont",
    "percentile_disc",
    "period",
    "portion",
    "position",
    "position_regex",
    "power",
    "precedes",
    "precision",
    "prepare",
    "primary",
    "procedure",
    "ptf",
    "range",
    "rank",
    "reads",
    "real",
    "recursive",
    "ref",
    "references",
    "referencing",
    "regr_avgx",
    "regr_avgy",
    "regr_count",
    "regr_intercept",
    "regr_r2",
    "regr_slope",
    "regr_sxx",
    "regr_sxy",
    "regr_syy",
    "release",
    "result",
    "return",
    "returns",
    "revoke",
    "right",
    "rollback",
    "rollup",
    "row",
    "row_number",
    "rows",
    "running",
    "savepoint",
    "scope",
    "scroll",
    "search",
    "second",
    "seek",
    "select",
    "sensitive",
    "session_user",
    "set",
    "show",
    "similar",
    "sin",
    "sinh",
    "skip",
    "smallint",
    "some",
    "specific",
    "specifictype",
    "sql",
    "sqlexception",
    "sqlstate",
    "sqlwarning",
    "sqrt",
    "start",
    "static",
    "stddev_pop",
    "stddev_samp",
    "submultiset",
    "subset",
    "substring",
    "substring_regex",
    "succeeds",
    "sum",
    "symmetric",
    "system",
    "system_time",
    "system_user",
    "table",
    "tablesample",
    "tan",
    "tanh",
    "then",
    "time",
    "timestamp",
    "timezone_hour",
    "timezone_minute",
    "to",
    "trailing",
    "translate",
    "translate_regex",
    "translation",
    "treat",
    "trigger",
    "trim",
    "trim_array",
    "true",
    "truncate",
    "uescape",
    "union",
    "unique",
    "unknown",
    "unnest",
    "update",
    "upper",
    "user",
    "using",
    "value",
    "values",
    "value_of",
    "var_pop",
    "var_samp",
    "varbinary",
    "varchar",
    "varying",
    "versioning",
    "when",
    "whenever",
    "where",
    "width_bucket",
    "window",
    "with",
    "within",
    "without",
    "year",
  ];

  // these are reserved words we have identified to be functions
  // and should only be highlighted in a dispatch-like context
  // ie, array_agg(...), etc.
  const RESERVED_FUNCTIONS = [
    "abs",
    "acos",
    "array_agg",
    "asin",
    "atan",
    "avg",
    "cast",
    "ceil",
    "ceiling",
    "coalesce",
    "corr",
    "cos",
    "cosh",
    "count",
    "covar_pop",
    "covar_samp",
    "cume_dist",
    "dense_rank",
    "deref",
    "element",
    "exp",
    "extract",
    "first_value",
    "floor",
    "json_array",
    "json_arrayagg",
    "json_exists",
    "json_object",
    "json_objectagg",
    "json_query",
    "json_table",
    "json_table_primitive",
    "json_value",
    "lag",
    "last_value",
    "lead",
    "listagg",
    "ln",
    "log",
    "log10",
    "lower",
    "max",
    "min",
    "mod",
    "nth_value",
    "ntile",
    "nullif",
    "percent_rank",
    "percentile_cont",
    "percentile_disc",
    "position",
    "position_regex",
    "power",
    "rank",
    "regr_avgx",
    "regr_avgy",
    "regr_count",
    "regr_intercept",
    "regr_r2",
    "regr_slope",
    "regr_sxx",
    "regr_sxy",
    "regr_syy",
    "row_number",
    "sin",
    "sinh",
    "sqrt",
    "stddev_pop",
    "stddev_samp",
    "substring",
    "substring_regex",
    "sum",
    "tan",
    "tanh",
    "translate",
    "translate_regex",
    "treat",
    "trim",
    "trim_array",
    "unnest",
    "upper",
    "value_of",
    "var_pop",
    "var_samp",
    "width_bucket",
  ];

  // these functions can
  const POSSIBLE_WITHOUT_PARENS = [
    "current_catalog",
    "current_date",
    "current_default_transform_group",
    "current_path",
    "current_role",
    "current_schema",
    "current_transform_group_for_type",
    "current_user",
    "session_user",
    "system_time",
    "system_user",
    "current_time",
    "localtime",
    "current_timestamp",
    "localtimestamp"
  ];

  // those exist to boost relevance making these very
  // "SQL like" keyword combos worth +1 extra relevance
  const COMBOS = [
    "create table",
    "insert into",
    "primary key",
    "foreign key",
    "not null",
    "alter table",
    "add constraint",
    "grouping sets",
    "on overflow",
    "character set",
    "respect nulls",
    "ignore nulls",
    "nulls first",
    "nulls last",
    "depth first",
    "breadth first"
  ];

  const FUNCTIONS = RESERVED_FUNCTIONS;

  const KEYWORDS = [
    ...RESERVED_WORDS,
    ...NON_RESERVED_WORDS
  ].filter((keyword) => {
    return !RESERVED_FUNCTIONS.includes(keyword);
  });

  const VARIABLE = {
    scope: "variable",
    match: /@[a-z0-9][a-z0-9_]*/,
  };

  const OPERATOR = {
    scope: "operator",
    match: /[-+*/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?/,
    relevance: 0,
  };

  const FUNCTION_CALL = {
    match: regex.concat(/\b/, regex.either(...FUNCTIONS), /\s*\(/),
    relevance: 0,
    keywords: { built_in: FUNCTIONS }
  };

  // turns a multi-word keyword combo into a regex that doesn't
  // care about extra whitespace etc.
  // input: "START QUERY"
  // output: /\bSTART\s+QUERY\b/
  function kws_to_regex(list) {
    return regex.concat(
      /\b/,
      regex.either(...list.map((kw) => {
        return kw.replace(/\s+/, "\\s+")
      })),
      /\b/
    )
  }

  const MULTI_WORD_KEYWORDS = {
    scope: "keyword",
    match: kws_to_regex(COMBOS),
    relevance: 0,
  };

  // keywords with less than 3 letters are reduced in relevancy
  function reduceRelevancy(list, {
    exceptions, when
  } = {}) {
    const qualifyFn = when;
    exceptions = exceptions || [];
    return list.map((item) => {
      if (item.match(/\|\d+$/) || exceptions.includes(item)) {
        return item;
      } else if (qualifyFn(item)) {
        return `${item}|0`;
      } else {
        return item;
      }
    });
  }

  return {
    name: 'SQL',
    case_insensitive: true,
    // does not include {} or HTML tags `</`
    illegal: /[{}]|<\//,
    keywords: {
      $pattern: /\b[\w\.]+/,
      keyword:
        reduceRelevancy(KEYWORDS, { when: (x) => x.length < 3 }),
      literal: LITERALS,
      type: TYPES,
      built_in: POSSIBLE_WITHOUT_PARENS
    },
    contains: [
      {
        scope: "type",
        match: kws_to_regex(MULTI_WORD_TYPES)
      },
      MULTI_WORD_KEYWORDS,
      FUNCTION_CALL,
      VARIABLE,
      STRING,
      QUOTED_IDENTIFIER,
      hljs.C_NUMBER_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      COMMENT_MODE,
      OPERATOR
    ]
  };
}

module.exports = sql;

    },
    "./languages/cpp": function (module, exports, require) {
/*
Language: C++
Category: common, system
Website: https://isocpp.org
*/

/** @type LanguageFn */
function cpp(hljs) {
  const regex = hljs.regex;
  // added for historic reasons because `hljs.C_LINE_COMMENT_MODE` does
  // not include such support nor can we be sure all the grammars depending
  // on it would desire this behavior
  const C_LINE_COMMENT_MODE = hljs.COMMENT('//', '$', { contains: [ { begin: /\\\n/ } ] });
  const DECLTYPE_AUTO_RE = 'decltype\\(auto\\)';
  const NAMESPACE_RE = '[a-zA-Z_]\\w*::';
  const TEMPLATE_ARGUMENT_RE = '<[^<>]+>';
  const FUNCTION_TYPE_RE = '(?!struct)('
    + DECLTYPE_AUTO_RE + '|'
    + regex.optional(NAMESPACE_RE)
    + '[a-zA-Z_]\\w*' + regex.optional(TEMPLATE_ARGUMENT_RE)
  + ')';

  const CPP_PRIMITIVE_TYPES = {
    className: 'type',
    begin: '\\b[a-z\\d_]*_t\\b'
  };

  // https://en.cppreference.com/w/cpp/language/escape
  // \\ \x \xFF \u2837 \u00323747 \374
  const CHARACTER_ESCAPES = '\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)';
  const STRINGS = {
    className: 'string',
    variants: [
      {
        begin: '(u8?|U|L)?"',
        end: '"',
        illegal: '\\n',
        contains: [ hljs.BACKSLASH_ESCAPE ]
      },
      {
        begin: '(u8?|U|L)?\'(' + CHARACTER_ESCAPES + '|.)',
        end: '\'',
        illegal: '.'
      },
      // https://en.cppreference.com/w/cpp/language/string_literal
      // a d-char-sequence never contains parentheses, backslashes or whitespace;
      // quotes are excluded as well so the closing delimiter cannot swallow the
      // quote that actually terminates the literal
      hljs.END_SAME_AS_BEGIN({
        begin: /(?:u8?|U|L)?R"([^()\\\s"]{0,16})\(/,
        end: /\)([^()\\\s"]{0,16})"/
      })
    ]
  };

  const NUMBERS = {
    className: 'number',
    variants: [
      // Floating-point literal.
      { begin:
        "[+-]?(?:" // Leading sign.
          // Decimal.
          + "(?:"
            + "\\b[0-9](?:'?[0-9])*\\.(?:[0-9](?:'?[0-9])*)?"
            + "|\\.[0-9](?:'?[0-9])*"
          + ")(?:[Ee][+-]?[0-9](?:'?[0-9])*)?"
          + "|\\b[0-9](?:'?[0-9])*[Ee][+-]?[0-9](?:'?[0-9])*"
          // Hexadecimal.
          + "|\\b0[Xx](?:"
            +"[0-9A-Fa-f](?:'?[0-9A-Fa-f])*(?:\\.(?:[0-9A-Fa-f](?:'?[0-9A-Fa-f])*)?)?"
            + "|\\.[0-9A-Fa-f](?:'?[0-9A-Fa-f])*"
          + ")[Pp][+-]?[0-9](?:'?[0-9])*"
        + ")(?:" // Literal suffixes.
          + "[Ff](?:16|32|64|128)?"
          + "|(BF|bf)16"
          + "|[Ll]"
          + "|" // Literal suffix is optional.
        + ")"
      },
      // Integer literal.
      { begin:
        "[+-]?\\b(?:" // Leading sign.
          + "0[Bb][01](?:'?[01])*" // Binary.
          + "|0[Xx][0-9A-Fa-f](?:'?[0-9A-Fa-f])*" // Hexadecimal.
          + "|0(?:'?[0-7])*" // Octal or just a lone zero.
          + "|[1-9](?:'?[0-9])*" // Decimal.
        + ")(?:" // Literal suffixes.
          + "[Uu](?:LL?|ll?)"
          + "|[Uu][Zz]?"
          + "|(?:LL?|ll?)[Uu]?"
          + "|[Zz][Uu]"
          + "|" // Literal suffix is optional.
        + ")"
        // Note: there are user-defined literal suffixes too, but perhaps having the custom suffix not part of the
        // literal highlight actually makes it stand out more.
      }
    ],
    relevance: 0
  };

  // `#include` is the only preprocessor directive that takes an angle-bracket
  // quoted header (`#include <header>`). Scoping that rule to `#include` keeps
  // the greedy `<...>` match from eating a `>` that belongs to the body of
  // another directive (e.g. `#define what do { cout << ">"; } while (0)`),
  // which would otherwise leave an unbalanced `"` and break highlighting for
  // the rest of the file. See issue #3505.
  const PREPROCESSOR_INCLUDE = {
    scope: 'meta',
    begin: /#\s*include\b/,
    end: /$/,
    keywords: { keyword: 'include' },
    contains: [
      {
        // the `\` at the end of a line signaling continuation
        begin: /\\\n/,
      },
      STRINGS,
      {
        scope: 'string',
        begin: /<.*?>/
      },
      C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE
    ]
  };

  const PREPROCESSOR = {
    className: 'meta',
    begin: /#\s*[a-z]+\b/,
    end: /$/,
    keywords: { keyword:
        'if else elif endif define undef warning error line '
        + 'pragma _Pragma ifdef ifndef include' },
    contains: [
      {
        begin: /\\\n/,
        relevance: 0
      },
      hljs.inherit(STRINGS, { className: 'string' }),
      C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE
    ]
  };

  const PREPROCESSORS = [
    PREPROCESSOR_INCLUDE,
    PREPROCESSOR
  ];

  const TITLE_MODE = {
    className: 'title',
    begin: regex.optional(NAMESPACE_RE) + hljs.IDENT_RE,
    relevance: 0
  };

  const FUNCTION_TITLE = regex.optional(NAMESPACE_RE) + hljs.IDENT_RE + '\\s*\\(';
  // Bounded on purpose: an unbounded quantifier here consumes an arbitrarily
  // long run of words, and when no function title follows it the engine retries
  // the title at every token boundary of that run - quadratic in the size of
  // the document.  See #4362.
  const MAX_FUNCTION_TYPE_TOKENS = 12;

  // https://en.cppreference.com/w/cpp/keyword
  const RESERVED_KEYWORDS = [
    'alignas',
    'alignof',
    'and',
    'and_eq',
    'asm',
    'atomic_cancel',
    'atomic_commit',
    'atomic_noexcept',
    'auto',
    'bitand',
    'bitor',
    'break',
    'case',
    'catch',
    'class',
    'co_await',
    'co_return',
    'co_yield',
    'compl',
    'concept',
    'const_cast|10',
    'consteval',
    'constexpr',
    'constinit',
    'continue',
    'decltype',
    'default',
    'delete',
    'do',
    'dynamic_cast|10',
    'else',
    'enum',
    'explicit',
    'export',
    'extern',
    'false',
    'final',
    'for',
    'friend',
    'goto',
    'if',
    'import',
    'inline',
    'module',
    'mutable',
    'namespace',
    'new',
    'noexcept',
    'not',
    'not_eq',
    'nullptr',
    'operator',
    'or',
    'or_eq',
    'override',
    'private',
    'protected',
    'public',
    'reflexpr',
    'register',
    'reinterpret_cast|10',
    'requires',
    'return',
    'sizeof',
    'static_assert',
    'static_cast|10',
    'struct',
    'switch',
    'synchronized',
    'template',
    'this',
    'thread_local',
    'throw',
    'transaction_safe',
    'transaction_safe_dynamic',
    'true',
    'try',
    'typedef',
    'typeid',
    'typename',
    'union',
    'using',
    'virtual',
    'volatile',
    'while',
    'xor',
    'xor_eq'
  ];

  // https://en.cppreference.com/w/cpp/keyword
  const RESERVED_TYPES = [
    'bool',
    'char',
    'char16_t',
    'char32_t',
    'char8_t',
    'double',
    'float',
    'int',
    'long',
    'short',
    'void',
    'wchar_t',
    'unsigned',
    'signed',
    'const',
    'static'
  ];

  const TYPE_HINTS = [
    'any',
    'auto_ptr',
    'barrier',
    'binary_semaphore',
    'bitset',
    'complex',
    'condition_variable',
    'condition_variable_any',
    'counting_semaphore',
    'deque',
    'false_type',
    'flat_map',
    'flat_set',
    'future',
    'imaginary',
    'initializer_list',
    'istringstream',
    'jthread',
    'latch',
    'lock_guard',
    'multimap',
    'multiset',
    'mutex',
    'optional',
    'ostringstream',
    'packaged_task',
    'pair',
    'promise',
    'priority_queue',
    'queue',
    'recursive_mutex',
    'recursive_timed_mutex',
    'scoped_lock',
    'set',
    'shared_future',
    'shared_lock',
    'shared_mutex',
    'shared_timed_mutex',
    'shared_ptr',
    'stack',
    'string_view',
    'stringstream',
    'timed_mutex',
    'thread',
    'true_type',
    'tuple',
    'unique_lock',
    'unique_ptr',
    'unordered_map',
    'unordered_multimap',
    'unordered_multiset',
    'unordered_set',
    'variant',
    'vector',
    'weak_ptr',
    'wstring',
    'wstring_view'
  ];

  const FUNCTION_HINTS = [
    'abort',
    'abs',
    'acos',
    'apply',
    'as_const',
    'asin',
    'atan',
    'atan2',
    'calloc',
    'ceil',
    'cerr',
    'cin',
    'clog',
    'cos',
    'cosh',
    'cout',
    'declval',
    'endl',
    'exchange',
    'exit',
    'exp',
    'fabs',
    'floor',
    'fmod',
    'forward',
    'fprintf',
    'fputs',
    'free',
    'frexp',
    'fscanf',
    'future',
    'invoke',
    'isalnum',
    'isalpha',
    'iscntrl',
    'isdigit',
    'isgraph',
    'islower',
    'isprint',
    'ispunct',
    'isspace',
    'isupper',
    'isxdigit',
    'labs',
    'launder',
    'ldexp',
    'log',
    'log10',
    'make_pair',
    'make_shared',
    'make_shared_for_overwrite',
    'make_tuple',
    'make_unique',
    'malloc',
    'memchr',
    'memcmp',
    'memcpy',
    'memset',
    'modf',
    'move',
    'pow',
    'printf',
    'putchar',
    'puts',
    'realloc',
    'scanf',
    'sin',
    'sinh',
    'snprintf',
    'sprintf',
    'sqrt',
    'sscanf',
    'std',
    'stderr',
    'stdin',
    'stdout',
    'strcat',
    'strchr',
    'strcmp',
    'strcpy',
    'strcspn',
    'strlen',
    'strncat',
    'strncmp',
    'strncpy',
    'strpbrk',
    'strrchr',
    'strspn',
    'strstr',
    'swap',
    'tan',
    'tanh',
    'terminate',
    'to_underlying',
    'tolower',
    'toupper',
    'vfprintf',
    'visit',
    'vprintf',
    'vsprintf'
  ];

  const LITERALS = [
    'NULL',
    'false',
    'nullopt',
    'nullptr',
    'true'
  ];

  // https://en.cppreference.com/w/cpp/keyword
  const BUILT_IN = [ '_Pragma' ];

  const CPP_KEYWORDS = {
    type: RESERVED_TYPES,
    keyword: RESERVED_KEYWORDS,
    literal: LITERALS,
    built_in: BUILT_IN,
    _type_hints: TYPE_HINTS
  };

  const FUNCTION_DISPATCH = {
    className: 'function.dispatch',
    relevance: 0,
    keywords: {
      // Only for relevance, not highlighting.
      _hint: FUNCTION_HINTS },
    begin: regex.concat(
      /\b/,
      `(?!${RESERVED_KEYWORDS.join('|')})`,
      hljs.IDENT_RE,
      regex.lookahead(/(<[^<>]+>|)\s*\(/))
  };

  const EXPRESSION_CONTAINS = [
    FUNCTION_DISPATCH,
    ...PREPROCESSORS,
    CPP_PRIMITIVE_TYPES,
    C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE,
    NUMBERS,
    STRINGS
  ];

  const EXPRESSION_CONTEXT = {
    // This mode covers expression context where we can't expect a function
    // definition and shouldn't highlight anything that looks like one:
    // `return some()`, `else if()`, `(x*sum(1, 2))`
    variants: [
      {
        begin: /=/,
        end: /;/
      },
      {
        begin: /\(/,
        end: /\)/
      },
      {
        beginKeywords: 'new throw return else',
        end: /;/
      }
    ],
    keywords: CPP_KEYWORDS,
    contains: EXPRESSION_CONTAINS.concat([
      {
        begin: /\(/,
        end: /\)/,
        keywords: CPP_KEYWORDS,
        contains: EXPRESSION_CONTAINS.concat([ 'self' ]),
        relevance: 0
      }
    ]),
    relevance: 0
  };

  const FUNCTION_DECLARATION = {
    className: 'function',
    begin: '(' + FUNCTION_TYPE_RE + '[\\*&\\s]+){1,' + MAX_FUNCTION_TYPE_TOKENS + '}' + FUNCTION_TITLE,
    returnBegin: true,
    end: /[{;=]/,
    excludeEnd: true,
    keywords: CPP_KEYWORDS,
    illegal: /[^\w\s\*&:<>.]/,
    contains: [
      { // to prevent it from being confused as the function title
        begin: DECLTYPE_AUTO_RE,
        keywords: CPP_KEYWORDS,
        relevance: 0
      },
      {
        begin: FUNCTION_TITLE,
        returnBegin: true,
        contains: [ TITLE_MODE ],
        relevance: 0
      },
      // needed because we do not have look-behind on the below rule
      // to prevent it from grabbing the final : in a :: pair
      {
        begin: /::/,
        relevance: 0
      },
      // initializers
      {
        begin: /:/,
        endsWithParent: true,
        contains: [
          STRINGS,
          NUMBERS
        ]
      },
      // allow for multiple declarations, e.g.:
      // extern void f(int), g(char);
      {
        relevance: 0,
        match: /,/
      },
      {
        className: 'params',
        begin: /\(/,
        end: /\)/,
        keywords: CPP_KEYWORDS,
        relevance: 0,
        contains: [
          C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE,
          STRINGS,
          NUMBERS,
          CPP_PRIMITIVE_TYPES,
          // Count matching parentheses.
          {
            begin: /\(/,
            end: /\)/,
            keywords: CPP_KEYWORDS,
            relevance: 0,
            contains: [
              'self',
              C_LINE_COMMENT_MODE,
              hljs.C_BLOCK_COMMENT_MODE,
              STRINGS,
              NUMBERS,
              CPP_PRIMITIVE_TYPES
            ]
          }
        ]
      },
      CPP_PRIMITIVE_TYPES,
      C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      ...PREPROCESSORS
    ]
  };

  return {
    name: 'C++',
    aliases: [
      'cc',
      'c++',
      'h++',
      'hpp',
      'hh',
      'hxx',
      'cxx'
    ],
    keywords: CPP_KEYWORDS,
    illegal: '</',
    classNameAliases: { 'function.dispatch': 'built_in' },
    contains: [].concat(
      EXPRESSION_CONTEXT,
      FUNCTION_DECLARATION,
      FUNCTION_DISPATCH,
      EXPRESSION_CONTAINS,
      [
        ...PREPROCESSORS,
        { // containers: ie, `vector <int> rooms (9);`
          begin: '\\b(deque|list|queue|priority_queue|pair|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array|tuple|optional|variant|function|flat_map|flat_set)\\s*<(?!<)',
          end: '>',
          keywords: CPP_KEYWORDS,
          contains: [
            'self',
            CPP_PRIMITIVE_TYPES
          ]
        },
        {
          begin: hljs.IDENT_RE + '::',
          keywords: CPP_KEYWORDS
        },
        {
          match: [
            // extra complexity to deal with `enum class` and `enum struct`
            /\b(?:enum(?:\s+(?:class|struct))?|class|struct|union)/,
            /\s+/,
            /\w+/
          ],
          className: {
            1: 'keyword',
            3: 'title.class'
          }
        }
      ])
  };
}

module.exports = cpp;

    },
    "./languages/c": function (module, exports, require) {
/*
Language: C
Category: common, system
Website: https://en.wikipedia.org/wiki/C_(programming_language)
*/

/** @type LanguageFn */
function c(hljs) {
  const regex = hljs.regex;
  // added for historic reasons because `hljs.C_LINE_COMMENT_MODE` does
  // not include such support nor can we be sure all the grammars depending
  // on it would desire this behavior
  const C_LINE_COMMENT_MODE = hljs.COMMENT('//', '$', { contains: [ { begin: /\\\n/ } ] });
  const DECLTYPE_AUTO_RE = 'decltype\\(auto\\)';
  const NAMESPACE_RE = '[a-zA-Z_]\\w*::';
  const TEMPLATE_ARGUMENT_RE = '<[^<>]+>';
  const FUNCTION_TYPE_RE = '('
    + DECLTYPE_AUTO_RE + '|'
    + regex.optional(NAMESPACE_RE)
    + '[a-zA-Z_]\\w*' + regex.optional(TEMPLATE_ARGUMENT_RE)
  + ')';


  // C11 <stdatomic.h> atomic type names. This is an explicit whitelist so that
  // C11 atomic *functions* (atomic_init, atomic_store, atomic_load,
  // atomic_fetch_add, ...) are not mistakenly highlighted as types. See #3837.
  const ATOMIC_TYPES = regex.concat(/\batomic_/, regex.either(
    'bool',
    'char',
    'schar',
    'uchar',
    'short',
    'ushort',
    'int',
    'uint',
    'long',
    'ulong',
    'llong',
    'ullong',
    'char16_t',
    'char32_t',
    'wchar_t',
    'int_least8_t',
    'uint_least8_t',
    'int_least16_t',
    'uint_least16_t',
    'int_least32_t',
    'uint_least32_t',
    'int_least64_t',
    'uint_least64_t',
    'int_fast8_t',
    'uint_fast8_t',
    'int_fast16_t',
    'uint_fast16_t',
    'int_fast32_t',
    'uint_fast32_t',
    'int_fast64_t',
    'uint_fast64_t',
    'intptr_t',
    'uintptr_t',
    'size_t',
    'ptrdiff_t',
    'intmax_t',
    'uintmax_t'
  ), /\b/);
  const TYPES = {
    className: 'type',
    variants: [
      { begin: '\\b[a-z\\d_]*_t\\b' },
      { match: ATOMIC_TYPES }
    ]

  };

  // https://en.cppreference.com/w/cpp/language/escape
  // \\ \x \xFF \u2837 \u00323747 \374
  const CHARACTER_ESCAPES = '\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)';
  const STRINGS = {
    className: 'string',
    variants: [
      {
        begin: '(u8?|U|L)?"',
        end: '"',
        illegal: '\\n',
        contains: [ hljs.BACKSLASH_ESCAPE ]
      },
      {
        begin: '(u8?|U|L)?\'(' + CHARACTER_ESCAPES + "|.)",
        end: '\'',
        illegal: '.'
      },
      // https://en.cppreference.com/w/cpp/language/string_literal
      // a d-char-sequence never contains parentheses, backslashes or whitespace;
      // quotes are excluded as well so the closing delimiter cannot swallow the
      // quote that actually terminates the literal
      hljs.END_SAME_AS_BEGIN({
        begin: /(?:u8?|U|L)?R"([^()\\\s"]{0,16})\(/,
        end: /\)([^()\\\s"]{0,16})"/
      })
    ]
  };

  const NUMBERS = {
    className: 'number',
    variants: [
      { match: /\b(0b[01']+)/ },  
      { match: /(-?)\b([\d']+(\.[\d']*)?|\.[\d']+)((ll|LL|l|L)(u|U)?|(u|U)(ll|LL|l|L)?|f|F|b|B)/ },  
      { match: /(-?)\b(0[xX][a-fA-F0-9]+(?:'[a-fA-F0-9]+)*(?:\.[a-fA-F0-9]*(?:'[a-fA-F0-9]*)*)?(?:[pP][-+]?[0-9]+)?(l|L)?(u|U)?)/ },  
      { match: /(-?)\b\d+(?:'\d+)*(?:\.\d*(?:'\d*)*)?(?:[eE][-+]?\d+)?/ }  
  ],
    relevance: 0
  };  
  
  // `#include` is the only preprocessor directive that takes an angle-bracket
  // quoted header (`#include <header>`). Scoping that rule to `#include` keeps
  // the greedy `<...>` match from eating a `>` that belongs to the body of
  // another directive (e.g. `#define what do { cout << ">"; } while (0)`),
  // which would otherwise leave an unbalanced `"` and break highlighting for
  // the rest of the file. See issue #3505.
  const PREPROCESSOR_INCLUDE = {
    scope: 'meta',
    begin: /#\s*include\b/,
    end: /$/,
    keywords: { keyword: 'include' },
    contains: [
      {
        // the `\` at the end of a line signaling continuation
        begin: /\\\n/,
      },
      STRINGS,
      {
        scope: 'string',
        begin: /<.*?>/
      },
      C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE
    ]
  };

  const PREPROCESSOR = {
    className: 'meta',
    begin: /#\s*[a-z]+\b/,
    end: /$/,
    keywords: { keyword:
        'if else elif endif define undef warning error line '
        + 'pragma _Pragma ifdef ifndef elifdef elifndef include' },
    contains: [
      {
        begin: /\\\n/,
        relevance: 0
      },
      hljs.inherit(STRINGS, { className: 'string' }),
      C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE
    ]
  };

  const PREPROCESSORS = [
    PREPROCESSOR_INCLUDE,
    PREPROCESSOR
  ];

  const TITLE_MODE = {
    className: 'title',
    begin: regex.optional(NAMESPACE_RE) + hljs.IDENT_RE,
    relevance: 0
  };

  const FUNCTION_TITLE = regex.optional(NAMESPACE_RE) + hljs.IDENT_RE + '\\s*\\(';
  // Bounded on purpose: an unbounded quantifier here consumes an arbitrarily
  // long run of words, and when no function title follows it the engine retries
  // the title at every token boundary of that run - quadratic in the size of
  // the document.  See #4362.
  const MAX_FUNCTION_TYPE_TOKENS = 12;

  const C_KEYWORDS = [
    "asm",
    "auto",
    "break",
    "case",
    "continue",
    "default",
    "do",
    "else",
    "enum",
    "extern",
    "for",
    "fortran",
    "goto",
    "if",
    "inline",
    "register",
    "restrict",
    "return",
    "sizeof",
    "typeof",
    "typeof_unqual",
    "struct",
    "switch",
    "typedef",
    "union",
    "volatile",
    "while",
    "_Alignas",
    "_Alignof",
    "_Atomic",
    "_Generic",
    "_Noreturn",
    "_Static_assert",
    "_Thread_local",
    // aliases
    "alignas",
    "alignof",
    "noreturn",
    "static_assert",
    "thread_local",
    // not a C keyword but is, for all intents and purposes, treated exactly like one.
    "_Pragma"
  ];

  const C_TYPES = [
    "float",
    "double",
    "signed",
    "unsigned",
    "int",
    "short",
    "long",
    "char",
    "void",
    "_Bool",
    "_BitInt",
    "_Complex",
    "_Imaginary",
    "_Decimal32",
    "_Decimal64",
    "_Decimal96",
    "_Decimal128",
    "_Decimal64x",
    "_Decimal128x",
    "_Float16",
    "_Float32",
    "_Float64",
    "_Float128",
    "_Float32x",
    "_Float64x",
    "_Float128x",
    // modifiers
    "const",
    "static",
    "constexpr",
    // aliases
    "complex",
    "bool",
    "imaginary"
  ];

  const KEYWORDS = {
    keyword: C_KEYWORDS,
    type: C_TYPES,
    literal: 'true false NULL',
    // TODO: apply hinting work similar to what was done in cpp.js
    built_in: 'std string wstring cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream '
      + 'auto_ptr deque list queue stack vector map set pair bitset multiset multimap unordered_set '
      + 'unordered_map unordered_multiset unordered_multimap priority_queue make_pair array shared_ptr abort terminate abs acos '
      + 'asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp '
      + 'fscanf future isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper '
      + 'isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow '
      + 'printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp '
      + 'strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan '
      + 'vfprintf vprintf vsprintf endl initializer_list unique_ptr',
  };

  const EXPRESSION_CONTAINS = [
    ...PREPROCESSORS,
    TYPES,
    C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE,
    NUMBERS,
    STRINGS
  ];

  const EXPRESSION_CONTEXT = {
    // This mode covers expression context where we can't expect a function
    // definition and shouldn't highlight anything that looks like one:
    // `return some()`, `else if()`, `(x*sum(1, 2))`
    variants: [
      {
        begin: /=/,
        end: /;/
      },
      {
        begin: /\(/,
        end: /\)/
      },
      {
        beginKeywords: 'new throw return else',
        end: /;/
      }
    ],
    keywords: KEYWORDS,
    contains: EXPRESSION_CONTAINS.concat([
      {
        begin: /\(/,
        end: /\)/,
        keywords: KEYWORDS,
        contains: EXPRESSION_CONTAINS.concat([ 'self' ]),
        relevance: 0
      }
    ]),
    relevance: 0
  };

  const FUNCTION_DECLARATION = {
    begin: '(' + FUNCTION_TYPE_RE + '[\\*&\\s]+){1,' + MAX_FUNCTION_TYPE_TOKENS + '}' + FUNCTION_TITLE,
    returnBegin: true,
    end: /[{;=]/,
    excludeEnd: true,
    keywords: KEYWORDS,
    illegal: /[^\w\s\*&:<>.]/,
    contains: [
      { // to prevent it from being confused as the function title
        begin: DECLTYPE_AUTO_RE,
        keywords: KEYWORDS,
        relevance: 0
      },
      {
        begin: FUNCTION_TITLE,
        returnBegin: true,
        contains: [ hljs.inherit(TITLE_MODE, { className: "title.function" }) ],
        relevance: 0
      },
      // allow for multiple declarations, e.g.:
      // extern void f(int), g(char);
      {
        relevance: 0,
        match: /,/
      },
      {
        className: 'params',
        begin: /\(/,
        end: /\)/,
        keywords: KEYWORDS,
        relevance: 0,
        contains: [
          C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE,
          STRINGS,
          NUMBERS,
          TYPES,
          // Count matching parentheses.
          {
            begin: /\(/,
            end: /\)/,
            keywords: KEYWORDS,
            relevance: 0,
            contains: [
              'self',
              C_LINE_COMMENT_MODE,
              hljs.C_BLOCK_COMMENT_MODE,
              STRINGS,
              NUMBERS,
              TYPES
            ]
          }
        ]
      },
      TYPES,
      C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      ...PREPROCESSORS
    ]
  };

  return {
    name: "C",
    aliases: [ 'h' ],
    keywords: KEYWORDS,
    // Until differentiations are added between `c` and `cpp`, `c` will
    // not be auto-detected to avoid auto-detect conflicts between C and C++
    disableAutodetect: true,
    illegal: '</',
    contains: [].concat(
      EXPRESSION_CONTEXT,
      FUNCTION_DECLARATION,
      EXPRESSION_CONTAINS,
      [
        ...PREPROCESSORS,
        {
          begin: hljs.IDENT_RE + '::',
          keywords: KEYWORDS
        },
        {
          className: 'class',
          beginKeywords: 'enum class struct union',
          end: /[{;:<>=]/,
          contains: [
            { beginKeywords: "final class struct" },
            hljs.TITLE_MODE
          ]
        }
      ]),
    exports: {
      preprocessor: PREPROCESSOR,
      strings: STRINGS,
      keywords: KEYWORDS
    }
  };
}

module.exports = c;

    },
    "./languages/xml": function (module, exports, require) {
/*
Language: HTML, XML
Website: https://www.w3.org/XML/
Category: common, web
Audit: 2020
*/

/** @type LanguageFn */
function xml(hljs) {
  const regex = hljs.regex;
  // XML names can have the following additional letters: https://www.w3.org/TR/xml/#NT-NameChar
  // OTHER_NAME_CHARS = /[:\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]/;
  // Element names start with NAME_START_CHAR followed by optional other Unicode letters, ASCII digits, hyphens, underscores, and periods
  // const TAG_NAME_RE = regex.concat(/[A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, regex.optional(/[A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*:/), /[A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*/);;
  // const XML_IDENT_RE = /[A-Z_a-z:\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]+/;
  // const TAG_NAME_RE = regex.concat(/[A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, regex.optional(/[A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*:/), /[A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*/);
  // however, to cater for performance and more Unicode support rely simply on the Unicode letter class
  const TAG_NAME_RE = regex.concat(/[\p{L}_]/u, regex.optional(/[\p{L}0-9_.-]*:/u), /[\p{L}0-9_.-]*/u);
  const XML_IDENT_RE = /[\p{L}0-9._:-]+/u;
  const XML_ENTITIES = {
    className: 'symbol',
    begin: /&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/
  };
  const XML_META_KEYWORDS = {
    begin: /\s/,
    contains: [
      {
        className: 'keyword',
        begin: /#?[a-z_][a-z1-9_-]+/,
        illegal: /\n/
      }
    ]
  };
  const XML_META_PAR_KEYWORDS = hljs.inherit(XML_META_KEYWORDS, {
    begin: /\(/,
    end: /\)/
  });
  const APOS_META_STRING_MODE = hljs.inherit(hljs.APOS_STRING_MODE, { className: 'string' });
  const QUOTE_META_STRING_MODE = hljs.inherit(hljs.QUOTE_STRING_MODE, { className: 'string' });
  const TAG_INTERNALS = {
    endsWithParent: true,
    illegal: /</,
    relevance: 0,
    contains: [
      {
        className: 'attr',
        begin: XML_IDENT_RE,
        relevance: 0
      },
      {
        begin: /=\s*/,
        relevance: 0,
        contains: [
          {
            className: 'string',
            endsParent: true,
            variants: [
              {
                begin: /"/,
                end: /"/,
                contains: [ XML_ENTITIES ]
              },
              {
                begin: /'/,
                end: /'/,
                contains: [ XML_ENTITIES ]
              },
              { begin: /[^\s"'=<>`]+/ }
            ]
          }
        ]
      }
    ]
  };
  return {
    name: 'HTML, XML',
    aliases: [
      'html',
      'xhtml',
      'rss',
      'atom',
      'xjb',
      'xsd',
      'xsl',
      'plist',
      'wsf',
      'svg'
    ],
    case_insensitive: true,
    unicodeRegex: true,
    contains: [
      {
        className: 'meta',
        begin: /<![a-z]/,
        end: />/,
        relevance: 10,
        contains: [
          XML_META_KEYWORDS,
          QUOTE_META_STRING_MODE,
          APOS_META_STRING_MODE,
          XML_META_PAR_KEYWORDS,
          {
            begin: /\[/,
            end: /\]/,
            contains: [
              {
                className: 'meta',
                begin: /<![a-z]/,
                end: />/,
                contains: [
                  XML_META_KEYWORDS,
                  XML_META_PAR_KEYWORDS,
                  QUOTE_META_STRING_MODE,
                  APOS_META_STRING_MODE
                ]
              }
            ]
          }
        ]
      },
      hljs.COMMENT(
        /<!--/,
        /-->/,
        { relevance: 10 }
      ),
      {
        begin: /<!\[CDATA\[/,
        end: /\]\]>/,
        relevance: 10
      },
      XML_ENTITIES,
      // xml processing instructions
      {
        className: 'meta',
        end: /\?>/,
        variants: [
          {
            begin: /<\?xml/,
            relevance: 10,
            contains: [
              QUOTE_META_STRING_MODE
            ]
          },
          {
            begin: /<\?[a-z][a-z0-9]+/,
          }
        ]

      },
      {
        className: 'tag',
        /*
        The lookahead pattern (?=...) ensures that 'begin' only matches
        '<style' as a single word, followed by a whitespace or an
        ending bracket.
        */
        begin: /<style(?=\s|>)/,
        end: />/,
        keywords: { name: 'style' },
        contains: [ TAG_INTERNALS ],
        starts: {
          end: /<\/style>/,
          returnEnd: true,
          subLanguage: 'css'
        }
      },
      {
        className: 'tag',
        // See the comment in the <style tag about the lookahead pattern
        begin: /<script(?=\s|>)/,
        end: />/,
        keywords: { name: 'script' },
        contains: [ TAG_INTERNALS ],
        starts: {
          end: /<\/script>/,
          returnEnd: true,
          subLanguage: 'javascript'
        }
      },
      // we need this for now for jSX
      {
        className: 'tag',
        begin: /<>|<\/>/
      },
      // open tag
      {
        className: 'tag',
        begin: regex.concat(
          /</,
          regex.lookahead(regex.concat(
            TAG_NAME_RE,
            // <tag/>
            // <tag>
            // <tag ...
            regex.either(/\/>/, />/, /\s/)
          ))
        ),
        end: /\/?>/,
        contains: [
          {
            className: 'name',
            begin: TAG_NAME_RE,
            relevance: 0,
            starts: TAG_INTERNALS
          }
        ]
      },
      // close tag
      {
        className: 'tag',
        begin: regex.concat(
          /<\//,
          regex.lookahead(regex.concat(
            TAG_NAME_RE, />/
          ))
        ),
        contains: [
          {
            className: 'name',
            begin: TAG_NAME_RE,
            relevance: 0
          },
          {
            begin: />/,
            relevance: 0,
            endsParent: true
          }
        ]
      }
    ]
  };
}

module.exports = xml;

    },
    "./languages/css": function (module, exports, require) {
const MODES = (hljs) => {
  return {
    IMPORTANT: {
      scope: 'meta',
      begin: '!important'
    },
    BLOCK_COMMENT: hljs.C_BLOCK_COMMENT_MODE,
    HEXCOLOR: {
      scope: 'number',
      begin: /#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/
    },
    UNICODE_RANGE: {
      scope: 'number',
      begin: /\b[Uu]\+[0-9A-Fa-f][0-9A-Fa-f?]{0,5}(-[0-9A-Fa-f][0-9A-Fa-f]{0,5})?/
    },
    FUNCTION_DISPATCH: {
      className: "built_in",
      begin: /[\w-]+(?=\()/
    },
    ATTRIBUTE_SELECTOR_MODE: {
      scope: 'selector-attr',
      begin: /\[/,
      end: /\]/,
      illegal: '$',
      contains: [
        hljs.APOS_STRING_MODE,
        hljs.QUOTE_STRING_MODE
      ]
    },
    CSS_NUMBER_MODE: {
      scope: 'number',
      begin: hljs.NUMBER_RE + '(' +
        '%|em|ex|ch|rem' +
        '|vw|vh|vmin|vmax' +
        '|cm|mm|in|pt|pc|px' +
        '|deg|grad|rad|turn' +
        '|s|ms' +
        '|Hz|kHz' +
        '|dpi|dpcm|dppx' +
        ')?',
      relevance: 0
    },
    CSS_VARIABLE: {
      className: "attr",
      begin: /--[A-Za-z_][A-Za-z0-9_-]*/
    }
  };
};

const HTML_TAGS = [
  'a',
  'abbr',
  'address',
  'article',
  'aside',
  'audio',
  'b',
  'blockquote',
  'body',
  'button',
  'canvas',
  'caption',
  'cite',
  'code',
  'dd',
  'del',
  'details',
  'dfn',
  'div',
  'dl',
  'dt',
  'em',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'header',
  'hgroup',
  'html',
  'i',
  'iframe',
  'img',
  'input',
  'ins',
  'kbd',
  'label',
  'legend',
  'li',
  'main',
  'mark',
  'menu',
  'nav',
  'object',
  'ol',
  'optgroup',
  'option',
  'p',
  'picture',
  'q',
  'quote',
  'samp',
  'section',
  'select',
  'source',
  'span',
  'strong',
  'summary',
  'sup',
  'table',
  'tbody',
  'td',
  'textarea',
  'tfoot',
  'th',
  'thead',
  'time',
  'tr',
  'ul',
  'var',
  'video'
];

const SVG_TAGS = [
  'defs',
  'g',
  'marker',
  'mask',
  'pattern',
  'svg',
  'switch',
  'symbol',
  'feBlend',
  'feColorMatrix',
  'feComponentTransfer',
  'feComposite',
  'feConvolveMatrix',
  'feDiffuseLighting',
  'feDisplacementMap',
  'feFlood',
  'feGaussianBlur',
  'feImage',
  'feMerge',
  'feMorphology',
  'feOffset',
  'feSpecularLighting',
  'feTile',
  'feTurbulence',
  'linearGradient',
  'radialGradient',
  'stop',
  'circle',
  'ellipse',
  'image',
  'line',
  'path',
  'polygon',
  'polyline',
  'rect',
  'text',
  'use',
  'textPath',
  'tspan',
  'foreignObject',
  'clipPath'
];

const TAGS = [
  ...HTML_TAGS,
  ...SVG_TAGS,
];

// Sorting, then reversing makes sure longer attributes/elements like
// `font-weight` are matched fully instead of getting false positives on say `font`

const MEDIA_FEATURES = [
  'any-hover',
  'any-pointer',
  'aspect-ratio',
  'color',
  'color-gamut',
  'color-index',
  'device-aspect-ratio',
  'device-height',
  'device-width',
  'display-mode',
  'forced-colors',
  'grid',
  'height',
  'hover',
  'inverted-colors',
  'monochrome',
  'orientation',
  'overflow-block',
  'overflow-inline',
  'pointer',
  'prefers-color-scheme',
  'prefers-contrast',
  'prefers-reduced-motion',
  'prefers-reduced-transparency',
  'resolution',
  'scan',
  'scripting',
  'update',
  'width',
  // TODO: find a better solution?
  'min-width',
  'max-width',
  'min-height',
  'max-height'
].sort().reverse();

// https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes
const PSEUDO_CLASSES = [
  'active',
  'any-link',
  'blank',
  'checked',
  'current',
  'default',
  'defined',
  'dir', // dir()
  'disabled',
  'drop',
  'empty',
  'enabled',
  'first',
  'first-child',
  'first-of-type',
  'fullscreen',
  'future',
  'focus',
  'focus-visible',
  'focus-within',
  'has', // has()
  'host', // host or host()
  'host-context', // host-context()
  'hover',
  'indeterminate',
  'in-range',
  'invalid',
  'is', // is()
  'lang', // lang()
  'last-child',
  'last-of-type',
  'left',
  'link',
  'local-link',
  'not', // not()
  'nth-child', // nth-child()
  'nth-col', // nth-col()
  'nth-last-child', // nth-last-child()
  'nth-last-col', // nth-last-col()
  'nth-last-of-type', //nth-last-of-type()
  'nth-of-type', //nth-of-type()
  'only-child',
  'only-of-type',
  'optional',
  'out-of-range',
  'past',
  'placeholder-shown',
  'read-only',
  'read-write',
  'required',
  'right',
  'root',
  'scope',
  'target',
  'target-within',
  'user-invalid',
  'valid',
  'visited',
  'where' // where()
].sort().reverse();

// https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements
const PSEUDO_ELEMENTS = [
  'after',
  'backdrop',
  'before',
  'cue',
  'cue-region',
  'first-letter',
  'first-line',
  'grammar-error',
  'marker',
  'part',
  'placeholder',
  'selection',
  'slotted',
  'spelling-error'
].sort().reverse();

const ATTRIBUTES = [
  'accent-color',
  'align-content',
  'align-items',
  'align-self',
  'alignment-baseline',
  'all',
  'anchor-name',
  'animation',
  'animation-composition',
  'animation-delay',
  'animation-direction',
  'animation-duration',
  'animation-fill-mode',
  'animation-iteration-count',
  'animation-name',
  'animation-play-state',
  'animation-range',
  'animation-range-end',
  'animation-range-start',
  'animation-timeline',
  'animation-timing-function',
  'appearance',
  'aspect-ratio',
  'backdrop-filter',
  'backface-visibility',
  'background',
  'background-attachment',
  'background-blend-mode',
  'background-clip',
  'background-color',
  'background-image',
  'background-origin',
  'background-position',
  'background-position-x',
  'background-position-y',
  'background-repeat',
  'background-size',
  'baseline-shift',
  'block-size',
  'border',
  'border-block',
  'border-block-color',
  'border-block-end',
  'border-block-end-color',
  'border-block-end-style',
  'border-block-end-width',
  'border-block-start',
  'border-block-start-color',
  'border-block-start-style',
  'border-block-start-width',
  'border-block-style',
  'border-block-width',
  'border-bottom',
  'border-bottom-color',
  'border-bottom-left-radius',
  'border-bottom-right-radius',
  'border-bottom-style',
  'border-bottom-width',
  'border-collapse',
  'border-color',
  'border-end-end-radius',
  'border-end-start-radius',
  'border-image',
  'border-image-outset',
  'border-image-repeat',
  'border-image-slice',
  'border-image-source',
  'border-image-width',
  'border-inline',
  'border-inline-color',
  'border-inline-end',
  'border-inline-end-color',
  'border-inline-end-style',
  'border-inline-end-width',
  'border-inline-start',
  'border-inline-start-color',
  'border-inline-start-style',
  'border-inline-start-width',
  'border-inline-style',
  'border-inline-width',
  'border-left',
  'border-left-color',
  'border-left-style',
  'border-left-width',
  'border-radius',
  'border-right',
  'border-right-color',
  'border-right-style',
  'border-right-width',
  'border-spacing',
  'border-start-end-radius',
  'border-start-start-radius',
  'border-style',
  'border-top',
  'border-top-color',
  'border-top-left-radius',
  'border-top-right-radius',
  'border-top-style',
  'border-top-width',
  'border-width',
  'bottom',
  'box-align',
  'box-decoration-break',
  'box-direction',
  'box-flex',
  'box-flex-group',
  'box-lines',
  'box-ordinal-group',
  'box-orient',
  'box-pack',
  'box-shadow',
  'box-sizing',
  'break-after',
  'break-before',
  'break-inside',
  'caption-side',
  'caret-color',
  'clear',
  'clip',
  'clip-path',
  'clip-rule',
  'color',
  'color-interpolation',
  'color-interpolation-filters',
  'color-profile',
  'color-rendering',
  'color-scheme',
  'column-count',
  'column-fill',
  'column-gap',
  'column-rule',
  'column-rule-color',
  'column-rule-style',
  'column-rule-width',
  'column-span',
  'column-width',
  'columns',
  'contain',
  'contain-intrinsic-block-size',
  'contain-intrinsic-height',
  'contain-intrinsic-inline-size',
  'contain-intrinsic-size',
  'contain-intrinsic-width',
  'container',
  'container-name',
  'container-type',
  'content',
  'content-visibility',
  'corner-bottom-left-shape',
  'corner-bottom-right-shape',
  'corner-shape',
  'corner-top-left-shape',
  'corner-top-right-shape',
  'counter-increment',
  'counter-reset',
  'counter-set',
  'cue',
  'cue-after',
  'cue-before',
  'cursor',
  'cx',
  'cy',
  'direction',
  'display',
  'dominant-baseline',
  'empty-cells',
  'enable-background',
  'field-sizing',
  'fill',
  'fill-opacity',
  'fill-rule',
  'filter',
  'flex',
  'flex-basis',
  'flex-direction',
  'flex-flow',
  'flex-grow',
  'flex-shrink',
  'flex-wrap',
  'float',
  'flood-color',
  'flood-opacity',
  'flow',
  'font',
  'font-display',
  'font-family',
  'font-feature-settings',
  'font-kerning',
  'font-language-override',
  'font-optical-sizing',
  'font-palette',
  'font-size',
  'font-size-adjust',
  'font-smooth',
  'font-smoothing',
  'font-stretch',
  'font-style',
  'font-synthesis',
  'font-synthesis-position',
  'font-synthesis-small-caps',
  'font-synthesis-style',
  'font-synthesis-weight',
  'font-variant',
  'font-variant-alternates',
  'font-variant-caps',
  'font-variant-east-asian',
  'font-variant-emoji',
  'font-variant-ligatures',
  'font-variant-numeric',
  'font-variant-position',
  'font-variation-settings',
  'font-weight',
  'forced-color-adjust',
  'gap',
  'glyph-orientation-horizontal',
  'glyph-orientation-vertical',
  'grid',
  'grid-area',
  'grid-auto-columns',
  'grid-auto-flow',
  'grid-auto-rows',
  'grid-column',
  'grid-column-end',
  'grid-column-start',
  'grid-gap',
  'grid-row',
  'grid-row-end',
  'grid-row-start',
  'grid-template',
  'grid-template-areas',
  'grid-template-columns',
  'grid-template-rows',
  'hanging-punctuation',
  'height',
  'hyphenate-character',
  'hyphenate-limit-chars',
  'hyphens',
  'icon',
  'image-orientation',
  'image-rendering',
  'image-resolution',
  'ime-mode',
  'initial-letter',
  'initial-letter-align',
  'inline-size',
  'inset',
  'inset-area',
  'inset-block',
  'inset-block-end',
  'inset-block-start',
  'inset-inline',
  'inset-inline-end',
  'inset-inline-start',
  'isolation',
  'justify-content',
  'justify-items',
  'justify-self',
  'kerning',
  'left',
  'letter-spacing',
  'lighting-color',
  'line-break',
  'line-height',
  'line-height-step',
  'list-style',
  'list-style-image',
  'list-style-position',
  'list-style-type',
  'margin',
  'margin-block',
  'margin-block-end',
  'margin-block-start',
  'margin-bottom',
  'margin-inline',
  'margin-inline-end',
  'margin-inline-start',
  'margin-left',
  'margin-right',
  'margin-top',
  'margin-trim',
  'marker',
  'marker-end',
  'marker-mid',
  'marker-start',
  'marks',
  'mask',
  'mask-border',
  'mask-border-mode',
  'mask-border-outset',
  'mask-border-repeat',
  'mask-border-slice',
  'mask-border-source',
  'mask-border-width',
  'mask-clip',
  'mask-composite',
  'mask-image',
  'mask-mode',
  'mask-origin',
  'mask-position',
  'mask-repeat',
  'mask-size',
  'mask-type',
  'masonry-auto-flow',
  'math-depth',
  'math-shift',
  'math-style',
  'max-block-size',
  'max-height',
  'max-inline-size',
  'max-width',
  'min-block-size',
  'min-height',
  'min-inline-size',
  'min-width',
  'mix-blend-mode',
  'nav-down',
  'nav-index',
  'nav-left',
  'nav-right',
  'nav-up',
  'none',
  'normal',
  'object-fit',
  'object-position',
  'offset',
  'offset-anchor',
  'offset-distance',
  'offset-path',
  'offset-position',
  'offset-rotate',
  'opacity',
  'order',
  'orphans',
  'outline',
  'outline-color',
  'outline-offset',
  'outline-style',
  'outline-width',
  'overflow',
  'overflow-anchor',
  'overflow-block',
  'overflow-clip-margin',
  'overflow-inline',
  'overflow-wrap',
  'overflow-x',
  'overflow-y',
  'overlay',
  'overscroll-behavior',
  'overscroll-behavior-block',
  'overscroll-behavior-inline',
  'overscroll-behavior-x',
  'overscroll-behavior-y',
  'padding',
  'padding-block',
  'padding-block-end',
  'padding-block-start',
  'padding-bottom',
  'padding-inline',
  'padding-inline-end',
  'padding-inline-start',
  'padding-left',
  'padding-right',
  'padding-top',
  'page',
  'page-break-after',
  'page-break-before',
  'page-break-inside',
  'paint-order',
  'pause',
  'pause-after',
  'pause-before',
  'perspective',
  'perspective-origin',
  'place-content',
  'place-items',
  'place-self',
  'pointer-events',
  'position',
  'position-anchor',
  'position-visibility',
  'print-color-adjust',
  'quotes',
  'r',
  'resize',
  'rest',
  'rest-after',
  'rest-before',
  'right',
  'rotate',
  'row-gap',
  'ruby-align',
  'ruby-position',
  'scale',
  'scroll-behavior',
  'scroll-margin',
  'scroll-margin-block',
  'scroll-margin-block-end',
  'scroll-margin-block-start',
  'scroll-margin-bottom',
  'scroll-margin-inline',
  'scroll-margin-inline-end',
  'scroll-margin-inline-start',
  'scroll-margin-left',
  'scroll-margin-right',
  'scroll-margin-top',
  'scroll-padding',
  'scroll-padding-block',
  'scroll-padding-block-end',
  'scroll-padding-block-start',
  'scroll-padding-bottom',
  'scroll-padding-inline',
  'scroll-padding-inline-end',
  'scroll-padding-inline-start',
  'scroll-padding-left',
  'scroll-padding-right',
  'scroll-padding-top',
  'scroll-snap-align',
  'scroll-snap-stop',
  'scroll-snap-type',
  'scroll-timeline',
  'scroll-timeline-axis',
  'scroll-timeline-name',
  'scrollbar-color',
  'scrollbar-gutter',
  'scrollbar-width',
  'shape-image-threshold',
  'shape-margin',
  'shape-outside',
  'shape-rendering',
  'speak',
  'speak-as',
  'src', // @font-face
  'stop-color',
  'stop-opacity',
  'stroke',
  'stroke-dasharray',
  'stroke-dashoffset',
  'stroke-linecap',
  'stroke-linejoin',
  'stroke-miterlimit',
  'stroke-opacity',
  'stroke-width',
  'tab-size',
  'table-layout',
  'text-align',
  'text-align-all',
  'text-align-last',
  'text-anchor',
  'text-combine-upright',
  'text-decoration',
  'text-decoration-color',
  'text-decoration-line',
  'text-decoration-skip',
  'text-decoration-skip-ink',
  'text-decoration-style',
  'text-decoration-thickness',
  'text-emphasis',
  'text-emphasis-color',
  'text-emphasis-position',
  'text-emphasis-style',
  'text-indent',
  'text-justify',
  'text-orientation',
  'text-overflow',
  'text-rendering',
  'text-shadow',
  'text-size-adjust',
  'text-transform',
  'text-underline-offset',
  'text-underline-position',
  'text-wrap',
  'text-wrap-mode',
  'text-wrap-style',
  'timeline-scope',
  'top',
  'touch-action',
  'transform',
  'transform-box',
  'transform-origin',
  'transform-style',
  'transition',
  'transition-behavior',
  'transition-delay',
  'transition-duration',
  'transition-property',
  'transition-timing-function',
  'translate',
  'unicode-bidi',
  'unicode-range',
  'user-modify',
  'user-select',
  'vector-effect',
  'vertical-align',
  'view-timeline',
  'view-timeline-axis',
  'view-timeline-inset',
  'view-timeline-name',
  'view-transition-name',
  'visibility',
  'voice-balance',
  'voice-duration',
  'voice-family',
  'voice-pitch',
  'voice-range',
  'voice-rate',
  'voice-stress',
  'voice-volume',
  'white-space',
  'white-space-collapse',
  'widows',
  'width',
  'will-change',
  'word-break',
  'word-spacing',
  'word-wrap',
  'writing-mode',
  'x',
  'y',
  'z-index',
  'zoom'
].sort().reverse();

/*
Language: CSS
Category: common, css, web
Website: https://developer.mozilla.org/en-US/docs/Web/CSS
*/


/** @type LanguageFn */
function css(hljs) {
  const regex = hljs.regex;
  const modes = MODES(hljs);
  const VENDOR_PREFIX = { begin: /-(webkit|moz|ms|o)-(?=[a-z])/ };
  const AT_MODIFIERS = "and or not only";
  const AT_PROPERTY_RE = /@-?\w[\w]*(-\w+)*/; // @-webkit-keyframes
  const IDENT_RE = '[a-zA-Z-][a-zA-Z0-9_-]*';
  const STRINGS = [
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE
  ];

  return {
    name: 'CSS',
    case_insensitive: true,
    illegal: /[=|'\$]/,
    keywords: { keyframePosition: "from to" },
    classNameAliases: {
      // for visual continuity with `tag {}` and because we
      // don't have a great class for this?
      keyframePosition: "selector-tag" },
    contains: [
      modes.BLOCK_COMMENT,
      VENDOR_PREFIX,
      // to recognize keyframe 40% etc which are outside the scope of our
      // attribute value mode
      modes.CSS_NUMBER_MODE,
      {
        className: 'selector-id',
        begin: /#[A-Za-z0-9_-]+/,
        relevance: 0
      },
      {
        className: 'selector-class',
        begin: '\\.' + IDENT_RE,
        relevance: 0
      },
      modes.ATTRIBUTE_SELECTOR_MODE,
      {
        className: 'selector-pseudo',
        variants: [
          { begin: ':(' + PSEUDO_CLASSES.join('|') + ')' },
          { begin: ':(:)?(' + PSEUDO_ELEMENTS.join('|') + ')' }
        ]
      },
      // we may actually need this (12/2020)
      // { // pseudo-selector params
      //   begin: /\(/,
      //   end: /\)/,
      //   contains: [ hljs.CSS_NUMBER_MODE ]
      // },
      modes.CSS_VARIABLE,
      {
        className: 'attribute',
        begin: '\\b(' + ATTRIBUTES.join('|') + ')\\b'
      },
      // attribute values
      {
        begin: /:/,
        end: /[;}{]/,
        contains: [
          modes.BLOCK_COMMENT,
          modes.HEXCOLOR,
          modes.IMPORTANT,
          modes.CSS_NUMBER_MODE,
          modes.UNICODE_RANGE,
          ...STRINGS,
          // needed to highlight these as strings and to avoid issues with
          // illegal characters that might be inside urls that would trigger the
          // languages illegal stack
          {
            begin: /(url|data-uri)\(/,
            end: /\)/,
            relevance: 0, // from keywords
            keywords: { built_in: "url data-uri" },
            contains: [
              ...STRINGS,
              {
                className: "string",
                // any character other than `)` as in `url()` will be the start
                // of a string, which ends with `)` (from the parent mode)
                begin: /[^)]/,
                endsWithParent: true,
                excludeEnd: true
              }
            ]
          },
          modes.FUNCTION_DISPATCH
        ]
      },
      {
        begin: regex.lookahead(/@/),
        end: '[{;]',
        relevance: 0,
        illegal: /:/, // break on Less variables @var: ...
        contains: [
          {
            className: 'keyword',
            begin: AT_PROPERTY_RE
          },
          {
            begin: /\s/,
            endsWithParent: true,
            excludeEnd: true,
            relevance: 0,
            keywords: {
              $pattern: /[a-z-]+/,
              keyword: AT_MODIFIERS,
              attribute: MEDIA_FEATURES.join(" ")
            },
            contains: [
              {
                begin: /[a-z-]+(?=:)/,
                className: "attribute"
              },
              ...STRINGS,
              modes.CSS_NUMBER_MODE
            ]
          }
        ]
      },
      {
        className: 'selector-tag',
        begin: '\\b(' + TAGS.join('|') + ')\\b'
      }
    ]
  };
}

module.exports = css;

    },
    "./languages/markdown": function (module, exports, require) {
/*
Language: Markdown
Requires: xml.js
Author: John Crepezzi <john.crepezzi@gmail.com>
Website: https://daringfireball.net/projects/markdown/
Category: common, markup
*/

function markdown(hljs) {
  const regex = hljs.regex;
  const INLINE_HTML = {
    begin: /<\/?[A-Za-z_]/,
    end: '>',
    subLanguage: 'xml',
    relevance: 0
  };
  // https://spec.commonmark.org/0.31.2/#thematic-breaks
  // three or more `-`, `*` or `_`, all the same character, optionally
  // separated and followed by spaces or tabs, and nothing else on the line
  const HORIZONTAL_RULE = { match: /^ {0,3}([-*_])[ \t]*(?:\1[ \t]*){2,}$/ };
  const CODE = {
    className: 'code',
    variants: [
      // TODO: fix to allow these to work with sublanguage also
      { begin: '(`{3,})[^`](.|\\n)*?\\1`*[ ]*' },
      { begin: '(~{3,})[^~](.|\\n)*?\\1~*[ ]*' },
      // needed to allow markdown as a sublanguage to work
      {
        begin: '```',
        end: '```+[ ]*$'
      },
      {
        begin: '~~~',
        end: '~~~+[ ]*$'
      },
      { begin: '`.+?`' },
      {
        begin: '(?=^( {4}|\\t))',
        // use contains to gobble up multiple lines to allow the block to be whatever size
        // but only have a single open/close tag vs one per line
        contains: [
          {
            begin: '^( {4}|\\t)',
            end: '(\\n)$'
          }
        ],
        relevance: 0
      }
    ]
  };
  const LIST = {
    className: 'bullet',
    begin: '^[ \t]*([*+-]|(\\d+\\.))(?=\\s+)',
    end: '\\s+',
    excludeEnd: true
  };
  const LINK_REFERENCE = {
    begin: /^\[[^\n]+\]:/,
    returnBegin: true,
    contains: [
      {
        className: 'symbol',
        begin: /\[/,
        end: /\]/,
        excludeBegin: true,
        excludeEnd: true
      },
      {
        className: 'link',
        begin: /:\s*/,
        end: /$/,
        excludeBegin: true
      }
    ]
  };
  const URL_SCHEME = /[A-Za-z][A-Za-z0-9+.-]*/;
  const LINK = {
    variants: [
      // too much like nested array access in so many languages
      // to have any real relevance
      {
        begin: /\[.+?\]\[.*?\]/,
        relevance: 0
      },
      // popular internet URLs
      {
        begin: /\[.+?\]\(((data|javascript|mailto):|(?:http|ftp)s?:\/\/).*?\)/,
        relevance: 2
      },
      {
        begin: regex.concat(/\[.+?\]\(/, URL_SCHEME, /:\/\/.*?\)/),
        relevance: 2
      },
      // relative urls
      {
        begin: /\[.+?\]\([./?&#].*?\)/,
        relevance: 1
      },
      // whatever else, lower relevance (might not be a link at all)
      {
        begin: /\[.*?\]\(.*?\)/,
        relevance: 0
      }
    ],
    returnBegin: true,
    contains: [
      {
        // empty strings for alt or link text
        match: /\[(?=\])/ },
      {
        className: 'string',
        relevance: 0,
        begin: '\\[',
        end: '\\]',
        excludeBegin: true,
        returnEnd: true
      },
      {
        className: 'link',
        relevance: 0,
        begin: '\\]\\(',
        end: '\\)',
        excludeBegin: true,
        excludeEnd: true
      },
      {
        className: 'symbol',
        relevance: 0,
        begin: '\\]\\[',
        end: '\\]',
        excludeBegin: true,
        excludeEnd: true
      }
    ]
  };
  const BOLD = {
    className: 'strong',
    contains: [], // defined later
    variants: [
      {
        begin: /_{2}(?!\s)/,
        end: /_{2}/
      },
      {
        begin: /\*{2}(?!\s)/,
        end: /\*{2}/
      }
    ]
  };
  const ITALIC = {
    className: 'emphasis',
    contains: [], // defined later
    variants: [
      {
        begin: /\*(?![*\s])/,
        end: /\*/
      },
      {
        begin: /_(?![_\s])/,
        end: /_/,
        relevance: 0
      }
    ]
  };

  // 3 level deep nesting is not allowed because it would create confusion
  // in cases like `***testing***` because where we don't know if the last
  // `***` is starting a new bold/italic or finishing the last one
  const BOLD_WITHOUT_ITALIC = hljs.inherit(BOLD, { contains: [] });
  const ITALIC_WITHOUT_BOLD = hljs.inherit(ITALIC, { contains: [] });
  BOLD.contains.push(ITALIC_WITHOUT_BOLD);
  ITALIC.contains.push(BOLD_WITHOUT_ITALIC);

  let CONTAINABLE = [
    INLINE_HTML,
    LINK
  ];

  [
    BOLD,
    ITALIC,
    BOLD_WITHOUT_ITALIC,
    ITALIC_WITHOUT_BOLD
  ].forEach(m => {
    m.contains = m.contains.concat(CONTAINABLE);
  });

  CONTAINABLE = CONTAINABLE.concat(BOLD, ITALIC);

  const HEADER = {
    className: 'section',
    variants: [
      {
        begin: '^#{1,6}',
        end: '$',
        contains: CONTAINABLE
      },
      {
        begin: '(?=^.+?\\n[=-]{2,}$)',
        contains: [
          { begin: '^[=-]*$' },
          {
            begin: '^',
            end: "\\n",
            contains: CONTAINABLE
          }
        ]
      }
    ]
  };

  const BLOCKQUOTE = {
    className: 'quote',
    begin: '^>\\s+',
    contains: CONTAINABLE,
    end: '$'
  };

  const ENTITY = {
    //https://spec.commonmark.org/0.31.2/#entity-references
    scope: 'literal',
    match: /&([a-zA-Z0-9]+|#[0-9]{1,7}|#[Xx][0-9a-fA-F]{1,6});/
  };

  return {
    name: 'Markdown',
    aliases: [
      'md',
      'mkdown',
      'mkd'
    ],
    contains: [
      HEADER,
      INLINE_HTML,
      LIST,
      // must come before BOLD/ITALIC so that a `***` or `___` thematic break
      // isn't mistaken for the start of bold text
      HORIZONTAL_RULE,
      BOLD,
      ITALIC,
      BLOCKQUOTE,
      CODE,
      LINK,
      LINK_REFERENCE,
      ENTITY
    ]
  };
}

module.exports = markdown;

    },
    "./languages/yaml": function (module, exports, require) {
/*
Language: YAML
Description: Yet Another Markdown Language
Author: Stefan Wienert <stwienert@gmail.com>
Contributors: Carl Baxter <carl@cbax.tech>
Requires: ruby.js
Website: https://yaml.org
Category: common, config
*/
function yaml(hljs) {
  const LITERALS = 'true false yes no null';

  // YAML spec allows non-reserved URI characters in tags.
  const URI_CHARACTERS = '[\\w#;/?:@&=+$,.~*\'()[\\]]+';

  // Define keys as starting with a word character
  // ...containing word chars, spaces, colons, forward-slashes, hyphens and periods
  // ...and ending with a colon followed immediately by a space, tab or newline.
  // The YAML spec allows for much more than this, but this covers most use-cases.
  const KEY = {
    className: 'attr',
    variants: [
      // added brackets support and special char support
      { begin: /[\w*@][\w*@ :()\./-]*:(?=[ \t]|$)/ },
      { // double quoted keys - with brackets and special char support
        begin: /"[\w*@][\w*@ :()\./-]*":(?=[ \t]|$)/ },
      { // single quoted keys - with brackets and special char support
        begin: /'[\w*@][\w*@ :()\./-]*':(?=[ \t]|$)/ },
    ]
  };
  
  const TEMPLATE_VARIABLES = {
    className: 'template-variable',
    variants: [
      { // jinja templates Ansible
        begin: /\{\{/,
        end: /\}\}/
      },
      { // Ruby i18n
        begin: /%\{/,
        end: /\}/
      }
    ]
  };

  const SINGLE_QUOTE_STRING = {
    className: 'string',
    relevance: 0,
    begin: /'/,
    end: /'/,
    contains: [
      {
        match: /''/,
        scope: 'char.escape',
        relevance: 0
      }
    ]
  };

  const STRING = {
    className: 'string',
    relevance: 0,
    variants: [
      {
        begin: /"/,
        end: /"/
      },
      { begin: /\S+/ }
    ],
    contains: [
      hljs.BACKSLASH_ESCAPE,
      TEMPLATE_VARIABLES
    ]
  };

  // Strings inside of value containers (objects) can't contain braces,
  // brackets, or commas
  const CONTAINER_STRING = hljs.inherit(STRING, { variants: [
    {
      begin: /'/,
      end: /'/,
      contains: [
        {
          begin: /''/,
          relevance: 0
        }
      ]
    },
    {
      begin: /"/,
      end: /"/
    },
    { begin: /[^\s,{}[\]]+/ }
  ] });

  const DATE_RE = '[0-9]{4}(-[0-9][0-9]){0,2}';
  const TIME_RE = '([Tt \\t][0-9][0-9]?(:[0-9][0-9]){2})?';
  const FRACTION_RE = '(\\.[0-9]*)?';
  const ZONE_RE = '([ \\t])*(Z|[-+][0-9][0-9]?(:[0-9][0-9])?)?';
  const TIMESTAMP = {
    className: 'number',
    begin: '\\b' + DATE_RE + TIME_RE + FRACTION_RE + ZONE_RE + '\\b'
  };

  const VALUE_CONTAINER = {
    end: ',',
    endsWithParent: true,
    excludeEnd: true,
    keywords: LITERALS,
    relevance: 0
  };
  const OBJECT = {
    begin: /\{/,
    end: /\}/,
    contains: [ VALUE_CONTAINER ],
    illegal: '\\n',
    relevance: 0
  };
  const ARRAY = {
    begin: '\\[',
    end: '\\]',
    contains: [ VALUE_CONTAINER ],
    illegal: '\\n',
    relevance: 0
  };

  const MODES = [
    KEY,
    {
      className: 'meta',
      begin: '^---\\s*$',
      relevance: 10
    },
    { // multi line string
      // Blocks start with a | or > followed by a newline
      //
      // Indentation of subsequent lines must be the same to
      // be considered part of the block
      className: 'string',
      begin: '[\\|>]([1-9]?[+-])?[ ]*\\n( +)[^ ][^\\n]*\\n(\\2[^\\n]+\\n?)*'
    },
    { // Ruby/Rails erb
      begin: '<%[%=-]?',
      end: '[%-]?%>',
      subLanguage: 'ruby',
      excludeBegin: true,
      excludeEnd: true,
      relevance: 0
    },
    { // named tags
      className: 'type',
      begin: '!\\w+!' + URI_CHARACTERS
    },
    // https://yaml.org/spec/1.2/spec.html#id2784064
    { // verbatim tags
      className: 'type',
      begin: '!<' + URI_CHARACTERS + ">"
    },
    { // primary tags
      className: 'type',
      begin: '!' + URI_CHARACTERS
    },
    { // secondary tags
      className: 'type',
      begin: '!!' + URI_CHARACTERS
    },
    { // fragment id &ref
      className: 'meta',
      begin: '&' + hljs.UNDERSCORE_IDENT_RE + '$'
    },
    { // fragment reference *ref
      className: 'meta',
      begin: '\\*' + hljs.UNDERSCORE_IDENT_RE + '$'
    },
    { // array listing
      className: 'bullet',
      // TODO: remove |$ hack when we have proper look-ahead support
      begin: '-(?=[ ]|$)',
      relevance: 0
    },
    hljs.HASH_COMMENT_MODE,
    {
      beginKeywords: LITERALS,
      keywords: { literal: LITERALS }
    },
    TIMESTAMP,
    // numbers are any valid C-style number that
    // sit isolated from other words
    {
      className: 'number',
      begin: hljs.C_NUMBER_RE + '\\b',
      relevance: 0
    },
    OBJECT,
    ARRAY,
    SINGLE_QUOTE_STRING,
    STRING
  ];

  const VALUE_MODES = [ ...MODES ];
  VALUE_MODES.pop();
  VALUE_MODES.push(CONTAINER_STRING);
  VALUE_CONTAINER.contains = VALUE_MODES;

  return {
    name: 'YAML',
    case_insensitive: true,
    aliases: [ 'yml' ],
    contains: MODES
  };
}

module.exports = yaml;

    },
    "./languages/diff": function (module, exports, require) {
/*
Language: Diff
Description: Unified and context diff
Author: Vasily Polovnyov <vast@whiteants.net>
Website: https://www.gnu.org/software/diffutils/
Category: common
*/

/** @type LanguageFn */
function diff(hljs) {
  const regex = hljs.regex;
  return {
    name: 'Diff',
    aliases: [ 'patch' ],
    contains: [
      {
        className: 'meta',
        relevance: 10,
        match: regex.either(
          /^@@ +-\d+,\d+ +\+\d+,\d+ +@@/, // @@ -1,2 +1,2 @@
          /^@@ +-\d+ +\+\d+,\d+ +@@/,     // @@ -1 +1,2 @@
          /^@@ +-\d+,\d+ +\+\d+ +@@/,     // @@ -1,2 +1 @@
          /^@@ +-\d+ +\+\d+ +@@/,         // @@ -1 +1 @@
          /^\*\*\* +\d+,\d+ +\*\*\*\*$/,
          /^--- +\d+,\d+ +----$/
        )
      },
      {
        className: 'comment',
        variants: [
          {
            begin: regex.either(
              /Index: /,
              /^index/,
              /={3,}/,
              /^-{3}/,
              /^\*{3} /,
              /^\+{3}/,
              /^diff --git/
            ),
            end: /$/
          },
          { match: /^\*{15}$/ }
        ]
      },
      {
        className: 'addition',
        begin: /^\+/,
        end: /$/
      },
      {
        className: 'deletion',
        begin: /^-/,
        end: /$/
      },
      {
        className: 'addition',
        begin: /^!/,
        end: /$/
      }
    ]
  };
}

module.exports = diff;

    },
    "./languages/ini": function (module, exports, require) {
/*
Language: TOML, also INI
Description: TOML aims to be a minimal configuration file format that's easy to read due to obvious semantics.
Contributors: Guillaume Gomez <guillaume1.gomez@gmail.com>
Category: common, config
Website: https://github.com/toml-lang/toml
*/

function ini(hljs) {
  const regex = hljs.regex;
  const NUMBERS = {
    className: 'number',
    relevance: 0,
    variants: [
      { begin: /([+-]+)?[\d]+_[\d_]+/ },
      { begin: hljs.NUMBER_RE }
    ]
  };
  const COMMENTS = hljs.COMMENT();
  COMMENTS.variants = [
    {
      begin: /;/,
      end: /$/
    },
    {
      begin: /#/,
      end: /$/
    }
  ];
  const VARIABLES = {
    className: 'variable',
    variants: [
      { begin: /\$[\w\d"][\w\d_]*/ },
      { begin: /\$\{(.*?)\}/ }
    ]
  };
  const LITERALS = {
    className: 'literal',
    begin: /\bon|off|true|false|yes|no\b/
  };
  const STRINGS = {
    className: "string",
    contains: [ hljs.BACKSLASH_ESCAPE ],
    variants: [
      {
        begin: "'''",
        end: "'''",
        relevance: 10
      },
      {
        begin: '"""',
        end: '"""',
        relevance: 10
      },
      {
        begin: '"',
        end: '"'
      },
      {
        begin: "'",
        end: "'"
      }
    ]
  };
  const ARRAY = {
    begin: /\[/,
    end: /\]/,
    contains: [
      COMMENTS,
      LITERALS,
      VARIABLES,
      STRINGS,
      NUMBERS,
      'self'
    ],
    relevance: 0
  };

  const BARE_KEY = /[A-Za-z0-9_-]+/;
  const QUOTED_KEY_DOUBLE_QUOTE = /"(\\"|[^"])*"/;
  const QUOTED_KEY_SINGLE_QUOTE = /'[^']*'/;
  const ANY_KEY = regex.either(
    BARE_KEY, QUOTED_KEY_DOUBLE_QUOTE, QUOTED_KEY_SINGLE_QUOTE
  );
  const DOTTED_KEY = regex.concat(
    ANY_KEY, '(\\s*\\.\\s*', ANY_KEY, ')*',
    regex.lookahead(/\s*=\s*[^#\s]/)
  );

  return {
    name: 'TOML, also INI',
    aliases: [ 'toml' ],
    case_insensitive: true,
    illegal: /\S/,
    contains: [
      COMMENTS,
      {
        className: 'section',
        begin: /\[+/,
        end: /\]+/
      },
      {
        begin: DOTTED_KEY,
        className: 'attr',
        starts: {
          end: /$/,
          contains: [
            COMMENTS,
            ARRAY,
            LITERALS,
            VARIABLES,
            STRINGS,
            NUMBERS
          ]
        }
      }
    ]
  };
}

module.exports = ini;

    },
    "./languages/powershell": function (module, exports, require) {
/*
Language: PowerShell
Description: PowerShell is a task-based command-line shell and scripting language built on .NET.
Author: David Mohundro <david@mohundro.com>
Contributors: Nicholas Blumhardt <nblumhardt@nblumhardt.com>, Victor Zhou <OiCMudkips@users.noreply.github.com>, Nicolas Le Gall <contact@nlegall.fr>
Website: https://docs.microsoft.com/en-us/powershell/
Category: scripting
*/

function powershell(hljs) {
  const TYPES = [
    "string",
    "char",
    "byte",
    "int",
    "long",
    "bool",
    "decimal",
    "single",
    "double",
    "DateTime",
    "xml",
    "array",
    "hashtable",
    "void"
  ];

  // https://docs.microsoft.com/en-us/powershell/scripting/developer/cmdlet/approved-verbs-for-windows-powershell-commands
  const VALID_VERBS =
    'Add|Clear|Close|Copy|Enter|Exit|Find|Format|Get|Hide|Join|Lock|'
    + 'Move|New|Open|Optimize|Pop|Push|Redo|Remove|Rename|Reset|Resize|'
    + 'Search|Select|Set|Show|Skip|Split|Step|Switch|Undo|Unlock|'
    + 'Watch|Backup|Checkpoint|Compare|Compress|Convert|ConvertFrom|'
    + 'ConvertTo|Dismount|Edit|Expand|Export|Group|Import|Initialize|'
    + 'Limit|Merge|Mount|Out|Publish|Restore|Save|Sync|Unpublish|Update|'
    + 'Approve|Assert|Build|Complete|Confirm|Deny|Deploy|Disable|Enable|Install|Invoke|'
    + 'Register|Request|Restart|Resume|Start|Stop|Submit|Suspend|Uninstall|'
    + 'Unregister|Wait|Debug|Measure|Ping|Repair|Resolve|Test|Trace|Connect|'
    + 'Disconnect|Read|Receive|Send|Write|Block|Grant|Protect|Revoke|Unblock|'
    + 'Unprotect|Use|ForEach|Sort|Tee|Where';

  const COMPARISON_OPERATORS =
    '-and|-as|-band|-bnot|-bor|-bxor|-casesensitive|-ccontains|-ceq|-cge|-cgt|'
    + '-cle|-clike|-clt|-cmatch|-cne|-cnotcontains|-cnotlike|-cnotmatch|-contains|'
    + '-creplace|-csplit|-eq|-exact|-f|-file|-ge|-gt|-icontains|-ieq|-ige|-igt|'
    + '-ile|-ilike|-ilt|-imatch|-in|-ine|-inotcontains|-inotlike|-inotmatch|'
    + '-ireplace|-is|-isnot|-isplit|-join|-le|-like|-lt|-match|-ne|-not|'
    + '-notcontains|-notin|-notlike|-notmatch|-or|-regex|-replace|-shl|-shr|'
    + '-split|-wildcard|-xor';

  const KEYWORDS = {
    $pattern: /-?[A-z\.\-]+\b/,
    keyword:
      'if else foreach return do while until elseif begin for trap data dynamicparam '
      + 'end break throw param continue finally in switch exit filter try process catch '
      + 'hidden static parameter',
    // "echo" relevance has been set to 0 to avoid auto-detect conflicts with shell transcripts
    built_in:
      'ac asnp cat cd CFS chdir clc clear clhy cli clp cls clv cnsn compare copy cp '
      + 'cpi cpp curl cvpa dbp del diff dir dnsn ebp echo|0 epal epcsv epsn erase etsn exsn fc fhx '
      + 'fl ft fw gal gbp gc gcb gci gcm gcs gdr gerr ghy gi gin gjb gl gm gmo gp gps gpv group '
      + 'gsn gsnp gsv gtz gu gv gwmi h history icm iex ihy ii ipal ipcsv ipmo ipsn irm ise iwmi '
      + 'iwr kill lp ls man md measure mi mount move mp mv nal ndr ni nmo npssc nsn nv ogv oh '
      + 'popd ps pushd pwd r rbp rcjb rcsn rd rdr ren ri rjb rm rmdir rmo rni rnp rp rsn rsnp '
      + 'rujb rv rvpa rwmi sajb sal saps sasv sbp sc scb select set shcm si sl sleep sls sort sp '
      + 'spjb spps spsv start stz sujb sv swmi tee trcm type wget where wjb write'
    // TODO: 'validate[A-Z]+' can't work in keywords
  };

  const TITLE_NAME_RE = /\w[\w\d]*((-)[\w\d]+)*/;

  const BACKTICK_ESCAPE = {
    begin: '`[\\s\\S]',
    relevance: 0
  };

  const VAR = {
    className: 'variable',
    variants: [
      { begin: /\$\B/ },
      {
        className: 'keyword',
        begin: /\$this/
      },
      { begin: /\$[\w\d][\w\d_:]*/ }
    ]
  };

  const LITERAL = {
    className: 'literal',
    begin: /\$(null|true|false)\b/
  };

  const QUOTE_STRING = {
    className: "string",
    variants: [
      {
        begin: /"/,
        end: /"/
      },
      {
        begin: /@"/,
        end: /^"@/
      }
    ],
    contains: [
      BACKTICK_ESCAPE,
      VAR,
      {
        className: 'variable',
        begin: /\$[A-z]/,
        end: /[^A-z]/
      }
    ]
  };

  const APOS_STRING = {
    className: 'string',
    variants: [
      {
        begin: /'/,
        end: /'/
      },
      {
        begin: /@'/,
        end: /^'@/
      }
    ]
  };

  const PS_HELPTAGS = {
    className: "doctag",
    variants: [
      /* no paramater help tags */
      { begin: /\.(synopsis|description|example|inputs|outputs|notes|link|component|role|functionality)/ },
      /* one parameter help tags */
      { begin: /\.(parameter|forwardhelptargetname|forwardhelpcategory|remotehelprunspace|externalhelp)\s+\S+/ }
    ]
  };

  const PS_COMMENT = hljs.inherit(
    hljs.COMMENT(null, null),
    {
      variants: [
        /* single-line comment */
        {
          begin: /#/,
          end: /$/
        },
        /* multi-line comment */
        {
          begin: /<#/,
          end: /#>/
        }
      ],
      contains: [ PS_HELPTAGS ]
    }
  );

  const CMDLETS = {
    className: 'built_in',
    variants: [ { begin: '('.concat(VALID_VERBS, ')+(-)[\\w\\d]+') } ]
  };

  const PS_CLASS = {
    className: 'class',
    beginKeywords: 'class enum',
    end: /\s*[{]/,
    excludeEnd: true,
    relevance: 0,
    contains: [ hljs.TITLE_MODE ]
  };

  const PS_FUNCTION = {
    className: 'function',
    begin: /function\s+/,
    end: /\s*\{|$/,
    excludeEnd: true,
    returnBegin: true,
    relevance: 0,
    contains: [
      {
        begin: "function",
        relevance: 0,
        className: "keyword"
      },
      {
        className: "title",
        begin: TITLE_NAME_RE,
        relevance: 0
      },
      {
        begin: /\(/,
        end: /\)/,
        className: "params",
        relevance: 0,
        contains: [ VAR ]
      }
      // CMDLETS
    ]
  };

  // Using statment, plus type, plus assembly name.
  const PS_USING = {
    begin: /using\s/,
    end: /$/,
    returnBegin: true,
    contains: [
      QUOTE_STRING,
      APOS_STRING,
      {
        className: 'keyword',
        begin: /(using|assembly|command|module|namespace|type)/
      }
    ]
  };

  // Comperison operators & function named parameters.
  const PS_ARGUMENTS = { variants: [
    // PS literals are pretty verbose so it's a good idea to accent them a bit.
    {
      className: 'operator',
      begin: '('.concat(COMPARISON_OPERATORS, ')\\b')
    },
    {
      className: 'literal',
      begin: /(-){1,2}[\w\d-]+/,
      relevance: 0
    }
  ] };

  const HASH_SIGNS = {
    className: 'selector-tag',
    begin: /@\B/,
    relevance: 0
  };

  // It's a very general rule so I'll narrow it a bit with some strict boundaries
  // to avoid any possible false-positive collisions!
  const PS_METHODS = {
    className: 'function',
    begin: /\[.*\]\s*[\w]+[ ]??\(/,
    end: /$/,
    returnBegin: true,
    relevance: 0,
    contains: [
      {
        className: 'keyword',
        begin: '('.concat(
          KEYWORDS.keyword.toString().replace(/\s/g, '|'
          ), ')\\b'),
        endsParent: true,
        relevance: 0
      },
      hljs.inherit(hljs.TITLE_MODE, { endsParent: true })
    ]
  };

  const GENTLEMANS_SET = [
    // STATIC_MEMBER,
    PS_METHODS,
    PS_COMMENT,
    BACKTICK_ESCAPE,
    hljs.NUMBER_MODE,
    QUOTE_STRING,
    APOS_STRING,
    // PS_NEW_OBJECT_TYPE,
    CMDLETS,
    VAR,
    LITERAL,
    HASH_SIGNS
  ];

  const PS_TYPE = {
    begin: /\[/,
    end: /\]/,
    excludeBegin: true,
    excludeEnd: true,
    relevance: 0,
    contains: [].concat(
      'self',
      GENTLEMANS_SET,
      {
        begin: "(" + TYPES.join("|") + ")",
        className: "built_in",
        relevance: 0
      },
      {
        className: 'type',
        begin: /[\.\w\d]+/,
        relevance: 0
      }
    )
  };

  PS_METHODS.contains.unshift(PS_TYPE);

  return {
    name: 'PowerShell',
    aliases: [
      "pwsh",
      "ps",
      "ps1"
    ],
    case_insensitive: true,
    keywords: KEYWORDS,
    contains: GENTLEMANS_SET.concat(
      PS_CLASS,
      PS_FUNCTION,
      PS_USING,
      PS_ARGUMENTS,
      PS_TYPE
    )
  };
}

module.exports = powershell;

    },
    "./core": function (module, exports, require) {
/* eslint-disable no-multi-assign */

function deepFreeze(obj) {
  if (obj instanceof Map) {
    obj.clear =
      obj.delete =
      obj.set =
        function () {
          throw new Error('map is read-only');
        };
  } else if (obj instanceof Set) {
    obj.add =
      obj.clear =
      obj.delete =
        function () {
          throw new Error('set is read-only');
        };
  }

  // Freeze self
  Object.freeze(obj);

  Object.getOwnPropertyNames(obj).forEach((name) => {
    const prop = obj[name];
    const type = typeof prop;

    // Freeze prop if it is an object or function and also not already frozen
    if ((type === 'object' || type === 'function') && !Object.isFrozen(prop)) {
      deepFreeze(prop);
    }
  });

  return obj;
}

/** @typedef {import('highlight.js').CallbackResponse} CallbackResponse */
/** @typedef {import('highlight.js').CompiledMode} CompiledMode */
/** @implements CallbackResponse */

class Response {
  /**
   * @param {CompiledMode} mode
   */
  constructor(mode) {
    // eslint-disable-next-line no-undefined
    if (mode.data === undefined) mode.data = {};

    this.data = mode.data;
    this.isMatchIgnored = false;
  }

  ignoreMatch() {
    this.isMatchIgnored = true;
  }
}

/**
 * @param {string} value
 * @returns {string}
 */
function escapeHTML(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/**
 * performs a shallow merge of multiple objects into one
 *
 * @template T
 * @param {T} original
 * @param {Record<string,any>[]} objects
 * @returns {T} a single new object
 */
function inherit$1(original, ...objects) {
  /** @type Record<string,any> */
  const result = Object.create(null);

  for (const key in original) {
    result[key] = original[key];
  }
  objects.forEach(function(obj) {
    for (const key in obj) {
      result[key] = obj[key];
    }
  });
  return /** @type {T} */ (result);
}

/**
 * @typedef {object} Renderer
 * @property {(text: string) => void} addText
 * @property {(node: Node) => void} openNode
 * @property {(node: Node) => void} closeNode
 * @property {() => string} value
 */

/** @typedef {{scope?: string, language?: string, sublanguage?: boolean}} Node */
/** @typedef {{walk: (r: Renderer) => void}} Tree */
/** */

const SPAN_CLOSE = '</span>';

/**
 * Determines if a node needs to be wrapped in <span>
 *
 * @param {Node} node */
const emitsWrappingTags = (node) => {
  // rarely we can have a sublanguage where language is undefined
  // TODO: track down why
  return !!node.scope;
};

/**
 *
 * @param {string} name
 * @param {{prefix:string}} options
 */
const scopeToCSSClass = (name, { prefix }) => {
  // sub-language
  if (name.startsWith("language:")) {
    return name.replace("language:", "language-");
  }
  // tiered scope: comment.line
  if (name.includes(".")) {
    const pieces = name.split(".");
    return [
      `${prefix}${pieces.shift()}`,
      ...(pieces.map((x, i) => `${x}${"_".repeat(i + 1)}`))
    ].join(" ");
  }
  // simple scope
  return `${prefix}${name}`;
};

/** @type {Renderer} */
class HTMLRenderer {
  /**
   * Creates a new HTMLRenderer
   *
   * @param {Tree} parseTree - the parse tree (must support `walk` API)
   * @param {{classPrefix: string}} options
   */
  constructor(parseTree, options) {
    this.buffer = "";
    this.classPrefix = options.classPrefix;
    parseTree.walk(this);
  }

  /**
   * Adds texts to the output stream
   *
   * @param {string} text */
  addText(text) {
    this.buffer += escapeHTML(text);
  }

  /**
   * Adds a node open to the output stream (if needed)
   *
   * @param {Node} node */
  openNode(node) {
    if (!emitsWrappingTags(node)) return;

    const className = scopeToCSSClass(node.scope,
      { prefix: this.classPrefix });
    this.span(className);
  }

  /**
   * Adds a node close to the output stream (if needed)
   *
   * @param {Node} node */
  closeNode(node) {
    if (!emitsWrappingTags(node)) return;

    this.buffer += SPAN_CLOSE;
  }

  /**
   * returns the accumulated buffer
  */
  value() {
    return this.buffer;
  }

  // helpers

  /**
   * Builds a span element
   *
   * @param {string} className */
  span(className) {
    this.buffer += `<span class="${className}">`;
  }
}

/** @typedef {{scope?: string, language?: string, children: Node[]} | string} Node */
/** @typedef {{scope?: string, language?: string, children: Node[]} } DataNode */
/** @typedef {import('highlight.js').Emitter} Emitter */
/**  */

/** @returns {DataNode} */
const newNode = (opts = {}) => {
  /** @type DataNode */
  const result = { children: [] };
  Object.assign(result, opts);
  return result;
};

class TokenTree {
  constructor() {
    /** @type DataNode */
    this.rootNode = newNode();
    this.stack = [this.rootNode];
  }

  get top() {
    return this.stack[this.stack.length - 1];
  }

  get root() { return this.rootNode; }

  /** @param {Node} node */
  add(node) {
    this.top.children.push(node);
  }

  /** @param {string} scope */
  openNode(scope) {
    /** @type Node */
    const node = newNode({ scope });
    this.add(node);
    this.stack.push(node);
  }

  closeNode() {
    if (this.stack.length > 1) {
      return this.stack.pop();
    }
    // eslint-disable-next-line no-undefined
    return undefined;
  }

  closeAllNodes() {
    while (this.closeNode());
  }

  toJSON() {
    return JSON.stringify(this.rootNode, null, 4);
  }

  /**
   * @typedef { import("./html_renderer").Renderer } Renderer
   * @param {Renderer} builder
   */
  walk(builder) {
    // this does not
    return this.constructor._walk(builder, this.rootNode);
    // this works
    // return TokenTree._walk(builder, this.rootNode);
  }

  /**
   * @param {Renderer} builder
   * @param {Node} node
   */
  static _walk(builder, node) {
    if (typeof node === "string") {
      builder.addText(node);
    } else if (node.children) {
      builder.openNode(node);
      node.children.forEach((child) => this._walk(builder, child));
      builder.closeNode(node);
    }
    return builder;
  }

  /**
   * @param {Node} node
   */
  static _collapse(node) {
    if (typeof node === "string") return;
    if (!node.children) return;

    if (node.children.every(el => typeof el === "string")) {
      // node.text = node.children.join("");
      // delete node.children;
      node.children = [node.children.join("")];
    } else {
      node.children.forEach((child) => {
        TokenTree._collapse(child);
      });
    }
  }
}

/**
  Currently this is all private API, but this is the minimal API necessary
  that an Emitter must implement to fully support the parser.

  Minimal interface:

  - addText(text)
  - __addSublanguage(emitter, subLanguageName)
  - startScope(scope)
  - endScope()
  - finalize()
  - toHTML()

*/

/**
 * @implements {Emitter}
 */
class TokenTreeEmitter extends TokenTree {
  /**
   * @param {*} options
   */
  constructor(options) {
    super();
    this.options = options;
  }

  /**
   * @param {string} text
   */
  addText(text) {
    if (text === "") { return; }

    this.add(text);
  }

  /** @param {string} scope */
  startScope(scope) {
    this.openNode(scope);
  }

  endScope() {
    this.closeNode();
  }

  /**
   * @param {Emitter & {root: DataNode}} emitter
   * @param {string} name
   */
  __addSublanguage(emitter, name) {
    /** @type DataNode */
    const node = emitter.root;
    if (name) node.scope = `language:${name}`;

    this.add(node);
  }

  toHTML() {
    const renderer = new HTMLRenderer(this, this.options);
    return renderer.value();
  }

  finalize() {
    this.closeAllNodes();
    return true;
  }
}

/**
 * @param {string} value
 * @returns {RegExp}
 * */

/**
 * @param {RegExp | string } re
 * @returns {string}
 */
function source(re) {
  if (!re) return null;
  if (typeof re === "string") return re;

  return re.source;
}

/**
 * @param {RegExp | string } re
 * @returns {string}
 */
function lookahead(re) {
  return concat('(?=', re, ')');
}

/**
 * @param {RegExp | string } re
 * @returns {string}
 */
function anyNumberOfTimes(re) {
  return concat('(?:', re, ')*');
}

/**
 * @param {RegExp | string } re
 * @returns {string}
 */
function optional(re) {
  return concat('(?:', re, ')?');
}

/**
 * @param {...(RegExp | string) } args
 * @returns {string}
 */
function concat(...args) {
  const joined = args.map((x) => source(x)).join("");
  return joined;
}

/**
 * @param { Array<string | RegExp | Object> } args
 * @returns {object}
 */
function stripOptionsFromArgs(args) {
  const opts = args[args.length - 1];

  if (typeof opts === 'object' && opts.constructor === Object) {
    args.splice(args.length - 1, 1);
    return opts;
  } else {
    return {};
  }
}

/** @typedef { {capture?: boolean} } RegexEitherOptions */

/**
 * Any of the passed expresssions may match
 *
 * Creates a huge this | this | that | that match
 * @param {(RegExp | string)[] | [...(RegExp | string)[], RegexEitherOptions]} args
 * @returns {string}
 */
function either(...args) {
  /** @type { object & {capture?: boolean} }  */
  const opts = stripOptionsFromArgs(args);
  const joined = '('
    + (opts.capture ? "" : "?:")
    + args.map((x) => source(x)).join("|") + ")";
  return joined;
}

/**
 * @param {RegExp | string} re
 * @returns {number}
 */
function countMatchGroups(re) {
  return (new RegExp(re.toString() + '|')).exec('').length - 1;
}

/**
 * Does lexeme start with a regular expression match at the beginning
 * @param {RegExp} re
 * @param {string} lexeme
 */
function startsWith(re, lexeme) {
  const match = re && re.exec(lexeme);
  return match && match.index === 0;
}

// BACKREF_RE matches an open parenthesis or backreference. To avoid an
// incorrect parse, it also matches the constructs where the meaning of
// parentheses, escapes, or capture counting changes.
const BACKREF_RE = new RegExp(either(
  /\[(?:[^\\\]]|\\.)*\]/, // a character class, inside which ( and \ lose their meaning
  /\(\?<(?![=!])[^>]+>/, // a named capture group `(?<name>` (not a lookbehind `(?<=` / `(?<!`)
  /\(\?'[^']+'/, // a named capture group `(?'name'`
  /\(\??/, // an opening parenthesis, capturing or non-capturing / lookahead
  /\\([1-9][0-9]*)/, // a backreference like `\1`
  /\\./ // any other escape sequence
));

// **INTERNAL** Not intended for outside usage
// join logically computes regexps.join(separator), but fixes the
// backreferences so they continue to match.
// it also places each individual regular expression into it's own
// match group, keeping track of the sequencing of those match groups
// is currently an exercise for the caller. :-)
/**
 * @param {(string | RegExp)[]} regexps
 * @param {{joinWith: string}} opts
 * @returns {string}
 */
function _rewriteBackreferences(regexps, { joinWith }) {
  let numCaptures = 0;

  return regexps.map((regex) => {
    numCaptures += 1;
    const offset = numCaptures;
    let re = source(regex);
    let out = '';

    while (re.length > 0) {
      const match = BACKREF_RE.exec(re);
      if (!match) {
        out += re;
        break;
      }
      out += re.substring(0, match.index);
      re = re.substring(match.index + match[0].length);
      if (match[0][0] === '\\' && match[1]) {
        // Adjust the backreference.
        out += '\\' + String(Number(match[1]) + offset);
      } else {
        out += match[0];
        if (match[0] === '(' || /^\(\?[<']/.test(match[0])) {
          numCaptures++;
        }
      }
    }
    return out;
  }).map(re => `(${re})`).join(joinWith);
}

/** @typedef {import('highlight.js').Mode} Mode */
/** @typedef {import('highlight.js').ModeCallback} ModeCallback */

// Common regexps
const MATCH_NOTHING_RE = /\b\B/;
const IDENT_RE = '[a-zA-Z]\\w*';
const UNDERSCORE_IDENT_RE = '[a-zA-Z_]\\w*';
const NUMBER_RE = '\\b\\d+(\\.\\d+)?';
const C_NUMBER_RE = '(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)'; // 0x..., 0..., decimal, float
const BINARY_NUMBER_RE = '\\b(0b[01]+)'; // 0b...
const RE_STARTERS_RE = '!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~';

/**
* @param { Partial<Mode> & {binary?: string | RegExp} } opts
*/
const SHEBANG = (opts = {}) => {
  const beginShebang = /^#![ ]*\//;
  if (opts.binary) {
    opts.begin = concat(
      beginShebang,
      /.*\b/,
      opts.binary,
      /\b.*/);
  }
  return inherit$1({
    scope: 'meta',
    begin: beginShebang,
    end: /$/,
    relevance: 0,
    /** @type {ModeCallback} */
    "on:begin": (m, resp) => {
      if (m.index !== 0) resp.ignoreMatch();
    }
  }, opts);
};

// Common modes
const BACKSLASH_ESCAPE = {
  begin: '\\\\[\\s\\S]', relevance: 0
};
const APOS_STRING_MODE = {
  scope: 'string',
  begin: '\'',
  end: '\'',
  illegal: '\\n',
  contains: [BACKSLASH_ESCAPE]
};
const QUOTE_STRING_MODE = {
  scope: 'string',
  begin: '"',
  end: '"',
  illegal: '\\n',
  contains: [BACKSLASH_ESCAPE]
};
const PHRASAL_WORDS_MODE = {
  begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
};
/**
 * Creates a comment mode
 *
 * @param {string | RegExp} begin
 * @param {string | RegExp} end
 * @param {Mode | {}} [modeOptions]
 * @returns {Partial<Mode>}
 */
const COMMENT = function(begin, end, modeOptions = {}) {
  const mode = inherit$1(
    {
      scope: 'comment',
      begin,
      end,
      contains: []
    },
    modeOptions
  );
  mode.contains.push({
    scope: 'doctag',
    // hack to avoid the space from being included. the space is necessary to
    // match here to prevent the plain text rule below from gobbling up doctags
    begin: '[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)',
    end: /(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,
    excludeBegin: true,
    relevance: 0
  });
  const ENGLISH_WORD = either(
    // list of common 1 and 2 letter words in English
    "I",
    "a",
    "is",
    "so",
    "us",
    "to",
    "at",
    "if",
    "in",
    "it",
    "on",
    // note: this is not an exhaustive list of contractions, just popular ones
    /[A-Za-z]+['](d|ve|re|ll|t|s|n)/, // contractions - can't we'd they're let's, etc
    /[A-Za-z]+[-][a-z]+/, // `no-way`, etc.
    /[A-Za-z][a-z]{2,}/ // allow capitalized words at beginning of sentences
  );
  // looking like plain text, more likely to be a comment
  mode.contains.push(
    {
      // TODO: how to include ", (, ) without breaking grammars that use these for
      // comment delimiters?
      // begin: /[ ]+([()"]?([A-Za-z'-]{3,}|is|a|I|so|us|[tT][oO]|at|if|in|it|on)[.]?[()":]?([.][ ]|[ ]|\))){3}/
      // ---

      // this tries to find sequences of 3 english words in a row (without any
      // "programming" type syntax) this gives us a strong signal that we've
      // TRULY found a comment - vs perhaps scanning with the wrong language.
      // It's possible to find something that LOOKS like the start of the
      // comment - but then if there is no readable text - good chance it is a
      // false match and not a comment.
      //
      // for a visual example please see:
      // https://github.com/highlightjs/highlight.js/issues/2827

      begin: concat(
        /[ ]+/, // necessary to prevent us gobbling up doctags like /* @author Bob Mcgill */
        '(',
        ENGLISH_WORD,
        /[.]?[:]?([.][ ]|[ ])/,
        '){3}') // look for 3 words in a row
    }
  );
  return mode;
};
const C_LINE_COMMENT_MODE = COMMENT('//', '$');
const C_BLOCK_COMMENT_MODE = COMMENT('/\\*', '\\*/');
const HASH_COMMENT_MODE = COMMENT('#', '$');
const NUMBER_MODE = {
  scope: 'number',
  begin: NUMBER_RE,
  relevance: 0
};
const C_NUMBER_MODE = {
  scope: 'number',
  begin: C_NUMBER_RE,
  relevance: 0
};
const BINARY_NUMBER_MODE = {
  scope: 'number',
  begin: BINARY_NUMBER_RE,
  relevance: 0
};
const REGEXP_MODE = {
  scope: "regexp",
  begin: /\/(?=[^/\n]*\/)/,
  end: /\/[gimuy]*/,
  contains: [
    BACKSLASH_ESCAPE,
    {
      begin: /\[/,
      end: /\]/,
      relevance: 0,
      contains: [BACKSLASH_ESCAPE]
    }
  ]
};
const TITLE_MODE = {
  scope: 'title',
  begin: IDENT_RE,
  relevance: 0
};
const UNDERSCORE_TITLE_MODE = {
  scope: 'title',
  begin: UNDERSCORE_IDENT_RE,
  relevance: 0
};
const METHOD_GUARD = {
  // excludes method names from keyword processing
  begin: '\\.\\s*' + UNDERSCORE_IDENT_RE,
  relevance: 0
};

/**
 * Adds end same as begin mechanics to a mode
 *
 * Your mode must include at least a single () match group as that first match
 * group is what is used for comparison
 * @param {Partial<Mode>} mode
 */
const END_SAME_AS_BEGIN = function(mode) {
  return Object.assign(mode,
    {
      /** @type {ModeCallback} */
      'on:begin': (m, resp) => { resp.data._beginMatch = m[1]; },
      /** @type {ModeCallback} */
      'on:end': (m, resp) => { if (resp.data._beginMatch !== m[1]) resp.ignoreMatch(); }
    });
};

var MODES = /*#__PURE__*/Object.freeze({
  __proto__: null,
  APOS_STRING_MODE: APOS_STRING_MODE,
  BACKSLASH_ESCAPE: BACKSLASH_ESCAPE,
  BINARY_NUMBER_MODE: BINARY_NUMBER_MODE,
  BINARY_NUMBER_RE: BINARY_NUMBER_RE,
  COMMENT: COMMENT,
  C_BLOCK_COMMENT_MODE: C_BLOCK_COMMENT_MODE,
  C_LINE_COMMENT_MODE: C_LINE_COMMENT_MODE,
  C_NUMBER_MODE: C_NUMBER_MODE,
  C_NUMBER_RE: C_NUMBER_RE,
  END_SAME_AS_BEGIN: END_SAME_AS_BEGIN,
  HASH_COMMENT_MODE: HASH_COMMENT_MODE,
  IDENT_RE: IDENT_RE,
  MATCH_NOTHING_RE: MATCH_NOTHING_RE,
  METHOD_GUARD: METHOD_GUARD,
  NUMBER_MODE: NUMBER_MODE,
  NUMBER_RE: NUMBER_RE,
  PHRASAL_WORDS_MODE: PHRASAL_WORDS_MODE,
  QUOTE_STRING_MODE: QUOTE_STRING_MODE,
  REGEXP_MODE: REGEXP_MODE,
  RE_STARTERS_RE: RE_STARTERS_RE,
  SHEBANG: SHEBANG,
  TITLE_MODE: TITLE_MODE,
  UNDERSCORE_IDENT_RE: UNDERSCORE_IDENT_RE,
  UNDERSCORE_TITLE_MODE: UNDERSCORE_TITLE_MODE
});

/**
@typedef {import('highlight.js').CallbackResponse} CallbackResponse
@typedef {import('highlight.js').CompilerExt} CompilerExt
*/

// Grammar extensions / plugins
// See: https://github.com/highlightjs/highlight.js/issues/2833

// Grammar extensions allow "syntactic sugar" to be added to the grammar modes
// without requiring any underlying changes to the compiler internals.

// `compileMatch` being the perfect small example of now allowing a grammar
// author to write `match` when they desire to match a single expression rather
// than being forced to use `begin`.  The extension then just moves `match` into
// `begin` when it runs.  Ie, no features have been added, but we've just made
// the experience of writing (and reading grammars) a little bit nicer.

// ------

// TODO: We need negative look-behind support to do this properly
/**
 * Skip a match if it has a preceding dot
 *
 * This is used for `beginKeywords` to prevent matching expressions such as
 * `bob.keyword.do()`. The mode compiler automatically wires this up as a
 * special _internal_ 'on:begin' callback for modes with `beginKeywords`
 * @param {RegExpMatchArray} match
 * @param {CallbackResponse} response
 */
function skipIfHasPrecedingDot(match, response) {
  const before = match.input[match.index - 1];
  if (before === ".") {
    response.ignoreMatch();
  }
}

/**
 *
 * @type {CompilerExt}
 */
function scopeClassName(mode, _parent) {
  // eslint-disable-next-line no-undefined
  if (mode.className !== undefined) {
    mode.scope = mode.className;
    delete mode.className;
  }
}

/**
 * `beginKeywords` syntactic sugar
 * @type {CompilerExt}
 */
function beginKeywords(mode, parent) {
  if (!parent) return;
  if (!mode.beginKeywords) return;

  // for languages with keywords that include non-word characters checking for
  // a word boundary is not sufficient, so instead we check for a word boundary
  // or whitespace - this does no harm in any case since our keyword engine
  // doesn't allow spaces in keywords anyways and we still check for the boundary
  // first
  mode.begin = '\\b(' + mode.beginKeywords.split(' ').join('|') + ')(?!\\.)(?=\\b|\\s)';
  mode.__beforeBegin = skipIfHasPrecedingDot;
  mode.keywords = mode.keywords || mode.beginKeywords;
  delete mode.beginKeywords;

  // prevents double relevance, the keywords themselves provide
  // relevance, the mode doesn't need to double it
  // eslint-disable-next-line no-undefined
  if (mode.relevance === undefined) mode.relevance = 0;
}

/**
 * Allow `illegal` to contain an array of illegal values
 * @type {CompilerExt}
 */
function compileIllegal(mode, _parent) {
  if (!Array.isArray(mode.illegal)) return;

  mode.illegal = either(...mode.illegal);
}

/**
 * `match` to match a single expression for readability
 * @type {CompilerExt}
 */
function compileMatch(mode, _parent) {
  if (!mode.match) return;
  if (mode.begin || mode.end) throw new Error("begin & end are not supported with match");

  mode.begin = mode.match;
  delete mode.match;
}

/**
 * provides the default 1 relevance to all modes
 * @type {CompilerExt}
 */
function compileRelevance(mode, _parent) {
  // eslint-disable-next-line no-undefined
  if (mode.relevance === undefined) mode.relevance = 1;
}

// allow beforeMatch to act as a "qualifier" for the match
// the full match begin must be [beforeMatch][begin]
const beforeMatchExt = (mode, parent) => {
  if (!mode.beforeMatch) return;
  // starts conflicts with endsParent which we need to make sure the child
  // rule is not matched multiple times
  if (mode.starts) throw new Error("beforeMatch cannot be used with starts");

  const originalMode = Object.assign({}, mode);
  Object.keys(mode).forEach((key) => { delete mode[key]; });

  mode.keywords = originalMode.keywords;
  mode.begin = concat(originalMode.beforeMatch, lookahead(originalMode.begin));
  mode.starts = {
    relevance: 0,
    contains: [
      Object.assign(originalMode, { endsParent: true })
    ]
  };
  mode.relevance = 0;

  delete originalMode.beforeMatch;
};

// keywords that should have no default relevance value
const COMMON_KEYWORDS = [
  'of',
  'and',
  'for',
  'in',
  'not',
  'or',
  'if',
  'then',
  'parent', // common variable name
  'list', // common variable name
  'value' // common variable name
];

const DEFAULT_KEYWORD_SCOPE = "keyword";

/**
 * Given raw keywords from a language definition, compile them.
 *
 * @param {string | Record<string,string|string[]> | Array<string>} rawKeywords
 * @param {boolean} caseInsensitive
 */
function compileKeywords(rawKeywords, caseInsensitive, scopeName = DEFAULT_KEYWORD_SCOPE) {
  /** @type {import("highlight.js/private").KeywordDict} */
  const compiledKeywords = Object.create(null);

  // input can be a string of keywords, an array of keywords, or a object with
  // named keys representing scopeName (which can then point to a string or array)
  if (typeof rawKeywords === 'string') {
    compileList(scopeName, rawKeywords.split(" "));
  } else if (Array.isArray(rawKeywords)) {
    compileList(scopeName, rawKeywords);
  } else {
    Object.keys(rawKeywords).forEach(function(scopeName) {
      // collapse all our objects back into the parent object
      Object.assign(
        compiledKeywords,
        compileKeywords(rawKeywords[scopeName], caseInsensitive, scopeName)
      );
    });
  }
  return compiledKeywords;

  // ---

  /**
   * Compiles an individual list of keywords
   *
   * Ex: "for if when while|5"
   *
   * @param {string} scopeName
   * @param {Array<string>} keywordList
   */
  function compileList(scopeName, keywordList) {
    if (caseInsensitive) {
      keywordList = keywordList.map(x => x.toLowerCase());
    }
    keywordList.forEach(function(keyword) {
      const pair = keyword.split('|');
      compiledKeywords[pair[0]] = [scopeName, scoreForKeyword(pair[0], pair[1])];
    });
  }
}

/**
 * Returns the proper score for a given keyword
 *
 * Also takes into account comment keywords, which will be scored 0 UNLESS
 * another score has been manually assigned.
 * @param {string} keyword
 * @param {string} [providedScore]
 */
function scoreForKeyword(keyword, providedScore) {
  // manual scores always win over common keywords
  // so you can force a score of 1 if you really insist
  if (providedScore) {
    return Number(providedScore);
  }

  return commonKeyword(keyword) ? 0 : 1;
}

/**
 * Determines if a given keyword is common or not
 *
 * @param {string} keyword */
function commonKeyword(keyword) {
  return COMMON_KEYWORDS.includes(keyword.toLowerCase());
}

/*

For the reasoning behind this please see:
https://github.com/highlightjs/highlight.js/issues/2880#issuecomment-747275419

*/

/**
 * @type {Record<string, boolean>}
 */
const seenDeprecations = {};

/**
 * @param {string} message
 */
const error = (message) => {
  console.error(message);
};

/**
 * @param {string} message
 * @param {any} args
 */
const warn = (message, ...args) => {
  console.log(`WARN: ${message}`, ...args);
};

/**
 * @param {string} version
 * @param {string} message
 */
const deprecated = (version, message) => {
  if (seenDeprecations[`${version}/${message}`]) return;

  console.log(`Deprecated as of ${version}. ${message}`);
  seenDeprecations[`${version}/${message}`] = true;
};

/* eslint-disable no-throw-literal */

/**
@typedef {import('highlight.js').CompiledMode} CompiledMode
*/

const MultiClassError = new Error();

/**
 * Renumbers labeled scope names to account for additional inner match
 * groups that otherwise would break everything.
 *
 * Lets say we 3 match scopes:
 *
 *   { 1 => ..., 2 => ..., 3 => ... }
 *
 * So what we need is a clean match like this:
 *
 *   (a)(b)(c) => [ "a", "b", "c" ]
 *
 * But this falls apart with inner match groups:
 *
 * (a)(((b)))(c) => ["a", "b", "b", "b", "c" ]
 *
 * Our scopes are now "out of alignment" and we're repeating `b` 3 times.
 * What needs to happen is the numbers are remapped:
 *
 *   { 1 => ..., 2 => ..., 5 => ... }
 *
 * We also need to know that the ONLY groups that should be output
 * are 1, 2, and 5.  This function handles this behavior.
 *
 * @param {CompiledMode} mode
 * @param {Array<RegExp | string>} regexes
 * @param {{key: "beginScope"|"endScope"}} opts
 */
function remapScopeNames(mode, regexes, { key }) {
  let offset = 0;
  const scopeNames = mode[key];
  /** @type Record<number,boolean> */
  const emit = {};
  /** @type Record<number,string> */
  const positions = {};

  for (let i = 1; i <= regexes.length; i++) {
    positions[i + offset] = scopeNames[i];
    emit[i + offset] = true;
    offset += countMatchGroups(regexes[i - 1]);
  }
  // we use _emit to keep track of which match groups are "top-level" to avoid double
  // output from inside match groups
  mode[key] = positions;
  mode[key]._emit = emit;
  mode[key]._multi = true;
}

/**
 * @param {CompiledMode} mode
 */
function beginMultiClass(mode) {
  if (!Array.isArray(mode.begin)) return;

  if (mode.skip || mode.excludeBegin || mode.returnBegin) {
    error("skip, excludeBegin, returnBegin not compatible with beginScope: {}");
    throw MultiClassError;
  }

  if (typeof mode.beginScope !== "object" || mode.beginScope === null) {
    error("beginScope must be object");
    throw MultiClassError;
  }

  remapScopeNames(mode, mode.begin, { key: "beginScope" });
  mode.begin = _rewriteBackreferences(mode.begin, { joinWith: "" });
}

/**
 * @param {CompiledMode} mode
 */
function endMultiClass(mode) {
  if (!Array.isArray(mode.end)) return;

  if (mode.skip || mode.excludeEnd || mode.returnEnd) {
    error("skip, excludeEnd, returnEnd not compatible with endScope: {}");
    throw MultiClassError;
  }

  if (typeof mode.endScope !== "object" || mode.endScope === null) {
    error("endScope must be object");
    throw MultiClassError;
  }

  remapScopeNames(mode, mode.end, { key: "endScope" });
  mode.end = _rewriteBackreferences(mode.end, { joinWith: "" });
}

/**
 * this exists only to allow `scope: {}` to be used beside `match:`
 * Otherwise `beginScope` would necessary and that would look weird

  {
    match: [ /def/, /\w+/ ]
    scope: { 1: "keyword" , 2: "title" }
  }

 * @param {CompiledMode} mode
 */
function scopeSugar(mode) {
  if (mode.scope && typeof mode.scope === "object" && mode.scope !== null) {
    mode.beginScope = mode.scope;
    delete mode.scope;
  }
}

/**
 * @param {CompiledMode} mode
 */
function MultiClass(mode) {
  scopeSugar(mode);

  if (typeof mode.beginScope === "string") {
    mode.beginScope = { _wrap: mode.beginScope };
  }
  if (typeof mode.endScope === "string") {
    mode.endScope = { _wrap: mode.endScope };
  }

  beginMultiClass(mode);
  endMultiClass(mode);
}

/**
@typedef {import('highlight.js').Mode} Mode
@typedef {import('highlight.js').CompiledMode} CompiledMode
@typedef {import('highlight.js').Language} Language
@typedef {import('highlight.js').HLJSPlugin} HLJSPlugin
@typedef {import('highlight.js').CompiledLanguage} CompiledLanguage
*/

// compilation

/**
 * Compiles a language definition result
 *
 * Given the raw result of a language definition (Language), compiles this so
 * that it is ready for highlighting code.
 * @param {Language} language
 * @returns {CompiledLanguage}
 */
function compileLanguage(language) {
  /**
   * Builds a regex with the case sensitivity of the current language
   *
   * @param {RegExp | string} value
   * @param {boolean} [global]
   */
  function langRe(value, global) {
    return new RegExp(
      source(value),
      'm'
      + (language.case_insensitive ? 'i' : '')
      + (language.unicodeRegex ? 'u' : '')
      + (global ? 'g' : '')
    );
  }

  /**
    Stores multiple regular expressions and allows you to quickly search for
    them all in a string simultaneously - returning the first match.  It does
    this by creating a huge (a|b|c) regex - each individual item wrapped with ()
    and joined by `|` - using match groups to track position.  When a match is
    found checking which position in the array has content allows us to figure
    out which of the original regexes / match groups triggered the match.

    The match object itself (the result of `Regex.exec`) is returned but also
    enhanced by merging in any meta-data that was registered with the regex.
    This is how we keep track of which mode matched, and what type of rule
    (`illegal`, `begin`, end, etc).
  */
  class MultiRegex {
    constructor() {
      this.matchIndexes = {};
      // @ts-ignore
      this.regexes = [];
      this.matchAt = 1;
      this.position = 0;
    }

    // @ts-ignore
    addRule(re, opts) {
      opts.position = this.position++;
      // @ts-ignore
      this.matchIndexes[this.matchAt] = opts;
      this.regexes.push([opts, re]);
      this.matchAt += countMatchGroups(re) + 1;
    }

    compile() {
      if (this.regexes.length === 0) {
        // avoids the need to check length every time exec is called
        // @ts-ignore
        this.exec = () => null;
      }
      const terminators = this.regexes.map(el => el[1]);
      this.matcherRe = langRe(_rewriteBackreferences(terminators, { joinWith: '|' }), true);
      this.lastIndex = 0;
    }

    /** @param {string} s */
    exec(s) {
      this.matcherRe.lastIndex = this.lastIndex;
      const match = this.matcherRe.exec(s);
      if (!match) { return null; }

      // eslint-disable-next-line no-undefined
      const i = match.findIndex((el, i) => i > 0 && el !== undefined);
      // @ts-ignore
      const matchData = this.matchIndexes[i];
      // trim off any earlier non-relevant match groups (ie, the other regex
      // match groups that make up the multi-matcher)
      match.splice(0, i);

      return Object.assign(match, matchData);
    }
  }

  /*
    Created to solve the key deficiently with MultiRegex - there is no way to
    test for multiple matches at a single location.  Why would we need to do
    that?  In the future a more dynamic engine will allow certain matches to be
    ignored.  An example: if we matched say the 3rd regex in a large group but
    decided to ignore it - we'd need to started testing again at the 4th
    regex... but MultiRegex itself gives us no real way to do that.

    So what this class creates MultiRegexs on the fly for whatever search
    position they are needed.

    NOTE: These additional MultiRegex objects are created dynamically.  For most
    grammars most of the time we will never actually need anything more than the
    first MultiRegex - so this shouldn't have too much overhead.

    Say this is our search group, and we match regex3, but wish to ignore it.

      regex1 | regex2 | regex3 | regex4 | regex5    ' ie, startAt = 0

    What we need is a new MultiRegex that only includes the remaining
    possibilities:

      regex4 | regex5                               ' ie, startAt = 3

    This class wraps all that complexity up in a simple API... `startAt` decides
    where in the array of expressions to start doing the matching. It
    auto-increments, so if a match is found at position 2, then startAt will be
    set to 3.  If the end is reached startAt will return to 0.

    MOST of the time the parser will be setting startAt manually to 0.
  */
  class ResumableMultiRegex {
    constructor() {
      // @ts-ignore
      this.rules = [];
      // @ts-ignore
      this.multiRegexes = [];
      this.count = 0;

      this.lastIndex = 0;
      this.regexIndex = 0;
    }

    // @ts-ignore
    getMatcher(index) {
      if (this.multiRegexes[index]) return this.multiRegexes[index];

      const matcher = new MultiRegex();
      this.rules.slice(index).forEach(([re, opts]) => matcher.addRule(re, opts));
      matcher.compile();
      this.multiRegexes[index] = matcher;
      return matcher;
    }

    resumingScanAtSamePosition() {
      return this.regexIndex !== 0;
    }

    considerAll() {
      this.regexIndex = 0;
    }

    // @ts-ignore
    addRule(re, opts) {
      this.rules.push([re, opts]);
      if (opts.type === "begin") this.count++;
    }

    /** @param {string} s */
    exec(s) {
      const m = this.getMatcher(this.regexIndex);
      m.lastIndex = this.lastIndex;
      let result = m.exec(s);

      // The following is because we have no easy way to say "resume scanning at the
      // existing position but also skip the current rule ONLY". What happens is
      // all prior rules are also skipped which can result in matching the wrong
      // thing. Example of matching "booger":

      // our matcher is [string, "booger", number]
      //
      // ....booger....

      // if "booger" is ignored then we'd really need a regex to scan from the
      // SAME position for only: [string, number] but ignoring "booger" (if it
      // was the first match), a simple resume would scan ahead who knows how
      // far looking only for "number", ignoring potential string matches (or
      // future "booger" matches that might be valid.)

      // So what we do: We execute two matchers, one resuming at the same
      // position, but the second full matcher starting at the position after:

      //     /--- resume first regex match here (for [number])
      //     |/---- full match here for [string, "booger", number]
      //     vv
      // ....booger....

      // Which ever results in a match first is then used. So this 3-4 step
      // process essentially allows us to say "match at this position, excluding
      // a prior rule that was ignored".
      //
      // 1. Match "booger" first, ignore. Also proves that [string] does non match.
      // 2. Resume matching for [number]
      // 3. Match at index + 1 for [string, "booger", number]
      // 4. If #2 and #3 result in matches, which came first?
      if (this.resumingScanAtSamePosition()) {
        if (result && result.index === this.lastIndex) ; else { // use the second matcher result
          const m2 = this.getMatcher(0);
          m2.lastIndex = this.lastIndex + 1;
          result = m2.exec(s);
        }
      }

      if (result) {
        this.regexIndex += result.position + 1;
        if (this.regexIndex === this.count) {
          // wrap-around to considering all matches again
          this.considerAll();
        }
      }

      return result;
    }
  }

  /**
   * Given a mode, builds a huge ResumableMultiRegex that can be used to walk
   * the content and find matches.
   *
   * @param {CompiledMode} mode
   * @returns {ResumableMultiRegex}
   */
  function buildModeRegex(mode) {
    const mm = new ResumableMultiRegex();

    mode.contains.forEach(term => mm.addRule(term.begin, { rule: term, type: "begin" }));

    if (mode.terminatorEnd) {
      mm.addRule(mode.terminatorEnd, { type: "end" });
    }
    if (mode.illegal) {
      mm.addRule(mode.illegal, { type: "illegal" });
    }

    return mm;
  }

  /** skip vs abort vs ignore
   *
   * @skip   - The mode is still entered and exited normally (and contains rules apply),
   *           but all content is held and added to the parent buffer rather than being
   *           output when the mode ends.  Mostly used with `sublanguage` to build up
   *           a single large buffer than can be parsed by sublanguage.
   *
   *             - The mode begin ands ends normally.
   *             - Content matched is added to the parent mode buffer.
   *             - The parser cursor is moved forward normally.
   *
   * @abort  - A hack placeholder until we have ignore.  Aborts the mode (as if it
   *           never matched) but DOES NOT continue to match subsequent `contains`
   *           modes.  Abort is bad/suboptimal because it can result in modes
   *           farther down not getting applied because an earlier rule eats the
   *           content but then aborts.
   *
   *             - The mode does not begin.
   *             - Content matched by `begin` is added to the mode buffer.
   *             - The parser cursor is moved forward accordingly.
   *
   * @ignore - Ignores the mode (as if it never matched) and continues to match any
   *           subsequent `contains` modes.  Ignore isn't technically possible with
   *           the current parser implementation.
   *
   *             - The mode does not begin.
   *             - Content matched by `begin` is ignored.
   *             - The parser cursor is not moved forward.
   */

  /**
   * Compiles an individual mode
   *
   * This can raise an error if the mode contains certain detectable known logic
   * issues.
   * @param {Mode} mode
   * @param {CompiledMode | null} [parent]
   * @returns {CompiledMode | never}
   */
  function compileMode(mode, parent) {
    const cmode = /** @type CompiledMode */ (mode);
    if (mode.isCompiled) return cmode;

    [
      scopeClassName,
      // do this early so compiler extensions generally don't have to worry about
      // the distinction between match/begin
      compileMatch,
      MultiClass,
      beforeMatchExt
    ].forEach(ext => ext(mode, parent));

    language.compilerExtensions.forEach(ext => ext(mode, parent));

    // __beforeBegin is considered private API, internal use only
    mode.__beforeBegin = null;

    [
      beginKeywords,
      // do this later so compiler extensions that come earlier have access to the
      // raw array if they wanted to perhaps manipulate it, etc.
      compileIllegal,
      // default to 1 relevance if not specified
      compileRelevance
    ].forEach(ext => ext(mode, parent));

    mode.isCompiled = true;

    let keywordPattern = null;
    if (typeof mode.keywords === "object" && mode.keywords.$pattern) {
      // we need a copy because keywords might be compiled multiple times
      // so we can't go deleting $pattern from the original on the first
      // pass
      mode.keywords = Object.assign({}, mode.keywords);
      keywordPattern = mode.keywords.$pattern;
      delete mode.keywords.$pattern;
    }
    keywordPattern = keywordPattern || /\w+/;

    if (mode.keywords) {
      mode.keywords = compileKeywords(mode.keywords, language.case_insensitive);
    }

    cmode.keywordPatternRe = langRe(keywordPattern, true);

    if (parent) {
      if (!mode.begin) mode.begin = /\B|\b/;
      cmode.beginRe = langRe(cmode.begin);
      if (!mode.end && !mode.endsWithParent) mode.end = /\B|\b/;
      if (mode.end) cmode.endRe = langRe(cmode.end);
      cmode.terminatorEnd = source(cmode.end) || '';
      if (mode.endsWithParent && parent.terminatorEnd) {
        cmode.terminatorEnd += (mode.end ? '|' : '') + parent.terminatorEnd;
      }
    }
    if (mode.illegal) cmode.illegalRe = langRe(/** @type {RegExp | string} */ (mode.illegal));
    if (!mode.contains) mode.contains = [];

    mode.contains = [].concat(...mode.contains.map(function(c) {
      return expandOrCloneMode(c === 'self' ? mode : c);
    }));
    mode.contains.forEach(function(c) { compileMode(/** @type Mode */ (c), cmode); });

    if (mode.starts) {
      compileMode(mode.starts, parent);
    }

    cmode.matcher = buildModeRegex(cmode);
    return cmode;
  }

  if (!language.compilerExtensions) language.compilerExtensions = [];

  // self is not valid at the top-level
  if (language.contains && language.contains.includes('self')) {
    throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
  }

  // we need a null object, which inherit will guarantee
  language.classNameAliases = inherit$1(language.classNameAliases || {});

  return compileMode(/** @type Mode */ (language));
}

/**
 * Determines if a mode has a dependency on it's parent or not
 *
 * If a mode does have a parent dependency then often we need to clone it if
 * it's used in multiple places so that each copy points to the correct parent,
 * where-as modes without a parent can often safely be re-used at the bottom of
 * a mode chain.
 *
 * @param {Mode | null} mode
 * @returns {boolean} - is there a dependency on the parent?
 * */
function dependencyOnParent(mode) {
  if (!mode) return false;

  return mode.endsWithParent || dependencyOnParent(mode.starts);
}

/**
 * Expands a mode or clones it if necessary
 *
 * This is necessary for modes with parental dependenceis (see notes on
 * `dependencyOnParent`) and for nodes that have `variants` - which must then be
 * exploded into their own individual modes at compile time.
 *
 * @param {Mode} mode
 * @returns {Mode | Mode[]}
 * */
function expandOrCloneMode(mode) {
  if (mode.variants && !mode.cachedVariants) {
    mode.cachedVariants = mode.variants.map(function(variant) {
      return inherit$1(mode, { variants: null }, variant);
    });
  }

  // EXPAND
  // if we have variants then essentially "replace" the mode with the variants
  // this happens in compileMode, where this function is called from
  if (mode.cachedVariants) {
    return mode.cachedVariants;
  }

  // CLONE
  // if we have dependencies on parents then we need a unique
  // instance of ourselves, so we can be reused with many
  // different parents without issue
  if (dependencyOnParent(mode)) {
    return inherit$1(mode, { starts: mode.starts ? inherit$1(mode.starts) : null });
  }

  if (Object.isFrozen(mode)) {
    return inherit$1(mode);
  }

  // no special dependency issues, just return ourselves
  return mode;
}

var version = "11.12.0";

class HTMLInjectionError extends Error {
  constructor(reason, html) {
    super(reason);
    this.name = "HTMLInjectionError";
    this.html = html;
  }
}

/*
Syntax highlighting with language autodetection.
https://highlightjs.org/
*/



/**
@typedef {import('highlight.js').Mode} Mode
@typedef {import('highlight.js').CompiledMode} CompiledMode
@typedef {import('highlight.js').CompiledScope} CompiledScope
@typedef {import('highlight.js').Language} Language
@typedef {import('highlight.js').HLJSApi} HLJSApi
@typedef {import('highlight.js').HLJSPlugin} HLJSPlugin
@typedef {import('highlight.js').PluginEvent} PluginEvent
@typedef {import('highlight.js').HLJSOptions} HLJSOptions
@typedef {import('highlight.js').LanguageFn} LanguageFn
@typedef {import('highlight.js').HighlightedHTMLElement} HighlightedHTMLElement
@typedef {import('highlight.js').BeforeHighlightContext} BeforeHighlightContext
@typedef {import('highlight.js/private').MatchType} MatchType
@typedef {import('highlight.js/private').KeywordData} KeywordData
@typedef {import('highlight.js/private').EnhancedMatch} EnhancedMatch
@typedef {import('highlight.js/private').AnnotatedError} AnnotatedError
@typedef {import('highlight.js').AutoHighlightResult} AutoHighlightResult
@typedef {import('highlight.js').HighlightOptions} HighlightOptions
@typedef {import('highlight.js').HighlightResult} HighlightResult
*/


const escape = escapeHTML;
const inherit = inherit$1;
const NO_MATCH = Symbol("nomatch");
const MAX_KEYWORD_HITS = 7;

/**
 * @param {any} hljs - object that is extended (legacy)
 * @returns {HLJSApi}
 */
const HLJS = function(hljs) {
  // Global internal variables used within the highlight.js library.
  /** @type {Record<string, Language>} */
  const languages = Object.create(null);
  /** @type {Record<string, string>} */
  const aliases = Object.create(null);
  /** @type {HLJSPlugin[]} */
  const plugins = [];

  // safe/production mode - swallows more errors, tries to keep running
  // even if a single syntax or parse hits a fatal error
  let SAFE_MODE = true;
  const LANGUAGE_NOT_FOUND = "Could not find the language '{}', did you forget to load/include a language module?";
  /** @type {Language} */
  const PLAINTEXT_LANGUAGE = { disableAutodetect: true, name: 'Plain text', contains: [] };

  // Global options used when within external APIs. This is modified when
  // calling the `hljs.configure` function.
  /** @type HLJSOptions */
  let options = {
    ignoreUnescapedHTML: false,
    throwUnescapedHTML: false,
    noHighlightRe: /^(no-?highlight)$/i,
    languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
    classPrefix: 'hljs-',
    cssSelector: 'pre code',
    languages: null,
    // beta configuration options, subject to change, welcome to discuss
    // https://github.com/highlightjs/highlight.js/issues/1086
    __emitter: TokenTreeEmitter
  };

  /* Utility functions */

  /**
   * Tests a language name to see if highlighting should be skipped
   * @param {string} languageName
   */
  function shouldNotHighlight(languageName) {
    return options.noHighlightRe.test(languageName);
  }

  /**
   * @param {HighlightedHTMLElement} block - the HTML element to determine language for
   */
  function blockLanguage(block) {
    let classes = block.className + ' ';

    classes += block.parentNode ? block.parentNode.className : '';

    // language-* takes precedence over non-prefixed class names.
    const match = options.languageDetectRe.exec(classes);
    if (match) {
      const language = getLanguage(match[1]);
      if (!language) {
        warn(LANGUAGE_NOT_FOUND.replace("{}", match[1]));
        warn("Falling back to no-highlight mode for this block.", block);
      }
      return language ? match[1] : 'no-highlight';
    }

    return classes
      .split(/\s+/)
      .find((_class) => shouldNotHighlight(_class) || getLanguage(_class));
  }

  /**
   * Core highlighting function.
   *
   * OLD API
   * highlight(lang, code, ignoreIllegals, continuation)
   *
   * NEW API
   * highlight(code, {lang, ignoreIllegals})
   *
   * @param {string} codeOrLanguageName - the language to use for highlighting
   * @param {string | HighlightOptions} optionsOrCode - the code to highlight
   * @param {boolean} [ignoreIllegals] - whether to ignore illegal matches, default is to bail
   *
   * @returns {HighlightResult} Result - an object that represents the result
   * @property {string} language - the language name
   * @property {number} relevance - the relevance score
   * @property {string} value - the highlighted HTML code
   * @property {string} code - the original raw code
   * @property {CompiledMode} top - top of the current mode stack
   * @property {boolean} illegal - indicates whether any illegal matches were found
  */
  function highlight(codeOrLanguageName, optionsOrCode, ignoreIllegals) {
    let code = "";
    let languageName = "";
    if (typeof optionsOrCode === "object") {
      code = codeOrLanguageName;
      ignoreIllegals = optionsOrCode.ignoreIllegals;
      languageName = optionsOrCode.language;
    } else {
      // old API
      deprecated("10.7.0", "highlight(lang, code, ...args) has been deprecated.");
      deprecated("10.7.0", "Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277");
      languageName = codeOrLanguageName;
      code = optionsOrCode;
    }

    // https://github.com/highlightjs/highlight.js/issues/3149
    // eslint-disable-next-line no-undefined
    if (ignoreIllegals === undefined) { ignoreIllegals = true; }

    /** @type {BeforeHighlightContext} */
    const context = {
      code,
      language: languageName
    };
    // the plugin can change the desired language or the code to be highlighted
    // just be changing the object it was passed
    fire("before:highlight", context);

    // a before plugin can usurp the result completely by providing it's own
    // in which case we don't even need to call highlight
    const result = context.result
      ? context.result
      : _highlight(context.language, context.code, ignoreIllegals);

    result.code = context.code;
    // the plugin can change anything in result to suite it
    fire("after:highlight", result);

    return result;
  }

  /**
   * private highlight that's used internally and does not fire callbacks
   *
   * @param {string} languageName - the language to use for highlighting
   * @param {string} codeToHighlight - the code to highlight
   * @param {boolean?} [ignoreIllegals] - whether to ignore illegal matches, default is to bail
   * @param {CompiledMode?} [continuation] - current continuation mode, if any
   * @returns {HighlightResult} - result of the highlight operation
  */
  function _highlight(languageName, codeToHighlight, ignoreIllegals, continuation) {
    const keywordHits = Object.create(null);

    /**
     * Return keyword data if a match is a keyword
     * @param {CompiledMode} mode - current mode
     * @param {string} matchText - the textual match
     * @returns {KeywordData | false}
     */
    function keywordData(mode, matchText) {
      return mode.keywords[matchText];
    }

    function processKeywords() {
      if (!top.keywords) {
        emitter.addText(modeBuffer);
        return;
      }

      let lastIndex = 0;
      top.keywordPatternRe.lastIndex = 0;
      let match = top.keywordPatternRe.exec(modeBuffer);
      let buf = "";

      while (match) {
        buf += modeBuffer.substring(lastIndex, match.index);
        const word = language.case_insensitive ? match[0].toLowerCase() : match[0];
        const data = keywordData(top, word);
        if (data) {
          const [kind, keywordRelevance] = data;
          emitter.addText(buf);
          buf = "";

          keywordHits[word] = (keywordHits[word] || 0) + 1;
          if (keywordHits[word] <= MAX_KEYWORD_HITS) relevance += keywordRelevance;
          if (kind.startsWith("_")) {
            // _ implied for relevance only, do not highlight
            // by applying a class name
            buf += match[0];
          } else {
            const cssClass = language.classNameAliases[kind] || kind;
            emitKeyword(match[0], cssClass);
          }
        } else {
          buf += match[0];
        }
        lastIndex = top.keywordPatternRe.lastIndex;
        match = top.keywordPatternRe.exec(modeBuffer);
      }
      buf += modeBuffer.substring(lastIndex);
      emitter.addText(buf);
    }

    function processSubLanguage() {
      if (modeBuffer === "") return;
      /** @type HighlightResult */
      let result = null;

      if (typeof top.subLanguage === 'string') {
        if (!languages[top.subLanguage]) {
          emitter.addText(modeBuffer);
          return;
        }
        result = _highlight(top.subLanguage, modeBuffer, true, continuations[top.subLanguage]);
        continuations[top.subLanguage] = /** @type {CompiledMode} */ (result._top);
      } else {
        result = highlightAuto(modeBuffer, top.subLanguage.length ? top.subLanguage : null);
      }

      // Counting embedded language score towards the host language may be disabled
      // with zeroing the containing mode relevance. Use case in point is Markdown that
      // allows XML everywhere and makes every XML snippet to have a much larger Markdown
      // score.
      if (top.relevance > 0) {
        relevance += result.relevance;
      }
      emitter.__addSublanguage(result._emitter, result.language);
    }

    function processBuffer() {
      if (top.subLanguage != null) {
        processSubLanguage();
      } else {
        processKeywords();
      }
      modeBuffer = '';
    }

    /**
     * @param {string} text
     * @param {string} scope
     */
    function emitKeyword(keyword, scope) {
      if (keyword === "") return;

      emitter.startScope(scope);
      emitter.addText(keyword);
      emitter.endScope();
    }

    /**
     * @param {CompiledScope} scope
     * @param {RegExpMatchArray} match
     */
    function emitMultiClass(scope, match) {
      let i = 1;
      const max = match.length - 1;
      while (i <= max) {
        if (!scope._emit[i]) { i++; continue; }
        const klass = language.classNameAliases[scope[i]] || scope[i];
        const text = match[i];
        if (klass) {
          emitKeyword(text, klass);
        } else {
          modeBuffer = text;
          processKeywords();
          modeBuffer = "";
        }
        i++;
      }
    }

    /**
     * @param {CompiledMode} mode - new mode to start
     * @param {RegExpMatchArray} match
     */
    function startNewMode(mode, match) {
      if (mode.scope && typeof mode.scope === "string") {
        emitter.openNode(language.classNameAliases[mode.scope] || mode.scope);
      }
      if (mode.beginScope) {
        // beginScope just wraps the begin match itself in a scope
        if (mode.beginScope._wrap) {
          emitKeyword(modeBuffer, language.classNameAliases[mode.beginScope._wrap] || mode.beginScope._wrap);
          modeBuffer = "";
        } else if (mode.beginScope._multi) {
          // at this point modeBuffer should just be the match
          emitMultiClass(mode.beginScope, match);
          modeBuffer = "";
        }
      }

      top = Object.create(mode, { parent: { value: top } });
      return top;
    }

    /**
     * @param {CompiledMode } mode - the mode to potentially end
     * @param {RegExpMatchArray} match - the latest match
     * @param {string} matchPlusRemainder - match plus remainder of content
     * @returns {CompiledMode | void} - the next mode, or if void continue on in current mode
     */
    function endOfMode(mode, match, matchPlusRemainder) {
      let matched = startsWith(mode.endRe, matchPlusRemainder);

      if (matched) {
        if (mode["on:end"]) {
          const resp = new Response(mode);
          mode["on:end"](match, resp);
          if (resp.isMatchIgnored) matched = false;
        }

        if (matched) {
          while (mode.endsParent && mode.parent) {
            mode = mode.parent;
          }
          return mode;
        }
      }
      // even if on:end fires an `ignore` it's still possible
      // that we might trigger the end node because of a parent mode
      if (mode.endsWithParent) {
        return endOfMode(mode.parent, match, matchPlusRemainder);
      }
    }

    /**
     * Handle matching but then ignoring a sequence of text
     *
     * @param {string} lexeme - string containing full match text
     */
    function doIgnore(lexeme) {
      if (top.matcher.regexIndex === 0) {
        // no more regexes to potentially match here, so we move the cursor forward one
        // space
        modeBuffer += lexeme[0];
        return 1;
      } else {
        // no need to move the cursor, we still have additional regexes to try and
        // match at this very spot
        resumeScanAtSamePosition = true;
        return 0;
      }
    }

    /**
     * Handle the start of a new potential mode match
     *
     * @param {EnhancedMatch} match - the current match
     * @returns {number} how far to advance the parse cursor
     */
    function doBeginMatch(match) {
      const lexeme = match[0];
      const newMode = match.rule;

      const resp = new Response(newMode);
      // first internal before callbacks, then the public ones
      const beforeCallbacks = [newMode.__beforeBegin, newMode["on:begin"]];
      for (const cb of beforeCallbacks) {
        if (!cb) continue;
        cb(match, resp);
        if (resp.isMatchIgnored) return doIgnore(lexeme);
      }

      if (newMode.skip) {
        modeBuffer += lexeme;
      } else {
        if (newMode.excludeBegin) {
          modeBuffer += lexeme;
        }
        processBuffer();
        if (!newMode.returnBegin && !newMode.excludeBegin) {
          modeBuffer = lexeme;
        }
      }
      startNewMode(newMode, match);
      return newMode.returnBegin ? 0 : lexeme.length;
    }

    /**
     * Handle the potential end of mode
     *
     * @param {RegExpMatchArray} match - the current match
     */
    function doEndMatch(match) {
      const lexeme = match[0];
      const matchPlusRemainder = codeToHighlight.substring(match.index);

      const endMode = endOfMode(top, match, matchPlusRemainder);
      if (!endMode) { return NO_MATCH; }

      const origin = top;
      if (top.endScope && top.endScope._wrap) {
        processBuffer();
        emitKeyword(lexeme, top.endScope._wrap);
      } else if (top.endScope && top.endScope._multi) {
        processBuffer();
        emitMultiClass(top.endScope, match);
      } else if (origin.skip) {
        modeBuffer += lexeme;
      } else {
        if (!(origin.returnEnd || origin.excludeEnd)) {
          modeBuffer += lexeme;
        }
        processBuffer();
        if (origin.excludeEnd) {
          modeBuffer = lexeme;
        }
      }
      do {
        if (top.scope) {
          emitter.closeNode();
        }
        if (!top.skip && !top.subLanguage) {
          relevance += top.relevance;
        }
        top = top.parent;
      } while (top !== endMode.parent);
      if (endMode.starts) {
        startNewMode(endMode.starts, match);
      }
      return origin.returnEnd ? 0 : lexeme.length;
    }

    function processContinuations() {
      const list = [];
      for (let current = top; current !== language; current = current.parent) {
        if (current.scope) {
          list.unshift(current.scope);
        }
      }
      list.forEach(item => emitter.openNode(item));
    }

    /** @type {{type?: MatchType, index?: number, rule?: Mode}}} */
    let lastMatch = {};

    /**
     *  Process an individual match
     *
     * @param {string} textBeforeMatch - text preceding the match (since the last match)
     * @param {EnhancedMatch} [match] - the match itself
     */
    function processLexeme(textBeforeMatch, match) {
      const lexeme = match && match[0];

      // add non-matched text to the current mode buffer
      modeBuffer += textBeforeMatch;

      if (lexeme == null) {
        processBuffer();
        return 0;
      }

      // we've found a 0 width match and we're stuck, so we need to advance
      // this happens when we have badly behaved rules that have optional matchers to the degree that
      // sometimes they can end up matching nothing at all
      // Ref: https://github.com/highlightjs/highlight.js/issues/2140
      if (lastMatch.type === "begin" && match.type === "end" && lastMatch.index === match.index && lexeme === "") {
        // spit the "skipped" character that our regex choked on back into the output sequence
        modeBuffer += codeToHighlight.slice(match.index, match.index + 1);
        if (!SAFE_MODE) {
          /** @type {AnnotatedError} */
          const err = new Error(`0 width match regex (${languageName})`);
          err.languageName = languageName;
          err.badRule = lastMatch.rule;
          throw err;
        }
        return 1;
      }
      lastMatch = match;

      if (match.type === "begin") {
        return doBeginMatch(match);
      } else if (match.type === "illegal" && !ignoreIllegals) {
        // illegal match, we do not continue processing
        /** @type {AnnotatedError} */
        const err = new Error('Illegal lexeme "' + lexeme + '" for mode "' + (top.scope || '<unnamed>') + '"');
        err.mode = top;
        throw err;
      } else if (match.type === "end") {
        const processed = doEndMatch(match);
        if (processed !== NO_MATCH) {
          return processed;
        }
      }

      // edge case for when illegal matches $ (end of line/text) which is technically
      // a 0 width match but not a begin/end match so it's not caught by the
      // first handler (when `ignoreIllegals` is true)
      if (match.type === "illegal" && lexeme === "") {
        if (match.index === codeToHighlight.length) ; else {
          // matched literal `\n` (with `$`) so we must manually add the newline
          // itself to the modeBuffer so it is not lost when we advance the cursor
          modeBuffer += "\n";
        }
        return 1;
      }

      // infinite loops are BAD, this is a last ditch catch all. if we have a
      // decent number of iterations yet our index (cursor position in our
      // parsing) still 3x behind our index then something is very wrong
      // so we bail
      if (iterations > 100000 && iterations > match.index * 3) {
        const err = new Error('potential infinite loop, way more iterations than matches');
        throw err;
      }

      /*
      Why might be find ourselves here?  An potential end match that was
      triggered but could not be completed.  IE, `doEndMatch` returned NO_MATCH.
      (this could be because a callback requests the match be ignored, etc)

      This causes no real harm other than stopping a few times too many.
      */

      modeBuffer += lexeme;
      return lexeme.length;
    }

    const language = getLanguage(languageName);
    if (!language) {
      error(LANGUAGE_NOT_FOUND.replace("{}", languageName));
      throw new Error('Unknown language: "' + languageName + '"');
    }

    const md = compileLanguage(language);
    let result = '';
    /** @type {CompiledMode} */
    let top = continuation || md;
    /** @type Record<string,CompiledMode> */
    const continuations = {}; // keep continuations for sub-languages
    const emitter = new options.__emitter(options);
    processContinuations();
    let modeBuffer = '';
    let relevance = 0;
    let index = 0;
    let iterations = 0;
    let resumeScanAtSamePosition = false;

    try {
      if (!language.__emitTokens) {
        top.matcher.considerAll();

        for (;;) {
          iterations++;
          if (resumeScanAtSamePosition) {
            // only regexes not matched previously will now be
            // considered for a potential match
            resumeScanAtSamePosition = false;
          } else {
            top.matcher.considerAll();
          }
          top.matcher.lastIndex = index;

          const match = top.matcher.exec(codeToHighlight);
          // console.log("match", match[0], match.rule && match.rule.begin)

          if (!match) break;

          const beforeMatch = codeToHighlight.substring(index, match.index);
          const processedCount = processLexeme(beforeMatch, match);
          index = match.index + processedCount;
        }
        processLexeme(codeToHighlight.substring(index));
      } else {
        language.__emitTokens(codeToHighlight, emitter);
      }

      emitter.finalize();
      result = emitter.toHTML();

      return {
        language: languageName,
        value: result,
        relevance,
        illegal: false,
        _emitter: emitter,
        _top: top
      };
    } catch (err) {
      if (err.message && err.message.includes('Illegal')) {
        return {
          language: languageName,
          value: escape(codeToHighlight),
          illegal: true,
          relevance: 0,
          _illegalBy: {
            message: err.message,
            index,
            context: codeToHighlight.slice(index - 100, index + 100),
            mode: err.mode,
            resultSoFar: result
          },
          _emitter: emitter
        };
      } else if (SAFE_MODE) {
        return {
          language: languageName,
          value: escape(codeToHighlight),
          illegal: false,
          relevance: 0,
          errorRaised: err,
          _emitter: emitter,
          _top: top
        };
      } else {
        throw err;
      }
    }
  }

  /**
   * returns a valid highlight result, without actually doing any actual work,
   * auto highlight starts with this and it's possible for small snippets that
   * auto-detection may not find a better match
   * @param {string} code
   * @returns {HighlightResult}
   */
  function justTextHighlightResult(code) {
    const result = {
      value: escape(code),
      illegal: false,
      relevance: 0,
      _top: PLAINTEXT_LANGUAGE,
      _emitter: new options.__emitter(options)
    };
    result._emitter.addText(code);
    return result;
  }

  /**
  Highlighting with language detection. Accepts a string with the code to
  highlight. Returns an object with the following properties:

  - language (detected language)
  - relevance (int)
  - value (an HTML string with highlighting markup)
  - secondBest (object with the same structure for second-best heuristically
    detected language, may be absent)

    @param {string} code
    @param {Array<string>} [languageSubset]
    @returns {AutoHighlightResult}
  */
  function highlightAuto(code, languageSubset) {
    languageSubset = languageSubset || options.languages || Object.keys(languages);
    const plaintext = justTextHighlightResult(code);

    const results = languageSubset.filter(getLanguage).filter(autoDetection).map(name =>
      _highlight(name, code, false)
    );
    results.unshift(plaintext); // plaintext is always an option

    const sorted = results.sort((a, b) => {
      // sort base on relevance
      if (a.relevance !== b.relevance) return b.relevance - a.relevance;

      // always award the tie to the base language
      // ie if C++ and Arduino are tied, it's more likely to be C++
      if (a.language && b.language) {
        if (getLanguage(a.language).supersetOf === b.language) {
          return 1;
        } else if (getLanguage(b.language).supersetOf === a.language) {
          return -1;
        }
      }

      // otherwise say they are equal, which has the effect of sorting on
      // relevance while preserving the original ordering - which is how ties
      // have historically been settled, ie the language that comes first always
      // wins in the case of a tie
      return 0;
    });

    const [best, secondBest] = sorted;

    /** @type {AutoHighlightResult} */
    const result = best;
    result.secondBest = secondBest;

    return result;
  }

  /**
   * Builds new class name for block given the language name
   *
   * @param {HTMLElement} element
   * @param {string} [currentLang]
   * @param {string} [resultLang]
   */
  function updateClassName(element, currentLang, resultLang) {
    const language = (currentLang && aliases[currentLang]) || resultLang;

    element.classList.add("hljs");
    element.classList.add(`language-${language}`);
  }

  /**
   * Applies highlighting to a DOM node containing code.
   *
   * @param {HighlightedHTMLElement} element - the HTML element to highlight
  */
  function highlightElement(element) {
    /** @type HTMLElement */
    let node = null;
    const language = blockLanguage(element);

    if (shouldNotHighlight(language)) return;

    fire("before:highlightElement",
      { el: element, language });

    if (element.dataset.highlighted) {
      console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.", element);
      return;
    }

    // we should be all text, no child nodes (unescaped HTML) - this is possibly
    // an HTML injection attack - it's likely too late if this is already in
    // production (the code has likely already done its damage by the time
    // we're seeing it)... but we yell loudly about this so that hopefully it's
    // more likely to be caught in development before making it to production
    if (element.children.length > 0) {
      if (!options.ignoreUnescapedHTML) {
        console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk.");
        console.warn("https://github.com/highlightjs/highlight.js/wiki/security");
        console.warn("The element with unescaped HTML:");
        console.warn(element);
      }
      if (options.throwUnescapedHTML) {
        const err = new HTMLInjectionError(
          "One of your code blocks includes unescaped HTML.",
          element.innerHTML
        );
        throw err;
      }
    }

    node = element;
    const text = node.textContent;
    const result = language ? highlight(text, { language, ignoreIllegals: true }) : highlightAuto(text);

    element.innerHTML = result.value;
    element.dataset.highlighted = "yes";
    updateClassName(element, language, result.language);
    element.result = {
      language: result.language,
      // TODO: remove with version 11.0
      re: result.relevance,
      relevance: result.relevance
    };
    if (result.secondBest) {
      element.secondBest = {
        language: result.secondBest.language,
        relevance: result.secondBest.relevance
      };
    }

    fire("after:highlightElement", { el: element, result, text });
  }

  /**
   * Updates highlight.js global options with the passed options
   *
   * @param {Partial<HLJSOptions>} userOptions
   */
  function configure(userOptions) {
    options = inherit(options, userOptions);
  }

  // TODO: remove v12, deprecated
  const initHighlighting = () => {
    highlightAll();
    deprecated("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.");
  };

  // TODO: remove v12, deprecated
  function initHighlightingOnLoad() {
    highlightAll();
    deprecated("10.6.0", "initHighlightingOnLoad() deprecated.  Use highlightAll() now.");
  }

  let wantsHighlight = false;

  /**
   * auto-highlights all pre>code elements on the page
   */
  function highlightAll() {
    function boot() {
      // if a highlight was requested before DOM was loaded, do now
      highlightAll();
    }

    // if we are called too early in the loading process
    if (document.readyState === "loading") {
      // make sure the event listener is only added once
      if (!wantsHighlight) {
        window.addEventListener('DOMContentLoaded', boot, false);
      }
      wantsHighlight = true;
      return;
    }

    const blocks = document.querySelectorAll(options.cssSelector);
    blocks.forEach(highlightElement);
  }

  /**
   * Register a language grammar module
   *
   * @param {string} languageName
   * @param {LanguageFn} languageDefinition
   */
  function registerLanguage(languageName, languageDefinition) {
    let lang = null;
    try {
      lang = languageDefinition(hljs);
    } catch (error$1) {
      error("Language definition for '{}' could not be registered.".replace("{}", languageName));
      // hard or soft error
      if (!SAFE_MODE) { throw error$1; } else { error(error$1); }
      // languages that have serious errors are replaced with essentially a
      // "plaintext" stand-in so that the code blocks will still get normal
      // css classes applied to them - and one bad language won't break the
      // entire highlighter
      lang = PLAINTEXT_LANGUAGE;
    }
    // give it a temporary name if it doesn't have one in the meta-data
    if (!lang.name) lang.name = languageName;
    languages[languageName] = lang;
    lang.rawDefinition = languageDefinition.bind(null, hljs);

    if (lang.aliases) {
      registerAliases(lang.aliases, { languageName });
    }
  }

  /**
   * Remove a language grammar module
   *
   * @param {string} languageName
   */
  function unregisterLanguage(languageName) {
    delete languages[languageName];
    for (const alias of Object.keys(aliases)) {
      if (aliases[alias] === languageName) {
        delete aliases[alias];
      }
    }
  }

  /**
   * @returns {string[]} List of language internal names
   */
  function listLanguages() {
    return Object.keys(languages);
  }

  /**
   * @param {string} name - name of the language to retrieve
   * @returns {Language | undefined}
   */
  function getLanguage(name) {
    name = (name || '').toLowerCase();
    return languages[name] || languages[aliases[name]];
  }

  /**
   *
   * @param {string|string[]} aliasList - single alias or list of aliases
   * @param {{languageName: string}} opts
   */
  function registerAliases(aliasList, { languageName }) {
    if (typeof aliasList === 'string') {
      aliasList = [aliasList];
    }
    aliasList.forEach(alias => { aliases[alias.toLowerCase()] = languageName; });
  }

  /**
   * Determines if a given language has auto-detection enabled
   * @param {string} name - name of the language
   */
  function autoDetection(name) {
    const lang = getLanguage(name);
    return lang && !lang.disableAutodetect;
  }

  /**
   * Upgrades the old highlightBlock plugins to the new
   * highlightElement API
   * @param {HLJSPlugin} plugin
   */
  function upgradePluginAPI(plugin) {
    // TODO: remove with v12
    if (plugin["before:highlightBlock"] && !plugin["before:highlightElement"]) {
      plugin["before:highlightElement"] = (data) => {
        plugin["before:highlightBlock"](
          Object.assign({ block: data.el }, data)
        );
      };
    }
    if (plugin["after:highlightBlock"] && !plugin["after:highlightElement"]) {
      plugin["after:highlightElement"] = (data) => {
        plugin["after:highlightBlock"](
          Object.assign({ block: data.el }, data)
        );
      };
    }
  }

  /**
   * @param {HLJSPlugin} plugin
   */
  function addPlugin(plugin) {
    upgradePluginAPI(plugin);
    plugins.push(plugin);
  }

  /**
   * @param {HLJSPlugin} plugin
   */
  function removePlugin(plugin) {
    const index = plugins.indexOf(plugin);
    if (index !== -1) {
      plugins.splice(index, 1);
    }
  }

  /**
   *
   * @param {PluginEvent} event
   * @param {any} args
   */
  function fire(event, args) {
    const cb = event;
    plugins.forEach(function(plugin) {
      if (plugin[cb]) {
        plugin[cb](args);
      }
    });
  }

  /**
   * DEPRECATED
   * @param {HighlightedHTMLElement} el
   */
  function deprecateHighlightBlock(el) {
    deprecated("10.7.0", "highlightBlock will be removed entirely in v12.0");
    deprecated("10.7.0", "Please use highlightElement now.");

    return highlightElement(el);
  }

  /* Interface definition */
  Object.assign(hljs, {
    highlight,
    highlightAuto,
    highlightAll,
    highlightElement,
    // TODO: Remove with v12 API
    highlightBlock: deprecateHighlightBlock,
    configure,
    initHighlighting,
    initHighlightingOnLoad,
    registerLanguage,
    unregisterLanguage,
    listLanguages,
    getLanguage,
    registerAliases,
    autoDetection,
    inherit,
    addPlugin,
    removePlugin
  });

  hljs.debugMode = function() { SAFE_MODE = false; };
  hljs.safeMode = function() { SAFE_MODE = true; };
  hljs.versionString = version;

  hljs.regex = {
    concat: concat,
    lookahead: lookahead,
    either: either,
    optional: optional,
    anyNumberOfTimes: anyNumberOfTimes
  };

  for (const key in MODES) {
    // @ts-ignore
    if (typeof MODES[key] === "object") {
      // @ts-ignore
      deepFreeze(MODES[key]);
    }
  }

  // merge all the modes/regexes into our main object
  Object.assign(hljs, MODES);

  return hljs;
};

// Other names for the variable may break build script
const highlight = HLJS({});

// returns a new instance of the highlighter to be used for extensions
// check https://github.com/wooorm/lowlight/issues/47
highlight.newInstance = () => HLJS({});

module.exports = highlight;
highlight.HighlightJS = highlight;
highlight.default = highlight;

    },
    "./entry": function (module, exports, require) {
var hljs = require('./core')
hljs.registerLanguage('csharp', require('./languages/csharp'))
hljs.registerLanguage('javascript', require('./languages/javascript'))
hljs.registerLanguage('typescript', require('./languages/typescript'))
hljs.registerLanguage('json', require('./languages/json'))
hljs.registerLanguage('bash', require('./languages/bash'))
hljs.registerLanguage('python', require('./languages/python'))
hljs.registerLanguage('sql', require('./languages/sql'))
hljs.registerLanguage('cpp', require('./languages/cpp'))
hljs.registerLanguage('c', require('./languages/c'))
hljs.registerLanguage('xml', require('./languages/xml'))
hljs.registerLanguage('css', require('./languages/css'))
hljs.registerLanguage('markdown', require('./languages/markdown'))
hljs.registerLanguage('yaml', require('./languages/yaml'))
hljs.registerLanguage('diff', require('./languages/diff'))
hljs.registerLanguage('ini', require('./languages/ini'))
hljs.registerLanguage('powershell', require('./languages/powershell'))
module.exports = hljs
    },
  }
  var cache = {}
  function load(id) {
    if (cache[id] !== undefined) return cache[id].exports
    var mod = { exports: {} }
    cache[id] = mod
    modules[id](mod, mod.exports, load)
    return mod.exports
  }
  return load("./entry")
})()


    const NS = 'dsh-notebooks'
    const TYPE_ID = 'dsh-notebooks:note'
    const BUILD = 'nb-7.5'
    const ADDRESS_PREFIX = 'dsh-resource://notebook/'
    const ADDRESS_PREFIX_STEM = 'dsh-resource://notebook'
    const MAX_TITLE = 200

    const EN = {
      nav: 'Notebooks',
      title: 'Notebooks',
      subtitle: 'Local Markdown notes, shared by every chat',
      search: 'Search notes',
      create: 'New note',
      createHint: 'Starts an empty note. The agent fills it when you ask for a summary.',
      empty: 'No notes yet',
      emptyHint: 'Ask in the chat: «Сделай конспект и сохрани в блокнотах», or select text and press «В блокнот».',
      folder: 'Folder',
      open: 'Open',
      rename: 'Rename',
      remove: 'Delete',
      removeConfirm: 'Delete this note?',
      saved: 'Saved',
      saving: 'Saving…',
      saveFailed: 'Not saved',
      preview: 'Preview',
      edit: 'Edit',
      back: 'Library',
      untitled: 'Untitled note',
      loading: 'Loading…',
      readFailed: 'Cannot read the note',
      missing: 'This note no longer exists.',
      selection: 'Save to Notebooks',
      selectHint: 'Select text in the chat first',
      selectionSaved: 'Saved to Notebooks',
      selectionFailed: 'Not saved',
      notes: 'notes',
      pin: 'Pin to top',
      unpin: 'Unpin',
      openAside: 'Open beside the chat',
      more: 'More',
      emptyNote: 'Empty note',
      folderButton: 'Folder',
      folderTitle: 'Where notebooks are kept',
      pickFolder: 'Choose folder…',
      resetFolder: 'Use the default folder',
      moveNotes: 'Move the existing notebooks',
      folderChanged: 'Notebooks moved',
      onThisPage: 'On this page',
      note: 'note',
      cancel: 'Cancel',
      confirm: 'Delete',
      path: 'Path',
      openInSidebar: 'Open beside the chat',
      openHere: 'Open here',
    }

    const RU = {
      nav: 'Блокноты',
      title: 'Блокноты',
      subtitle: 'Локальные заметки в Markdown, общие для всех чатов',
      search: 'Поиск по заметкам',
      create: 'Новая заметка',
      createHint: 'Создаёт пустую заметку. Агент наполнит её, когда вы попросите конспект.',
      empty: 'Пока нет заметок',
      emptyHint: 'Скажите в чате: «Сделай конспект и сохрани в блокнотах», или выделите текст и нажмите «В блокнот».',
      folder: 'Папка',
      open: 'Открыть',
      rename: 'Переименовать',
      remove: 'Удалить',
      removeConfirm: 'Удалить эту заметку?',
      saved: 'Сохранено',
      saving: 'Сохранение…',
      saveFailed: 'Не сохранено',
      preview: 'Просмотр',
      edit: 'Редактировать',
      back: 'К библиотеке',
      untitled: 'Без названия',
      loading: 'Загрузка…',
      readFailed: 'Не удалось прочитать заметку',
      missing: 'Этой заметки больше нет.',
      selection: 'В блокнот',
      selectHint: 'Сначала выделите текст в чате',
      selectionSaved: 'Сохранено в блокноты',
      selectionFailed: 'Не сохранено',
      notes: 'заметок',
      pin: 'Закрепить сверху',
      unpin: 'Открепить',
      openAside: 'Открыть в панели справа',
      more: 'Ещё',
      emptyNote: 'Пустая заметка',
      folderButton: 'Папка',
      folderTitle: 'Где хранятся блокноты',
      pickFolder: 'Выбрать папку…',
      resetFolder: 'Вернуть папку по умолчанию',
      moveNotes: 'Перенести существующие заметки',
      folderChanged: 'Блокноты перенесены',
      onThisPage: 'На этой странице',
      note: 'заметка',
      cancel: 'Отмена',
      confirm: 'Удалить',
      path: 'Путь',
      openInSidebar: 'Открыть рядом с чатом',
      openHere: 'Открыть здесь',
    }

    //#region styles
    const CSS = `
[data-notebooks-ui]{--nb-radius:12px;color:var(--dsw-alias-label-primary);font-size:13px;line-height:1.5}
[data-notebooks-ui] .nb-page{display:flex;flex-direction:column;height:calc(100vh - 92px);min-height:0;background:var(--dsw-alias-bg-base);overflow-y:auto;overflow-x:hidden;overscroll-behavior:contain}
[data-notebooks-ui] .nb-folder{position:relative}
[data-notebooks-ui] .nb-pop{position:absolute;right:0;top:40px;z-index:30;width:min(420px,80vw);padding:14px;border-radius:12px;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-overlay);box-shadow:0 16px 40px rgba(0,0,0,.24);display:flex;flex-direction:column;gap:10px}
[data-notebooks-ui] .nb-pop-title{font-size:12px;font-weight:600;color:var(--dsw-alias-label-primary)}
[data-notebooks-ui] .nb-pop-path{display:block;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-2);border-radius:8px;padding:8px 10px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
[data-notebooks-ui] .nb-check{display:flex;align-items:center;gap:8px;font-size:12px;color:var(--dsw-alias-label-primary);cursor:pointer}
[data-notebooks-ui] .nb-check input{accent-color:var(--dsw-alias-brand-primary)}
[data-notebooks-ui] .nb-pop-error{font-size:11px;color:var(--dsw-alias-state-error-primary)}
[data-notebooks-ui] .nb-pop-ok{font-size:11px;color:var(--dsw-alias-state-success-primary)}
[data-notebooks-ui] .nb-pop-actions{display:flex;gap:8px;flex-wrap:wrap}
[data-notebooks-ui] .nb-page-inner{width:100%;max-width:1000px;margin:0 auto;padding:28px 32px 40px;display:flex;flex-direction:column;gap:18px;min-height:100%}
[data-notebooks-ui] .nb-head{display:flex;align-items:center;gap:16px}
[data-notebooks-ui] .nb-head-title{display:flex;flex-direction:column;gap:2px;min-width:0;flex:1}
[data-notebooks-ui] .nb-head h1{margin:0;font-size:18px;font-weight:600;letter-spacing:-.01em}
[data-notebooks-ui] .nb-count{font-size:12px;color:var(--dsw-alias-label-secondary)}
[data-notebooks-ui] .nb-tools{display:flex;align-items:center;gap:10px}
[data-notebooks-ui] .nb-searchbox{display:flex;align-items:center;gap:8px;height:36px;padding:0 12px;border-radius:10px;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary);min-width:240px}
[data-notebooks-ui] .nb-searchbox input{flex:1;min-width:0;border:0;outline:none;background:transparent;color:var(--dsw-alias-label-primary);font:inherit}
[data-notebooks-ui] .nb-input{height:32px;padding:0 10px;border-radius:8px;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);font:inherit;outline:none;min-width:0}
[data-notebooks-ui] .nb-input:focus{border-color:var(--dsw-alias-brand-primary)}
[data-notebooks-ui] .nb-btn{display:inline-flex;align-items:center;gap:6px;height:36px;padding:0 14px;border-radius:10px;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);font:inherit;cursor:pointer;white-space:nowrap}
[data-notebooks-ui] .nb-btn:hover{background:var(--dsw-alias-bg-layer-2)}
[data-notebooks-ui] .nb-btn:disabled{opacity:.55;cursor:default}
[data-notebooks-ui] .nb-btn.primary{background:var(--dsw-alias-brand-primary);border-color:transparent;color:#fff}
[data-notebooks-ui] .nb-btn.primary:hover{filter:brightness(1.05)}
[data-notebooks-ui] .nb-btn.ghost{border-color:transparent;background:transparent;height:30px;padding:0 8px}
[data-notebooks-ui] .nb-btn.ghost:hover{background:var(--dsw-alias-bg-layer-2)}
[data-notebooks-ui] .nb-btn.danger{color:var(--dsw-alias-state-error-primary)}
[data-notebooks-ui] .nb-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(272px,1fr));gap:16px;align-items:start}
[data-notebooks-ui] .nb-card{position:relative;display:flex;flex-direction:column;gap:8px;min-height:168px;padding:14px 16px 12px;border-radius:var(--nb-radius);border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);cursor:pointer;outline:none}
[data-notebooks-ui] .nb-card:hover{border-color:var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2)}
[data-notebooks-ui] .nb-card:focus-visible{border-color:var(--dsw-alias-brand-primary)}
[data-notebooks-ui] .nb-card-top{display:flex;align-items:flex-start;justify-content:space-between;gap:8px;min-height:18px}
[data-notebooks-ui] .nb-card-icon{color:var(--dsw-alias-label-secondary);display:flex}
[data-notebooks-ui] .nb-card-menu-btn{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border:0;border-radius:6px;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;opacity:0}
[data-notebooks-ui] .nb-card:hover .nb-card-menu-btn,[data-notebooks-ui] .nb-card-menu-btn:focus-visible{opacity:1}
[data-notebooks-ui] .nb-card-menu-btn:hover{background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary)}
[data-notebooks-ui] .nb-card-menu{position:absolute;right:12px;top:38px;z-index:20;display:flex;flex-direction:column;min-width:210px;padding:6px;border-radius:10px;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-overlay);box-shadow:0 12px 32px rgba(0,0,0,.22)}
[data-notebooks-ui] .nb-menu-item{display:flex;align-items:center;gap:8px;height:30px;padding:0 10px;border:0;border-radius:7px;background:transparent;color:var(--dsw-alias-label-primary);font:inherit;text-align:left;cursor:pointer;white-space:nowrap}
[data-notebooks-ui] .nb-menu-item:hover{background:var(--dsw-alias-bg-layer-2)}
[data-notebooks-ui] .nb-menu-item.danger{color:var(--dsw-alias-state-error-primary)}
[data-notebooks-ui] .nb-card-title{margin:0;font-size:14px;font-weight:600;line-height:1.35;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
[data-notebooks-ui] .nb-card-preview{margin:0;font-size:12px;line-height:1.5;color:var(--dsw-alias-label-secondary);display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
[data-notebooks-ui] .nb-card-foot{margin-top:auto;display:flex;align-items:center;gap:6px;font-size:11px;color:var(--dsw-alias-label-secondary)}
[data-notebooks-ui] .nb-pin{color:var(--dsw-alias-brand-primary)}
[data-notebooks-ui] .nb-empty{display:flex;flex-direction:column;align-items:center;gap:8px;padding:64px 24px;text-align:center}
[data-notebooks-ui] .nb-empty strong{font-size:14px}
[data-notebooks-ui] .nb-empty span{font-size:12px;color:var(--dsw-alias-label-secondary);max-width:420px}
[data-notebooks-ui] .nb-foot{display:flex;align-items:center;gap:8px;margin-top:auto;padding-top:12px;font-size:11px;color:var(--dsw-alias-label-secondary)}
[data-notebooks-ui] .nb-build{margin-left:auto;opacity:.55;font-family:ui-monospace,monospace}
[data-notebooks-ui] .nb-foot code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
[data-notebooks-ui] .nb-doc{display:flex;flex-direction:column;height:calc(100vh - 92px);min-height:0;overflow-y:auto;overflow-x:hidden;background:var(--dsw-alias-bg-base);scrollbar-gutter:stable;overscroll-behavior:contain}
[data-notebooks-ui] .nb-doc-head{position:sticky;top:0;z-index:20;display:flex;align-items:center;gap:10px;padding:12px 32px;max-width:1040px;width:100%;margin:0 auto;background:var(--dsw-alias-bg-base);border-bottom:1px solid var(--dsw-alias-border-l1)}
[data-notebooks-ui] .nb-doc-head .nb-spacer{flex:1}
[data-notebooks-ui] .nb-doc-inner{width:100%;max-width:1040px;margin:0 auto;padding:14px 32px 64px;display:flex;flex-direction:column;gap:6px}
[data-notebooks-ui] .nb-doc-layout{display:flex;align-items:flex-start;gap:28px;width:100%;min-width:0}
[data-notebooks-ui] .nb-doc-toc{position:sticky;top:64px;flex:none;width:216px;max-height:calc(100vh - 280px);overflow:auto;padding:4px 2px}
[data-notebooks-ui] .nb-doc-toc-title{font-size:11px;color:var(--dsw-alias-label-secondary);margin:0 0 8px 6px}
[data-notebooks-ui] .nb-doc-toc ol{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:1px}
[data-notebooks-ui] .nb-doc-toc button{display:block;width:100%;border:0;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:12px;line-height:1.35;text-align:left;padding:3px 6px;border-radius:6px;cursor:pointer;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
[data-notebooks-ui] .nb-doc-toc button:hover{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}
[data-notebooks-ui] .nb-doc-toc-l2{padding-left:16px!important}
[data-notebooks-ui] .nb-doc-toc-l3{padding-left:26px!important}
@media (max-width: 900px){[data-notebooks-ui] .nb-doc-toc{display:none}}
[data-notebooks-ui] .nb-doc-body{flex:1;min-width:0}
[data-notebooks-ui] .nb-doc-title{display:block;width:100%;max-width:100%;box-sizing:border-box;border:0;outline:none;resize:none;overflow:hidden;background:transparent;color:var(--dsw-alias-label-primary);font-family:inherit;font-size:28px;font-weight:700;letter-spacing:-.025em;line-height:1.25;padding:4px 0 2px;white-space:pre-wrap;word-break:break-word}
[data-notebooks-ui] .nb-doc-title::placeholder{color:var(--dsw-alias-label-secondary)}
[data-notebooks-ui] .nb-doc-meta{display:flex;align-items:center;gap:10px;font-size:11px;color:var(--dsw-alias-label-secondary);padding-bottom:10px}
[data-notebooks-ui] .nb-doc-body{flex:1;min-height:0;display:flex;flex-direction:column}
[data-notebooks-ui] .nb-doc-body .nb-preview{padding:6px 0 0;max-width:720px;overflow:visible;font-size:15px;line-height:1.78}
[data-notebooks-ui] .nb-doc-body .nb-textarea{min-height:56vh;padding:16px 20px;border:1px solid var(--dsw-alias-border-l1);border-radius:12px;background:var(--dsw-alias-bg-layer-1)}
[data-notebooks-ui] .nb-editor{display:flex;flex-direction:column;min-height:0;height:100%;flex:1}
[data-notebooks-ui] .nb-editor-head{display:flex;align-items:center;gap:8px;padding:12px 16px;border-bottom:1px solid var(--dsw-alias-border-l1)}
[data-notebooks-ui] .nb-editor-head .nb-input{flex:1;font-size:14px;font-weight:500;height:34px}
[data-notebooks-ui] .nb-status{font-size:11px;color:var(--dsw-alias-label-secondary);min-width:70px;text-align:right}
[data-notebooks-ui] .nb-status.error{color:var(--dsw-alias-state-error-primary)}
[data-notebooks-ui] .nb-editor-body{flex:1;min-height:0;display:flex}
[data-notebooks-ui] .nb-textarea{flex:1;resize:none;border:0;outline:none;padding:16px;background:transparent;color:var(--dsw-alias-label-primary);font:13px/1.65 ui-monospace,SFMono-Regular,Menlo,monospace;min-height:0}
[data-notebooks-ui] .nb-preview{flex:1;min-height:0;overflow:auto;padding:16px 20px}
[data-notebooks-ui] .nb-preview h1,[data-notebooks-ui] .nb-preview h2,[data-notebooks-ui] .nb-preview h3,[data-notebooks-ui] .nb-preview h4{margin:1.1em 0 .5em;line-height:1.25;font-weight:600}
[data-notebooks-ui] .nb-preview h1{font-size:24px;letter-spacing:-.02em;margin:1.5em 0 .55em}
[data-notebooks-ui] .nb-preview h2{font-size:19px;letter-spacing:-.01em;margin:1.4em 0 .5em}
[data-notebooks-ui] .nb-preview h3{font-size:16.5px;margin:1.25em 0 .45em}
[data-notebooks-ui] .nb-preview p{margin:.9em 0}
[data-notebooks-ui] .nb-preview ul,[data-notebooks-ui] .nb-preview ol{margin:.8em 0 .8em 1.5em;padding:0}
[data-notebooks-ui] .nb-preview li{margin:.4em 0}
[data-notebooks-ui] .nb-preview code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.92em;line-height:1.4;background:color-mix(in srgb, var(--dsw-alias-label-primary) 7%, transparent);border:0;color:var(--dsw-alias-label-primary);padding:1px 4px;border-radius:5px;font-variant-ligatures:none}
[data-notebooks-ui] .nb-preview pre{background:color-mix(in srgb, var(--dsw-alias-label-primary) 8%, transparent);border:1px solid var(--dsw-alias-border-l2);border-left:3px solid var(--dsw-alias-brand-primary);border-radius:10px;padding:14px 16px;overflow:auto;margin:1.2em 0;font-variant-ligatures:none}
[data-notebooks-ui] .nb-preview pre code{display:block;background:transparent;border:0;padding:0;font:13px/1.65 ui-monospace,SFMono-Regular,Menlo,monospace;white-space:pre-wrap;word-break:break-word;overflow-wrap:anywhere}
[data-notebooks-ui] .nb-preview blockquote{margin:.6em 0;padding:2px 12px;border-left:3px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-secondary)}
[data-notebooks-ui] .nb-preview a{color:var(--dsw-alias-brand-primary);text-decoration:none}
[data-notebooks-ui] .nb-preview hr{border:0;border-top:1px solid var(--dsw-alias-border-l1);margin:1em 0}
[data-notebooks-ui] .nb-preview table{width:100%;border-collapse:collapse;margin:1.1em 0;font-size:14px}
[data-notebooks-ui] .nb-preview th,[data-notebooks-ui] .nb-preview td{border:1px solid var(--dsw-alias-border-l1);padding:7px 10px;text-align:left;vertical-align:top}
[data-notebooks-ui] .nb-preview th{background:var(--dsw-alias-bg-layer-2);font-weight:600}
[data-notebooks-ui] .nb-preview s,[data-notebooks-ui] .nb-preview del{color:var(--dsw-alias-label-secondary)}
[data-notebooks-ui] .nb-preview img{max-width:100%;height:auto;border-radius:8px}
[data-notebooks-ui] .nb-preview strong{font-weight:640}
[data-notebooks-ui] .nb-preview > :first-child{margin-top:0}
[data-notebooks-ui] .nb-preview pre code[class*="language-"]{font-size:13px}
[data-notebooks-ui] .nb-preview .hljs-keyword,[data-notebooks-ui] .nb-preview .hljs-literal,[data-notebooks-ui] .nb-preview .hljs-built_in{color:#b565d8;font-weight:600}
[data-notebooks-ui] .nb-preview .hljs-title,[data-notebooks-ui] .nb-preview .hljs-function .hljs-title,[data-notebooks-ui] .nb-preview .hljs-title.function_{color:#d68b3c}
[data-notebooks-ui] .nb-preview .hljs-type,[data-notebooks-ui] .nb-preview .hljs-title.class_,[data-notebooks-ui] .nb-preview .hljs-class .hljs-title{color:#4a9eda}
[data-notebooks-ui] .nb-preview .hljs-string,[data-notebooks-ui] .nb-preview .hljs-attr,[data-notebooks-ui] .nb-preview .hljs-template-variable,[data-notebooks-ui] .nb-preview .hljs-regexp{color:#4caf6d}
[data-notebooks-ui] .nb-preview .hljs-number,[data-notebooks-ui] .nb-preview .hljs-symbol,[data-notebooks-ui] .nb-preview .hljs-bullet{color:#e0645f}
[data-notebooks-ui] .nb-preview .hljs-comment,[data-notebooks-ui] .nb-preview .hljs-quote{color:var(--dsw-alias-label-secondary);font-style:italic}
[data-notebooks-ui] .nb-preview .hljs-meta,[data-notebooks-ui] .nb-preview .hljs-doctag{color:var(--dsw-alias-label-secondary)}
[data-notebooks-ui] .nb-preview .hljs-variable,[data-notebooks-ui] .nb-preview .hljs-property,[data-notebooks-ui] .nb-preview .hljs-params{color:var(--dsw-alias-label-primary)}
[data-notebooks-ui] .nb-preview .hljs-section,[data-notebooks-ui] .nb-preview .hljs-tag,[data-notebooks-ui] .nb-preview .hljs-name,[data-notebooks-ui] .nb-preview .hljs-selector-tag{color:#4a9eda}
[data-notebooks-ui] .nb-msg{padding:24px;font-size:12px;color:var(--dsw-alias-label-secondary)}
[data-notebooks-ui] .nb-msg.error{color:var(--dsw-alias-state-error-primary)}
[data-notebooks-ui] .nb-tabs{display:inline-flex;border:1px solid var(--dsw-alias-border-l1);border-radius:8px;overflow:hidden}
[data-notebooks-ui] .nb-tabs button{height:30px;padding:0 10px;border:0;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer}
[data-notebooks-ui] .nb-tabs button.on{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}
[data-notebooks-ui].nb-head-btn{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;padding:0;border:0!important;border-radius:8px;background:transparent!important;color:var(--dsw-alias-label-secondary);cursor:pointer}
[data-notebooks-ui].nb-head-btn:hover{background:var(--dsw-alias-bg-layer-2)!important;color:var(--dsw-alias-label-primary)}
[data-notebooks-ui].nb-head-btn:disabled{opacity:.4;cursor:default;background:transparent!important}
[data-notebooks-ui].nb-head-btn.ok{color:var(--dsw-alias-state-success-primary)}
[data-notebooks-ui].nb-head-btn.err{color:var(--dsw-alias-state-error-primary)}
[data-notebooks-ui].nb-action-btn{display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;padding:0;border:0!important;border-radius:7px;background:transparent!important;color:var(--dsw-alias-label-secondary);cursor:pointer}
[data-notebooks-ui].nb-action-btn:hover{background:var(--dsw-alias-bg-layer-2)!important;color:var(--dsw-alias-label-primary)}
[data-notebooks-ui].nb-action-btn:disabled{opacity:.45;cursor:default}
[data-notebooks-ui].nb-action-btn.ok{color:var(--dsw-alias-state-success-primary);opacity:1}
`
    //#endregion

    //#region host transport
    /** Turn any base into a directory base: drop query/hash, force a trailing slash. */
    function directoryBase(raw) {
      let url
      try {
        url = new URL(raw === '' || raw === undefined ? 'http://dsh.internal/' : raw)
      } catch {
        url = new URL('http://dsh.internal/')
      }
      url.search = ''
      url.hash = ''
      if (!url.pathname.endsWith('/')) url.pathname += '/'
      return url.href
    }

    /** The plugin's own route on the page's origin (reverse-proxy prefixes included). */
    function route(method) {
      const base = typeof document === 'undefined' ? 'http://dsh.internal/' : document.baseURI
      return new URL(`notebooks/api/${method}`, directoryBase(base)).href
    }

    /** One JSON call into the Host half; every route answers `{ok, value|error}`. */
    async function api(method, payload) {
      const response = await fetch(route(method), {
        method: 'POST',
        credentials: 'include',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload === undefined ? {} : payload),
      })
      let data
      try {
        data = await response.json()
      } catch {
        throw new Error(`notebooks ${method}: ${response.status} ${response.statusText}`)
      }
      if (data === null || typeof data !== 'object' || data.ok !== true) {
        const message = data !== null && typeof data === 'object' && data.error !== undefined
          ? String(data.error.message ?? data.error.code ?? 'request failed')
          : `notebooks ${method} failed`
        throw new Error(message)
      }
      return data.value
    }
    //#endregion

    //#region store
    /** Library state shared by the page, the tabs and the overlay. */
    let state = { notes: [], directory: '', loaded: false, loading: false, error: null }
    const listeners = new Set()
    const titles = new Map()

    /** Publish one immutable snapshot. */
    function setState(patch) {
      state = { ...state, ...patch }
      for (const note of state.notes) titles.set(note.id, note.title)
      for (const listener of listeners) {
        try {
          listener()
        } catch {
          // A broken subscriber must not stop the others.
        }
      }
    }

    function subscribe(listener) {
      listeners.add(listener)
      return () => listeners.delete(listener)
    }

    function getSnapshot() {
      return state
    }

    /** Read the whole library from the Host. */
    async function reload() {
      setState({ loading: true })
      try {
        const value = await api('list')
        setState({ notes: Array.isArray(value?.notes) ? value.notes : [], directory: String(value?.directory ?? ''), loaded: true, loading: false, error: null })
      } catch (error) {
        setState({ loading: false, loaded: true, error: error instanceof Error ? error.message : String(error) })
      }
    }

    /** Create one note and merge it into the list. */
    async function createNote(input) {
      const note = await api('create', input)
      const rest = state.notes.filter((row) => row.id !== note.id)
      setState({ notes: [note, ...rest], loaded: true, error: null })
      return note
    }

    /** Save one note, refreshing the header fields the list shows. */
    async function saveNote(id, input) {
      const note = await api('save', { id, title: input.title, content: input.content })
      setState({ notes: state.notes.map((row) => (row.id === id ? { ...row, title: note.title, updatedAt: note.updatedAt, bytes: note.bytes } : row)) })
      return note
    }

    /** Delete one note. */
    async function deleteNote(id) {
      await api('delete', { id })
      setState({ notes: state.notes.filter((row) => row.id !== id) })
    }

    /** The id inside one resource address. */
    function idOfAddress(address) {
      return typeof address === 'string' && address.startsWith(ADDRESS_PREFIX) ? address.slice(ADDRESS_PREFIX.length) : ''
    }

    /** Store a live title for a tab chip that renders after the body. */
    function rememberTitle(id, title) {
      if (typeof id === 'string' && id !== '' && typeof title === 'string') titles.set(id, title)
    }
    //#endregion

    //#region formatting
    /** Escape the five HTML-significant characters before any Markdown transform. */
    /**
     * The Markdown engine: vendored markdown-it in CommonMark mode with GFM
     * tables, strikethrough and autolinks, and raw HTML DISABLED — a note can
     * never inject markup into the page, so the rendered string is safe to place
     * into the DOM as-is.
     */
    /** Fence aliases people actually write. */
    const HL_ALIASES = {
      'c#': 'csharp', cs: 'csharp', 'c++': 'cpp', sh: 'bash', shell: 'bash', zsh: 'bash',
      py: 'python', jsx: 'javascript', js: 'javascript', ts: 'typescript', tsx: 'typescript',
      typescript: 'typescript', html: 'xml', vue: 'xml', yml: 'yaml', ps1: 'powershell',
    }

    /** Escape the three characters that would break a code block's HTML. */
    function escapeCode(text) {
      return String(text).replace(/[&<>]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[char]))
    }

    /**
     * Name the language of an untagged fence, so a block pasted without a label is
     * still highlighted. Coarse on purpose: a wrong guess changes colours only.
     * @param code - the block's source.
     * @returns a registered highlight.js language, or '' when nothing matches.
     */
    function guessLanguage(code) {
      const source = String(code)
      if (/^\s*[{[][\s\S]*[}\]]\s*$/.test(source) && /"[^"]*"\s*:/.test(source)) return 'json'
      if (/\b(?:namespace|using|private|public|protected|internal|void|foreach|struct|readonly)\b/.test(source)) return 'csharp'
      if (/\b(?:function|const|let|=>|console\.|require\(|===|async)\b/.test(source)) return 'javascript'
      if (/\b(?:def|elif|self|None|lambda)\b|^\s*import\s+\w+/m.test(source)) return 'python'
      if (/\b(?:select|from|where|insert\s+into|update\s+\w+\s+set)\b/i.test(source)) return 'sql'
      if (/^\s*(?:#!|\$ |cd |echo |export )/m.test(source)) return 'bash'
      if (/#include\s*</.test(source)) return 'cpp'
      return ''
    }

    /**
     * Highlight one fenced block with the vendored highlight.js grammars.
     * An unregistered language falls back to the guess, then to plain escaped text.
     * @param code - the block's source.
     * @param lang - the fence language.
     * @returns HTML with highlight.js token spans.
     */
    /** Token colours applied inline, so a syntax highlight never depends on a stylesheet. */
    const HL_STYLE = {
      keyword: 'color:#b565d8;font-weight:600',
      literal: 'color:#b565d8',
      built_in: 'color:#b565d8',
      title: 'color:#d68b3c',
      type: 'color:#4a9eda',
      string: 'color:#4caf6d',
      attr: 'color:#4caf6d',
      regexp: 'color:#4caf6d',
      'template-variable': 'color:#4caf6d',
      number: 'color:#e0645f',
      symbol: 'color:#e0645f',
      bullet: 'color:#e0645f',
      comment: 'color:#8a8f98;font-style:italic',
      quote: 'color:#8a8f98;font-style:italic',
      meta: 'color:#8a8f98',
      doctag: 'color:#8a8f98',
      section: 'color:#4a9eda',
      tag: 'color:#4a9eda',
      name: 'color:#4a9eda',
      'selector-tag': 'color:#4a9eda',
    }

    /** Rewrite highlight.js token classes into the same inline colours. */
    function inlineTokenColours(html) {
      return String(html).replace(/<span class="([^"]+)">/g, (match, classes) => {
        const hit = String(classes).split(/\s+/).map((name) => name.replace(/^hljs-/, '')).find((name) => HL_STYLE[name] !== undefined)
        return hit === undefined ? '<span>' : `<span style="${HL_STYLE[hit]}">`
      })
    }

    function highlightCode(code, lang) {
      const declared = String(lang === undefined || lang === null ? '' : lang).trim().toLowerCase()
      const alias = HL_ALIASES[declared] ?? declared
      const named = alias !== '' && highlightjs.getLanguage(alias) !== undefined ? alias : guessLanguage(code)
      if (named === '' || highlightjs.getLanguage(named) === undefined) return escapeCode(code)
      try {
        return inlineTokenColours(highlightjs.highlight(String(code), { language: named, ignoreIllegals: true }).value)
      } catch {
        return escapeCode(code)
      }
    }

    const markdown = markdownit({
      html: false,
      linkify: true,
      breaks: false,
      typographer: false,
      highlight: (code, lang) => highlightCode(code, lang),
    })


    /**
     * Render one note body to HTML, giving every heading a stable id so the
     * "On this page" outline can scroll to it.
     * @param source - the Markdown body.
     * @returns the rendered HTML.
     */
    function renderMarkdown(source) {
      const tokens = markdown.parse(String(source), {})
      let section = 0
      for (const token of tokens) {
        if (token.type !== 'heading_open') continue
        token.attrSet('id', `nb-sec-${section}`)
        section += 1
      }
      return markdown.renderer.render(tokens, markdown.options, {})
    }

    /**
     * The headings a rendered note offers, in document order; the ids match the
     * anchors \`renderMarkdown\` emits.
     * @param source - the note body.
     * @returns one entry per heading, with its level for indentation.
     */
    function headingsOf(source) {
      const tokens = markdown.parse(String(source), {})
      const out = []
      let section = 0
      for (let index = 0; index < tokens.length; index += 1) {
        const token = tokens[index]
        if (token.type !== 'heading_open') continue
        const inline = tokens[index + 1]
        out.push({
          id: `nb-sec-${section}`,
          level: Number(String(token.tag).slice(1)) || 1,
          text: inline === undefined ? '' : String(inline.content).replace(/\s+/g, ' ').trim(),
        })
        section += 1
      }
      return out
    }

    /**
     * Drop a leading level-1 heading that merely repeats the note's own title, so
     * the document view does not show the same line twice.
     * @param content - the note body.
     * @param title - the note title shown above the body.
     * @returns the body without that duplicate heading.
     */
    function stripDuplicateTitle(content, title) {
      const wanted = String(title).trim().toLowerCase()
      if (wanted === '') return content
      const lines = String(content).split(/\r?\n/)
      const first = lines.findIndex((line) => line.trim() !== '')
      if (first < 0) return content
      const plain = lines[first].trim().replace(/^#{1,6}\s+/, '').replace(/[*_`]/g, '').trim().toLowerCase()
      if (plain !== wanted) return content
      lines.splice(first, 1)
      return lines.join('\n')
    }

    /** Scroll the document pane to one heading rendered by the Markdown renderer. */
    function scrollToHeading(ref, id) {
      const root = ref === null || ref === undefined ? null : ref.current
      if (root === null) return
      const target = root.querySelector(`#${id}`)
      if (target !== null && typeof target.scrollIntoView === 'function') {
        target.scrollIntoView({ block: 'start', behavior: 'smooth' })
      }
    }

    /** A short, human time for a list row. */
    function formatTime(iso) {
      if (typeof iso !== 'string' || iso === '') return ''
      const date = new Date(iso)
      if (Number.isNaN(date.getTime())) return ''
      const language = typeof navigator === 'undefined' ? 'ru' : navigator.language
      try {
        return date.toLocaleString(language, { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
      } catch {
        return date.toISOString().slice(0, 16).replace('T', ' ')
      }
    }

    /** A relative time ("2 дня назад") for a card footer. */
    function relativeTime(iso) {
      if (typeof iso !== 'string' || iso === '') return ''
      const then = new Date(iso).getTime()
      if (!Number.isFinite(then)) return ''
      const language = typeof navigator === 'undefined' ? 'ru' : navigator.language
      const diff = then - Date.now()
      const minute = 60000
      const hour = 60 * minute
      const day = 24 * hour
      let formatter
      try {
        formatter = new Intl.RelativeTimeFormat(language, { numeric: 'auto' })
      } catch {
        return formatTime(iso)
      }
      const abs = Math.abs(diff)
      if (abs < hour) return formatter.format(Math.round(diff / minute), 'minute')
      if (abs < day) return formatter.format(Math.round(diff / hour), 'hour')
      if (abs < 30 * day) return formatter.format(Math.round(diff / day), 'day')
      return formatTime(iso)
    }

    /** Bytes as a compact size. */
    function formatBytes(bytes) {
      if (typeof bytes !== 'number' || !Number.isFinite(bytes)) return ''
      if (bytes < 1024) return `${bytes} B`
      if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    }

    /** The first non-empty line of a selection, trimmed for use as a title. */
    function firstLineOf(text) {
      const line = String(text).split(/\r?\n/).map((part) => part.trim()).find((part) => part !== '') ?? ''
      return line.replace(/^[#>*\-\s]+/, '').replace(/[*_`]/g, '').slice(0, 120)
    }

    /** Subscribe one component to the shared library state. */
    function useLibrary() {
      const [value, setValue] = React.useState(getSnapshot)
      React.useEffect(() => {
        const off = subscribe(() => setValue(getSnapshot()))
        setValue(getSnapshot())
        if (!getSnapshot().loading) reload()
        return off
      }, [])
      return value
    }
    //#endregion

    //#region components
    const NotebooksIcon = (props) => h('svg', {
      viewBox: '0 0 16 16',
      width: props?.size ?? 16,
      height: props?.size ?? 16,
      fill: 'none',
      'aria-hidden': true,
      style: { display: 'block', flex: 'none', color: props?.active === false ? 'currentColor' : 'currentColor' },
    },
    h('path', {
      d: 'M3.5 2.25h7a2 2 0 0 1 2 2v9.5H5.5a2 2 0 0 1-2-2V2.25Z',
      stroke: 'currentColor',
      strokeWidth: 1.1,
      strokeLinejoin: 'round',
    }),
    h('path', { d: 'M3.5 11.25h9', stroke: 'currentColor', strokeWidth: 1.1, strokeLinecap: 'round' }),
    h('path', { d: 'M6.25 5.25h4', stroke: 'currentColor', strokeWidth: 1.1, strokeLinecap: 'round' }),
    h('path', { d: 'M6.25 7.75h2.75', stroke: 'currentColor', strokeWidth: 1.1, strokeLinecap: 'round' }))

    /** The plugin's stylesheet, rendered where React owns its lifetime. */
    const Styles = () => h('style', null, CSS)

    /**
     * Size a pane to the space below its own top edge and repaint on resize.
     *
     * The host column does not hand its slot a definite height, so a percentage
     * height resolves to `auto` and the pane grows past the viewport — which is
     * exactly the case where a mouse wheel has nothing to scroll. Measuring the
     * viewport instead makes the pane its own scroll container.
     */
    function usePaneHeight(ref) {
      React.useEffect(() => {
        const view = typeof window === 'undefined' ? null : window
        if (view === null) return undefined
        const apply = () => {
          const element = ref.current
          if (element === null || element === undefined) return
          const top = element.getBoundingClientRect().top
          const available = Math.max(240, view.innerHeight - top - 12)
          element.style.height = `${available}px`
          element.style.maxHeight = `${available}px`
          element.style.overflowY = 'auto'
        }
        /** Wheel scrolling that survives a host listener which eats the event. */
        const onWheel = (event) => {
          const element = ref.current
          if (element === null || element === undefined) return
          const room = element.scrollHeight - element.clientHeight
          if (room <= 1) return
          const atTop = element.scrollTop <= 0 && event.deltaY < 0
          const atBottom = element.scrollTop >= room - 1 && event.deltaY > 0
          if (atTop || atBottom) return
          event.preventDefault()
          element.scrollTop += event.deltaY
        }
        apply()
        view.addEventListener('resize', apply)
        const element = ref.current
        if (element !== null && element !== undefined) element.addEventListener('wheel', onWheel, { passive: false })
        const timer = setTimeout(apply, 150)
        return () => {
          view.removeEventListener('resize', apply)
          if (element !== null && element !== undefined) element.removeEventListener('wheel', onWheel)
          clearTimeout(timer)
        }
      }, [ref])
    }

    /** One card in the library grid: title, opening text, relative time, and its menu. */
    function NoteCard(props) {
      const { note, t, onOpen, onOpenAside, onPin, onDelete } = props
      const [menu, setMenu] = React.useState(false)
      React.useEffect(() => {
        if (!menu) return undefined
        const document_ = typeof document === 'undefined' ? null : document
        if (document_ === null) return undefined
        const dismiss = () => setMenu(false)
        document_.addEventListener('pointerdown', dismiss)
        return () => document_.removeEventListener('pointerdown', dismiss)
      }, [menu])
      const stop = (event) => {
        event.stopPropagation()
        event.preventDefault()
      }
      return h('article', {
        className: 'nb-card',
        'data-notebooks-ui': '',
        tabIndex: 0,
        role: 'button',
        onClick: onOpen,
        onKeyDown: (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            onOpen()
          }
        },
      },
      h('div', { className: 'nb-card-top' },
        h('span', { className: 'nb-card-icon' }, h(NotebooksIcon, { size: 16 })),
        h('button', {
          type: 'button',
          className: 'nb-card-menu-btn',
          'aria-label': t('more'),
          title: t('more'),
          onPointerDown: stop,
          onClick: (event) => {
            stop(event)
            setMenu((open) => !open)
          },
        }, '⋯'),
        menu
          ? h('div', {
            className: 'nb-card-menu',
            role: 'menu',
            onPointerDown: stop,
            onClick: stop,
          },
          h('button', { type: 'button', className: 'nb-menu-item', role: 'menuitem', onClick: () => { setMenu(false); onPin() } }, note.pinned ? t('unpin') : t('pin')),
          h('button', { type: 'button', className: 'nb-menu-item', role: 'menuitem', onClick: () => { setMenu(false); onOpenAside() } }, t('openAside')),
          h('button', { type: 'button', className: 'nb-menu-item danger', role: 'menuitem', onClick: () => { setMenu(false); onDelete() } }, t('remove')))
          : null),
      h('h3', { className: 'nb-card-title' }, note.title),
      h('p', { className: 'nb-card-preview' }, typeof note.preview === 'string' && note.preview !== '' ? note.preview : t('emptyNote')),
      h('div', { className: 'nb-card-foot' },
        relativeTime(note.updatedAt),
        note.pinned ? h('span', { className: 'nb-pin', title: t('pin') }, '•') : null))
    }

    /** A folder glyph for the storage control. */
    const FolderIcon = (props) => h('svg', {
      viewBox: '0 0 16 16',
      width: props?.size ?? 15,
      height: props?.size ?? 15,
      fill: 'none',
      'aria-hidden': true,
      style: { display: 'block' },
    },
    h('path', {
      d: 'M2.25 4.5c0-.69.56-1.25 1.25-1.25h2.4c.33 0 .65.13.88.37l.9.88h4.82c.69 0 1.25.56 1.25 1.25v5.75c0 .69-.56 1.25-1.25 1.25H3.5c-.69 0-1.25-.56-1.25-1.25V4.5Z',
      stroke: 'currentColor',
      strokeWidth: 1.1,
      strokeLinejoin: 'round',
    }))

    /**
     * Where the notebooks live: shows the folder, lets the user pick another one
     * through the host's own directory dialog, and optionally carries the existing
     * notes across.
     */
    function FolderMenu(props) {
      const { t, directory, pickDirectory, reload } = props
      const [open, setOpen] = React.useState(false)
      const [move, setMove] = React.useState(true)
      const [busy, setBusy] = React.useState(false)
      const [error, setError] = React.useState(null)
      const [notice, setNotice] = React.useState('')

      React.useEffect(() => {
        if (!open) return undefined
        const document_ = typeof document === 'undefined' ? null : document
        if (document_ === null) return undefined
        const dismiss = (event) => {
          const path = typeof event.composedPath === 'function' ? event.composedPath() : []
          if (path.some((entry) => entry instanceof Element && entry.closest !== undefined && entry.closest('[data-nb-folder]') !== null)) return
          setOpen(false)
        }
        document_.addEventListener('pointerdown', dismiss)
        return () => document_.removeEventListener('pointerdown', dismiss)
      }, [open])

      const choose = () => {
        if (busy) return
        setError(null)
        setBusy(true)
        Promise.resolve(pickDirectory === undefined ? null : pickDirectory())
          .then((picked) => {
            if (typeof picked !== 'string' || picked === '') return undefined
            return api('relocate', { directory: picked, move }).then((result) => {
              setNotice(t('folderChanged'))
              return reload().then(() => result)
            })
          })
          .catch((failure) => setError(failure instanceof Error ? failure.message : String(failure)))
          .finally(() => setBusy(false))
      }

      const reset = () => {
        if (busy) return
        setError(null)
        setBusy(true)
        api('reset-directory')
          .then(() => reload())
          .catch((failure) => setError(failure instanceof Error ? failure.message : String(failure)))
          .finally(() => setBusy(false))
      }

      return h('div', { className: 'nb-folder', 'data-nb-folder': '' },
        h('button', {
          type: 'button',
          className: 'nb-btn ghost',
          title: t('folderTitle'),
          onClick: () => {
            setNotice('')
            setOpen((value) => !value)
          },
        }, h(FolderIcon, { size: 15 }), h('span', null, t('folderButton'))),
        open
          ? h('div', { className: 'nb-pop', role: 'dialog', 'aria-label': t('folderTitle') },
            h('div', { className: 'nb-pop-title' }, t('folderTitle')),
            h('code', { className: 'nb-pop-path', title: directory }, directory === '' ? '…' : directory),
            h('label', { className: 'nb-check' },
              h('input', {
                type: 'checkbox',
                checked: move,
                onChange: (event) => setMove(event.target.checked),
              }),
              h('span', null, t('moveNotes'))),
            error === null ? null : h('div', { className: 'nb-pop-error' }, error),
            notice === '' ? null : h('div', { className: 'nb-pop-ok' }, notice),
            h('div', { className: 'nb-pop-actions' },
              h('button', { type: 'button', className: 'nb-btn primary', disabled: busy, onClick: choose }, t('pickFolder')),
              h('button', { type: 'button', className: 'nb-btn ghost', disabled: busy, onClick: reset }, t('resetFolder'))))
          : null)
    }

    /**
     * The library page: a search field, the note cards, and the document view.
     * Opening a card shows the note as a page, the way a notes app does; the card's
     * menu keeps the right-hand tab available beside the chat.
     */
    function LibraryPage(props) {
      const t = props.t ?? ((key) => key)
      const library = useLibrary()
      const [query, setQuery] = React.useState('')
      const [openId, setOpenId] = React.useState(null)
      const [error, setError] = React.useState(null)
      const pageRef = React.useRef(null)
      usePaneHeight(pageRef)

      const fail = (failure) => setError(failure instanceof Error ? failure.message : String(failure))

      if (openId !== null) {
        return h(NoteEditor, { id: openId, t, document: true, onBack: () => setOpenId(null) })
      }

      const needle = query.trim().toLowerCase()
      const rows = needle === ''
        ? library.notes
        : library.notes.filter((note) => note.title.toLowerCase().includes(needle) || String(note.preview ?? '').toLowerCase().includes(needle))

      return h('div', { className: 'nb-page', 'data-notebooks-ui': '', dir: 'auto', ref: pageRef },
        h(Styles),
        h('div', { className: 'nb-page-inner' },
          h('header', { className: 'nb-head' },
            h('div', { className: 'nb-head-title' },
              h('h1', null, t('title')),
              h('span', { className: 'nb-count' }, `${library.notes.length} ${library.notes.length === 1 ? t('note') : t('notes')}`)),
            h('div', { className: 'nb-tools' },
              h(FolderMenu, { t, directory: library.directory, pickDirectory: props.pickDirectory, reload }),
              h('label', { className: 'nb-searchbox' },
                h('span', { 'aria-hidden': true }, '⌕'),
                h('input', {
                  value: query,
                  placeholder: t('search'),
                  'aria-label': t('search'),
                  onChange: (event) => setQuery(event.target.value),
                })),
)),
          error === null ? null : h('div', { className: 'nb-msg error' }, error),
          library.loading && !library.loaded
            ? h('div', { className: 'nb-msg' }, t('loading'))
            : library.error !== null
              ? h('div', { className: 'nb-msg error' }, library.error)
              : rows.length === 0
                ? h('div', { className: 'nb-empty' },
                  h('strong', null, needle === '' ? t('empty') : `${t('search')}: ${needle}`),
                  h('span', null, t('emptyHint')))
                : h('div', { className: 'nb-grid' }, rows.map((note) => h(NoteCard, {
                  key: note.id,
                  note,
                  t,
                  onOpen: () => setOpenId(note.id),
                  onOpenAside: () => {
                    openInRight(note.id).then((ok) => {
                      if (!ok) setOpenId(note.id)
                    })
                  },
                  onPin: () => {
                    api('pin', { id: note.id, pinned: note.pinned !== true })
                      .then(() => reload())
                      .catch(fail)
                  },
                  onDelete: () => {
                    const confirmed = typeof window === 'undefined' ? false : window.confirm(t('removeConfirm'))
                    if (!confirmed) return
                    deleteNote(note.id).catch(fail)
                  },
                }))),
          h('footer', { className: 'nb-foot' },
            h('span', null, `${t('folder')}:`),
            h('code', null, library.directory === '' ? '…' : library.directory),
            h('span', { className: 'nb-build' }, BUILD))))
    }

    /**
     * One note: heading-style title, Markdown body, debounced autosave.
     * Rendered as a page (`document`) and, compactly, inside a right-hand tab.
     */
    function NoteEditor(props) {
      const { id } = props
      const t = props.t ?? ((key) => key)
      const isPage = props.document === true
      const [note, setNote] = React.useState(null)
      const [title, setTitle] = React.useState('')
      const [content, setContent] = React.useState('')
      const [loading, setLoading] = React.useState(true)
      const [error, setError] = React.useState(null)
      const [status, setStatus] = React.useState('idle')
      const [preview, setPreview] = React.useState(isPage)
      const dirty = React.useRef(false)
      const timer = React.useRef(null)
      const latest = React.useRef({ title: '', content: '' })
      const scroller = React.useRef(null)
      const titleRef = React.useRef(null)

      // A note title is a heading, not a one-line field: grow with its text so a
      // long title wraps instead of running past the page edge.
      React.useEffect(() => {
        const element = titleRef.current
        if (element === null || element === undefined) return
        element.style.height = 'auto'
        element.style.height = element.scrollHeight + 'px'
      }, [title, isPage])
      usePaneHeight(scroller)

      React.useEffect(() => {
        let cancelled = false
        setLoading(true)
        setError(null)
        api('read', { id })
          .then((value) => {
            if (cancelled) return
            setNote(value)
            setTitle(value.title)
            setContent(value.content)
            latest.current = { title: value.title, content: value.content }
            rememberTitle(id, value.title)
            setLoading(false)
          })
          .catch((failure) => {
            if (cancelled) return
            setError(failure instanceof Error ? failure.message : String(failure))
            setLoading(false)
          })
        return () => {
          cancelled = true
          if (timer.current !== null) clearTimeout(timer.current)
        }
      }, [id])

      const flush = React.useCallback(() => {
        if (timer.current !== null) {
          clearTimeout(timer.current)
          timer.current = null
        }
        if (!dirty.current) return
        dirty.current = false
        setStatus('saving')
        saveNote(id, latest.current)
          .then(() => {
            setStatus('saved')
            rememberTitle(id, latest.current.title)
          })
          .catch((failure) => {
            setStatus('error')
            setError(failure instanceof Error ? failure.message : String(failure))
          })
      }, [id])

      const schedule = React.useCallback(() => {
        dirty.current = true
        setStatus('idle')
        if (timer.current !== null) clearTimeout(timer.current)
        timer.current = setTimeout(flush, 700)
      }, [flush])

      React.useEffect(() => () => {
        if (timer.current !== null) clearTimeout(timer.current)
      }, [])

      if (loading) return h('div', { className: 'nb-msg', 'data-notebooks-ui': '' }, h(Styles), t('loading'))
      if (error !== null && note === null) return h('div', { className: 'nb-msg error', 'data-notebooks-ui': '' }, h(Styles), `${t('readFailed')}: ${error}`)

      const statusText = status === 'saving' ? t('saving') : status === 'saved' ? t('saved') : status === 'error' ? t('saveFailed') : ''
      const onTitleChange = (event) => {
        setTitle(event.target.value)
        latest.current = { ...latest.current, title: event.target.value }
        schedule()
      }
      const titleInput = isPage
        ? h('textarea', {
          className: 'nb-doc-title',
          value: title,
          rows: 1,
          spellCheck: false,
          placeholder: t('untitled'),
          'aria-label': t('title'),
          ref: titleRef,
          onChange: onTitleChange,
          onBlur: flush,
        })
        : h('input', {
          className: 'nb-input',
          value: title,
          placeholder: t('untitled'),
          'aria-label': t('title'),
          onChange: onTitleChange,
          onBlur: flush,
        })
      const sourceEditor = h('textarea', {
        className: 'nb-textarea',
        value: content,
        spellCheck: false,
        placeholder: `# ${t('untitled')}`,
        onChange: (event) => {
          setContent(event.target.value)
          latest.current = { ...latest.current, content: event.target.value }
          schedule()
        },
        onBlur: flush,
        onKeyDown: (event) => {
          if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
            event.preventDefault()
            flush()
          }
        },
      })
      const body = preview
        ? h('div', { className: 'nb-preview', dangerouslySetInnerHTML: { __html: renderMarkdown(content) } })
        : sourceEditor
      const modeSwitch = h('div', { className: 'nb-tabs' },
        h('button', { type: 'button', className: preview ? '' : 'on', onClick: () => setPreview(false) }, t('edit')),
        h('button', { type: 'button', className: preview ? 'on' : '', onClick: () => setPreview(true) }, t('preview')))

      if (isPage) {
        const visible = stripDuplicateTitle(content, title)
        const headings = headingsOf(visible)
        const outline = [
          { id: 'nb-doc-top', level: 1, text: title.trim() === '' ? t('untitled') : title.trim() },
          ...headings,
        ]
        return h('div', { className: 'nb-doc', 'data-notebooks-ui': '', dir: 'auto', ref: scroller },
          h(Styles),
          h('div', { className: 'nb-doc-head' },
            h('button', { type: 'button', className: 'nb-btn ghost', onClick: props.onBack }, `← ${t('back')}`),
            h('span', { className: 'nb-spacer' }),
            modeSwitch,
            h('span', { className: 'nb-build' }, BUILD),
            h('span', { className: `nb-status${status === 'error' ? ' error' : ''}` }, statusText)),
          h('div', { className: 'nb-doc-inner' },
            titleInput,
            h('div', { className: 'nb-doc-meta' }, formatTime(note?.updatedAt ?? note?.createdAt ?? ''), h('span', { className: 'nb-build' }, BUILD)),
            h('div', { className: 'nb-doc-layout' },
              h('nav', { className: 'nb-doc-toc', 'aria-label': t('onThisPage') },
                h('div', { className: 'nb-doc-toc-title' }, t('onThisPage')),
                h('ol', null, outline.map((item) => h('li', { key: item.id },
                  h('button', {
                    type: 'button',
                    className: `nb-doc-toc-l${Math.min(item.level, 3)}`,
                    title: item.text,
                    onClick: () => {
                      if (item.id === 'nb-doc-top') {
                        const root = scroller.current
                        if (root !== null) root.scrollTo({ top: 0, behavior: 'smooth' })
                        return
                      }
                      scrollToHeading(scroller, item.id)
                    },
                  }, item.text))))),
              h('div', { className: 'nb-doc-body' }, body))))
      }

      return h('div', { className: 'nb-editor', 'data-notebooks-ui': '', dir: 'auto' },
        h(Styles),
        h('div', { className: 'nb-editor-head' },
          titleInput,
          modeSwitch,
          h('span', { className: `nb-status${status === 'error' ? ' error' : ''}` }, statusText)),
        h('div', { className: 'nb-editor-body' }, body))
    }

    /** The right-hand tab body: one note, identified by its resource address. */
    function NoteTabBody(props) {
      const info = typeof props.useTabInfo === 'function' ? props.useTabInfo() : undefined
      const id = idOfAddress(info?.tab?.contentId ?? props.contentId ?? '')
      const t = props.t ?? ((key) => key)
      if (id === '') return h('div', { className: 'nb-msg', 'data-notebooks-ui': '' }, h(Styles), t('missing'))
      return h(NoteEditor, { id, t, useTabInfo: props.useTabInfo })
    }

    /** The tab chip: the note's title, kept live by {@link rememberTitle}. */
    function NoteTabTitle(props) {
      const info = typeof props.useTabInfo === 'function' ? props.useTabInfo() : undefined
      const id = idOfAddress(info?.tab?.contentId ?? '')
      const t = props.t ?? ((key) => key)
      const [title, setTitle] = React.useState(() => titles.get(id) ?? '')
      React.useEffect(() => {
        if (id === '' || titles.has(id)) return
        api('read', { id })
          .then((value) => {
            rememberTitle(id, value.title)
            setTitle(value.title)
          })
          .catch(() => { setTitle(t('untitled')) })
      }, [id])
      const shown = titles.get(id) ?? title
      return h('span', null, shown === '' ? t('untitled') : shown)
    }

    /**
     * «В блокнот» in the chat header.
     *
     * Primary use: select a passage in the conversation, click, and the selection
     * becomes a note. With nothing selected the same button is the way into the
     * library, so it is never a dead control.
     */
    function HeaderNotebooksButton(props) {
      const t = props.t ?? ((key) => EN[key] ?? key)
      const [phase, setPhase] = React.useState('idle')
      const [ready, setReady] = React.useState(() => selectionText() !== '')
      const timer = React.useRef(null)
      React.useEffect(() => {
        const document_ = typeof document === 'undefined' ? null : document
        if (document_ === null) return undefined
        const update = () => {
          setReady(selectionText() !== '')
          setPhase('idle')
        }
        update()
        document_.addEventListener('selectionchange', update)
        return () => document_.removeEventListener('selectionchange', update)
      }, [])
      React.useEffect(() => () => {
        if (timer.current !== null) clearTimeout(timer.current)
      }, [])
      const flash = (next) => {
        setPhase(next)
        if (timer.current !== null) clearTimeout(timer.current)
        timer.current = setTimeout(() => setPhase('idle'), 1800)
      }
      const label = phase === 'saved' ? t('selectionSaved') : phase === 'error' ? t('selectionFailed') : t('selection')
      const hint = ready ? label : t('selectHint')
      return h(React.Fragment, null,
        h(Styles),
        h('button', {
        type: 'button',
        className: phase === 'saved' ? 'nb-head-btn ok' : phase === 'error' ? 'nb-head-btn err' : 'nb-head-btn',
        'data-notebooks-ui': '',
        disabled: !ready,
        title: hint,
        'aria-label': hint,
        onMouseDown: (event) => event.preventDefault(),
        onClick: () => {
          const text = selectionText()
          if (text === '') return
          createNote({
            title: firstLineOf(text) === '' ? t('untitled') : firstLineOf(text),
            content: text,
          })
            .then(() => {
              const document_ = typeof document === 'undefined' ? null : document
              document_?.getSelection()?.removeAllRanges()
              flash('saved')
            })
            .catch((error) => {
              console.warn('[dsh-notebooks] cannot save the selection:', error)
              flash('error')
            })
        },
      }, h(NotebooksIcon, { size: 16 })))
    }

    /**
     * «В блокнот» in one finalized assistant message's action row.
     *
     * The text of the message is read from the Chat snapshot: the Turn tail node
     * carries the closing message id and its content blocks, which is exactly the
     * pair the slot hands us (`messageId`).
     */
    function SaveMessageAction(props) {
      const t = props.t ?? ((key) => EN[key] ?? key)
      const text = props.useChat((snapshot) => assistantTextOfMessage(snapshot, props.messageId))
      const [saved, setSaved] = React.useState(false)
      const timer = React.useRef(null)
      React.useEffect(() => () => {
        if (timer.current !== null) clearTimeout(timer.current)
      }, [])
      const empty = text === ''
      const label = saved ? t('selectionSaved') : t('selection')
      return h(React.Fragment, null,
        h(Styles),
        h('button', {
        type: 'button',
        className: saved ? 'nb-action-btn ok' : 'nb-action-btn',
        'data-notebooks-ui': '',
        title: label,
        'aria-label': label,
        disabled: empty || saved,
        onClick: () => {
          if (empty) return
          createNote({
            title: firstLineOf(text) === '' ? t('untitled') : firstLineOf(text),
            content: text,
          })
            .then(() => {
              setSaved(true)
              if (timer.current !== null) clearTimeout(timer.current)
              timer.current = setTimeout(() => setSaved(false), 2200)
            })
            .catch((error) => console.warn('[dsh-notebooks] cannot save the message:', error))
        },
      }, h(NotebooksIcon, { size: 16 })))
    }

    /** The current selection's text, trimmed; an empty string when nothing usable is selected. */
    function selectionText() {
      if (typeof window === 'undefined') return ''
      const selection = window.getSelection()
      if (selection === null || selection.isCollapsed) return ''
      const text = selection.toString().trim()
      return text.length >= 2 ? text : ''
    }

    /**
     * One assistant message's text, found through the Chat snapshot's Turn tail.
     * @returns the Markdown/text body, or '' while the message is not finalized.
     */
    function assistantTextOfMessage(snapshot, messageId) {
      if (typeof messageId !== 'string' || snapshot === undefined || snapshot === null) return ''
      const order = Array.isArray(snapshot.order) ? snapshot.order : []
      const nodes = snapshot.nodes
      if (nodes === undefined || typeof nodes.get !== 'function') return ''
      for (const key of order) {
        const node = nodes.get(key)
        const data = node === undefined || node === null ? undefined : node.data
        const closing = data === undefined || data === null ? undefined : data.closing
        if (closing === undefined || closing === null) continue
        const final = closing.finalNode
        if (final === undefined || final.messageId !== messageId) continue
        const blocks = Array.isArray(closing.blocks) ? closing.blocks : []
        return blocks
          .filter((block) => block !== null && typeof block === 'object' && block.kind === 'text' && typeof block.text === 'string')
          .map((block) => block.text)
          .join('\n\n')
          .trim()
      }
      return ''
    }

    //#endregion

    //#region wiring
    /**
     * Open one note beside the chat.
     *
     * The tab type is registered only when the running page exposes the
     * right-sidebar services; on a page without them the caller falls back to
     * the library's own editor.
     *
     * @returns whether a right-hand tab was asked for.
     */
    function createOpener(ctx) {
      /**
       * Ask the right column for one note and report whether it really took it:
       * the column mounts its session seat asynchronously, so the answer is read
       * back from its open tabs instead of assumed.
       */
      return (id) => new Promise((resolve) => {
        const tabs = ctx.get('sidebarRightTabs')
        if (tabs === undefined || tabs === null || typeof tabs.get !== 'function') return resolve(false)
        const known = tabs.get('notebook') ?? tabs.get(TYPE_ID)
        if (known === undefined) return resolve(false)
        const right = ctx.get('sidebarRight')
        if (right === undefined || right === null || typeof right.openResource !== 'function') return resolve(false)
        const address = `${ADDRESS_PREFIX}${id}`
        let opened = false
        const open = () => {
          right.openResource(address, { kind: 'notebook', revealIfOpened: true })
          opened = true
        }
        try {
          ctx.get('layout')?.openRightbar?.(false, false)
        } catch {
          // The column may already be open, or another page owns it.
        }
        try {
          open()
        } catch (error) {
          console.warn('[dsh-notebooks] first open attempt failed, retrying:', error)
          setTimeout(() => {
            try {
              open()
            } catch (retryError) {
              console.warn('[dsh-notebooks] cannot open the note beside the chat:', retryError)
              resolve(false)
            }
          }, 250)
        }
        let attempts = 0
        const verify = () => {
          attempts += 1
          let rows = null
          try {
            rows = typeof right.openTabs?.getSnapshot === 'function' ? right.openTabs.getSnapshot() : null
          } catch {
            rows = null
          }
          const found = Array.isArray(rows) && rows.some((row) => row !== null && typeof row === 'object' && row.kind === 'notebook')
          if (found) return resolve(true)
          if (attempts >= 8) return resolve(false)
          return setTimeout(verify, 120)
        }
        if (opened) setTimeout(verify, 120)
      })
    }

    let openInRight = () => false

    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        const locale = ctx.locale ?? ctx.get('locale')
        if (locale !== undefined && locale !== null && typeof locale.register === 'function') {
          ctx.effect(() => locale.register(NS, { en: EN, ru: RU }), 'dsh-notebooks: dictionaries')
        }
        const t = locale !== undefined && locale !== null && typeof locale.bind === 'function'
          ? locale.bind(NS)
          : (key) => EN[key] ?? key
        openInRight = createOpener(ctx)

        // One failing seat must not take the other three down: every registration
        // is isolated, and a rejection is reported instead of thrown.
        const seat = (label, register) => {
          try {
            register()
          } catch (error) {
            console.warn(`[dsh-notebooks] cannot mount ${label}:`, error)
          }
        }

        seat('sidebar row', () => ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({
          name: 'sidebar.panellist',
          id: 'notebooks',
          order: 20,
          label: () => t('nav'),
        }, (owner) => h(NotebooksIcon, { size: owner?.size ?? 16, active: owner?.active }))))

        seat('library page', () => ctx.slots.inject('main', () => ctx.slots.register({
          name: 'main',
          key: 'notebooks',
        }, () => h(LibraryPage, { t, pickDirectory: () => {
          try {
            const workspace = ctx.get('uiWorkspace')
            return workspace !== undefined && workspace !== null && typeof workspace.pickDirectory === 'function'
              ? workspace.pickDirectory()
              : Promise.resolve(null)
          } catch {
            return Promise.resolve(null)
          }
        } }))))

        seat('note tab', () => ctx.inject(['sidebarRightTabs'], (scoped) => {
          registerNoteType(scoped, t)
          scoped.slots.inject('sidebar.right.pane.tab', () => scoped.slots.register({
            name: 'sidebar.right.pane.tab',
            key: TYPE_ID,
          }, (props) => h(NoteTabBody, { ...props, t })))
          scoped.slots.inject('sidebar.right.pane.tab.title', () => scoped.slots.register({
            name: 'sidebar.right.pane.tab.title',
            key: TYPE_ID,
          }, (props) => h(NoteTabTitle, { ...props, t })))
        }))

        seat('chat header', () => ctx.slots.inject('conversation.session.header.utilities', () => ctx.slots.register({
          name: 'conversation.session.header.utilities',
          id: 'notebooks',
          order: 5,
          label: () => t('selection'),
          locale: NS,
        }, (props) => h(HeaderNotebooksButton, { ...props, t }))))

        seat('message action', () => ctx.slots.inject('conversation.chat.assistant-actions', () => ctx.slots.register({
          name: 'conversation.chat.assistant-actions',
          id: 'notebooks',
          order: 20,
          locale: NS,
        }, (props) => h(SaveMessageAction, { ...props, t }))))

        console.log('[dsh-notebooks] client mounted')
      },

    }

    /** Register the `notebook` tab type when the right sidebar exposes its registry. */
    function registerNoteType(ctx, t) {
      const tabs = ctx.get('sidebarRightTabs')
      if (tabs === undefined || tabs === null || typeof tabs.register !== 'function') return
      ctx.effect(() => {
        let dispose
        const definition = {
          id: TYPE_ID,
          kind: 'notebook',
          keepMounted: false,
          patterns: [`${ADDRESS_PREFIX_STEM}/**`],
          canOpen: (address) => typeof address === 'string' && address.startsWith(ADDRESS_PREFIX),
          priority: 'extension',
          title: (address) => {
            const id = idOfAddress(address)
            return titles.get(id) ?? t('nav')
          },
        }
        try {
          dispose = tabs.register(definition)
        } catch (error) {
          // A registry with a narrower contract still gets a minimal definition.
          try {
            dispose = tabs.register({ id: TYPE_ID, kind: 'notebook', title: definition.title })
          } catch (fallbackError) {
            console.warn('[dsh-notebooks] cannot register the note tab type:', error, fallbackError)
          }
        }
        return () => {
          if (typeof dispose === 'function') {
            try {
              dispose()
            } catch {
              // The registry is already gone; nothing to release.
            }
          }
        }
      }, 'dsh-notebooks: note tab type')
    }
    //#endregion
  },
})
