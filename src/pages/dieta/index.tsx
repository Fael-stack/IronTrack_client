import { useState } from "react";
import Container from "../../components/Container"; 
import Header from "../../components/Header";
import style from "./dieta.module.css";
import { GiChickenLeg } from "react-icons/gi";

function Dieta() {

  const [expandirCafe, setExpandirCafe] = useState(false);
  const [expandirAlmoco, setExpandirAlmoco] = useState(false);
  const [expandirCafeTarde, setExpandirCafeTarde] = useState(false);
  const [expandirJanta, setExpandirJanta] = useState(false);

  
  const toggleExpansaoCafe = () => setExpandirCafe(!expandirCafe);
  const toggleExpansaoAlmoco = () => setExpandirAlmoco(!expandirAlmoco);
  const toggleExpansaoCafeTarde = () => setExpandirCafeTarde(!expandirCafeTarde);
  const toggleExpansaoJanta = () => setExpandirJanta(!expandirJanta);

  return (
    <>
      <Header />
      <Container>
        <section className={style.body}>
          <div className={style.info_base}>
            <h3> Dieta de hoje</h3>
            <p>Data</p>
            <p>Tipo</p>
          </div>

              {/* div cafe manhã  */}
          <div className={style.bloco1}>
            <div className={style.row}>
              <div className={style.dieta}>
                <div className={style.icones}>
                <GiChickenLeg className={style.icone} />
                </div>
                <p>Café da manhã</p>
                <span> número de kcal</span>
                <p>08:30</p>
                <button onClick={toggleExpansaoCafe}>
                  {expandirCafe ? "Retrair" : "Expandir"}
                </button>
                
              </div>
              {expandirCafe && (
                  <div className={style.infoExpandida}>
                    <p>Iiiiiiii</p>
                    {/* detalhes/divs */}
                  </div>
                )}
            </div>

                {/* div almoço  */}
            <div className={style.row}>
              <div className={style.dieta}>
                <div className={style.icones}>
                  <GiChickenLeg className={style.icone} />
                </div>
                <p>Almoço</p>
                <span> número de kcal</span>
                <p>12:30</p>
                <button onClick={toggleExpansaoAlmoco}>
                  {expandirAlmoco ? "Retrair" : "Expandir"}
                </button>
              </div>
              {expandirAlmoco && (
                  <div className={style.infoExpandida}>
                    <p>Iiiiii</p>
                    {/*detalhes/divs */}
                  </div>
                )}
            </div>

                {/* div cafe tarde */}
            <div className={style.row}>
              <div className={style.dieta}>
                <div className={style.icones}>
                  <GiChickenLeg className={style.icone} />
                </div>
                <p>Café da tarde</p>
                <span> Número de kcal</span>
                <p>17:30</p>
                <button onClick={toggleExpansaoCafeTarde}>
                  {expandirCafeTarde ? "Retrair" : "Expandir"}
                </button> 
              </div>
              {expandirCafeTarde && (
                  <div className={style.infoExpandida}>
                    <p>Iiiii</p>
                    {/*detalhes/divs */}
                  </div>
                )}
            </div>

            {/* div janta */}
            <div className={style.row}>
              <div className={style.dieta}>
                <div className={style.icones}>
                  <GiChickenLeg className={style.icone} />
                </div>
                <p>Janta</p>
                <span> Número de kcal</span>
                <p>22:30</p>
                <button onClick={toggleExpansaoJanta}>
                  {expandirJanta ? "Retrair" : "Expandir"}
                </button>
              </div>
              {expandirJanta && (
                  <div className={style.infoExpandida}>
                    <p>Iiiiiii</p>
                    {/* detalhes/divs */}
                  </div>
                )}
            </div>

                {/* div barra progresso */}
            <div className={style.barra_de_progresso}>
              <div className={style.progresso_da_barra}></div>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}

export default Dieta;
