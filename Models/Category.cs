using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace vueproject.Models
{
    public class Category : BaseModel
    {
        public List<Subcategory> SubCategories { get; set; }

    }
}
