const form = document.getElementById("form");
const main = document.getElementById("main");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const input_name = form.elements["search"].value;
  form.elements["search"].value = "";
  getUserDetails(input_name);
});

async function getUserDetails(username) {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const data = await response.json();
  createUserCard(data);
}

function createUserCard(data) {
  if (data.message === "Not Found") {
    main.innerHTML = "<p>User does not exists!</p>";
    return;
  }

  const card = `
    <a class="card" href="${data.html_url}" target="_blank">
      <img src='${data.avatar_url}' />
      <div>
        <h3>${data.name}</h3>
        <p>${data.bio}</p>
        <ul>
          <li><b>Followers:</b> ${data.followers}</li>
          <li><b>Following:</b> ${data.following}</li>
          <li><b>Repos:</b> ${data.public_repos}</li>
        </ul>
        <ul>
          ${
            data.twitter_username
              ? `<li><b>Twitter:</b> ${data.twitter_username}</li>`
              : ""
          }
          ${data.location ? `<li><b>Location:</b> ${data.location}</li>` : ""}
        </ul>
      </div>
    </a>
  `;

  main.innerHTML = card;
}

window.addEventListener("load", () => {
  getUserDetails("shubham-126");
});