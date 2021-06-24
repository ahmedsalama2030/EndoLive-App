using System.Linq;
using Core.Common;
using Core.Services;
using WebApi.helper.ExtensionsMethod;

namespace Infrastructure.Services
{
    public class SearchNameEntity<T> : ISearchNameEntity<T> where T : Person
    {
        public System.Linq.IQueryable<T> GetName(System.Linq.IQueryable<T> _entity, string _name)
        {
             var listNames = _name.getName();
            IQueryable<T> entity = null;
            var x=listNames.Length;
            switch (listNames.Length)
            {
                case 1: entity = _entity.Where(a => a.FirstName == listNames[0]); break;
                case 2: entity = _entity.Where(a => a.FirstName == listNames[0] && a.SecondName == listNames[1]); break;
                case 3: entity = _entity.Where(a => a.FirstName == listNames[0] && a.SecondName == listNames[1] && a.ThirdName == listNames[2]); break;
                case 4: entity = _entity.Where(a => a.FirstName == listNames[0] && a.SecondName == listNames[1] && a.ThirdName == listNames[2] && a.LastName == listNames[3]); break;
            }
            var s=entity.ToList();;
            return entity;
        }
    }
}