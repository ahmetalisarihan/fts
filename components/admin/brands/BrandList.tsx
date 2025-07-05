'use client';

import { useState, useEffect } from 'react';
import { TBrand } from '@/app/types';
import DataTable, { Column, DataTableAction } from '../shared/DataTable';
import ConfirmDialog from '../shared/ConfirmDialog';
import { Edit, Trash2, Tag } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BrandList() {
  const [brands, setBrands] = useState<TBrand[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    brand: TBrand | null;
    isDeleting: boolean;
  }>({
    isOpen: false,
    brand: null,
    isDeleting: false,
  });

  // Markaları getir
  const fetchBrands = async () => {
    try {
      setLoading(true);
      console.log('Fetching brands...');
      
      // Cache busting için timestamp ekle
      const timestamp = new Date().getTime();
      const response = await fetch(`/api/brands?t=${timestamp}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
        },
      });
      
      console.log('Brands response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Brands data:', data);
        setBrands(data.data || []);
        if (data.data?.length === 0) {
          console.log('No brands found in database');
        }
      } else {
        const errorText = await response.text();
        console.error('Brands API Error:', response.status, errorText);
        toast.error('Markalar getirilemedi');
      }
    } catch (error) {
      console.error('Error fetching brands:', error);
      toast.error('Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  // Marka silme işlemi
  const handleDelete = async () => {
    if (!deleteDialog.brand) return;

    setDeleteDialog(prev => ({ ...prev, isDeleting: true }));

    try {
      const response = await fetch(`/api/brands/${deleteDialog.brand.brandName}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Marka başarıyla silindi');
        setBrands(brands.filter(b => b.id !== deleteDialog.brand!.id));
        setDeleteDialog({ isOpen: false, brand: null, isDeleting: false });
      } else {
        const errorData = await response.json();
        toast.error(errorData.error?.message || 'Marka silinemedi');
      }
    } catch (error) {
      console.error('Error deleting brand:', error);
      toast.error('Bir hata oluştu');
    } finally {
      setDeleteDialog(prev => ({ ...prev, isDeleting: false }));
    }
  };

  // Tablo kolonları
  const columns: Column[] = [
    {
      key: 'brandName',
      label: 'Marka Adı',
      sortable: true,
      render: (value) => (
        <div className="flex items-center space-x-2">
          <Tag className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{value}</span>
        </div>
      ),
    },
    {
      key: 'description',
      label: 'Açıklama',
      render: (value) => value || '-',
    },
  ];

  // Tablo aksiyon butonları
  const actions: DataTableAction[] = [
    {
      label: 'Düzenle',
      icon: Edit,
      onClick: (brand) => {
        toast.info('Düzenleme özelliği yakında gelecek');
      },
    },
    {
      label: 'Sil',
      icon: Trash2,
      variant: 'destructive' as const,
      onClick: (brand) => {
        setDeleteDialog({
          isOpen: true,
          brand,
          isDeleting: false,
        });
      },
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Marka Listesi</h2>
          <p className="text-muted-foreground">
            Toplam {brands.length} marka
          </p>
        </div>
      </div>

      <DataTable
        data={brands}
        columns={columns}
        actions={actions}
        loading={loading}
        searchPlaceholder="Marka ara..."
        onRefresh={fetchBrands}
        pageSize={10}
      />

      {/* Silme Onay Dialog'u */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => !deleteDialog.isDeleting && setDeleteDialog({ isOpen: false, brand: null, isDeleting: false })}
        onConfirm={handleDelete}
        title="Markayı Sil"
        description={`"${deleteDialog.brand?.brandName}" markası kalıcı olarak silinecek. Bu işlem geri alınamaz.`}
        confirmText="Sil"
        cancelText="İptal"
        isLoading={deleteDialog.isDeleting}
        variant="destructive"
      />
    </div>
  );
}
