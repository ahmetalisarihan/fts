'use client';

import { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, GripVertical, Plus, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface Category {
  id: string;
  catName: string;
  description?: string;
  order?: number;
  subcategories?: Subcategory[];
  products?: any[];
}

interface Subcategory {
  id: string;
  subcatName: string;
  description?: string;
  order?: number;
  catName: string;
  products?: any[];
}

interface SortableCategoryProps {
  category: Category;
  editingCategory: Category | null;
  expandedCategories: Set<string>;
  onEdit: (category: Category) => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: (categoryId: string) => void;
  onToggleExpansion: (categoryId: string) => void;
  onUpdateEditingCategory: (category: Category) => void;
  onSubcategoryReorder: (subcategoryIds: string[]) => void;
}

function SortableCategory({
  category,
  editingCategory,
  expandedCategories,
  onEdit,
  onSave,
  onCancel,
  onDelete,
  onToggleExpansion,
  onUpdateEditingCategory,
  onSubcategoryReorder,
}: SortableCategoryProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: category.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleSubcategoryDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id && category.subcategories) {
      const oldIndex = category.subcategories.findIndex((sub) => sub.id === active.id);
      const newIndex = category.subcategories.findIndex((sub) => sub.id === over?.id);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        const reorderedSubcategories = arrayMove(category.subcategories, oldIndex, newIndex);
        onSubcategoryReorder(reorderedSubcategories.map(sub => sub.id));
      }
    }
  };

  return (
    <Card ref={setNodeRef} style={style} className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div {...attributes} {...listeners} className="cursor-grab hover:cursor-grabbing">
              <GripVertical className="h-5 w-5 text-gray-400" />
            </div>
            
            {editingCategory?.id === category.id ? (
              <div className="flex-1 space-y-2">
                <Input
                  value={editingCategory.catName}
                  onChange={(e) => onUpdateEditingCategory({
                    ...editingCategory,
                    catName: e.target.value
                  })}
                  placeholder="Kategori adı"
                />
                <Textarea
                  value={editingCategory.description || ''}
                  onChange={(e) => onUpdateEditingCategory({
                    ...editingCategory,
                    description: e.target.value
                  })}
                  placeholder="Açıklama"
                  rows={2}
                />
              </div>
            ) : (
              <div className="flex-1">
                <CardTitle className="text-lg">{category.catName}</CardTitle>
                {category.description && (
                  <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                )}
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">
              {category.subcategories?.length || 0} alt kategori
            </Badge>
            <Badge variant="outline">
              {category.products?.length || 0} ürün
            </Badge>
            
            {editingCategory?.id === category.id ? (
              <>
                <Button
                  size="sm"
                  onClick={onSave}
                  className="h-8 w-8 p-0"
                >
                  <Save className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={onCancel}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEdit(category)}
                  className="h-8 w-8 p-0"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete(category.id)}
                  className="h-8 w-8 p-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </>
            )}
            
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onToggleExpansion(category.id)}
            >
              {expandedCategories.has(category.id) ? '−' : '+'}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      {expandedCategories.has(category.id) && category.subcategories && category.subcategories.length > 0 && (
        <CardContent className="pt-0">
          <div className="ml-8">
            <h4 className="font-medium text-sm text-gray-700 mb-2">Alt Kategoriler:</h4>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleSubcategoryDragEnd}
            >
              <SortableContext
                items={category.subcategories?.map(sub => sub.id) || []}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-2">
                  {category.subcategories?.map((subcategory) => (
                    <SortableSubcategory
                      key={subcategory.id}
                      subcategory={subcategory}
                    />
                  )) || []}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        </CardContent>
      )}
    </Card>
  );
}

function SortableSubcategory({ subcategory }: { subcategory: Subcategory }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: subcategory.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between p-2 bg-gray-50 rounded border"
    >
      <div className="flex items-center space-x-2">
        <div {...attributes} {...listeners} className="cursor-grab hover:cursor-grabbing">
          <GripVertical className="h-4 w-4 text-gray-400" />
        </div>
        <span className="text-sm">{subcategory.subcatName}</span>
        <Badge variant="outline" className="text-xs">
          {subcategory.products?.length || 0} ürün
        </Badge>
      </div>
    </div>
  );
}

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const result = await response.json();
      if (result.success) {
        setCategories(result.data || []);
      } else {
        toast.error('Kategoriler yüklenemedi');
      }
    } catch (error) {
      console.error('Kategori yükleme hatası:', error);
      toast.error('Kategoriler yüklenemedi');
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setCategories((categories) => {
        const oldIndex = categories.findIndex((cat) => cat.id === active.id);
        const newIndex = categories.findIndex((cat) => cat.id === over?.id);
        
        const reorderedCategories = arrayMove(categories, oldIndex, newIndex);
        
        // API'ye sıralama güncelleme isteği gönder
        fetch('/api/admin/categories/reorder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ categoryIds: reorderedCategories.map(cat => cat.id) }),
        }).then(() => {
          toast.success('Kategori sıralaması güncellendi');
        }).catch(() => {
          toast.error('Sıralama güncellenemedi');
          fetchCategories();
        });
        
        return reorderedCategories;
      });
    }
  };

  const handleSubcategoryReorder = async (subcategoryIds: string[]) => {
    try {
      await fetch('/api/admin/subcategories/reorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subcategoryIds }),
      });
      toast.success('Alt kategori sıralaması güncellendi');
    } catch (error) {
      toast.error('Alt kategori sıralaması güncellenemedi');
      fetchCategories();
    }
  };

  const handleEditCategory = async () => {
    if (!editingCategory) return;
    
    try {
      const response = await fetch('/api/admin/categories/edit', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: editingCategory.id,
          catName: editingCategory.catName,
          description: editingCategory.description,
        }),
      });

      const result = await response.json();
      if (result.success) {
        toast.success('Kategori güncellendi');
        setEditingCategory(null);
        fetchCategories();
      } else {
        toast.error(result.error?.message || 'Kategori güncellenemedi');
      }
    } catch (error) {
      toast.error('Kategori güncellenemedi');
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (!confirm('Bu kategoriyi silmek istediğinizden emin misiniz?')) return;

    try {
      const response = await fetch(`/api/admin/categories/edit?id=${categoryId}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      if (result.success) {
        toast.success('Kategori silindi');
        fetchCategories();
      } else {
        toast.error(result.error?.message || 'Kategori silinemedi');
      }
    } catch (error) {
      toast.error('Kategori silinemedi');
    }
  };

  const toggleCategoryExpansion = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  if (loading) {
    return <div className="flex justify-center p-8">Kategoriler yükleniyor...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Kategori Yönetimi</h2>
        <Button onClick={() => fetchCategories()} variant="outline">
          Yenile
        </Button>
      </div>
      
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={categories.map(cat => cat.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {categories.map((category) => (
              <SortableCategory
                key={category.id}
                category={category}
                editingCategory={editingCategory}
                expandedCategories={expandedCategories}
                onEdit={setEditingCategory}
                onSave={handleEditCategory}
                onCancel={() => setEditingCategory(null)}
                onDelete={handleDeleteCategory}
                onToggleExpansion={toggleCategoryExpansion}
                onUpdateEditingCategory={setEditingCategory}
                onSubcategoryReorder={handleSubcategoryReorder}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      
      {categories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Henüz kategori bulunmuyor.</p>
        </div>
      )}
    </div>
  );
};

export default CategoryList;

