import { useContextValue } from "./NotificationContext"

const Notification = () => {
  const notification = useContextValue()
  let style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  style = notification
      ? { ...style, display: '' }
      : { ...style, display: 'none' }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
