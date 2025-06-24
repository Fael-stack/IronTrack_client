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
import './page.css';

const AccountSettings: React.FC = () => {
  return (
    <div className="pageContainer">

      <header className="header">
        <div className="headerLeft">
          <FaHeartbeat className="headerLogoIcon" />
          <span className="headerLogoText">Iron Track</span>
        </div>
        <div className="headerRight">
          <FaBell className="headerIcon" />
          <div className="headerAvatarPlaceholder">
            <img src="/path/to/your/avatar.jpg" alt="User Avatar" className="headerAvatar" />
          </div>
          <div className="headerOtherAvatar"></div>
        </div>
      </header>

      <main className="mainContent">

        <div className="profileCard">
          <div className="profileInfo">
            <div className="profileAvatar">
              <img src="/path/to/your/profile-avatar.jpg" alt="Profile Avatar" className="profileAvatarImg" />
            </div>
            <div className="profileDetails">
              <h2 className="profileName">Sarah Johnson</h2>
              <p className="profileEmail">sarah.johnson@email.com</p>
              <span className="premiumBadge">Premium Member</span>
            </div>
          </div>
        </div>

        <div className="settingsCard">
          <h3 className="settingsTitle">Account Settings</h3>
          <ul className="settingsList">
            <li className="settingsItem">
              <a href="#" className="settingsLink">
                <div className="settingsLeft">
                  <FaUser className="settingsIcon" />
                  <span>Informações pessoais</span>
                </div>
                <FaChevronRight className="settingsArrow" />
              </a>
            </li>
            <li className="settingsItem">
              <a href="#" className="settingsLink">
                <div className="settingsLeft">
                  <FaShieldAlt className="settingsIcon" />
                  <span>Privacidade e segurança</span>
                </div>
                <FaChevronRight className="settingsArrow" />
              </a>
            </li>
            <li className="settingsItem">
              <a href="#" className="settingsLink">
                <div className="settingsLeft">
                  <FaBell className="settingsIcon" />
                  <span>Notificações</span>
                </div>
                <FaChevronRight className="settingsArrow" />
              </a>
            </li>
            <li className="settingsItem">
              <a href="#" className="settingsLink">
                <div className="settingsLeft">
                  <FaQuestionCircle className="settingsIcon" />
                  <span>Ajuda</span>
                </div>
                <FaChevronRight className="settingsArrow" />
              </a>
            </li>
            <li className="settingsItem">
              <a href="#" className="settingsLink">
                <div className="settingsLeft">
                  <FaSignOutAlt className="settingsIcon" />
                  <span>Sair</span>
                </div>
                <FaChevronRight className="settingsArrow" />
              </a>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default AccountSettings;