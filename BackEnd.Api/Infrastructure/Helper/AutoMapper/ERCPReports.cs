using System;
using AutoMapper;
using Core.Dtos.ReportErcp.ERCPMedia;
using Core.Dtos.ReportErcp.ErcpReport;
using Core.Dtos.ReportErcp.ERCPSetting;
using Core.Dtos.ReportErcp.ERCPTemplate;
using Core.Entities.ReportErcp;

namespace Infrastructure.Helper.AutoMapper
{
    public partial class AutoMapperProfiles
    {
    public  class ERCPReports:Profile
    {
        public ERCPReports()
        {

            CreateMap<ERCPSettingRegister, ERCPSetting>().
           ForMember(a => a.CreatedDate, op => op.MapFrom(s => DateTime.Now)).
           ForMember(a => a.LastEditDate, op => op.MapFrom(s => DateTime.Now));
            CreateMap<ERCPSettingEdit, ERCPSetting>().ForMember(a => a.LastEditDate, op => op.MapFrom(s => DateTime.Now));

            CreateMap<ERCPTemplateRegister, ERCPTemplate>().
            ForMember(a => a.CreatedDate, op => op.MapFrom(s => DateTime.Now)).
            ForMember(a => a.LastEditDate, op => op.MapFrom(s => DateTime.Now));
            CreateMap<ERCPTemplateEdit, ERCPTemplate>().ForMember(a => a.LastEditDate, op => op.MapFrom(s => DateTime.Now));

            CreateMap<ERCPMediaRegister, ERCPMedia>().
           ForMember(a => a.CreatedDate, op => op.MapFrom(s => DateTime.Now)).
           ForMember(a => a.LastEditDate, op => op.MapFrom(s => DateTime.Now));
            CreateMap<ERCPMediaEdit, ERCPMedia>().ForMember(a => a.LastEditDate, op => op.MapFrom(s => DateTime.Now));

            CreateMap<ReportErcpRegister, ERCPReport>().
               ForMember(a => a.CreatedDate, op => op.MapFrom(s => DateTime.Now)).
               ForMember(a => a.LastEditDate, op => op.MapFrom(s => DateTime.Now));
            CreateMap<ReportErcpEdit, ERCPReport>().ForMember(a => a.LastEditDate, op => op.MapFrom(s => DateTime.Now));
            CreateMap<ERCPReport, ReportErcpGet>();

        }
    }
    }
}
 