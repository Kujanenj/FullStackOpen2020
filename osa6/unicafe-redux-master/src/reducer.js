const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  const newSate = {
    ...state
  }
  switch (action.type) {
    case 'GOOD':
      newSate.good+=1
      return newSate
    case 'OK':
       newSate.ok+=1
      return newSate
case 'BAD':
  newSate.bad+=1
      return newSate
    case 'ZERO':
      return {...initialState}
    default: return state
  }
  
}

export default counterReducer