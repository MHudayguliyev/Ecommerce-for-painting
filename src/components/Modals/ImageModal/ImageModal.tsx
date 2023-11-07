import React from 'react'
import styles from './ImageModal.module.scss'
import { CommonModalI } from '../CommonTypes'
import Modal from '@app/compLibrary/Modal'

interface IModal extends CommonModalI {
    selectedSet: {header: string, image: string}
}
const ImageModal = (props: IModal) => {
    const {
        show, 
        setShow, 
        selectedSet
    } = props

  return (
    <>
        <Modal
            isOpen={show}
            close={setShow}
            header={
                <div className={styles.header}>{selectedSet.header ?? "Header should be shere"}</div>
            }
        >
            <div className={styles.iModal}>
                <img src={selectedSet.image} alt='setImg'/>
            </div>
        </Modal>
    </>
  )
}

export default ImageModal