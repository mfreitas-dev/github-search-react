import { useState, useEffect, useRef, useCallback, } from "react"; 
import SearchInput from "./components/SearchInput"; 
import UserCard from "./components/UserCard"; 
import RepoList from "./components/RepoList"; 
import { useGithubUser } from "./hooks/useGithubUser"; 
import { useDebounce, useLocalStorage } from "./hooks/useDebounce"; 
import HistoricoList from "./components/HistoricoList"; 
import Spinner from "./components/Spinner";

function App() { 
  const [tema, setTema] = useLocalStorage("tema", "claro"); 
  useEffect(() => { 
    document.body.className = (tema === "claro") ? "tema-claro" : "tema-escuro" }, 
  [tema]); 
  const toggleTema = useCallback(() => {
    (tema === "claro") ? setTema("escuro") : setTema("claro") }, 
    [setTema, tema]); 

  const [busca, setBusca] = useState(""); 
  const { state, buscar } = useGithubUser(); 
  const buscaDebounce = useDebounce(busca, 500); 
  const lastSearch = useRef(""); 
  
  useEffect(() => { 
  if (!buscaDebounce || buscaDebounce === lastSearch.current) return;
  if (buscaDebounce.length < 3) return; 
  lastSearch.current = buscaDebounce; 
  buscar(buscaDebounce); 
  }, [buscaDebounce, buscar]); 

  const [historico, setHistorico] = useLocalStorage("historico", []);
  const [mostrarHistorico, setMostrarHistorico] = useState(false);
  useEffect(() => { 
    if(!state.perfil) {
      return
    } else{ 
      (!historico.includes(buscaDebounce)) && setHistorico(prev => {
        if (prev.includes(buscaDebounce)) return prev;
        return [...prev.slice(-5), buscaDebounce];
      });} }, 
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [state]); 
    
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    let timer;

    if (state.status === "loading") {
      timer = setTimeout(() => {
        setShowLoading(true);
      }, 300);
    } else {
      timer = setTimeout(() => {
        setShowLoading(false);
      }, 100);
    }

    return () => clearTimeout(timer);
  }, [state]);
            
return ( 
<div className="container"> 
<h1>GitHub Search</h1> 
<button onClick={toggleTema} className="botao-tema">{(tema === "claro") ? "Mudar para tema escuro" : "Mudar para tema claro"}</button> 
<SearchInput value={busca} onChange={e => setBusca(e.target.value)} onFocus={() => setMostrarHistorico(true)} onBlur={() => setTimeout(() => setMostrarHistorico(false), 150)}/> 
  {mostrarHistorico && <HistoricoList historico={historico} buscar={buscar} />} 
  {showLoading && <Spinner />} 
  {state.error && <p className="erro">{state.error}</p>} 
  {state.perfil && <UserCard perfil={state.perfil} />} 
  {state.perfil && <RepoList repos={state.repos} /> }
  </div> ); 
}; 
  
export default App;