export async function buscarUser(username, signal) {
  const res = await fetch(`https://api.github.com/users/${username}`,
    { signal });

  if (!res.ok) {
    throw new Error(`USER_NOT_FOUND. COD.: ${res.status}`);
  }

  const data = await res.json();

  return {
    nome: data.name,
    username: data.login,
    bio: data.bio,
    seguidores: data.followers,
    repos: data.public_repos,
    foto: data.avatar_url,
    link: data.html_url
  }
};

export async function buscarRepo(username, signal) {
  const res = await fetch(`https://api.github.com/users/${username}/repos`, {signal});

  if (!res.ok) {
    throw new Error(`REPO_NOT_FOUND. COD.: ${res.status}`);
  }

  const data = await res.json();

  return data.map(repo => ({
    id: repo.id,
    nome: repo.name,
    description: repo.description,
    linguagem: repo.language,
    estrelas: repo.stargazers_count,
    url: repo.html_url
  }));
};

