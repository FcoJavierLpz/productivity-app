const toast = () => next => action => {
  if (action.type === 'error') console.error(action.payload.message)
  else return next(action)
}

export default toast
