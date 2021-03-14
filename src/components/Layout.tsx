import React, {ReactNode} from 'react';
import Nav from './Nav'
import styles from '../../styles/Layout.module.scss'

interface Children {
  children: ReactNode
}

const Layout = ({ children }: Children) => {
  return (
    <>
      <Nav/>
      <div className={styles.container}>
        <main className={styles.main}>

          {children}
        </main>
      </div>
    </>
  )
}

export default Layout
