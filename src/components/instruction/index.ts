import Instruction from "./Instruction";
import { connect } from "react-redux";
import { IStore } from "../../types/IStore";
import { handleOpenInstruction } from "../../actions/snake";

const mapStateToProps = (state: IStore) => ({

});

export default connect(mapStateToProps, { handleOpenInstruction })(Instruction as any);
