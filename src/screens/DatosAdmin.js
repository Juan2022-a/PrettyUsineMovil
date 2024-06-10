import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Button } from 'react-native';

const ip = '10.10.1.16'; // Dirección IP del servidor

const DatosAdmin = () => {
  const [administradores, setAdministradores] = useState([]);
  const [updateData, setUpdateData] = useState({
    id: '',
    nombre: '',
    apellido: '',
    correo: '',
    alias: '',
  });

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
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => handleDelete(item.id_administrador)}>
            <Text style={styles.buttonText}>Eliminar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setUpdateData({id: item.id_administrador, nombre: item.nombre_administrador, apellido: item.apellido_administrador, correo: item.correo_administrador, alias: item.alias_administrador})}>
            <Text style={styles.buttonText}>Actualizar</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const handleDelete = async (id) => {
    try {
      const formData=new FormData();
      formData.append('idAdministrador', id);
      console.log("EN ELIMINAR")

      const response = await fetch(`http://${ip}/coffeeshop/api/services/admin/administrador.php?action=deleteRow`, {
        method: 'POST',
        body:formData
      });

      if (response.ok) {
        getAdministradores();
      } else {
        console.error('Error al eliminar el administrador:', response.status);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud de eliminación:', error);
    }
  };
  

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('idAdministrador', updateData.id);
      formData.append('nombreAdministrador', updateData.nombre);
      formData.append('apellidoAdministrador', updateData.apellido);
      formData.append('correoAdministrador', updateData.correo);

      const response = await fetch(`http://${ip}/coffeeshop/api/services/admin/administrador.php?action=updateRow`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        getAdministradores();
      } else {
        console.error('Error al actualizar el administrador:', response.status);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud de actualización:', error);
    }
  };

  const handleClearForm = () => {
    setUpdateData({
      id: '',
      nombre: '',
      apellido: '',
      correo: '',
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={administradores}
        renderItem={renderAdminCard}
        keyExtractor={(item) => item.id_administrador.toString()}
      />

      {/* Formulario para actualizar datos */}
      <View style={styles.updateForm}>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={updateData.nombre}
          onChangeText={(text) => setUpdateData({ ...updateData, nombre: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Apellido"
          value={updateData.apellido}
          onChangeText={(text) => setUpdateData({ ...updateData, apellido: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Correo"
          value={updateData.correo}
          onChangeText={(text) => setUpdateData({ ...updateData, correo: text })}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
            <Text style={styles.updateButtonText}>Actualizar Datos</Text>
          </TouchableOpacity>
          <Button title="Limpiar Formulario" onPress={handleClearForm} />
        </View>
      </View>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 10,
    width: '48%',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  updateForm: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  updateButton: {
    backgroundColor: '#28a745',
    borderRadius: 5,
    padding: 10,
    width: '48%',
  },
  updateButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default DatosAdmin;
