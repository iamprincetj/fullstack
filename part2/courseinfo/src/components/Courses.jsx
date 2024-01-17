const Header = (props) => {
    return (
      <h2>{props.course}</h2>
    )
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part} {props.exercises}
      </p>
    )
  }
  
  
  const Content = ({parts}) => {
    return (
      <>
        {parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />)}
      </>
    )
  }
  
  const Total = ({parts}) => {
    const arr = parts.map(part => part.exercises)
    return (
      <>
      <p>total of {arr.reduce((prev, curr) => {
        return prev + curr
      }, 0)} exercises</p>
      </>
    )
  }

const Course = ({course}) => {

    return (
      <div>
        <Header course={course.name}/>
  
        <Content parts={course.parts} />
  
        <Total parts={course.parts}/>
      </div>
    )
}

export default Course