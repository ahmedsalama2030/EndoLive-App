using System.Threading.Tasks;
using Core.Interfaces;
 using Infrastructure.Data;
using Infrastructure.Repository;

namespace Infrastracture.Repository
{
    public class UnitOfWork<T> : IUnitOfWork<T> where T : class
    {
        private IRepository<T> _entity;

        private readonly AppDbContext _db;
        public UnitOfWork(AppDbContext db)
        {
            _db = db;

        }
        public IRepository<T> Table
        {
            get
            {
                return _entity ?? (_entity = new Repository<T>(_db));
            }
        }

        public async Task<bool> SaveAllAsync()
        {
          return await _db.SaveChangesAsync()>0;
        }
    }
}