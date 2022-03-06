import Form from "./Form";
import { connect } from "react-redux";
import { IStore } from "../../types/IStore";
import {
  setNickname,
  handleOpenForm,
  handleFormErrors,
  handleValidation,
  handleShowError,
  handleSubmitSend,
  handleGameOver,
} from "../../actions/snake";

const mapStateToProps = (state: IStore) => ({
  nickname: state.snake.nickname,
  showError: state.snake.showError,
  submitSend: state.snake.submitSend,
  errors: state.snake.errors,
  openForm: state.snake.errors,
  snakeDots: state.snake.snakeDots,
});

export default connect(mapStateToProps, {
  setNickname,
  handleOpenForm,
  handleFormErrors,
  handleShowError,
  handleValidation,
  handleSubmitSend,
  handleGameOver,
})(Form as any);
