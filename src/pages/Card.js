import "./card.css"
const Card = ({property}) => {
  return (
      <div className="CardBox">
        <div>
          <h4>${property.price}</h4>
          <p>{property.bedroom} Bedroom, {property.bathroom} Bathroom, {property.area} Sq, {property.hometype} for {property.status}</p>
          <p>{property.address}</p>
        </div>
      </div>
  )
}

export default Card