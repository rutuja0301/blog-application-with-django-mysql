import { fetchWithAuth } from '/static/js/auth.js';

let nextPageUrl = "/api/blogposts/?page=1";
let currentSearchQuery = "";
let isLoading = false;

const username = localStorage.getItem('username');

function loadPosts(reset = false) {
  if (!nextPageUrl || isLoading) return;
  isLoading = true;

  fetchWithAuth(nextPageUrl)
    .then(response => {
      if (!response.ok) throw new Error("Unauthorized");
      return response.json();
    })
    .then(data => {
      const posts = Array.isArray(data.results) ? data.results : data;
      nextPageUrl = data.next;

      const postList = document.getElementById("post-list");
      if (reset) postList.innerHTML = '';

      posts.forEach(post => {
        const template = document.getElementById("post-template");
        const postElement = template.content.cloneNode(true);

        postElement.querySelector(".post-title").textContent = post.title;
        postElement.querySelector(".post-author").textContent = post.author;
        postElement.querySelector(".post-snippet").textContent = post.content.substring(0, 150) + '...';

        const isAuthor = post.author === username;

        const readMoreBtn = postElement.querySelector(".read-more-btn");
        readMoreBtn.addEventListener("click", () => {
          window.location.href = `/api/blog-detail/?id=${post.id}`;
        });

        const editBtn = postElement.querySelector(".edit-btn");
        if (!isAuthor) editBtn.disabled = true;
        editBtn.addEventListener("click", () => {
          localStorage.setItem('editingId', post.id);
          localStorage.setItem('editingTitle', post.title);
          localStorage.setItem('editingContent', post.content);
          localStorage.setItem('editingStatus', post.status);
          window.location.href = '/api/create-blog/';
        });

        const deleteBtn = postElement.querySelector(".delete-btn");
        if (!isAuthor) deleteBtn.disabled = true;
        deleteBtn.addEventListener("click", async () => {
          const confirmed = confirm("Are you sure you want to delete this post?");
          if (!confirmed) return;
          const response = await fetchWithAuth(`/api/blogposts/${post.id}/`, { method: 'DELETE' });
          if (response.status === 204) {
            deleteBtn.closest(".post").remove();
          } else {
            alert("Failed to delete post.");
          }
        });

        const likeBtn = postElement.querySelector(".like-btn");
        likeBtn.dataset.id = post.id;
        likeBtn.querySelector(".like-count").textContent = `(${post.total_likes || 0})`;
        likeBtn.addEventListener("click", () => {
          fetchWithAuth(`/api/blogposts/${post.id}/like/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
          })
            .then(res => res.json())
            .then(data => {
              if ('liked' in data) {
                likeBtn.querySelector(".like-count").textContent = `(${data.total_likes})`;
                likeBtn.classList.toggle('btn-outline-primary');
                likeBtn.classList.toggle('btn-primary');
              }
            })
            .catch(err => console.error("Like failed", err));
        });

        const shareBtn = postElement.querySelector(".share-btn");
        shareBtn.addEventListener("click", () => {
          navigator.share({
            title: post.title,
            url: `${window.location.origin}/api/blog-detail/?id=${post.id}`
          });
        });

        postList.appendChild(postElement);
      });

      isLoading = false;
    })
    .catch(error => {
      console.error(error);
      alert("Please login again.");
      window.location.href = "/login/";
    });
}

function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

document.getElementById("search-input").addEventListener("input", debounce(() => {
  const query = document.getElementById("search-input").value.trim();
  currentSearchQuery = query;
  nextPageUrl = `/api/blogposts/?page=1&search=${encodeURIComponent(currentSearchQuery)}`;
  loadPosts(true);
}, 400));

document.getElementById("search-btn").addEventListener("click", () => {
  const query = document.getElementById("search-input").value.trim();
  currentSearchQuery = query;
  nextPageUrl = `/api/blogposts/?page=1&search=${encodeURIComponent(currentSearchQuery)}`;
  loadPosts(true);
});

document.getElementById("create-blog").addEventListener("click", () => {
  window.location.href = "/api/create-blog/";
});

loadPosts();

window.addEventListener('scroll', () => {
  const scrollBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
  if (scrollBottom) {
    loadPosts();
  }
});
