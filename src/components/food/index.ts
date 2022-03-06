import Food from "./Food";
import { connect } from "react-redux";
import { IStore } from "../../types/IStore";

const mapStateToProps = (state: IStore) => ({
  comboActive: state.snake.comboActive,
  food: state.snake.food,
});

export default connect(mapStateToProps, {})(Food as any);
