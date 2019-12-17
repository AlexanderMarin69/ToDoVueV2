using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using vueproject.DB;
using vueproject.Models;

namespace vueproject
{
    public class GenericRepository<TEntity> 
    {
        private vueprojectDatabaseContext ctx;

        public GenericRepository(vueprojectDatabaseContext context)
        {
            ctx = context;
        }
        //public async Task<IEnumerable<TEntity>> GetAll()
        //{
        //    return await ctx.Set<TEntity>().ToListAsync();
        //}
    }
}
