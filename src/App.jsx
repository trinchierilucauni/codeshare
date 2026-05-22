import { useState, useEffect} from 'react'
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './App.css';
function App() {
  const [code, setCode]= useState("Codice in caricamento...");
  const [copied, setCopied]= useState("");
  const [title, setTitle]= useState("Rinnemon query for db configuration");
  const readCode = async()=>{
    try{
      const response= await fetch("/codice.txt");
      const data= await response.text();
      setCode(data);
      console.log(data);
    }catch(errore){
      console.error("Errore nella lettura del file", errore);
      setCopied("Errore nella lettura del codice");
    }
  }

  const copyCode=()=>{
    try{
      navigator.clipboard.writeText(code);
      setCopied("Copiato  ✓");
    }catch(errore){
      setCopied("Errore nella copia");
      console.error("Errore nella copia del codice: ", errore);
    }

  }


  useEffect(()=>{
    if(window.innerWidth<700){
      setTitle("Rinnemon query")
    }
    readCode();
  },[]);

  return(
    <>
    
      <header>
        <div className="navBar-container">
          <div className="navbar-title">{title}</div>
          <div className="button-container">
            <div className="bottoneRinnemon">Rinnemon ➔</div>
            <div className="bottoneGithub">
              <a href="https://github.com/lucaccc1/rinnemon">Github</a>
            </div>
          </div>
        </div>

      </header>
      <main>
        <div className="code-box-container">
          <div className="code-box">
            <div className="code-title">
              <div className="code-linguaggio">Sql</div>
              <div className="copy-text-container">
                <div className="check-text">{copied}</div>
                <div title="Copia negli appunti" onClick={copyCode}>
                  <span className="material-symbols-outlined iconaCopy" >
                    content_copy
                  </span>
                </div>

              </div>
            </div>
            <div className="code-text-container">
              <SyntaxHighlighter 
                language="sql" 
                style={vscDarkPlus}
                wrapLines={true}         /* Forza la gestione delle righe */
                wrapLongLines={true}     /* Dice alla libreria di mandare a capo il testo lungo */
                customStyle={{
                  background: 'transparent', 
                  padding: 0,
                  margin: 0,
                  fontFamily: '"Google Sans Code", monospace',
                  fontSize: '12px',
                  whiteSpace: 'pre-wrap', /* Forza il pre-wrap sul contenitore principale */
                }}
                lineProps={{
                  style: { 
                    fontFamily:'"Google Sans Code", monospace',
                    whiteSpace: 'pre-wrap',  /* Forza il pre-wrap su ogni singola riga di codice */
                    wordBreak: 'break-all'   /* Se una parola/stringa è più lunga di 675px, la spezza pur di non farlo uscire */
                  }
                }}
              >
                {code}
              </SyntaxHighlighter>
                        

            </div>
            <div className="spazio"></div>
          </div>
        </div>
        <div className="textLove">Developed with ❤️ by Luca Coccia e Luca Trinchieri</div>
      </main>

    </>


  );
}

export default App
