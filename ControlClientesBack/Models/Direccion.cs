using System.ComponentModel.DataAnnotations;

namespace ControlClientesBack.Models
{
    public class Direccion
    {
        public Guid Id { get; set; }

        public Guid ClienteId { get; set; }
        public Cliente Cliente { get; set; }
        public string Calle { get; set; }
        public string Ciudad { get; set; }

        
    }
}
