using Microsoft.EntityFrameworkCore;

namespace ControlClientesBack.Data
{
    public class AutoMigration
    {

    }

    public static class DatabaseInitialization
    {
        public static void Migrations(this IApplicationBuilder app)
        {
            using var serviceScope = app.ApplicationServices.CreateScope();
            serviceScope.ServiceProvider.GetService<ControlClientesContext>().Database.Migrate();
        }
    }
}
