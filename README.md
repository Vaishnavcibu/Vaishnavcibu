> Save this file in your **Vaishnavcibu/Vaishnavcibu** repo at exactly this path:
>
> `.github/workflows/snake.yml`
>
> On GitHub: **Add file → Create new file**, type `.github/workflows/snake.yml` as the
> filename, paste the YAML below (everything after this line), and commit.
> Then open the **Actions** tab and click **Run workflow** once to generate it immediately.

```yaml
name: Generate snake

on:
  schedule:
    - cron: "0 */12 * * *"
  workflow_dispatch:
  push:
    branches:
      - master

jobs:
  generate:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - name: Generate snake animation
        uses: Platane/snk@v3
        id: snake-gif
        with:
          github_user_name: ${{ github.repository_owner }}
          outputs: |
            dist/snake.svg?palette=github-dark&color_snake=#E10600&color_dots=#070707,#4a0200,#8a0300,#c40500,#E10600

      - name: Push to output branch
        uses: crazy-max/ghaction-github-pages@v4
        with:
          target_branch: output
          build_dir: dist
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
