
import styles from "./conta_main.module.css"
import Header from "../../components/Header"
import Container from "../../components/Container"

function Conta() {
    return (
        <>

            <Header />
            <Container>
                <section className={styles.body}>


                    <div className={styles.usuario}>


                        <div>
                            <img src="https://img.freepik.com/vetores-gratis/ilustracao-do-jovem-com-oculos_1308-174706.jpg" alt="" />
                        </div>
                        <div className={styles.txt_blc1}>
                            <p>Nome</p>

                            
                                <span className={styles.Nivel}>Nivel de assinatura</span>
                        
                        </div>


                    </div>


                    <div className={styles.bloco_2}>

                        <div className={styles.personal_information}>

                            <img src="https://cdn-icons-png.flaticon.com/256/69/69544.png" alt="" />
                            <p>personal_information</p>

                        </div>

                        <div className={styles.privacy_E_security}>

                            <img src="https://cdn-icons-png.flaticon.com/256/69/69544.png" alt="" />
                            <p>privacy_E_security</p>

                        </div>

                        <div className={styles.notifications}>

                            <img src="https://cdn-icons-png.flaticon.com/256/69/69544.png" alt="" />
                            <p>notifications</p>

                        </div>

                        <div className={styles.help_E_support}>

                            <img src="https://cdn-icons-png.flaticon.com/256/69/69544.png" alt="" />
                            <p>help_E_support</p>

                        </div>

                        <div className={styles.Log_out}>

                            <img src="https://cdn-icons-png.flaticon.com/256/69/69544.png" alt="" />
                            <p>Log_out</p>

                        </div>
                    </div>

                    <div>

                    </div>

                </section>
            </Container>

        </>

    )
}

export default Conta