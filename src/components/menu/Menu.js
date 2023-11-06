// import { logDOM } from '@testing-library/react';
import { useState } from 'react';
import styles from './Menu.module.css';

const Menu = ({ onDisplayChange, display = 'learn' }) => {
    const [expand, setExpand] = useState(false);

    const hamburgerClickHandler = (element) => {

        const target = element.currentTarget;
        const expanded = target.getAttribute('aria-expanded');

        if (expanded === 'false') {
            target.setAttribute('aria-expanded', 'true');
            // onToggleMenu(true);
            setExpand(true)
        } else {
            target.setAttribute('aria-expanded', false);
            // onToggleMenu(false);
            setExpand(false)
        }
    }
    const clickHandler = (link) => {
        onDisplayChange(link);
        setExpand(false);
    }

    return (
        <>
            <button className={styles["menu-button"]} aria-controls='primary-navigation' aria-expanded={expand} onClick={hamburgerClickHandler}>
                <svg className={styles.hamburger} viewBox='0 0 100 100' width='50'>
                    <rect
                        className={`${styles.line} ${styles.top}`}
                        width='70'
                        height='10'
                        x='15'
                        y={!expand ? '35' : '45'}
                        rx='5'
                    >

                    </rect>
                    <rect
                        className={styles.line + " " + styles.mid}
                        width='70'
                        height='10'
                        x='15'
                        y={!expand ? '55' : '45'}
                        rx='5'
                    ></rect>
                    <rect
                        className={styles.line + " " + styles.bottom}
                        width='70'
                        height='10'
                        x='15'
                        y={!expand ? '75' : '45'}
                        rx='5'
                    ></rect>
                </svg>
            </button >

            < aside className={`${styles.sidebar} ${expand ? styles.open : ''}`} >
                <nav>
                    <ul>
                        <li onClick={() => { clickHandler('learn') }} className={display === 'learn' ? `${styles.selected}` : undefined}>Learn</li>
                        <li onClick={() => { clickHandler('practice') }} className={display === 'practice' ? `${styles.selected}` : undefined}>Practice</li>
                        <li onClick={() => { clickHandler('challenge') }} className={display === 'challenge' ? `${styles.selected}` : undefined}>Time Challenge</li>
                        <li onClick={() => { clickHandler('help') }} className={display === 'help' ? `${styles.selected}` : undefined}>Help</li>
                    </ul>
                </nav >
            </aside >

        </>
    )
}

export default Menu;
