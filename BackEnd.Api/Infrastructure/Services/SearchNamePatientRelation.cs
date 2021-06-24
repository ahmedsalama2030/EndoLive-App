using System.Linq;
using Core.Interfaces;
using Core.Services;
using WebApi.helper.ExtensionsMethod;

namespace Infrastructure.Services
{
    public class SearchNamePatientRelation<T> : ISearchNamePatientRelation<T> where T : IPatientRelation
    {
        public IQueryable<T> GetName(IQueryable<T> _entity, string name)
        {
            var listNames = name.getName();
            IQueryable<T> entity = null;
            switch (listNames.Length)
            {
                case 0: entity = _entity.Where(a => a.Patient.FirstName == listNames[0]); break;
                case 1: entity = _entity.Where(a => a.Patient.FirstName == listNames[0] && a.Patient.SecondName == listNames[1]); break;
                case 2: entity = _entity.Where(a => a.Patient.FirstName == listNames[0] && a.Patient.SecondName == listNames[1] && a.Patient.ThirdName == listNames[2]); break;
                case 3: entity = _entity.Where(a => a.Patient.FirstName == listNames[0] && a.Patient.SecondName == listNames[1] && a.Patient.ThirdName == listNames[2] && a.Patient.LastName == listNames[3]); break;
            }
            return entity;
        }
    }
}