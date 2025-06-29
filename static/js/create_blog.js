import { fetchWithAuth } from '/static/js/auth.js';

document.addEventListener('DOMContentLoaded', () => {
  const blogForm = document.getElementById('blog-form');

  const editingId = localStorage.getItem('editingId');
  if (editingId) {
    document.getElementById('title').value = localStorage.getItem('editingTitle');
    document.getElementById('content').value = localStorage.getItem('editingContent');
    document.getElementById('status').value = localStorage.getItem('editingStatus');
  }

  blogForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const postData = {
      title: document.getElementById('title').value,
      content: document.getElementById('content').value,
      status: document.getElementById('status').value,
    };

    const url = editingId ? `/api/blogposts/${editingId}/` : '/api/blogposts/';
    const method = editingId ? 'PUT' : 'POST';

    try {
      const response = await fetchWithAuth(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.removeItem('editingId');
        localStorage.removeItem('editingTitle');
        localStorage.removeItem('editingContent');
        localStorage.removeItem('editingStatus');
        alert('Post saved successfully!');
        window.location.href = '/home/';
      } else {
        alert('Error: ' + JSON.stringify(data));
      }
    } catch (err) {
      console.error(err);
      alert('Failed to save post');
    }
  });
});
