import { CloseSnack } from "../keys/Snack";

export const CloseSnakAction = () => {
  return (dispatch) => {
    dispatch({
      type: CloseSnack(),
      value: null,
    });
  };
};
