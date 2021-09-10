import React from 'react';
import { View, Text, AppRegistry, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import ConfettiCannon from 'react-native-confetti-cannon';

export const Homefunction = () => {
    const [gameBoard, setGameBoard] = useState(new Array(9).fill(null));
    const [currentPlayer, setCuurentPlayer] = useState('X');
    const [modalVisible, setModalVisible] = useState(false);
    const [winner, setWinner] = useState('');
    const [shoot, setShoot] = useState(false);
    const [modaltieVisible, setModaltieVisible] = useState(false);

    useEffect(() => {
        const winningcombination = findWinningCombinations();
        if (winningcombination) {
            setShoot(true);
            var [a, b, c] = winningcombination;
            setWinner(gameBoard[a]);
            setModalVisible(true);
        }
        if (Isdraw()) {
            setModaltieVisible(true);
        }
    })

    const initializegame = () => {
        setCuurentPlayer('X');
        setGameBoard(new Array(9).fill(null));
        setModalVisible(false);
        setModaltieVisible(false);
        setWinner('');
    }

    const findWinningCombinations = () => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [6, 4, 2]
        ]

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;

            if (gameBoard[a] &&
                (gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c])) {
                return combination;
            }
        }
        return null;
    }

    const renderTexts = (val) => {
        var value = gameBoard[val];
        const winningcombination = findWinningCombinations();
        if (winningcombination) {
            let [a, b, c] = winningcombination;
            if (val == a) {
                switch (gameBoard[a]) {
                    case 'X': return <Text style={styles.tilew}>X</Text>;
                    case 'O': return <Text style={styles.tilew}>O</Text>;
                }
            }
            if (val == b) {
                switch (gameBoard[b]) {
                    case 'X': return <Text style={styles.tilew}>X</Text>;
                    case 'O': return <Text style={styles.tilew}>O</Text>;
                }
            }
            if (val == c) {
                switch (gameBoard[c]) {
                    case 'X': return <Text style={styles.tilew}>X</Text>;
                    case 'O': return <Text style={styles.tilew}>O</Text>;
                }
            }

        }
        switch (value) {
            case 'X': return <Text style={styles.tilex}>X</Text>;
            case 'O': return <Text style={styles.tileo}>O</Text>;
            default: return null;
        }
    }

    onTilepress = (val) => {

        if (endOfGame()) { return; }

        var value = gameBoard[val];
        if (value) { return; }


        var arr = gameBoard.slice();
        arr[val] = currentPlayer;
        setGameBoard(arr);

        var nextplayer = currentPlayer == 'X' ? 'O' : 'X';
        setCuurentPlayer(nextplayer);
    }

    endOfGame = () => {
        let winningcombination = findWinningCombinations();
        if (winningcombination) {
            return true;
        } else {
            return false;
        }
    }

    const Isdraw = () => {
        var count = 0;
        for (const arrayelement of gameBoard) {
            if (arrayelement != null) {
                count += 1;
            }
        }
        if (count == 9 & (!findWinningCombinations())) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => onTilepress(0)} style={[styles.tile, { borderTopWidth: 0, borderLeftWidth: 0 }]}>
                    {renderTexts(0)}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onTilepress(1)} style={[styles.tile, { borderTopWidth: 0 }]}>
                    {renderTexts(1)}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onTilepress(2)} style={[styles.tile, { borderTopWidth: 0, borderRightWidth: 0 }]}>
                    {renderTexts(2)}
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => onTilepress(3)} style={[styles.tile, { borderLeftWidth: 0 }]}>
                    {renderTexts(3)}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onTilepress(4)} style={styles.tile}>
                    {renderTexts(4)}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onTilepress(5)} style={[styles.tile, { borderRightWidth: 0 }]}>
                    {renderTexts(5)}
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => onTilepress(6)} style={[styles.tile, { borderLeftWidth: 0, borderBottomWidth: 0 }]}>
                    {renderTexts(6)}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onTilepress(7)} style={[styles.tile, { borderBottomWidth: 0 }]}>
                    {renderTexts(7)}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onTilepress(8)} style={[styles.tile, { borderBottomWidth: 0, borderRightWidth: 0 }]}>
                    {renderTexts(8)}
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                {shoot ? <ConfettiCannon count={300} origin={{ x: -10, y: 0 }} explosionSpeed={0} fadeOut={true} autoStartDelay={-500} /> : null}
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.congrats}>Congratulations !</Text>
                        <Text style={styles.modalText}>Player {winner == 'X' ? <Text style={styles.winnerx}>X</Text> : <Text style={styles.winnero}>O</Text>} Won</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => initializegame()}
                        >
                            <Text style={styles.textStyle}>Restart</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modaltieVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modaltieVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.draw}>Match Draw</Text>
                        <Text style={styles.modalText}><Text style={styles.winnerx}>X</Text> & <Text style={styles.winnero}>O</Text> Nobody wins</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => initializegame()}
                        >
                            <Text style={styles.textStyle}>Restart</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tile: {
        borderWidth: 2,
        borderColor: '#89a3bd',
        opacity: 0.5,
        height: 120,
        width: 120
    },
    tilex: {
        color: '#42BED7',
        fontSize: 100,
        textAlign: 'center',
    },
    tileo: {
        color: '#e88bff',
        fontSize: 100,
        textAlign: 'center'
    },
    tilew: {
        color: '#23CE6B',
        fontSize: 100,
        textAlign: 'center'
    },
    modalView: {
        margin: 10,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: 200
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 20,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        padding: 5,
        fontSize: 20
    },
    modalText: {
        marginTop: 15,
        textAlign: "center",
        fontSize: 25
    },
    congrats: {
        fontSize: 30,
        marginTop: -20,
        color: 'green',
    },
    winnerx: {
        color: '#42BED7',
    },
    winnero: {
        color: '#e88bff',
    },
    draw: {
        color: '#ffda00',
        marginTop: -20,
        fontSize: 30,
    }
});

AppRegistry.registerComponent(`Home`, () => Homefunction);
