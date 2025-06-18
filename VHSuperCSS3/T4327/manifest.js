const nome = prompt("🏷️ Nome do App:", document.title);
const shortName = nome.slice(0, 12);
const startURL = prompt("🌐 Início da URL:", location.origin + "/");
const display = prompt("⏹️ Display:\n0 - standalone\n1 - fullscreen\n2 - minimal-ui\n3 - browser", "0");
const mascaravel = confirm("❇️ Mascaravel:");

const vjmanifest = {
  "name": nome,
  "short_name": shortName,
  "start_url": startURL,
  "display": ["standalone", "fullscreen", "minimal-ui", "browser"][display] ?? "standalone",
  "icons": [
    {
      "type": "image/png",
      "src": "",
      "sizes": "32x32",
      "purpose": "any" + mascaravel ? " mascable" : ""
    }
  ]
}