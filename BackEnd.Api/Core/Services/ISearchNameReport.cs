using System.Linq;
using Core.Interfaces.Common;

namespace Core.Services
{
    public interface ISearchNameReport<T>where T:IBaseReportEntity
    {
      IQueryable<T> GetPatientName(IQueryable<T> Entity, string Name);
      IQueryable<T> GetConsultantName(IQueryable<T> Entity, string Name);
      IQueryable<T> GetEndoscopistName(IQueryable<T> Entity, string Name);
 
    }
}