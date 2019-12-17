using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using vueproject.DB;
using vueproject.Models;
using vueproject.ViewModels;

namespace vueproject.Repositories
{
    public class DataRepository : IDataRepository
    {
        private vueprojectDatabaseContext ctx;
        private readonly UserManager<IdentityUser> _userManager;

        public DataRepository(vueprojectDatabaseContext context, UserManager<IdentityUser> UserManager)
        {
            _userManager = UserManager;
            ctx = context;
        }

        public IEnumerable<Product> Products => ctx.Products;
        public IEnumerable<Category> Categories => ctx.Categories;
        public IEnumerable<Subcategory> Subcategories => ctx.Subcategories;

        //public async Task RepoSaveChanges()
        //{
        //    await ctx.SaveChangesAsync();
        //}

        public void AddCategory(CategoriesViewModel vm)
        {
            ctx.Categories.Add(vm.Category);
            ctx.SaveChanges();
        }

        public void AddSubCategory(Subcategory subCat)
        {
            ctx.Subcategories.Add(subCat);
            ctx.SaveChanges();
        }

        public void UpdateCategory(Category cat)
        {
            ctx.Categories.Update(cat).State = EntityState.Modified;
            ctx.SaveChanges();
        }

        public void UpdateSubCategory(Subcategory subCat)
        {
            ctx.Subcategories.Update(subCat).State = EntityState.Modified;
            ctx.SaveChanges();
        }

        public void UpdateProduct(Product ProductToUpdate, EditProductViewModel vm, string userName)
        {
            ProductToUpdate.Depth = vm.Product.Depth;
            ProductToUpdate.Width = vm.Product.Width;
            ProductToUpdate.Weight = vm.Product.Weight;
            ProductToUpdate.Height = vm.Product.Height;
            ProductToUpdate.Name = vm.Product.Name;
            ProductToUpdate.Price = vm.Product.Price;
            ProductToUpdate.StockBalance = vm.Product.StockBalance;
            ProductToUpdate.DiscountPercentage = vm.Product.DiscountPercentage;


            var user = _userManager.FindByNameAsync(userName).Result;

            ProductToUpdate.ModifiedBy = user;


            ProductToUpdate.DateUpdated = DateTime.Now;

            ctx.Products.Update(ProductToUpdate).State = EntityState.Modified;
            ctx.SaveChanges();
        }

        public void DeleteProduct(int DeleteProductId)
        {

            var ProductToDelete = ctx.Products.Find(DeleteProductId);
            ctx.Products.Remove(ProductToDelete);
            ctx.SaveChanges();
        }

        public void DeleteSubCategory(int DeleteSubCategoryId)
        {
            var SubCatToDelete = ctx.Subcategories.Find(DeleteSubCategoryId);
            ctx.Subcategories.Remove(SubCatToDelete);
            ctx.SaveChanges();
        }

        public void DeleteCategory(int DeleteCategoryId)
        {
            var CatToDelete = ctx.Categories.Find(DeleteCategoryId);
            ctx.Categories.Remove(CatToDelete);
            ctx.SaveChanges();
        }

        public void CreateNewProduct(Product p)
        {
            ctx.Products.Add(p);
            ctx.SaveChanges();
        }

        public void PublishProduct(int ProductId)
        {

            var ProductToPublish = ctx.Products.Find(ProductId);
            ProductToPublish.Published = true;
            ctx.Products.Update(ProductToPublish).State = EntityState.Modified;
            ctx.SaveChanges();
        }

        public void UnPublishProduct(int ProductId)
        {

            var ProductToUnPublish = ctx.Products.Find(ProductId);
            ProductToUnPublish.Published = false;
            ctx.Products.Update(ProductToUnPublish).State = EntityState.Modified;
            ctx.SaveChanges();
        }

        public IEnumerable<Category> GetCategories(bool includeSubCategories)
        {
            if (includeSubCategories)
                return ctx.Categories.Include(x => x.SubCategories);
            return ctx.Categories;
        }

        public IEnumerable<Product> GetProducts(bool includeModifiedBy, bool includeSubCategories)
        {
            if (includeModifiedBy || includeSubCategories)
            {
                return ctx.Products.Include(x => x.ModifiedBy)
                    .Include(x => x.Subcategory);
            }
            else if (includeSubCategories)
            {
                return ctx.Products
                    .Include(x => x.Subcategory);
            }

            else if (includeModifiedBy)
            {
                return ctx.Products
                    .Include(x => x.ModifiedBy);
            }

            return ctx.Products;
        }




    }
}
