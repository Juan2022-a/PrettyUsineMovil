import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';

const ip = '10.10.1.16'; // Dirección IP del servidor

const CRUD = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [alias, setAlias] = useState('');
  const [clave, setClave] = useState('');
  const [confirmarClave, setConfirmarClave] = useState('');
  const [contrasenasCoinciden, setContrasenasCoinciden] = useState(true); // Nuevo estado

  // Función para verificar si las contraseñas coinciden
  useEffect(() => {
    setContrasenasCoinciden(clave === confirmarClave);
  }, [clave, confirmarClave]);

  const agregarAdministrador = async () => {
    if (!contrasenasCoinciden) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    try {
      const url = `http://${ip}/coffeeshop/api/services/admin/administrador.php?action=createRow`;

      // Crea un nuevo objeto FormData y agrega los datos
      const formData = new FormData();
      formData.append('nombreAdministrador', nombre);
      formData.append('apellidoAdministrador', apellido);
      formData.append('correoAdministrador', correo);
      formData.append('aliasAdministrador', alias);
      formData.append('claveAdministrador', clave);
      formData.append('confirmarClave', confirmarClave);

      // Realiza la petición HTTP
      const response = await fetch(url, {
        method: 'POST',
        body: formData
      });

      // Analiza la respuesta
      const responseData = await response.text();

      if (responseData === 'success') {
        console.log('Administrador agregado con éxito');
        // Puedes agregar una acción adicional si la operación es exitosa
      } else {
        console.error(responseData);
        alert('Administrador agregador correctamente');
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
        error={!contrasenasCoinciden} // Indicar error si las contraseñas no coinciden
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
