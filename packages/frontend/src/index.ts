/**
 * Entry point of the plugin frontend.
 *
 * Calls the plugin's backend `api/hello` endpoint and appends its `message` to
 * the page body.
 */
async function main():Promise<void> {
  const response = await fetch(new URL('api/hello', document.baseURI));
  const result = await response.json();

  const p = document.createElement("p");
  p.innerText = result.message
  document.body.appendChild(p);
}

void main().catch(console.error);
