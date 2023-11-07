import React, { useState, useRef } from 'react';
import styles from './Accordion.module.scss';
import classNames from 'classnames/bind';
//icons 
import arrowDown from '@app/assets/icons/arrow_down_icon.svg';
import arrowUp from '@app/assets/icons/arrow_up.svg'
export type AccordionProps = {
   children: React.ReactNode,
   /** @defaultValue false */
   expanded?: boolean,
   /** @defaultValue false */
   disable?: boolean,
   /** @default false */
   showEndIcon?: boolean
   rightContent?: React.ReactNode
}

const cx = classNames.bind(styles);

const Accordion = (props: AccordionProps): JSX.Element => {
   const {
      children,
      expanded = false,
      rightContent,
   } = props;

   const contentRef = useRef<null | HTMLParagraphElement>(null)
   const [isExpanded, setIsExpanded] = useState(expanded);

   const toggleExpanded = (e: any) => {
      // e.stopPropogate()
      setIsExpanded(!isExpanded)
   }

   return (
      <>
         <div  ref={contentRef} style={{
            height: isExpanded ? contentRef.current?.scrollHeight : '0px'
         }} className={
            cx({
               notExpanded: !isExpanded,
               expanded: isExpanded,
            })
         }>
            {children}
         </div>
         <div className={styles.mainBlock} onClick={toggleExpanded}>
            {rightContent}
            <button className={styles.button} onClick={toggleExpanded}>
               {
                  isExpanded ?
                     <img src={arrowUp} alt='arrowUp'/>
                     :
                     <img src={arrowDown} alt='arrowDown'/>
               }
            </button>
         </div>
      </>
   )
}

export default Accordion