/**
 * Records a walkthrough video of the live demo dashboard with Playwright:
 * a scripted browser clicks through Overview → Realtime → Events → Funnels
 * → Revenue → Performance with a visible cursor dot and smooth scrolling.
 *
 * Run from a folder with playwright installed (it is not a dependency of
 * this site):
 *   npm i playwright && npx playwright install chromium
 *   node record-walkthrough.mjs
 *
 * Output: ./video/<hash>.webm — convert with:
 *   ffmpeg -i video/*.webm -c:v libx264 -preset slow -crf 20 \
 *     -pix_fmt yuv420p -movflags +faststart walkthrough.mp4
 */
import { chromium } from "playwright"

const BASE = "https://app.kobbe.io/demo/kobbe-studio?range=30d"
const W = 1600
const H = 900

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const browser = await chromium.launch()
const context = await browser.newContext({
  viewport: { width: W, height: H },
  deviceScaleFactor: 2,
  // A regular Chrome UA: the demo returns 403 to bot/headless user agents.
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
  recordVideo: { dir: "video", size: { width: W, height: H } },
})
const page = await context.newPage()

// Fake cursor overlay so clicks are visible in the recording.
await page.addInitScript(() => {
  window.addEventListener("DOMContentLoaded", () => {
    const dot = document.createElement("div")
    dot.id = "__pwcursor"
    dot.style.cssText = [
      "position:fixed",
      "z-index:2147483647",
      "width:22px",
      "height:22px",
      "border-radius:9999px",
      "background:rgba(43,43,43,0.85)",
      "border:2.5px solid #fff",
      "box-shadow:0 1px 6px rgba(0,0,0,0.35)",
      "pointer-events:none",
      "left:-50px",
      "top:-50px",
      "transform:translate(-50%,-50%)",
      "transition:width .12s,height .12s",
    ].join(";")
    document.body.appendChild(dot)
    window.addEventListener(
      "mousemove",
      (e) => {
        dot.style.left = e.clientX + "px"
        dot.style.top = e.clientY + "px"
      },
      { passive: true }
    )
    window.addEventListener("mousedown", () => {
      dot.style.width = "16px"
      dot.style.height = "16px"
    })
    window.addEventListener("mouseup", () => {
      dot.style.width = "22px"
      dot.style.height = "22px"
    })
  })
})

async function moveTo(x, y, steps = 40) {
  await page.mouse.move(x, y, { steps })
}

async function clickTarget(locator) {
  const box = await locator.boundingBox()
  if (!box) throw new Error("no bounding box")
  await moveTo(box.x + box.width / 2, box.y + box.height / 2)
  await sleep(350)
  await page.mouse.down()
  await sleep(90)
  await page.mouse.up()
}

async function smoothScroll(px, stepPx = 14, delay = 12) {
  const steps = Math.round(Math.abs(px) / stepPx)
  const dir = px > 0 ? stepPx : -stepPx
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, dir)
    await sleep(delay)
  }
}

async function visitSection(label, { scrollDown = 900, dwell = 2200 } = {}) {
  const link = page.locator(`a:has-text("${label}")`).first()
  await clickTarget(link)
  await page.waitForLoadState("networkidle").catch(() => {})
  await sleep(dwell)
  if (scrollDown > 0) {
    await smoothScroll(scrollDown)
    await sleep(1400)
    await smoothScroll(-scrollDown)
    await sleep(800)
  }
}

console.log("navigating…")
await page.goto(BASE, { waitUntil: "networkidle", timeout: 60000 })
await sleep(1500)

// Dismiss the product tour if it shows up.
const skip = page.locator('button:has-text("Skip")').first()
if (await skip.isVisible().catch(() => false)) {
  await clickTarget(skip)
  await sleep(800)
}

// Park the cursor somewhere natural.
await moveTo(W / 2, H / 2, 30)

// 1. Overview: dwell, then scroll through the cards and back.
await sleep(2500)
await smoothScroll(1400)
await sleep(1600)
await smoothScroll(-1400)
await sleep(1000)

// 2–6. Walk the site sections via the sidebar.
await visitSection("Realtime", { scrollDown: 600 })
await visitSection("Events", { scrollDown: 700 })
await visitSection("Funnels", { scrollDown: 700, dwell: 3000 })
await visitSection("Revenue", { scrollDown: 900 })
await visitSection("Performance", { scrollDown: 900 })

// Close on the overview.
await visitSection("Overview", { scrollDown: 0, dwell: 3000 })

await context.close()
await browser.close()
console.log("done")
