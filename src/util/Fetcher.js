const domain = 'https://jsonplaceholder.typicode.com';
export async function ajax(url, method, data) {
  if (!url || !method) return { error: 'url and method is nessasary' };
  try {
    const result = await fetch(url, {
      method,
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: data && JSON.stringify(data),
    });
    return await result.json();
  } catch (error) {
    return {
      error,
    };
  }
}

export async function getPosts() {
  return await ajax(`${domain}/posts`, 'GET');
}

export async function deletePost(postId) {
  if (!postId) return;
  return await ajax(`${domain}/posts/${postId}`, 'DELETE');
}

export async function updatePost(post) {
  if (!post) return;
  return await ajax(`${domain}/posts/${post.id}`, 'PUT', post);
}
