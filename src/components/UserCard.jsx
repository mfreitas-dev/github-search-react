export default function UserCard({ perfil }) {
  if (!perfil) return null;

  return (
    <div className="card profile">
      <img src={perfil.foto} alt="foto de perfil" />
      <p>@{perfil.username}</p>
      <p><strong>NOME: {perfil.nome}</strong> </p>
      <a href={perfil.link} target="_blank" rel="noreferrer">Github</a>
      <p>BIO: {(perfil.bio) || "Sem bio"}</p>
      <p>SEGUIDORES: {perfil.seguidores}</p>
      <p>REPOSITORIOS: {perfil.repos}</p>
    </div>
  );
}