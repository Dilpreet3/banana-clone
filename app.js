const list = document.getElementById("promptList");
const search = document.getElementById("search");

if (list) {
  db.collection("prompts").onSnapshot(snapshot => {
    list.innerHTML = "";
    snapshot.forEach(doc => {
      const d = doc.data();
      list.innerHTML += `
        <div class="card">
          <h3>${d.title}</h3>
          <p>${d.prompt.substring(0, 80)}...</p>
          <a href="prompt.html?id=${doc.id}">View</a>
        </div>
      `;
    });
  });
}

function submitPrompt() {
  db.collection("prompts").add({
    title: title.value,
    prompt: prompt.value,
    tags: tags.value,
    created: new Date()
  }).then(() => {
    alert("Prompt submitted!");
    location.href = "index.html";
  });
}

const params = new URLSearchParams(location.search);
if (params.get("id")) {
  db.collection("prompts").doc(params.get("id")).get().then(doc => {
    const d = doc.data();
    document.getElementById("promptBox").innerHTML = `
      <h2>${d.title}</h2>
      <pre>${d.prompt}</pre>
      <button onclick="navigator.clipboard.writeText(\`${d.prompt}\`)">Copy Prompt</button>
    `;
  });
}
