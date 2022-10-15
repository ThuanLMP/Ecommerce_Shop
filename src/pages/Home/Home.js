import { HeaderOnly } from "../../layouts";
import styles from './Home.module.scss'

export default function Home() {
    return (
        <HeaderOnly>
            <div className={styles.home}>
                <h1>Home</h1>
            </div>
        </HeaderOnly>
    )
}