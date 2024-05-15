using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using ControlClientesBack.Data;

namespace ControlClientesBack
{
    public class Startup
    {
        private readonly IConfiguration _configuration;

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

            var connectionString = _configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<ControlClientesContext>(options =>
                options.UseNpgsql(connectionString));

            services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin", builder =>
                    builder.AllowAnyOrigin()
                            .WithOrigins("http://localhost:4200")
                           .AllowAnyMethod()
                           .AllowAnyHeader());
            });


        }


        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "API V1");
                });
            }

            app.Migrations();
            app.UseCors("AllowSpecificOrigin");

            app.UseHttpsRedirection();
            app.UseAuthorization();
            app.UseRouting();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}