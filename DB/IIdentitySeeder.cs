using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace vueproject.DB
{
    public interface IIdentitySeeder
    {
        bool CreateAdminAccountIFEmpty();
    }
}
