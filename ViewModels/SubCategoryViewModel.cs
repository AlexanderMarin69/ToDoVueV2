using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using vueproject.Models;

namespace vueproject.ViewModels
{
    public class SubCategoryViewModel
    {
        public Subcategory SubCategory { get; set; }
        public List<Product> SubcategoryProducts { get; set; }
    }
}
