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

<<<<<<< HEAD
```console
┌─ SYSTEM ────────────────────────────────────────────────────────┐
│                                                                 │
│   USER        vaishnav_cibu                                     │
│   ROLE        founder · full-stack + ai · product               │
│   COMPANY     corezentric technologies llp        [ACY-6591]    │
│   PRODUCT     CORE  →  hoardgrid · hoardbook                    │
│   STACK       flutter · node · react · mongo · openai           │
│   LOCATION    kerala, in                            [UTC+5:30]  │
│   STATUS      ● building — open to work                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## `01://ABOUT`

> **I don't just build software — I build products that solve real business problems.**

- 🔴 &nbsp;Founder of **Corezentric Technologies LLP**, building **CORE** — the operating system for OOH advertising
- ⚙️ &nbsp;Full stack + AI: Flutter, Node, React, MongoDB, OpenAI APIs
- 🧠 &nbsp;Currently deep in **LLM integrations, OCR pipelines and multi-tenant SaaS**
- 📍 &nbsp;Kerala, India — open to freelance and founding-engineer work
- 💬 &nbsp;Ask me about shipping an MVP that survives real users

Great software isn't defined by elegant code alone. It's measured by the value it creates for users and businesses.

---

## `02://COMPANY`

**Corezentric Technologies LLP** — building **CORE**, an OOH advertising platform for hoarding and digital-billboard operators in Kerala, replacing spreadsheet guesswork with real inventory, campaign and billing management.

| SPEC | VALUE |
| :--- | :--- |
| Role | Founder |
| Founded | 2026 |
| Entity | LLP · `ACY-6591` |
| Products | Hoardgrid · Hoardbook |
| Vision | The operating system for the OOH advertising industry |

---

## `03://BUILDING`

| # | PROJECT | WHAT IT IS | STACK |
| :-- | :--- | :--- | :--- |
| 01 | **HoardGrid** | Management SaaS for billboard owners — inventory, clients, campaigns, revenue | React · Node · MongoDB |
| 02 | **HoardBook** | Marketplace for discovering, comparing and booking outdoor ad space | React · Node · MongoDB |
| 03 | **Review2Reward** | QR platform that collects authentic Google reviews and rewards customers instantly | Flutter · Node · MongoDB |
| 04 | **LinkedOut** | Swipe-based recruitment platform with AI-powered candidate matching | Flutter · Node · OpenAI |
| 05 | **OCR Bill Extractor** | Offline OCR that turns printed bills into structured data — nothing leaves the device | Flutter · ML Kit · Tesseract |
| 06 | **NFC Smart Cycle Booking** | NFC authentication for secure campus bicycle booking — tap to unlock, tap to return | Flutter · NFC · Firebase |

<details>
<summary><b>&nbsp;CASE STUDY — HoardGrid&nbsp;</b></summary>
<br />

**Problem.** Billboard operators run a high-value asset business on WhatsApp and spreadsheets. Double bookings, expired contracts and unbilled campaigns leak revenue every month, and nobody can answer "what is occupied right now?"

**Approach.** Model the hoarding as inventory with a time dimension. One record per site, campaigns as date-bounded reservations against it, contracts and invoices generated from the same source of truth so billing can't drift from occupancy.

**Result.** A single dashboard where an operator sees live occupancy, upcoming vacancies and outstanding invoices — the operator half of the CORE platform.

</details>

<details>
<summary><b>&nbsp;CASE STUDY — HoardBook&nbsp;</b></summary>
<br />

**Problem.** Buying outdoor advertising means calling brokers, waiting on photos, and taking price on trust. There is no way to compare two sites side by side.

**Approach.** Put verified inventory from HoardGrid operators into a public marketplace — discovery, comparison, booking and payment in one flow, with the vendor dashboard writing back to the same inventory.

**Result.** The demand half of CORE: advertisers self-serve, operators fill vacancies without a broker in the middle.

</details>

---

## `04://STACK`

<div align="center">
<img src="https://skillicons.dev/icons?i=flutter,dart,js,python,java,html,css&theme=dark" alt="" />
<br />
<img src="https://skillicons.dev/icons?i=react,nodejs,express,bootstrap,mongodb,mysql,firebase&theme=dark" alt="" />
<br />
<img src="https://skillicons.dev/icons?i=git,github,vscode,androidstudio,postman,figma,docker,linux&theme=dark" alt="" />
</div>

