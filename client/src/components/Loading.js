import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

export default function Loading() {
  return (
    <>
      <Spinner animation='border' variant='warning'>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </>
  )
}
