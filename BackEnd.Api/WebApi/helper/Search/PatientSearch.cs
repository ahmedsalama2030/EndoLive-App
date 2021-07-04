using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.helper.pagination;

namespace WebApi.helper.Search
{
    public class PatientSearch
    {
 
        private readonly IQueryable<Patient> _patients;
        private PaginationParam paginationParam;

        private readonly ISearchNameEntity<Patient> _SearchName;
        private Dictionary<SearchType, Func<IQueryable<Patient>, IQueryable<Patient>>> OpeartionSearchDictionary;

        public PatientSearch(
            IQueryable<Patient> patients,
            PaginationParam PaginationParam,
            ISearchNameEntity<Patient> SearchNameEntity)
        {
            _SearchName = SearchNameEntity;
            _patients = patients;
            paginationParam = PaginationParam;
            FillOpearationSearch();


        }

        public  IQueryable<Patient> Search()
        {
            var type = Enum.Parse<SearchType>(paginationParam.filterType.ToString())   ;
             return  OpeartionSearchDictionary[type](_patients);

        }

        public void FillOpearationSearch()
        {
            OpeartionSearchDictionary = new Dictionary<SearchType, Func<IQueryable<Patient>, IQueryable<Patient>>>();
            OpeartionSearchDictionary.Add(SearchType.name, Name);
            OpeartionSearchDictionary.Add(SearchType.phone, Phone);
            OpeartionSearchDictionary.Add(SearchType.labcode, Labcode);
            OpeartionSearchDictionary.Add(SearchType.nationalid, Nationalid);
            OpeartionSearchDictionary.Add(SearchType.degree, Degree);
            OpeartionSearchDictionary.Add(SearchType.department, Department);

        }


        



        private enum SearchType
        {
            name,
            phone,
            labcode,
            nationalid,
            degree,
            department
        }


        // functions search
        public IQueryable<Patient> Name(IQueryable<Patient> patients)
        {
            return _SearchName.GetName(patients, paginationParam.filterValue);
        }
        public IQueryable<Patient> Phone(IQueryable<Patient> patients)
        {
            return patients.Where(a => a.Phone == paginationParam.filterValue);
        }
        public IQueryable<Patient> Labcode(IQueryable<Patient> patients)
        {
            return patients.Where(a => a.LabCode == paginationParam.filterValue);
        }
        public IQueryable<Patient> Nationalid(IQueryable<Patient> patients)
        {
            return patients.Where(a => a.NationalId == paginationParam.filterValue);
        }
        public IQueryable<Patient> Degree(IQueryable<Patient> patients)
        {
            return patients.Where(a => a.DegreeId == Guid.Parse(paginationParam.filterValue));
        }
        public IQueryable<Patient> Department(IQueryable<Patient> patients)
        {
            return patients.Where(a => a.DepartmentId == Guid.Parse(paginationParam.filterValue));
        }

    }
}
