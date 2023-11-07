import React, {useState} from 'react'
//react-type-hooks
import { useAppSelector } from '@app/hooks/redux_hooks'
// form controller
import { useFormik } from "formik";
import * as Yup from 'yup';
//icons 
import lupa from '@app/assets/icons/lupa_icon.svg'
import plus from '@app/assets/icons/plus.svg'
import minus from '@app/assets/icons/minus.svg'
import trash from '@app/assets/icons/trash.svg'
import help from '@app/assets/icons/help.svg'
import adds from '@app/assets/images/adds.png'

//styles
import styles from './Cart.module.scss'
//utils
import { getPaintings } from '@utils/helpers'
//libs
import Button from '@app/compLibrary/Button'
import Input from '@app/compLibrary/Input';
import DropDownSelect from '@app/components/DropdownSelect/DropdownSelect';
import Accordion from '@app/compLibrary/Accordion';
const Cart = () => {
  const cartItems = useAppSelector(state => state.setsReducer.paintingsData)
  const [selectedRegion, setSelectedRegion] = useState<{
    value: number | string;
    label: {
        name?: string;
    };
    }>({
      value: -1, 
      label: {name: ''}
    })

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

  return (
    <div className={styles.catalog__cart}>
      
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
              cartItems && cartItems?.map(cartItem => (
                <div className={styles.item} key={cartItem._id}>
                  <div className={styles.painting}>

                    <div className={styles.image}>
                      <img src={getPaintings(cartItem.paint.src)} alt='paiting'/>
                      <img src={lupa} alt='lupa'/>
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
                            <img src={minus} alt='minus' />
                              1
                            <img src={plus} alt='plus'/>
                          </div>
                        </div>
                        
                        <img src={trash} alt='trash' className={styles.trash}/>

                      </div>

                      <Button color='blue' style={{display: 'flex', width: '106px', justifyContent: 'center'}}>
                        {cartItem.paint.cost} ман.
                      </Button>
                    </div>

                  </div>

                  <div className={styles.frame}>
                    <div className={styles.image}>
                      <img src={getPaintings(cartItem.frame.src!)} alt='paiting'/>
                      <img src={lupa} alt='lupa'/>
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
                            <img src={minus} alt='minus' />
                              1
                            <img src={plus} alt='plus'/>
                          </div>
                        </div>
                        
                        <img src={trash} alt='trash' className={styles.trash}/>

                      </div>

                      <Button color='blue' style={{display: 'flex', width: '106px', justifyContent: 'center'}}>
                        {cartItem.frame.cost} ман.
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>

        <div className={styles.checkOut}>
            <h2>Оформление заказа</h2>

            <form className={styles.the__form}>
              <div className={styles.radioFields}>
                  <div className={styles.deliveryTypes}>
                    <p>Вид доставки</p>
                    <div>
                      <label>Самовывоз</label>
                      <Input 
                        type='radio'
                        name='radioButton1'
                      />
                      <Input 
                        type='radio'
                        name='radioButton1'
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
                      />
                      <label>Онлайн оплата</label>
                      <Input 
                        type='radio'
                        name='radioButton2'
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
                    onChange={(data) => {setSelectedRegion(data)}}
                    fetchStatuses={{isLoading: false, isError: false}}
                    renderNameOnly
                    title={selectedRegion?.value !== -1 ? selectedRegion : regions[0]}
                  />
                  <label>Адрес</label>
                  <div className={styles.inputField}>
                    <Input 
                      type='text'
                      className={styles.textField}
                    />
                  </div>
                </div>

                <span className={styles.borderBottom}></span>


              </div>

              <div className={styles.contactFields}>
                <p>Ваши контакты</p>

                <div className={styles.fields}>
                  <label>Фамилия, имя</label>
                  <div className={styles.inputField}>
                    <Input 
                      type='text'
                      className={styles.textField}
                    />
                  </div>

                  <label>Номер телефона</label>
                  <div className={styles.fieldWithHelp}>
                    <span>+993</span>
                    <div className={styles.inputField}>
                      <Input 
                        type='text'
                        className={styles.textField}
                        paddingLeft
                      />
                    </div>
                    <img src={help} alt='help'/>
                  </div>



                  <label>Вы в Instagram</label>
                  <div className={styles.fieldWithHelp}>
                    <div className={styles.inputField}>
                      <Input 
                        type='text'
                        className={styles.textField}
                      />
                    </div>
                    <img src={help} alt='help'/>
                  </div>

                  <label>E-mail (вышлем подтверждение заказа)</label>
                  <div className={styles.inputField}>
                    <Input 
                      type='email'
                      className={styles.textField}
                    />
                  </div>

                  <label>Комментарий</label>
                  <textarea>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam varius pellentesque fermentum amet tincidunt iaculis at. Aliquam nec urna, pretium tortor maecenas viverra elit amet. Ut non purus rhoncus pharetra mattis at diam elementum tincidunt. Venenatis amet, amet praesent sit ullamcorper.
                  </textarea>

                  <label>Номер подарочного сертификата</label>
                  <div className={styles.fieldWithHelp}>
                    <div className={styles.inputField}>
                      <Input 
                        type='text'
                        className={styles.textField}
                      />
                    </div>
                    <img src={help} alt='help'/>
                  </div>
                </div>
              </div>


              <div className={styles.order__now}>
                <div className={styles.header}>
                  <p>Итого:</p>
                  <p>750 ман.</p>
                </div>

                <Button>
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