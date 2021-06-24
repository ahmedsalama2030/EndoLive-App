using System;
using AutoMapper;
using Core.Dtos.ReportColonoscopy.ColonoscopyMedia;
using Core.Dtos.ReportColonoscopy.ColonoscopyReport;
using Core.Dtos.ReportColonoscopy.ColonoscopySetting;
using Core.Dtos.ReportColonoscopy.ColonoscopyTemplate;
using Core.Entities.ReportColonoscopy;

namespace Infrastructure.Helper.AutoMapper
{
    public partial class AutoMapperProfiles
    {
        public class ReportColonoscopy : Profile
        {
            public ReportColonoscopy()
            {
                CreateMap<ColonoscopySettingRegister, ColonoscopySetting>().
                ForMember(a => a.CreatedDate, op => op.MapFrom(s => DateTime.Now)).
                ForMember(a => a.LastEditDate, op => op.MapFrom(s => DateTime.Now));
                CreateMap<ColonoscopySettingEdit, ColonoscopySetting>().ForMember(a => a.LastEditDate, op => op.MapFrom(s => DateTime.Now));

                CreateMap<ColonoscopyTemplateRegister, ColonoscopyTemplate>().
                ForMember(a => a.CreatedDate, op => op.MapFrom(s => DateTime.Now)).
                ForMember(a => a.LastEditDate, op => op.MapFrom(s => DateTime.Now));
                CreateMap<ColonoscopyTemplateEdit, ColonoscopyTemplate>().ForMember(a => a.LastEditDate, op => op.MapFrom(s => DateTime.Now));

                CreateMap<ColonoscopyMediaRegister, ColonoscopyMedia>().
               ForMember(a => a.CreatedDate, op => op.MapFrom(s => DateTime.Now)).
               ForMember(a => a.LastEditDate, op => op.MapFrom(s => DateTime.Now));
                CreateMap<ColonoscopyMediaEdit, ColonoscopyMedia>().ForMember(a => a.LastEditDate, op => op.MapFrom(s => DateTime.Now));

                CreateMap<ColonoscopyReportRegister, ColonoscopyReport>().
                   ForMember(a => a.CreatedDate, op => op.MapFrom(s => DateTime.Now)).
                   ForMember(a => a.LastEditDate, op => op.MapFrom(s => DateTime.Now));
                CreateMap<ColonoscopyReportEdit, ColonoscopyReport>().ForMember(a => a.LastEditDate, op => op.MapFrom(s => DateTime.Now));
                CreateMap<ColonoscopyReport, ColonoscopyReportGet>();

            }
        }

    }
}