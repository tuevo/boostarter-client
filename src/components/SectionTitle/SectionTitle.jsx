import Title from 'antd/lib/typography/Title'
import React from 'react'
import './SectionTitle.scss'

export default function SectionTitle({ children, center, success }) {
  return (
    <div
      className="section-title"
      style={center ? { display: 'flex', justifyContent: 'center' } : {}}
    >
      <Title className={`inner ${success ? 'success' : ''}`}>{children}</Title>
    </div>
  )
}
