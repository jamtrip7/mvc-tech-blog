const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#project-name').value.trim();
  const needed_funding = document.querySelector('#project-funding').value.trim();
  const description = document.querySelector('#project-desc').value.trim();

  if (name && needed_funding && description) {
    const response = await fetch(`/api/projects`, {
      method: 'POST',
      body: JSON.stringify({ name, needed_funding, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create project');
    }
  }
};

const addComment = async (event) => {
  event.preventDefault();

  const commentContent = document.querySelector('#comment-desc').value.trim();
  console.log(commentContent);

  const postId = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
  console.log(postId);

  if (commentContent) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        postId,
        commentContent
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }

  console.log(commentContent);
}

document.getElementById('comment-btn').addEventListener('click', addComment);
