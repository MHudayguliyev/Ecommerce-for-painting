import React, {useEffect, useState, useMemo} from 'react'
import { useQuery } from 'react-query'
import { useMatch, useNavigate } from '@tanstack/react-location'
//redux
import { useAppDispatch, useAppSelector } from '@app/hooks/redux_hooks'
import { setSetName } from '@redux/reducer/CategoriesReducer'
//styles
import styles from './Set.module.scss'
//queries
import { GetFrames, GetSet } from '@app/api/Queries/Getters'
//utils
import { getImage, getPaintings } from '@utils/helpers'
//icons 
import lupa from '@app/assets/icons/lupa_icon.svg'
import arrowDown from '@app/assets/icons/arrow_down_white.svg';
//comp
import DropDownSelect from '@app/components/DropdownSelect/DropdownSelect'
//lib
import Button from '@app/compLibrary/Button'
import Accordion from '@app/compLibrary/Accordion'
//images
import adds from '@app/assets/images/adds.png'
import Row from '@app/compLibrary/Grid/Row'
import Col from '@app/compLibrary/Grid/Col'
import SetCards from '@app/components/SetCards/SetCards'
import ImageModal from '@app/components/Modals/ImageModal/ImageModal'
import { addToCart, setPaintingDataFrame, setPaintingDataPaint, setPaintingsData } from '@app/redux/reducer/SetsReducer'

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

