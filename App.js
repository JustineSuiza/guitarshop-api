import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import localGuitars from './guitars.json';

// STEP 2 (optional but recommended): host guitars.json on GitHub and paste
// the RAW link here. While this is empty, the app uses the local guitars.json
// so you can run it right away.
const API_URL = '';
// Example:
// const API_URL = 'https://raw.githubusercontent.com/yourname/guitar-api/main/guitars.json';

const COLORS = {
  wood: '#2B1B12',
  amber: '#E0902B',
  amberSoft: '#FBE9CF',
  paper: '#FAF6F0',
  card: '#FFFFFF',
  muted: '#7A6A5C',
  red: '#B3392B',
  green: '#2F7D4F',
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
  const [guitars, setGuitars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [source, setSource] = useState('');

  const loadGuitars = useCallback(async () => {
    try {
      if (!API_URL) throw new Error('No API_URL set');
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Request failed');
      setGuitars(await response.json());
      setSource('Live data from API');
    } catch (err) {
      // Fall back to the local file so the app still works offline
      setGuitars(localGuitars);
      setSource(API_URL ? 'API unreachable - showing local data' : 'Showing local sample data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadGuitars();
  }, [loadGuitars]);

  if (!fontsLoaded || loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.amber} />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.meta}>
          {item.brand} - {item.type}
        </Text>
        <Text style={[styles.stock, { color: item.inStock ? COLORS.green : COLORS.red }]}>
          {item.inStock ? 'In stock' : 'Out of stock'}
        </Text>
      </View>
      <Text style={styles.price}>PHP {item.price.toLocaleString('en-US')}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.wood} />
      <View style={styles.header}>
        <Text style={styles.title}>Fretboard Music</Text>
        <Text style={styles.subtitle}>
          {guitars.length} guitars - {source}
        </Text>
      </View>
      <FlatList
        data={guitars}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          loadGuitars();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.paper },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.paper,
  },
  header: {
    backgroundColor: COLORS.wood,
    paddingTop: 64,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomWidth: 4,
    borderBottomColor: COLORS.amber,
  },
  title: { fontFamily: 'Poppins_700Bold', fontSize: 28, color: '#FFFFFF' },
  subtitle: { fontFamily: 'Poppins_400Regular', fontSize: 13, color: COLORS.amberSoft },
  list: { padding: 16 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    padding: 14,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: COLORS.wood,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: COLORS.amberSoft,
    marginRight: 12,
  },
  info: { flex: 1 },
  name: { fontFamily: 'Poppins_600SemiBold', fontSize: 15, color: COLORS.wood },
  meta: { fontFamily: 'Poppins_400Regular', fontSize: 12, color: COLORS.muted },
  stock: { fontFamily: 'Poppins_400Regular', fontSize: 12, marginTop: 2 },
  price: { fontFamily: 'Poppins_700Bold', fontSize: 14, color: COLORS.wood, marginLeft: 8 },
});
