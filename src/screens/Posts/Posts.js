import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, List, Divider } from 'react-native-paper';
import Api from '../../services/Api';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await Api.get('/posts');
        console.log('Response data:', response.data);
        setPosts(response.data.posts || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text style={styles.loadingText}>Carregando...</Text>
      ) : (
        <List.Section>
          {posts.map((item) => (
            <View key={item.id.toString()}>
              <List.Item
                title={`Title: ${item.title}`}
                description={`Body: ${item.body}`}
                left={() => <List.Icon icon="post" />}
              />
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
    backgroundColor: '#e0e0e0', // Background roxo claro
  },
  loadingText: {
    fontSize: 24,
    color: '#0077b6',
    alignSelf: 'center',
  },
});

export default Posts;
