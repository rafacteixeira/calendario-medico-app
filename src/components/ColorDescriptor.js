import '../DayEvent.css'

const ColorDescriptor = () => {
  return (
    <div className='eventLabel'>
      <div className='PosP'>Pós Plantão</div>
      <div className='Enf-manha'>Enfermaria Manhã</div>
      <div className='Enf-tarde'>Enfermaria Tarde</div>
      <div className='Enf-noite'>Enfermaria Noite</div>
      <div className='Amb-manha'>Ambulatório Manhã</div>
      <div className='Amb-tarde'>Ambulatório Tarde</div>
      <div className='Amb-noite'>Ambulatório Noite</div>
      <div className='Pla-manha'>Plantão Dia</div>
      <div className='Pla-noite'>Plantão Noite</div>
    </div>
  )
}

export default ColorDescriptor