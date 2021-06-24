using System.Linq;
using Core.Common;

namespace Core.Services
{
    public interface ISearchNameEntity<T>where T:Person
    {
        IQueryable<T> GetName(IQueryable<T> Entity, string Name);
     }
}