import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity, Alert, StyleSheet } from "react-native";
import firebase from "../firebase/firebase";
import {gql, useLazyQuery} from "@apollo/client";
import ScreenNames from "../constants/ScreenNames";

const GET_USER = gql`
    query Query($email: String!) {
      userByEmail(email: $email) {
        type
        id
      }
    }
`;

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [getUser] = useLazyQuery(GET_USER, {
        onError: error => {
            Alert.alert("An error occurred during login. Please contact administrator.");
        }
    });

    const loginUser = () => {
        if (email === '' || password === '') {
            Alert.alert("Please enter email and password to login.");
        } else {
            firebase.auth()
                .signInWithEmailAndPassword(email, password)
                .then(userCredential => {
                    console.log("Successfully signed in!");
                    getUser({
                        variables: {
                            email: email
                        }
                    }).then(res => {
                        const userType = res.data.userByEmail.type;
                        if (userType === 'COACH') {
                            navigation.navigate(ScreenNames.COACH_TAB_FLOW, {
                                email: email,
                                userId: res.data.userByEmail.id
                            });
                        } else if (userType === 'ATHLETE') {
                            navigation.navigate(ScreenNames.ATHLETE_TAB_FLOW, {
                                email: email,
                                userId: res.data.userByEmail.id
                            });
                        } else {
                            Alert.alert("An error occurred in login. Please contact administrator.");
                        }
                    });
                })
                .catch(error => Alert.alert(error.message));
        }
    };

    return (
        <View style={styles.container}>

            <Text style={styles.header}>LOGIN</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={setEmail}
                defaultValue={email}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={setPassword}
                defaultValue={password}
                secureTextEntry={true}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => loginUser()}
            >
                <Text style={styles.buttonText}>
                    Sign In
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        paddingHorizontal: 50,
        paddingVertical: 30
    },
    header: {
        alignItems: "center",
        textAlign: "center",
        padding: 10,
        margin: 20,
        marginBottom: 100,
        fontWeight: "bold",
        fontSize: 16
    },
    input: {
        alignItems: "center",
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
        margin: 20,
        fontWeight: "bold",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 8
    },
    button: {
        alignItems: "center",
        backgroundColor: "#000000",
        padding: 10,
        margin: 20,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 8,
    },
    buttonText: {
        fontWeight: "bold",
        color: "white"
    }
});

export default Login;