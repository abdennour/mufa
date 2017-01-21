class ApiService {
  getGitUserInfo(username) {
    return fetch(`https://api.github.com/users/${username}`)
      .then(response => response.json())
  }

  getFollowers(username) {
    return fetch(`https://api.github.com/users/${username}/followers`)
            .then(response => response.json())
  }
}

export const apiService = new ApiService();
