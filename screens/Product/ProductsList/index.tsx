import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { ProductServices } from '../../../services/productService';
import ItemsList from './ItemsList';
import SearchBox from './SearchBox';
import WithLoading from '../../../hooks/hoc/WithLoader';
import { CategoryServices } from '../../../services/categoryService';
import { CategoriesList } from './Categories/';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { RootBottomTabNavigationProp } from '../../../types';
import GoToAddProducts from './GoToAddProducts';
import { Category } from '../../Category/Category.type';
import { Product } from '../Product.type';

const ProductsListScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [valueInput, setValueInput] = useState('');

  const navigation = useNavigation<RootBottomTabNavigationProp>();
  useEffect(() => {
    fetchProducts();
  }, [clearTimeout()]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data: listOfProducts } = await ProductServices.getProducts();
      setProducts(listOfProducts);

      const { data: newCategories } = await CategoryServices.getCategories();
      setCategories(newCategories);

      setFilteredProducts(listOfProducts);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchInput = (name: string) => {
    console.log(name);
    let text = name.toLowerCase().trim();
    let newProducts = products.filter((product) => {
      return product.name.toLowerCase().trim().match(text);
    });
    setTimeout(() => {
      if (!text || text === '') {
        setFilteredProducts([...products]);
      } else {
        setFilteredProducts([...newProducts]);
      }
    }, 1000);
  };
  const setProductsByCategory = async (id: number) => {
    const {
      data: listOfProducts,
    } = await ProductServices.getProductsByCategory(id);
    setProducts(listOfProducts);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <SearchBox
          valueInput={valueInput}
          setValueInput={setValueInput}
          newProducts={handleSearchInput}
        />
        <>
          <CategoriesList
            categories={categories}
            setProductsByCategory={setProductsByCategory}
          />
        </>
      </SafeAreaView>
      <View style={styles.content}>
        <WithLoading isLoading={loading}>
          <ItemsList products={filteredProducts} />
          <GoToAddProducts navigation={navigation} />
        </WithLoading>
      </View>
    </View>
  );
};

export default ProductsListScreen;
