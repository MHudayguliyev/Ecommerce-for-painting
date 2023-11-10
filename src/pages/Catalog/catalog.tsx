import React, {useEffect, useState, useMemo} from 'react'
//reactquery
import { useQuery } from 'react-query';
import { useMatch, useNavigate } from '@tanstack/react-location';
//api
import { GetCategories, GetCategory, GetSets } from '@app/api/Queries/Getters';
//redux 
import { useAppSelector, useAppDispatch } from '@app/hooks/redux_hooks';
//types
import { SubCategories } from '@app/api/Types';
//styles
import classNames from 'classnames/bind'
import styles from './catalog.module.scss';
//lib
import Row from '@app/compLibrary/Grid/Row';
import Preloader from '@app/compLibrary/Preloader';
import Col from '@app/compLibrary/Grid/Col';
import SetCards from '@app/components/SetCards/SetCards';
//utils
import { getImage } from '@utils/helpers';
//icons
import adds from '@app/assets/images/adds.png'
import { setSetsDataSortByCatalogs, setSetsDataSortBySubCatalogs } from '@app/redux/reducer/SetsReducer';

const cn = classNames.bind(styles)
const Catalog = () => {
  const match = useMatch()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  //states
  const {setsData, setsDataLoading} = useAppSelector(state => state.setsReducer)
  const [subCategoryData, setSubCategoryData] = useState<SubCategories[]>([])
  //queries
  const {
    data: categoryData, 
    isLoading, 
    isError, 
  } = useQuery(['GetCategory', match.params.catalogGuid], () => GetCategory(match.params.catalogGuid), {enabled: !!match.params.catalogGuid})
  
  const {data: setsList} = useQuery('GetSets', () => GetSets())
  const {data: categoriesData} = useQuery('GetCategories', () => GetCategories())

  useEffect(() => {
    if(!isError && !isLoading){
      if(categoryData?.subCatalogsName?.length! > 0){
        const data = [...categoryData?.subCatalogsName!]
        data.unshift({
          _id: match.params.catalogGuid as string, 
          subcatalogTitle: 'Все', 
          coverImageName: null, 
          createdDate: new Date().toLocaleDateString(),
          __v: 0
        })
        setSubCategoryData(data ?? [])
      }else setSubCategoryData([])
    }
  }, [categoryData])

  const activeTab = useMemo(() => {
    const active = categoriesData?.find(category => category._id === match.params.catalogGuid)
    return active
  }, [categoriesData, match.params.catalogGuid])  

  const activeSubTab = useMemo(() => {
    const active = subCategoryData?.find(item => item._id === match.params.subCatalogGuid)
    return active
  }, [subCategoryData, match.params.subCatalogGuid])


  useEffect(() => {
    if(activeSubTab)
      dispatch(setSetsDataSortBySubCatalogs({
        active: activeSubTab?.subcatalogTitle, 
        setsList: setsList!,
      }))
  }, [activeSubTab])

  
  return (
    <div className={styles.catalogs}>
        <div className={styles.sub__categories}>
            {
              subCategoryData?.map(subCategory => {
                const path = `/catalogs/${match.params.catalogGuid}/sub-catalogs/${subCategory._id}`
                return (
                  <div title={subCategory?.subcatalogTitle}  key={subCategory._id} className={cn({
                    sub_category: true, 
                    subCategoryActive: activeSubTab?._id === subCategory._id || (subCategory.subcatalogTitle === 'Все' && !match.params.subCatalogGuid)
                  })}
                  onClick={() => {
                    if(subCategory.subcatalogTitle === 'Все'){
                      navigate({to: `/catalogs/${subCategory._id}`})
                      dispatch(setSetsDataSortByCatalogs({
                        active: activeTab?.catalogTitle as string, 
                        setsList: setsList!
                      }))
                    }
                    else 
                    navigate({to: path, replace: true})
                  }}
                  > 
                    <p>{subCategory.subcatalogTitle}</p>
                  </div>
                ) 
              })
            }
        </div>


        <div className={styles.main__content}>
          <div className={styles.sets}>
            {
              setsDataLoading ? <span><Preloader /></span> : 
              <Row colGutter={10} rowGutter={10}>
                {
                  setsData?.map(set => (
                    <Col key={set._id} grid={{sm: 12, md: 6, lg: 6, xlg: 4, xxlg: 3}}>
                        <SetCards 
                          set={getImage(set.coverImageName[0])}
                          onClick={() => navigate({to: `/catalogs/${match.params.catalogGuid}/set/${set._id}`, replace: true})}
                        />
                    </Col>
                  ))
                }
              </Row>
            }
          </div>

          <div className={styles.adds}>
              <div className={styles.addsChild}>
                  <img src={adds} alt='adds'/>
                  <div >
                    <p>Здесь могла бы быть ваша реклама</p>
                  </div>
              </div>
          </div>

        </div>
    </div>
  )
}

export default Catalog