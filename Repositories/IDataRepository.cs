using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using vueproject.Models;
using vueproject.ViewModels;

namespace vueproject.Repositories
{
    public interface IDataRepository
    {
        IEnumerable<Product> Products { get; }
        IEnumerable<Category> Categories { get; }
        IEnumerable<Subcategory> Subcategories { get; }

        //Task RepoSaveChanges();
        void AddCategory(CategoriesViewModel vm);

        IEnumerable<Category> GetCategories(bool includeSubCategories);
        IEnumerable<Product> GetProducts(bool includeModifiedBy, bool includeSubCategories);
        void AddSubCategory(Subcategory subCat);
        void UpdateCategory(Category cat);
        void CreateNewProduct(Product p);
        void UpdateSubCategory(Subcategory subCat);
        void DeleteSubCategory(int DeleteSubCategoryId);
        void DeleteCategory(int DeleteCategoryId);
        void PublishProduct(int ProductId);
        void UnPublishProduct(int ProductId);
        void UpdateProduct(Product ProductToUpdate, EditProductViewModel vm, string userName);
        void DeleteProduct(int DeleteProductId);


    }
}
