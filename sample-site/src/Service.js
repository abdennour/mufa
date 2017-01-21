class Service {
  getGitUserInfo(username) {
    return fetch(`https://api.github.com/users/${username}`)
      .then(response => response.json())
  }
}

export default Service;
