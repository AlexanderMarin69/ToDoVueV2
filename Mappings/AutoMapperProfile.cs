using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using vueproject.Models;
using vueproject.ViewModels;

namespace vueproject.Mappings
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Category, CategoriesViewModel>().ReverseMap();
           

            #region Examples
            /* How to ignore property.*/
            //CreateMap<Note, NoteViewModel>().
            //    ForMember(x => x.InspectionId,
            //        opts => opts.Ignore())
            //    .ReverseMap();
            #endregion
        }
    }
}
