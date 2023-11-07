import React, { Children, ReactNode } from 'react'
//styles
import styles from './Layout.module.scss';
import TopNavbar from '../TopNavbar/TopNavbar';
import BottomFooter from '../BottomFooter/BottomFooter';
import Tracker from '../Tracker/Tracker';


type LayoutProps = {
    children: ReactNode
 }
const Layout = ({ children }: LayoutProps) => {

  return (
    <div className={styles.layout}>
      <TopNavbar />
      <div className={styles.layoutContent}>
        <Tracker />
        {children}
      </div>
      <BottomFooter />
    </div>
  )
}

export default Layout