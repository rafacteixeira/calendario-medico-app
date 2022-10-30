import './color-description.css'
import '../day-events/event-colors.css'

const ColorDescriptor = () => {
  return (
    <div className='eventLabels'>
      <div className="inlineDiv">
        <div className='Enf-manha labelWidth'>Enfermaria Manhã</div>
        <div className='Enf-tarde labelWidth'>Enfermaria Tarde</div>
        <div className='Enf-noite labelWidth'>Enfermaria Noite</div>
      </div>
      <div className="inlineDiv">
        <div className='Amb-manha labelWidth'>Ambulatório Manhã</div>
        <div className='Amb-tarde labelWidth'>Ambulatório Tarde</div>
        <div className='Amb-noite labelWidth'>Ambulatório Noite</div>
      </div>
      <div className="inlineDiv">
        <div className='Pla-manha labelWidth'>Plantão Dia</div>
        <div className='Pla-noite labelWidth'>Plantão Noite</div>
        <div className='PosP labelWidth'>Pós Plantão</div>
      </div>
    </div>
  )
}

export default ColorDescriptor