import { useEffect, useState } from "react";
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


  //estados para armazenar informações da API
  const [tipoDieta, setTipoDieta] = useState("");
  const [kcalCafe, setKcalCafe] = useState(0);
  const [kcalAlmoco, setKcalAlmoco] = useState(0);
  const [kcalCafeTarde, setKcalCafeTarde] = useState(0);
  const [kcalJanta, setKcalJanta] = useState(0);


  //função para buscar dados da API
  const fetchData = async () => {
    try {
      //url da API aqui
      const response = await fetch("sua_api_url");
      const data = await response.json();
      
      //API retorna corretamente
      setTipoDieta(data.tipoDieta);
      setKcalCafe(data.kcalCafe);
      setKcalAlmoco(data.kcalAlmoco);
      setKcalCafeTarde(data.kcalCafeTarde);
      setKcalJanta(data.kcalJanta);
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
            <h3> Dieta de hoje  </h3>
            <p>{dataAtual}</p>
            <p>Tipo: {tipoDieta}</p>
          </div>

              {/* div cafe manhã  */}
          <div className={style.bloco1}>
            <div className={style.row}>
              <div className={style.dieta}>
                <div className={style.icones}>
                <GiChickenLeg className={style.icone} />
                </div>
                <p>Café da manhã</p>
                <span> {kcalCafe} kcal</span>
                <p>08:30</p>
                <button onClick={toggleExpansaoCafe}>
                  {expandirCafe ? "Retrair" : "Expandir"}
                </button>
                
              </div>
              {expandirCafe && (
                <div className={style.infoExpandida}>
                  <h4>Itens:</h4>
                  <ul>
                    <li>2 ovos mexidos - 12g proteína, 0.6g carb, 10g gordura, 140kcal</li>
                    <li>1 banana média - 1.3g proteína, 27g carb, 0.3g gordura, 105kcal</li>
                    <li>Aveia (30g) - 4g proteína, 20g carb, 3g gordura, 117kcal</li>
                    <li>Café preto sem açúcar - 0g proteína, 0g carb, 0g gordura, 2kcal</li>
                  </ul>
                  <strong>Total: 17.3g proteína, 47.6g carb, 13.3g gordura, 364kcal</strong>
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
                <span> {kcalAlmoco} kcal</span>
                <p>12:30</p>
                <button onClick={toggleExpansaoAlmoco}>
                  {expandirAlmoco ? "Retrair" : "Expandir"}
                </button>
              </div>
              {expandirAlmoco && (
                <div className={style.infoExpandida}>
                  <h4>Itens:</h4>
                  <ul>
                    <li>Arroz integral (100g) - 2.6g proteína, 23g carb, 1g gordura, 111kcal</li>
                    <li>Peito de frango grelhado (150g) - 35g proteína, 0g carb, 3g gordura, 165kcal</li>
                    <li>Brócolis cozido (100g) - 2.8g proteína, 7g carb, 0.4g gordura, 34kcal</li>
                    <li>Salada verde com azeite (1 colher) - 0.5g proteína, 2g carb, 9g gordura, 90kcal</li>
                  </ul>
                  <strong>Total: 40.9g proteína, 32g carb, 13.4g gordura, 400kcal</strong>
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
                <span> {kcalCafeTarde} kcal</span>
                <p>17:30</p>
                <button onClick={toggleExpansaoCafeTarde}>
                  {expandirCafeTarde ? "Retrair" : "Expandir"}
                </button> 
              </div>
              {expandirCafeTarde && (
                <div className={style.infoExpandida}>
                  <h4>Itens:</h4>
                  <ul>
                    <li>Iogurte natural (170g) - 10g proteína, 8g carb, 4g gordura, 100kcal</li>
                    <li>Chia (10g) - 2g proteína, 4g carb, 5g gordura, 58kcal</li>
                    <li>Morangos (100g) - 1g proteína, 7g carb, 0.3g gordura, 32kcal</li>
                  </ul>
                  <strong>Total: 13g proteína, 19g carb, 9.3g gordura, 190kcal</strong>
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
                <span> {kcalJanta} kcal</span>
                <p>22:30</p>
                <button onClick={toggleExpansaoJanta}>
                  {expandirJanta ? "Retrair" : "Expandir"}
                </button>
              </div>
              {expandirJanta && (
                <div className={style.infoExpandida}>
                  <h4>Itens:</h4>
                  <ul>
                    <li>Omelete com 2 ovos - 12g proteína, 1g carb, 10g gordura, 140kcal</li>
                    <li>Legumes salteados (100g) - 2g proteína, 9g carb, 4g gordura, 80kcal</li>
                    <li>Mix de folhas verdes - 1g proteína, 2g carb, 0.5g gordura, 20kcal</li>
                  </ul>
                  <strong>Total: 15g proteína, 12g carb, 14.5g gordura, 240kcal</strong>
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
