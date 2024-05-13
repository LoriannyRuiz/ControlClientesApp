using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ControlClientesBack.Models
{
    public class Cliente
    {
        public Guid Id { get; set; }

        public string Nombre { get; set; }

        public string Apellido { get; set; }
        public string Telefono { get; set; }

        public List<Direccion> Direcciones { get; set; } = new();
    }
}
