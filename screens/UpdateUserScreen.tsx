import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import {UserService} from '../src/service/user.service.ts';

export default function UpdateUserScreen() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleUpdate = async () => {
    if (!id || !name || !age) {
      Alert.alert('Помилка', 'Заповніть усі поля');
      return;
    }
    try {
      await UserService.update({
        id: parseInt(id, 10),
        name,
        age: parseInt(age, 10),
      });

      setId('');
      setName('');
      setAge('');

      Alert.alert('Успішно', 'Користувача оновлено');
    } catch (error) {
      Alert.alert('Помилка', 'Не вдалося оновити');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Оновити користувача</Text>
      <TextInput placeholder="ID користувача" keyboardType="numeric" style={styles.input} value={id} onChangeText={setId} />
      <TextInput placeholder="Нове ім’я" style={styles.input} value={name} onChangeText={setName} />
      <TextInput placeholder="Новий вік" keyboardType="numeric" style={styles.input} value={age} onChangeText={setAge} />
      <Button title="Оновити" onPress={handleUpdate} />
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
