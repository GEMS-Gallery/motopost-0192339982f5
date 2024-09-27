import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
    const postForm = document.getElementById('post-form');
    const postList = document.getElementById('post-list');

    // Function to display posts
    async function displayPosts() {
        const posts = await backend.getAllPosts();
        postList.innerHTML = '';
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post';
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p><strong>Author:</strong> ${post.author}</p>
                <p>${post.content}</p>
                <p><small>Created: ${new Date(Number(post.createdAt) / 1000000).toLocaleString()}</small></p>
            `;
            postList.appendChild(postElement);
        });
    }

    // Display posts on page load
    await displayPosts();

    // Handle form submission
    postForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const content = document.getElementById('content').value;

        try {
            await backend.createPost(title, content, author);
            postForm.reset();
            await displayPosts(); // Refresh the post list after creating a new post
        } catch (error) {
            console.error('Error creating post:', error);
            alert('Failed to create post. Please try again.');
        }
    });
});
