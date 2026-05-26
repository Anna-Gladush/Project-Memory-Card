const Card = ({img, name, id}) => {
  return (
    <div className="card" id={id}>
      <img src={img} alt={name} />
      <p>{name}</p>
    </div>
  )
}

export default Card