async function main():Promise<void> {
  const response = await fetch(new URL('api/hello', document.baseURI));
  const result = await response.json();

  const p = document.createElement("p");
  p.innerText = result.message
  document.body.appendChild(p);
}

void main().catch(console.error);
