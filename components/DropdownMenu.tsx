'use client'
import React from 'react';
import { CaretDownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';

const items: MenuProps['items'] = [
  {
    key: '1',
    type: 'group',
    label: 'Boru Türleri',
    className: 'font-bold',
    children: [
      {
        key: '1-1',
        label: 'Plastik Boru',
        children: [
          {
            key: '1-1-1',
            label: 'PVC Boru',
          },
          {
            key: '1-1-2',
            label: 'PE Boru',
          },
          {
            key: '1-1-3',
            label: 'PP Boru',
          },
        ],
      },
      {
        key: '1-2',
        label: 'Çelik Boru',
        children: [
          {
            key: '1-2-1',
            label: 'Dikisiz Boru',
          },
          {
            key: '1-2-2',
            label: 'Dikili Boru',
          },
          {
            key: '1-2-3',
            label: 'Dikisli Boru',
          },
        ],
      },
    ],
  },
  {
    key: '2',
    label: 'Tesisat Malzemeleri',
    children: [
      {
        key: '2-1',
        label: 'Flatörler',
      },
      {
        key: '2-2',
        label: 'Su Saatleri',
      },
    ],
  },
  {
    key: '3',
    label: 'Kelepçeler',
    children: [
      {
        key: '3-1',
        label: 'Trifon Kelepçe',
      },
      {
        key: '3-2',
        label: 'PVC Kelepçe',
      },
    ],
  },
  {
    key: '4',
    label: 'Hidroforlar',
    children: [
      {
        key: '4-1',
        label: '5th menu item',
      },
      {
        key: '4-2',
        label: '6th menu item',
      },
    ],
  },
  {
    key: '5',
    label: 'Vanalar',
    children: [
      {
        key: '5-1',
        label: 'Prinç Vana',
      },
      {
        key: '5-2',
        label: 'Pik Döküm Vana',
      },
    ],
  },
  {
    key: '6',
    label: 'Kelepçeler',
    children: [
      {
        key: '6-1',
        label: 'Trifon Kelepçe',
      },
      {
        key: '6-2',
        label: 'PVC Kelepçe',
      },
    ],
  },
  {
    key: '7',
    label: 'Diğer Menü',
    disabled: true,
    children: [
      {
        key: '7-1',
        label: '5d menu item',
      },
      {
        key: '7-2',
        label: '6th menu item',
      },
    ],
  },
];

const DropdownMenu: React.FC = () => (
  <Dropdown menu={{ items }}>
    <a onClick={(e) => e.preventDefault()}>
      <Space >
        Ürünler
        <CaretDownOutlined />
      </Space>
    </a>
  </Dropdown>
);

export default DropdownMenu;