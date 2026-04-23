export default function HistoricoList({historico, buscar}){ 
    if((!historico) || (historico.length === 0)){ 
        return null} 
        
        return ( 
        <div className="container"> 
            {historico.map(item => ( 
                <button key={item} onClick={() => buscar(item)} className="historico-item">{item}</button> ))} 
        </div> 
        ) }