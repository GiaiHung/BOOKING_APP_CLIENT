import React from 'react'
import Featured from '../../components/Featured/Featured'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Header/Navbar'
import HomeGuest from '../../components/HomeGuest'
import MailList from '../../components/MailList/MailList'
import PropertyList from '../../components/Property/PropertyList'

function Home() {
  return (
    <>
      <Navbar />
      <Header />
      <div className="flex mx-auto max-w-6xl mt-12 flex-col gap-6">
        <Featured />
        <PropertyList />
        <HomeGuest />
        <MailList />
        <Footer />
      </div>
    </>
  )
}

export default Home
