const Header = ({course}) => {
    return (
      <h1>{course}</h1>
    )
  }
  
  const Part = ({part, exercises}) => {
    return (
      <p>
        {part} {exercises}
      </p>
    )
  }
  
  
  const Content = ({parts}) => {
    return (
      <>
        {parts.map(part => 
          <Part key={part.id} part={part.name} exercises={part.exercises}  />
        )}
      </>
    )
  }
  
  const Course = ({course}) => {
    return (
      <>
        <Header course={course.name}/>
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </>
    )
  }
  
  const Total = ({parts}) => {
    const arr = parts.map(part => part.exercises)
    const total = arr.reduce((s, p) => {
        return s + p
    }, 0)
      return (
        <p>total of {total} exercises </p>
      )
  }

  export default Course