const Sets = () => {
  const match = useMatch()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  //states
  const setsData = useAppSelector(state => state.setsReducer.setsData)
  const paintingsData = useAppSelector(state => state.setsReducer.paintingsData)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [selectedPainting, setSelectedPainting] = useState({
    header: '', image: ''
  })
  const [image, setImage] = useState<string>('')

  const {
    data: setData, 
    isLoading: isSetsLoading, 
    isError: isSetsError
  } = useQuery(['GetSet', match.params.setGuid], () => GetSet(match.params.setGuid), {enabled: !!match.params.setGuid})

  const {
    data: framesData, 
    isLoading: isFramesLoading, 
    isError: isFramesError
  } = useQuery('GetFrames', () => GetFrames(), {enabled: !!match.params.setGuid})

  useEffect(() => {
    if(
      (!isSetsLoading && !isSetsError) && 
      (!isFramesLoading && !isFramesError)
    ){
      dispatch(setSetName(setData?.titleSets))
      setImage(getImage(setData?.coverImageName?.[0]!)!)
      const leverage = setData?.paintingsName?.map(painting => {
        const frame = framesData?.[0]
        const printSizePost = painting?.printSizePost?.[0]
        return {
          _id: painting?._id,  
          total: Number(printSizePost?.pricePost + frame?.frameСost!),
          addedToCart: false, 
          paint: {
            cost: printSizePost?.pricePost,
            size: printSizePost?.prSize,
            name: painting?.title, 
            src: painting.coverImageName?.filename, 
          }, 
          frame: {
            size: frame?.frameSize, 
            cost: frame?.frameСost, 
            name: frame?.frameName, 
            src: frame?.coverImageName?.filename
          }
        }
      })
      dispatch(setPaintingsData(leverage))
    }
  }, [setData, framesData])

  const framesList = useMemo(()=> {
    return framesData?.map(frame => {
      return {
        value: frame?._id,
        label: {
          size: frame?.frameSize, 
          cost: frame?.frameСost, 
          name: frame?.frameName
        }, 
        src: frame?.coverImageName?.filename, 
      }
    })
  }, [framesData])

  useEffect(() => {
    console.log('paint', paintingsData)
  }, [paintingsData])



  return (
    <div>
      <ImageModal 
        show={openModal}
        setShow={() => setOpenModal(false)}
        // set={modalImage}
        selectedSet={selectedPainting}
      />


      <div className={styles.selected__set}>
        <div className={styles.image}>
          <img src={image} className={styles.imgLg}/>
          <div className={styles.images}>
            <img src={image}/>
            <img src={image}/>
            <img src={image}/>
            <img src={image}/>
            <img src={image}/>
            <img src={image}/>
          </div>

        </div>

        <div className={styles.frames}>
          <h1>{setData?.titleSets}</h1>
          <p>Мы подчеркнули размеры, используемые в данном интерьере.</p>

          <div className={styles.flex__frames}>
            {
              setData && setData?.paintingsName ? setData?.paintingsName.map((painting, index) => {
                const printSizeList = painting?.printSizePost?.map(sizePost => {
                  return {
                    value: sizePost._id,
                    label: {
                      size: sizePost.prSize, 
                      cost: sizePost.pricePost
                    },
                  }
                }) 
                const paintingI = getPaintings(painting?.coverImageName?.filename)
                return (
                  <div key={painting?._id} className={styles.painting}>
                  <div className={styles.frameImage}>
                    <img src={paintingI} alt='frame'/>
                    <img src={lupa} alt='lupa' onClick={() => {
                      setOpenModal(true)
                      setSelectedPainting(prev => ({...prev, image: paintingI!, header: painting?.title}))
                    }}/>
                  </div>

                  <div className={styles.addToCartGroup}>
                    <DropDownSelect 
                      data={printSizeList}
                      onChange={(data) => {
                        dispatch(setPaintingDataPaint({data, id: painting._id}))
                      }}
                      fetchStatuses={{isLoading: isSetsLoading, isError: isSetsError}}
                      title={printSizeList?.[0]}
                    />
                    <DropDownSelect 
                      data={framesList!}
                      onChange={(data) => {
                        dispatch(setPaintingDataFrame({data, id: painting._id}))
                      }}
                      fetchStatuses={{isLoading: isSetsLoading, isError: isSetsError}}
                      title={framesList?.[0]}
                    />
                    <button className={styles.addToCartBtn} onClick={() => dispatch(addToCart({id: painting._id}))}>
                      <span>Добавить в корзину</span>
                      <span>
                        {paintingsData[index]?.total} ман.
                        <img src={arrowDown} alt='arrowDown'/>
                      </span>
                    </button>
                  </div>
                </div>
                )
              }
              ) : ""
            }

            <Button color='blue' style={{display: 'flex', justifyContent: 'center', width: '305px'}} onClick={() => navigate({to: '/cart', replace: true})}>
              Salam
            </Button>
          </div>

          <div className={styles.accordionGroup}>
            <Accordion rightContent={
              <div className={styles.accordionHeader}>Что происходит после оформления заказа?</div>
            }>
              <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
              </p>
            </Accordion>
            <Accordion rightContent={
              <div className={styles.accordionHeader}>Время работы</div>
            }>
              <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
              </p>
            </Accordion>
            <Accordion rightContent={
              <div className={styles.accordionHeader}>Как происходит оплата</div>
            }>
              <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
              </p>
            </Accordion>
            <Accordion rightContent={
              <div className={styles.accordionHeader}>Доставка</div>
            }>
              <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
              </p>
            </Accordion>
          </div>

        </div>
      </div>




      <div className={styles.adds}>
        <div className={styles.addsChild}>
            <img src={adds} alt='adds'/>
            <div >
              <p>Здесь могла бы быть ваша реклама</p>
            </div>
        </div>
      </div>

      <div className={styles.recommendations}>
        <h3>Похожие постеры</h3>

        <Row colGutter={10} rowGutter={10}>
          {
            setsData && setsData?.map(set => {
              if(set._id === match.params.setGuid){
                return null
              } 
              return (
                <Col key={set._id}>
                  <SetCards 
                    set={getImage(set.coverImageName[0])}
                    onClick={() => {
                      navigate({to: `/catalogs/${match.params.catalogGuid}/set/${set._id}`, replace: true})
                      scrollToTop()
                    }}
                  />
                </Col>
              )
            }
            )
          }
        </Row>
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
  )
}

export default Sets