using System.Linq;
using Core.Interfaces;

namespace Core.Services
{
     public interface ISearchNamePatientRelation <T>where T:IPatientRelation
    {
        IQueryable<T> GetName(IQueryable<T> Entity, string Name);
     }
}