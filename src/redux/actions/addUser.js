const ADDUSER = 'ADDUSER';
const addUser = (dataObj) => {
  console.log('inside getNotes action of user:', dataObj);
  return {
    type: ADDUSER,
    payload: {
      users: dataObj.users,
      scores: dataObj.scores,
    },
  };
};
export default addUser;
