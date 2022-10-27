import AppBar from "../components/AppBar";
import NavBar from "../components/NavBar";
import styles from './index.module.scss'


export default function AdminLayout({ children }) {
    return (
        <div className={styles.wrap}>
            <NavBar />
            <div className={styles.wrapContent}>
                <AppBar />
                <div className={styles.children}>
                    {children}
                </div>
            </div>
        </div>
    )
}