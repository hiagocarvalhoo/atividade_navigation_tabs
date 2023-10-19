import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, Title, List, Divider } from 'react-native-paper';
import Api from '../../services/Api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await Api.get('/users');
        console.log('Response data:', response.data);
        setUsers(response.data.users || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text style={styles.loadingText}>Carregando...</Text>
      ) : (
        <List.Section>
          {users.map((item) => (
            <View key={item.id.toString()}>
              <Card style={styles.card}>
                <Card.Content>
                  <Title>{item.firstName}</Title>
                  <Text>{`Idade: ${item.age}`}</Text>
                  <Text>{`E-mail: ${item.email}`}</Text>
                  <Text>{`Telefone: ${item.phone}`}</Text>
                </Card.Content>
              </Card>
              <Divider />
            </View>
          ))}
        </List.Section>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFC0CB', // Background rosa claro
  },
  loadingText: {
    fontSize: 24,
    color: '#0077b6',
    alignSelf: 'center',
  },
  card: {
    marginVertical: 10,
  },
});

export default Users;
