'use client';
import React from 'react';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';

const { Search } = Input;

const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

const SearchBar: React.FC = () => (
  <Space direction="vertical">

    <Search placeholder="Ürün, Katagori, Marka Ara... " 
    onSearch={onSearch} 
    enterButton 
    style={{ width: 250 }}
    size='middle'
    />

  </Space>
);

export default SearchBar;