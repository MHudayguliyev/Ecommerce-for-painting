import React, {useState, useEffect, useMemo} from 'react'
//react query
import { useQuery } from 'react-query';
import { useMatch, useNavigate } from '@tanstack/react-location';
// api
import { GetCategories, GetSets } from '@app/api/Queries/Getters';
//redux
import { useAppDispatch } from '@app/hooks/redux_hooks';
import { setCatalogName, setSetName } from '@app/redux/reducer/CategoriesReducer';
//images
import logo from '@app/assets/icons/logo.svg';
import homeDecor from '@app/assets/icons/homedecor_icon.svg';
import instagram from '@app/assets/icons/instagram_filled.svg';
import cart from '@app/assets/icons/cart _icon.svg';
import burger from '@app/assets/icons/burger_icon.svg';

//styles
import classNames from 'classnames/bind'
import styles from './TopNavbar.module.scss';
import { setSetsDataSortByCatalogs } from '@app/redux/reducer/SetsReducer';

const cn = classNames.bind(styles)
const TopNavbar = () => {
    const match = useMatch()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [show, setShow] = useState<boolean>(false)

    const {
        data: categoriesData, 
        isError: isCategoriesDataError, 
        isLoading: isCategoriesDataLoading, 
      } = useQuery('GetCategories', () => GetCategories())

      const {
        data: setsData, 
        isLoading: isSetsDataLoading, 
        isError: isSetsDataError, 
        refetch: refecthSetsData
      } = useQuery('GetSets', () => GetSets())


    const activeTab = useMemo(() => {
        const active = categoriesData?.find(category => category._id === match.params.catalogGuid)
        return active
    }, [categoriesData, match.params.catalogGuid])  
    
    useEffect(() => {
        if(activeTab)
            dispatch(setCatalogName({_id: activeTab?._id, title: activeTab?.catalogTitle}))
        else 
            dispatch(setCatalogName({_id: "", title: ""}))
    }, [activeTab])

    useEffect(() => {
        if(!match.params.setGuid)
            dispatch(setSetName('')) // empty setName
        
    }, [match.params])

    useEffect(() => {
        if(activeTab && (!isSetsDataError && !isSetsDataLoading))
        dispatch(setSetsDataSortByCatalogs({
            active: activeTab?.catalogTitle, 
            setsList: setsData!,
        }))
    }, [activeTab, setsData])





  return (
    <div className={cn({
        top__navbar: true, 
        navFullHeight: show
    })}>
        <div className={styles.flex1}>
            <div className={styles.homeDecor}>
                <img src={logo} alt='logo'/>
                <img src={homeDecor} alt='homeDecor'/>
            </div>

            <div className={styles.actions__container}>

                <div className={styles.actions}>
                    <div className={cn({
                        instagram: true, 
                    })}>
                        <img src={instagram} alt='instagram'/>
                        <p>Новинки каждый день</p>
                    </div>
                    <div onClick={() => navigate({to: '/cart', replace: true})} className={cn({
                        cart: true, 
                    })}>
                        <img src={cart} alt='cart'/>
                        <p>Корзина</p>
                    </div>
                </div>

                <img alt='burger' src={burger} onClick={() => setShow(!show)} className={styles.burger}/>

            </div>
        </div>

        <div className={styles.flex2}>
            {
                !isCategoriesDataError && !isCategoriesDataLoading ? (
                    <div className={cn({
                        categories: true, 
                        show: show
                    })} >
                        {
                            categoriesData?.map(category => (
                                <div onClick={() => {
                                    navigate({  to: `/catalogs/${category._id}`, replace: true })
                                }
                                    
                                } key={category._id} className={cn({
                                    category: true, 
                                    tabActive: activeTab?._id === category._id
                                })} >
                                    <p>{category.catalogTitle}</p>
                                </div>
                            ))
                        }
                    </div>
                ) : ""
            }
        </div>
    </div>
  )
}

export default TopNavbar