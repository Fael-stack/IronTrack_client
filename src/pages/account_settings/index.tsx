import React from 'react';
import {
  FaHeartbeat, 
  FaUser, 
  FaShieldAlt, 
  FaBell, 
  FaQuestionCircle, 
  FaSignOutAlt, 
  FaChevronRight 
} from 'react-icons/fa';
import styles from './account.module.css';

const account_settings: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <FaHeartbeat className={styles.headerLogoIcon} />
          <span className={styles.headerLogoText}>Iron Track</span>
        </div>
        <div className={styles.headerRight}>
          <FaBell className={styles.headerIcon} />
          <div className={styles.headerAvatarPlaceholder}>
            
            <img src="/path/to/your/avatar.jpg" alt="User Avatar" className={styles.headerAvatar} />
          </div>
          
          <div className={styles.headerOtherAvatar}></div>
        </div>
      </header>

      <main className={styles.mainContent}>
        
        <div className={styles.profileCard}>
          <div className={styles.profileInfo}>
            <div className={styles.profileAvatar}>
              <img src="/path/to/your/profile-avatar.jpg" alt="Profile Avatar" className={styles.profileAvatarImg} />
            </div>
            <div className={styles.profileDetails}>
              <h2 className={styles.profileName}>Sarah Johnson</h2>
              <p className={styles.profileEmail}>sarah.johnson@email.com</p>
              <span className={styles.premiumBadge}>Premium Member</span>
            </div>
          </div>
        </div>

       
        <div className={styles.settingsCard}>
          <h3 className={styles.settingsTitle}>Account Settings</h3>
          <ul className={styles.settingsList}>
            <li className={styles.settingsItem}>
              <a href="#" className={styles.settingsLink}>
                <div className={styles.settingsLeft}>
                  <FaUser className={styles.settingsIcon} />
                  <span>Informações pessoais</span>
                </div>
                <FaChevronRight className={styles.settingsArrow} />
              </a>
            </li>
            <li className={styles.settingsItem}>
              <a href="#" className={styles.settingsLink}>
                <div className={styles.settingsLeft}>
                  <FaShieldAlt className={styles.settingsIcon} />
                  <span>Privacidade e segurança</span>
                </div>
                <FaChevronRight className={styles.settingsArrow} />
              </a>
            </li>
            <li className={styles.settingsItem}>
              <a href="#" className={styles.settingsLink}>
                <div className={styles.settingsLeft}>
                  <FaBell className={styles.settingsIcon} />
                  <span>Notificações</span>
                </div>
                <FaChevronRight className={styles.settingsArrow} />
              </a>
            </li>
            <li className={styles.settingsItem}>
              <a href="#" className={styles.settingsLink}>
                <div className={styles.settingsLeft}>
                  <FaQuestionCircle className={styles.settingsIcon} />
                  <span>Ajuda</span>
                </div>
                <FaChevronRight className={styles.settingsArrow} />
              </a>
            </li>
            <li className={styles.settingsItem}>
              <a href="#" className={styles.settingsLink}>
                <div className={styles.settingsLeft}>
                  <FaSignOutAlt className={styles.settingsIcon} />
                  <span>Sair</span>
                </div>
                <FaChevronRight className={styles.settingsArrow} />
              </a>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default account_settings;