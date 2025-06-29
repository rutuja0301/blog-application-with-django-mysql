// blog_detail.js
import { fetchWithAuth } from '/static/js/auth.js';

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  if (!postId) {
    alert("Invalid blog post ID.");
    return window.location.href = "/home/";
  }

  try {
    const response = await fetchWithAuth(`/api/blogposts/${postId}/`);
    if (!response.ok) throw new Error("Unauthorized");

    const post = await response.json();
    document.getElementById("post-title").innerText = post.title;
    document.getElementById("post-author").innerText = post.author;
    document.getElementById("post-content").innerHTML = `<p>${post.content}</p>`;
  } catch (err) {
    console.error(err);
    alert("Failed to load post. Redirecting to login.");
    window.location.href = "/login/";
  }
});
