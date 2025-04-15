import Container from "../../components/Container"
import Header from "../../components/Header"
import styles from "./Page404.module.css"

function Pag404() {

    return (

        <>
            <Header />
            <Container>
                
                <p className={styles.p}>404</p>
                <h3>Pagina não localizada</h3>

            </Container>
        </>

    )


}

export default Pag404