import React from 'react'
import CallbackForm from '../CallbackForm'
import SpotlightCard from '../ui/spotlightCard'

const RequestCallback = () => {
  return (
    <div>
      <SpotlightCard
      spotlightColor={`rgba(${142},${145},${143},${0.5})`}
      className=" mt-8 overflow-hidden transition-all rounded-xl border p-8">
        <div className="flex flex-col items-center text-center gap-4">
          <h1 className=" heading-bold text-lg max-w-lg">
          Got a question or want to collaborate? Just fill out the form, and I’ll reach out to you at a time that works best for you!
          </h1>
        </div>
        <div  className=' max-w-lg mt-4 justify-center w-full mx-auto flex items-center'>
          <CallbackForm />
        </div>
      </SpotlightCard>

    </div>
  )
}

export default RequestCallback
