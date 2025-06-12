import React from 'react';
import styles from './seguranca.module.css';

export const seguranca = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Segurança</h1>

      <form className={styles.form}>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Senha:</label>
          <input type="text" className={styles.input} placeholder="Emma Myers" />
          <button type="button" className={styles.editButton}>Alterar</button>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Email de recuperação:</label>
          <input type="text" className={styles.input} placeholder="55+ (11) 989999696" />
          <button type="button" className={styles.editButton}>Alterar</button>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Autentificação de dois fatores:</label>
          <button type="button" className={styles.editButton}>Ligar</button>
          <button type="button" className={styles.editButton}>Desligar</button>
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.saveButton}>Salvar</button>
          <button type="button" className={styles.cancelButton}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default seguranca 
