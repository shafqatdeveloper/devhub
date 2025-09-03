import React from 'react'
import { baseButtonClass } from '../Inputs/inputStyles'

const BaseButton = ({classNames,title,id}) => {
  return (
    <button id={id} className={`${baseButtonClass} ${classNames}`}>{title}</button>
  )
}

export default BaseButton