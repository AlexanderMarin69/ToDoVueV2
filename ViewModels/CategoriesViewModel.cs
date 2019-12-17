using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using vueproject.Models;

namespace vueproject.ViewModels
{
    public class CategoriesViewModel
    {
        public Category Category { get; set; }
        public List<Category> AllCategories { get; set; }
        [DataType(DataType.EmailAddress)]
        [Required]

        public string UserName { get; set; }

        [DataType(DataType.Password)]
        [Required]

        public string Password { get; set; }

    }
}
