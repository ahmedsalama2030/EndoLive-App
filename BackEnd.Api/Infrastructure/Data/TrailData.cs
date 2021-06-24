using System;
using System.Collections.Generic;
using AutoMapper;
using Core.Entities;
using Newtonsoft.Json;
using Core.Dtos;
using System.Linq;

namespace Infrastructure.Data
{
    public class TrailData
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        public TrailData(AppDbContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

        }
        
         

        
         
        
      
        
 
 

        public void RunTrialData()
        {
             
            
        }
          }
}