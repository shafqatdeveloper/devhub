import React from 'react'
import { baseButtonClass } from '../Inputs/inputStyles'
import ButtonLoader from '../Loaders/ButtonLoader'

const BaseButton = ({classNames,title,id,isSubmitting}) => {
  return (
    <button id={id} className={`${baseButtonClass} ${classNames}`}>
      {
        isSubmitting ? <ButtonLoader /> : title
      }
    </button>
  )
}

export default BaseButton