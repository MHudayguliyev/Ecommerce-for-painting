import React from 'react'
//styles 
import styles from './SetCards.module.scss'

interface SetCardsProps {
    set:string | undefined
    onClick?: () => void 
}

const SetCards = (props: SetCardsProps) => {
  return (
    <div className={styles.set__cards} onClick={() => props.onClick && props.onClick()}>
        <img src={props.set} alt='set'/>
    </div>
  )
}

export default SetCards