import { fetchWithAuth } from '/static/js/auth.js';

document.addEventListener("DOMContentLoaded", () => {
  const postId = new URLSearchParams(window.location.search).get('id');

  const commentInput = document.getElementById("new-comment");
  const postBtn = document.getElementById("post-comment");
  const cancelBtn = document.getElementById("cancel-comment");
  const commentsList = document.getElementById("comments-list");

  // Load existing comments
  loadComments(postId);

  // Publish a new comment
  postBtn.addEventListener("click", async () => {
    const content = commentInput.value.trim();
    if (!content) return;

    try {
      const response = await fetchWithAuth(`/api/comments/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post: postId, content: content })
      });

      console.log("Sending payload:", { post: postId, content });

      if (!response.ok) {
        const errData = await response.text();
        console.error("Failed response:", errData);
        throw new Error("Failed to post comment");
      }

      const data = await response.json();
      console.log("Comment posted:", data); // ✅ Debug

      // Clear input field
      commentInput.value = "";

      // Append newly added comment
      if (data && data.content && data.created_at) {
        appendComment(data);
      } else {
        console.warn("Invalid comment response format:", data);
      }
    } catch (err) {
      console.error("Error posting comment:", err);
      alert("Could not post comment.");
    }
  });

  // Cancel button clears the textarea
  cancelBtn.addEventListener("click", () => {
    commentInput.value = "";
  });

  // Load existing comments
  async function loadComments(postId) {
    try {
      const response = await fetchWithAuth(`/api/comments/${postId}/`);
      const data = await response.json();

      commentsList.innerHTML = "";
      // Check if response is an array and has at least one comment
      if (!Array.isArray(data)) {
        commentsList.innerHTML = "<p class='text-danger'>Unexpected response format.</p>";
        return;
      }

      if (data.length === 0) {
        commentsList.innerHTML = "<p class='text-muted'>No comments yet.</p>";
        return;
      }

      data.forEach(comment => appendComment(comment));
    } catch (err) {
      console.error("Error loading comments:", err);
    }
  }

  // Append a single comment to the list
  function appendComment(comment) {
    const div = document.createElement("div");
    div.className = "border p-3 mb-2 rounded bg-light";

    div.innerHTML = `
      <div class="fw-semibold mb-1">${comment.author_name || comment.author || "Anonymous"}</div>
      <div class="mb-2">${comment.content}</div>
      <small class="text-muted">${new Date(comment.created_at).toLocaleString()}</small>
    `;

    // Append to bottom of the list (use .append instead of .prepend if you want latest at bottom)
    commentsList.appendChild(div);
  }
});
