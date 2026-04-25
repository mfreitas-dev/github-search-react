import { useState, useRef } from "react";
import { buscarRepo, buscarUser } from "../services/githubService";

export function useGithubUser() {
  const [perfil, setPerfil] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const controllerRef = useRef(null);

  async function buscar(username) {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    setLoading(true);
    setError(null);
    try {
        const user = await buscarUser(username, controller.signal);
        setPerfil(user);
      try {
        const repos = await buscarRepo(username, controller.signal);
        setRepos(repos);
      } catch (err) {
          if (err.name !== "AbortError") {
            setRepos([]);
        }
    }} catch (err) {
        if (err.name !== "AbortError") {
          setError(`Erro: ${err.message}`)
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