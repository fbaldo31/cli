import { generateFromUrl } from "./render.utils.ts";
const { args } = Deno;
const encoder = new TextEncoder();

const indexUrl =
  "https://raw.githubusercontent.com/alosaur/cli/main/templates/swagger-ui/index.html.template";

const baseUrl = "https://unpkg.com/swagger-ui";
const swagerUiVersion = "3.45.1";
const SWAGGERUI_FILES = [
    "favicon-16x16.png",
    "favicon-32x32.png",
    "oauth2-redirect.html",
    "swagger-ui-bundle.js",
    "swagger-ui-bundle.js.map",
    "swagger-ui-standalone-preset.js",
    "swagger-ui-standalone-preset.js.amp",
    "swagger-ui.css",
    "swagger-ui.css.map",
];

export async function openapi() {
    const serverUrl = args[1];

    if (!serverUrl) {
        console.error("Server url not found");
    }
    // Generate index.html
    const body = await fetch(indexUrl).then((r) => r.text());
    await generateFromUrl(indexUrl, body, serverUrl);
    
    const targetFolder = args[2] || 'swagger-ui';
    await downloadSwaggerUiFiles(targetFolder);
}

/**
 * Download swagger-ui files except index.html (a template is used)
 */
async function downloadSwaggerUiFiles(targetFolder: string) {
    for (const file of SWAGGERUI_FILES) {
        const url = `${baseUrl}@${swagerUiVersion}/dist/${file}`;
        const body = await fetch(url).then((r) => r.text());

        Deno.writeTextFile(`${Deno.cwd()}/${targetFolder}/${file}`, body);
    }
}
