using System;
using AutoMapper;
using Core.Dtos.ReportUGI.UGIMedia;
using Core.Dtos.ReportUGI.UGIReport;
using Core.Dtos.ReportUGI.UGISetting;
using Core.Dtos.ReportUGI.UGITemplate;
using Core.Entities.ReportUGI;

namespace Infrastructure.Helper.AutoMapper
{
    public partial class AutoMapperProfiles
    {

        public partial class UGIReports : Profile
        {
            public UGIReports()
            {

                CreateMap<UGISettingRegister, UGISetting>().
               ForMember(a => a.CreatedDate, op => op.MapFrom(s => DateTime.Now)).
               ForMember(a => a.LastEditDate, op => op.MapFrom(s => DateTime.Now));
                CreateMap<UGISettingEdit, UGISetting>().ForMember(a => a.LastEditDate, op => op.MapFrom(s => DateTime.Now));

                CreateMap<UGITemplateRegister, UGITemplate>().
                ForMember(a => a.CreatedDate, op => op.MapFrom(s => DateTime.Now)).
                ForMember(a => a.LastEditDate, op => op.MapFrom(s => DateTime.Now));
                CreateMap<UGITemplateEdit, UGITemplate>().ForMember(a => a.LastEditDate, op => op.MapFrom(s => DateTime.Now));

                CreateMap<UGIMediaRegister, UGIMedia>().
               ForMember(a => a.CreatedDate, op => op.MapFrom(s => DateTime.Now)).
               ForMember(a => a.LastEditDate, op => op.MapFrom(s => DateTime.Now));
                CreateMap<UGIMediaEdit, UGIMedia>().ForMember(a => a.LastEditDate, op => op.MapFrom(s => DateTime.Now));

                CreateMap<UGIReportRegister, UGIReport>().
                   ForMember(a => a.CreatedDate, op => op.MapFrom(s => DateTime.Now)).
                   ForMember(a => a.LastEditDate, op => op.MapFrom(s => DateTime.Now));
                CreateMap<UGIReportEdit, UGIReport>().ForMember(a => a.LastEditDate, op => op.MapFrom(s => DateTime.Now));
                CreateMap<UGIReport, UGIReportGet>();

            }
        }

    }
}