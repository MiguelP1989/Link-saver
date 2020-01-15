const linkCategory = document.querySelector("#linkCategory");
const submitBtn = document.querySelector("#submitBtn");
const addBtn = document.querySelector("#addBtn");
const cancelBtn = document.querySelector("#canceltBtn");
const addLinkPanel = document.querySelector("#addLinkPanel");
const linklist = document.querySelector("#linkList");
const addedCategory = document.querySelector("#addCategories");

let linkCategories = [];
let links = [];

// not edit anything by default
let editIndex = -1;

displayLinks();

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
  addLinkPanel.classList.remove("hidden");
  displayLinkCategories();
}

function hideFormPanel() {
  addLinkPanel.classList.add("hidden");
  clearLinkForm();
}

linkCategory.addEventListener("keydown", function(e) {
  if (event.keyCode === 188) {
    event.preventDefault();
    console.log("user press coma");
    console.log("LINKCATEGORY VALUE", linkCategory.value);

    linkCategories.push(linkCategory.value);
    console.log("linkCategoriees", linkCategories);

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

  const newlink = {
    title,
    url,
    categories
  };
  console.log("newlink", newlink);

  if (editIndex === -1) {
    // push new link to array
    links.unshift(newlink);
  } else {
    links[editIndex] = newlink;
    editIndex = -1;
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
});

function displayLinks() {
  console.log(linkList);
  linklist.innerHTML = "";
  let index = 0;

  for (let link of links) {
    let linkHTMLString = `
        <div class="link panel">
          <div class="link-options">
            <button class="btn-small" onClick="deleteLink(${index})">Delete</button>
            <button class="btn-small" onClick="editLink(${index})">Edit</button>
          </div>

          <a href="${link.url}">
          <h1 class="header">${link.title}</h1>
          </a>

          <p class="link-date">${Date.now()}</p>
          <div class="categories">
            Categories:`;
    for (let category of link.categories) {
      linkHTMLString += `<span class="category">${category}</span>`;
    }
    linkHTMLString += `  </div>
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
}

function editLink(index) {
  console.log("edit link of index", index);
  editIndex = index;

  linkTitle.value = links[index].title;
  linkURL.value = links[index].url;
  linkCategories = links[index].categories;

  showFormPanel();
}
