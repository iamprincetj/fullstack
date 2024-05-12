import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './services/request'
import axios from 'axios'
import { NotificationContextProvider, useContextDispatch } from './components/NotificationContext'
const baseUrl = 'http://localhost:3001/anecdotes'


const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useContextDispatch()

  const voteMutation = useMutation({
      mutationFn: updateAnecdote,
      onSuccess: updatedAnecdote => {
        const anecdotes = queryClient.getQueryData(['anecdotes'])
        queryClient.setQueryData(['anecdotes'], anecdotes.map(anecdote =>
          anecdote.id != updatedAnecdote.id? anecdote: updatedAnecdote
        ))
        dispatch({ type: 'SET_NOTIFICATION', payload:  `anecdote '${updatedAnecdote.content}' voted`})
        setTimeout(() => {
          dispatch({ type: 'DEL_NOTIFICATION' })
        }, 5000)
      }
    })

  const handleVote = (anecdote) => {
    voteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
  }


  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false,
    refetchOnWindowFocus: false

  })
  //console.log(JSON.parse(JSON.stringify(result)))


  if (result.isLoading) {
    return <div>Loading...</div>
  }

  if (!result.isSuccess) {
    return <div>anecdote service not available due to problems in server</div>
  }
  const anecdotes = result.data

  return (
      <div>
        <h3>Anecdote app</h3>
      
        <Notification />
        <AnecdoteForm />
      
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
    </div>
  )
}

export default App
