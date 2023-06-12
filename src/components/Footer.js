import React from "react";
import { NavLink } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer style={styles.footer}>
      <NavLink to={`https://github.com/Purva2803`} target="/">
        <FaGithub style={styles.icon} />
      </NavLink>
      <NavLink
        to={`https://www.linkedin.com/in/purva-rajyaguru-a1a52a1a0/`}
        target="/"
      >
        <FaLinkedin style={styles.icon} />
      </NavLink>
      <NavLink to={`https://twitter.com/Purva_28_03`} target="/">
        <FaTwitter style={styles.icon} />
      </NavLink>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#10000e',
    color: '#FFD700', // Golden yellow color
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: '#FFD700', // Golden yellow color
    margin: '0 10px',
  },
};
