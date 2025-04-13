import React from 'react'

export default function Prayer({name , time}) {
  return (
    <div className='prayer'>
        <p className='prayer-p'>{name}</p>
        <p className='tiem-p'>{time}</p>
    </div>
  )
}
