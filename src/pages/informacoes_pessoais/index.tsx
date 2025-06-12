import React from 'react';
import styles from './informacoes_pessoais.module.css';

export const informacoes_pessoais = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Informações pessoais</h1>

      <form className={styles.form}>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Nome:</label>
          <input type="text" className={styles.input} placeholder="Emma Myers" />
          <button type="button" className={styles.editButton}>Alterar</button>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Telefone:</label>
          <input type="text" className={styles.input} placeholder="55+ (11) 989999696" />
          <button type="button" className={styles.editButton}>Alterar</button>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Email:</label>
          <input type="email" className={styles.input} placeholder="emmamyers@gmail.com" />
          <button type="button" className={styles.editButton}>Alterar</button>
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.saveButton}>Salvar</button>
          <button type="button" className={styles.cancelButton}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default informacoes_pessoais 
