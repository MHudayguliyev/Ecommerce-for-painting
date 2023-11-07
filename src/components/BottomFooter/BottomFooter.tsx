import React from 'react'
//icons 
import logoLg from '@app/assets/icons/logo_lg.svg';
import reviews from '@app/assets/icons/reviews_icon.svg'
import partnerShip from '@app/assets/icons/partnership_icon.svg'
import frames from '@app/assets/icons/frame_icon.svg'
import price from '@app/assets/icons/prices_icon.svg'
import delivery from '@app/assets/icons/deliver_icon.svg'
import phone from '@app/assets/icons/tel_icon.svg'
import phone2 from '@app/assets/icons/tel2_ icon.svg'
import email from '@app/assets/icons/email_icon.svg'
import emailWithHeart from '@app/assets/icons/email_with_heart_icon.svg'
import imo from '@app/assets/icons/imo.svg'
import location from '@app/assets/icons/map_icon.svg'
import userAgreement from '@app/assets/icons/book_info_icon.svg'
import aboutUs from '@app/assets/icons/about_us_icon.svg'
import collection from '@app/assets/icons/collection_icon.svg'
//styles
import styles from './BottomFooter.module.scss';

const BottomFooter = () => {
    const frame1 = [
        {
            title: 'О нас', 
            image: aboutUs
        },
        {
            title: 'Отзывы', 
            image: reviews
        },
        {
            title: 'Сотрудничество', 
            image: partnerShip
        },
    ]
    const frame2 = [
        {
            title: 'Рамы и крепления', 
            image: frames
        },
        {
            title: 'Цены', 
            image: price
        },
        {
            title: 'Доставка и оплата', 
            image: delivery
        },
    ]
    const mainContacts = [
        {
            title: '+993 12 94 52 40', 
            image: phone, 
        },
        {
            title: '+993 12 94 52 41', 
            image: collection, 
        },
        {
            title: '+993 62 07 53 35', 
            image: phone2, 
        },
    ]
    const optionalContacts = [
        {
            title: 'homedecortm@yandex.ru', 
            image: email
        },
        {
            title: 'info@homedecortm.com', 
            image: emailWithHeart
        },
        {
            title: '+993 62 07 53 35', 
            image: imo
        },
    ]


  return (
    <div className={styles.bottom__footer}>
        <div className={styles.content}>
            <img src={logoLg} alt='logoLg'/>

            {/* flex1 */}
            <div className={styles.flex1}>

                <div className={styles.allFrames}>
                    <div className={styles.frames}>
                        {
                            frame1.map((frame, i) => (
                                <div className={styles.frame} key={i}>
                                    <img src={frame.image} alt='icon'/>
                                    <h3 >{frame.title}</h3>
                                </div>
                            )) 
                        }
                    </div>
                    <div className={styles.frames}>
                        {
                            frame2.map((frame, i) => (
                                <div className={styles.frame} key={i}>
                                    <img src={frame.image} alt='icon'/>
                                    <h3>{frame.title}</h3>
                                </div>
                            )) 
                        }
                    </div>
                </div>
                
                <div className={styles.user__agreement}>
                    <img alt='agreement' src={userAgreement}/>
                    <p>Пользовательское соглашение</p>
                </div>

            </div>

            {/* flex2 */}
            <div className={styles.flex2}>
                <h3>Контакты</h3>

                <div className={styles.contacts__container}>
                    <div className={styles.contacts}>
                        {
                            mainContacts.map((contact, i) => (
                                <div className={styles.contact} key={i}>
                                    <img src={contact.image} alt='icon'/>
                                    <p>{contact.title}</p>
                                </div>
                            ))
                        }
                    </div>
                    <div className={styles.contacts}>
                        {
                            optionalContacts.map((contact, i) => (
                                <div className={styles.contact} key={i}>
                                    <img src={contact.image} alt='icon'/>
                                    <p>{contact.title}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className={styles.contact}>
                    <img src={location} alt='location'/>
                    <p>пр. С.Туркменбаши, 25/22 г.Ашхабад, 744005, Туркменистан</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BottomFooter