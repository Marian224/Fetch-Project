// Modal functionality for photos
const modal = document.getElementById('photoModal');
const closeBtn = document.querySelector('.close');

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

const fetchPostsBtn = document.querySelector('.btn-posts');
const postList = document.querySelector(".posts");
const fetchCommentsBtn = document.querySelector('.btn-comments');
const commentsList = document.querySelector(".comments");
const fetchAlbumsBtn = document.querySelector('.btn-albums');
const albumsList = document.querySelector(".albums");
const fetchPhotosBtn = document.querySelector('.btn-photos');
const photosList = document.querySelector(".photos");
const fetchUsersBtn = document.querySelector('.btn-users');
const usersList = document.querySelector(".users");
const fetchTodosBtn = document.querySelector('.btn-todos');
const todosList = document.querySelector(".todos");

let postPage = 1;
let commentPage = 1;
let albumPage = 1;
let photoPage = 1;
let userPage = 1;
let todoPage = 1;

let perPage = 10;

fetchPostsBtn.addEventListener("click", async () => {
    try {
        const posts =  await fetchPosts();
        renderPosts(posts);
        postPage += 1;

        if (postPage >  1) {
            fetchPostsBtn.textContent ="Fetch  more posts";
        }
    } catch (error) {    
        console.log(error);
    }
});

fetchCommentsBtn.addEventListener("click", async () => {
    try {
        const comments = await fetchComments();
        renderComments(comments);
        commentPage += 1;

        if (commentPage > 1) {
            fetchCommentsBtn.textContent = "Fetch more comments";
        }
    } catch (error) {
        console.log(error);
    }
});

fetchAlbumsBtn.addEventListener("click", async () => {
    try {
        const albums = await fetchAlbums();
        renderAlbums(albums);
        albumPage += 1;

        if (albumPage > 1) {
            fetchAlbumsBtn.textContent = "Fetch more albums";
        }
    } catch (error) {
        console.log(error);
    }
});

fetchPhotosBtn.addEventListener("click", async () => {
    try {
        const photos = await fetchPhotos();
        renderPhotos(photos);
        photoPage += 1;

        if (photoPage > 1) {
            fetchPhotosBtn.textContent = "Fetch more photos";
        }
    } catch (error) {
        console.log(error);
    }
});

fetchUsersBtn.addEventListener("click", async () => {
    try {
        const users = await fetchUsers();
        renderUsers(users);
        userPage += 1;

        if (userPage > 1) {
            fetchUsersBtn.textContent = "Fetch more users";
        }
    } catch (error) {
        console.log(error);
    }
});

fetchTodosBtn.addEventListener("click", async () => {
    try {
        const todos = await fetchTodos();
        renderTodos(todos);
        todoPage += 1;

        if (todoPage > 1) {
            fetchTodosBtn.textContent = "Fetch more todos";
        }
    } catch (error) {
        console.log(error);
    }
});

async function fetchPosts() {
    const params  = new URLSearchParams({
    _limit: perPage,
    _page: postPage,
    });

    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?${params}`);
    return response.data;
}

async function fetchComments() {
    const params = new URLSearchParams({
    _limit: perPage,
    _page: commentPage,
    });

    const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?${params}`);
    return response.data;
}

async function fetchAlbums() {
    const params = new URLSearchParams({
    _limit: perPage,
    _page: albumPage,
    });

    const response = await axios.get(`https://jsonplaceholder.typicode.com/albums?${params}`);
    return response.data;
}

async function fetchPhotos() {
    const params = new URLSearchParams({
    _limit: perPage,
    _page: photoPage,
    });

    const response = await axios.get(`https://jsonplaceholder.typicode.com/photos?${params}`);
    return response.data;
}

async function fetchUsers() {
    const params = new URLSearchParams({
    _limit: perPage,
    _page: userPage,
    });

    const response = await axios.get(`https://jsonplaceholder.typicode.com/users?${params}`);
    return response.data;
}

