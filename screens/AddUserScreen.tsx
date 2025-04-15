import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import {UserService} from '../src/service/user.service.ts';

export default function AddUserScreen() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleAddUser = async () => {
    if (!name || !age) {
      Alert.alert('Помилка', 'Будь ласка, введіть імʼя та вік');
      return;
    }

    try {
      await UserService.create({
        name, age: parseInt(age, 10),
      });

      Alert.alert('Успішно', 'Користувач доданий');
      setName('');
      setAge('');
    } catch (error) {
      Alert.alert('Помилка', 'Не вдалося додати користувача');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Додати користувача</Text>
      <TextInput
        placeholder="Імʼя"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Вік"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Додати" onPress={handleAddUser} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
});
