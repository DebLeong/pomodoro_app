import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, AsyncStorage } from 'react-native';
import Button from '../button';
import Audio from 'expo';

function formatTime(time){
    let minutes = Math.floor(time/60);
    time -= minutes * 60
    let seconds = parseInt(time % 60, 10);
    return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
}

class Timer extends Component {
    componentDidMount() {
        (async () => {
            try {
                await this.props.music.loadAsync(require('../../assets/workmusic.mp3'));
                await this.props.recording.loadAsync(require('../../assets/takeabreak.m4a'));
            }   catch (error) {
                console.log(error);
            }
        })();
    }

    componentWillReceiveProps(nextProps){
        const currentProps = this.props;
        if (!currentProps.isPlaying && nextProps.isPlaying) {
            const timerInterval = setInterval(() => {
                currentProps.addSecond()
            }, 1000);
            this.setState({
                timerInterval,
            })
            {this.props.music.playAsync()};
        } else if (currentProps.isPlaying && !nextProps.isPlaying) {
            clearInterval(this.state.timerInterval);
            {this.props.music.stopAsync()};
            {this.props.music.unloadAsync()};
            {this.props.recording.playAsync()};
        }
    }

    render() {
        const {
            isPlaying,
            elapsedTime,
            timerDuration,
            startTimer,
            restartTimer,
        } = this.props;
        return (
            <View style={styles.container}>
                <StatusBar barStyle={'light-content'} />
                <View style={styles.upper}>
                    <Text style={styles.time}>
                        {formatTime(timerDuration - elapsedTime)}
                    </Text>
                </View>
                <View style={styles.lower}>
                    {!isPlaying && (
                        <Button iconName='play-circle' onPress={startTimer}/>)}
                    {isPlaying &&  (
                        <Button iconName='stop-circle' onPress={restartTimer}/>)}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#CE0B24',
    },
    upper: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lower: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    time: {
        color: 'white',
        fontSize: 120,
        fontWeight: '100',
    },
})

export default Timer;

