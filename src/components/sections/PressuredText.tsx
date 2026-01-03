import TextPressure from "../ui/TextPressure";


const PressuredText = () => {
  return (
    <div className="mt-10">
      <div style={{ position: 'relative', height: '300px' }}>
        <TextPressure
          text="Rakesh"
          flex={true}
          alpha={true}
          stroke={false}
          width={true}
          weight={true}
          italic={true}
          textColor="true"
          strokeColor="#ff8000"
          className='dark:text-white select-none text-black'
          minFontSize={36}
        />
      </div>
    </div>
  )
}

export default PressuredText
