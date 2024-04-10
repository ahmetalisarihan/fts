// 'use client'

// import { useState, useEffect } from 'react';
// import { Category, Subcategory } from '@/app/types';
// import { ChangeEvent } from 'react';

// interface FormValues {
//   catName: string;
//   description: string;
//   selectedCategory?: string; // Alt kategori için opsiyonel ana kategori
// }

// const CategoryAndSubcategoryForm = () => {
//   const [formValues, setFormValues] = useState<FormValues>({
//     catName: '',
//     description: '',
//   });
//   const [isCreatingSubcategory, setIsCreatingSubcategory] = useState(false);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetch('/api/categories')
//       .then(res => res.json())
//       .then((data: Category[]) => setCategories(data));
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormValues({ ...formValues, [e.target.name]: e.target.value });
//   };

//   const handleChangeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
//     setFormValues({ ...formValues, selectedCategory: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (isCreatingSubcategory && !formValues.selectedCategory) {
//       setError('Alt kategori için ana kategori seçmelisiniz.');
//       return;
//     }

//     const data: Partial<Subcategory> | Category = isCreatingSubcategory
//       ? { ...formValues, parentCategory: formValues.selectedCategory } // Alt kategori
//       : { ...formValues }; // Kategori

//     try {
//       const response = await fetch(
//         isCreatingSubcategory ? '/api/subcategories' : '/api/categories',
//         {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(data),
//         }
//       );

//       if (!response.ok) {
//         const errorData = await response.json();
//         setError(errorData.message || 'Bir hata oluştu.');
//       } else {
//         // Başarılı işlem sonrası formu temizleme veya yönlendirme
//         setFormValues({ catName: '', description: '' });
//         setIsCreatingSubcategory(false);
//         setError('');
//       }
//     } catch (error) {
//       console.error(error);
//       setError('Bir hata oluştu. Lütfen tekrar deneyin.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//       <div className="flex items-center">
//         <input
//           type="radio"
//           id="create-category"
//           name="category-type"
//           checked={!isCreatingSubcategory}
//           onChange={() => setIsCreatingSubcategory(false)}
//         />
//         <label htmlFor="create-category" className="ml-2">
//           Kategori Oluştur
//         </label>
//       </div>
//       <div className="flex items-center">
//         <input
//           type="radio"
//           id="create-subcategory"
//           name="category-type"
//           checked={isCreatingSubcategory}
//           onChange={() => setIsCreatingSubcategory(true)}
//         />
//         <label htmlFor="create-subcategory" className="ml-2">
//           Alt Kategori Oluştur
//         </label>
//       </div>

//       <input 
//         type="text"
//         name="catName"
//         value={formValues.catName}
//         onChange={handleChange} 
//         placeholder="Kategori/Alt Kategori Adı"
//         className="border rounded p-2" 
//       />

//       <textarea 
//         name="description"
//         value={formValues.description}
//         onChange={handleChangeDescription} 
//         placeholder="Açıklama"
//         className="border rounded p-2" 
//       />

//       {isCreatingSubcategory && (
//         <select 
//           name="selectedCategory"
//           value={formValues.selectedCategory || ''}
//           onChange={handleChangeCategory} // `select` için özel işleyici
//           className="border rounded p-2"
//         >
//           <option value="">Ana Kategori Seçin</option>
//           {categories.map((category) => (
//             <option key={category.id} value={category.catName}>
//               {category.catName}
//             </option>
//           ))}
//         </select>
//       )}

//       <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
//         Oluştur
//       </button>

//       {error && <p className="text-red-500">{error}</p>}
//     </form>
//   );
// };

// export default CategoryAndSubcategoryForm;