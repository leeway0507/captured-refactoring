import styles from './spinner.module.css'

function Spinner() {
    return (
        <div className="flex-center grow">
            <div className={`${styles.loader}`} />
        </div>
    )
}

export default Spinner
