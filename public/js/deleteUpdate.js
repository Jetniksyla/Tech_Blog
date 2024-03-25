document.querySelector("#update").addEventListener("click", (event) => {
  // Prevent default form submission
  event.preventDefault();
  // Extract blog ID and updated blog details from form inputs
  const blogId = document.querySelector("#hiddenBlogId").value;
  const editBlog = {
    title: document.querySelector("#editedTitle").value,
    content: document.querySelector("#editedContent").value,
  };
  // Send a PUT request to update the blog
  fetch(`/api/blogs/${blogId}`, {
    method: "PUT",
    body: JSON.stringify(editBlog),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      // If update is successful, redirect the user to the dashboard
      console.log("Updated Blog");
      location.href = "/dashboard";
    } else {
      // If update fails, show an alert message
      alert("Try again!");
    }
  });
});

document.querySelector("#delete").addEventListener("click", (event) => {
  // Prevent default form submission
  event.preventDefault();
  // Extract blog ID from hidden input
  const blogId = document.querySelector("#hiddenBlogId").value;
  // Send a DELETE request to delete the blog
  fetch(`/api/blogs/${blogId}`, {
    method: "DELETE",
  }).then((res) => {
    if (res.ok) {
      // If deletion is successful, redirect the user to the dashboard
      console.log("Deleted blog");
      location.href = "/dashboard";
    } else {
      // If deletion fails, show an alert message
      alert("Try again!");
    }
  });
});
