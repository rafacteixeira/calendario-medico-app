import useCollapse from "react-collapsed";
import './collapsible.css'
import ColorDescriptor from "../color-description/ColorDescriptor";

const Collapsible = () => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  return (
    <div className="collapsible">
      <div className="header" {...getToggleProps()}>
        {isExpanded ? 'Fechar Legenda' : 'Mostrar Legenda'}
      </div>
      <div {...getCollapseProps()}>
        <ColorDescriptor/>
      </div>
    </div>
  )

}

export default Collapsible