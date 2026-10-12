const BASE_URL = "https://jsonplaceholder.typicode.com";

// Send a new post
const createPost = async (postData) => {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });

  console.log("Status:", response.status);
  console.log("OK:", response.ok);

  const data = await response.json();

  console.log("Server Response:", data);

  return data;
};

export default {
  createPost,
};
