import { ask, closePrompt } from "./prompt.js";
import { getToken, saveToken } from "./config.js";
import { ENDPOINTS as AUTH_ENDPOINTS } from "./endpoints/auth.js";
import { ENDPOINTS as CONTACTS_ENDPOINTS } from "./endpoints/contacts.js";
import { ENDPOINTS as AVATAR_ENDPOINTS } from "./endpoints/avatar.js";

const SECTIONS = [
  { title: "Auth", endpoints: AUTH_ENDPOINTS },
  { title: "Avatar", endpoints: AVATAR_ENDPOINTS },
  { title: "Contacts", endpoints: CONTACTS_ENDPOINTS },
];

const ALL_ITEMS = SECTIONS.flatMap((s) => s.endpoints);

function printMenu() {
  const token = getToken();
  const tokenInfo = token ? `${token.slice(0, 28)}...` : "not set";

  console.log("\n" + "=".repeat(58));
  console.log("  API Tester CLI  |  http://localhost:3000");
  console.log("=".repeat(58));
  console.log(`  Token: ${tokenInfo}`);
  console.log("=".repeat(58));

  let num = 1;
  for (const section of SECTIONS) {
    console.log(`\n  [ ${section.title} ]`);
    for (const ep of section.endpoints) {
      console.log(`  ${String(num).padStart(2, " ")}. ${ep.label}`);
      num++;
    }
  }

  console.log("\n  [ Token ]");
  console.log(`  ${String(num).padStart(2, " ")}. Set Bearer token manually`);
  console.log("\n   0. Exit");
  console.log("");
}

async function setTokenManually() {
  const token = await ask("  Paste Bearer token: ");
  const trimmed = token.trim();
  if (!trimmed) {
    console.log("  No input received. Token unchanged.");
    return;
  }
  saveToken(trimmed);
  console.log("  Token saved.");
}

async function main() {
  const setTokenItemNumber = ALL_ITEMS.length + 1;

  while (true) {
    printMenu();

    const input = await ask("Select option: ");
    const choice = parseInt(input.trim(), 10);

    if (isNaN(choice)) {
      console.log("\n  Invalid input — enter a number.");
      continue;
    }

    if (choice === 0) {
      console.log("\n  Bye!\n");
      break;
    }

    if (choice === setTokenItemNumber) {
      await setTokenManually();
      continue;
    }

    if (choice < 1 || choice > ALL_ITEMS.length) {
      console.log("\n  Option not in list — try again.");
      continue;
    }

    const endpoint = ALL_ITEMS[choice - 1];
    console.log(`\n  >> ${endpoint.label}`);
    await endpoint.handler();

    await ask("\nPress Enter to return to menu...");
  }

  closePrompt();
  process.exit(0);
}

main();
