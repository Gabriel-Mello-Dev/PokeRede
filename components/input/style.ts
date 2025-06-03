import { StyleSheet, Dimensions, StatusBar } from "react-native";

const { width, height } = Dimensions.get('window');

export const style = StyleSheet.create({
  txtinpt: {
    height: height * 0.06,
    width: width * 0.85,
    borderRadius: 12,
    borderWidth: 4,
    borderColor: '#fff', 
    backgroundColor: '#fff', 
    paddingHorizontal: 15,
    marginBottom: 10,
    fontFamily: 'Roboto-Regular',
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    color: '#000', 
  },

  titulo: {
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "Montserrat-Bold",
    justifyContent: "center",
    alignItems: "center",
    color: '#fff', 
  },
});