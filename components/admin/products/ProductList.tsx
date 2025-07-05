'use client';

import { useState, useEffect } from 'react';
import { TProduct } from '@/app/types';
import DataTable, { Column, DataTableAction } from '../shared/DataTable';
import ConfirmDialog from '../shared/ConfirmDialog';
import EditProductForm from './EditProductForm';
import { Edit, Trash2, Eye, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import toast from 'react-hot-toast';
import Image from 'next/image';

export default function ProductList() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    product: TProduct | null;
    isDeleting: boolean;
  }>({
    isOpen: false,
    product: null,
    isDeleting: false,
  });
  
  const [editDialog, setEditDialog] = useState<{
    isOpen: boolean;
    product: TProduct | null;
  }>({
    isOpen: false,
    product: null,
  });

  // Ürünleri getir
  const fetchProducts = async () => {
    try {
      setLoading(true);
      console.log('Fetching products...');
      
      // Cache busting için timestamp ekle
      const timestamp = new Date().getTime();
      const response = await fetch(`/api/products?t=${timestamp}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
        },
      });
      
      console.log('Response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Products data:', data);
        setProducts(data.data || []);
        if (data.data?.length === 0) {
          console.log('No products found in database');
        }
      } else {
        const errorText = await response.text();
        console.error('API Error:', response.status, errorText);
        toast.error('Ürünler getirilemedi');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Ürün silme işlemi
  const handleDelete = async () => {
    if (!deleteDialog.product) return;

    setDeleteDialog(prev => ({ ...prev, isDeleting: true }));

    try {
      const response = await fetch(`/api/products/${deleteDialog.product.slug}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Ürün başarıyla silindi');
        setProducts(products.filter(p => p.id !== deleteDialog.product!.id));
        setDeleteDialog({ isOpen: false, product: null, isDeleting: false });
      } else {
        const errorData = await response.json();
        toast.error(errorData.error?.message || 'Ürün silinemedi');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Bir hata oluştu');
    } finally {
      setDeleteDialog(prev => ({ ...prev, isDeleting: false }));
    }
  };

  // Tablo kolonları
  const columns: Column[] = [
    {
      key: 'imageUrl',
      label: 'Resim',
      render: (value, row) => (
        <div className="w-12 h-12 relative rounded-md overflow-hidden bg-muted">
          {value ? (
            <Image
              src={value}
              alt={row.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <Tag className="h-6 w-6" />
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'name',
      label: 'Ürün Adı',
      sortable: true,
    },
    {
      key: 'brandName',
      label: 'Marka',
      sortable: true,
      render: (value) => value || '-',
    },
    {
      key: 'catName',
      label: 'Kategori',
      sortable: true,
      render: (value) => value || '-',
    },
    {
      key: 'subcatName',
      label: 'Alt Kategori',
      render: (value) => value || '-',
    },
    {
      key: 'isRecommended',
      label: 'Tavsiye',
      render: (value) => (
        <Badge variant={value ? 'default' : 'secondary'}>
          {value ? 'Evet' : 'Hayır'}
        </Badge>
      ),
    },
    {
      key: 'createdAt',
      label: 'Oluşturulma',
      sortable: true,
      render: (value) => {
        if (!value) return '-';
        return new Date(value).toLocaleDateString('tr-TR');
      },
    },
  ];

  // Tablo aksiyon butonları
  const actions: DataTableAction[] = [
    {
      label: 'Görüntüle',
      icon: Eye,
      onClick: (product) => {
        // Ürün detay sayfasına yönlendir
        window.open(`/products/${product.slug}`, '_blank');
      },
    },
    {
      label: 'Düzenle',
      icon: Edit,
      onClick: (product) => {
        setEditDialog({
          isOpen: true,
          product,
        });
      },
    },
    {
      label: 'Sil',
      icon: Trash2,
      variant: 'destructive' as const,
      onClick: (product) => {
        setDeleteDialog({
          isOpen: true,
          product,
          isDeleting: false,
        });
      },
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Ürün Listesi</h2>
          <p className="text-muted-foreground">
            Toplam {products.length} ürün
          </p>
        </div>
      </div>

      <DataTable
        data={products}
        columns={columns}
        actions={actions}
        loading={loading}
        searchPlaceholder="Ürün ara..."
        onRefresh={fetchProducts}
        pageSize={10}
      />

      {/* Silme Onay Dialog'u */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => !deleteDialog.isDeleting && setDeleteDialog({ isOpen: false, product: null, isDeleting: false })}
        onConfirm={handleDelete}
        title="Ürünü Sil"
        description={`"${deleteDialog.product?.name}" ürünü kalıcı olarak silinecek. Bu işlem geri alınamaz.`}
        confirmText="Sil"
        cancelText="İptal"
        isLoading={deleteDialog.isDeleting}
        variant="destructive"
      />
      
      {/* Düzenleme Form Dialog'u */}
      {editDialog.isOpen && editDialog.product && (
        <EditProductForm
          product={editDialog.product}
          onClose={() => setEditDialog({ isOpen: false, product: null })}
          onSave={() => {
            fetchProducts(); // Ürün listesini yenile
            setEditDialog({ isOpen: false, product: null });
          }}
        />
      )}
    </div>
  );
}
