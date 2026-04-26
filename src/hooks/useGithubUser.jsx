import { useState, useRef } from "react";
import { buscarRepo, buscarUser } from "../services/githubService";

export function useGithubUser() {
  const [state, setState] = useState({
    status: "idle", // idle | loading | success | error
    perfil: null,
    repos: [],
    error: null
  });

  const controllerRef = useRef(null);

  async function buscar(username) {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    setState({
      status: "loading",
      perfil: null,
      repos: [],
      error: null
    });

  try {
    const [userResult, repoResult] = await Promise.allSettled([
      buscarUser(username, controller.signal),
      buscarRepo(username, controller.signal)
    ]);

    if (userResult.status === "rejected") {
      throw new Error("Usuário não encontrado.");
    }

    const user = userResult.value;

    const repos = repoResult.status === "fulfilled" ? repoResult.value : [];

    setState({
      status: "success",
      perfil: user,
      repos: repos,
      error: null
    });

  } catch (err) {
    setState({
      status: "error",
      perfil: null,
      repos: [],
      error: err.message
    });
  } finally{
    controllerRef.current = null;
  }
}

  return {
    state,
    buscar
  };
};