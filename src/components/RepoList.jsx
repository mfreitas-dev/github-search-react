export default function RepoList({ repos }) {
  if (!repos || repos.length === 0) return null;

  return (
    <div>
      {repos.map(repo => (
        <div key={repo.id} className="card">
          <p className="repo-title">{repo.nome}</p>
          <p>{repo.description}</p>
          <p>Linguagem: {repo.linguagem}</p>
          <p>⭐ {repo.estrelas}</p>
          <a
            href={repo.url}
            target="_blank"
            rel="noreferrer"
            className="repo-link"
          >
            Ver repositório
          </a>
        </div>
      ))}
    </div>
  );
}