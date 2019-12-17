using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vueproject.DB;
using vueproject.Models;
using vueproject.ViewModels;

namespace vueproject.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class HomeController : Controller
    {
        private vueprojectDatabaseContext ctx;
        public HomeController(vueprojectDatabaseContext context)
        {
           
            ctx = context;
        }

        [HttpPost]
        public ActionResult CreateNewCategory(CategoryViewModel catName)
        {
            try
            {
                var vm = new Category();
                vm.Name = catName.Name;
                vm.Published = catName.Published;
                ctx.Categories.Add(vm);
                ctx.SaveChanges();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
            return Ok();
        }

        [HttpDelete]
        [Route("{id:int}")]
        public ActionResult DeleteById(int id)
        {
            try
            {
                var TodoForDelete = ctx.Categories.Find(id);
                ctx.Categories.Remove(TodoForDelete);
                ctx.SaveChanges();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
            return Ok();
        }

        [HttpPost]
        [Route("{id:int}")]
        public ActionResult MarkAsDone(CategoryViewModel DoneTodo, int id)
        {
            try
            {
                var UpdateEntity = ctx.Categories.Find(id);
                UpdateEntity.Name = DoneTodo.Name;
                UpdateEntity.Published = DoneTodo.Published;

                if (DoneTodo.Published)
                    UpdateEntity.Published = false;
                else
                    UpdateEntity.Published = true;

                ctx.Categories.Update(UpdateEntity).State = EntityState.Modified;
                ctx.SaveChanges();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetConfigurations()
        {
           //var dbObHello =  await ctx.Category.ToListAsync();
            //return await FindAll();
            var dbObHello = ctx.Categories/*Include(x => x.SubCategories)*/.ToListAsync();
            var vm = new CategoriesViewModel();

            //return _mapper.Map<IEnumerable<DoorConfigurationViewModel>>(await _doorConfigurationRepository.GetAll());

            vm.AllCategories = dbObHello.Result;

            return Ok(vm.AllCategories);
        }
     
        public IActionResult Index()
        {
            return File("~/index.html", "text/html");
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }
    }
}