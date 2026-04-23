import { useState, useRef } from "react";
import { buscarRepo, buscarUser } from "../services/githubService";

export function useGithubUser() {
  const [perfil, setPerfil] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const controllerRef = useRef(null);

  async function buscar(username) {
    // ❗ cancela requisição anterior
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    // 🔥 cria novo controller
    const controller = new AbortController();
    controllerRef.current = controller;

    setLoading(true);
    setError(null);
    try {
      const [userResult, reposResult] = await Promise.all([ 
        buscarUser(username, controller.signal), 
        buscarRepo(username, controller.signal), ]);
      setPerfil(userResult);
      setRepos(reposResult);
    } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
          setPerfil(null);
          setRepos([]);}    
    } finally {
      setLoading(false);
    };
  }

  return {
    perfil,
    repos,
    loading,
    error,
    buscar
  };
};