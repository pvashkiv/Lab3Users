import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import {NavigationProp} from "@react-navigation/native";

interface Props {
  navigation: NavigationProp<any>
}
export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Меню</Text>
      <View style={styles.buttonContainer}>
        <Button title="Переглянути всіх користувачів" onPress={() => navigation.navigate('Users')} />
        <View style={styles.space} />
        <Button title="Додати користувача" onPress={() => navigation.navigate('AddUser')} />
        <View style={styles.space} />
        <Button title="Оновити користувача" onPress={() => navigation.navigate('UpdateUser')} />
        <View style={styles.space} />
        <Button title="Видалити користувача" onPress={() => navigation.navigate('DeleteUser')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'flex-start' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  buttonContainer: { width: '100%' },
  space: { height: 15 },
});
