using ControlClientesBack.Data;
using ControlClientesBack.Dto;
using ControlClientesBack.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TuProyecto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientesController : ControllerBase
    {
        private readonly ControlClientesContext _context;

        public ClientesController(ControlClientesContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClienteGetDto>>> GetClients()
        {
            try {
                List<ClienteGetDto> list = new();
                var ClienteDto = await _context.Clientes.ToListAsync(); 
                   foreach (var item in ClienteDto) 
                    {
                    ClienteGetDto clienteDto = new()
                        {
                            Id = item.Id,
                            Nombre = item.Nombre,
                            Apellido = item.Apellido,
                            Telefono = item.Telefono,
                        };
                        list.Add(clienteDto);
                    }
                return Ok(list);
            }
            catch(Exception e) 
            {
                return NotFound(e); 
            }
            
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ClienteGetDto>> GetClient(Guid id)
        {
            var client = await _context.Clientes.FindAsync(id);

            if (client == null)
            {
                return NotFound();
            }
            ClienteGetDto clienteDto = new()
            {
                Id = client.Id,
                Nombre = client.Nombre,
                Apellido = client.Apellido,
                Telefono = client.Telefono,
            };
            

            return clienteDto;
        }

        [HttpPost]
        public async Task<ActionResult<ClienteDto>> PostClient(ClienteDto client)
        {
            Cliente clienteDto = new()
            {
                Nombre = client.Nombre,
                Apellido = client.Apellido,
                Telefono = client.Telefono,
            };

            _context.Clientes.Add(clienteDto);
            await _context.SaveChangesAsync();


            return CreatedAtAction("GetClient", new { id = clienteDto.Id }, client);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutClient(Guid id, ClienteDto client)
        {

            var cliente = await _context.Clientes.FindAsync(id);
            cliente!.Nombre = client.Nombre;    
            cliente.Apellido = client.Apellido;
            cliente.Telefono = client.Telefono;
            await _context.SaveChangesAsync();  
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClient(Guid id)
        {
            var client = await _context.Clientes.FindAsync(id);
            if (client == null)
            {
                return NotFound();
            }

            _context.Clientes.Remove(client);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
