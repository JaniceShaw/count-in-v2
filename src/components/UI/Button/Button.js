import React from 'react';

import styles from './Button.module.css';

const Button = ({ type, onClick, children, className, disabled }) => {
    return (
        <button type={type || 'button'} disabled={disabled} className={`${styles.button} ${className}`} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;