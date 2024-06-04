import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const ip = '10.10.1.103'; // Dirección IP del servidor

const DatosAdmin = () => {
  const [administradores, setAdministradores] = useState([]);

  useEffect(() => {
    getAdministradores();
  }, []);

  const getAdministradores = async () => {
    try {
      const response = await fetch(`http://${ip}/coffeeshop/api/services/admin/administrador.php?action=readAll`, {
        method: 'GET',
      });

      const data = await response.json();
      if (data.status) {
        setAdministradores(data.dataset);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error al obtener los administradores:', error);
    }
  };

  const renderAdminCard = ({ item }) => {
    return (
      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardTitle}>Administrador</Text>
        <Text style={styles.cardText}><Text style={styles.boldText}>Nombre:</Text> {item.nombre_administrador}</Text>
        <Text style={styles.cardText}><Text style={styles.boldText}>Apellido:</Text> {item.apellido_administrador}</Text>
        <Text style={styles.cardText}><Text style={styles.boldText}>Correo:</Text> {item.correo_administrador}</Text>
        <Text style={styles.cardText}><Text style={styles.boldText}>Alias:</Text> {item.alias_administrador}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={administradores}
        renderItem={renderAdminCard}
        keyExtractor={(item) => item.id_administrador.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default DatosAdmin;
