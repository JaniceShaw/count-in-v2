import styles from './Menu.module.css';

const Menu = ({ onDisplayChange, display = 'learn', onToggleMenu }) => {

    const clickHandler = (e) => {
        onDisplayChange(e);
        console.log('test', display);
    }

    return (
        <>
            <label className={styles["hamburger-menu"]}>
                <input type='checkbox' />
            </label>

            <aside className={styles.sidebar}>
                <nav className={styles}>
                    {/* <div onClick={() => { onToggleMenu() }}>Close</div> */}
                    <ul>
                        <li onClick={() => { clickHandler('learn') }} className={display === 'learn' ? `${styles.selected}` : undefined}>Learn</li>
                        <li onClick={() => { clickHandler('practice') }} className={display === 'practice' ? `${styles.selected}` : undefined}>Practice</li>
                        <li onClick={() => { clickHandler('challenge') }} className={display === 'challenge' ? `${styles.selected}` : undefined}>Time Challenge</li>
                        <li onClick={() => { clickHandler('help') }} className={display === 'help' ? `${styles.selected}` : undefined}>Help</li>
                    </ul>
                </nav >
            </aside>

        </>
    )
}

export default Menu;
