import React from 'react'
import { Link, useMatch } from '@tanstack/react-location'
//redux 
import { useAppSelector } from '@app/hooks/redux_hooks'
//icons 
import arrowRight from '@app/assets/icons/arrow_right.svg'
//styles
import styles from './Tracker.module.scss'


const Tracker = () => {
    const match = useMatch()
    const {_id, title} = useAppSelector(state => state.categoriesReducer.catalog)
    const setterName = useAppSelector(state => state.categoriesReducer.setName)
    console.log('match', match.pathname)

  return (
    <div className={styles.tracker}>
        <Link>Главная</Link>
            {
                title !== '' ? 
                    <img src={arrowRight} alt='arrow_right'/> : ""
            }
        <Link to={`/catalogs/${_id}`}>
            {title ?? ""}
        </Link>
            {
                setterName !== '' ? 
                    <img src={arrowRight} alt='arrow_right'/> : ""
            }
        <Link >
            {setterName ?? ""}
        </Link>
        {
            match.pathname === '/cart'  ? 
                <>
                    <img src={arrowRight} alt='arrow_right' style={{marginLeft: '-10px'}}/>
                    <Link to={'/cart'}>
                        Корзина
                    </Link> 
                </>
                : ""
        }
    </div>

  )
}

export default Tracker