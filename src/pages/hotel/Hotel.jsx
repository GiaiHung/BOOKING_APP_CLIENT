import React from 'react'
import Navbar from '../../components/Header/Navbar'
import Header from '../../components/Header/Header'
import MailList from '../../components/MailList/MailList'
import Footer from '../../components/Footer/Footer'
import '../../components/MailList/mailList.css'
import '../../components/Footer/footer.css'
import HotelDetails from './HotelDetails'

function Hotel() {
  return (
    <>
      <Navbar />
      <Header type="list" />
      <HotelDetails />
      <MailList />
      <footer className="mx-auto max-w-6xl">
        <Footer />
      </footer>
    </>
  )
}

export default Hotel
