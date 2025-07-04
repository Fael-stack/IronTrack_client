'use client'

import React, { useState } from 'react';
import {
  Dumbbell, UserCircle, ChevronDown, Trash2, Weight, Activity, CheckCircle
} from 'lucide-react';

// COMPONENTE HEADER

// COMPONENTE CARD DO EXERCÍCIO
interface ExerciseCardProps {
  icon: React.ReactNode;
  name: string;
  details: string;
  completed: boolean;
  onComplete: () => void;
  onDelete: () => void;
  onEdit: (name: string, details: string) => void;
}

function ExerciseCard({
  icon,
  name,
  details,
  completed,
  onComplete,
  onDelete,
  onEdit,
}: ExerciseCardProps) {
  const [editing, setEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedDetails, setEditedDetails] = useState(details);

  const handleSave = () => {
    onEdit(editedName, editedDetails);
    setEditing(false);
  };

  return (
    <div className={`card ${completed ? 'completed' : ''}`}>
      <div className="infoContainer">
        <div className="iconWrapper">{icon}</div>
        <div>
          {editing ? (
            <>
              <input
                value={editedName}
                onChange={e => setEditedName(e.target.value)}
                className="exerciseNameInput"
              />
              <input
                value={editedDetails}
                onChange={e => setEditedDetails(e.target.value)}
                className="exerciseDetailsInput"
              />
            </>
          ) : (
            <>
              <h3 className="exerciseName">{name}</h3>
              <p className="exerciseDetails">{details}</p>
            </>
          )}
        </div>
      </div>
      <div className="actions">
        {!completed && !editing && (
          <button className="completeButton" onClick={onComplete}>
            <CheckCircle size={16} />
          </button>
        )}
        {editing ? (
          <button onClick={handleSave}>Salvar</button>
        ) : (
          <button onClick={() => setEditing(true)}>Editar</button>
        )}
        <button className="deleteButton" onClick={onDelete}>
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}


export default function PaginaCompleta() {
  const [exercises, setExercises] = useState([
    { id: 1, name: 'Supino Reto', details: '4 séries x 12 repetições', icon: <Dumbbell size={24} />, completed: false },
    { id: 2, name: 'Crucifixo', details: '3 séries x 15 repetições', icon: <Weight size={24} />, completed: false },
    { id: 3, name: 'Extensão de Tríceps', details: '4 séries x 12 repetições', icon: <Activity size={24} />, completed: false },
    { id: 4, name: 'Corda na Polia', details: '3 séries x 15 repetições', icon: <Dumbbell size={24} />, completed: false },
  ]);

  const [newName, setNewName] = useState('');
  const [newDetails, setNewDetails] = useState('');

  const handleComplete = (id: number) => {
    setExercises(prev =>
      prev.map(ex =>
        ex.id === id ? { ...ex, completed: true } : ex
      )
    );
  };

  const handleDelete = (id: number) => {
    setExercises(prev => prev.filter(ex => ex.id !== id));
  };

  const handleEdit = (id: number, name: string, details: string) => {
    setExercises(prev =>
      prev.map(ex =>
        ex.id === id ? { ...ex, name, details } : ex
      )
    );
  };

  const handleAddExercise = () => {
    if (newName.trim() && newDetails.trim()) {
      const newExercise = {
        id: Date.now(),
        name: newName,
        details: newDetails,
        icon: <Dumbbell size={24} />, // ícone padrão
        completed: false,
      };
      setExercises(prev => [...prev, newExercise]);
      setNewName('');
      setNewDetails('');
    }
  };

  const completedCount = exercises.filter(e => e.completed).length;
  const totalCount = exercises.length;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div>
      

      <main className="main">
        <section className="titleSection">
          <h1 className="title">Treino de Hoje</h1>
          <p className="subtitle">Segunda-feira - Treino de Peito e Tríceps</p>
        </section>

        <section className="exerciseList">
          {exercises.map(exercise => (
            <ExerciseCard
              key={exercise.id}
              name={exercise.name}
              details={exercise.details}
              icon={exercise.icon}
              completed={exercise.completed}
              onComplete={() => handleComplete(exercise.id)}
              onDelete={() => handleDelete(exercise.id)}
              onEdit={(name, details) => handleEdit(exercise.id, name, details)}
            />
          ))}
        </section>

        <section className="addExerciseSection">
          <h3>Adicionar Novo Exercício</h3>
          <input
            placeholder="Nome do exercício"
            value={newName}
            onChange={e => setNewName(e.target.value)}
          />
          <input
            placeholder="Detalhes (ex: 4x12)"
            value={newDetails}
            onChange={e => setNewDetails(e.target.value)}
          />
          <button onClick={handleAddExercise}>Adicionar</button>
        </section>

        <section className="progressBanner">
          <div>
            <h2 className="progressTitle">Progresso do Treino</h2>
            <p className="progressSubtitle">
              {completedCount} de {totalCount} exercícios completados
            </p>
          </div>
          <div className="progressCircle">
            <span>{progress}%</span>
          </div>
        </section>

        <button className="finalizeButton" disabled={progress < 100}>
          Finalizar Treino
        </button>
      </main>
    </div>
  );
}
