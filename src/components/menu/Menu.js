import styles from './Menu.module.css';

const Menu = ()=>{

    const clickHandler = (e)=>{
        console.log('clicked', e.target);
    }

    return(
        <menu className={styles.menu}>
           <ul>
            <li onClick={clickHandler}>Learn</li>
            <li>Practice</li>
            <li>Quizz</li>
            <li>Help</li>
           </ul>
        </menu>
    )
}

export default Menu;
