// app/page.tsx

// Importando as bibliotecas de ícones
import { Dumbbell, UserCircle, ChevronDown, Trash2, Weight, Activity } from 'lucide-react';

//DEFINIÇÃO DO COMPONENTE HEADER
function Header() {
  return (
    <header className="header">
      <div className="logoContainer">
        <Dumbbell size={28} />
        <span className="logoText">Iron track</span>
      </div>
      <div className="profileContainer">
        <UserCircle size={32} />
        <ChevronDown size={16} />
      </div>
    </header>
  );
}

//DEFINIÇÃO DO COMPONENTE EXERCISECARD
interface ExerciseCardProps {
  icon: React.ReactNode;
  name: string;
  details: string;
}

function ExerciseCard({ icon, name, details }: ExerciseCardProps) {
  return (
    <div className="card">
      <div className="infoContainer">
        <div className="iconWrapper">{icon}</div>
        <div>
          <h3 className="exerciseName">{name}</h3>
          <p className="exerciseDetails">{details}</p>
        </div>
      </div>
      <button className="deleteButton">
        <Trash2 size={16} />
      </button>
    </div>
  );
}

//COMPONENTE PRINCIPAL DA PÁGINA
export default function PaginaCompleta() {
  // Dados dos exercícios para o mapeamento
  const exercises = [
    { name: 'Supino Reto', details: '4 séries x 12 repetições', icon: <Dumbbell size={24} /> },
    { name: 'Crucifixo', details: '3 séries x 15 repetições', icon: <Weight size={24} /> },
    { name: 'Extensão de Tríceps', details: '4 séries x 12 repetições', icon: <Activity size={24} /> },
    { name: 'Corda na Polia', details: '3 séries x 15 repetições', icon: <Dumbbell size={24} /> },
  ];

  //Estrutura final da página, usando os componentes definidos acima
  return (
    <div>
      <Header />
      
      <main className="main">
        <section className="titleSection">
          <h1 className="title">Treino de Hoje</h1>
          <p className="subtitle">Segunda-feira - Treino de Peito e Tríceps</p>
        </section>

        <section className="exerciseList">
          {exercises.map((exercise, index) => (
            <ExerciseCard
              key={index}
              name={exercise.name}
              details={exercise.details}
              icon={exercise.icon}
            />
          ))}
        </section>

        <section className="progressBanner">
          <div>
            <h2 className="progressTitle">Progresso do Treino</h2>
            <p className="progressSubtitle">2 de 4 exercícios completados</p>
          </div>
          <div className="progressCircle">
            <span>50%</span>
          </div>
        </section>

        <button className="finalizeButton">
          Finalizar Treino
        </button>
      </main>
    </div>
  );
}