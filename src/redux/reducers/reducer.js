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
    case 'ADDUSER':
    {
      const users = action.payload.users;
      const scores = action.payload.scores;
      console.log('my store', users);

      return ({
        ...state,
        users,
        scores,
      });
    }
    case 'SAVEANS':
    {
      const users = state.users.slice();
      const qid = action.payload.qid;
      const option = action.payload.ans;
      const user = action.payload.user;
      for (let i = 0; i < users.length; i += 1) {
        if (users[i].uname === user && users[i].qid === qid) {
          users[i].ans = option;
        }
      }
      console.log('my store users', users);

      return ({
        ...state,
        users,
      });
    }
    default:
    {
      return state;
    }
  }
};

export default counter;

