import Container from "../../components/Container"
import Header from "../../components/Header"
import style from "./treino.module.css"
import { FaDumbbell } from "react-icons/fa6";


function Treino() {
    return (
        <>
            <Header />
            <Container>

                <section className={style.body}>

                    <div className={style.info_base}>
                        <h3> Treino de hoje</h3>
                        <p>data</p>
                        <p>tipo</p>
                    </div>

                    <div className={style.bloco1}>

                        <div className={style.row}>
                            <div className={style.treino}>
                                <div className={style.icones}>
                                    <FaDumbbell className={style.icone} />
                                </div>
                                <p>nome do movimento</p>
                                <span> numero de séries numero de repetições</span>
                                <button>executar treino</button>
                            </div>
                        </div>

                        <div className={style.row}>
                            <div className={style.treino}>
                                <div className={style.icones}>
                                    <FaDumbbell className={style.icone} />
                                </div>
                                <p>nome do movimento</p>
                                <span> numero de séries numero de repetições</span>
                                <button>executar treino</button>
                            </div>
                        </div>

                        <div className={style.row}>
                            <div className={style.treino}>
                                <div className={style.icones}>
                                    <FaDumbbell className={style.icone} />
                                </div>
                                <p>nome do movimento</p>
                                <span> numero de séries numero de repetições</span>
                                <button>executar treino</button>                                
                            </div>
                        </div>

                        <div className={style.row}>
                            <div className={style.treino}>
                                <div className={style.icones}>
                                    <FaDumbbell className={style.icone} />
                                </div>
                                <p>nome do movimento</p>
                                <span> numero de séries numero de repetições</span>
                                <button>executar treino</button>

                            </div>
                        </div>

                        <div className={style.barra_de_progresso}>
                            <div className={style.progresso_da_barra}></div>
                        </div>

                    </div>

                </section>


            </Container>
        </>
    )
}
export default Treino