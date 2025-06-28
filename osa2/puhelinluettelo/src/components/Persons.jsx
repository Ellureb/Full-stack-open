const Persons = ({ persons, remove }) => {
  return (
    <ul>
        {persons.map(person =>
          <li key={person.name}>{person.name} {person.number}
            <button onClick={() => remove(person.id)}>delete</button>
          </li>
        )}
      </ul>
  )
}

export default Persons