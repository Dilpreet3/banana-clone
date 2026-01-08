const prompts = [
  {
    title: "YouTube Script Generator",
    text: "Write a viral YouTube script on [topic] with a strong hook and storytelling."
  },
  {
    title: "Instagram Caption",
    text: "Create a short engaging Instagram caption for a post about [topic]."
  },
  {
    title: "AI Image Prompt",
    text: "Create a cinematic AI image prompt for [scene], ultra realistic, 4k."
  },
  {
    title: "Business Idea Generator",
    text: "Generate 5 profitable online business ideas for beginners in 2026."
  }
];

const container = document.getElementById("promptContainer");
const search = document.getElementById("search");

function renderPrompts(data) {
  container.innerHTML = "";
  data.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${p.title}</h3>
      <p>${p.text}</p>
      <button class="copy-btn">Copy Prompt</button>
    `;
    card.querySelector("button").onclick = () => {
      navigator.clipboard.writeText(p.text);
      card.querySelector("button").innerText = "Copied!";
      setTimeout(() => card.querySelector("button").innerText = "Copy Prompt", 1200);
    };
    container.appendChild(card);
  });
}

search.addEventListener("input", () => {
  const value = search.value.toLowerCase();
  const filtered = prompts.filter(p =>
    p.title.toLowerCase().includes(value) ||
    p.text.toLowerCase().includes(value)
  );
  renderPrompts(filtered);
});

renderPrompts(prompts);
