import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';

// Pantallas de navegación
import HomeScreen from '../screens/HomeScreen';
import DatosAdmin from '../screens/DatosAdmin';
import LoginScreen from '../screens/LoginScreen';
import CRUD from '../screens/CRUD';

// Navegador Bottom Tabs Navigator
const Tab = createBottomTabNavigator();

export default function BottomTab({ logueado, setLogueado }) {
  // Función para renderizar HomeScreen con props
  const renderHomeScreen = props => (
    <HomeScreen {...props} setLogueado={setLogueado} logueado={logueado} />

  );

  const renderCRUD = props => (
    <CRUD {...props} setLogueado={setLogueado} logueado={logueado} />
  );

  const renderDatosAdmin = props => (
    <DatosAdmin {...props} setLogueado={setLogueado} logueado={logueado} />
  );

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeScreen"
        component={renderHomeScreen}
        options={{
          title: 'Inicio',
          tabBarActiveTintColor: '#FFC300', // Color activo de la pestaña
          headerStyle: {
            backgroundColor: '#FFC300', // Color del header
          },
          headerTintColor: '#fff', // Color del texto en el header
          tabBarIcon: ({ color }) => ( // Función que define el ícono de la pestaña
            <Ionicons name="home" color={color} size={24} /> // `color` proviene de React Navigation
          ),
        }}
      />

      <Tab.Screen
        name="CRUD"
        component={renderCRUD}
        options={{
          title: 'CRUD u.u',
          tabBarActiveTintColor: '#FFC300', // Color activo de la pestaña
          headerStyle: {
            backgroundColor: '#FFC300', // Color del header
          },
          headerTintColor: '#fff', // Color del texto en el header
          tabBarIcon: ({ color }) => ( // Función que define el ícono de la pestaña
            <AntDesign name="plussquareo" color={color} size={24} /> // `color` proviene de React Navigation            
          ),
        }}
      />

      <Tab.Screen
        name="DatosAdmin"
        component={renderDatosAdmin}
        options={{
          title: 'Admins registrados',
          tabBarActiveTintColor: '#FFC300', // Color activo de la pestaña
          headerStyle: {
            backgroundColor: '#FFC300', // Color del header
          },
          headerTintColor: '#fff', // Color del texto en el header
          tabBarIcon: ({ color }) => ( // Función que define el ícono de la pestaña
            <Ionicons name="accessibility-outline" color={color} size={24} /> // `color` proviene de React Navigation
          ),
        }}
      />
    </Tab.Navigator>
  );

}
