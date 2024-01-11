import { Text, Pressable, StyleSheet } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons'


export default function IconButton({ icon, label, onPress }) {

  return (
    <Pressable style={style.IconButton} onPress={onPress}>
      <MaterialIcons name={icon} size={24} color="#fff" />
      <Text style={style.IconButtonLabel}>{label}</Text>
    </Pressable>
  );
}


const style = StyleSheet.create({

  IconButton: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  IconButtonLabel: {
    color: '#fff',
    marginTop: 12,
  },
});