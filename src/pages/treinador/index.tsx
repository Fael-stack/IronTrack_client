import Container from "../../components/Container"
import Header from "../../components/Header"
import style from "./treinador.module.css"
//preciso de jacascript pra continuar
function Treinador() {
    return (
        <>



            <Header />
            <Container>
                <section className={style.body}>
                <div className={style.respostas}>a</div>
                <div className={style.perguntas}>a</div>
                <div className={style.escrita}>  <textarea name="" id=""></textarea></div>
                </section>
            </Container>
        </>
    )
}
export default Treinador