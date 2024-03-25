const existingBlogs = document.querySelector("#existingblogs");
const createNew = document.querySelector("#createNew");
const newPost = document.querySelector("#newpost");
const newBlog = document.querySelector("#newBlog");

// Function to hide the create new post section
function hideCreateNew() {
  createNew.hidden = true;
}

// Initially hide the create new post section
hideCreateNew();

// Event listener for submitting new post form
newPost.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("clicked");
  // Hide existing blogs and new post form, show create new post section
  existingBlogs.hidden = true;
  newPost.hidden = true;
  createNew.hidden = false;
});

// Event listener for submitting new blog form
newBlog.addEventListener("submit", (event) => {
  const title = document.querySelector("#title").value;
  const content = document.querySelector("#content").value;
  event.preventDefault();
  console.log("Clicked");
  // Validate title and content
  if (!title || !content) {
    alert("Both Title and Content are required!");
    return;
  }
  const blogObj = {
    title: title,
    content: content,
  };
  // Send a POST request to create a new blog
  fetch("/api/blogs", {
    method: "POST",
    body: JSON.stringify(blogObj),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      // If creation is successful, reload the page to show the new blog
      createNew.setAttribute("hidden", "false");
      location.reload();
    } else {
      // If creation fails, show an alert message
      alert("Try again!");
    }
  });
});
