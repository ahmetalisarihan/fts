"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Space } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';

const { Search } = Input;

const SearchBar: React.FC = () => {
  const router = useRouter();

  const onSearch: SearchProps['onSearch'] = async (value) => {
    try {
      // API endpoint'ine istek gönderin
      const response = await fetch(`/api/products?search=${value}`);

      // Arama sonuçlarını işleyin
      const products = await response.json();

      // Arama sonuçlarını görüntülemek için sayfayı yönlendirin
      router.replace(`/search`, undefined);
    } catch (error) {
      // Hata işleme
      console.error(error);
      // Kullanıcıya hata mesajı gösterin veya başka bir işlem yapın
    }
  };

  return (
    <Space direction="vertical">
      <Search
        placeholder="Ürün, Katagori, Marka Ara..."
        onSearch={onSearch}
        enterButton
        style={{ width: 250 }}
        size="middle"
      />
    </Space>
  );
};

export default SearchBar;