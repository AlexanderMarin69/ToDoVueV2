using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace vueproject
{
    public interface IGenericRepository<TEntity> where TEntity : class
    {
        Task<IEnumerable<TEntity>> GetAll();
    }
}
