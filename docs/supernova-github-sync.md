# Supernova → GitHub Sync

This guide explains how to connect Supernova to GitHub so that design tokens are automatically exported to this repository whenever they change.

No coding required — everything is done inside the Supernova interface.

---

## How it works

Supernova has a built-in **Code Output** feature. You configure an exporter (e.g. CSS variables or JSON), point it at your GitHub repo, and Supernova will push a file to the repo automatically each time tokens are updated.

---

## Setup steps

### 1. Open Code Output in Supernova

1. Go to your [Supernova workspace](https://app.supernova.io/711966-pepperstone/764138-pepper-design-system-v-2/803332-shared-draft/810225-default/overview)
2. In the left sidebar, click **Code** (or **Exporters**)
3. Click **+ Add Exporter**

### 2. Choose an exporter format

Pick the format that best fits what you need:

| Format | Best for |
|--------|----------|
| **CSS Variables** | Web/front-end developers using CSS |
| **JSON (W3C DTCG)** | Tools that consume standard token format |
| **Style Dictionary** | Advanced token pipelines |

If unsure, start with **CSS Variables** — it's the most universally useful.

### 3. Connect GitHub

1. After selecting your exporter, go to the **Destination** step
2. Choose **GitHub** as the output destination
3. Click **Connect GitHub** and authorise Supernova to access your account
4. Select your repository: `jh-foong/pepper-ds`
5. Set the **branch** (e.g. `main`)
6. Set the **output path** — where in the repo the token file will be written (e.g. `tokens/tokens.css`)

### 4. Configure sync trigger

Choose when Supernova should push to GitHub:

- **Manual** — you click "Export" inside Supernova each time
- **On publish** — triggers automatically when you publish a new version in Supernova

Start with **Manual** so you stay in control while getting set up.

### 5. Run your first export

Click **Export** (or **Publish**) to trigger the first sync. After a few seconds, check your GitHub repo — you should see a new commit with the token file.

---

## After setup

Once the sync is working:

- Token changes made in Figma → synced to Supernova → pushed to GitHub automatically (if using "on publish" mode)
- Developers can pull the latest token file directly from the repo
- No manual copying or sharing of token values needed

---

## Troubleshooting

| Problem | What to check |
|---------|---------------|
| GitHub not connecting | Make sure you authorise the correct GitHub account |
| File not appearing in repo | Check the output path — folder must already exist, or use the repo root |
| Wrong token values | Check that the correct **version** is selected in Supernova before exporting |

---

## Questions?

Ask in `#design-system` on Slack or open an issue in [GitHub](https://github.com/jh-foong/pepper-ds).
