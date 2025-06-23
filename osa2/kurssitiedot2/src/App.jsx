const Header = ({ course }) => {
  return (
    <div>
      <h1>{course.name}</h1>
    </div>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} part={part.name} exercises={part.exercises}/>
      )}
    </div>
  )
}

const Part = ({ part, exercises}) => {
  return (
    <p>{part} {exercises}</p>
  )
}

const Total = ({ parts }) => {
  let total = 0
  parts.forEach(part => {
    total += part.exercises
  })
  
  return (
    <div>
      <p>Number of exercises: {total}</p>
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Cooking course!',
        exercises: 100,
        id: 4
      },
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App