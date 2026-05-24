// When ?test=1 is present in the page URL, n8n production webhook URLs are
// rewritten to their /webhook-test/ equivalents. n8n's test URLs only fire
// when "Listen for test event" is clicked in the editor — they let Danny
// inspect the live payload in the n8n canvas without writing to Attio/Notion.
// See Webhook-endpoints.md for the full spec.

export function isTestMode(): boolean {
  if (typeof window === "undefined") return false;
  return new URL(window.location.href).searchParams.get("test") === "1";
}

export function resolveWebhookUrl(productionUrl: string): string {
  return isTestMode()
    ? productionUrl.replace("/webhook/", "/webhook-test/")
    : productionUrl;
}
