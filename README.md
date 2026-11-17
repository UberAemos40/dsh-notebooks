# dsh-notebooks

Local Markdown notebooks for DeepSeek Harness: a sidebar library, right-sidebar note tabs, and the agent tools `notebook_save`, `notebook_list`, `notebook_read` that store chat summaries as .md notes.

DSH bundle (DeepSeek Harness plugin). Host side in `index.js`, optional Web UI in `client.js` / `client.bundle.js`,
loaded through `cordis.patch.yml` (`dsh.bundle.patch` in package.json).

## Install

In DSH, open **Plugins** and install from a git source:

```
github:UberAemos40/dsh-notebooks
```

No build step is needed: the compiled client bundle is committed.
After installing, enable the bundle and refresh the page (a restart is needed if the host side changed).

## Requirements

- A DSH build with a Web client of the same generation (`@deepseek-ai/dsh-client-*` packages).
- Nothing else: no registry, no extra dependencies.

## Data

Notes are stored inside the DSH profile (`notebooks/`), so every install keeps its own library.
Nothing is sent anywhere.
