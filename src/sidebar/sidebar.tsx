import { ReactNode } from 'react';
import styles from './sidebar.module.css';

type TChildren = {
  children: ReactNode;
}

function Sidebar({ children }: TChildren) {

    return (
      <div className={styles.sidebar}>
        {children}
      </div>
    )
  }
  
export default Sidebar;