namespace ControlClientesBack.Dto
{
    public class DireccionDto
    {
        public Guid ClienteId { get; set; }
        public string Calle { get; set; }
        public string Ciudad { get; set; }
    }
    public class DireccionPutDto
    {
        public string Calle { get; set; }
        public string Ciudad { get; set; }
    }
    public class DireccionGetDto
    {
        public Guid Id { get; set; }
        public Guid ClienteId { get; set; }
        public string Calle { get; set; }
        public string Ciudad { get; set; }
    }
}
