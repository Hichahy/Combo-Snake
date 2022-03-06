import Snake from "./Snake";
import { connect } from "react-redux";
import { IStore } from "../../types/IStore";

const mapStateToProps = (state: IStore) => ({
  snakeDots: state.snake.snakeDots,
  comboActive: state.snake.comboActive,
});

export default connect(mapStateToProps, {})(Snake as any);
