document.querySelector("#newComment").addEventListener("submit", event => {
    // Prevents the default form submission behavior
    event.preventDefault();
    // Extract the comment body and blog ID from the form
    const comment = {
        body: document.querySelector("#comment").value,
        blogId: document.querySelector("#hiddenCommentId").value,
    };
    // Send a POST request to create a new comment
    fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify(comment),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.ok) {
            // If comment creation is successful, reload the page to show the new comment
            console.log("Successfully posted comment!");
            location.reload();
        } else {
            // If comment creation fails, show an alert message
            alert("Try again!");
        }
    });
});
