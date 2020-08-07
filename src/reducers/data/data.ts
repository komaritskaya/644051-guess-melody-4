import {extend} from '../../utils';
import {DataState, GenreQuestion, ArtistQuestion, DataAction} from '../../types';

const initialState: DataState = {
  questions: [],
};

const ActionCreator = {
  loadQuestions: (questions: (GenreQuestion | ArtistQuestion)[]): DataAction => {
    return {
      type: `LOAD_QUESTIONS`,
      payload: questions,
    };
  },
};

const Operation = {
  loadQuestions: () => (dispatch, getState, api) => {
    return api.get(`/questions`)
      .then((response) => {
        dispatch(ActionCreator.loadQuestions(response.data));
      });
  },
};

const reducer = (state = initialState, action: DataAction) => {
  switch (action.type) {
    case `LOAD_QUESTIONS`:
      return extend(state, {
        questions: action.payload,
      });
  }

  return state;
};


export {reducer, Operation, ActionCreator};
