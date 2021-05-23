import React from 'react'
import './Container.scss';

export default function Container({ children, fluid }) {
  return (
    <section className="app-container">
      <div className="inner" style={{ width: fluid ? '100%' : 1340 }}>
        {children}
      </div>
    </section>
  )
}
