import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNew } from "../services/request"
import { useContextDispatch } from "./NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useContextDispatch()

  const anecdoteMutation = useMutation({
    mutationFn: createNew,
    onSuccess: (newAnecdote) => {
        const anecdotes = queryClient.getQueryData(['anecdotes'])
        queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
        dispatch({type: 'SET_NOTIFICATION', payload: `created anecdote '${newAnecdote.content}'`})
        setTimeout(() => {
          dispatch({ type: 'DEL_NOTIFICATION' })
        }, 5000)
    },
    onError: (error) => {
      const message = error.response.data.error
      dispatch({type: 'SET_NOTIFICATION', payload: `${message}`})
      setTimeout(() => {
        dispatch({ type: 'DEL_NOTIFICATION' })
      }, 5000)
    }
  })
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    anecdoteMutation.mutate({ content, votes: 0 })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
