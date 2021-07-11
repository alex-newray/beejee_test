
const getBaseReducer = (actionName) => {
  return (state={}, action) => {
    switch (action.type) {
      case actionName:
        return {
          ...state,
          [action.key]:action.value, 
        }
      default:
        return state;
    }
  }
}

export default getBaseReducer;