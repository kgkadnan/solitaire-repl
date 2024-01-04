interface IHandleGoBack {
  setCurrentState: React.Dispatch<React.SetStateAction<string>>;
  state: string;
}
export const handleGoBack = ({ setCurrentState, state }: IHandleGoBack) => {
  setCurrentState(state);
};
