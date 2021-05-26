import Title from 'antd/lib/typography/Title'
import React from 'react'
import './SectionTitle.scss'

export default function SectionTitle({ children, center, success, level }) {
  return (
    <div
      className="section-title"
      style={center ? { display: 'flex', justifyContent: 'center' } : {}}
    >
      <Title {...level ? { level } : { level: 1 }} className={`inner ${success ? 'success' : ''} ${center ? 'center' : ''}`}>
        {children}
        <div className="line" style={{ width: center ? 200 : '100% !important' }}></div>
      </Title>
    </div>
  )
}