async function fetchTodos() {
    const params = new URLSearchParams({
    _limit: perPage,
    _page: todoPage,
    });

    const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?${params}`);
    return response.data;
}

function renderPosts(posts) {
    const markup = posts
    .map(({ id, title, body, userId }) => {
        return `<li class="post">
        <h2 class="post-title">${title.slice(0, 30)}</h2>
        <p><b>Post id</b>: ${id}</p>
        <p><b>Author id</b>: ${userId}</p>
        <p class="post-body">${body}</p>
        </li>`;
    })
    .join("");
    postList.insertAdjacentHTML("beforeend", markup);
}

function renderComments(comments) {
    const markup = comments
    .map(({ id, postId, name, body, email }) => {
        return `<li class="comment">
        <p><b>Comment id</b>: ${id}</p>
        <p><b>Post id</b>: ${postId}</p>
        <h3 class="comment-name">${name.slice(0, 30)}</h3>
        <p class="comment-body">${body}</p>
        <p><b>Email</b>: ${email}</p>
        </li>`;
    })
    .join("");
    commentsList.insertAdjacentHTML("beforeend", markup);
}

function renderAlbums(albums) {
    const markup = albums
    .map(({ id, userId, title }) => {
        return `<li class="album">
        <p><b>Album id</b>: ${id}</p>
        <p><b>User id</b>: ${userId}</p>
        <h3 class="album-title">${title.slice(0, 40)}</h3>
        </li>`;
    })
    .join("");
    albumsList.insertAdjacentHTML("beforeend", markup);
}

function renderPhotos(photos) {
    console.log('Photos received:', photos);
    const markup = photos
    .map(({ id, albumId, title, url, thumbnailUrl }) => {
        // Replace placeholders with working image service
        const workingThumbnail = `https://picsum.photos/150?random=${id}`;
        const workingFull = `https://picsum.photos/600?random=${id}`;
        
        console.log(`Photo ${id}: Using working image URLs`);
        return `<li class="photo">
        <p><b>Photo id</b>: ${id}</p>
        <p><b>Album id</b>: ${albumId}</p>
        <h3 class="photo-title">${title.slice(0, 40)}</h3>
        <img src="${workingThumbnail}" alt="${title}" class="photo-thumbnail" data-full-url="${workingFull}">
        </li>`;
    })
    .join("");
    photosList.insertAdjacentHTML("beforeend", markup);
    
    // Add click handlers to all newly added thumbnails
    setTimeout(() => {
        const thumbnails = photosList.querySelectorAll('.photo-thumbnail');
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                const modal = document.getElementById('photoModal');
                const modalImage = document.getElementById('modalImage');
                modalImage.src = this.dataset.fullUrl;
                modal.style.display = 'block';
            });
        });
    }, 100);
}

function renderUsers(users) {
    const markup = users
    .map(({ id, name, username, email, phone, website }) => {
        return `<li class="user">
        <p><b>User id</b>: ${id}</p>
        <h3 class="user-name">${name}</h3>
        <p><b>Username</b>: ${username}</p>
        <p><b>Email</b>: ${email}</p>
        <p><b>Phone</b>: ${phone}</p>
        <p><b>Website</b>: ${website}</p>
        </li>`;
    })
    .join("");
    usersList.insertAdjacentHTML("beforeend", markup);
}

function renderTodos(todos) {
    const markup = todos
    .map(({ id, userId, title, completed }) => {
        const statusClass = completed ? 'completed' : 'pending';
        const statusText = completed ? '✓ Done' : '○ Pending';
        return `<li class="todo ${statusClass}">
        <p><b>Todo id</b>: ${id}</p>
        <p><b>User id</b>: ${userId}</p>
        <h3 class="todo-title">${title.slice(0, 50)}</h3>
        <p class="todo-status">${statusText}</p>
        </li>`;
    })
    .join("");
    todosList.insertAdjacentHTML("beforeend", markup);
}
