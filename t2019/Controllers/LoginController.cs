using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using Backend.RRHH.Consultas.Sistema;
using DataAccess.Models.Sistema.Login;
using Microsoft.AspNetCore.Http;
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
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[Consumes(MediaTypeNames.Application.Json)]
		public IActionResult ValidarUsuario([FromQuery]string usuario, string pass, string cuit)
		{
			try
			{
				var result = loginBackend.ValidarUsuario(usuario, pass, cuit);
				return Ok(result);
			}			
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}
	}
}