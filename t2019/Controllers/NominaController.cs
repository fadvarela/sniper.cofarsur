using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


using Backend.RRHH.Consultas;
using DataAccess.Models.RRHH;

namespace t2019.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NominaController : ControllerBase
    {
		private NominaBackend nominaBackend = new NominaBackend();

		[HttpGet("getnomina")]
        [ProducesResponseType(200, Type = typeof(Nomina))]
        [ProducesResponseType(403)]
        [ProducesResponseType(404)]
        public IActionResult Getnomina([FromQuery]long param)
        {
            var result = nominaBackend.GetNomina(param);
            return Ok(result);
        }
    }
}