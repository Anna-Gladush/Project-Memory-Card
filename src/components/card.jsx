const Card = ({img, name, id, handler}) => {
  return (
    <button className="card" id={id} name={name} onClick={() => handler(id)}>
      <img src={img} alt={name} />
      <p>{name}</p>
    </button>
  )
}

export default Card