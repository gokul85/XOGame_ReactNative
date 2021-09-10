import React, { Component, useState } from 'react';
import { View, Text, AppRegistry, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';


export class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            gameState: new Array(9).fill(null),
            currentPlayer: 'X',
            modalVisible: false,
            winner: '',
        }
    }

    findWinningCombinations() {
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

            if (this.state.gameState[a] &&
                (this.state.gameState[a] === this.state.gameState[b] && this.state.gameState[a] === this.state.gameState[c])) {
                () => this.setState({ modalVisible: !this.state.modalVisible })
                return combination;
            }
        }
        return null;
    }


    renderTexts = (val) => {
        var value = this.state.gameState[val];
        const winningcombination = this.findWinningCombinations();
        if (this.Isdraw()) {
            alert('gameover');
        }
        if (winningcombination) {
            let [a, b, c] = winningcombination;
            var winner = this.state.currentPlayer;

            if (val == a) {
                switch (this.state.gameState[a]) {
                    case 'X': return <Text style={styles.tilew}>X</Text>;
                    case 'O': return <Text style={styles.tilew}>O</Text>;
                }
            }
            if (val == b) {
                switch (this.state.gameState[b]) {
                    case 'X': return <Text style={styles.tilew}>X</Text>;
                    case 'O': return <Text style={styles.tilew}>O</Text>;
                }
            }
            if (val == c) {
                switch (this.state.gameState[c]) {
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

    checkforModal() {
        var winningCombination = this.findWinningCombinations();
        if (winningCombination) {
            var [a, b, c] = winningCombination;
            this.setState({ modalVisible: true })
        }
    }

    onTilepress = (val) => {

        if (this.endOfGame()) { return; }

        var value = this.state.gameState[val];
        if (value) { return; }

        var currentPlayer = this.state.currentPlayer;


        var arr = this.state.gameState.slice();
        arr[val] = currentPlayer;
        this.setState({ gameState: arr });

        var nextplayer = currentPlayer == 'X' ? 'O' : 'X';
        this.setState({ currentPlayer: nextplayer })
    }

    endOfGame() {
        let winningcombination = this.findWinningCombinations();
        if (winningcombination) {
            return true;
        } else {
            return false;
        }
    }

    Isdraw() {
        var count = 0;
        for (const arrayelement of this.state.gameState) {
            if (arrayelement != null) {
                count += 1;
            }
        }
        if (count == 9 & !(this.findWinningCombinations)) {
            return true;
        } else {
            return false;
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => this.onTilepress(0)} style={[styles.tile, { borderTopWidth: 0, borderLeftWidth: 0 }]}>
                        {this.renderTexts(0)}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onTilepress(1)} style={[styles.tile, { borderTopWidth: 0 }]}>
                        {this.renderTexts(1)}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onTilepress(2)} style={[styles.tile, { borderTopWidth: 0, borderRightWidth: 0 }]}>
                        {this.renderTexts(2)}
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => this.onTilepress(3)} style={[styles.tile, { borderLeftWidth: 0 }]}>
                        {this.renderTexts(3)}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onTilepress(4)} style={styles.tile}>
                        {this.renderTexts(4)}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onTilepress(5)} style={[styles.tile, { borderRightWidth: 0 }]}>
                        {this.renderTexts(5)}
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => this.onTilepress(6)} style={[styles.tile, { borderLeftWidth: 0, borderBottomWidth: 0 }]}>
                        {this.renderTexts(6)}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onTilepress(7)} style={[styles.tile, { borderBottomWidth: 0 }]}>
                        {this.renderTexts(7)}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onTilepress(8)} style={[styles.tile, { borderBottomWidth: 0, borderRightWidth: 0 }]}>
                        {this.renderTexts(8)}
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        this.setState({ modalVisible: !modalVisible });
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Player {this.state.winner} Won</Text>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => this.setState({ modalVisible: false })}
                            >
                                <Text style={styles.textStyle}>Restart</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tile: {
        borderWidth: 1,
        borderColor: '#89a3bd',
        opacity: 0.5,
        height: 100,
        width: 100
    },
    tilex: {
        color: '#42BED7',
        fontSize: 75,
        textAlign: 'center',
    },
    tileo: {
        color: '#e88bff',
        fontSize: 75,
        textAlign: 'center'
    },
    tilew: {
        color: '#23CE6B',
        fontSize: 75,
        textAlign: 'center'
    },
    modalView: {
        margin: 20,
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
        marginTop: 50,
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
        marginBottom: 15,
        textAlign: "center",
        fontSize: 30
    }
});

// AppRegistry.registerComponent(`Home`, () => Home);

export default Home
