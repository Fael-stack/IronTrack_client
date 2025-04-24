import { useEffect, useState } from "react";
import Container from "../../components/Container"
import Header from "../../components/Header"
import style from "./treino.module.css"
import { FaDumbbell } from "react-icons/fa6";


function Treino() {

    const [expandirTreino1, setExpandirTreino1] = useState(false);
    const [expandirTreino2, setExpandirTreino2] = useState(false);
    const [expandirTreino3, setExpandirTreino3] = useState(false);
    const [expandirTreino4, setExpandirTreino4] = useState(false);

    const toggleExpansaoTreino1 = () => setExpandirTreino1(!expandirTreino1);
    const toggleExpansaoTreino2 = () => setExpandirTreino2(!expandirTreino2);
    const toggleExpansaoTreino3 = () => setExpandirTreino3(!expandirTreino3);
    const toggleExpansaoTreino4 = () => setExpandirTreino4(!expandirTreino4);

    //estados para armazenar informações da API
    const [tipoTreino, setTipoTreino] = useState("");

    //função para buscar dados da API
    const fetchData = async () => {
        try {
            //url da API aqui
            const response = await fetch("sua_api_url");
            const data = await response.json();

            //API retorna corretamente
            setTipoTreino(data.tipoTreino);
        } catch (error) {
            console.error("Erro ao buscar os dados da API:", error);
            //caso não consiga retornar
        }
    };

    //chama a API ao montar o componente
    useEffect(() => {
        fetchData();
    }, []);

    const dataAtual = new Date().toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: '2-digit',
        month: 'long'
    });


    return (
        <>
            <Header />
            <Container>

                <section className={style.body}>

                    <div className={style.info_base}>
                        <h3> Treino de hoje</h3>
                        <p>{dataAtual}</p>
                        <p>Tipo: {tipoTreino}</p>
                    </div>

                    {/* Div do Treino 1 */}
                    <div className={style.row}>
                        <div className={style.treino}>
                            <div className={style.icones}>
                                <FaDumbbell className={style.icone} />
                            </div>
                            <p>nome do movimento</p>
                            <span> numero de séries numero de repetições</span>
                            <button onClick={toggleExpansaoTreino1}>
                                {expandirTreino1 ? "Retrair" : "Expandir"}
                            </button>
                        </div>
                        {expandirTreino1 && (
                            <div className={style.infoExpandida}>
                                <h4>Detalhes:</h4>
                                <ul>
                                    <li>Descrição do exercício 1</li>
                                    <li>Descrição do exercício 2</li>
                                    <li>Descrição do exercício 3</li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Div do Treino 2 */}
                    <div className={style.row}>
                        <div className={style.treino}>
                            <div className={style.icones}>
                                <FaDumbbell className={style.icone} />
                            </div>
                            <p>nome do movimento</p>
                            <span> numero de séries numero de repetições</span>
                            <button onClick={toggleExpansaoTreino2}>
                                {expandirTreino2 ? "Retrair" : "Expandir"}
                            </button>
                        </div>
                        {expandirTreino2 && (
                            <div className={style.infoExpandida}>
                                <h4>Detalhes:</h4>
                                <ul>
                                    <li>Descrição do exercício 1</li>
                                    <li>Descrição do exercício 2</li>
                                    <li>Descrição do exercício 3</li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Div do Treino 3 */}
                    <div className={style.row}>
                        <div className={style.treino}>
                            <div className={style.icones}>
                                <FaDumbbell className={style.icone} />
                            </div>
                            <p>nome do movimento</p>
                            <span> numero de séries numero de repetições</span>
                            <button onClick={toggleExpansaoTreino3}>
                                {expandirTreino3 ? "Retrair" : "Expandir"}
                            </button>
                        </div>
                        {expandirTreino3 && (
                            <div className={style.infoExpandida}>
                                <h4>Detalhes:</h4>
                                <ul>
                                    <li>Descrição do exercício 1</li>
                                    <li>Descrição do exercício 2</li>
                                    <li>Descrição do exercício 3</li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Div do Treino 4 */}
                    <div className={style.row}>
                        <div className={style.treino}>
                            <div className={style.icones}>
                                <FaDumbbell className={style.icone} />
                            </div>
                            <p>nome do movimento</p>
                            <span> numero de séries numero de repetições</span>
                            <button onClick={toggleExpansaoTreino4}>
                                {expandirTreino4 ? "Retrair" : "Expandir"}
                            </button>
                        </div>
                        {expandirTreino4 && (
                            <div className={style.infoExpandida}>
                                <h4>Detalhes:</h4>
                                <ul>
                                    <li>Descrição do exercício 1</li>
                                    <li>Descrição do exercício 2</li>
                                    <li>Descrição do exercício 3</li>
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className={style.barra_de_progresso}>
                        <div className={style.progresso_da_barra}></div>

                    </div>

                </section>

            </Container>
        </>
    )
}
export default Treino