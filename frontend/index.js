import { backend } from './declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
    const postForm = document.getElementById('post-form');
    const postList = document.getElementById('post-list');
    const loadingIndicator = document.createElement('div');
    loadingIndicator.textContent = 'Loading...';
    loadingIndicator.style.display = 'none';
    document.body.appendChild(loadingIndicator);

    function showLoading() {
        loadingIndicator.style.display = 'block';
    }

    function hideLoading() {
        loadingIndicator.style.display = 'none';
    }

    async function displayPosts() {
        showLoading();
        try {
            const posts = await backend.getAllPosts();
            console.log('Fetched posts:', posts);
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
        } catch (error) {
            console.error('Error fetching posts:', error);
            postList.innerHTML = '<p>Error loading posts. Please try again later.</p>';
        } finally {
            hideLoading();
        }
    }

    await displayPosts();

    postForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const content = document.getElementById('content').value;

        showLoading();
        try {
            const postId = await backend.createPost(title, content, author);
            console.log('Created post with ID:', postId);
            postForm.reset();
            await displayPosts();
        } catch (error) {
            console.error('Error creating post:', error);
            alert('Failed to create post. Please try again.');
        } finally {
            hideLoading();
        }
    });

    // Periodically refresh posts
    setInterval(displayPosts, 30000); // Refresh every 30 seconds
});
