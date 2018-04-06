import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators as pomoActions } from '../../reducer';
import Timer from './presenter';

function mapStateToProps(state) {
    const { isPlaying, elapsedTime, timerDuration } = state;
    return {
        isPlaying,
        elapsedTime,
        timerDuration,
    };
}

function mapDispatchToProps(dispatch){
    return {
        startTimer: bindActionCreators(pomoActions.startTimer, dispatch),
        restartTimer: bindActionCreators(pomoActions.restartTimer, dispatch),
        addSecond: bindActionCreators(pomoActions.addSecond, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
