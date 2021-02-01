import React, {useState} from 'react';
import './styles.css';

function ControleTarefa () {

    const [tarefas, SetTarefas] = useState([]);
    const [tarefasCumpridas, SetTarefasCumpridas] = useState([]);
    const [tarefa, SetTarefa] = useState();
    const [filtro, SetFiltro] = useState([]);
    const [boo, SetBoo] = useState(true);

    function handleClick(e) {
        SetBoo(true);
        e.preventDefault();
        SetTarefas(oldArray => [...oldArray, tarefa]);
        console.log('O link foi clicado.');
        e.target.value = '';
    }

    function handleInputChange(e) {
        SetTarefa(e.target.value);
    }

    // Excluir ou adicionar uma tarefa nas tarefas cumpridas
    function handleValidateClick(t) {
        let count = 0;
        tarefasCumpridas.map((tc,i) => {
            if(tc === t) {
                SetTarefasCumpridas(tarefasCumpridas.filter(item => item !== tc));

                count++;
            }
        });
        if(count === 0) {
            SetTarefasCumpridas(oldArray => [...oldArray, t]);
        }
        SetTarefa(''); 
    }
    
    function onChange(event) {
        SetBoo(false);
        if(event.target.value === '') {
            SetFiltro([]);
            SetBoo(false);
        }
        SetFiltro(tarefas.filter(function(el) {
            return el.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1;
        }))
      }
       

    const vericarValidade = (t) => {
        if(tarefasCumpridas.find(element => element == t)) {
            return 0;
        } else {
            return 1;
        }
    }

    return (
        <>
        <div class="menu">
            <input type="text" id="username" name="username" onChange={handleInputChange}></input>
            <button onClick={handleClick}>Inserir</button><br></br><br></br>
        <div class="principal">
            <ol>
                {boo === true ? (tarefas.map((t, i) => (
                    <>
                    {vericarValidade(t) === 0 ? (<li><strike> {t} </strike>  <button class="button" onClick={() => handleValidateClick(t)}>Refazer</button></li>) :
                    (<li>{t}     <button class="button" onClick={() => handleValidateClick(t)}>Marcar Feito</button></li>)}
                    </>
                ))) : (filtro.map((t, i) => (
                    <>
                    {vericarValidade(t) === 0 ? (<li><strike> {t} </strike>  <button class="button" onClick={() => handleValidateClick(t)}>Refazer</button></li>) :
                    (<li>{t}     <button class="button" onClick={() => handleValidateClick(t)}>Marcar Feito</button></li>)}
                    </>
                )))}
            </ol>
            </div>
            <div class="totalpendentes">
                        <p>Total Pendentes: {`${tarefas.length - tarefasCumpridas.length}/${tarefas.length}`}</p>
                        <input
                            type="text"
                            placeholder="Filtrar atividades"
                            onChange={onChange}
        />

            </div>

            </div>

            
        </>
    )
}
export default ControleTarefa;