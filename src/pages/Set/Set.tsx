import React, {useEffect, useState, useMemo} from 'react'
import { useQuery } from 'react-query'
import { useMatch, useNavigate, useLocation } from '@tanstack/react-location'
//redux
import { useAppDispatch, useAppSelector } from '@app/hooks/redux_hooks'
import { setSetName } from '@redux/reducer/CategoriesReducer'
import { setPaintingDataFrame, setPaintingDataPaint, setPaintingsData } from '@app/redux/reducer/SetsReducer'
import { setCartData, updateCartDataFrame, updateCartDataPaint } from '@app/redux/reducer/CartReducer'
//styles
import classNames from 'classnames/bind'
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
import SetCards from '@app/components/SetCards/SetCards'
import ImageModal from '@app/components/Modals/ImageModal/ImageModal'

//lib
import Button from '@app/compLibrary/Button'
import Accordion from '@app/compLibrary/Accordion'
import Row from '@app/compLibrary/Grid/Row'
import Col from '@app/compLibrary/Grid/Col'
//images
import adds from '@app/assets/images/adds.png'
//image-slider 
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'


const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

const cn = classNames.bind(styles)
const Sets = () => {
  const match = useMatch()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const location = useLocation()
  // console.log('location', useLocation())

  //states
  const setsData = useAppSelector(state => state.setsReducer.setsData)
  const paintingsData = useAppSelector(state => state.setsReducer.paintingsData)
  const cartData = useAppSelector(state => state.cartReducer.cartData)
  // console.log('cartdata00', cartData[0])

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
      // console.log("setData", setData)
      dispatch(setSetName(setData?.titleSets))
      setImage(getImage(setData?.coverImageName?.[0]!)!)
      const leverage = setData!.paintingsName.map(painting => {
        const frame = framesData?.[0]
        const printSizePost = painting.printSizePost[0]
        return {
          _id: painting._id,  
          total: Number(printSizePost?.pricePost + frame?.frameСost!),
          paint: {
            _id: painting._id, 
            initialCost: printSizePost.pricePost, 
            cost: printSizePost.pricePost,
            size: printSizePost.prSize,
            name: painting.title, 
            src: painting.coverImageName?.filename, 
            quantity: painting.quantity
          }, 
          frame: {
            _id: frame?._id, 
            initialCost: frame?.frameСost,
            cost: frame?.frameСost, 
            size: frame?.frameSize, 
            name: frame?.frameName, 
            src: frame?.coverImageName?.filename,
            quantity: frame?.quantity
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
    console.log('cartData', cartData)
  }, [cartData])



  return (
    <div className={styles.set__container}>
      <ImageModal 
        show={openModal}
        setShow={() => setOpenModal(false)}
        // set={modalImage}
        selectedSet={selectedPainting}
      />


      <div className={styles.selected__set}>
        <div className={styles.image}>
          <Slide>
            <img src={image} className={styles.imgLg}/>
            <img src={image} className={styles.imgLg}/>
            <img src={image} className={styles.imgLg}/>
            <img src={image} className={styles.imgLg}/>
            <img src={image} className={styles.imgLg}/>
          </Slide>
          <div className={styles.images}>
  
            <img src={image} onClick={() => console.log("location", location)}/>
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
                        dispatch(updateCartDataPaint({data, id: painting._id}))
                      }}
                      fetchStatuses={{isLoading: isSetsLoading, isError: isSetsError}}
                      title={printSizeList?.[0]}
                    />
                    <DropDownSelect 
                      data={framesList!}
                      onChange={(data) => {
                        dispatch(setPaintingDataFrame({data, id: painting._id}))
                        dispatch(updateCartDataFrame({data, id: painting._id}))
                      }}
                      fetchStatuses={{isLoading: isSetsLoading, isError: isSetsError}}
                      title={framesList?.[0]}
                      renderNameWithSize
                    />
                    <button  className={cn({
                      addToCartBtn: true, 
                      disabled: (cartData.length > 0 && cartData.some(data => data._id === painting._id)) 
                    })} 
                    onClick={() => dispatch(setCartData(paintingsData[index]))}
                    >
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
              Перейти в корзину
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




      <div className={styles.presentCertificateContainer}>
        <div className={styles.presentCertificate}>
          <div className={styles.presentChild}>
              <div className={styles.header}>
                <h1>Подарочный сертификат</h1>
                <p>то что понравится вашим близким</p>
              </div>
              <p className={styles.more}>Подробнее</p>
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