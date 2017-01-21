class ServiceA {
  getGitUserInfo(username) {
    return fetch(`https://api.github.com/users/${username}`)
      .then(response => response.json())
  }
}

export const serviceA = new ServiceA();
