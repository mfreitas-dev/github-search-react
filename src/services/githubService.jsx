export async function buscarUser(username, signal) {
  const res = await fetch(`https://api.github.com/users/${username}`,
    { signal });

  if (!res.ok) {
    if(res.status === 404){
      throw new Error("Usuário não encontrado.");
    }
    if(res.status === 403){
      const resultado = await fetch("https://api.github.com/rate_limit");
      const dataRate = await resultado.json();
      const timestamp = Number(dataRate.rate.reset);
      const datareset = new Date(timestamp * 1000);
      throw new Error(`Limite de requisições excedido. Reseta em: ${datareset}`)
    }
    throw new Error("Erro ao buscar usuário fornecido");
  };

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
    throw new Error("Erro ao buscar os repositórios do usuário fornecido"); 
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

