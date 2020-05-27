using Backend.RRHH.Consultas;
using DataAccess.Models.RRHH;
using DataAccess.Models.Sistema.Helper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Mime;

namespace t2019.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class NovedadesController : ControllerBase
	{
		private NovedadBackend novedadBackend = new NovedadBackend();

		[HttpGet("getnovedades")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[Consumes(MediaTypeNames.Application.Json)]
		public IActionResult getNovedades([FromQuery]string filtro)
		{
			try
			{
				var paramObj = (!string.IsNullOrEmpty(filtro)) ? JsonConvert.DeserializeObject<ParamEntity<object>>(filtro) : null;
				var result = novedadBackend.GetNovedades(paramObj);

				return Ok(result);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}

		}

		[HttpGet("getListJornadas")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[Consumes(MediaTypeNames.Application.Json)]
		public IActionResult getListJornadas([FromQuery]string filtro = "")
		{
			try
			{
				// Si el objeto que viene por parametro contiene algun valor, lo convierto con la funcion de JSON.
				// sino lo guardo como NULL
				var paramObj = (!string.IsNullOrEmpty(filtro)) ? JsonConvert.DeserializeObject<long?>(filtro) : null;
				var result = novedadBackend.getListJornadas(paramObj);
				return Ok(result);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpGet("getListIncidencias")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[Consumes(MediaTypeNames.Application.Json)]
		public IActionResult getListIncidencias([FromQuery]string filtro)
		{
			try
			{
				// Si el objeto que viene por parametro contiene algun valor, lo convierto con la funcion de JSON.
				// sino lo guardo como NULL
				var paramObj = (!string.IsNullOrEmpty(filtro)) ? JsonConvert.DeserializeObject<List<string>>(filtro) : null;
				var result = novedadBackend.getListIncidencias(paramObj);
				return Ok(result);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpGet("getListMarcaciones")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[Consumes(MediaTypeNames.Application.Json)]
		public IActionResult getListMarcaciones([FromQuery]string filtro)
		{
			try
			{
				// Si el objeto que viene por parametro contiene algun valor, lo convierto con la funcion de JSON.
				// sino lo guardo como NULL
				var paramObj = (!string.IsNullOrEmpty(filtro)) ? JsonConvert.DeserializeObject<ParamEntity<object>>(filtro) : null;
				var result = novedadBackend.getListMarcaciones(paramObj);
				return Ok(result);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpGet("getListJornadasHabituales")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[Consumes(MediaTypeNames.Application.Json)]
		public IActionResult getListJornadasHabituales([FromQuery]string filtro)
		{
			try
			{
				// Si el objeto que viene por parametro contiene algun valor, lo convierto con la funcion de JSON.
				// sino lo guardo como NULL
				var paramObj = (!string.IsNullOrEmpty(filtro)) ? JsonConvert.DeserializeObject<ParamEntity<object>>(filtro) : null;
				var result = novedadBackend.getListJornadasHabituales(paramObj);
				return Ok(result);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		/*-------------------------POST-----------------------------*/

		[HttpPost("guardarJornada")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[Consumes(MediaTypeNames.Application.Json)]
		public IActionResult guardarJornada([FromBody]ParamEntity<object> param)
		{
			try
			{
				var result = novedadBackend.guardarJornada(param);
				return Ok(result);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpPost("guardarIncidencia")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[Consumes(MediaTypeNames.Application.Json)]
		public IActionResult guardarIncidencia([FromBody]ParamEntity<object> param)
		{
			try
			{
				var result = novedadBackend.guardarIncidencia(param);
				return Ok(result);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpPost("anularMarcacion")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[Consumes(MediaTypeNames.Application.Json)]
		public IActionResult anularMarcacion([FromBody]ParamEntity<Marcacion> param)
		{
			try
			{
				var result = novedadBackend.anularMarcacion(param);
				return Ok(result);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpPost("guardarMarcacion")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[Consumes(MediaTypeNames.Application.Json)]
		public IActionResult guardarMarcacion([FromBody]ParamEntity<Marcacion> param)
		{
			try
			{
				var result = novedadBackend.guardarMarcacion(param);
				return Ok(result);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpPost("guardarJornadaHabitual")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[Consumes(MediaTypeNames.Application.Json)]
		public IActionResult guardarJornadaHabitual([FromBody]ParamEntity<JornadaHabitual> param)
		{
			try
			{
				var result = novedadBackend.guardarJornadaHabitual(param);
				return Ok(result);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}
	}
}