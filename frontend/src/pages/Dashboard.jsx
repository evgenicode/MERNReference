import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GoalForm from '../components/GoalForm'
import Spinner from '../components/Spinner'
import { getGoals } from '../features/goals/goalSlice'
import { reset } from '../features/auth/authSlice' //the wierd bug fix part1 (was imported from goalSlice first)

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { goals, isLoading, isError, message } = useSelector((state) => state.goals)

  useEffect(() => {
    if (user) {             //the wierd bug fix part2
      dispatch(getGoals())
    }

    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getGoals())

    return () => {
      dispatch(reset())
    }

  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>

      <GoalForm />
    </>
  )
}

export default Dashboard