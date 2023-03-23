import fs from "fs";
import jsdom from 'jsdom';
import puppeteer from "puppeteer";
const { JSDOM } = jsdom;

const htmlFile = fs.readFileSync('example.html', "utf-8");
const dom1 = new JSDOM(htmlFile);
const document = dom1.window.document;

const anchors = document.querySelectorAll('.card__main a');
console.log(`Found ${anchors.length} anchors`);

for (let i = 0; i < 7; i++) {
    console.log(anchors[i].href);

    puppeteer
        .launch({
            defaultViewport: {
                width: 1100,
                height: 900,
            },
        })
        .then(async (browser) => {
            const page = await browser.newPage();
            await page.goto(anchors[i].href);
            page.setDefaultNavigationTimeout(120000);
            setTimeout(async () => {
                await page.screenshot({ path: "inputs/input" + i + ".png" });
                await browser.close();
            }, 40000);
        });
    console.log("anchor" + i + "done");
}
