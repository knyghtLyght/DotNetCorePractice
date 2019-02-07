using AutoMapper;
using DutchTreat.Data.Entities;
using DutchTreat.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DutchTreat.Data
{
    public class DutchMappinProfile : Profile
    {
        public DutchMappinProfile()
        {
            CreateMap<Order, OrderViewModel>()
                //When trying to map (lambda) follow exception ex and map from (lambda)
                .ForMember(o => o.OrderId, ex => ex.MapFrom(o => o.Id))
                //Create the opposite map as well
                .ReverseMap();

            CreateMap<OrderItem, OrderItemsViewModel>()
                .ReverseMap();
        }
    }
}
