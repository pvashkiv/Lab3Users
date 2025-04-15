import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {User, UserService} from '../src/service/user.service.ts';

export default function UsersScreen() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    UserService.getAll().then(setUsers);
  }, []);

  const renderItem = ({item}: {item: User}) => (
    <View style={styles.item}>
      <Text>ID: {item.id}</Text>
      <Text>Name: {item.name}</Text>
      <Text>Age: {item.age}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Усі користувачі:</Text>
      <FlatList
        data={users}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 10},
  item: {padding: 10, borderBottomWidth: 1, borderColor: '#ccc'},
});
