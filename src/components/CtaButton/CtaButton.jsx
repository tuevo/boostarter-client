import { Button } from 'antd'
import React from 'react'
import './CtaButton.scss'

export default function CtaButton({ children, ...rest }) {
  return (
    <Button className="cta-button" type="primary" {...rest}>{children}</Button>
  )
}
