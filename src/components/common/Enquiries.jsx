import React from 'react'
import Header from './Header'
import EnquiryCard from './EnquiryCard'

const Enquiries = ({heading,subheading}) => {
  return (
    <>
    <Header heading={heading} subheading={subheading}/>
    <EnquiryCard/>
    </>
  )
}

export default Enquiries