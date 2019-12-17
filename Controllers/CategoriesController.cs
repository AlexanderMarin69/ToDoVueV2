using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using vueproject.DB;
using vueproject.Models;
using vueproject.Repositories;
using vueproject.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace vueproject.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CategoriesController : Controller
    {
        //private readonly KingPimDatabaseContext ctx;
        private readonly IDataRepository repo;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IHostingEnvironment _hostingEnvironment;
        public CategoriesController(/*KingPimDatabaseContext context,*/ IHostingEnvironment hostingEnvironment, UserManager<IdentityUser> UserManager, IDataRepository repository)
        {
            //ctx = context;
            _userManager = UserManager;
            repo = repository;
            _hostingEnvironment = hostingEnvironment;
        }

        public IActionResult CreateNewSubCategory(int CategoryId, string SubCategoryName)
        {

            var NewSubCategory = new Subcategory();
            NewSubCategory.Name = SubCategoryName;
            NewSubCategory.CategoryId = CategoryId;

            repo.AddSubCategory(NewSubCategory);


            return RedirectToAction("Index", "Home");
        }

        public IActionResult EditCategoryName(int CategoryId, string CategoryName)
        {

            var CatToUpdate = repo.GetCategories(false).Where(x => x.Id == CategoryId).FirstOrDefault();

            CatToUpdate.Name = CategoryName;

            repo.UpdateCategory(CatToUpdate);


            return RedirectToAction("Index", "Home");
        }

        public async Task<IActionResult> CreateNewProduct(int SubCategoryId, string ProductName, string ArticleNumber)
        {

            var NewProduct = new Product();
            NewProduct.Name = ProductName;
            NewProduct.ArticleNumber = ArticleNumber;
            NewProduct.SubcategoryId = SubCategoryId;
            NewProduct.DateUpdated = DateTime.Now;
            NewProduct.DateCreated = DateTime.Now;

            repo.CreateNewProduct(NewProduct);

            //var redirectUrl = Url.RouteUrl("SubCategoryPage", "Home", new { SubCategory.Id = SubCategoryId});
            //return Redirect(redirectUrl);

            return RedirectToAction("SubCategoryPage", "Home", new { categoryid = SubCategoryId });

        }

        public IActionResult EditSubCategory(int EditSubCategoryId, string EditSubCategoryName)
        {
            var SubCatToUpdate = repo.Subcategories.Where(x => x.Id == EditSubCategoryId).FirstOrDefault();

            //SubCatToUpdate = new Subcategory();
            SubCatToUpdate.Name = EditSubCategoryName;
            //SubCatToUpdate.Id = EditSubCategoryId;

            repo.UpdateSubCategory(SubCatToUpdate);


            return RedirectToAction("Index", "Home");
        }

        public IActionResult DeleteSubCategory(int DeleteSubCategoryId)
        {


            repo.DeleteSubCategory(DeleteSubCategoryId);

            return RedirectToAction("Index", "Home");
        }

        public IActionResult DeleteCategory(int DeleteCategoryId)
        {


            repo.DeleteCategory(DeleteCategoryId);

            return RedirectToAction("Index", "Home");
        }

        public IActionResult PublishAction(int ProductId, int subcategoryId)
        {


            repo.PublishProduct(ProductId);


            return RedirectToAction("SubCategoryPage", "Home", new { categoryid = subcategoryId });
        }

        public IActionResult UnPublishAction(int ProductId, int subcategoryId)
        {


            repo.UnPublishProduct(ProductId);

            return RedirectToAction("SubCategoryPage", "Home", new { categoryid = subcategoryId });
        }

        public IActionResult EditProduct(EditProductViewModel vm)
        {
            var ProductToUpdate = repo.GetProducts(false, true).Where(x => x.Id == vm.Product.Id).FirstOrDefault();

            repo.UpdateProduct(ProductToUpdate, vm, User.Identity.Name);

            return RedirectToAction("SubCategoryPage", "Home", new { categoryid = ProductToUpdate.SubcategoryId });
        }

        public IActionResult DeleteProduct(int DeleteProductId)
        {
            var ProductToDelete = repo.GetProducts(false, true).Where(x => x.Id == DeleteProductId).FirstOrDefault();


            repo.DeleteProduct(DeleteProductId);
            return RedirectToAction("SubCategoryPage", "Home", new { categoryid = ProductToDelete.SubcategoryId });
        }
    }
}




       


 

