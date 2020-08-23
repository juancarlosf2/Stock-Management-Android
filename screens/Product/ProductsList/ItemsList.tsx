import React from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import ItemCard from './ItemCard';
import { Product } from '../Product.type';

interface Props {
  products: Product[];
}
function ItemsList({ products }: Props) {
  return (
    <FlatList
      data={products}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      renderItem={({ item }) => (
        <ItemCard
          sku={item.sku}
          name={item.name}
          uri={item.photoUri}
          quantity={item.quantity}
        />
      )}
      keyExtractor={(item) => item.sku}
      // contentContainerStyle={{ width: '100%' }}
    />
  );
}

export default ItemsList;
