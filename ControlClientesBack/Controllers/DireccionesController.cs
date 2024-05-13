using ControlClientesBack.Data;
using ControlClientesBack.Dto;
using ControlClientesBack.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TuProyecto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DireccionesController : ControllerBase
    {
        private readonly ControlClientesContext _context;

        public DireccionesController(ControlClientesContext context)
        {
            _context = context;
        }

        
        [HttpGet("client/{clientId}")]
        public async Task<ActionResult<IEnumerable<DireccionGetDto>>> GetAddressesByCLientId(Guid clientId)

        {
            try
            {
                List<DireccionGetDto> list = new();
                var DireccionDto = await _context.Direcciones.Where(x => x.ClienteId == clientId).ToListAsync();
                foreach (var item in DireccionDto)
                {
                    DireccionGetDto direccionDto = new()
                    {
                        Id = item.Id,
                        ClienteId = item.ClienteId,
                        Calle = item.Calle,
                        Ciudad = item.Ciudad,
                    };
                    list.Add(direccionDto);
                }
                return Ok(list);
            }
            catch (Exception e)
            {
                return NotFound(e);
            }

            
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DireccionGetDto>> GetAddress(Guid id)
        {
            var DireccionDto = await _context.Direcciones.FindAsync(id);

            if (DireccionDto == null)
            {
                return NotFound();
            }
            DireccionGetDto direccion = new()
            {
                Id = DireccionDto.Id,
                ClienteId = DireccionDto.ClienteId,
                Calle = DireccionDto.Calle,
                Ciudad = DireccionDto.Ciudad,
            };

            return direccion;
        }

        [HttpPost]
        public async Task<ActionResult<DireccionDto>> PostAddress(DireccionDto address)
        {
            var cliente = await _context.Clientes.FindAsync(address.ClienteId);
            Direccion direccion = new()
            {
                ClienteId = address.ClienteId,
                Calle = address.Calle,
                Ciudad = address.Ciudad,
            };
            
            
           cliente!.Direcciones.Add(direccion);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAddress", new { id = address.ClienteId }, address);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAddress(Guid id, DireccionPutDto address)
        {
            var direccion = await _context.Direcciones.FindAsync(id);
                direccion!.Ciudad = address.Ciudad;
                direccion.Calle = address.Calle;
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAddress(Guid id)
        {
            var address = await _context.Direcciones.FindAsync(id);
            if (address == null)
            {
                return NotFound();
            }

            _context.Direcciones.Remove(address);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
    
}