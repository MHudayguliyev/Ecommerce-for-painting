import React, {useMemo, useState} from 'react'
//react-type-hooks
import { useAppSelector, useAppDispatch } from '@app/hooks/redux_hooks'
//redux actions 
import { deleteCartItem, descreaseQuantity, increaseQuantity } from '@app/redux/reducer/CartReducer';
// form controller
import { useFormik } from "formik";
//api mutation
import { useMutation } from 'react-query';
import { axiosInstance } from '@app/api/axiosInstance';

import * as Yup from 'yup';
//react hot toast 
import toast from 'react-hot-toast'
//icons 
import lupa from '@app/assets/icons/lupa_icon.svg'
import plus from '@app/assets/icons/plus.svg'
import minus from '@app/assets/icons/minus.svg'
import trash from '@app/assets/icons/trash.svg'
import help from '@app/assets/icons/help.svg'
import adds from '@app/assets/images/adds.png'

//styles
import classNames from 'classnames/bind';
import styles from './Cart.module.scss'
//utils
import { getPaintings } from '@utils/helpers'
//libs
import Button from '@app/compLibrary/Button'
import Input from '@app/compLibrary/Input';
import DropDownSelect from '@app/components/DropdownSelect/DropdownSelect';
import Accordion from '@app/compLibrary/Accordion';
//comps
import ImageModal from '@app/components/Modals/ImageModal/ImageModal';
//types
import { PostDataType } from '@app/api/Types';
import { PaintingsSubItemType } from '@app/redux/types/SetsTypes';
import { PostOrders } from '@app/api/Queries/Post';
import axios from 'axios';
import { post } from '@app/api/api_helper';

interface FormikTypes<T> {
  status: T
  address: T 
  name:T 
  phone:T
  insta:T
  email: T
  comments: T
  certificateCode: T
}

const regions = [
  {
    value: 1, 
    label: {name: 'Ашхабад'}
  },
  {
    value: 2, 
    label: {name: 'Лебап'}
  },
  {
    value: 3, 
    label: {name: 'Ахал'}
  },
  {
    value: 4, 
    label: {name: 'Дашогуз'}
  },
  {
    value: 5, 
    label: {name: 'Балканбат'}
  },
]

