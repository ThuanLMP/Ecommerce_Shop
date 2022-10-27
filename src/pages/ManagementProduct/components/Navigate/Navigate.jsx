import styles from './Navigate.module.scss'
export default function Navigate({ listNav }) {

    return (
        <div className={styles.wrapNavList}>
            <ul>
                {
                    listNav.map((value, index) => {
                        return (
                            <>
                                <li>{value}</li>
                                {
                                    index < listNav.length - 1 ? <label>/</label> : <></>
                                }

                            </>

                        )
                    })
                }

            </ul>

        </div>
    )
}