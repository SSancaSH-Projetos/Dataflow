import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList
} from "react-native";
import { CoffeeItem } from "./components/CoffeeItem";
import { SeparatorItem } from "./components/SeparatorItem/SeparatorItem";
import { coffeeList } from "./data/coffeeList";

export default function App() {
  function renderItem({ item }) {
    return <CoffeeItem {...item} />;
  }
  return (
    <View style={styles.container}>
      <FlatList
        ItemSeparatorComponent={SeparatorItem}
        data={coffeeList}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
