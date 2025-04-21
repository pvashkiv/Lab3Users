import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { UserService } from '../src/service/user.service.ts';

export default function DeleteUserScreen() {
  const [id, setId] = useState('');

  const handleDelete = async () => {
    if (!id) {
      Alert.alert('Помилка', 'Введіть ID користувача');
      return;
    }

    try {
      await UserService.delete(parseInt(id, 10));
      Alert.alert('Успішно', `Користувача з ID ${id} видалено`);
      setId('');
    } catch (error) {
      Alert.alert('Помилка', `Не вдалося видалити користувача з ID ${id}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Видалити користувача</Text>
      <TextInput
        placeholder="ID користувача"
        keyboardType="numeric"
        style={styles.input}
        value={id}
        onChangeText={setId}
      />
      <Button title="Видалити" onPress={handleDelete} />
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
