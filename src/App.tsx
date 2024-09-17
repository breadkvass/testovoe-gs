import styles from './App.module.css';
import FindTicketsPage from './findTicketsPage/findTicketsPage';

function App() {

  return (
    <div className={styles.layout}>
      <FindTicketsPage />
    </div>
  )
}

export default App
