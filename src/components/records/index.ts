import Records from "./Records";
import { connect } from "react-redux";
import { IStore } from "../../types/IStore";
import { handleOpenRecords } from "../../actions/snake";

const mapStateToProps = (state: IStore) => ({
  openRecords: state.snake.openRecords,
  submitSend: state.snake.submitSend,
});

export default connect(mapStateToProps, { handleOpenRecords })(Records as any);
