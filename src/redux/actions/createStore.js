const CREATESTORE = 'CREATESTORE';
const createStore = (dataObj) => {
  console.log('inside getNotes action:', dataObj);
  return {
    type: CREATESTORE,
    payload: {
      ques: dataObj,
    },
  };
};
export default createStore;
