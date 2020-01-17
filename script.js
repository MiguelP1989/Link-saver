const linkCategory = document.querySelector("#linkCategory");
const submitBtn = document.querySelector("#submitBtn");
const addBtn = document.querySelector("#addBtn");
const cancelBtn = document.querySelector("#canceltBtn");
const addLinkPanel = document.querySelector("#addLinkPanel");
const linklist = document.querySelector("#linkList");
const addedCategory = document.querySelector("#addCategories");
const clear = document.querySelector(".clear");
const addLinkContainer = document.querySelector("#addLinkContainer");

let linkCategories = [];
let links = [];

// not edit anything by default
let editIndex = -1;
let id;

let data = localStorage.getItem("TODO");
if (data) {
  links = JSON.parse(data);
  clear.classList.remove("clear");
  displayLinks();
}

clear.addEventListener("click", () => {
  console.log("clicking");
  localStorage.clear();
  location.reload();
});

addBtn.addEventListener("click", e => {
  console.log("clicking");
  showFormPanel();
});

cancelBtn.addEventListener("click", e => {
  e.preventDefault();
  console.log("clicking");
  hideFormPanel();
});

// console.log(addLinkPanel.classList);
function showFormPanel() {
  addLinkContainer.classList.remove("hidden");
  displayLinkCategories();
}

function hideFormPanel() {
  addLinkContainer.classList.add("hidden");
  clearLinkForm();
}

linkCategory.addEventListener("keydown", function(e) {
  if (event.keyCode === 188) {
    event.preventDefault();
    // console.log("user press coma");
    // console.log("LINKCATEGORY VALUE", linkCategory.value);

    linkCategories.push(linkCategory.value);
    // console.log("linkCategoriees", linkCategories);

    linkCategory.value = "";

    // display categories in the screen
    displayLinkCategories();
  }
});

function displayLinkCategories() {
  console.log("Display linkCategories");
  addedCategory.innerHTML = "";
  for (let category of linkCategories) {
    let categoryHTMLstring = `<span class="category">${category}</span>`;

    addedCategory.innerHTML += categoryHTMLstring;
  }
}

function clearLinkForm() {
  linkTitle.value = "";
  linkURL.value = "";
  linkCategory.value = "";
  linkCategories = [];
  addCategories.innerHTML = "";
}

submitBtn.addEventListener("click", e => {
  // stop from submitting
  e.preventDefault();
  console.log("submit press");
  const title = linkTitle.value;
  const url = linkURL.value;
  const categories = linkCategories;
  let date = new Date();
  const newlink = {
    title,
    url,
    categories,
    date: formatDate(date)
  };
  console.log("newlink", newlink);

  if (editIndex === -1) {
    // push new link to array
    links.unshift(newlink);
  } else {
    links[editIndex] = newlink;
    editIndex = -1;
  }

  if (links.length === 0) {
    clear.classList.add("clear");
  } else {
    clear.classList.remove("clear");
  }
  // push  new links to an array
  // links.unshift(newlink);
  // console.log("links", links);

  // empty the user input
  clearLinkForm();
  displayLinkCategories();
  // hide the form addLinkPanel
  hideFormPanel();
  displayLinks();
  localStorage.setItem("TODO", JSON.stringify(links));
});

function displayLinks() {
  console.log(linkList);
  linklist.innerHTML = "";
  let index = 0;

  for (let link of links) {
    let linkHTMLString = `
    <div class="flex-item">
        <div class="link panel">
          <div class="link-options">
            <button class="btn-small" onClick="deleteLink(${index})">Delete</button>
            <button class="btn-small" onClick="editLink(${index})">Edit</button>
          </div>

          <a href="${link.url}">
          <h1 class="header">${link.title}</h1>
          </a>

          <p class="link-date">${link.date}</p>
          <div class="categories">
            Categories:`;
    for (let category of link.categories) {
      linkHTMLString += `<span class="category">${category}</span>`;
    }
    linkHTMLString += `
            </div>
            </div>
            </div>`;

    linklist.innerHTML += linkHTMLString;
    index++;
  }
}
function deleteLink(index) {
  console.log("Deleting link of index", index);
  links.splice(index, 1);
  console.log(links);
  // update the links on screen
  displayLinks();
  if (links.length == 0) {
    clear.classList.add("clear");
  }
  localStorage.setItem("TODO", JSON.stringify(links));
}

function editLink(index) {
  console.log("edit link of index", index);
  editIndex = index;

  linkTitle.value = links[index].title;
  linkURL.value = links[index].url;
  linkCategories = links[index].categories;
  showFormPanel();
}

function formatDate(date) {
  return `${("0" + (date.getMonth() + 1)).slice(-2)}/${(
    "0" + date.getDay()
  ).slice(-2)}/${date.getFullYear()}`;
}
