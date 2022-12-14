import './color-description.css'
import '../day-events/event-colors.css'

const ColorDescriptor = () => {
  return (
    <div className='eventLabels labelsCentered'>
      <div className="typeBlock">
      <div className="typeDiv">Enfermaria</div>
      <div className="inlineDiv">
        <div className='Enf-manha labelWidth'>Enfermaria</div>
      </div>
      </div>
      <div className="typeBlock">
        <div className="typeDiv">Ambulatório</div>
        <div className="inlineDiv">
          <div className='Amb-manha labelWidth'>Manhã</div>
          <div className='Amb-tarde labelWidth'>Tarde</div>
        </div>
      </div>
      <div className="typeBlock">
        <div className="typeDiv">Plantão</div>
        <div className="inlineDiv">
          <div className='Pla-manha labelWidth'>Dia</div>
          <div className='Pla-noite labelWidth'>Noite</div>
        </div>
      </div>
      <div className="typeBlock">
        <div className="typeDiv">Pós Plantão</div>
        <div className="inlineDiv">
          <div className='PosP labelWidth'>Pós Plantão</div>
        </div>
      </div>
      <div className="typeBlock">
        <div className="typeDiv">Aula</div>
        <div className="inlineDiv">
          <div className='Aula labelWidth'>Aula</div>
        </div>
      </div>
    </div>
  )
}

export default ColorDescriptor