<div align="center">
<img src="https://img.shields.io/badge/OpenAI_APIs-070707?style=flat-square&logo=openai&logoColor=E10600" alt="" />
<img src="https://img.shields.io/badge/LLMs-070707?style=flat-square&logoColor=E10600" alt="" />
<img src="https://img.shields.io/badge/OCR-070707?style=flat-square&logoColor=E10600" alt="" />
<img src="https://img.shields.io/badge/Computer_Vision-070707?style=flat-square&logo=opencv&logoColor=E10600" alt="" />
<img src="https://img.shields.io/badge/Prompt_Engineering-070707?style=flat-square&logoColor=E10600" alt="" />
<img src="https://img.shields.io/badge/Automation-070707?style=flat-square&logoColor=E10600" alt="" />
</div>

---

## `05://FOCUS`

```text
PRODUCT ENGINEERING   ████████████████░░░░░░░░   60%
AI INTEGRATION        ██████░░░░░░░░░░░░░░░░░░   25%
DESIGN / UX           ████░░░░░░░░░░░░░░░░░░░░   15%

NOW          CORE platform — multi-tenant billing + contracts
NEXT         Hoardbook marketplace, public beta
LEARNING     Distributed systems · vector search · Docker in prod
```

---

## `06://NUMBERS`

<div align="center">
<img height="165" src="https://github-readme-stats.vercel.app/api?username=Vaishnavcibu&show_icons=true&hide_border=true&include_all_commits=true&bg_color=070707&title_color=E10600&icon_color=E10600&text_color=F2EFE9&ring_color=E10600" alt="" />
<img height="165" src="https://github-readme-stats.vercel.app/api/top-langs/?username=Vaishnavcibu&layout=compact&hide_border=true&langs_count=8&bg_color=070707&title_color=E10600&text_color=F2EFE9" alt="" />
</div>

<div align="center">
<img src="https://streak-stats.demolab.com?user=Vaishnavcibu&hide_border=true&background=070707&stroke=E10600&ring=E10600&fire=E10600&currStreakLabel=E10600&sideLabels=F2EFE9&currStreakNum=F2EFE9&sideNums=F2EFE9&dates=6E6E6E" alt="" />
</div>

<div align="center">
<img src="https://github-profile-trophy.vercel.app/?username=Vaishnavcibu&theme=darkhub&no-frame=true&no-bg=true&column=7&margin-w=6&margin-h=6" alt="" />
</div>

<div align="center">
<img src="https://github-readme-activity-graph.vercel.app/graph?username=Vaishnavcibu&bg_color=070707&color=F2EFE9&title_color=E10600&line=E10600&point=E10600&area=true&area_color=E10600&hide_border=true" alt="" />
</div>

---

## `07://CONTRIBUTIONS`

<div align="center">
<img src="https://raw.githubusercontent.com/Vaishnavcibu/Vaishnavcibu/output/snake.svg" alt="" />
</div>

---

## `08://PROCESS`

```text
01 DISCOVERY  →  02 PRODUCT DESIGN  →  03 DEVELOPMENT  →  04 DEPLOYMENT  →  05 IMPROVEMENT
```

Discovery before design, design before code, and improvement that never really stops.

---

## `09://CONTACT`

<div align="center">
<b>Let's build something extraordinary.</b>
<br /><br />
<a href="mailto:vaishnavcibu@gmail.com"><img src="https://img.shields.io/badge/EMAIL-E10600?style=for-the-badge&logo=gmail&logoColor=white&labelColor=E10600" alt="" /></a>
<a href="https://www.linkedin.com/in/vaishnav-cibu-5766b2278/"><img src="https://img.shields.io/badge/LINKEDIN-070707?style=for-the-badge&logo=linkedin&logoColor=E10600&labelColor=070707" alt="" /></a>
<a href="https://github.com/Vaishnavcibu"><img src="https://img.shields.io/badge/GITHUB-070707?style=for-the-badge&logo=github&logoColor=E10600&labelColor=070707" alt="" /></a>
</div>

<div align="center">
<img src="https://capsule-render.vercel.app/api?type=rect&color=0:E10600,100:070707&height=90&section=footer&text=FOUNDER%20%C2%B7%20COREZENTRIC%20TECHNOLOGIES%20LLP&fontSize=15&fontColor=F2EFE9&fontAlignY=62" width="100%" />
</div>
=======
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
>>>>>>> e0d5e065b35de95db6dfd67d67c99c3058e16348
