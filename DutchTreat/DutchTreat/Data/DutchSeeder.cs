using DutchTreat.Data.Entities;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace DutchTreat.Data
{
    public class DutchSeeder
    {
        private readonly DutchContext _ctx;
        private readonly IHostingEnvironment _hosting;

        public DutchSeeder(DutchContext ctx, IHostingEnvironment hosting)
        {
            _ctx = ctx;
            _hosting = hosting;
        }

        public void Seed()
        {
            _ctx.Database.EnsureCreated();

            if (!_ctx.Products.Any())
            {
                var filepath = Path.Combine(_hosting.ContentRootPath, "Data/art.json");
                var json = File.ReadAllText(filepath);
                var products = JsonConvert.DeserializeObject<IEnumerable<Product>>(json);
                _ctx.Products.AddRange(products);

                _ctx.SaveChanges();
            }

            if (!_ctx.Orders.Any())
            {
                _ctx.Orders.Add(new Order()
                {
                    OrderDate = DateTime.UtcNow,
                    OrderNumber = "12345"
                });

                _ctx.SaveChanges();

                var order = _ctx.Orders.Where(o => o.Id == 1).FirstOrDefault();

                order.Items = new List<OrderItem>()
                {
                    new OrderItem()
                    {
                        Product = _ctx.Products.OrderBy(p => p.Id).FirstOrDefault(),
                        Quantity = 5,
                        UnitPrice = _ctx.Products.OrderBy(p => p.Id).FirstOrDefault().Price
                    }
                };

                _ctx.SaveChanges();
            }
        }
    }
}
