'use client';

import { useState, useEffect } from 'react';
import { TBrand } from '@/app/types';
import DataTable, { Column, DataTableAction } from '../shared/DataTable';
import ConfirmDialog from '../shared/ConfirmDialog';
import { Edit, Trash2, Tag, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
  
  const [editDialog, setEditDialog] = useState<{
    isOpen: boolean;
    brand: TBrand | null;
    isEditing: boolean;
    brandName: string;
    description: string;
  }>({
    isOpen: false,
    brand: null,
    isEditing: false,
    brandName: '',
    description: '',
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

  // Marka düzenleme işlemi
  const handleEdit = (brand: TBrand) => {
    setEditDialog({
      isOpen: true,
      brand,
      isEditing: false,
      brandName: brand.brandName,
      description: brand.description || '',
    });
  };

  // Marka güncelleme işlemi
  const handleUpdate = async () => {
    if (!editDialog.brand) return;

    if (!editDialog.brandName.trim()) {
      toast.error('Marka adı gereklidir');
      return;
    }

    setEditDialog(prev => ({ ...prev, isEditing: true }));

    try {
      const response = await fetch('/api/admin/brands/edit', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: editDialog.brand.id,
          brandName: editDialog.brandName.trim(),
          description: editDialog.description.trim(),
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        toast.success('Marka başarıyla güncellendi');
        setBrands(brands.map(b => 
          b.id === editDialog.brand!.id ? result.data : b
        ));
        setEditDialog({ isOpen: false, brand: null, isEditing: false, brandName: '', description: '' });
      } else {
        toast.error(result.error?.message || 'Marka güncellenemedi');
      }
    } catch (error) {
      console.error('Error updating brand:', error);
      toast.error('Bir hata oluştu');
    } finally {
      setEditDialog(prev => ({ ...prev, isEditing: false }));
    }
  };

  // Marka silme işlemi
  const handleDelete = async () => {
    if (!deleteDialog.brand) return;

    setDeleteDialog(prev => ({ ...prev, isDeleting: true }));

    try {
      const response = await fetch(`/api/admin/brands/edit?id=${deleteDialog.brand.id}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      
      if (result.success) {
        toast.success('Marka başarıyla silindi');
        setBrands(brands.filter(b => b.id !== deleteDialog.brand!.id));
        setDeleteDialog({ isOpen: false, brand: null, isDeleting: false });
      } else {
        toast.error(result.error?.message || 'Marka silinemedi');
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
    {
      key: 'products',
      label: 'Ürün Sayısı',
      render: (value) => (
        <span className="text-sm text-muted-foreground">
          {value?.length || 0} ürün
        </span>
      ),
    },
  ];

  // Tablo aksiyon butonları
  const actions: DataTableAction[] = [
    {
      label: 'Düzenle',
      icon: Edit,
      onClick: (brand) => {
        handleEdit(brand);
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

      {/* Düzenleme Dialog'u */}
      <Dialog
        open={editDialog.isOpen}
        onOpenChange={(open) => {
          if (!open && !editDialog.isEditing) {
            setEditDialog({ isOpen: false, brand: null, isEditing: false, brandName: '', description: '' });
          }
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Marka Düzenle</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Marka Adı *</label>
              <Input
                value={editDialog.brandName}
                onChange={(e) => setEditDialog(prev => ({ ...prev, brandName: e.target.value }))}
                placeholder="Marka adı"
                disabled={editDialog.isEditing}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Açıklama</label>
              <Textarea
                value={editDialog.description}
                onChange={(e) => setEditDialog(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Açıklama (opsiyonel)"
                disabled={editDialog.isEditing}
                rows={3}
              />
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setEditDialog({ isOpen: false, brand: null, isEditing: false, brandName: '', description: '' })}
                disabled={editDialog.isEditing}
              >
                <X className="h-4 w-4 mr-2" />
                İptal
              </Button>
              <Button
                onClick={handleUpdate}
                disabled={editDialog.isEditing || !editDialog.brandName.trim()}
              >
                {editDialog.isEditing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Güncelleniyor...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Kaydet
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
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
