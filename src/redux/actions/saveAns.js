const SAVEANS = 'SAVEANS';
const saveAns = (dataObj) => {
  console.log('inside getNotes action of user:', dataObj);
  return {
    type: SAVEANS,
    payload: {
      qid: dataObj.qid,
      ans: dataObj.ans,
      user: dataObj.user,
    },
  };
};
export default saveAns;
