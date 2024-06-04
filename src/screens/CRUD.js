import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';

const CRUD = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [alias, setAlias] = useState('');
  const [clave, setClave] = useState('');
  const [confirmarClave, setConfirmarClave] = useState('');
  const ip = `10.10.1.103`;

  const agregarAdministrador = async () => {
    if (clave !== confirmarClave) {
      alert('Las contraseñas no coinciden.');
      return;
    }
  
    try {
      const url = `http://${ip}/coffeeshop/api/services/admin/administrador.php?action=createRow`;
  
      // Crea un nuevo objeto FormData y agrega los datos
      const formData = new FormData();
      formData.append('nombre_administrador', nombre);
      formData.append('apellido_administrador', apellido);
      formData.append('correo_administrador', correo);
      formData.append('alias_administrador', alias);
      formData.append('clave_administrador', clave);
  
      // Realiza la petición HTTP
      const response = await fetch(url, {
        method: 'POST',
        body: formData
      });
  
      // Analiza la respuesta JSON
      const responseData = await response.json();
  
      if (responseData.status) {
        console.log('Administrador agregado con éxito');
        // Puedes agregar una acción adicional si la operación es exitosa
      } else {
        console.error(responseData.error);
        alert('Error al agregar administrador: ' + responseData.error);
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      alert('Error al enviar la solicitud');
    }
  
    // Limpia los campos después de agregar un administrador
    setNombre('');
    setApellido('');
    setCorreo('');
    setAlias('');
    setClave('');
    setConfirmarClave('');
  };  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar un Administrador</Text>

      <TextInput
        label="Nombre"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />
      <TextInput
        label="Apellido"
        value={apellido}
        onChangeText={setApellido}
        style={styles.input}
      />
      <TextInput
        label="Correo"
        value={correo}
        onChangeText={setCorreo}
        style={styles.input}
      />
      <TextInput
        label="Alias"
        value={alias}
        onChangeText={setAlias}
        style={styles.input}
      />
      <TextInput
        label="Clave"
        value={clave}
        onChangeText={setClave}
        style={styles.input}
        secureTextEntry
      />
      <TextInput
        label="Confirmar Clave"
        value={confirmarClave}
        onChangeText={setConfirmarClave}
        style={styles.input}
        secureTextEntry
      />

      <Button mode="contained" style={styles.button} onPress={agregarAdministrador}>
        Agregar Administrador
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});

export default CRUD;
