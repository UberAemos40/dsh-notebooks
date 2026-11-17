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

    // @vendor-markdown-it

    // @vendor-highlight

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
