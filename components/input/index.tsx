import React from "react";
import { Text, View, TextInput, StyleSheet, TextInputProps } from "react-native";
import { style } from "./style";

export function Input(props: TextInputProps & { 
  nome?: string, 
  place?: string; 
  icon?: string; 
  privado?: boolean; 
}) {
  const { nome, place, icon, privado, ...restProps } = props;

  return (
    <View style={{ marginBottom: 15 }}>
      {nome && <Text style={style.titulo}>{nome}</Text>}
      
      <View style={style.txtinpt}>
        <TextInput
          style={{ 
            flex: 1, 
            height: 40,
            color: '#000' 
          }}
          placeholder={place}
          placeholderTextColor="#999"
          secureTextEntry={privado}
          {...restProps} 
        />
      </View>
    </View>
  );
}