const defaultNote = {
  ques: [],
  users: [],
  scores: [],
};
const counter = (state = defaultNote, action) => {
  console.log('my payload:', action.payload);

  switch (action.type) {
    case 'CREATESTORE':
    {
      const ques = action.payload.ques;
      console.log('my store', ques);

      return ({
        ...state,
        ques,
      });
    }
    default:
    {
      return state;
    }
  }
};

export default counter;

