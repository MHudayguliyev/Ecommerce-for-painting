import React, {useState, useEffect} from 'react'
//styles
import classNames from 'classnames/bind'
import styles from './DropdonwSelect.module.scss'
//lib
import Dropdown from '@app/compLibrary/Dropdown'
import Preloader from '@app/compLibrary/Preloader'
//hooks
import usePrevious from '@app/hooks/usePrevious'
//icons 
import arrowDown from '@app/assets/icons/arrow_down_icon.svg'

type LabelValueTypes = {
    value: string | number
    label: {
        size?: string 
        cost?: number, 
        name?: string
    }, 
    src?: string
}

interface DropdownSelectProps {
    title?:LabelValueTypes
    maintitleOutside?: LabelValueTypes
    data: LabelValueTypes[]
    value?: LabelValueTypes
    onChange: (value: LabelValueTypes) => void
    fetchStatuses: { isLoading: boolean, isError: boolean }
    disable?: boolean, 
    renderNameOnly?: boolean
}

const cx = classNames.bind(styles)
function DropDownSelect(props: DropdownSelectProps) {

    const {
       title,
       data,
       value, 
       maintitleOutside,
       onChange,
       disable,
       fetchStatuses, 
       renderNameOnly
    } = props;

 
    // array of selected elements
    const [arrSearch, setArrSearch] = useState(data);
    const [mainTitle, setMainTitle] = useState(value ? value : undefined);
    const prevMainTitle = usePrevious(maintitleOutside)
    // console.log()

 
    useEffect(() => {
       setMainTitle(value)
    }, [value])
 
    useEffect(() => {
       if (prevMainTitle?.value !== maintitleOutside?.value)
          setMainTitle(maintitleOutside)
    }, [maintitleOutside])
 
    useEffect(() => {
       setArrSearch(data);
    }, [fetchStatuses.isLoading, fetchStatuses.isError]);

 
    useEffect(() => {
      // console.log(mainTitle)
       if (mainTitle?.value)
       onChange(mainTitle);
    }, [mainTitle])
 
 
    return (
       <Dropdown disabled={disable} customToggle={() => {
          return (
             <div className={styles.toggleWrapper}>
                <span>
                    {
                        renderNameOnly ? title!.label.name : mainTitle?.value ? mainTitle.label.size : title?.label.size
                    }
                </span>

                <span>
                    {
                        renderNameOnly ? '' : mainTitle?.value ? mainTitle.label.cost : title?.label.cost
                    } {renderNameOnly ? '' : 'ман.'}
                    <img src={arrowDown} alt='arrowDown'/>
                </span>
             </div>
          )
       }} customElement={() => {
          return (
             <div className={styles.customElementWrapper}>
                {
                   fetchStatuses.isLoading ?
                      <div className={styles.preloader}>
                         <Preloader />
                      </div>
                      :
                        <div className={styles.itemsWrapper}>
                            {
                                arrSearch ? arrSearch.length > 0 ?
                                    arrSearch.map((item, index) => {
                                    return (
                                       <div className={styles.item} key={item.value} onClick={() => {
                                            setMainTitle(arrSearch[index])
                                        }}>
                                            
                                            {
                                             renderNameOnly ? <span>{item.label.name}</span> : (
                                                <>
                                                   <span>
                                                      {item.label.size}
                                                   </span>
                                                   <span>
                                                      {item.label.cost} ман.
                                                   </span>
                                                </>
                                             )
                                            }
                                       </div>
                                    )
                                    })
                                    :
                                    <>No data found</>
                                    :
                                    ""
                            }
                        </div>
                        
                         
                         
                }
             </div>
          )
       }} />
    )
 }
 
 export default DropDownSelect;