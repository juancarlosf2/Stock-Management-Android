import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import ProductForm from './ProductForm';
import { CategoryServices } from '../../../services/categoryService';
import styles from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import { ProductServices } from '../../../services/productService';
import { Product } from '../Product.type';
import { Category } from '../../Category/Category.type';

export default function AddProductScreen() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getCategories();
  }, []);
  const getCategories = async () => {
    try {
      setLoading(true);
      const { data: newCategory } = await CategoryServices.getCategories();
      setCategories(newCategory);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const formatProduct = (
    productData: Product,
    selectedCategory: number | string,
  ) => {
    productData.quantity = parseInt(productData.quantity.toString());
    if (typeof productData.alertQuantity === 'undefined') {
      productData.alertQuantity = 0;
    }
    productData.alertQuantity = parseInt(productData.alertQuantity.toString());
    productData.units = parseInt(productData.units.toString());
    if (typeof selectedCategory === 'number') {
      productData.categoryId = selectedCategory;
    }
    return productData;
  };
  const onsubmit = async (
    productData: Product,
    selectedCategory: number | string,
    photoUri: string,
  ) => {
    const newProduct = formatProduct(productData, selectedCategory);
    await ProductServices.addProduct(newProduct, photoUri);
  };
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProductForm
          onSubmit={onsubmit}
          defaultValue={{ categories: categories }}
        />
      </ScrollView>
    </View>
  );
}
