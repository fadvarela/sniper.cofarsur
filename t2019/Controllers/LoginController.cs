using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.RRHH.Consultas.Sistema;
using DataAccess.Models.Sistema.Login;
using Microsoft.AspNetCore.Mvc;

namespace t2019.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class LoginController : ControllerBase
    {
		// Servicio Backend
		private LoginBackend loginBackend = new LoginBackend();

		[HttpGet("ValidarUsuario")]
		[ProducesResponseType(200, Type = typeof(Usuario))]
		[ProducesResponseType(403)]
		[ProducesResponseType(404)]
		public IActionResult ValidarUsuario([FromQuery]string usuario, string pass, string cuit)
		{
			var result = loginBackend.ValidarUsuario(usuario, pass, cuit);
			return Ok(result);
		}
	}
}