const cn = classNames.bind(styles)
const Cart = () => {
  const dispatch = useAppDispatch()

  const cartData = useAppSelector(state => state.cartReducer.cartData)
  // console.log('cartData', cartData)
  const [selectedRegion, setSelectedRegion] = useState<{
    value: number | string;
    label: {
        name?: string;
    };
    }>(regions[0])
    const [selectedPainting, setSelectedPainting] = useState({
      header: '', image: ''
    })
    const [deliveryType, setDeliveryType] = useState<string>('')
    const [paymentMethod, setPaymentMethod] = useState<string>('')
    const [openModal, setOpenModal] = useState<boolean>(false)

  const totalSum = useMemo(() => {
    let sum = 0;
    for(let i = 0; i < cartData.length; i++){
      const item = cartData[i]
      sum += item.total
    }
    return sum 
  }, [cartData])

  const formik = useFormik<FormikTypes<string>>({
    initialValues: {
      status: 'В ожидании', 
      name:'', 
      phone: '', 
      address: '', 
      comments: '', 
      insta: '', 
      email: '', 
      certificateCode: ''
    }, 
    validationSchema: Yup.object({
      name: Yup.string().required(), 
      phone: Yup.string().required().min(8).max(8), 
      address: Yup.string().required(), 
      comments: Yup.string(), 
      insta: Yup.string(),
      email:Yup.string().required(),
      certificateCode: Yup.string().min(8).max(8) 
    }),
    onSubmit: async (values, { resetForm }) => {
      // console.log("values", values)
      if(deliveryType === '')
        return toast.error("Please select delivery type.")
      else if(paymentMethod === '')
        return toast.error('Please select payment method.')

      if(cartData?.length <= 0)
        return toast.error('Please add decor first.')

        const forPost: PostDataType<string> = {
          CART: [], 
          totalCost: totalSum, 
          deliveryType, 
          paymentMethod,
          city: selectedRegion.label.name!, 
          address: values.address, 
          name: values.name, 
          phone: '+993 '.concat(values.phone), 
          insta: values.insta, 
          email: values.email, 
          comments: values.comments, 
        }
        for(let i = 0; i < cartData.length; i++){
          const item = cartData[i]
          const lev: (keyof PaintingsSubItemType)[] = ['frame', 'paint']
          for(let j = 0; j < lev.length; j++){
            const subItem = item[lev[j]];
            if(subItem !== undefined)
              forPost.CART.push({
                id: item._id, 
                title: subItem.name!, 
                size: subItem.size, 
                cost: subItem.cost, 
                img: subItem.src, 
                quantity: subItem.quantity
              })
          }
        }

        try {
          console.log(forPost)
          const response = await PostOrders(forPost)
          console.log('response', response)

          if(response.status === 200)
            toast.success('Your order successfully made.')
        } catch (error) {
          console.log('error', error)
        }

    }
  })



  return (
    <div className={styles.catalog__cart}>

      <ImageModal 
        show={openModal}
        setShow={() => setOpenModal(false)}
        // set={modalImage}
        selectedSet={selectedPainting}
      />
      
      <div className={styles.flexItem}>

        <div className={styles.cart}>
          <div className={styles.header}>
            <h1>Корзина</h1>
            <p>
              После оформления заказа, наш менеджер свяжеться с вами , для <br></br>
              согласования стоимости доставки. Сейчас вы ни за что не платите.
            </p>
          </div>

          <div className={styles.items}>
            {
              cartData?.length > 0 ? cartData?.map(cartItem => (
                <div className={styles.item} key={cartItem._id}>
                  {
                    cartItem.paint ? (
                      <div className={styles.painting}>
                        <div className={styles.image}>
                          <img src={getPaintings(cartItem.paint.src)} alt='paiting'/>
                          <img src={lupa} alt='lupa' onClick={() => {
                              setOpenModal(true)
                              setSelectedPainting(prev => ({...prev, image: getPaintings(cartItem.paint.src)!, header: cartItem?.paint.name!}))
                          }}/>
                        </div>

                        <div className={styles.paintingData}>
                          <h3>{cartItem.paint.name}</h3>
                          <div className={styles.sizeAndAmount}>

                            <div className={styles.size}>
                              <p>Размер: </p>
                              <p>{cartItem.paint.size}</p>
                            </div>

                            <div className={styles.amount}>
                              <p>Количество: </p>
                              <div>
                                <img src={minus} alt='minus' onClick={() => {
                                  if(cartItem.paint.quantity > 1)
                                    dispatch(descreaseQuantity({
                                      id: cartItem._id, 
                                      key: 'paint', 
                                      initialCost: cartItem.paint.initialCost
                                    }))
                                }}/>
                                  {cartItem.paint.quantity}
                                <img src={plus} alt='plus' onClick={() => 
                                  dispatch(increaseQuantity({
                                    id: cartItem._id, 
                                    key: 'paint', 
                                    initialCost: cartItem.paint.initialCost
                                  }))
                                }/>
                              </div>
                            </div>
                            
                            <img src={trash} alt='trash' className={styles.trash} onClick={() => dispatch(deleteCartItem({id: cartItem._id, key:'paint'}))}/>

                          </div>

                          <Button color='blue' style={{display: 'flex', width: '106px', justifyContent: 'center'}}>
                            {cartItem.paint.cost} ман.
                          </Button>
                        </div>

                      </div>
                    ) : ""
                  }

                  {
                    cartItem.frame ? (
                      <div className={styles.frame}>
                        <div className={styles.image}>
                          <img src={getPaintings(cartItem.frame.src!)} alt='paiting'/>
                          <img src={lupa} alt='lupa' onClick={() => {
                              setOpenModal(true)
                              setSelectedPainting(prev => ({...prev, image: getPaintings(cartItem.frame.src!)!, header: cartItem?.frame.name!}))
                          }}/>
                        </div>

                        <div className={styles.paintingData}>
                          <h3>{cartItem.frame.name}</h3>
                          <div className={styles.sizeAndAmount}>

                            <div className={styles.size}>
                              <p>Размер: </p>
                              <p>{cartItem.frame.size}</p>
                            </div>

                            <div className={styles.amount}>
                              <p>Количество: </p>
                              <div>
                                <img src={minus} alt='minus' onClick={() => {
                                  if(cartItem.frame.quantity > 1)
                                    dispatch(descreaseQuantity({
                                      id: cartItem._id, 
                                      key: 'frame', 
                                      initialCost: cartItem.frame.initialCost
                                    }))
                                }}/>
                                  {cartItem.frame.quantity}
                                <img src={plus} alt='plus' onClick={() => 
                                  dispatch(increaseQuantity({
                                    id: cartItem._id, 
                                    key: 'frame', 
                                    initialCost: cartItem.frame.initialCost
                                  }))
                                }/>
                              </div>
                            </div>
                            
                            <img src={trash} alt='trash' className={styles.trash} onClick={() => dispatch(deleteCartItem({id: cartItem._id, key:'frame'}))}/>

                          </div>

                          <Button color='blue' style={{display: 'flex', width: '106px', justifyContent: 'center'}}>
                            {cartItem.frame.cost} ман.
                          </Button>
                        </div>
                      </div>
                    ) : ""
                  }
                </div>
              )) : <h1>Not found</h1>
            }
          </div>
        </div>

        <div className={styles.checkOut}>
            <h2>Оформление заказа</h2>

            <form className={styles.the__form} onSubmit={formik.handleSubmit}>
              <div className={styles.radioFields}>
                  <div className={styles.deliveryTypes}>
                    <p>Вид доставки</p>
                    <div>
                      <label>Самовывоз</label>
                      <Input 
                        type='radio'
                        name='radioButton1'
                        value='pickup'
                        onChange={(e) => setDeliveryType(e.target.value)}
                      />
                      <label>Доставка</label>
                      <Input 
                        type='radio'
                        name='radioButton1'
                        value='delivery'
                        onChange={(e) => setDeliveryType(e.target.value)}
                      />
                    </div>
                    <span className={styles.borderBottom}></span>
                  </div>

                  <div className={styles.deliveryTypes}>
                    <p>Способ оплаты</p>
                    <div>
                      <label>Наличными</label>
                      <Input 
                        type='radio'
                        name='radioButton2'
                        value='cash'
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <label>Онлайн оплата</label>
                      <Input 
                        type='radio'
                        name='radioButton2'
                        value='onlinePayment'
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                    </div>
                    <span className={styles.borderBottom}></span>
                  </div>

              </div>

              <div className={styles.addressFields}>
                <p>Адрес доставки</p>

                <div className={styles.fields}>
                  <label>Город</label>
                  <DropDownSelect 
                    data={regions}
                    onChange={(data) => setSelectedRegion(data)}
                    fetchStatuses={{isLoading: false, isError: false}}
                    renderNameOnly
                    title={selectedRegion?.value !== -1 ? selectedRegion : regions[0]}
                  />
                  <label>Адрес</label>
                  <div className={cn({
                    inputField:true, 
                    errorField: formik.errors.address
                  })}>
                    <Input 
                      type='text'
                      name='address'
                      className={styles.textField}
                      value={formik.values.address}
                      onChange={formik.handleChange}
                    />
                  </div>
                </div>

                <span className={styles.borderBottom}></span>


              </div>

              <div className={styles.contactFields}>
                <p>Ваши контакты</p>

                <div className={styles.fields}>
                  <label>Фамилия, имя</label>
                  <div className={cn({
                    inputField:true, 
                    errorField: formik.errors.name
                  })}>
                    <Input 
                      type='text'
                      name='name'
                      className={styles.textField}
                      value={formik.values.name}
                      onChange={formik.handleChange}
                    />
                  </div>

                  <label>Номер телефона</label>
                  <div className={styles.fieldWithHelp}>
                    <span>+993</span>
                    <div className={cn({
                      inputField:true, 
                      errorField: formik.errors.phone
                    })}>
                      <Input 
                        type='text'
                        name='phone'
                        className={styles.textField}
                        paddingLeft
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                      />
                    </div>
                    <img src={help} alt='help'/>
                  </div>



                  <label>Вы в Instagram</label>
                  <div className={styles.fieldWithHelp}>
                    <div className={cn({
                      inputField:true, 
                      errorField: formik.errors.insta
                    })}>
                      <Input 
                        type='text'
                        name='insta'
                        className={styles.textField}
                        value={formik.values.insta}
                        onChange={formik.handleChange}
                      />
                    </div>
                    <img src={help} alt='help'/>
                  </div>

                  <label>E-mail (вышлем подтверждение заказа)</label>
                  <div className={cn({
                      inputField:true, 
                      errorField: formik.errors.email
                    })}>
                    <Input 
                      type='email'
                      name='email'
                      className={styles.textField}
                      value={formik.values.email}
                      onChange={formik.handleChange}
                    />
                  </div>

                  <label>Комментарий</label>
                  <textarea value={formik.values.comments} onChange={formik.handleChange} name='comments'></textarea>

                  <label>Номер подарочного сертификата</label>
                  <div className={styles.fieldWithHelp}>
                    <div className={cn({
                      inputField:true, 
                      errorField: formik.errors.certificateCode
                    })}>
                      <Input 
                        type='text'
                        name='certificateCode'
                        className={styles.textField}
                        value={formik.values.certificateCode}
                        onChange={formik.handleChange}
                      />
                    </div>
                    <img src={help} alt='help'/>
                  </div>
                </div>
              </div>


              <div className={styles.order__now}>
                <div className={styles.header}>
                  <p>Итого:</p>
                  <p>{totalSum} ман.</p>
                </div>

                <Button htmlType='submit'>
                  Оформить заказ
                </Button>
              </div>
            </form>




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

    </div>
  )
}

export default Cart