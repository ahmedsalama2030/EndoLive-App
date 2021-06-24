using System.Linq;
using Core.Interfaces.Common;
using Core.Services;
using WebApi.helper.ExtensionsMethod;

namespace Infrastructure.Services
{
    public class SearchNameReport<T> : ISearchNameReport<T> where T : IBaseReportEntity
    {
      
        
      public IQueryable<T> GetPatientName(IQueryable<T> _entity, string _name)
        {
            var listNames = _name.getName();
            IQueryable<T> entity = null;
         var x=  listNames.Length;
            switch (listNames.Length)
            {
                case 1: entity = _entity.Where(a => a.Patient.FirstName == listNames[0]); break;
                case 2: entity = _entity.Where(a => a.Patient.FirstName == listNames[0] && a.Patient.SecondName == listNames[1]); break;
                case 3: entity = _entity.Where(a => a.Patient.FirstName == listNames[0] && a.Patient.SecondName == listNames[1] && a.Patient.ThirdName == listNames[2]); break;
                case 4: entity = _entity.Where(a => a.Patient.FirstName == listNames[0] && a.Patient.SecondName == listNames[1] && a.Patient.ThirdName == listNames[2] && a.Patient.LastName == listNames[3]); break;
            }
            return entity;
        }

        public IQueryable<T> GetConsultantName(IQueryable<T> _entity, string _name)
        {
            var listNames = _name.getName();
            IQueryable<T> entity = null;
            switch (listNames.Length)
            {
                case 0: entity = _entity.Where(a => a.Consultant.FirstName == listNames[0]); break;
                case 1: entity = _entity.Where(a => a.Consultant.FirstName == listNames[0] && a.Consultant.SecondName == listNames[1]); break;
                case 2: entity = _entity.Where(a => a.Consultant.FirstName == listNames[0] && a.Consultant.SecondName == listNames[1] && a.Consultant.ThirdName == listNames[2]); break;
                case 3: entity = _entity.Where(a => a.Consultant.FirstName == listNames[0] && a.Consultant.SecondName == listNames[1] && a.Consultant.ThirdName == listNames[2] && a.Consultant.LastName == listNames[3]); break;
            }
            return entity;
        }

        public IQueryable<T> GetEndoscopistName(IQueryable<T> _entity, string _name)
        {
            var listNames = _name.getName();
            IQueryable<T> entity = null;
            switch (listNames.Length)
            {
                case 0: entity = _entity.Where(a => a.Endoscopist.FirstName == listNames[0]); break;
                case 1: entity = _entity.Where(a => a.Endoscopist.FirstName == listNames[0] && a.Endoscopist.SecondName == listNames[1]); break;
                case 2: entity = _entity.Where(a => a.Endoscopist.FirstName == listNames[0] && a.Endoscopist.SecondName == listNames[1] && a.Endoscopist.ThirdName == listNames[2]); break;
                case 3: entity = _entity.Where(a => a.Endoscopist.FirstName == listNames[0] && a.Endoscopist.SecondName == listNames[1] && a.Endoscopist.ThirdName == listNames[2] && a.Endoscopist.LastName == listNames[3]); break;
            }
            return entity;
        }
    }
}